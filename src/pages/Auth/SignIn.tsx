import { SignIn as ClerkSignIn } from '@clerk/clerk-react';
import { MainLayout } from '@/components/layout/MainLayout';

export default function SignIn() {
  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <ClerkSignIn 
          routing="path" 
          path="/sign-in"
          signUpUrl="/sign-up"
          fallbackRedirectUrl="/dashboard"
        />
      </div>
    </MainLayout>
  );
}
