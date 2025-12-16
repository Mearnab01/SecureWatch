import { useUser } from '@clerk/clerk-react';

export function useAuthUser() {
  const { user, isLoaded, isSignedIn } = useUser();
  
  return {
    userId: user?.id ?? null,
    user,
    isLoaded,
    isSignedIn: isSignedIn ?? false,
    firstName: user?.firstName ?? 'User',
    email: user?.primaryEmailAddress?.emailAddress ?? '',
    imageUrl: user?.imageUrl,
  };
}
