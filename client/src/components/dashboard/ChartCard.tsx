import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  value?: string | number;
  change?: {
    value: string;
    type: "increase" | "decrease" | "neutral";
  };
  children: ReactNode;
  className?: string;
}

export default function ChartCard({ title, subtitle, value, change, children, className }: ChartCardProps) {
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
    <div className={cn("chart-card", className)}>
      <div className="flex items-center justify-between mb-4">
        <div>
          {value && <h3 className="text-lg font-semibold text-foreground">{value}</h3>}
          <p className="text-sm text-muted-foreground">{title}</p>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        {change && (
          <span className={cn("text-sm font-medium", getChangeColor(change.type))}>
            {getChangeIcon(change.type)} {change.value}
          </span>
        )}
      </div>
      {children}
    </div>
  );
}
