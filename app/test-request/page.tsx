"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function TestRequestPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const createTestUniversityRequest = async () => {
    try {
      setLoading(true)
      setMessage("Creating test university request...")

      const testRequest = {
        universityName: "Test University " + Date.now(),
        contactEmail: "test@university.edu",
        contactName: "John Doe",
        status: "pending",
        createdAt: new Date(),
        zone: "north_zone"
      }

      // Create request in Firestore
      const response = await fetch('/api/test/create-university-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testRequest)
      })

      const result = await response.json()
      
      if (result.success) {
        setMessage(`✅ Test university request created successfully! ID: ${result.id}`)
      } else {
        setMessage(`❌ Error: ${result.error}`)
      }

    } catch (error) {
      console.error('Error creating test request:', error)
      setMessage(`❌ Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  const createTestIndividualRequest = async () => {
    try {
      setLoading(true)
      setMessage("Creating test individual request...")

      const testRequest = {
        firstName: "Jane",
        lastName: "Smith",
        email: "jane@example.com",
        status: "pending",
        createdAt: new Date(),
        zone: "south_zone"
      }

      // Create request in Firestore
      const response = await fetch('/api/test/create-individual-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testRequest)
      })

      const result = await response.json()
      
      if (result.success) {
        setMessage(`✅ Test individual request created successfully! ID: ${result.id}`)
      } else {
        setMessage(`❌ Error: ${result.error}`)
      }

    } catch (error) {
      console.error('Error creating test request:', error)
      setMessage(`❌ Error: ${error}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Test Request Creation</h1>
          <p className="mt-2 text-gray-600">Create test requests to verify they appear in the admin dashboard</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>University Request</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Create a test university request that will appear in the admin dashboard under "University Requests" tab.
              </p>
              <Button 
                onClick={createTestUniversityRequest}
                disabled={loading}
                className="w-full"
              >
                {loading ? "Creating..." : "Create Test University Request"}
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Individual Request</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 mb-4">
                Create a test individual request that will appear in the admin dashboard under "Individual Requests" tab.
              </p>
              <Button 
                onClick={createTestIndividualRequest}
                disabled={loading}
                className="w-full"
              >
                {loading ? "Creating..." : "Create Test Individual Request"}
              </Button>
            </CardContent>
          </Card>
        </div>

        {message && (
          <Card className="mt-6">
            <CardContent className="pt-6">
              <p className="text-sm">{message}</p>
            </CardContent>
          </Card>
        )}

        <div className="mt-8">
          <Card>
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="list-decimal list-inside space-y-2 text-sm">
                <li>Click "Create Test University Request" above</li>
                <li>Go to <a href="/admin" className="text-blue-600 hover:underline">Admin Dashboard</a></li>
                <li>Check the "University Requests" tab</li>
                <li>You should see your test request with "Pending" status</li>
                <li>Try approving or rejecting the request</li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
