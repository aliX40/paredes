import { cn } from "@/lib/utils";
import Button from "./Button";
import Container from "./Container";

interface HeroBannerProps {
  headline: string;
  subtext: string;
  ctaLabel?: string;
  ctaHref?: string;
  imageSrc?: string;
  className?: string;
}

export default function HeroBanner({
  headline,
  subtext,
  ctaLabel = "Voir les produits",
  ctaHref = "/produits",
  imageSrc,
  className,
}: HeroBannerProps) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-text-dark min-h-[420px] sm:min-h-[500px] flex items-center",
        className
      )}
    >
      {/* Background image */}
      {imageSrc && (
        <div className="absolute inset-0">
          <img
            src={imageSrc}
            alt=""
            className="w-full h-full object-cover"
          />
          {/* Dark overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-text-dark/90 via-text-dark/70 to-text-dark/30" />
        </div>
      )}

      {/* Decorative accent bar */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary" />

      <Container>
        <div className="relative py-16 sm:py-20 lg:py-28 max-w-2xl">
          {/* Logo badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 mb-6">
            <img src="/logo.jpg" alt="" className="h-5 w-5 rounded-full" />
            <span className="text-sm font-medium text-white/90">
              Distributeur exclusif en Tunisie
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-white">
            {headline}
          </h1>
          <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-relaxed text-white/80 max-w-xl">
            {subtext}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href={ctaHref}>
              <Button variant="accent" size="lg">
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
            <a href="/offres">
              <Button
                variant="ghost"
                size="lg"
                className="text-white border border-white/30 hover:bg-white/10 hover:text-white"
              >
                Nos offres
              </Button>
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-10 flex flex-wrap gap-6 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Paiement à la livraison
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Livraison toute la Tunisie
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Qualité professionnelle
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
