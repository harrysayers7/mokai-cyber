import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const orgId = searchParams.get('orgId')
    
    if (!orgId) {
      return NextResponse.json({ error: 'Organization ID required' }, { status: 400 })
    }
    
    const controls = await prisma.control.findMany({
      where: { organizationId: orgId },
      orderBy: { controlId: 'asc' }
    })
    
    return NextResponse.json(controls)
  } catch (error) {
    console.error('Failed to fetch controls:', error)
    return NextResponse.json({ error: 'Failed to fetch controls' }, { status: 500 })
  }
}

export async function PUT(request: Request) {
  try {
    const { controlId, maturityLevel, organizationId, evidence } = await request.json()
    
    if (!controlId || maturityLevel === undefined || !organizationId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }
    
    // Update the control
    const control = await prisma.control.update({
      where: { 
        organizationId_controlId: { 
          organizationId, 
          controlId 
        }
      },
      data: { 
        maturityLevel: parseInt(maturityLevel),
        evidence: evidence || undefined,
        lastUpdated: new Date(),
        // Reset review date when updating
        nextReview: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
      }
    })
    
    // Create audit log
    await prisma.auditLog.create({
      data: {
        organizationId,
        action: 'control.updated',
        details: JSON.stringify({ 
          controlId, 
          maturityLevel: parseInt(maturityLevel),
          previousLevel: control.maturityLevel 
        })
      }
    })
    
    return NextResponse.json(control)
  } catch (error) {
    console.error('Failed to update control:', error)
    return NextResponse.json({ error: 'Failed to update control' }, { status: 500 })
  }
}