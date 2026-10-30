import { useCallback, useEffect, useRef, useState } from 'react';
import type { Slide } from '../data/projects';
import { Chevron, GitHubIcon, GlobeIcon } from './Icons';

const AUTOPLAY_MS = 6500;

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setReduced(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return reduced;
}

export function Placeholder({ title, note, accent }: { title: string; note?: string; accent: string }) {
  return (
    <div className={`placeholder accent-${accent}`} role="img" aria-label={`${title} placeholder art`}>
      <span className="ph-corner tl" /><span className="ph-corner tr" /><span className="ph-corner bl" /><span className="ph-corner br" />
      <span className="ph-title">{title}</span>
      {note && <span className="ph-note">{note}</span>}
    </div>
  );
}

export default function Carousel({ slides }: { slides: Slide[] }) {
  const [index, setIndex] = useState(0);
  const reduced = usePrefersReducedMotion();
  const [playing, setPlaying] = useState(!reduced);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const touchX = useRef<number | null>(null);
  const count = slides.length;

  const go = useCallback((i: number) => setIndex(((i % count) + count) % count), [count]);
  const next = useCallback(() => go(index + 1), [go, index]);
  const prev = useCallback(() => go(index - 1), [go, index]);

  useEffect(() => {
    if (reduced) setPlaying(false);
  }, [reduced]);

  useEffect(() => {
    if (!playing || hovered || focused) return;
    const t = window.setTimeout(next, AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [playing, hovered, focused, next]);

  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
  };

  return (
    <section
      className="carousel"
      aria-roledescription="carousel"
      aria-label="Featured works"
      onKeyDown={onKey}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => { if (!e.currentTarget.contains(e.relatedTarget as Node)) setFocused(false); }}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current === null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 45) (dx < 0 ? next : prev)();
        touchX.current = null;
      }}
    >
      <div className="carousel-viewport">
        <div className="carousel-track" style={{ transform: `translateX(-${index * 100}%)` }} aria-live={playing ? 'off' : 'polite'}>
          {slides.map((s, i) => (
            <article
              key={s.id}
              className={`slide accent-${s.accent}`}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${count}: ${s.title}`}
              aria-hidden={i !== index}
              inert={i !== index}
            >
              <div className="slide-media">
                <div className="titlebar" aria-hidden="true"><span>{s.title}</span><i /></div>
                {s.image ? (
                  <img src={s.image} alt={s.imageAlt} width={1440} height={900} loading={i === 0 ? 'eager' : 'lazy'} decoding="async" />
                ) : (
                  <Placeholder title={s.title} note={s.placeholderNote} accent={s.accent} />
                )}
              </div>
              <div className="slide-body">
                <ul className="tags" aria-label="Tags">
                  {s.tags.map((t) => <li key={t}>{t}</li>)}
                </ul>
                <h3>{s.title}</h3>
                <p>{s.blurb}</p>
                <div className="btn-row">
                  {s.links.map((l) => (
                    <a key={l.href} className={`btn ${l.kind === 'live' ? 'btn-primary' : 'btn-ghost'}`} href={l.href} target="_blank" rel="noopener noreferrer">
                      {l.kind === 'live' ? <GlobeIcon className="ico" /> : <GitHubIcon className="ico" />}
                      {l.label}<span className="sr-only"> for {s.title} (opens in new tab)</span>
                    </a>
                  ))}
                  {s.links.length === 0 && <span className="muted-pill">Links coming soon</span>}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <div className="carousel-controls">
        <button className="round-btn" onClick={prev} aria-label="Previous slide"><Chevron dir="left" className="ico" /></button>
        <div className="dots" role="group" aria-label="Choose slide">
          {slides.map((s, i) => (
            <button
              key={s.id}
              className={`dot ${i === index ? 'active' : ''}`}
              onClick={() => go(i)}
              aria-label={`Go to slide ${i + 1}: ${s.title}`}
              aria-current={i === index ? 'true' : undefined}
            />
          ))}
        </div>
        <button className="round-btn" onClick={next} aria-label="Next slide"><Chevron dir="right" className="ico" /></button>
        <button className="pill-btn" onClick={() => setPlaying((p) => !p)} aria-pressed={playing}>
          {playing ? 'Pause' : 'Play'}<span className="sr-only"> slideshow autoplay</span>
        </button>
      </div>
    </section>
  );
}
