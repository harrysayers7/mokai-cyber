import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const orgId = searchParams.get('orgId')
    const limit = parseInt(searchParams.get('limit') || '50')
    
    if (!orgId) {
      return NextResponse.json({ error: 'Organization ID required' }, { status: 400 })
    }
    
    const logs = await prisma.auditLog.findMany({
      where: { organizationId: orgId },
      orderBy: { createdAt: 'desc' },
      take: limit
    })
    
    return NextResponse.json(logs)
  } catch (error) {
    console.error('Failed to fetch audit logs:', error)
    return NextResponse.json({ error: 'Failed to fetch audit logs' }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const { organizationId, action, details } = await request.json()
    
    if (!organizationId || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    const log = await prisma.auditLog.create({
      data: {
        organizationId,
        action,
        details: details || {},
        ipAddress: request.headers.get('x-forwarded-for') || 'unknown'
      }
    })
    
    return NextResponse.json(log)
  } catch (error) {
    console.error('Failed to create audit log:', error)
    return NextResponse.json({ error: 'Failed to create audit log' }, { status: 500 })
  }
}