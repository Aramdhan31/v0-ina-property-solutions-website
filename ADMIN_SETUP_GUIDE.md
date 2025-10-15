# Admin Dashboard Setup Guide

## 🚀 **Why you can't see requests in admin dashboard**

The issue is that you need to:
1. **Set up Firebase configuration**
2. **Install Firebase dependencies**
3. **Create the admin dashboard**
4. **Configure environment variables**

## 📋 **Setup Steps**

### **1. Install Firebase Dependencies**
```bash
npm install firebase
```

### **2. Create Environment Variables**
Create a `.env.local` file in your project root:

```env
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id

# Resend API Key (for email functionality)
RESEND_API_KEY=your_resend_api_key
```

### **3. Get Firebase Configuration**
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Go to Project Settings → General
4. Scroll down to "Your apps" section
5. Click on the web app icon (</>) 
6. Copy the configuration values

### **4. Deploy Firestore Rules**
1. Copy the content from `firestore.rules`
2. Go to Firebase Console → Firestore Database → Rules
3. Paste the rules and click "Publish"

### **5. Test the Admin Dashboard**
1. Start your development server: `npm run dev`
2. Navigate to: `http://localhost:3000/admin`
3. You should see the admin dashboard

## 🔧 **What I've Created**

### **Admin Dashboard** (`/app/admin/page.tsx`)
- Displays university and individual requests
- Tabbed interface for easy navigation
- Approve/reject functionality
- Real-time status updates

### **API Routes**
- `/api/admin/university-requests` - Fetch university requests
- `/api/admin/individual-requests` - Fetch individual requests
- `/api/admin/approve-university` - Approve university requests
- `/api/admin/approve-individual` - Approve individual requests
- `/api/admin/reject-university` - Reject university requests
- `/api/admin/reject-individual` - Reject individual requests

### **Firestore Collections**
- `universityRequests` - University account requests
- `individualRequests` - Individual user requests
- `adminAccessRequests` - Admin account requests

## 🎯 **How to Test**

### **1. Create a Test Request**
You can test by manually adding a document to Firestore:

```javascript
// In Firebase Console → Firestore Database
// Add a document to 'universityRequests' collection:
{
  universityName: "Test University",
  contactEmail: "test@university.edu",
  contactName: "John Doe",
  status: "pending",
  createdAt: new Date(),
  zone: "north_zone"
}
```

### **2. Check Admin Dashboard**
1. Go to `http://localhost:3000/admin`
2. You should see the test request
3. Try approving/rejecting it

## 🚨 **Common Issues**

### **Issue 1: "No requests found"**
- Check if Firebase configuration is correct
- Verify Firestore rules are deployed
- Check browser console for errors

### **Issue 2: "Firebase not initialized"**
- Make sure environment variables are set
- Restart your development server
- Check `.env.local` file exists

### **Issue 3: "Permission denied"**
- Check Firestore rules are deployed
- Verify the rules allow reading from request collections
- Make sure you're using the correct project ID

## 📱 **Admin Dashboard Features**

✅ **View all requests** (university and individual)  
✅ **Filter by status** (pending, approved, rejected)  
✅ **Approve/reject requests** with one click  
✅ **Real-time updates** when status changes  
✅ **Responsive design** for mobile and desktop  
✅ **Status badges** for easy status identification  

## 🔐 **Security Features**

- **Role-based access** (only admins can access)
- **Secure API routes** with proper error handling
- **Firestore security rules** prevent unauthorized access
- **Environment variables** for secure configuration

## 🚀 **Next Steps**

1. **Set up Firebase project** with your configuration
2. **Deploy the Firestore rules** I provided
3. **Install dependencies** with `npm install`
4. **Configure environment variables**
5. **Test the admin dashboard** at `/admin`

Once set up, you'll be able to see all requests in your admin dashboard! 🎯
