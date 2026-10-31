import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { GalleryImage } from '../data/projects';
import { Chevron } from './Icons';

type Props = {
  title: string;
  keepCase?: boolean;
  images: GalleryImage[];
  start: number;
  onClose: () => void;
};

export default function Lightbox({ title, keepCase, images, start, onClose }: Props) {
  const [i, setI] = useState(start);
  const n = images.length;
  const cur = images[i];
  const closeRef = useRef<HTMLButtonElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);

  const go = useCallback((d: number) => setI((v) => (((v + d) % n) + n) % n), [n]);

  // Keyboard, scroll lock, focus restore.
  useEffect(() => {
    const prevFocus = document.activeElement as HTMLElement | null;
    const { overflow, paddingRight } = document.body.style;
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = 'hidden';
    if (sbw > 0) document.body.style.paddingRight = `${sbw}px`;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
    };
    window.addEventListener('keydown', onKey, true);
    return () => {
      window.removeEventListener('keydown', onKey, true);
      document.body.style.overflow = overflow;
      document.body.style.paddingRight = paddingRight;
      prevFocus?.focus?.({ preventScroll: true });
    };
  }, [go, onClose]);

  // Keep the active thumbnail in view.
  useEffect(() => {
    const el = thumbsRef.current?.children[i] as HTMLElement | undefined;
    el?.scrollIntoView({ block: 'nearest', inline: 'center' });
  }, [i]);

  // Keep Tab inside the dialog.
  const trap = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== 'Tab') return;
    const f = e.currentTarget.querySelectorAll<HTMLElement>('button');
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  };

  // Events inside the portal still bubble through the React tree; keep them away from the carousel.
  const stop = (e: React.SyntheticEvent) => e.stopPropagation();

  return createPortal(
    <div
      className="lb"
      role="dialog"
      aria-modal="true"
      aria-label={`${title} screenshots`}
      onKeyDown={(e) => { trap(e); stop(e); }}
      onClick={(e) => { if (e.target === e.currentTarget || (e.target as HTMLElement).classList.contains('lb-stage')) onClose(); }}
      onTouchStart={(e) => { stop(e); touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }; }}
      onTouchEnd={(e) => {
        stop(e);
        if (!touch.current) return;
        const dx = e.changedTouches[0].clientX - touch.current.x;
        const dy = e.changedTouches[0].clientY - touch.current.y;
        if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
        else if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.5) onClose();
        touch.current = null;
      }}
      onMouseEnter={stop}
      onFocus={stop}
      onBlur={stop}
    >
      <div className="lb-frame">
        <div className="lb-bar">
          <span className="lb-title"><span className={keepCase ? 'keep-case' : undefined}>{title}</span> · {cur.caption}</span>
          <span className="lb-count" aria-live="polite">{i + 1} / {n}</span>
          <button ref={closeRef} type="button" className="lb-close" onClick={onClose} aria-label="Close larger view">
            <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="square"><path d="M5 5l14 14M19 5L5 19"/></svg>
          </button>
        </div>
        <div className="lb-stage">
          <img key={cur.src} src={cur.src} alt={cur.alt} decoding="async" />
          {n > 1 && (
            <>
              <button type="button" className="lb-nav lb-prev" onClick={() => go(-1)} aria-label="Previous screenshot"><Chevron dir="left" className="ico" /></button>
              <button type="button" className="lb-nav lb-next" onClick={() => go(1)} aria-label="Next screenshot"><Chevron dir="right" className="ico" /></button>
            </>
          )}
        </div>
        {n > 1 && (
          <div className="lb-thumbs" ref={thumbsRef} role="group" aria-label={`${title} screenshots`}>
            {images.map((g, k) => (
              <button
                key={g.src}
                type="button"
                className={`thumb-btn ${k === i ? 'active' : ''}`}
                onClick={() => setI(k)}
                aria-label={`Show screenshot ${k + 1} of ${n}: ${g.caption}`}
                aria-pressed={k === i}
              >
                <img src={g.src} alt="" width={96} height={60} loading="lazy" decoding="async" />
                <span className="thumb-cap" aria-hidden="true">{g.caption}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
