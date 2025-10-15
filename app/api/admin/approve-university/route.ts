import { NextRequest, NextResponse } from "next/server"
import { initializeApp, getApps } from "firebase/app"
import { getFirestore, doc, updateDoc, addDoc, collection } from "firebase/firestore"

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

    // Update the request status to approved
    const requestRef = doc(db, "universityRequests", id)
    await updateDoc(requestRef, {
      status: "approved",
      approvedAt: new Date()
    })

    // You can also create a university account here if needed
    // const universityRef = collection(db, "universities")
    // await addDoc(universityRef, {
    //   name: requestData.universityName,
    //   adminEmail: requestData.contactEmail,
    //   adminName: requestData.contactName,
    //   status: "active",
    //   createdAt: new Date()
    // })

    return NextResponse.json({ 
      success: true, 
      message: "University request approved successfully" 
    })

  } catch (error) {
    console.error("Error approving university request:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to approve university request" 
      },
      { status: 500 }
    )
  }
}
