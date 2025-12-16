import { ClerkProvider } from '@clerk/clerk-react';
import { ReactNode } from 'react';

const CLERK_PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

interface ClerkProviderWrapperProps {
  children: ReactNode;
}

export function ClerkProviderWrapper({ children }: ClerkProviderWrapperProps) {
  if (!CLERK_PUBLISHABLE_KEY) {
    return null;
  }

  return (
    <ClerkProvider 
      publishableKey={CLERK_PUBLISHABLE_KEY}
      appearance={{
        variables: {
          colorPrimary: 'hsl(185, 80%, 50%)',
          colorBackground: 'hsl(230, 20%, 8%)',
          colorInputBackground: 'hsl(220, 15%, 15%)',
          colorInputText: 'hsl(210, 20%, 95%)',
          colorText: 'hsl(210, 20%, 95%)',
          colorTextSecondary: 'hsl(215, 15%, 55%)',
          borderRadius: '0.75rem',
        },
        elements: {
          formButtonPrimary: 'bg-primary hover:bg-primary/90 text-primary-foreground',
          card: 'bg-card border border-border',
          headerTitle: 'text-foreground',
          headerSubtitle: 'text-muted-foreground',
          socialButtonsBlockButton: 'border-border bg-secondary hover:bg-secondary/80',
          formFieldLabel: 'text-foreground',
          formFieldInput: 'bg-input border-border text-foreground',
          footerActionLink: 'text-primary hover:text-primary/80',
          identityPreview: 'bg-secondary border-border',
          identityPreviewText: 'text-foreground',
          identityPreviewEditButton: 'text-primary',
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}

export function isClerkConfigured(): boolean {
  return !!CLERK_PUBLISHABLE_KEY;
}
