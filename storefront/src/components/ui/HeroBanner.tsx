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
        "relative overflow-hidden bg-gradient-to-br from-white via-cyan-light to-white",
        className
      )}
    >
      {/* Subtle decorative shapes */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/[0.04] rounded-full -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/[0.04] rounded-full translate-y-1/2 -translate-x-1/3" />

      <Container>
        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-14 sm:py-20 lg:py-24">
          {/* Text content */}
          <div>
            {/* Logo badge */}
            <div className="inline-flex items-center gap-2.5 bg-primary/[0.07] rounded-full px-4 py-2 mb-8">
              <img src="/logo.jpg" alt="" className="h-5 w-5 rounded-full" />
              <span className="text-sm font-semibold text-primary-dark tracking-wide uppercase">
                Distributeur exclusif en Tunisie
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] tracking-tight text-text-dark">
              {headline}
            </h1>
            <p className="mt-5 sm:mt-6 text-lg leading-relaxed text-text max-w-lg">
              {subtext}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <a href={ctaHref}>
                <Button variant="primary" size="lg">
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
                <Button variant="secondary" size="lg">
                  Nos offres
                </Button>
              </a>
            </div>

            {/* Trust indicators */}
            <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-text">
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10">
                  <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                Produits éco-responsables
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10">
                  <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                Conseil par métier
              </div>
              <div className="flex items-center gap-2">
                <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary/10">
                  <svg className="w-3 h-3 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                Paiement à la livraison
              </div>
            </div>
          </div>

          {/* Image */}
          {imageSrc && (
            <div className="relative hidden lg:flex justify-center">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl ring-1 ring-black/5">
                <img
                  src={imageSrc}
                  alt="Produits Paredes"
                  className="w-full h-[440px] object-cover"
                />
                {/* Soft gradient overlay at bottom */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/10 to-transparent" />
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
