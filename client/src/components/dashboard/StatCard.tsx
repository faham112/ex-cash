import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: {
    value: string;
    type: "increase" | "decrease" | "neutral";
    period: string;
  };
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
}

export default function StatCard({ title, value, change, icon: Icon, iconColor, iconBgColor }: StatCardProps) {
  const getChangeColor = (type: "increase" | "decrease" | "neutral") => {
    switch (type) {
      case "increase":
        return "text-success-green";
      case "decrease":
        return "text-destructive";
      case "neutral":
        return "text-warning-amber";
      default:
        return "text-muted-foreground";
    }
  };

  const getChangeIcon = (type: "increase" | "decrease" | "neutral") => {
    switch (type) {
      case "increase":
        return "↑";
      case "decrease":
        return "↓";
      case "neutral":
        return "→";
      default:
        return "";
    }
  };

  return (
    <div className="stat-card">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p className="text-2xl font-bold text-foreground">{typeof value === 'number' ? value.toLocaleString() : value}</p>
          {change && (
            <p className={cn("text-sm font-medium", getChangeColor(change.type))}>
              <span>{getChangeIcon(change.type)} {change.value}</span> {change.period}
            </p>
          )}
        </div>
        <div className={cn("icon-wrapper", iconBgColor)}>
          <Icon className={cn("w-6 h-6", iconColor)} />
        </div>
      </div>
    </div>
  );
}
