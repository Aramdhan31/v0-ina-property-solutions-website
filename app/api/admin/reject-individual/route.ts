import { NextRequest, NextResponse } from "next/server"
import { initializeApp, getApps } from "firebase/app"
import { getFirestore, doc, updateDoc } from "firebase/firestore"

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID
}

// Initialize Firebase
let app
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig)
} else {
  app = getApps()[0]
}

const db = getFirestore(app)

export async function POST(req: NextRequest) {
  try {
    const { id } = await req.json()

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Request ID is required" },
        { status: 400 }
      )
    }

    // Update the request status to rejected
    const requestRef = doc(db, "individualRequests", id)
    await updateDoc(requestRef, {
      status: "rejected",
      rejectedAt: new Date()
    })

    return NextResponse.json({ 
      success: true, 
      message: "Individual request rejected successfully" 
    })

  } catch (error) {
    console.error("Error rejecting individual request:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to reject individual request" 
      },
      { status: 500 }
    )
  }
}
