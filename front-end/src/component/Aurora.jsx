import React from "react"
import { cn } from "../lib/utils"

export function AuroraBackground({
  className,
  children,
  showRadialGradient = true,
  animationSpeed = 60,
  ...props
}) {
  // Import custom CSS for aurora animation
  React.useEffect(() => {
    import("../aurora.css");
  }, []);

  return (
    <main>
      <div
        className={cn(
          "relative flex min-h-screen flex-col items-center justify-center bg-zinc-900 text-white overflow-hidden",
          className
        )}
        {...props}
      >
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={cn(
              "aurora-animated-bg",
              showRadialGradient && "mask-radial"
            )}
            style={{
              "--aurora-speed": `${animationSpeed}s`,
            }}
          />
        </div>

        <div className="relative z-10 w-full">{children}</div>
      </div>
    </main>
  )
}

export default AuroraBackground