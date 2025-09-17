import { LucideIcon } from "lucide-react";

interface DetailRowProps {
  icon?: LucideIcon;
  label: string;
  value: any;
  className?: string;
}

export function DetailRow({ icon: Icon, label, value, className = "" }: DetailRowProps) {
  const displayValue = value ?? <span className="text-muted-foreground italic">Not provided</span>;

  return (
    <div className={`flex items-center gap-2 text-sm ${className}`}>
      {Icon && <Icon className="h-4 w-4 text-muted-foreground shrink-0" />}
      <span className="font-medium text-muted-foreground min-w-0">{label}:</span>
      <span className="text-foreground min-w-0 truncate">{displayValue}</span>
    </div>
  );
}