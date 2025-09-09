# ⛔ STOP - READ THIS BEFORE CODING

## You Have 14 Days to Ship

Every line of code you write should answer YES to:
1. Does this help track Essential Eight compliance?
2. Can I demo this to government in 2 weeks?
3. Is this the simplest solution that works?

If NO to any → **DON'T BUILD IT**

## The ONLY User Story That Matters

"As a government CISO, I need to see my Essential Eight maturity score and generate a board report in under 5 minutes so I can meet quarterly compliance requirements."

## What Government Actually Wants

### They Want:
- ✅ Essential Eight tracking (ONLY)
- ✅ Simple red/amber/green dashboard
- ✅ PDF reports for board meetings
- ✅ Audit trail for changes
- ✅ MFA (Clerk provides this)

### They DON'T Want:
- ❌ 15 compliance frameworks
- ❌ Real-time automated scanning
- ❌ AI-powered insights
- ❌ Complex integrations
- ❌ Your clever architecture

## Your Anti-Patterns Checklist

When you think about adding:
- **"Multi-tenant architecture"** → Use row-level security
- **"Microservices"** → Monolithic Next.js app
- **"Event sourcing"** → Simple audit log table
- **"GraphQL"** → REST endpoints
- **"Redis caching"** → Let Vercel handle it
- **"Docker/K8s"** → Vercel + Railway
- **"Custom auth"** → Clerk. Period.
- **"Background jobs"** → Not in MVP
- **"Websockets"** → Page refresh is fine
- **"Design system"** → shadcn/ui only

## Week-by-Week Reality Check

### Week 1 Success Criteria:
- [ ] Can create an organization
- [ ] Can manually enter Essential Eight scores
- [ ] Can see a dashboard with 8 controls
- [ ] Has working auth with MFA

### Week 2 Success Criteria:
- [ ] Can generate one-page report
- [ ] Has audit logging
- [ ] Deployed and accessible
- [ ] Demo booked with real agency

## The Code You're Allowed to Write

```typescript
// YES - Simple, works, ships
const maturityLevels = [0, 1, 2, 3];
const updateCompliance = async (controlId, level) => {
  await db.compliance.update({ controlId, level });
  await db.auditLog.create({ action: 'update', controlId, level });
};

// NO - Overengineered, won't ship
class ComplianceAggregateRoot extends EventSourcedEntity {
  // 200 lines of DDD abstraction
}
```

## Your Daily Standup Questions

1. **What did I ship yesterday?** (Not plan, design, or discuss - SHIP)
2. **What will I ship today?** (Working code in production)
3. **What's blocking shipment?** (Then remove that blocker)

## If You're Reading This on Day 7

You should have:
- ✅ Working auth
- ✅ Essential Eight CRUD
- ✅ Basic dashboard
- ✅ Deployed to staging

You should NOT have:
- ❌ Perfect architecture
- ❌ 100% test coverage  
- ❌ Multiple frameworks
- ❌ API documentation
- ❌ Dark mode

## The Brutal Truth

Your Indigenous ownership gets you in the door.
Jack's reputation gets you the meeting.
**Working software gets you the contract.**

Every hour spent on "proper architecture" is an hour not spent getting your first $10k pilot.

## Emergency Contacts

When you're overthinking:
1. Re-read this document
2. Count your customers (hint: it's zero)
3. Check your bank balance
4. Ship something that works

---

**YOUR MANTRA**: "Does this get us to a demo next week? No? Then delete it."