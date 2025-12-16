import { motion } from 'framer-motion';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { useScanHistory } from '@/hooks/useScanHistory';
import { useAuthUser } from '@/hooks/useAuthUser';
import { ScanTable } from '@/components/security/ScanTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { 
  Shield, 
  AlertTriangle, 
  ScanFace, 
  Activity,
  TrendingUp,
  ArrowUpRight,
  Globe,
} from 'lucide-react';
import { MOCK_SCAN_TRENDS, MOCK_THREAT_DISTRIBUTION } from '@/data/constants';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const StatCard = ({ 
  title, 
  value, 
  change, 
  icon: Icon, 
  trend,
  color,
}: { 
  title: string; 
  value: number | string; 
  change?: string;
  icon: React.ElementType;
  trend?: 'up' | 'down';
  color: 'primary' | 'safe' | 'warning' | 'danger';
}) => {
  const colorClasses = {
    primary: 'bg-primary/10 text-primary',
    safe: 'bg-safe/10 text-safe',
    warning: 'bg-warning/10 text-warning',
    danger: 'bg-danger/10 text-danger',
  };

  return (
    <Card className="bg-card border-border hover:border-primary/30 transition-colors">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-3xl font-bold text-foreground mt-1 font-mono">{value}</p>
            {change && (
              <div className="flex items-center gap-1 mt-2">
                {trend === 'up' && <ArrowUpRight className="w-4 h-4 text-safe" />}
                <span className={trend === 'up' ? 'text-safe text-sm' : 'text-muted-foreground text-sm'}>
                  {change}
                </span>
              </div>
            )}
          </div>
          <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
            <Icon className="w-6 h-6" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default function Dashboard() {
  const { firstName } = useAuthUser();
  const { stats, getRecentScans, isLoading } = useScanHistory();
  const recentScans = getRecentScans(5);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
              Welcome back, {firstName}
            </h1>
            <p className="text-muted-foreground mt-1">
              Here's your security overview
            </p>
          </div>
          <div className="flex gap-3">
            <Link to="/phishing">
              <Button variant="outline" className="gap-2">
                <Globe className="w-4 h-4" />
                Scan URL
              </Button>
            </Link>
            <Link to="/deepfake">
              <Button className="gap-2">
                <ScanFace className="w-4 h-4" />
                Analyze Media
              </Button>
            </Link>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <StatCard
            title="Total Scans"
            value={stats.totalScans || 0}
            change="+12% from last week"
            icon={Activity}
            trend="up"
            color="primary"
          />
          <StatCard
            title="Safe Scans"
            value={stats.safeScans || 0}
            icon={Shield}
            color="safe"
          />
          <StatCard
            title="Phishing Threats"
            value={stats.phishingThreats || 0}
            icon={AlertTriangle}
            color="warning"
          />
          <StatCard
            title="Deepfake Alerts"
            value={stats.deepfakeAlerts || 0}
            icon={ScanFace}
            color="danger"
          />
        </motion.div>

        {/* Charts Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {/* Scan Trends Chart */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <TrendingUp className="w-5 h-5 text-primary" />
                Scan Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={MOCK_SCAN_TRENDS}>
                    <XAxis 
                      dataKey="name" 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis 
                      stroke="hsl(var(--muted-foreground))" 
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="phishing" 
                      stroke="hsl(var(--warning))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--warning))' }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="deepfake" 
                      stroke="hsl(var(--danger))" 
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--danger))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-warning" />
                  <span className="text-sm text-muted-foreground">Phishing</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-danger" />
                  <span className="text-sm text-muted-foreground">Deepfake</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Risk Distribution Chart */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-foreground">
                <Shield className="w-5 h-5 text-primary" />
                Risk Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={MOCK_THREAT_DISTRIBUTION}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {MOCK_THREAT_DISTRIBUTION.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px',
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex items-center justify-center gap-4 mt-4">
                {MOCK_THREAT_DISTRIBUTION.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Recent Scans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-foreground">Recent Scans</CardTitle>
              <Link to="/history">
                <Button variant="ghost" size="sm" className="text-primary">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="text-center py-8 text-muted-foreground">
                  Loading...
                </div>
              ) : (
                <ScanTable scans={recentScans} />
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}
