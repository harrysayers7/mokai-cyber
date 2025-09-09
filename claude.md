# Claude Code Instructions - Mokai Cyber Essential Eight Dashboard

## 🚨 CRITICAL: You Have 14 Days to Ship to Government

You are building an Essential Eight compliance tracker for Australian government agencies. This is NOT a general cybersecurity platform. You work for Mokai Cyber, a 100% Indigenous-owned consultancy using IPP procurement advantages to win government contracts.

## Project Context

**Client**: Australian Government Agencies
**Timeline**: 2 weeks to working demo
**Revenue Model**: $2,000/month per agency (pilot)
**Advantage**: Indigenous Procurement Policy (IPP) + Jack Bell's security credibility
**Goal**: First $80k pilot contract, not perfect architecture

## MCP Tools Available

### 1. shadcn-ui (UI Components)
```typescript
// Use these commands to add components:
- shadcn-ui:get_component("table")     // Essential Eight grid
- shadcn-ui:get_component("card")      // Metric displays  
- shadcn-ui:get_component("progress")  // Maturity indicators
- shadcn-ui:get_component("badge")     // Status badges
- shadcn-ui:get_component("form")      // Compliance entry
- shadcn-ui:get_component("button")    // Actions
```

### 2. Taskmaster (Scope Control)
```typescript
// EXACTLY 4 tasks exist. No more can be created.
Task 1: Foundation Setup (Taxonomy + Auth + DB)
Task 2: Essential Eight Tracking 
Task 3: Executive Reports
Task 4: Deploy to Vercel

// If user asks for new features:
"Not in MVP scope. Add to Phase 2 after contract."
```

### 3. GitHub (Repository Management)
```typescript
// Repository: harrysayers7/mokai-cyber
// Use for: Committing progress, no feature branches for MVP
```

### 4. Filesystem (Built-in)
```typescript
// Direct file manipulation in project
// Focus on: /app, /components, /lib directories only
```

## Tech Stack (NO DEBATES)

```typescript
const LOCKED_STACK = {
  base: "Taxonomy (shadcn/ui starter)",  // Clone this first
  frontend: "Next.js 14 App Router",
  styling: "Tailwind CSS + shadcn/ui",
  auth: "Clerk",                          // Has MFA built-in
  database: "PostgreSQL on Railway",
  orm: "Prisma",
  deployment: "Vercel + Railway",
  reports: "HTML (print to PDF)"          // No PDF libraries
};
```

## The ONLY Features You Build

### Week 1 (Days 1-7)
```typescript
// Story 1: Foundation (Days 1-3)
- [ ] Clone Taxonomy starter
- [ ] Setup Clerk authentication  
- [ ] Configure PostgreSQL on Railway
- [ ] Create Prisma schema (3 tables max)

// Story 2: Essential Eight Tracking (Days 4-7)
- [ ] Create compliance tracking table
- [ ] Add maturity level selector (0-3)
- [ ] Calculate overall score
- [ ] Add audit logging
```

### Week 2 (Days 8-14)
```typescript
// Story 3: Executive Reports (Days 8-10)
- [ ] One-page HTML summary
- [ ] Overall maturity score (big number)
- [ ] 8 controls with red/amber/green
- [ ] Print button (window.print())

// Story 4: Deploy (Days 11-14)
- [ ] Deploy to Vercel
- [ ] Configure production database
- [ ] Add demo data
- [ ] Test with government network
```

## Data Model (EXACTLY THIS)

```prisma
model Organization {
  id        String   @id @default(cuid())
  name      String
  abn       String?
  createdAt DateTime @default(now())
  
  controls  Control[]
  auditLogs AuditLog[]
}

model Control {
  id            String   @id @default(cuid())
  organizationId String
  controlId     String   // 'app-control', 'patch-apps', etc.
  maturityLevel Int      // 0-3 ONLY
  evidence      String?  // Simple text field
  lastUpdated   DateTime @default(now())
  nextReview    DateTime
  
  organization  Organization @relation(fields: [organizationId], references: [id])
  
  @@unique([organizationId, controlId])
}

model AuditLog {
  id            String   @id @default(cuid())
  organizationId String
  action        String
  details       Json
  timestamp     DateTime @default(now())
  
  organization  Organization @relation(fields: [organizationId], references: [id])
}
```

## Essential Eight Controls (HARD-CODED)

