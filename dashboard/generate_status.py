import os, json, re, glob, yaml, subprocess

def parse_frontmatter(filepath):
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        if not content.startswith('---'):
            return {}, content
        parts = content.split('---', 2)
        if len(parts) < 3:
            return {}, content
        try:
            fm = yaml.safe_load(parts[1]) or {}
        except:
            fm = {}
        return fm, parts[2].strip()
    except:
        return {}, ""

def parse_table(content, expected_headers=None):
    rows = []
    lines = content.split('\n')
    headers = None
    for line in lines:
        line = line.strip()
        if not line.startswith('|'):
            if headers:
                break
            continue
        cells = [c.strip() for c in line.split('|')[1:-1]]
        if not cells:
            continue
        if all(re.match(r'^-+$', c) for c in cells):
            continue
        if headers is None:
            headers = cells
            if expected_headers and not any(h in headers for h in expected_headers):
                headers = None
                continue
        else:
            row = {}
            for i, h in enumerate(headers):
                row[h] = cells[i] if i < len(cells) else ""
            rows.append(row)
    return rows

def extract_agenda(body):
    items = []
    in_agenda = False
    for line in body.split('\n'):
        if '## Agenda' in line:
            in_agenda = True
            continue
        if in_agenda:
            if line.startswith('##'):
                break
            m = re.match(r'\d+\.\s*(report|discussion-?\d*|deliberation):\s*`?([^`]+)`?', line.strip())
            if m:
                items.append({"mode": m.group(1), "item": m.group(2).strip()})
            elif re.match(r'\d+\.\s*confirm', line.strip()):
                items.append({"mode": "procedural", "item": line.strip().split('.', 1)[1].strip()})
    return items

def extract_section(body, section_name):
    lines = []
    capture = False
    for line in body.split('\n'):
        if f'## {section_name}' in line:
            capture = True
            continue
        if capture:
            if line.startswith('## '):
                break
            if line.strip():
                lines.append(line.strip().lstrip('- '))
    return lines

word_map = {
    'first': 1, 'second': 2, 'third': 3, 'fourth': 4, 'fifth': 5, 'sixth': 6, 'seventh': 7, 'eighth': 8, 'ninth': 9, 'tenth': 10,
    'eleventh': 11, 'twelfth': 12, 'thirteenth': 13, 'fourteenth': 14, 'fifteenth': 15, 'sixteenth': 16, 'seventeenth': 17, 'eighteenth': 18, 'nineteenth': 19,
    'twentieth': 20, 'thirtieth': 30, 'fortieth': 40, 'fiftieth': 50, 'sixtieth': 60, 'seventieth': 70, 'eightieth': 80, 'ninetieth': 90,
    'hundredth': 100, 'one': 1, 'two': 2, 'three': 3, 'four': 4, 'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9, 'ten': 10,
    'twenty': 20, 'thirty': 30, 'forty': 40, 'fifty': 50, 'sixty': 60, 'seventy': 70, 'eighty': 80, 'ninety': 90, 'hundred': 100
}

def parse_word_number(word_str):
    parts = word_str.split('-')
    total = 0
    current_value = 0
    for p in parts:
        val = word_map.get(p, 0)
        if val == 100:
            if current_value == 0:
                current_value = 1
            current_value *= 100
            total += current_value
            current_value = 0
        else:
            current_value += val
    total += current_value
    return total

def get_sitting_number(filename):
    base = os.path.basename(filename).replace('company-os-','').replace('-ordinary-sitting.md','')
    return parse_word_number(base)

# Parse sittings
sittings = []
for f in sorted(glob.glob('proposals/operations/company-os-*-ordinary-sitting.md')):
    fm, body = parse_frontmatter(f)
    num = get_sitting_number(f)
    agenda = extract_agenda(body)
    goal = extract_section(body, 'Goal')
    result = extract_section(body, 'Result')
    sittings.append({
        'number': num, 'id': fm.get('id',''), 'status': fm.get('status',''),
        'date': str(fm.get('created_at','')),
        'goal': goal[0] if goal else '', 'agenda': agenda, 'result': result
    })
sittings.sort(key=lambda s: s['number'], reverse=True)

# Parse rulings
rulings = {}
for f in glob.glob('decisions/operations/*-ordinary-sitting-ruling.md'):
    fm, body = parse_frontmatter(f)
    base = os.path.basename(f).replace('-ordinary-sitting-ruling.md','')
    num = parse_word_number(base)
    rulings[num] = {
        'ruling': fm.get('ruling',''), 'reason': fm.get('reason',''),
        'executor': fm.get('executor',''), 'minority_view': fm.get('minority_view',''),
        'founder_veto': fm.get('founder_veto_used', False)
    }

# Parse boards
def parse_board(path, headers):
    if not os.path.exists(path):
        return []
    _, body = parse_frontmatter(path)
    return parse_table(body, headers)

improvement_items = parse_board('ledgers/company-os-improvement-board.md', ['Item', 'Status'])
departments = parse_board('departments/registry.md', ['Department', 'Steward'])
officeholders = parse_board('ledgers/officeholder-registry.md', ['Office', 'Holder'])
units = parse_board('units/registry.md', ['Unit', 'Seat state'])
activities = parse_board('ledgers/current-activity-board.md', ['Actor', 'Current Work'])
work_allocation = parse_board('ledgers/department-work-allocation-board.md', ['Department', 'Current assignment'])

