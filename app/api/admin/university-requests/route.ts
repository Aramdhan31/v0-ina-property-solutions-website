import { NextRequest, NextResponse } from "next/server"
import { initializeApp, getApps } from "firebase/app"
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore"

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

export async function GET(req: NextRequest) {
  try {
    console.log("Fetching university requests...")
    
    // Get all university requests
    const requestsRef = collection(db, "universityRequests")
    const q = query(requestsRef, orderBy("createdAt", "desc"))
    const querySnapshot = await getDocs(q)
    
    console.log(`Found ${querySnapshot.docs.length} university requests`)
    
    const requests = querySnapshot.docs.map(doc => {
      const data = doc.data()
      console.log("University request data:", data)
      return {
        id: doc.id,
        ...data
      }
    })

    console.log("Returning university requests:", requests)

    return NextResponse.json({ 
      success: true, 
      requests 
    })

  } catch (error) {
    console.error("Error fetching university requests:", error)
    return NextResponse.json(
      { 
        success: false, 
        error: "Failed to fetch university requests",
        details: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    )
  }
}
