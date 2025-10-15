import { NextRequest, NextResponse } from "next/server"
import { initializeApp, getApps } from "firebase/app"
import { getFirestore, collection, addDoc } from "firebase/firestore"

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
    const requestData = await req.json()
    console.log("Creating university request with data:", requestData)

    // Add document to universityRequests collection
    const docRef = await addDoc(collection(db, "universityRequests"), {
      ...requestData,
      createdAt: new Date()
    })

    console.log("University request created with ID:", docRef.id)

    return NextResponse.json({ 
      success: true, 
      id: docRef.id,
      message: "University request created successfully" 
    })

  } catch (error) {
    console.error("Error creating university request:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to create university request",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}
