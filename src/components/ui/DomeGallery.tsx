'use client';

import React, { useEffect, useMemo, useRef, useCallback } from 'react';
import { useGesture } from '@use-gesture/react';
import './DomeGallery.css';

export interface DomeGalleryImageObject {
  src: string;
  alt?: string;
  title?: string;
  category?: string;
  tagline?: string;
  url?: string;
}

export type DomeGalleryImage = string | DomeGalleryImageObject;

export interface DomeGalleryProps {
  images?: DomeGalleryImage[];
  fit?: number;
  fitBasis?: 'auto' | 'min' | 'max' | 'width' | 'height';
  minRadius?: number;
  maxRadius?: number;
  padFactor?: number;
  overlayBlurColor?: string;
  maxVerticalRotationDeg?: number;
  dragSensitivity?: number;
  enlargeTransitionMs?: number;
  segments?: number;
  dragDampening?: number;
  openedImageWidth?: string;
  openedImageHeight?: string;
  imageBorderRadius?: string;
  openedImageBorderRadius?: string;
  grayscale?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface DomeGalleryItem {
  x: number;
  y: number;
  sizeX: number;
  sizeY: number;
  src: string;
  alt: string;
  title?: string;
  category?: string;
  tagline?: string;
  url?: string;
}

export const DEFAULT_IMAGES: DomeGalleryImageObject[] = [
  {
    src: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=900&auto=format&fit=crop',
    alt: 'SaaS Cloud Architecture',
    title: 'Multi-Tenant Cloud Platform',
    category: 'Z-01 STUDIO // SAAS',
    tagline: 'Multi-region tenant isolation & Stripe billing plumbing',
    url: '/studio',
  },
  {
    src: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=900&auto=format&fit=crop',
    alt: 'I Hate Love PDF',
    title: 'I Hate Love PDF',
    category: 'Z-03 PRODUCTS // WEBASSEMBLY',
    tagline: 'Private in-browser client-side cryptographic document editor',
    url: '/products/i-hate-love-pdf',
  },
  {
    src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=900&auto=format&fit=crop',
    alt: 'Local Vector RAG',
    title: 'Local Vector RAG Engine',
    category: 'Z-04 LABS // EXPERIMENTAL',
    tagline: 'Zero-cloud GPU semantic search & nearest neighbor vector space',
    url: '/labs/local-vector-rag',
  },
  {
    src: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=900&auto=format&fit=crop',
    alt: 'Brand One Apparel',
    title: 'Brand One // Studio Collection',
    category: 'Z-02 BRANDS // APPAREL',
    tagline: 'Generative typography & on-demand heavy cotton blanks',
    url: '/brands/brand-one',
  },
  {
    src: 'https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=900&auto=format&fit=crop',
    alt: 'GitFC Coordinator',
    title: 'GitFC // Version Coordinator',
    category: 'Z-03 PRODUCTS // DEVTOOLS',
    tagline: 'Distributed Git-native conflict resolution & workspace sync',
    url: '/products/gitfc',
  },
  {
    src: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=900&auto=format&fit=crop',
    alt: 'Algorithmic Garment Patterns',
    title: 'Parametric Garment CAD',
    category: 'Z-04 LABS // CAD',
    tagline: 'Generative SVG apparel pattern drafting from 3D body measurements',
    url: '/labs/algorithmic-garment-patterns',
  },
  {
    src: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=900&auto=format&fit=crop',
    alt: 'Product Forum',
    title: 'Product Forum Knowledge Graph',
    category: 'Z-03 PRODUCTS // COMMUNITY',
    tagline: 'High-signal technical discourse with graph relationships',
    url: '/products/product-forum',
  },
  {
    src: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?q=80&w=900&auto=format&fit=crop',
    alt: 'Cross-TLD Session Handshake',
    title: 'Cross-TLD Session Protocol',
    category: 'Z-04 LABS // CRYPTO',
    tagline: 'Cookie-free cryptographic authentication handshake',
    url: '/labs',
  },
  {
    src: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=900&auto=format&fit=crop',
    alt: 'Design System Architecture',
    title: 'Architectural Design Systems',
    category: 'Z-01 STUDIO // DESIGN SYSTEMS',
    tagline: 'Zero-layout-shift UI token infrastructure and component tokens',
    url: '/studio',
  },
];

const DEFAULTS = {
  maxVerticalRotationDeg: 6,
  dragSensitivity: 22,
  enlargeTransitionMs: 320,
  segments: 35,
};

export const DOME_FALLBACK_SVG =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect width="600" height="600" fill="%23120f17"/><path d="M0 0l600 600M600 0L0 600" stroke="%233882f6" stroke-width="1" stroke-opacity="0.2"/><circle cx="300" cy="300" r="140" fill="none" stroke="%233882f6" stroke-width="1.5" stroke-dasharray="4,6"/><text x="50%" y="48%" dominant-baseline="middle" text-anchor="middle" fill="%23f5f5f5" font-family="monospace" font-size="14" letter-spacing="3">ZENITH // SPEC</text><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" fill="%2371717a" font-family="monospace" font-size="10" letter-spacing="2">PROJECT ARCHIVE</text></svg>';

const clamp = (v: number, min: number, max: number) => Math.min(Math.max(v, min), max);
const normalizeAngle = (d: number) => ((d % 360) + 360) % 360;
const wrapAngleSigned = (deg: number) => {
  const a = (((deg + 180) % 360) + 360) % 360;
  return a - 180;
};

const getDataNumber = (el: HTMLElement, name: string, fallback: number): number => {
  const attr = el.dataset[name] ?? el.getAttribute(`data-${name}`);
  const n = attr == null ? NaN : parseFloat(attr);
  return Number.isFinite(n) ? n : fallback;
};

function getClientCoords(e: unknown): { x: number; y: number } {
  if (e && typeof (e as { clientX?: number }).clientX === 'number') {
    const pe = e as { clientX: number; clientY: number };
    return { x: pe.clientX, y: pe.clientY };
  }
  if (e && (e as { touches?: { clientX: number; clientY: number }[] }).touches?.length) {
    const te = e as { touches: { clientX: number; clientY: number }[] };
    return { x: te.touches[0].clientX, y: te.touches[0].clientY };
  }
  if (e && (e as { changedTouches?: { clientX: number; clientY: number }[] }).changedTouches?.length) {
    const cte = e as { changedTouches: { clientX: number; clientY: number }[] };
    return { x: cte.changedTouches[0].clientX, y: cte.changedTouches[0].clientY };
  }
  return { x: 0, y: 0 };
}

function buildItems(pool: DomeGalleryImage[], seg: number): DomeGalleryItem[] {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-4, -2, 0, 2, 4];
  const oddYs = [-3, -1, 1, 3, 5];

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map((y) => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  const totalSlots = coords.length;
  if (pool.length === 0) {
    return coords.map((c) => ({ ...c, src: '', alt: '' }));
  }

  const normalizedImages: DomeGalleryImageObject[] = pool.map((image) => {
    if (typeof image === 'string') {
      return { src: image, alt: '' };
    }
    return {
      src: image.src || '',
      alt: image.alt || '',
      title: image.title,
      category: image.category,
      tagline: image.tagline,
      url: image.url,
    };
  });

  const usedImages = Array.from(
    { length: totalSlots },
    (_, i) => normalizedImages[i % normalizedImages.length]
  );

  for (let i = 1; i < usedImages.length; i++) {
    if (usedImages[i].src === usedImages[i - 1].src) {
      for (let j = i + 1; j < usedImages.length; j++) {
        if (usedImages[j].src !== usedImages[i].src) {
          const tmp = usedImages[i];
          usedImages[i] = usedImages[j];
          usedImages[j] = tmp;
          break;
        }
      }
    }
  }

  return coords.map((c, i) => ({
    ...c,
    src: usedImages[i].src,
    alt: usedImages[i].alt || usedImages[i].title || 'Project Preview',
    title: usedImages[i].title,
    category: usedImages[i].category,
    tagline: usedImages[i].tagline,
    url: usedImages[i].url,
  }));
}

function computeItemBaseRotation(
  offsetX: number,
  offsetY: number,
  sizeX: number,
  sizeY: number,
  segments: number
) {
  const unit = 360 / segments / 2;
  const rotateY = unit * (offsetX + (sizeX - 1) / 2);
  const rotateX = unit * (offsetY - (sizeY - 1) / 2);
  return { rotateX, rotateY };
}

export function DomeGallery({
  images = DEFAULT_IMAGES,
  fit = 0.52,
  fitBasis = 'auto',
  minRadius = 600,
  maxRadius = Infinity,
  padFactor = 0.22,
  overlayBlurColor = '#0a0a0b',
  maxVerticalRotationDeg = DEFAULTS.maxVerticalRotationDeg,
  dragSensitivity = DEFAULTS.dragSensitivity,
  enlargeTransitionMs = DEFAULTS.enlargeTransitionMs,
  segments = DEFAULTS.segments,
  dragDampening = 2,
  openedImageWidth = '440px',
  openedImageHeight = '440px',
  imageBorderRadius = '0px',
  openedImageBorderRadius = '0px',
  grayscale = false,
  className = '',
  style,
}: DomeGalleryProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const mainRef = useRef<HTMLElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<HTMLDivElement>(null);
  const scrimRef = useRef<HTMLDivElement>(null);
  const focusedElRef = useRef<HTMLElement | null>(null);
  const originalTilePositionRef = useRef<{
    left: number;
    top: number;
    width: number;
    height: number;
  } | null>(null);

  const rotationRef = useRef({ x: 0, y: 0 });
  const startRotRef = useRef({ x: 0, y: 0 });
  const startPosRef = useRef<{ x: number; y: number } | null>(null);
  const draggingRef = useRef(false);
  const movedRef = useRef(false);
  const inertiaRAF = useRef<number | null>(null);
  const openingRef = useRef(false);
  const openStartedAtRef = useRef(0);
  const lastDragEndAt = useRef(0);

  const scrollLockedRef = useRef(false);
  const lockScroll = useCallback(() => {
    if (scrollLockedRef.current) return;
    scrollLockedRef.current = true;
    if (typeof document !== 'undefined') {
      document.body.classList.add('dg-scroll-lock');
    }
  }, []);
  const unlockScroll = useCallback(() => {
    if (!scrollLockedRef.current) return;
    if (rootRef.current?.getAttribute('data-enlarging') === 'true') return;
    scrollLockedRef.current = false;
    if (typeof document !== 'undefined') {
      document.body.classList.remove('dg-scroll-lock');
    }
  }, []);

  const items = useMemo(() => buildItems(images, segments), [images, segments]);

  const applyTransform = useCallback((xDeg: number, yDeg: number) => {
    const el = sphereRef.current;
    if (el) {
      el.style.transform = `translateZ(calc(var(--radius) * -1)) rotateX(${xDeg}deg) rotateY(${yDeg}deg)`;
    }
  }, []);

  const lockedRadiusRef = useRef<number | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const ro = new ResizeObserver((entries) => {
      const cr = entries[0].contentRect;
      const w = Math.max(1, cr.width);
      const h = Math.max(1, cr.height);
      const minDim = Math.min(w, h);
      const maxDim = Math.max(w, h);
      const aspect = w / h;
      let basis: number;
      switch (fitBasis) {
        case 'min':
          basis = minDim;
          break;
        case 'max':
          basis = maxDim;
          break;
        case 'width':
          basis = w;
          break;
        case 'height':
          basis = h;
          break;
        default:
          basis = aspect >= 1.3 ? w : minDim;
      }
      let radius = basis * fit;
      const heightGuard = h * 1.35;
      radius = Math.min(radius, heightGuard);
      radius = clamp(radius, minRadius, maxRadius);
      lockedRadiusRef.current = Math.round(radius);

      const viewerPad = Math.max(8, Math.round(minDim * padFactor));
      root.style.setProperty('--radius', `${lockedRadiusRef.current}px`);
      root.style.setProperty('--viewer-pad', `${viewerPad}px`);
      root.style.setProperty('--overlay-blur-color', overlayBlurColor);
      root.style.setProperty('--tile-radius', imageBorderRadius);
      root.style.setProperty('--enlarge-radius', openedImageBorderRadius);
      root.style.setProperty('--image-filter', grayscale ? 'grayscale(1)' : 'none');
      applyTransform(rotationRef.current.x, rotationRef.current.y);

      const enlargedOverlay = viewerRef.current?.querySelector('.enlarge') as HTMLElement | null;
      if (enlargedOverlay && frameRef.current && mainRef.current) {
        const frameR = frameRef.current.getBoundingClientRect();
        const mainR = mainRef.current.getBoundingClientRect();

        const hasCustomSize = openedImageWidth && openedImageHeight;
        if (hasCustomSize) {
          const tempDiv = document.createElement('div');
          tempDiv.style.cssText = `position: absolute; width: ${openedImageWidth}; height: ${openedImageHeight}; visibility: hidden;`;
          document.body.appendChild(tempDiv);
          const tempRect = tempDiv.getBoundingClientRect();
          document.body.removeChild(tempDiv);

          const centeredLeft = frameR.left - mainR.left + (frameR.width - tempRect.width) / 2;
          const centeredTop = frameR.top - mainR.top + (frameR.height - tempRect.height) / 2;

          enlargedOverlay.style.left = `${centeredLeft}px`;
          enlargedOverlay.style.top = `${centeredTop}px`;
        } else {
          enlargedOverlay.style.left = `${frameR.left - mainR.left}px`;
          enlargedOverlay.style.top = `${frameR.top - mainR.top}px`;
          enlargedOverlay.style.width = `${frameR.width}px`;
          enlargedOverlay.style.height = `${frameR.height}px`;
        }
      }
    });
    ro.observe(root);
    return () => ro.disconnect();
  }, [
    fit,
    fitBasis,
    minRadius,
    maxRadius,
    padFactor,
    overlayBlurColor,
    grayscale,
    imageBorderRadius,
    openedImageBorderRadius,
    openedImageWidth,
    openedImageHeight,
    applyTransform,
  ]);

  useEffect(() => {
    applyTransform(rotationRef.current.x, rotationRef.current.y);
  }, [applyTransform]);

  const stopInertia = useCallback(() => {
    if (inertiaRAF.current) {
      cancelAnimationFrame(inertiaRAF.current);
      inertiaRAF.current = null;
    }
  }, []);

  const startInertia = useCallback(
    (vx: number, vy: number) => {
      const MAX_V = 1.4;
      let vX = clamp(vx, -MAX_V, MAX_V) * 80;
      let vY = clamp(vy, -MAX_V, MAX_V) * 80;
      let frames = 0;
      const d = clamp(dragDampening ?? 0.6, 0, 1);
      const frictionMul = 0.94 + 0.055 * d;
      const stopThreshold = 0.015 - 0.01 * d;
      const maxFrames = Math.round(90 + 270 * d);
      const step = () => {
        vX *= frictionMul;
        vY *= frictionMul;
        if (Math.abs(vX) < stopThreshold && Math.abs(vY) < stopThreshold) {
          inertiaRAF.current = null;
          return;
        }
        if (++frames > maxFrames) {
          inertiaRAF.current = null;
          return;
        }
        const nextX = clamp(
          rotationRef.current.x - vY / 200,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg
        );
        const nextY = wrapAngleSigned(rotationRef.current.y + vX / 200);
        rotationRef.current = { x: nextX, y: nextY };
        applyTransform(nextX, nextY);
        inertiaRAF.current = requestAnimationFrame(step);
      };
      stopInertia();
      inertiaRAF.current = requestAnimationFrame(step);
    },
    [dragDampening, maxVerticalRotationDeg, stopInertia, applyTransform]
  );

  useGesture(
    {
      onDragStart: ({ event }) => {
        if (focusedElRef.current) return;
        stopInertia();
        const coords = getClientCoords(event);
        draggingRef.current = true;
        movedRef.current = false;
        startRotRef.current = { ...rotationRef.current };
        startPosRef.current = coords;
      },
      onDrag: ({ event, last, velocity = [0, 0], direction = [0, 0], movement }) => {
        if (focusedElRef.current || !draggingRef.current || !startPosRef.current) return;
        const coords = getClientCoords(event);
        const dxTotal = coords.x - startPosRef.current.x;
        const dyTotal = coords.y - startPosRef.current.y;
        if (!movedRef.current) {
          const dist2 = dxTotal * dxTotal + dyTotal * dyTotal;
          if (dist2 > 16) movedRef.current = true;
        }
        const nextX = clamp(
          startRotRef.current.x - dyTotal / dragSensitivity,
          -maxVerticalRotationDeg,
          maxVerticalRotationDeg
        );
        const nextY = wrapAngleSigned(startRotRef.current.y + dxTotal / dragSensitivity);
        if (rotationRef.current.x !== nextX || rotationRef.current.y !== nextY) {
          rotationRef.current = { x: nextX, y: nextY };
          applyTransform(nextX, nextY);
        }
        if (last) {
          draggingRef.current = false;
          const [vMagX, vMagY] = velocity;
          const [dirX, dirY] = direction;
          let vx = vMagX * dirX;
          let vy = vMagY * dirY;
          if (Math.abs(vx) < 0.001 && Math.abs(vy) < 0.001 && Array.isArray(movement)) {
            const [mx, my] = movement;
            vx = clamp((mx / dragSensitivity) * 0.02, -1.2, 1.2);
            vy = clamp((my / dragSensitivity) * 0.02, -1.2, 1.2);
          }
          if (Math.abs(vx) > 0.005 || Math.abs(vy) > 0.005) startInertia(vx, vy);
          if (movedRef.current) lastDragEndAt.current = performance.now();
          movedRef.current = false;
        }
      },
    },
    { target: mainRef as React.RefObject<EventTarget>, eventOptions: { passive: true } }
  );

  useEffect(() => {
    const scrim = scrimRef.current;
    if (!scrim) return;
    const close = () => {
      if (performance.now() - openStartedAtRef.current < 250) return;
      const el = focusedElRef.current;
      if (!el) return;
      const parent = el.parentElement as HTMLElement | null;
      if (!parent) return;
      const overlay = viewerRef.current?.querySelector('.enlarge') as HTMLElement | null;
      if (!overlay) return;
      const refDiv = parent.querySelector('.item__image--reference') as HTMLElement | null;
      const originalPos = originalTilePositionRef.current;
      if (!originalPos) {
        overlay.remove();
        if (refDiv) refDiv.remove();
        parent.style.setProperty('--rot-y-delta', '0deg');
        parent.style.setProperty('--rot-x-delta', '0deg');
        el.style.visibility = '';
        el.style.zIndex = '0';
        focusedElRef.current = null;
        rootRef.current?.removeAttribute('data-enlarging');
        openingRef.current = false;
        unlockScroll();
        return;
      }
      const currentRect = overlay.getBoundingClientRect();
      const rootRect = rootRef.current?.getBoundingClientRect() ?? { left: 0, top: 0 };
      const originalPosRelativeToRoot = {
        left: originalPos.left - rootRect.left,
        top: originalPos.top - rootRect.top,
        width: originalPos.width,
        height: originalPos.height,
      };
      const overlayRelativeToRoot = {
        left: currentRect.left - rootRect.left,
        top: currentRect.top - rootRect.top,
        width: currentRect.width,
        height: currentRect.height,
      };
      const animatingOverlay = document.createElement('div');
      animatingOverlay.className = 'enlarge-closing';
      animatingOverlay.style.cssText = `position:absolute;left:${overlayRelativeToRoot.left}px;top:${overlayRelativeToRoot.top}px;width:${overlayRelativeToRoot.width}px;height:${overlayRelativeToRoot.height}px;z-index:9999;border-radius: var(--enlarge-radius, 0px);overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,.5);transition:all ${enlargeTransitionMs}ms ease-out;pointer-events:none;margin:0;transform:none;`;
      const originalImg = overlay.querySelector('img');
      if (originalImg) {
        const img = originalImg.cloneNode() as HTMLImageElement;
        img.style.cssText = 'width:100%;height:100%;object-fit:cover;';
        img.onerror = () => {
          img.src = DOME_FALLBACK_SVG;
        };
        animatingOverlay.appendChild(img);
      }
      overlay.remove();
      rootRef.current?.appendChild(animatingOverlay);
      void animatingOverlay.getBoundingClientRect();
      requestAnimationFrame(() => {
        animatingOverlay.style.left = originalPosRelativeToRoot.left + 'px';
        animatingOverlay.style.top = originalPosRelativeToRoot.top + 'px';
        animatingOverlay.style.width = originalPosRelativeToRoot.width + 'px';
        animatingOverlay.style.height = originalPosRelativeToRoot.height + 'px';
        animatingOverlay.style.opacity = '0';
      });
      const cleanup = () => {
        animatingOverlay.remove();
        originalTilePositionRef.current = null;
        if (refDiv) refDiv.remove();
        parent.style.transition = 'none';
        el.style.transition = 'none';
        parent.style.setProperty('--rot-y-delta', '0deg');
        parent.style.setProperty('--rot-x-delta', '0deg');
        requestAnimationFrame(() => {
          el.style.visibility = '';
          el.style.opacity = '0';
          el.style.zIndex = '0';
          focusedElRef.current = null;
          rootRef.current?.removeAttribute('data-enlarging');
          requestAnimationFrame(() => {
            parent.style.transition = '';
            el.style.transition = 'opacity 300ms ease-out';
            requestAnimationFrame(() => {
              el.style.opacity = '1';
              setTimeout(() => {
                el.style.transition = '';
                el.style.opacity = '';
                openingRef.current = false;
                if (!draggingRef.current && rootRef.current?.getAttribute('data-enlarging') !== 'true') {
                  document.body.classList.remove('dg-scroll-lock');
                }
              }, 300);
            });
          });
        });
      };
      animatingOverlay.addEventListener('transitionend', cleanup, { once: true });
    };
    scrim.addEventListener('click', close);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      scrim.removeEventListener('click', close);
      window.removeEventListener('keydown', onKey);
    };
  }, [enlargeTransitionMs, unlockScroll]);

  const openItemFromElement = useCallback(
    (el: HTMLElement) => {
      if (openingRef.current) return;
      openingRef.current = true;
      openStartedAtRef.current = performance.now();
      lockScroll();
      const parent = el.parentElement as HTMLElement | null;
      if (!parent) return;
      focusedElRef.current = el;
      el.setAttribute('data-focused', 'true');
      const offsetX = getDataNumber(parent, 'offsetX', 0);
      const offsetY = getDataNumber(parent, 'offsetY', 0);
      const sizeX = getDataNumber(parent, 'sizeX', 2);
      const sizeY = getDataNumber(parent, 'sizeY', 2);
      const parentRot = computeItemBaseRotation(offsetX, offsetY, sizeX, sizeY, segments);
      const parentY = normalizeAngle(parentRot.rotateY);
      const globalY = normalizeAngle(rotationRef.current.y);
      let rotY = -(parentY + globalY) % 360;
      if (rotY < -180) rotY += 360;
      const rotX = -parentRot.rotateX - rotationRef.current.x;
      parent.style.setProperty('--rot-y-delta', `${rotY}deg`);
      parent.style.setProperty('--rot-x-delta', `${rotX}deg`);
      const refDiv = document.createElement('div');
      refDiv.className = 'item__image item__image--reference';
      refDiv.style.opacity = '0';
      refDiv.style.transform = `rotateX(${-parentRot.rotateX}deg) rotateY(${-parentRot.rotateY}deg)`;
      parent.appendChild(refDiv);

      void refDiv.offsetHeight;

      const tileR = refDiv.getBoundingClientRect();
      const mainR = mainRef.current?.getBoundingClientRect();
      const frameR = frameRef.current?.getBoundingClientRect();

      if (!mainR || !frameR || tileR.width <= 0 || tileR.height <= 0) {
        openingRef.current = false;
        focusedElRef.current = null;
        parent.removeChild(refDiv);
        unlockScroll();
        return;
      }

      originalTilePositionRef.current = {
        left: tileR.left,
        top: tileR.top,
        width: tileR.width,
        height: tileR.height,
      };
      el.style.visibility = 'hidden';
      el.style.zIndex = '0';
      const overlay = document.createElement('div');
      overlay.className = 'enlarge';
      overlay.style.position = 'absolute';
      overlay.style.left = frameR.left - mainR.left + 'px';
      overlay.style.top = frameR.top - mainR.top + 'px';
      overlay.style.width = frameR.width + 'px';
      overlay.style.height = frameR.height + 'px';
      overlay.style.opacity = '0';
      overlay.style.zIndex = '30';
      overlay.style.willChange = 'transform, opacity';
      overlay.style.transformOrigin = 'top left';
      overlay.style.transition = `transform ${enlargeTransitionMs}ms ease, opacity ${enlargeTransitionMs}ms ease`;
      const rawSrc = parent.dataset.src || el.querySelector('img')?.src || '';
      const img = document.createElement('img');
      img.src = rawSrc;
      img.onerror = () => {
        img.src = DOME_FALLBACK_SVG;
      };
      overlay.appendChild(img);

      // Add project title badge if available
      const projectTitle = parent.dataset.title;
      const projectCategory = parent.dataset.category;
      if (projectTitle || projectCategory) {
        const badge = document.createElement('div');
        badge.className = 'enlarge-caption';
        badge.style.cssText =
          'position:absolute;bottom:0;left:0;right:0;padding:12px 16px;background:rgba(10,10,11,0.85);backdrop-filter:blur(8px);border-top:1px solid rgba(255,255,255,0.12);color:#f5f5f5;font-family:inherit;z-index:2;';
        badge.innerHTML = `
          <div style="font-family:monospace;font-size:10px;color:#3882f6;letter-spacing:0.05em;text-transform:uppercase;">${
            projectCategory || 'ZENITH // SHIPPED WORK'
          }</div>
          <div style="font-family:serif;font-size:18px;font-weight:500;margin-top:2px;">${
            projectTitle || ''
          }</div>
        `;
        overlay.appendChild(badge);
      }

      viewerRef.current?.appendChild(overlay);
      const tx0 = tileR.left - frameR.left;
      const ty0 = tileR.top - frameR.top;
      const sx0 = tileR.width / frameR.width;
      const sy0 = tileR.height / frameR.height;

      const validSx0 = isFinite(sx0) && sx0 > 0 ? sx0 : 1;
      const validSy0 = isFinite(sy0) && sy0 > 0 ? sy0 : 1;

      overlay.style.transform = `translate(${tx0}px, ${ty0}px) scale(${validSx0}, ${validSy0})`;

      setTimeout(() => {
        if (!overlay.parentElement) return;
        overlay.style.opacity = '1';
        overlay.style.transform = 'translate(0px, 0px) scale(1, 1)';
        rootRef.current?.setAttribute('data-enlarging', 'true');
      }, 16);

      const wantsResize = openedImageWidth || openedImageHeight;
      if (wantsResize) {
        const onFirstEnd = (ev: TransitionEvent) => {
          if (ev.propertyName !== 'transform') return;
          overlay.removeEventListener('transitionend', onFirstEnd);
          overlay.style.transition = 'none';
          const tempWidth = openedImageWidth || `${frameR.width}px`;
          const tempHeight = openedImageHeight || `${frameR.height}px`;
          overlay.style.width = tempWidth;
          overlay.style.height = tempHeight;
          const newRect = overlay.getBoundingClientRect();
          overlay.style.width = frameR.width + 'px';
          overlay.style.height = frameR.height + 'px';
          void overlay.offsetWidth;
          overlay.style.transition = `left ${enlargeTransitionMs}ms ease, top ${enlargeTransitionMs}ms ease, width ${enlargeTransitionMs}ms ease, height ${enlargeTransitionMs}ms ease`;
          const centeredLeft = frameR.left - mainR.left + (frameR.width - newRect.width) / 2;
          const centeredTop = frameR.top - mainR.top + (frameR.height - newRect.height) / 2;
          requestAnimationFrame(() => {
            overlay.style.left = `${centeredLeft}px`;
            overlay.style.top = `${centeredTop}px`;
            overlay.style.width = tempWidth;
            overlay.style.height = tempHeight;
          });
          const cleanupSecond = () => {
            overlay.removeEventListener('transitionend', cleanupSecond);
          };
          overlay.addEventListener('transitionend', cleanupSecond, { once: true });
        };
        overlay.addEventListener('transitionend', onFirstEnd);
      }
    },
    [enlargeTransitionMs, lockScroll, unlockScroll, openedImageHeight, openedImageWidth, segments]
  );

  const onTileClick = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (draggingRef.current) return;
      if (movedRef.current) return;
      if (performance.now() - lastDragEndAt.current < 80) return;
      if (openingRef.current) return;
      openItemFromElement(e.currentTarget);
    },
    [openItemFromElement]
  );

  const onTilePointerUp = useCallback(
    (e: React.PointerEvent<HTMLElement>) => {
      if (e.pointerType !== 'touch') return;
      if (draggingRef.current) return;
      if (movedRef.current) return;
      if (performance.now() - lastDragEndAt.current < 80) return;
      if (openingRef.current) return;
      openItemFromElement(e.currentTarget);
    },
    [openItemFromElement]
  );

  useEffect(() => {
    return () => {
      if (typeof document !== 'undefined') {
        document.body.classList.remove('dg-scroll-lock');
      }
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className={`sphere-root${className ? ` ${className}` : ''}`}
      style={{
        ...({
          ['--segments-x']: segments,
          ['--segments-y']: segments,
          ['--overlay-blur-color']: overlayBlurColor,
          ['--tile-radius']: imageBorderRadius,
          ['--enlarge-radius']: openedImageBorderRadius,
          ['--image-filter']: grayscale ? 'grayscale(1)' : 'none',
        } as React.CSSProperties),
        ...style,
      }}
    >
      <main ref={mainRef} className="sphere-main">
        <div className="stage">
          <div ref={sphereRef} className="sphere">
            {items.map((it, i) => (
              <div
                key={`${it.x},${it.y},${i}`}
                className="item"
                data-src={it.src}
                data-title={it.title || ''}
                data-category={it.category || ''}
                data-offset-x={it.x}
                data-offset-y={it.y}
                data-size-x={it.sizeX}
                data-size-y={it.sizeY}
                style={
                  {
                    ['--offset-x']: it.x,
                    ['--offset-y']: it.y,
                    ['--item-size-x']: it.sizeX,
                    ['--item-size-y']: it.sizeY,
                  } as React.CSSProperties
                }
              >
                <div
                  className="item__image"
                  role="button"
                  tabIndex={0}
                  aria-label={it.title || it.alt || 'Open project image'}
                  onClick={onTileClick}
                  onPointerUp={onTilePointerUp}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={it.src}
                    draggable={false}
                    alt={it.alt}
                    onError={(e) => {
                      if (e.currentTarget.src !== DOME_FALLBACK_SVG) {
                        e.currentTarget.src = DOME_FALLBACK_SVG;
                      }
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overlay" />
        <div className="overlay overlay--blur" />
        <div className="edge-fade edge-fade--top" />
        <div className="edge-fade edge-fade--bottom" />

        <div className="viewer" ref={viewerRef}>
          <div ref={scrimRef} className="scrim" />
          <div ref={frameRef} className="frame" />
        </div>
      </main>
    </div>
  );
}

export default DomeGallery;
