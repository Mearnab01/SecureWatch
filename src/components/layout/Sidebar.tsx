import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Globe,
  ScanFace,
  History,
  Shield,
  ChevronLeft,
  ChevronRight,
  FolderOpen,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { motion } from "framer-motion";

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: Globe, label: "Phishing Detection", href: "/phishing" },
  { icon: ScanFace, label: "Deepfake Detection", href: "/deepfake" },
  { icon: History, label: "Scan History", href: "/history" },
  { icon: FolderOpen, label: "Project Details", href: "/project" },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const location = useLocation();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 72 : 240 }}
      className={cn(
        "fixed left-0 top-16 bottom-0 z-40 border-r border-border bg-sidebar flex flex-col",
        className
      )}
    >
      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {sidebarItems.map((item) => {
          const isActive = location.pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all group",
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
              )}
            >
              <Icon
                className={cn(
                  "w-5 h-5 flex-shrink-0",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-primary"
                )}
              />
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm font-medium truncate"
                >
                  {item.label}
                </motion.span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-sidebar-border">
        {!isCollapsed && (
          <div className="flex items-center gap-2 px-3 py-2 mb-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary" />
            </div>
            <div className="text-xs">
              <p className="font-medium text-sidebar-foreground">SecureWatch</p>
              <p className="text-muted-foreground">v1.0.0</p>
            </div>
          </div>
        )}

        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={cn(
            "w-full justify-center text-muted-foreground hover:text-foreground",
            isCollapsed && "px-0"
          )}
        >
          {isCollapsed ? (
            <ChevronRight className="w-4 h-4" />
          ) : (
            <>
              <ChevronLeft className="w-4 h-4 mr-2" />
              Collapse
            </>
          )}
        </Button>
      </div>
    </motion.aside>
  );
}

export function useSidebarWidth() {
  // You can expand this to use context if needed
  return { width: 240, collapsedWidth: 72 };
}