automation_issues = parse_board('ledgers/全部署自動化運用課題台帳.md', ['Department', '自動化課題', '優先度'])
review_issues = parse_board('ledgers/全部署論点総点検台帳.md', ['Department', 'Submission summary', 'Priority'])
origination_agendas = parse_board('ledgers/部署議題創出台帳.md', ['Department', 'Candidate', 'Priority band'])

# Parse individual motions (non-sitting proposals)
motions = {}
for f in glob.glob('proposals/operations/*-motion.md') + glob.glob('proposals/operations/*-review.md') + glob.glob('proposals/operations/*議案.md') + glob.glob('proposals/operations/*レビュー.md'):
    if 'ordinary-sitting' in f:
        continue
    fm, body = parse_frontmatter(f)
    mid = fm.get('id', os.path.basename(f).replace('.md', ''))
    motions[mid] = {
        'id': mid,
        'title': extract_section(body, '')[0] if body.strip().startswith('#') else mid,
        'status': fm.get('status', ''),
        'owner': fm.get('owner', ''),
        'risk': fm.get('risk', ''),
        'goal': extract_section(body, 'Goal'),
        'proposed_action': extract_section(body, 'Proposed action'),
        'why': extract_section(body, 'Why'),
        'discussion_1': extract_section(body, 'Discussion-1 note'),
        'discussion_2': extract_section(body, 'Discussion-2 note'),
        'deliberation': extract_section(body, 'Deliberation result'),
    }
    # Also extract title from first H1 line
    for line in body.split('\n'):
        if line.startswith('# '):
            motions[mid]['title'] = line.lstrip('# ').strip()
            break

# Commits
try:
    log = subprocess.check_output(['git', 'log', '-20', '--pretty=format:%h|%an|%ci|%s'], text=True).strip().split('\n')
    commits = [{'hash': p[0], 'author': p[1], 'date': p[2], 'message': p[3]} for line in log for p in [line.split('|', 3)] if len(p) == 4]
except:
    commits = []

# Parse approval branches
approval_branches = parse_board('ledgers/承認分岐台帳.md', ['Branch ID', '承認対象'])
approval_drills = parse_board('ledgers/承認分岐模擬訓練台帳.md', ['Drill ID', '模擬承認対象'])

# Parse approval request tickets (承認要求票) if any exist
approval_requests = []
for f in glob.glob('ledgers/承認要求票-*.md') + glob.glob('ledgers/approval-request-*.md'):
    fm, body = parse_frontmatter(f)
    rows = parse_table(body, ['Field', 'Value'])
    ticket = {r.get('Field',''): r.get('Value','') for r in rows}
    ticket['id'] = fm.get('id', os.path.basename(f).replace('.md',''))
    ticket['status'] = fm.get('status', '')
    approval_requests.append(ticket)

# Parse approval return records (承認返却記録) if any exist
approval_returns = []
for f in glob.glob('ledgers/承認返却記録-*.md') + glob.glob('ledgers/approval-return-*.md'):
    fm, body = parse_frontmatter(f)
    rows = parse_table(body, ['Field', 'Value'])
    record = {r.get('Field',''): r.get('Value','') for r in rows}
    record['id'] = fm.get('id', os.path.basename(f).replace('.md',''))
    approval_returns.append(record)

# Git branches (for approval branch visualization)
try:
    branches_raw = subprocess.check_output(['git', 'branch', '-a', '--format=%(refname:short)|%(upstream:short)|%(committerdate:iso8601)|%(subject)'], text=True).strip().split('\n')
    git_branches = []
    for line in branches_raw:
        parts = line.split('|', 3)
        if len(parts) >= 1 and parts[0].strip():
            git_branches.append({
                'name': parts[0].strip(),
                'upstream': parts[1].strip() if len(parts) > 1 else '',
                'date': parts[2].strip() if len(parts) > 2 else '',
                'message': parts[3].strip() if len(parts) > 3 else ''
            })
except:
    git_branches = []

result = {
    'sittings': sittings,
    'rulings': {str(k): v for k, v in rulings.items()},
    'improvement_board': improvement_items,
    'motions': motions,
    'departments': departments,
    'officeholders': officeholders,
    'units': units,
    'activities': activities,
    'work_allocation': work_allocation,
    'automation_issues': automation_issues,
    'review_issues': review_issues,
    'origination_agendas': origination_agendas,
    'approval_branches': approval_branches,
    'approval_drills': approval_drills,
    'approval_requests': approval_requests,
    'approval_returns': approval_returns,
    'git_branches': git_branches,
    'commits': commits,
    'stats': {
        'total_sittings': len(sittings),
        'total_departments': len(departments),
        'total_units': len(units),
        'active_units': len([u for u in units if u.get('Lane state') == 'active']),
        'total_motions': len(improvement_items),
        'total_proposals': len(motions),
        'completed_motions': len([i for i in improvement_items if 'complete' in i.get('Status','').lower() or 'closed' in i.get('Cycle stage','').lower()]),
        'open_approvals': len([a for a in approval_branches if a.get('状態','') not in ('standby','completed','closed')])
    },
    'generated_at': commits[0]['date'] if commits else ''
}

with open('dashboard/status.json', 'w', encoding='utf-8') as f:
    json.dump(result, f, ensure_ascii=False, indent=2)

print(f"Generated: {len(sittings)} sittings, {len(rulings)} rulings, {len(departments)} departments, {len(units)} units, {len(improvement_items)} motions, {len(officeholders)} officeholders, {len(activities)} activities, {len(approval_branches)} approval branches, {len(git_branches)} git branches")
