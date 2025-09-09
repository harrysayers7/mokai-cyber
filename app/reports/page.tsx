"use client"

import { useState } from "react"
import { ESSENTIAL_EIGHT, MATURITY_LEVELS } from "@/lib/constants"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

type ControlData = {
  id: string
  name: string
  maturityLevel: number
  lastUpdated: Date
  evidence: string
}

export default function ExecutiveReport() {
  // Mock data - in production this would come from database
  const mockOrganization = {
    name: "Department of Defence",
    abn: "12345678901",
    reportDate: new Date()
  }

  const mockControls: ControlData[] = ESSENTIAL_EIGHT.map(control => ({
    ...control,
    maturityLevel: Math.floor(Math.random() * 4), // 0-3 for demo
    lastUpdated: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date within last 30 days
    evidence: "Sample evidence documentation and implementation notes"
  }))

  const overallMaturity = Math.round(
    mockControls.reduce((sum, control) => sum + control.maturityLevel, 0) / 8 * 100 / 3
  )

  const getMaturityName = (level: number) => {
    const maturity = MATURITY_LEVELS.find(m => m.level === level)
    return maturity?.name || 'Unknown'
  }

  const getStatusColor = (level: number) => {
    switch (level) {
      case 3: return 'text-green-600 bg-green-50'
      case 2: return 'text-yellow-600 bg-yellow-50'
      case 1: return 'text-orange-600 bg-orange-50'
      default: return 'text-red-600 bg-red-50'
    }
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Print Styles */}
      <style jsx>{`
        @media print {
          .no-print { display: none !important; }
          .print-break { page-break-after: always; }
          body { print-color-adjust: exact; }
        }
      `}</style>

      {/* Print Button - Hidden on print */}
      <div className="no-print fixed top-4 right-4 z-10">
        <Button onClick={handlePrint} className="bg-blue-600 hover:bg-blue-700">
          🖨️ Print Report
        </Button>
      </div>

      {/* Report Header */}
      <div className="p-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Essential Eight Compliance Report
          </h1>
          <div className="text-lg text-gray-600 mb-1">{mockOrganization.name}</div>
          <div className="text-sm text-gray-500">ABN: {mockOrganization.abn}</div>
          <div className="text-sm text-gray-500">
            Report Generated: {mockOrganization.reportDate.toLocaleDateString()}
          </div>
        </div>

        {/* Executive Summary */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Executive Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600">{overallMaturity}%</div>
                <div className="text-sm text-gray-600 mt-1">Overall Maturity</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-green-600">
                  {mockControls.filter(c => c.maturityLevel === 3).length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Fully Implemented</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-red-600">
                  {mockControls.filter(c => c.maturityLevel === 0).length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Not Implemented</div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Key Findings:</h3>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• {mockControls.filter(c => c.maturityLevel >= 2).length} of 8 controls are largely or fully implemented</li>
                <li>• {mockControls.filter(c => c.maturityLevel === 1).length} controls require immediate attention</li>
                <li>• {mockControls.filter(c => c.maturityLevel === 0).length} controls are not yet implemented</li>
                <li>• Recommend quarterly review cycle for ongoing compliance</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Control Status Overview */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Essential Eight Control Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockControls.map((control, index) => (
                <div key={control.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="font-semibold text-lg">
                        {index + 1}. {control.name}
                      </div>
                      <div className="text-sm text-gray-600">Control ID: {control.id}</div>
                    </div>
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(control.maturityLevel)}`}>
                      Level {control.maturityLevel} - {getMaturityName(control.maturityLevel)}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3 text-sm">
                    <div>
                      <span className="font-medium">Maturity Progress:</span>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className={`h-2 rounded-full ${
                            control.maturityLevel === 3 ? 'bg-green-500' :
                            control.maturityLevel === 2 ? 'bg-yellow-500' :
                            control.maturityLevel === 1 ? 'bg-orange-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${(control.maturityLevel / 3) * 100}%` }}
                        ></div>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {Math.round((control.maturityLevel / 3) * 100)}% Complete
                      </div>
                    </div>
                    <div>
                      <span className="font-medium">Last Updated:</span>
                      <div className="text-gray-600">{control.lastUpdated.toLocaleDateString()}</div>
                    </div>
                  </div>
                  
                  <div className="mt-3 text-sm">
                    <span className="font-medium">Evidence Summary:</span>
                    <div className="text-gray-600 mt-1">{control.evidence}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recommendations */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl">Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-red-500 pl-4 py-2">
                <h3 className="font-semibold text-red-700">Immediate Action Required</h3>
                <ul className="text-sm text-gray-600 mt-1 space-y-1">
                  {mockControls
                    .filter(c => c.maturityLevel === 0)
                    .map(control => (
                      <li key={control.id}>• Implement {control.name} controls</li>
                    ))}
                </ul>
              </div>
              
              <div className="border-l-4 border-yellow-500 pl-4 py-2">
                <h3 className="font-semibold text-yellow-700">Short Term (30-90 days)</h3>
                <ul className="text-sm text-gray-600 mt-1 space-y-1">
                  {mockControls
                    .filter(c => c.maturityLevel === 1)
                    .map(control => (
                      <li key={control.id}>• Enhance {control.name} implementation</li>
                    ))}
                </ul>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-semibold text-blue-700">Ongoing Maintenance</h3>
                <ul className="text-sm text-gray-600 mt-1 space-y-1">
                  <li>• Establish quarterly compliance reviews</li>
                  <li>• Update evidence documentation regularly</li>
                  <li>• Monitor for new threats and update controls accordingly</li>
                  <li>• Staff training on Essential Eight requirements</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="text-center text-sm text-gray-500 border-t pt-4">
          <p>This report was generated by Mokai Cyber Essential Eight Dashboard</p>
          <p>For questions about this report, contact your cybersecurity team</p>
        </div>
      </div>
    </div>
  )
}