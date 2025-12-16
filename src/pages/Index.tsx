import { Link } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Home, Shield } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <MainLayout showFooter>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-lg"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center glow-primary">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Secure<span className="text-primary">Watch</span>
          </h1>
          <p className="text-muted-foreground mb-8">
            Digital Security Surveillance Platform for detecting phishing threats and deepfake content.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/dashboard">
              <Button className="gap-2 w-full sm:w-auto">
                <Home className="w-4 h-4" />
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Index;