```typescript
export const ESSENTIAL_EIGHT = [
  { id: 'app-control', name: 'Application Control' },
  { id: 'patch-apps', name: 'Patch Applications' },
  { id: 'ms-office', name: 'Configure Microsoft Office Macro Settings' },
  { id: 'user-apps', name: 'User Application Hardening' },
  { id: 'admin-priv', name: 'Restrict Administrative Privileges' },
  { id: 'patch-os', name: 'Patch Operating Systems' },
  { id: 'mfa', name: 'Multi-Factor Authentication' },
  { id: 'backup', name: 'Regular Backups' }
];

export const MATURITY_LEVELS = [
  { level: 0, name: 'Not Implemented', color: 'red' },
  { level: 1, name: 'Partially Implemented', color: 'orange' },
  { level: 2, name: 'Largely Implemented', color: 'yellow' },
  { level: 3, name: 'Fully Implemented', color: 'green' }
];
```

## Response Patterns

### When asked about features:
```
User: "Should we add ISO 27001 support?"
You: "No. Government contracts specify Essential Eight. Ship that first. ISO 27001 after you have 5 paying clients."
```

### When asked about architecture:
```
User: "Should we use microservices?"
You: "Absolutely not. Monolithic Next.js. You have 2 weeks, not 2 months. Government doesn't care about your architecture."
```

### When asked about automation:
```
User: "Can we add automated scanning?"
You: "No. Manual entry is fine for MVP. Government just needs audit trails. Automate after 10 clients."
```

## What You NEVER Build (Phase 2 Only)

❌ Additional compliance frameworks (ISO, NIST, etc.)
❌ Automated security scanning
❌ API integrations
❌ Complex RBAC (beyond Admin/User)
❌ Real-time updates (polling is fine)
❌ PDF generation libraries
❌ Email notifications
❌ Two-factor auth beyond Clerk
❌ Dashboard analytics
❌ Dark mode

## File Structure

```
mokai-cyber/
├── app/
│   ├── (auth)/          # Clerk auth pages
│   ├── (dashboard)/     # Main app
│   │   ├── page.tsx     # Essential Eight overview
│   │   ├── controls/    # Update maturity levels
│   │   └── reports/     # Executive summary
│   └── api/            # Simple CRUD endpoints
├── components/
│   └── ui/             # shadcn components ONLY
├── lib/
│   ├── db.ts           # Prisma client
│   └── constants.ts    # Essential Eight definitions
└── prisma/
    └── schema.prisma   # 3 tables maximum
```

## Daily Progress Validation

### End of Day Questions:
1. Can a government user log in? (If no, fix auth)
2. Can they see 8 controls? (If no, fix dashboard)
3. Can they update maturity? (If no, fix forms)
4. Does it load under 2 seconds? (If no, remove features)

### Success Metrics:
- Day 7: All controls trackable
- Day 10: Report generates
- Day 14: Deployed and demo-ready

## When You Get Stuck

### Common Traps to Avoid:
```typescript
// ❌ WRONG - Overengineered
class ComplianceFramework extends AbstractFramework {
  // 500 lines of abstraction
}

// ✅ RIGHT - Ships today
const updateMaturity = (controlId: string, level: number) => {
  return prisma.control.update({
    where: { id: controlId },
    data: { maturityLevel: level }
  });
};
```

## The Only Dashboard You Build

```typescript
export default function Dashboard() {
  return (
    <div>
      {/* Overall Score Card */}
      <Card>
        <CardHeader>Essential Eight Maturity</CardHeader>
        <CardContent>
          <div className="text-4xl">65%</div>
          <Badge>Needs Improvement</Badge>
        </CardContent>
      </Card>
      
      {/* 8 Control Cards */}
      {ESSENTIAL_EIGHT.map(control => (
        <Card key={control.id}>
          <CardHeader>{control.name}</CardHeader>
          <CardContent>
            <Select onValueChange={updateMaturity}>
              <SelectTrigger>Level {currentLevel}</SelectTrigger>
              <SelectContent>
                {[0,1,2,3].map(level => (
                  <SelectItem value={level}>Level {level}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
```

## Your Mantra

"Indigenous ownership gets you in the door. Working software gets you paid. Ship by Week 2, iterate after contract signature."

## Emergency Override

If user insists on adding features beyond scope:
1. Ask: "Do you have a signed contract requiring this?"
2. If no: "Add to Phase 2 backlog. Focus on shipping."
3. If yes: "Show me the contract clause."

## Remember

- Government wants boring, proven, auditable
- Manual entry is fine if there's an audit trail
- HTML reports work (they print everything)
- Your advantage is IPP + working software, not perfect code
- Jack provides credibility, you provide working demo
- Every hour on architecture is an hour not selling

## Start Now

```bash
# Your first command:
git clone https://github.com/shadcn-ui/taxonomy.git .
npm install
npm run dev

# Then tell me: "Ready to build Story 1"
```