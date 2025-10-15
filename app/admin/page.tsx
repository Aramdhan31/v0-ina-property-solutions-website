"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface UniversityRequest {
  id: string
  universityName: string
  contactEmail: string
  contactName: string
  status: string
  createdAt: any
  zone?: string
}

interface IndividualRequest {
  id: string
  firstName: string
  lastName: string
  email: string
  status: string
  createdAt: any
  zone?: string
}

export default function AdminDashboard() {
  const [universityRequests, setUniversityRequests] = useState<UniversityRequest[]>([])
  const [individualRequests, setIndividualRequests] = useState<IndividualRequest[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<'university' | 'individual'>('university')

  useEffect(() => {
    fetchRequests()
  }, [])

  const fetchRequests = async () => {
    try {
      setLoading(true)
      console.log('Fetching requests...')
      
      // Fetch university requests
      console.log('Fetching university requests...')
      const universityResponse = await fetch('/api/admin/university-requests')
      const universityData = await universityResponse.json()
      console.log('University requests response:', universityData)
      setUniversityRequests(universityData.requests || [])

      // Fetch individual requests
      console.log('Fetching individual requests...')
      const individualResponse = await fetch('/api/admin/individual-requests')
      const individualData = await individualResponse.json()
      console.log('Individual requests response:', individualData)
      setIndividualRequests(individualData.requests || [])

    } catch (error) {
      console.error('Error fetching requests:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleApprove = async (type: 'university' | 'individual', id: string) => {
    try {
      const response = await fetch(`/api/admin/approve-${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
      })

      if (response.ok) {
        // Refresh the requests
        fetchRequests()
      }
    } catch (error) {
      console.error('Error approving request:', error)
    }
  }

  const handleReject = async (type: 'university' | 'individual', id: string) => {
    try {
      const response = await fetch(`/api/admin/reject-${type}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id })
      })

      if (response.ok) {
        // Refresh the requests
        fetchRequests()
      }
    } catch (error) {
      console.error('Error rejecting request:', error)
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case 'approved':
        return <Badge variant="outline" className="bg-green-100 text-green-800">Approved</Badge>
      case 'rejected':
        return <Badge variant="outline" className="bg-red-100 text-red-800">Rejected</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading requests...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-gray-600">Manage university and individual account requests</p>
        </div>

        {/* Tab Navigation */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('university')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'university'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                University Requests ({universityRequests.length})
              </button>
              <button
                onClick={() => setActiveTab('individual')}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'individual'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Individual Requests ({individualRequests.length})
              </button>
            </nav>
          </div>
        </div>

        {/* University Requests */}
        {activeTab === 'university' && (
          <div className="space-y-4">
            {universityRequests.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">No university requests found</p>
                </CardContent>
              </Card>
            ) : (
              universityRequests.map((request) => (
                <Card key={request.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{request.universityName}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          Contact: {request.contactName} ({request.contactEmail})
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          Submitted: {new Date(request.createdAt?.seconds * 1000).toLocaleDateString()}
                        </p>
                        {request.zone && (
                          <p className="text-xs text-blue-600 mt-1">Zone: {request.zone}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(request.status)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2">
                      {request.status === 'pending' && (
                        <>
                          <Button
                            onClick={() => handleApprove('university', request.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleReject('university', request.id)}
                            variant="outline"
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}

        {/* Individual Requests */}
        {activeTab === 'individual' && (
          <div className="space-y-4">
            {individualRequests.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <p className="text-gray-500">No individual requests found</p>
                </CardContent>
              </Card>
            ) : (
              individualRequests.map((request) => (
                <Card key={request.id} className="hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">
                          {request.firstName} {request.lastName}
                        </CardTitle>
                        <p className="text-sm text-gray-600 mt-1">Email: {request.email}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          Submitted: {new Date(request.createdAt?.seconds * 1000).toLocaleDateString()}
                        </p>
                        {request.zone && (
                          <p className="text-xs text-blue-600 mt-1">Zone: {request.zone}</p>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(request.status)}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex space-x-2">
                      {request.status === 'pending' && (
                        <>
                          <Button
                            onClick={() => handleApprove('individual', request.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            Approve
                          </Button>
                          <Button
                            onClick={() => handleReject('individual', request.id)}
                            variant="outline"
                            className="border-red-300 text-red-600 hover:bg-red-50"
                          >
                            Reject
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}
