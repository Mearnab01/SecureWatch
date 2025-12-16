import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MainLayout } from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Shield, Globe, ScanFace, Activity, ArrowRight, CheckCircle } from 'lucide-react';

const features = [
  {
    icon: Globe,
    title: 'Phishing Detection',
    description: 'Real-time URL analysis to identify malicious websites and protect against phishing attacks.',
  },
  {
    icon: ScanFace,
    title: 'Deepfake Detection',
    description: 'Advanced media analysis to detect manipulated images and videos with AI-powered scanning.',
  },
  {
    icon: Activity,
    title: 'Threat Monitoring',
    description: 'Comprehensive dashboard to track all security scans and monitor threat patterns over time.',
  },
];

const stats = [
  { value: '99.9%', label: 'Detection Accuracy' },
  { value: '<1s', label: 'Scan Speed' },
  { value: '24/7', label: 'Active Monitoring' },
  { value: '100K+', label: 'Threats Blocked' },
];

export default function Landing() {
  return (
    <MainLayout showFooter>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-glow-gradient opacity-50" />
        <div className="absolute inset-0 cyber-grid opacity-50" />
        
        {/* Animated circles */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-primary/10 blur-3xl"
        />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-8"
            >
              <Shield className="w-4 h-4" />
              <span>Digital Security Surveillance Platform</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 leading-tight">
              Protect Your Digital{' '}
              <span className="gradient-text">Identity</span>
            </h1>

            {/* Subheadline */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Advanced threat detection system combining phishing URL analysis and deepfake media scanning. Stay one step ahead of cyber threats.
            </p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link to="/sign-up">
                <Button size="lg" className="group px-8">
                  Start Monitoring
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/sign-in">
                <Button size="lg" variant="outline" className="px-8">
                  Sign In
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 rounded-full bg-muted-foreground/50" />
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-y border-border bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2 font-mono">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Comprehensive Security Suite
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Multi-layered protection against modern cyber threats with real-time analysis and monitoring capabilities.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-card/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Simple, fast, and effective threat detection in three easy steps.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Submit', description: 'Enter a URL or upload media for analysis' },
              { step: '02', title: 'Analyze', description: 'Our system scans for threats and anomalies' },
              { step: '03', title: 'Review', description: 'Get detailed results with risk assessment' },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="text-6xl font-bold text-primary/10 mb-4 font-mono">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/20 p-8 sm:p-12 text-center"
          >
            <div className="absolute inset-0 bg-glow-gradient opacity-50" />
            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
                Ready to Secure Your Digital Space?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                Join thousands of users protecting their online presence with SecureWatch's advanced threat detection.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/sign-up">
                  <Button size="lg" className="px-8">
                    Get Started Free
                  </Button>
                </Link>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="w-4 h-4 text-safe" />
                  No credit card required
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}
