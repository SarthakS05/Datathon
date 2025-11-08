import React from 'react';
import { motion } from 'framer-motion';
import { cn } from "../lib/utils"; // Assumes shadcn's utility for class merging
import { Card, CardContent, CardHeader, CardTitle } from "../components/card";
import { ArrowDown, ArrowUp, Minus, Users, DollarSign, Clock,AlertCircle } from 'lucide-react';

// Define the icon type. Using React.ElementType for flexibility.
type IconType = React.ElementType | React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

// Define trend types
export type TrendType = 'up' | 'down' | 'neutral';

// --- 📦 API (Props) Definition ---
export interface DashboardMetricCardProps {
  /** The main value of the metric (e.g., "1,234", "$5.6M", "92%"). */
  value: string;
  /** The descriptive title of the metric (e.g., "Total Users", "Revenue"). */
  title: string;
  /** Optional icon to display in the card header. */
  icon?: IconType;
  /** The percentage or absolute change for the trend (e.g., "2.5%"). */
  trendChange?: string;
  /** The direction of the trend ('up', 'down', 'neutral'). */
  trendType?: TrendType;
  /** Optional class name for the card container. */
  className?: string;
}

/**
 * A professional, animated metric card for admin dashboards.
 * Displays a key value, title, icon, and trend indicator with Framer Motion hover effects.
 */
const DashboardMetricCard: React.FC<DashboardMetricCardProps> = ({
  value,
  title,
  icon: IconComponent,
  trendChange,
  trendType = 'neutral',
  className,
}) => {
  // Determine trend icon and color
  const TrendIcon = trendType === 'up' ? ArrowUp : trendType === 'down' ? ArrowDown : Minus;
  const trendColorClass =
    trendType === 'up'
      ? "text-green-600 dark:text-green-400"
      : trendType === 'down'
      ? "text-red-600 dark:text-red-400"
      : "text-muted-foreground";

  return (
    <motion.div
      whileHover={{ y: -4, boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)" }} // Subtle lift and shadow on hover
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className={cn(
        "cursor-pointer rounded-lg", // Ensure cursor indicates interactivity
        className
      )}
    >
      <Card className="h-full transition-colors duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            {title}
          </CardTitle>
          {IconComponent && (
            <IconComponent className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
          )}
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-foreground mb-2">{value}</div>
          {trendChange && (
            <p className={cn("flex items-center text-xs font-medium", trendColorClass)}>
              <TrendIcon className="h-3 w-3 mr-1" aria-hidden="true" />
              {trendChange} {trendType === 'up' ? "increase" : trendType === 'down' ? "decrease" : "change"}
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};



const ExampleUsage = () => {
  // Asian-fusion restaurant metrics
  return (
    <div className="p-6 bg-white/5 backdrop-blur-sm border border-white/6 rounded-lg max-w-7xl mx-auto shadow-md">
      <h3 className="text-xl font-semibold text-white mb-6">Bento Metrics — Asian Fusion</h3>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <DashboardMetricCard
          title="Daily Covers"
          value="184"
          icon={Users}
          trendChange="+12"
          trendType="up"
        />
        <DashboardMetricCard
          title="Food Cost"
          value="28%"
          icon={DollarSign}
          trendChange="-1.2%"
          trendType="down"
        />
        <DashboardMetricCard
          title="Avg. Check"
          value="$34.20"
          icon={Clock}
          trendChange="+0.8%"
          trendType="up"
        />
        <DashboardMetricCard
          title="Top Ingredient"
          value="Gochujang"
          icon={AlertCircle}
          trendChange="—"
          trendType="neutral"
        />
      </div>
    </div>
  );
};

export default ExampleUsage;