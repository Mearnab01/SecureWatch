import { DashboardLayout } from "@/components/layout/DashboardLayout";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Shield, Users, Calendar, FolderOpen } from "lucide-react";
import { motion } from "framer-motion";

// Mock project data
const projectData = {
  name: "SecureWatch",
  description:
    "Digital Security Surveillance Platform for Phishing and Deepfake Detection",
  createdAt: "2024-01-15",
  status: "Active",
};

// Mock project members
const projectMembers = [
  {
    id: "241001271028",
    name: "Arnab Nath",
    email: "arnab.nath@securewatch.io",
    role: "Project Lead",
    avatar: "",
    joinedAt: "2024-01-15",
  },
  {
    id: "241001271017",
    name: "Agamani Banerjee",
    email: "agamani.banerjee@securewatch.io",
    role: "Security Analyst",
    avatar: "",
    joinedAt: "2024-01-20",
  },
  {
    id: "241001271016",
    name: "Purabi Chowdhury",
    email: "purabi.chowdhury@securewatch.io",
    role: "Developer",
    avatar: "",
    joinedAt: "2024-02-01",
  },
  {
    id: "241001271***",
    name: "Shreya Ghosh",
    email: "shreya.ghosh@securewatch.io",
    role: "UI/UX Designer",
    avatar: "",
    joinedAt: "2024-02-10",
  },
  {
    id: "2410012710**",
    name: "Rahul Ruidas",
    email: "rahul.ruidas@securewatch.io",
    role: "QA Engineer",
    avatar: "",
    joinedAt: "2024-02-15",
  },
];

const getRoleBadgeVariant = (role: string) => {
  switch (role) {
    case "Project Lead":
      return "default";
    case "Security Analyst":
      return "destructive";
    case "Developer":
      return "secondary";
    default:
      return "outline";
  }
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export default function ProjectDetails() {
  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-3xl font-bold text-foreground">
            Project Details
          </h1>
          <p className="text-muted-foreground mt-1">
            View project information and team members
          </p>
        </motion.div>

        {/* Project Info Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-primary/10">
                  <FolderOpen className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-xl">{projectData.name}</CardTitle>
                  <CardDescription>{projectData.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Created:
                  </span>
                  <span className="text-sm font-medium">
                    {projectData.createdAt}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <Badge
                    variant="default"
                    className="bg-risk-safe text-background"
                  >
                    {projectData.status}
                  </Badge>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Members:
                  </span>
                  <span className="text-sm font-medium">
                    {projectMembers.length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Team Members Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-border/50 bg-card/50 backdrop-blur">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-secondary/50">
                  <Users className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <CardTitle>Team Members</CardTitle>
                  <CardDescription>
                    People working on this project
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-border/50 hover:bg-transparent">
                    <TableHead className="text-muted-foreground">
                      Member
                    </TableHead>
                    <TableHead className="text-muted-foreground">ID</TableHead>
                    <TableHead className="text-muted-foreground">
                      Role
                    </TableHead>
                    <TableHead className="text-muted-foreground">
                      Joined
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {projectMembers.map((member, index) => (
                    <motion.tr
                      key={member.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.1 * index }}
                      className="border-border/50 hover:bg-muted/50"
                    >
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            <AvatarImage
                              src={member.avatar}
                              alt={member.name}
                            />
                            <AvatarFallback className="bg-primary/10 text-primary text-xs">
                              {getInitials(member.name)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium text-foreground">
                              {member.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {member.email}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <code className="text-xs bg-muted px-2 py-1 rounded font-mono">
                          {member.id}
                        </code>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getRoleBadgeVariant(member.role)}>
                          {member.role}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {member.joinedAt}
                      </TableCell>
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
