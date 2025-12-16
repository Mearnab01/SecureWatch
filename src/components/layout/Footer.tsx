import { Shield, Github, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary" />
              </div>
              <span className="font-semibold text-foreground">
                Secure<span className="text-primary">Watch</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm">
              Advanced digital security surveillance platform for detecting phishing attempts and deepfake content. Protect your digital presence with real-time threat analysis.
            </p>
          </div>

          {/* Features */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Phishing Detection</li>
              <li>Deepfake Analysis</li>
              <li>Threat Monitoring</li>
              <li>Scan History</li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-foreground mb-3">Resources</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Documentation</li>
              <li>API Reference</li>
              <li>Security Blog</li>
              <li>Contact Support</li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SecureWatch. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="#"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
