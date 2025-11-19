import { cn } from "@/lib/utils";

interface TPLogoProps {
  size?: number;
  className?: string;
  label?: string;
}

export default function TPLogo({ size = 52, className = "", label = "TP logo" }: TPLogoProps) {
  const borderRadius = Math.max(12, size * 0.35);

  return (
    <div
      role="img"
      aria-label={label}
      className={cn(
        "tp-logo flex items-center justify-center font-black uppercase tracking-[0.18em] text-[#021526]",
        "bg-gradient-to-br from-[#05F0E0] via-[#00C7FF] to-[#0060FF] shadow-[0_15px_30px_rgba(0,204,255,0.45)]",
        "ring-2 ring-white/20",
        className,
      )}
      style={{
        width: size,
        height: size,
        borderRadius,
        fontSize: size * 0.36,
      }}
    >
      TP
    </div>
  );
}

