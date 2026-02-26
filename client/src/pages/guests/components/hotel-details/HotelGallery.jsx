import React, { useState, useMemo } from 'react';
import { ChevronLeft, ChevronRight, X, Grid, Waves } from 'lucide-react';
import { useHotelDetail } from './HotelDetailsContext';

const HotelGallery = () => {

  const { photos } = useHotelDetail();

  // Convert DB photos → ordered URL list (primary first)
  const images = useMemo(() => {
    if (!photos || !photos.length) return [];
    return [...photos]
      .sort((a, b) => (b.is_primary ? 1 : 0) - (a.is_primary ? 1 : 0))
      .map(p => p.photo_url);
  }, [photos]);

  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index) => {
    setCurrentIndex(index);
    setIsOpen(true);
  };

  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % images.length);

  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  const imageCount = images.length;

  // Loading / empty state
  if (!imageCount) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="h-[550px] bg-slate-50/50 rounded-[2.5rem] animate-pulse flex flex-col items-center justify-center text-slate-400 font-medium border border-blue-50">
          <Waves className="w-8 h-8 mb-4 animate-bounce text-blue-200" />
          Capturing coastal views...
        </div>
      </div>
    );
  }

  return (
    <div
      className="max-w-7xl mx-auto px-6 py-10"
      style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
    >

      {/* Grid Layout */}
      <div
        className={`relative grid gap-4 h-[350px] md:h-[550px] ${
          imageCount >= 5
            ? 'md:grid-cols-4'
            : imageCount === 3
            ? 'md:grid-cols-3'
            : imageCount === 2
            ? 'md:grid-cols-2'
            : 'grid-cols-1'
        }`}
      >

        {/* Main Feature Image */}
        <div
          className={`relative group overflow-hidden rounded-[2.5rem] cursor-zoom-in border border-blue-50 shadow-sm transition-all duration-700 ${
            imageCount >= 3 ? 'md:col-span-2' : 'col-span-1'
          }`}
          onClick={() => openLightbox(0)}
        >
          <img
            src={images[0]}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
            alt="Primary hotel view"
          />
          <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-transparent transition-colors duration-700"></div>
        </div>

        {/* Secondary Images */}
        {imageCount > 1 && (
          <div
            className={`grid gap-4 ${
              imageCount >= 5
                ? 'grid-cols-2 md:col-span-2'
                : imageCount === 4
                ? 'grid-cols-1 md:col-span-2'
                : 'grid-cols-1'
            }`}
          >
            {images.slice(1, 5).map((img, idx) => (
              <div
                key={idx}
                className="relative group overflow-hidden rounded-[1.8rem] cursor-zoom-in border border-blue-50"
                onClick={() => openLightbox(idx + 1)}
              >
                <img
                  src={img}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={`Hotel view ${idx + 2}`}
                />
                <div className="absolute inset-0 bg-blue-900/5 group-hover:bg-transparent transition-colors duration-700"></div>
              </div>
            ))}
          </div>
        )}

        {/* View All Button */}
        {imageCount > 5 && (
          <button
            onClick={() => openLightbox(0)}
            className="absolute bottom-8 right-8 bg-white/80 backdrop-blur-xl border border-blue-100 px-6 py-3 rounded-full flex items-center gap-2.5 text-slate-900 font-[800] text-[11px] tracking-[0.2em] uppercase shadow-xl hover:bg-white hover:-translate-y-1 transition-all z-20"
          >
            <Grid size={16} className="text-blue-600" />
            {imageCount} Perspectives
          </button>
        )}
      </div>

      {/* Lightbox */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/98 backdrop-blur-2xl animate-in fade-in duration-500">

          <button
            onClick={() => setIsOpen(false)}
            className="absolute top-10 right-10 p-4 rounded-full bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-colors z-[110]"
          >
            <X size={24} />
          </button>

          <div className="absolute inset-x-12 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none z-[110]">
            <button onClick={prevImage} className="p-5 rounded-full bg-white shadow-2xl text-slate-900 pointer-events-auto hover:bg-blue-50 hover:scale-110 transition-all duration-300">
              <ChevronLeft size={28} />
            </button>
            <button onClick={nextImage} className="p-5 rounded-full bg-white shadow-2xl text-slate-900 pointer-events-auto hover:bg-blue-50 hover:scale-110 transition-all duration-300">
              <ChevronRight size={28} />
            </button>
          </div>

          <div className="max-w-5xl max-h-[80vh] px-6 animate-in zoom-in-95 duration-700">
            <img
              src={images[currentIndex]}
              className="w-full h-full object-contain rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,0.4)] border-2 border-white/10"
              alt="Gallery view"
            />

            <div className="mt-8 flex justify-center">
              <p className="bg-white/5 border border-white/10 px-5 py-2 rounded-full text-blue-300/80 font-bold tracking-[0.4em] uppercase text-[10px]">
                {currentIndex + 1} / {images.length}
              </p>
            </div>
          </div>

        </div>
      )}

    </div>
  );
};

export default HotelGallery;