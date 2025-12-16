import { Link, useLocation } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';
import { cn } from '@/lib/utils';
import { Shield, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isClerkConfigured } from '@/lib/clerk';

const navItems = [
  { label: 'Dashboard', href: '/dashboard' },
  { label: 'Phishing', href: '/phishing' },
  { label: 'Deepfake', href: '/deepfake' },
  { label: 'History', href: '/history' },
];

export function Navbar() {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const clerkEnabled = isClerkConfigured();

  const renderNavItems = () => (
    <div className="hidden md:flex items-center gap-1">
      {navItems.map((item) => {
        const isActive = location.pathname === item.href;
        return (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              'px-4 py-2 rounded-lg text-sm font-medium transition-all',
              isActive
                ? 'bg-primary/10 text-primary'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </div>
  );

  const renderMobileMenu = () => (
    <AnimatePresence>
      {isMobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="md:hidden border-t border-border bg-background"
        >
          <div className="container mx-auto px-4 py-4 space-y-2">
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    'block px-4 py-3 rounded-lg text-sm font-medium transition-all',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors glow-primary">
            <Shield className="w-6 h-6 text-primary" />
          </div>
          <span className="font-semibold text-lg text-foreground hidden sm:block">
            Secure<span className="text-primary">Watch</span>
          </span>
        </Link>

        {/* Desktop Navigation - Demo Mode */}
        {!clerkEnabled && renderNavItems()}

        {/* Desktop Navigation - With Clerk */}
        {clerkEnabled && (
          <SignedIn>
            {renderNavItems()}
          </SignedIn>
        )}

        {/* Right Section */}
        <div className="flex items-center gap-3">
          {/* Demo Mode - Always show nav */}
          {!clerkEnabled && (
            <>
              <Link to="/sign-in">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link to="/sign-up">
                <Button size="sm">
                  Get Started
                </Button>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </>
          )}

          {/* With Clerk Auth */}
          {clerkEnabled && (
            <>
              <SignedOut>
                <Link to="/sign-in">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link to="/sign-up">
                  <Button size="sm">
                    Get Started
                  </Button>
                </Link>
              </SignedOut>
              
              <SignedIn>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      avatarBox: 'w-9 h-9 border-2 border-border hover:border-primary transition-colors',
                    },
                  }}
                />
                
                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </SignedIn>
            </>
          )}
        </div>
      </nav>

      {/* Mobile Menu */}
      {!clerkEnabled && renderMobileMenu()}
      {clerkEnabled && <SignedIn>{renderMobileMenu()}</SignedIn>}
    </header>
  );
}
