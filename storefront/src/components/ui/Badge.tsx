import { cn } from "@/lib/utils";
import type { ProductTag } from "@/types";

interface BadgeProps {
  tag: ProductTag;
  className?: string;
}

const tagConfig: Record<ProductTag, { label: string; style: string }> = {
  offre: {
    label: "Offre",
    style: "bg-accent text-white",
  },
  nouveau: {
    label: "Nouveau",
    style: "bg-primary text-white",
  },
  bundle: {
    label: "Bundle",
    style: "bg-warning text-white",
  },
};

export default function Badge({ tag, className }: BadgeProps) {
  const config = tagConfig[tag];

  return (
    <span
      className={cn(
        "inline-block px-2.5 py-0.5 text-xs font-bold uppercase tracking-wide rounded-full",
        config.style,
        className
      )}
    >
      {config.label}
    </span>
  );
}
