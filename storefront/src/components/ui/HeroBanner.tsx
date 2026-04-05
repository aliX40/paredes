import { cn } from "@/lib/utils";
import Button from "./Button";
import Container from "./Container";

interface HeroBannerProps {
  headline: string;
  subtext: string;
  ctaLabel?: string;
  ctaHref?: string;
  variant?: "primary" | "cream" | "cyan";
  className?: string;
}

const variantStyles = {
  primary: "bg-gradient-to-br from-primary to-primary-dark text-white",
  cream: "bg-cream text-text-dark",
  cyan: "bg-cyan-light text-text-dark",
};

export default function HeroBanner({
  headline,
  subtext,
  ctaLabel = "Voir les produits",
  ctaHref = "/produits",
  variant = "primary",
  className,
}: HeroBannerProps) {
  const isPrimary = variant === "primary";

  return (
    <section className={cn("relative overflow-hidden", variantStyles[variant], className)}>
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/20 rounded-full -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/3 -translate-x-1/4" />
      </div>

      <Container>
        <div className="relative py-16 sm:py-20 lg:py-28 max-w-2xl">
          <h1
            className={cn(
              "text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight",
              isPrimary ? "text-white" : "text-text-dark"
            )}
          >
            {headline}
          </h1>
          <p
            className={cn(
              "mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed",
              isPrimary ? "text-white/80" : "text-text"
            )}
          >
            {subtext}
          </p>
          <div className="mt-8">
            <a href={ctaHref}>
              <Button
                variant={isPrimary ? "accent" : "primary"}
                size="lg"
              >
                {ctaLabel}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </Button>
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}
