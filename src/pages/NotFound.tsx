import { Link, useLocation } from "react-router-dom";
import { MainLayout } from "@/components/layout/MainLayout";
import { Button } from "@/components/ui/button";
import { Home, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center max-w-md"
        >
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-warning/10 flex items-center justify-center glow-warning">
            <AlertTriangle className="w-10 h-10 text-warning" />
          </div>
          
          <h1 className="text-6xl font-bold text-foreground mb-4 font-mono">404</h1>
          <h2 className="text-xl font-semibold text-foreground mb-2">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          
          <Link to="/">
            <Button className="gap-2">
              <Home className="w-4 h-4" />
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default NotFound;
