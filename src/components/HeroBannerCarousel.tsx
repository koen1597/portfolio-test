import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from '../context/PortfolioContext';
import { HeroBannerItem } from '../types';
import { 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Pause, 
  Play, 
  Sparkles,
  ExternalLink,
  Layers
} from 'lucide-react';
import { SectionTransition, FadeIn } from './SectionTransition';

export const HeroBannerCarousel: React.FC = () => {
  const { data, t, openProjectDetail } = usePortfolio();
  const banners: HeroBannerItem[] = (data.heroBanners && data.heroBanners.length > 0)
    ? data.heroBanners
    : [];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState<number>(1);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const total = banners.length;

  const nextSlide = useCallback(() => {
    if (total === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (idx: number) => {
    if (idx === currentIndex || total === 0) return;
    setDirection(idx > currentIndex ? 1 : -1);
    setCurrentIndex(idx);
  };

  // Autoplay loop
  useEffect(() => {
    if (!isPlaying || isHovered || total <= 1) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      nextSlide();
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, isHovered, total, nextSlide]);

  // Touch swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const minSwipeDistance = 45;
    if (distance > minSwipeDistance) {
      nextSlide(); // swipe left -> next
    } else if (distance < -minSwipeDistance) {
      prevSlide(); // swipe right -> prev
    }
  };

  if (total === 0) return null;

  const activeBanner = banners[currentIndex] || banners[0];

  const handleCtaClick = () => {
    if (activeBanner.projectId) {
      openProjectDetail(activeBanner.projectId);
    } else if (activeBanner.externalUrl) {
      window.open(activeBanner.externalUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 50 : -50,
      opacity: 0,
      scale: 0.98
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -50 : 50,
      opacity: 0,
      scale: 0.98,
      transition: {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1]
      }
    })
  };

  return (
    <SectionTransition
      id="projects"
      className="pt-8 pb-14 sm:pt-10 sm:pb-16 relative overflow-hidden bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#F8FAFC] text-slate-900 border-b border-slate-200/90"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/3 w-[500px] h-[300px] bg-blue-100/60 rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-6xl mx-auto px-6 sm:px-8">
        
        {/* Carousel Container */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          className="relative bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden backdrop-blur-md"
        >
          {/* Subtle tech grid inside banner */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(15, 23, 42, 0.4) 1px, transparent 0)`,
              backgroundSize: '20px 20px'
            }}
          />

          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={activeBanner.id || currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="p-6 sm:p-10 lg:p-12 min-h-[360px] sm:min-h-[400px] flex flex-col justify-between"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                
                {/* Left: Text & Key Takeaway */}
                <div className="lg:col-span-7 space-y-4">
                  {/* Badge & Category */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <span className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 shadow-2xs">
                      <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                      <span>{activeBanner.badge || 'FEATURED CASE STUDY'}</span>
                    </span>
                    <span className="text-xs font-mono text-slate-300">·</span>
                    <span className="text-xs font-mono text-slate-500 font-medium">
                      {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <div className="space-y-1.5">
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 tracking-tight leading-snug">
                      {activeBanner.title}
                    </h3>
                    {activeBanner.subtitle?.trim() && (
                      <p className="text-sm sm:text-base text-blue-600 font-semibold leading-relaxed">
                        {activeBanner.subtitle}
                      </p>
                    )}
                  </div>

                  {/* Description */}
                  {activeBanner.description?.trim() && (
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl">
                      {activeBanner.description}
                    </p>
                  )}

                  {/* Tags */}
                  {activeBanner.tags && activeBanner.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-1">
                      {activeBanner.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="inline-flex items-center gap-1 text-xs font-mono font-medium text-slate-700 bg-slate-50 px-2.5 py-1 rounded-md border border-slate-200"
                        >
                          <Layers className="w-3 h-3 text-blue-600" />
                          <span>{tag}</span>
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: High-Res Image Preview Card */}
                <div className="lg:col-span-5 flex justify-center">
                  <div 
                    onClick={handleCtaClick}
                    className="group relative w-full max-w-md aspect-video sm:aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xl cursor-pointer ring-1 ring-blue-500/20 hover:ring-blue-500/60 transition-all hover:scale-[1.01]"
                  >
                    {activeBanner.imageUrl ? (
                      <img
                        src={activeBanner.imageUrl}
                        alt={activeBanner.title}
                        className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        loading="eager"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-slate-100 to-blue-50 flex flex-col items-center justify-center p-6 text-center">
                        <Sparkles className="w-10 h-10 text-blue-600 mb-2 opacity-60" />
                        <span className="text-xs font-mono text-slate-500">High Resolution Asset</span>
                      </div>
                    )}
                    
                    {/* Hover overlay hint */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-xs font-semibold text-white flex items-center gap-1.5 bg-blue-600 px-3 py-1 rounded-lg backdrop-blur-xs shadow-sm">
                        <span>{t('클릭하여 상세 보기', 'Click to inspect')}</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Footer Bar: Pagination & Controls */}
          <div className="px-6 sm:px-10 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs">
            
            {/* Dots */}
            <div className="flex items-center gap-2">
              {banners.map((b, idx) => (
                <button
                  key={b.id || idx}
                  onClick={() => goToSlide(idx)}
                  className={`transition-all duration-300 rounded-full h-2 cursor-pointer ${
                    idx === currentIndex
                      ? 'w-7 bg-blue-600 shadow-xs shadow-blue-500/40'
                      : 'w-2 bg-slate-300 hover:bg-slate-400'
                  }`}
                  title={`Slide ${idx + 1}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsPlaying(prev => !prev)}
                className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200 transition-colors cursor-pointer"
                title={isPlaying ? 'Pause Auto-play' : 'Play Auto-play'}
                aria-label={isPlaying ? 'Pause' : 'Play'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              </button>

              <button
                type="button"
                onClick={prevSlide}
                className="p-1.5 rounded-lg text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                title="Previous Slide"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={nextSlide}
                className="p-1.5 rounded-lg text-slate-700 hover:text-slate-900 bg-white hover:bg-slate-100 border border-slate-200 shadow-2xs transition-colors cursor-pointer"
                title="Next Slide"
                aria-label="Next slide"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

      </div>
    </SectionTransition>
  );
};
