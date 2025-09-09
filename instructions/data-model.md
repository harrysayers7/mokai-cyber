# Mokai Cyber Data Model - MVP Only

## The ONLY Data You Track for MVP

### Essential Eight Controls (Hard-coded)
```typescript
export const ESSENTIAL_EIGHT = [
  {
    id: 'app-control',
    name: 'Application Control',
    description: 'Prevent execution of unapproved/malicious programs',
    governmentPriority: 'MANDATORY',
    defaultMaturity: 0
  },
  {
    id: 'patch-apps',
    name: 'Patch Applications',
    description: 'Patch/mitigate vulnerabilities in applications',
    governmentPriority: 'MANDATORY',
    defaultMaturity: 0
  },
  {
    id: 'ms-office',
    name: 'Configure Microsoft Office Macro Settings',
    description: 'Block untrusted macros and macro-enabled files',
    governmentPriority: 'MANDATORY',
    defaultMaturity: 0
  },
  {
    id: 'user-apps',
    name: 'User Application Hardening',
    description: 'Configure web browsers, MS Office, PDF viewers',
    governmentPriority: 'MANDATORY',
    defaultMaturity: 0
  },
  {
    id: 'admin-priv',
    name: 'Restrict Administrative Privileges',
    description: 'Limit admin accounts and privileges',
    governmentPriority: 'MANDATORY',
    defaultMaturity: 0
  },
  {
    id: 'patch-os',
    name: 'Patch Operating Systems',
    description: 'Patch/mitigate OS vulnerabilities',
    governmentPriority: 'MANDATORY',
    defaultMaturity: 0
  },
  {
    id: 'mfa',
    name: 'Multi-Factor Authentication',
    description: 'MFA for all users and systems',
    governmentPriority: 'MANDATORY',
    defaultMaturity: 0
  },
  {
    id: 'backup',
    name: 'Regular Backups',
    description: 'Daily backups, tested restoration',
    governmentPriority: 'MANDATORY',
    defaultMaturity: 0
  }
];

export const MATURITY_LEVELS = [
  { level: 0, name: 'Not Implemented', color: 'bg-red-500', textColor: 'text-red-600' },
  { level: 1, name: 'Partially Implemented', color: 'bg-orange-500', textColor: 'text-orange-600' },
  { level: 2, name: 'Largely Implemented', color: 'bg-yellow-500', textColor: 'text-yellow-600' },
  { level: 3, name: 'Fully Implemented', color: 'bg-green-500', textColor: 'text-green-600' }
];
```

### Database Schema (Prisma)
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Organization {
  id            String   @id @default(cuid())
  name          String
  abn           String?  // Australian Business Number
  contactEmail  String
  tier          String   @default("pilot") // pilot, standard, enterprise
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  
  // Relations
  controls      Control[]
  reports       Report[]
  auditLogs     AuditLog[]
  users         User[]
}

model User {
  id             String   @id @default(cuid())
  clerkId        String   @unique // From Clerk auth
  email          String
  name           String?
  role           String   @default("viewer") // admin, editor, viewer
  organizationId String
  createdAt      DateTime @default(now())
  
  organization   Organization @relation(fields: [organizationId], references: [id])
  auditLogs      AuditLog[]
}

model Control {
  id             String   @id @default(cuid())
  organizationId String
  controlId      String   // matches ESSENTIAL_EIGHT.id
  maturityLevel  Int      @default(0) // 0-3
  evidence       String?  @db.Text // Simple text, no file uploads in MVP
  notes          String?  @db.Text
  lastAssessed   DateTime @default(now())
  nextReview     DateTime
  assessedBy     String?  // User's name who made the update
  
  organization   Organization @relation(fields: [organizationId], references: [id])
  
  @@unique([organizationId, controlId])
  @@index([organizationId])
}

model Report {
  id             String   @id @default(cuid())
  organizationId String
  reportDate     DateTime @default(now())
  overallScore   Float    // 0-100 percentage
  maturityScores Json     // { controlId: maturityLevel } snapshot
  generatedBy    String   // User's name
  reportUrl      String?  // If we store PDFs later (not in MVP)
  
  organization   Organization @relation(fields: [organizationId], references: [id])
  
  @@index([organizationId, reportDate])
}

