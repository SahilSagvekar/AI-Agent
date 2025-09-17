import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DataPanelProps {
  title?: string;
  data: any;
  className?: string;
}

export function DataPanel({ title, data, className = "" }: DataPanelProps) {
  if (!data) {
    return (
      <div className={`text-sm text-muted-foreground italic ${className}`}>
        No data available
      </div>
    );
  }

  const isSimpleValue = typeof data === 'string' || typeof data === 'number' || typeof data === 'boolean';

  if (isSimpleValue) {
    return (
      <div className={`text-sm ${className}`}>
        {title && <span className="font-medium text-muted-foreground">{title}: </span>}
        <span className="text-foreground">{String(data)}</span>
      </div>
    );
  }

  return (
    <Card className={`${className}`}>
      {title && (
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={title ? "pt-0" : ""}>
        <pre className="text-xs bg-muted/50 p-3 rounded-lg overflow-auto max-h-40 border text-foreground">
          {JSON.stringify(data, null, 2)}
        </pre>
      </CardContent>
    </Card>
  );
}