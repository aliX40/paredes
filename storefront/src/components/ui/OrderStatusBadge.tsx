import { cn } from "@/lib/utils";
import type { OrderStatus } from "@/types";

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

const statusConfig: Record<
  OrderStatus,
  { label: string; bg: string; text: string; dot: string }
> = {
  en_attente: {
    label: "En attente",
    bg: "bg-yellow-50",
    text: "text-yellow-800",
    dot: "bg-yellow-500",
  },
  confirmee: {
    label: "Confirmée",
    bg: "bg-blue-50",
    text: "text-blue-800",
    dot: "bg-blue-500",
  },
  expediee: {
    label: "Expédiée",
    bg: "bg-purple-50",
    text: "text-purple-800",
    dot: "bg-purple-500",
  },
  livree: {
    label: "Livrée",
    bg: "bg-green-50",
    text: "text-green-800",
    dot: "bg-green-500",
  },
  annulee: {
    label: "Annulée",
    bg: "bg-red-50",
    text: "text-red-800",
    dot: "bg-red-500",
  },
};

export default function OrderStatusBadge({
  status,
  className,
}: OrderStatusBadgeProps) {
  const config = statusConfig[status];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-full",
        config.bg,
        config.text,
        className
      )}
    >
      <span className={cn("w-1.5 h-1.5 rounded-full", config.dot)} />
      {config.label}
    </span>
  );
}