model AuditLog {
  id             String   @id @default(cuid())
  organizationId String
  userId         String
  action         String   // 'control.update', 'report.generate', etc.
  entityType     String   // 'control', 'report', 'user'
  entityId       String   // ID of what was changed
  oldValue       Json?    // Previous state
  newValue       Json?    // New state
  ipAddress      String?
  userAgent      String?
  timestamp      DateTime @default(now())
  
  organization   Organization @relation(fields: [organizationId], references: [id])
  user          User @relation(fields: [userId], references: [id])
  
  @@index([organizationId, timestamp])
  @@index([userId, timestamp])
}
```

## Data Access Patterns (Keep It Simple)

### Dashboard Query
```typescript
// The ONLY query for the main dashboard
const getOrganizationCompliance = async (orgId: string) => {
  const controls = await prisma.control.findMany({
    where: { organizationId: orgId },
    orderBy: { controlId: 'asc' }
  });
  
  const overallScore = controls.reduce((acc, control) => 
    acc + (control.maturityLevel / 3) * 12.5, 0
  ); // Simple percentage calc
  
  return { controls, overallScore };
};
```

### Update Control
```typescript
const updateControl = async (
  orgId: string,
  controlId: string,
  maturityLevel: number,
  userId: string
) => {
  // Get old value for audit log
  const oldControl = await prisma.control.findUnique({
    where: { organizationId_controlId: { organizationId: orgId, controlId } }
  });
  
  // Update control
  const control = await prisma.control.upsert({
    where: { organizationId_controlId: { organizationId: orgId, controlId } },
    update: {
      maturityLevel,
      lastAssessed: new Date(),
      nextReview: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000) // 90 days
    },
    create: {
      organizationId: orgId,
      controlId,
      maturityLevel,
      nextReview: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
    }
  });
  
  // Create audit log
  await prisma.auditLog.create({
    data: {
      organizationId: orgId,
      userId,
      action: 'control.update',
      entityType: 'control',
      entityId: controlId,
      oldValue: oldControl ? { maturityLevel: oldControl.maturityLevel } : null,
      newValue: { maturityLevel }
    }
  });
  
  return control;
};
```

## Demo Data for Government Meetings

```typescript
// prisma/seed.ts
const DEMO_ORG = {
  name: 'Department of Digital Services',
  abn: '12345678901',
  contactEmail: 'ciso@dds.gov.au',
  tier: 'pilot'
};

const DEMO_CONTROLS = [
  { controlId: 'app-control', maturityLevel: 2 },
  { controlId: 'patch-apps', maturityLevel: 1 },
  { controlId: 'ms-office', maturityLevel: 3 },
  { controlId: 'user-apps', maturityLevel: 2 },
  { controlId: 'admin-priv', maturityLevel: 1 }, // Show room for improvement
  { controlId: 'patch-os', maturityLevel: 2 },
  { controlId: 'mfa', maturityLevel: 3 },
  { controlId: 'backup', maturityLevel: 2 }
];
// Overall score: 62.5% - Shows need for improvement without being terrible
```

## What You're NOT Storing (Phase 2)

- ❌ File attachments for evidence
- ❌ Detailed control sub-requirements
- ❌ Historical maturity trends
- ❌ Risk assessments
- ❌ Remediation plans
- ❌ Integration credentials
- ❌ Automated scan results
- ❌ Other framework data

## The Only Reports You Need

### Executive Summary (MVP)
```typescript
interface ExecutiveReport {
  organizationName: string;
  reportDate: string;
  overallMaturity: number; // 0-100%
  controls: Array<{
    name: string;
    maturity: 0 | 1 | 2 | 3;
    status: 'red' | 'amber' | 'green';
  }>;
  nextReviewDate: string;
  preparedBy: string;
}
```

That's it. No complex analytics. No trend analysis. No predictive insights.

**Remember**: Every additional field is a conversation about requirements you haven't had with a paying customer.