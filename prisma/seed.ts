import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const ESSENTIAL_EIGHT = [
  { id: 'app-control', name: 'Application Control' },
  { id: 'patch-apps', name: 'Patch Applications' },
  { id: 'configure-office', name: 'Configure Microsoft Office Macro Settings' },
  { id: 'user-hardening', name: 'User Application Hardening' },
  { id: 'restrict-admin', name: 'Restrict Administrative Privileges' },
  { id: 'patch-os', name: 'Patch Operating Systems' },
  { id: 'mfa', name: 'Multi-factor Authentication' },
  { id: 'backups', name: 'Regular Backups' },
]

async function main() {
  console.log('🚀 Seeding database for Mokai Cyber MVP...')
  
  // Create a demo organization for testing
  const org = await prisma.organization.create({
    data: {
      name: 'Department of Digital Services',
      abn: '12345678901',
      controls: {
        create: ESSENTIAL_EIGHT.map(control => ({
          controlId: control.id,
          maturityLevel: Math.floor(Math.random() * 4), // Random 0-3 for demo
          nextReview: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
          evidence: `Initial assessment completed. ${
            Math.random() > 0.5 ? 'Documentation available.' : 'Review pending.'
          }`
        }))
      }
    }
  })
  
  // Add some audit logs for demo
  await prisma.auditLog.createMany({
    data: [
      {
        organizationId: org.id,
        action: 'organization.created',
        details: JSON.stringify({ name: org.name })
      },
      {
        organizationId: org.id,
        action: 'assessment.completed',
        details: JSON.stringify({ assessor: 'Jack Bell', date: new Date().toISOString() })
      }
    ]
  })
  
  console.log('✅ Database seeded with organization:', org.name)
  console.log('✅ Created', ESSENTIAL_EIGHT.length, 'Essential Eight controls')
}

main()
  .catch(e => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })