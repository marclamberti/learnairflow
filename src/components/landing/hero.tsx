import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-[calc(100vh-3.5rem)] items-center overflow-hidden">
      {/* Atmospheric background layers */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute right-[-10%] top-1/2 h-[600px] w-[600px] -translate-y-1/2 rounded-full bg-[#1C4D8D] opacity-30 blur-[120px]" />
        <div className="absolute left-[-5%] top-[-10%] h-[400px] w-[400px] rounded-full bg-[#4988C4] opacity-10 blur-[100px]" />
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-12 px-6 lg:flex-row lg:gap-16">
        {/* Left — text + CTA */}
        <div className="flex flex-1 flex-col items-center gap-8 text-center lg:items-start lg:text-left">
          <h1
            className="animate-hero-rise max-w-xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl"
          >
            The fun and effective way to learn{" "}
            <span className="bg-gradient-to-r from-[#BDE8F5] to-[#4988C4] bg-clip-text text-transparent">
              Apache Airflow!
            </span>
          </h1>

          <div className="animate-hero-rise flex flex-col items-center gap-5 lg:items-start" style={{ animationDelay: "150ms" }}>
            <Link
              href="/courses"
              className="inline-flex h-14 items-center justify-center rounded-2xl bg-[#58CC02] px-12 text-base font-extrabold uppercase tracking-widest text-white shadow-[0_5px_0_0_#46a302] transition-all duration-100 hover:brightness-110 active:translate-y-[5px] active:shadow-none"
            >
              Get Started
            </Link>
            <Link
              href="/courses/intro-to-airflow"
              className="text-sm font-bold uppercase tracking-widest text-[#4988C4] transition-colors hover:text-[#BDE8F5]"
            >
              I already have an account
            </Link>
          </div>
        </div>

        {/* Right — DAG illustration */}
        <div className="animate-hero-scale-in flex flex-1 items-center justify-center" style={{ animationDelay: "300ms" }}>
          <div className="animate-float relative">
            <svg
              viewBox="0 0 440 380"
              fill="none"
              className="h-72 w-[22rem] sm:h-[24rem] sm:w-[28rem] lg:h-[26rem] lg:w-[32rem]"
              aria-hidden="true"
            >
              <defs>
                <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#4988C4" />
                  <stop offset="100%" stopColor="#BDE8F5" />
                </linearGradient>
                <radialGradient id="nodeGlow">
                  <stop offset="0%" stopColor="#BDE8F5" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#BDE8F5" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Background glow orb */}
              <circle cx="220" cy="190" r="160" fill="url(#nodeGlow)" className="animate-glow-pulse" />

              {/* Connection lines with gradient */}
              <path d="M130 90 L220 180" stroke="url(#lineGrad)" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
              <path d="M310 90 L220 180" stroke="url(#lineGrad)" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
              <path d="M220 180 L130 280" stroke="url(#lineGrad)" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
              <path d="M220 180 L310 280" stroke="url(#lineGrad)" strokeWidth="3" strokeLinecap="round" opacity="0.7" />

              {/* Animated data pulses */}
              <circle r="4" fill="#BDE8F5" filter="url(#glow)">
                <animateMotion dur="2.5s" repeatCount="indefinite" path="M130 90 L220 180" />
              </circle>
              <circle r="4" fill="#BDE8F5" filter="url(#glow)">
                <animateMotion dur="2.5s" repeatCount="indefinite" begin="0.6s" path="M310 90 L220 180" />
              </circle>
              <circle r="4" fill="#BDE8F5" filter="url(#glow)">
                <animateMotion dur="2.5s" repeatCount="indefinite" begin="1.2s" path="M220 180 L130 280" />
              </circle>
              <circle r="4" fill="#BDE8F5" filter="url(#glow)">
                <animateMotion dur="2.5s" repeatCount="indefinite" begin="1.8s" path="M220 180 L310 280" />
              </circle>

              {/* Extract node 1 */}
              <g filter="url(#glow)">
                <rect x="94" y="54" width="72" height="72" rx="18" fill="#162F5A" stroke="#4988C4" strokeWidth="2.5" />
                <text x="130" y="99" textAnchor="middle" fill="#BDE8F5" fontSize="13" fontWeight="bold" fontFamily="monospace">extract</text>
              </g>

              {/* Extract node 2 */}
              <g filter="url(#glow)">
                <rect x="274" y="54" width="72" height="72" rx="18" fill="#162F5A" stroke="#4988C4" strokeWidth="2.5" />
                <text x="310" y="99" textAnchor="middle" fill="#BDE8F5" fontSize="13" fontWeight="bold" fontFamily="monospace">extract</text>
              </g>

              {/* Transform node (green — the active one) */}
              <g filter="url(#glow)">
                <rect x="184" y="144" width="72" height="72" rx="18" fill="#58CC02" stroke="#46a302" strokeWidth="2.5" />
                <text x="220" y="187" textAnchor="middle" fill="white" fontSize="11" fontWeight="bold" fontFamily="monospace">transform</text>
              </g>

              {/* Load node 1 */}
              <g filter="url(#glow)">
                <rect x="94" y="244" width="72" height="72" rx="18" fill="#162F5A" stroke="#4988C4" strokeWidth="2.5" />
                <text x="130" y="289" textAnchor="middle" fill="#BDE8F5" fontSize="13" fontWeight="bold" fontFamily="monospace">load</text>
              </g>

              {/* Load node 2 */}
              <g filter="url(#glow)">
                <rect x="274" y="244" width="72" height="72" rx="18" fill="#162F5A" stroke="#4988C4" strokeWidth="2.5" />
                <text x="310" y="289" textAnchor="middle" fill="#BDE8F5" fontSize="13" fontWeight="bold" fontFamily="monospace">load</text>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
