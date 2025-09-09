import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Essential Eight controls - hardcoded because they don't change
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

export async function GET() {
  try {
    const orgs = await prisma.organization.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(orgs)
  } catch (error) {
    console.error('Failed to fetch organizations:', error)
    return NextResponse.json({ error: 'Failed to fetch organizations' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json()
    
    // Create org with all Essential Eight controls initialized
    const org = await prisma.organization.create({
      data: {
        name: data.name,
        abn: data.abn,
        controls: {
          create: ESSENTIAL_EIGHT.map(control => ({
            controlId: control.id,
            maturityLevel: 0,
            nextReview: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000), // 90 days
            evidence: 'Initial assessment pending'
          }))
        }
      },
      include: {
        controls: true
      }
    })
    
    // Log the creation
    await prisma.auditLog.create({
      data: {
        organizationId: org.id,
        action: 'organization.created',
        details: { name: org.name, abn: org.abn }
      }
    })
    
    return NextResponse.json(org)
  } catch (error) {
    console.error('Failed to create organization:', error)
    return NextResponse.json({ error: 'Failed to create organization' }, { status: 500 })
  }
}