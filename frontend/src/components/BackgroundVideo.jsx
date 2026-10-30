import React, { useEffect, useRef } from 'react';

/**
 * Bidirectional Scroll-Scrubbed Background Video
 * - Scroll DOWN: Video scrubs FORWARD.
 * - Scroll UP: Video scrubs BACKWARD.
 * - Idle / Stop scrolling: Video halts immediately (zero movement, zero wasted cycles).
 */
export default function BackgroundVideo() {
  const videoRef = useRef(null);
  const targetTimeRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Ensure video is initially paused
    video.pause();

    const computeTargetTime = () => {
      if (!video || !video.duration || isNaN(video.duration)) return;
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const scrollRatio = Math.min(Math.max(window.scrollY / maxScroll, 0), 1);
      targetTimeRef.current = scrollRatio * video.duration;
    };

    // Listen for scroll events (down advances forward, up reverses backward)
    const handleScroll = () => {
      computeTargetTime();
    };

    // Track mouse wheel delta for tactile wheel scrubbing
    const handleWheel = (e) => {
      if (!video || !video.duration || isNaN(video.duration)) return;
      // e.deltaY > 0 -> scroll down -> forward
      // e.deltaY < 0 -> scroll up -> backward
      const deltaSeconds = (e.deltaY / 1000) * 0.35;
      targetTimeRef.current = Math.min(
        Math.max(targetTimeRef.current + deltaSeconds, 0),
        video.duration
      );
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('touchmove', handleScroll, { passive: true });
    video.addEventListener('loadedmetadata', computeTargetTime);

    // Initial computation once metadata is ready
    if (video.readyState >= 1) {
      computeTargetTime();
    }

    // Smooth 60fps bidirectional animation loop
    const scrubLoop = () => {
      if (video && video.duration && !isNaN(video.duration) && !video.seeking) {
        const diff = targetTimeRef.current - video.currentTime;
        if (Math.abs(diff) > 0.015) {
          // Smooth spring interpolation forward or backward
          video.currentTime += diff * 0.32;
        }
      }
      rafRef.current = requestAnimationFrame(scrubLoop);
    };

    rafRef.current = requestAnimationFrame(scrubLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchmove', handleScroll);
      video.removeEventListener('loadedmetadata', computeTargetTime);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none overflow-hidden select-none">
      {/* Background Video Element - Bidirectional Scroll Scrubbing */}
      <video
        ref={videoRef}
        src="/video.mp4"
        muted
        playsInline
        preload="auto"
        className="w-full h-full object-cover scale-102"
      />

      {/* Crystal Clear Scrim - lets the vibrant agricultural terraces shine through with sharp details */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-black/25 via-transparent to-black/35" />
      
      {/* Subtle organic warmth vignette */}
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-black/10 via-transparent to-black/40" />
    </div>
  );
}
