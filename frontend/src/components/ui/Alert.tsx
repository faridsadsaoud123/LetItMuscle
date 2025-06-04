import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn2 } from "../../utils/jwtUtils"
import { AlertTriangle, CheckCircle2, XCircle, Info } from "lucide-react"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&>svg~*]:pl-7 flex items-center",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive: "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success: "border-green-500/50 bg-green-500/10 text-green-600 dark:border-green-500 [&>svg]:text-green-600",
        warning: "border-amber-500/50 bg-amber-500/10 text-amber-600 dark:border-amber-500 [&>svg]:text-amber-600",
        info: "border-blue-500/50 bg-blue-500/10 text-blue-600 dark:border-blue-500 [&>svg]:text-blue-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const iconMap = {
  default: Info,
  destructive: XCircle,
  success: CheckCircle2,
  warning: AlertTriangle,
  info: Info,
}

interface AlertProps extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof alertVariants> {
  onClose?: () => void;
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", children, onClose, ...props }, ref) => {
    const IconComponent = iconMap[variant || "default"]
    
    return (
      <div
        ref={ref}
        role="alert"
        className={cn2(alertVariants({ variant }), className, "relative pr-8")}
        {...props}
      >
        <IconComponent className="h-4 w-4" />
        <div className="ml-2">{children}</div>
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute right-2 top-2 rounded-full p-1 hover:bg-background/80"
            aria-label="Close alert"
          >
            <XCircle className="h-4 w-4" />
          </button>
        )}
      </div>
    )
  }
)
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn2("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn2("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

export { Alert, AlertTitle, AlertDescription }