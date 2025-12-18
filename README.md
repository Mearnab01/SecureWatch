1. Overall System Architecture Diagram

Show:

User

Browser (Frontend Application)

Clerk Authentication

Security Analysis Engine (Frontend Logic)

LocalStorage (User-Specific History)

Architecture should clearly indicate:

No backend services

No database

All processing happens on the client side

2. Application Flow Diagram

Represent the following flow:

User → Login (Clerk) → Dashboard → 
   → Phishing Detection Page → URL Analysis → Risk Score → Alert → Save to History
   → Deepfake Detection Page → Media Upload → Simulated Analysis → Risk Score → Alert → Save to History

3. Phishing Website Detection Flow Diagram

Include steps:

User enters URL

URL validation

Rule-based analysis (URL length, HTTPS check, keywords)

Risk score calculation (0–100)

Verdict (Safe / Suspicious / Phishing)

Store result in LocalStorage

4. Deepfake Detection Flow Diagram

Include steps:

User uploads image/video

File validation

Simulated deepfake analysis

Probability score generation

Risk classification

Save result to LocalStorage

5. Authentication & Authorization Flow

Show:

User accesses application

Clerk Sign In / Sign Up

Route protection

Access granted to dashboard and detection modules

User-specific data isolation using Clerk userId
