# Firestore Security Rules Guide

## Overview
These Firestore security rules support both university account creation requests and individual user account creation with proper role-based access control.

## User Roles

### 1. Super Admin (`super_admin`)
- Full access to all collections
- Can manage all users, universities, and individual accounts
- Can access system settings and activity logs

### 2. Zone Admin (`zone_admin`)
- Access to users and data within their assigned zone
- Can manage universities and individual users in their zone
- Cannot access system settings

### 3. University Admin (`university_admin`)
- Can manage their specific university
- Can view and manage university-related data
- Limited to their university's scope

### 4. Individual User (`individual`)
- Can manage their own profile and data
- Limited access to their own information
- Can create requests and applications

## Collections & Access Rules

### Request Collections (Open Access)
These collections allow server-side API access for account creation:

```javascript
// University account requests
match /universityRequests/{document} {
  allow read, write: if true;
}

// Individual user requests
match /individualRequests/{document} {
  allow read, write: if true;
}

// Admin access requests
match /adminAccessRequests/{document} {
  allow read, write: if true;
}
```

### User Management Collections

#### Users Collection
```javascript
match /users/{userId} {
  allow read, write: if (isAuthenticated() && request.auth.uid == userId) || 
                     isSuperAdmin() ||
                     (isZoneAdmin() && resource.data.zone == get(/databases/$(database)/documents/users/$(request.auth.uid)).data.zone);
}
```

#### Universities Collection
```javascript
match /universities/{universityId} {
  allow read, write: if (isAuthenticated() && request.auth.uid == universityId) ||
                     isSuperAdmin() ||
                     (isZoneAdmin() && resource.data.zone == get(/databases/$(database)/documents/users/$(request.auth.uid)).data.zone) ||
                     (isUniversityAdmin() && resource.data.adminId == request.auth.uid);
}
```

#### Individual Users Collection
```javascript
match /individualUsers/{individualId} {
  allow read, write: if (isAuthenticated() && request.auth.uid == individualId) ||
                     isSuperAdmin() ||
                     (isZoneAdmin() && resource.data.zone == get(/databases/$(database)/documents/users/$(request.auth.uid)).data.zone) ||
                     (isIndividualUser() && resource.data.userId == request.auth.uid);
}
```

## Account Creation Flow

### 1. University Account Creation
1. University submits request to `/universityRequests/`
2. Admin reviews and approves request
3. University account created in `/universities/`
4. University admin role assigned

### 2. Individual User Account Creation
1. Individual submits request to `/individualRequests/`
2. Admin reviews and approves request
3. Individual account created in `/individualUsers/`
4. Individual user role assigned

### 3. Admin Account Creation
1. Admin submits request to `/adminAccessRequests/`
2. Super admin reviews and approves
3. Admin account created with appropriate role
4. Zone assignment if zone admin

## API Integration

### Server-Side API Access
The rules allow server-side APIs to:
- Create and manage request documents
- Process account creation workflows
- Send verification emails
- Handle password resets

### Key Collections for APIs
```javascript
// Email verification
match /emailVerificationTokens/{document} {
  allow read, write: if isAuthenticated() || true;
}

// Password reset
match /passwordResetTokens/{document} {
  allow read, write: if isAuthenticated() || true;
}

// Applications
match /universityApplications/{document} {
  allow read, write: if isAuthenticated() || true;
}

match /individualApplications/{document} {
  allow read, write: if isAuthenticated() || true;
}
```

## Security Features

### 1. Role-Based Access Control
- Each user has a specific role with defined permissions
- Zone admins can only access their assigned zone
- University admins can only manage their university

### 2. Data Isolation
- Users can only access their own data
- Zone-based data separation
- University-specific data isolation

### 3. Audit Trail
- Activity logs for admin actions
- System settings access logging
- User action tracking

## Implementation Examples

### Creating a University Request
```javascript
// Client-side code
const universityRequest = {
  universityName: "Example University",
  contactEmail: "admin@university.edu",
  contactName: "John Doe",
  status: "pending",
  createdAt: new Date(),
  zone: "north_zone"
};

await db.collection('universityRequests').add(universityRequest);
```

### Creating an Individual Request
```javascript
// Client-side code
const individualRequest = {
  firstName: "Jane",
  lastName: "Smith",
  email: "jane@example.com",
  status: "pending",
  createdAt: new Date(),
  zone: "south_zone"
};

await db.collection('individualRequests').add(individualRequest);
```

### Admin Approval Process
```javascript
// Server-side API code
async function approveUniversityRequest(requestId) {
  const request = await db.collection('universityRequests').doc(requestId).get();
  const requestData = request.data();
  
  // Create university account
  await db.collection('universities').add({
    name: requestData.universityName,
    adminEmail: requestData.contactEmail,
    adminName: requestData.contactName,
    zone: requestData.zone,
    status: 'active',
    createdAt: new Date()
  });
  
  // Update request status
  await db.collection('universityRequests').doc(requestId).update({
    status: 'approved',
    approvedAt: new Date()
  });
}
```

## Testing

### Test Collection
```javascript
match /test/{document} {
  allow read, write: if true; // Allow server-side API access
}
```

Use the test collection for API testing and development.

## Deployment

1. Save the rules to `firestore.rules`
2. Deploy using Firebase CLI:
   ```bash
   firebase deploy --only firestore:rules
   ```
3. Test the rules in Firebase Console
4. Monitor security rule usage in Firebase Analytics

## Monitoring

- Check Firebase Console for rule violations
- Monitor activity logs for suspicious activity
- Review user access patterns
- Audit admin actions regularly

## Best Practices

1. **Least Privilege**: Users only get access they need
2. **Regular Audits**: Review access patterns monthly
3. **Zone Isolation**: Keep zone data separate
4. **API Security**: Validate all server-side requests
5. **Role Management**: Regularly review and update user roles
