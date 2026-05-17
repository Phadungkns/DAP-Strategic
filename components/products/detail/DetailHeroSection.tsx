'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { X, Maximize2 } from 'lucide-react';
import type { ProductHeroSection } from '@/types';

interface DetailHeroSectionProps {
  section: ProductHeroSection;
  productTitle: string;
  productImageUrl?: string;
}

/* ── แปลง URL เป็น embed URL สำหรับ autoplay ── */
function getEmbedUrls(url: string): { inline: string; fullscreen: string } | null {
  try {
    const parsed = new URL(url);

    // YouTube
    if (parsed.hostname.includes('youtube.com') || parsed.hostname.includes('youtu.be')) {
      let videoId = '';
      if (parsed.hostname.includes('youtu.be')) {
        videoId = parsed.pathname.slice(1);
      } else {
        videoId = parsed.searchParams.get('v') || parsed.pathname.split('/').pop() || '';
      }
      const base = `https://www.youtube.com/embed/${videoId}`;
      return {
        inline: `${base}?autoplay=1&mute=1&rel=0&modestbranding=1&controls=1&loop=1&playlist=${videoId}`,
        fullscreen: `${base}?autoplay=1&rel=0&modestbranding=1`,
      };
    }

    // Vimeo
    if (parsed.hostname.includes('vimeo.com')) {
      const videoId = parsed.pathname.split('/').pop();
      return {
        inline: `https://player.vimeo.com/video/${videoId}?autoplay=1&muted=1&loop=1`,
        fullscreen: `https://player.vimeo.com/video/${videoId}?autoplay=1`,
      };
    }

    // direct mp4 / webm
    return { inline: url, fullscreen: url };
  } catch {
    return null;
  }
}

export default function DetailHeroSection({
  section,
  productTitle,
  productImageUrl,
}: DetailHeroSectionProps) {
  const [showVideo, setShowVideo] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);

  const hasVideo = !!section.videoPreview;
  const hasThumbnail = !!section.thumbnailUrl;
  const hasProductImage = !!productImageUrl;

  // รูปภาพ = thumbnail จาก section ก่อน ถ้าไม่มีใช้ product cover image
  const imageUrl = hasThumbnail ? section.thumbnailUrl! : (hasProductImage ? productImageUrl! : null);
  const hasImage = !!imageUrl;

  const embedUrls = hasVideo ? getEmbedUrls(section.videoPreview!) : null;
  const isDirectVideo =
    embedUrls?.inline === section.videoPreview &&
    !!(section.videoPreview?.match(/\.(mp4|webm|ogg)(\?|$)/));

  // กรณีมีทั้ง 2 = แสดงแยก 2 ช่อง  /  มีแค่อย่างเดียว = แสดงเต็มความกว้าง
  const hasBoth = hasVideo && hasImage;

  return (
    <>
      <section className="relative pb-20 bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950 text-white overflow-hidden">
        {/* Ambient glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">

          {/* ── Text row ── */}
          <div className="pt-8 pb-10 text-center lg:text-left max-w-3xl">
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4 leading-[1.15]">
              {productTitle}
            </h1>
            {section.subheading && (
              <p className="text-lg md:text-xl text-blue-200/70 leading-relaxed whitespace-pre-line">
                {section.subheading}
              </p>
            )}
          </div>

          {/* ── Media row ── */}
          {(hasVideo || hasImage) && (
            <div className={`grid gap-5 ${hasBoth ? 'lg:grid-cols-2' : 'grid-cols-1 max-w-2xl mx-auto'}`}>

              {/* Panel 1: Image (แสดงถ้ามีรูป) */}
              {hasImage && (
                <div className="relative rounded-2xl overflow-hidden bg-gray-900 aspect-video">
                  <Image
                    src={imageUrl!}
                    alt={productTitle}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    priority
                  />
                  {hasBoth && (
                    <div className="absolute bottom-2 left-3 text-xs text-white/50 font-medium tracking-wide">
                      ภาพปก
                    </div>
                  )}
                </div>
              )}

              {/* Panel 2: Video (แสดงถ้ามี video) */}
              {hasVideo && embedUrls && (
                <div className="relative rounded-2xl overflow-hidden bg-black aspect-video group">

                  {/* Inline player (autoplay + muted) */}
                  {showVideo ? (
                    isDirectVideo ? (
                      <video
                        src={embedUrls.inline}
                        autoPlay
                        muted
                        loop
                        playsInline
                        controls
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <iframe
                        src={embedUrls.inline}
                        title={productTitle}
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                        className="w-full h-full border-0"
                      />
                    )
                  ) : (
                    /* Thumbnail fallback เมื่อกด close */
                    <button
                      onClick={() => setShowVideo(true)}
                      className="absolute inset-0 w-full h-full flex items-center justify-center bg-gray-900 group/play"
                    >
                      {imageUrl && (
                        <Image src={imageUrl} alt="video thumbnail" fill className="object-cover opacity-40" />
                      )}
                      <div className="relative z-10 w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-xl group-hover/play:scale-110 transition-transform">
                        <svg className="w-6 h-6 text-blue-900 ml-1" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </button>
                  )}

                  {/* Controls: ปิด + ขยาย */}
                  {showVideo && (
                    <div className="absolute top-2 right-2 flex gap-1.5 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => setIsExpanded(true)}
                        className="w-8 h-8 rounded-lg bg-black/60 hover:bg-black/90 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-colors"
                        title="ขยายเต็มจอ"
                      >
                        <Maximize2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setShowVideo(false)}
                        className="w-8 h-8 rounded-lg bg-black/60 hover:bg-black/90 backdrop-blur-sm flex items-center justify-center text-white/80 hover:text-white transition-colors"
                        title="ปิดวิดีโอ"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {hasBoth && (
                    <div className="absolute bottom-2 left-3 text-xs text-white/50 font-medium tracking-wide z-10 pointer-events-none">
                      วิดีโอตัวอย่าง
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* ── Fullscreen Modal ── */}
      {isExpanded && embedUrls && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={() => setIsExpanded(false)}
        >
          <div
            className="relative w-full max-w-5xl aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {isDirectVideo ? (
              <video src={embedUrls.fullscreen} autoPlay controls className="w-full h-full" />
            ) : (
              <iframe
                src={embedUrls.fullscreen}
                title={productTitle}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            )}
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 hover:bg-black/90 flex items-center justify-center text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </>
  );
}
