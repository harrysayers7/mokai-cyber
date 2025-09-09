# Week 2 Checklist - Days 8-14

## Day 8-9: Executive Report ✅

### The ONLY Report That Matters
```typescript
// app/reports/page.tsx
// One-page executive summary with:
// - Organization name and date
// - Big overall maturity score (0-100%)
// - Table of 8 controls with red/amber/green
// - Next review date
// - Print button (window.print())
```

### Report Template Structure
```html
<!-- Keep it simple, government prints everything -->
<div class="max-w-4xl mx-auto p-8 bg-white">
  <header>
    <h1>Essential Eight Compliance Report</h1>
    <h2>[Organization Name]</h2>
    <p>Report Date: [Date]</p>
  </header>
  
  <div class="overall-score">
    <h3>Overall Maturity</h3>
    <div class="score-display">[65%]</div>
    <div class="status-badge">[AMBER - Action Required]</div>
  </div>
  
  <table>
    <!-- 8 controls with maturity levels -->
  </table>
  
  <footer>
    <p>Next Review: [Date]</p>
    <p>Prepared by: Mokai Cyber</p>
  </footer>
</div>
```

### Print Styles
```css
@media print {
  /* Hide everything except report */
  body * { visibility: hidden; }
  .report-content, .report-content * { visibility: visible; }
  .report-content { position: absolute; left: 0; top: 0; }
  
  /* Force white background, black text */
  * { background: white !important; color: black !important; }
  
  /* Page breaks */
  .report-content { page-break-inside: avoid; }
}
```

### By End of Day 9
- [ ] Report displays all control statuses
- [ ] Print preview looks professional
- [ ] Fits on one A4 page
- [ ] No navigation/UI elements in print
- [ ] Government logo placeholder (they'll add their own)

## Day 10-11: Production Deployment ✅

### Production Checklist
```bash
# Environment Variables (Vercel)
DATABASE_URL=postgresql://...
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=...
CLERK_SECRET_KEY=...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding
```

### Security Basics (Government Requirements)
- [ ] Force HTTPS (Vercel does this)
- [ ] Set secure headers
- [ ] Enable Clerk MFA for all users
- [ ] Add rate limiting (Vercel handles basic)
- [ ] Audit log includes IP addresses

### Create Production Demo Data
```typescript
// scripts/seed-demo.ts
const createDemoOrg = async () => {
  const org = await prisma.organization.create({
    data: {
      name: 'Australian Cyber Security Centre (Demo)',
      abn: '12345678901',
      contactEmail: 'demo@mokai.cyber',
      tier: 'pilot'
    }
  });
  
  // Create controls with realistic scores
  const controls = [
    { controlId: 'app-control', maturityLevel: 2 },
    { controlId: 'patch-apps', maturityLevel: 1 }, // Shows weakness
    { controlId: 'ms-office', maturityLevel: 3 },
    { controlId: 'user-apps', maturityLevel: 2 },
    { controlId: 'admin-priv', maturityLevel: 1 }, // Shows weakness
    { controlId: 'patch-os', maturityLevel: 2 },
    { controlId: 'mfa', maturityLevel: 3 },
    { controlId: 'backup', maturityLevel: 2 }
  ];
  
  // Overall: 62.5% - Room for improvement
};
```

### By End of Day 11
- [ ] Deployed to production URLs
- [ ] Custom domain configured (compliance.mokaicyber.com.au)
- [ ] SSL certificate active
- [ ] Demo account created
- [ ] Tested on government network (if possible)

## Day 12: Demo Preparation ✅

### Demo Script (15 minutes max)
```markdown
1. **Introduction (2 min)**
   - Mokai Cyber: 100% Indigenous-owned
   - IPP procurement advantages
   - Jack Bell, Technical Director

2. **Problem Statement (2 min)**
   - Essential Eight compliance is mandatory
   - Current process: Spreadsheets, emails
   - No real-time visibility

3. **Dashboard Demo (5 min)**
   - Login with MFA
   - Show 8 controls at a glance
   - Update a control (live)
   - Show audit trail

4. **Report Generation (3 min)**
   - Generate executive summary
   - Print to PDF
   - "Board-ready in 30 seconds"

5. **Pricing & Next Steps (3 min)**
   - $2,000/month pilot pricing
   - 30-day trial available
   - Can deploy today
```

### Prepare Demo Environment
- [ ] Reset demo data to clean state
- [ ] Test on tablet/iPad
- [ ] Prepare offline backup (screenshots)
- [ ] Print sample report as handout
- [ ] Test screen sharing on Teams/Zoom

## Day 13: Final Polish ✅

### Critical Bug Fixes Only
- [ ] Test every button/link
- [ ] Verify calculations are correct
- [ ] Check responsive on all devices
- [ ] Ensure fast load times (<2 seconds)
- [ ] Fix any console errors

### Add These Small Touches
```typescript
// Loading states (keep simple)
{isLoading ? 'Loading...' : data}

// Error states (basic)
{error ? 'Please try again' : null}

// Success feedback
toast.success('Control updated');

// Confirmation dialogs
confirm('Update control maturity?')
```

### Do NOT Add
- ❌ Complex animations
- ❌ Perfect error handling
- ❌ Comprehensive validation
- ❌ Edge case handling
- ❌ Performance optimization

## Day 14: Go-Live Day ✅

### Morning Checklist
- [ ] Production is stable
- [ ] Demo account works
- [ ] Report generates correctly
- [ ] MFA is enforced
- [ ] Audit log is recording

### Prepare Sales Materials
```markdown
## One-Page Sales Sheet

**Mokai Cyber - Essential Eight Compliance Dashboard**

✅ 100% Indigenous-owned (IPP eligible)
✅ Track all 8 Essential Eight controls
✅ Generate board reports in seconds
✅ Full audit trail for compliance
✅ Multi-factor authentication included

**Pricing:**
- Pilot: $2,000/month (up to 1 agency)
- Standard: $5,000/month (up to 5 agencies)  
- Enterprise: Contact us

**Contact:**
Jack Bell - Technical Director
jack@mokaicyber.com.au
```

### Send to First Prospects
- [ ] Email 5 government CISOs
- [ ] Message 10 contacts on LinkedIn
- [ ] Book 3 demos for next week
- [ ] Post on Indigenous business networks
- [ ] Contact AusCERT/ACSC contacts

## Success Criteria - End of Week 2

### Must Have ✅
- [ ] Live production URL
- [ ] Demo account ready
- [ ] Executive report works
- [ ] First demo booked
- [ ] Jack has talked to 5 prospects

### Should Have ⚠️
- [ ] 3 demos scheduled
- [ ] Clean UI (not perfect)
- [ ] Basic error handling
- [ ] Mobile responsive

### Won't Have ❌
- [ ] Additional frameworks
- [ ] Automated scanning
- [ ] Complex workflows
- [ ] API integrations
- [ ] Perfect code

## Post-Launch Reality Check

Week 3 priorities:
1. **Demo to everyone who will listen**
2. **Get feedback from real CISOs**
3. **Sign first pilot customer**
4. **Only then consider new features**

Remember: You can iterate after you have paying customers. Perfect is the enemy of shipped.

## Emergency Support

If production breaks:
1. Revert to last working deploy
2. Fix forward if simple
3. Communicate with any pilot users
4. Don't panic - government moves slowly

---

**Friday 5pm Success Metric:** Can a government CISO sign up, track their Essential Eight compliance, and generate a report without your help? If yes, you've shipped. If no, work the weekend.