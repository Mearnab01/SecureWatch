import { SignUp as ClerkSignUp } from '@clerk/clerk-react';
import { MainLayout } from '@/components/layout/MainLayout';

export default function SignUp() {
  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <ClerkSignUp 
          routing="path" 
          path="/sign-up"
          signInUrl="/sign-in"
          fallbackRedirectUrl="/dashboard"
        />
      </div>
    </MainLayout>
  );
}
