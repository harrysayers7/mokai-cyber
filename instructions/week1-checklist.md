# Week 1 Checklist - Days 1-7

## Day 1-2: Foundation Setup ✅

### Morning (2 hours)
```bash
# Initialize the project - NO CUSTOMIZATION
npx create-next-app@latest mokai-dashboard --typescript --tailwind --app --src-dir=false --import-alias="@/*"
cd mokai-dashboard

# Install ONLY these packages
npm install @clerk/nextjs @prisma/client prisma
npm install @tanstack/react-query axios
npm install lucide-react

# Initialize shadcn/ui
npx shadcn-ui@latest init -y
```

### Afternoon (4 hours)
```bash
# Add ONLY these shadcn components
npx shadcn-ui@latest add card table button form input badge alert

# Setup Prisma
npx prisma init
# Copy schema from instructions/data-model.md
npx prisma generate
npx prisma db push
```

### By End of Day 2
- [ ] Next.js running locally
- [ ] Clerk auth configured (sign-in works)
- [ ] PostgreSQL connected (Railway)
- [ ] Prisma schema deployed
- [ ] Git repository pushed

## Day 3-4: Essential Eight CRUD ✅

### Create Core Components
```typescript
// app/dashboard/page.tsx
// - Display 8 controls in a table
// - Show overall maturity score
// - Red/Amber/Green status badges

// app/dashboard/controls/[id]/page.tsx  
// - Update maturity level (0-3)
// - Add evidence text
// - Set next review date
```

### API Routes (Keep Simple)
```typescript
// app/api/controls/route.ts
// GET: List all controls for org
// POST: Update control maturity

// app/api/audit/route.ts
// GET: List recent changes
// No POST needed - automatic via control updates
```

### By End of Day 4
- [ ] Can view all 8 controls
- [ ] Can update maturity levels
- [ ] Overall score calculates correctly
- [ ] Audit log captures changes
- [ ] No errors in console

## Day 5-6: Polish Dashboard ✅

### Dashboard Features
- [ ] Big number for overall maturity (with color)
- [ ] Next review date prominently displayed
- [ ] "Last updated" for each control
- [ ] Simple table, no fancy charts

### Add Organization Setup
```typescript
// app/onboarding/page.tsx
// - Organization name
// - ABN
// - Contact email
// - Create 8 controls with default level 0
```

### By End of Day 6
- [ ] Dashboard loads in under 1 second
- [ ] Mobile responsive (government uses iPads)
- [ ] Can create new organization
- [ ] Can switch between orgs (if multiple)
- [ ] Deployed to Vercel (staging)

## Day 7: Testing & Cleanup ✅

### Critical Testing
- [ ] Sign up flow works end-to-end
- [ ] Can update all 8 controls
- [ ] Audit log shows all changes
- [ ] No broken links or pages
- [ ] Works on mobile/tablet

### Create Demo Organization
```sql
-- Run this in production before demos
INSERT INTO "Organization" (name, abn, "contactEmail", tier)
VALUES ('Department of Example', '12345678901', 'demo@mokai.com', 'pilot');

-- Set realistic maturity levels
-- Overall ~60% to show room for improvement
```

### Documentation
Create a single `DEMO_GUIDE.md` with:
- Login credentials for demo account
- Talking points for each screen
- How to reset demo data
- Common questions and answers

## ⚠️ NOT ALLOWED in Week 1

### Do NOT Build:
- ❌ User management interface
- ❌ Email notifications  
- ❌ PDF generation
- ❌ Data visualization/charts
- ❌ API documentation
- ❌ Test suites
- ❌ CI/CD pipelines
- ❌ Custom error pages
- ❌ Loading skeletons
- ❌ Dark mode

### Do NOT Optimize:
- ❌ Database queries (they're fine)
- ❌ Bundle size (Vercel handles it)
- ❌ Image optimization
- ❌ SEO (it's behind auth)
- ❌ Accessibility beyond basics

### Do NOT Add:
- ❌ Additional frameworks
- ❌ Control subcategories
- ❌ File uploads
- ❌ Automated assessments
- ❌ Third-party integrations

## Daily Standup Template

```markdown
### Day X Standup

**Shipped Yesterday:**
- [Specific feature that works]

**Shipping Today:**
- [Specific feature to complete]

**Blockers:**
- [Only technical blockers, not design decisions]

**Demo-Ready Features:**
- [Count of features you can show a client]
```

## Emergency Fixes Only

If something is broken:
1. Can users log in? Fix immediately.
2. Can they update controls? Fix immediately.
3. Can they see the dashboard? Fix immediately.
4. Anything else? Add to Week 2.

## Success Metrics for Week 1

✅ **MUST HAVE:**
- Working auth with MFA
- All 8 controls visible
- Can update maturity levels
- Overall score displays
- Audit log works
- Deployed to staging

⚠️ **NICE TO HAVE:**
- Polished UI
- Perfect mobile layout
- Smooth animations
- Error handling

❌ **NOT NEEDED:**
- Reports (Week 2)
- User management (Week 2)
- Email notifications (Phase 2)
- Anything else (Never)

---

**Friday 5pm Check:** Can you demo this to a government CISO on Monday? If yes, Week 1 complete. If no, work the weekend.