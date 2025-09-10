"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ESSENTIAL_EIGHT, MATURITY_LEVELS } from "@/lib/constants"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

type ControlData = {
  id: string
  controlId: string
  organizationId: string
  maturityLevel: number
  lastUpdated: string
  evidence: string | null
}

type OrganizationData = {
  id: string
  name: string
  abn: string
}

export default function Dashboard() {
  const [organization, setOrganization] = useState<OrganizationData | null>(null)
  const [controls, setControls] = useState<ControlData[]>([])
  const [loading, setLoading] = useState(true)

  // Load data from API
  useEffect(() => {
    async function loadData() {
      try {
        // Get organizations first
        const orgsResponse = await fetch('/api/organizations')
        const orgs = await orgsResponse.json()
        
        if (orgs.length > 0) {
          const org = orgs[0] // Use first organization for MVP
          setOrganization(org)
          
          // Get controls for this organization
          const controlsResponse = await fetch(`/api/controls?orgId=${org.id}`)
          const controlsData = await controlsResponse.json()
          setControls(controlsData)
        }
        
        setLoading(false)
      } catch (error) {
        console.error('Failed to load data:', error)
        setLoading(false)
      }
    }
    
    loadData()
  }, [])

  const getMaturityColor = (level: number) => {
    const maturity = MATURITY_LEVELS.find(m => m.level === level)
    switch (maturity?.color) {
      case 'green': return 'default'
      case 'yellow': return 'secondary'
      case 'orange': return 'outline'
      case 'red': return 'destructive'
      default: return 'secondary'
    }
  }

  const getMaturityName = (level: number) => {
    const maturity = MATURITY_LEVELS.find(m => m.level === level)
    return maturity?.name || 'Unknown'
  }

  const updateMaturityLevel = async (controlId: string, newLevel: string) => {
    const level = parseInt(newLevel)
    
    if (!organization) return
    
    try {
      // Update control via API
      await fetch('/api/controls', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          controlId,
          maturityLevel: level,
          organizationId: organization.id
        })
      })
      
      // Update local state
      setControls(prev => 
        prev.map(control => 
          control.controlId === controlId 
            ? { ...control, maturityLevel: level, lastUpdated: new Date().toISOString() }
            : control
        )
      )
      
      console.log(`Updated ${controlId} to level ${level} with audit logging`)
    } catch (error) {
      console.error('Failed to update control:', error)
    }
  }

  const getProgressColor = (level: number) => {
    switch (level) {
      case 3: return 'bg-green-500'
      case 2: return 'bg-yellow-500'
      case 1: return 'bg-orange-500'
      default: return 'bg-red-500'
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6 min-h-screen bg-gray-50">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg text-gray-600">Loading Essential Eight dashboard...</div>
        </div>
      </div>
    )
  }

  if (!organization) {
    return (
      <div className="container mx-auto p-6 min-h-screen bg-gray-50">
        <div className="text-center text-gray-600">No organization found. Please check your database setup.</div>
      </div>
    )
  }

  // Create a display list that matches controls with their names
  const displayControls = ESSENTIAL_EIGHT.map(essential => {
    const controlData = controls.find(c => c.controlId === essential.id)
    return {
      ...essential,
      maturityLevel: controlData?.maturityLevel || 0,
      lastUpdated: controlData?.lastUpdated || new Date().toISOString(),
      evidence: controlData?.evidence || 'No evidence provided yet'
    }
  })

  const overallMaturity = Math.round(
    displayControls.reduce((sum, control) => sum + control.maturityLevel, 0) / 8 * 100 / 3
  )

  return (
    <div className="container mx-auto p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Essential Eight Dashboard</h1>
        <p className="text-gray-600 mt-2">
          {organization.name} • ABN: {organization.abn}
        </p>
      </div>

      {/* Overall Score Card */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="text-center">Overall Maturity Score</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <div className="text-4xl font-bold text-blue-600 mb-2">{overallMaturity}%</div>
          <Progress value={overallMaturity} className="w-full mb-4" />
          <Badge variant={overallMaturity >= 75 ? "default" : overallMaturity >= 50 ? "secondary" : "destructive"}>
            {overallMaturity >= 75 ? "Good" : overallMaturity >= 50 ? "Needs Improvement" : "Critical"}
          </Badge>
        </CardContent>
      </Card>

      {/* Essential Eight Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mb-8">
        {displayControls.map((control) => (
          <Card key={control.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-lg">{control.name}</CardTitle>
                <Badge variant={getMaturityColor(control.maturityLevel)}>
                  Level {control.maturityLevel}
                </Badge>
              </div>
              <CardDescription>
                {getMaturityName(control.maturityLevel)}
              </CardDescription>
            </CardHeader>
            
            <CardContent>
              <div className="mb-4">
                <Progress 
                  value={(control.maturityLevel / 3) * 100} 
                  className="w-full h-2 mb-2"
                />
                <div className="text-sm text-gray-500">
                  Progress: {Math.round((control.maturityLevel / 3) * 100)}%
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-sm font-medium">Update Maturity Level:</label>
                  <Select 
                    value={control.maturityLevel.toString()} 
                    onValueChange={(value) => updateMaturityLevel(control.id, value)}
                  >
                    <SelectTrigger className="w-full mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {MATURITY_LEVELS.map((level) => (
                        <SelectItem key={level.level} value={level.level.toString()}>
                          Level {level.level} - {level.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="text-sm text-gray-500">
                  Last updated: {new Date(control.lastUpdated).toLocaleDateString()}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Buttons */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex gap-4 justify-center">
            <Link href="/reports">
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                📊 Generate Executive Report
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              📝 Add Evidence
            </Button>
            <Button variant="outline" size="lg">
              📅 Schedule Review
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <Card>
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-green-600">
              {displayControls.filter(c => c.maturityLevel === 3).length}
            </div>
            <div className="text-sm text-gray-600">Fully Implemented</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {displayControls.filter(c => c.maturityLevel === 2).length}
            </div>
            <div className="text-sm text-gray-600">Largely Implemented</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-orange-600">
              {displayControls.filter(c => c.maturityLevel === 1).length}
            </div>
            <div className="text-sm text-gray-600">Partially Implemented</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-4 text-center">
            <div className="text-2xl font-bold text-red-600">
              {displayControls.filter(c => c.maturityLevel === 0).length}
            </div>
            <div className="text-sm text-gray-600">Not Implemented</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}