/**
 * CSS-built Route 01 scenery. The entire layer is decorative so the trainer
 * introduction remains the only content exposed to assistive technology.
 */
export function HeroRouteEnvironment() {
  return (
    <div
      className="hero-route-environment pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      <div className="hero-route-sky absolute inset-0" />
      <div className="hero-route-sun absolute" />
      <div className="hero-route-cloud hero-route-cloud--one absolute" />
      <div className="hero-route-cloud hero-route-cloud--two absolute" />
      <div className="hero-route-cloud hero-route-cloud--three absolute" />

      <div className="hero-route-ridge hero-route-ridge--far absolute inset-x-0" />
      <div className="hero-route-ridge hero-route-ridge--near absolute inset-x-0" />
      <div className="hero-route-field absolute inset-x-0 bottom-0" />
      <div className="hero-route-path absolute bottom-0" />

      <div className="hero-route-grass hero-route-grass--left absolute bottom-0 left-0" />
      <div className="hero-route-grass hero-route-grass--right absolute bottom-0 right-0" />

      <div className="hero-route-fence hero-route-fence--left absolute">
        <span />
        <span />
        <span />
      </div>
      <div className="hero-route-fence hero-route-fence--right absolute">
        <span />
        <span />
        <span />
      </div>

      <div className="hero-route-signpost absolute">
        <div className="hero-route-signpost__face">ROUTE 01</div>
        <div className="hero-route-signpost__post" />
      </div>
    </div>
  );
}
