import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  variant?: "default" | "primary" | "accent";
}

const StatsCard = ({ label, value, icon: Icon, trend, variant = "default" }: StatsCardProps) => {
  const iconStyles = {
    default: "bg-secondary text-foreground",
    primary: "gradient-primary text-primary-foreground shadow-glow",
    accent: "gradient-gold text-accent-foreground",
  };

  return (
    <div className="group rounded-xl border border-border bg-card p-5 shadow-card transition-all duration-300 hover:border-primary/20 hover:shadow-glow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-2 font-display text-3xl font-bold text-foreground animate-count-up">
            {value}
          </p>
          {trend && (
            <p className="mt-1 text-xs text-accent font-medium">{trend}</p>
          )}
        </div>
        <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${iconStyles[variant]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
