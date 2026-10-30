import React, { useEffect, useRef } from 'react';

/**
 * Scroll-locked Background Video Integration
 * Plays smoothly while the user is actively scrolling, and pauses immediately (150ms)
 * when scrolling halts to conserve CPU and GPU cycles while keeping perfect narrative sync.
 */
export default function BackgroundVideo() {
  const videoRef = useRef(null);
  const scrollTimeoutRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Start in paused state
    video.pause();

    const handleScroll = () => {
      // If paused, resume playing smoothly on scroll
      if (video.paused) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Auto-play was prevented or interrupted, silence error
          });
        }
      }

      // Reset idle timer
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }

      // Pause 150ms after scroll stops
      scrollTimeoutRef.current = setTimeout(() => {
        if (!video.paused) {
          video.pause();
        }
      }, 150);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="fixed inset-0 w-screen h-screen z-0 pointer-events-none overflow-hidden select-none">
      {/* Video Element */}
      <video
        ref={videoRef}
        src="/video.mp4"
        muted
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-cover scale-105 transform motion-safe:transition-transform duration-700"
      />

      {/* Multi-stop rich organic botanical gradient overlay for flawless WCAG contrast */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-[#021711]/75 via-[#03231a]/55 to-[#01140e]/85 backdrop-contrast-[1.08] backdrop-brightness-95" />
      
      {/* Subtle radial vignette to focus attention towards the center field ledger */}
      <div className="absolute inset-0 z-[2] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#02150f]/20 to-[#01100b]/80" />
    </div>
  );
}
