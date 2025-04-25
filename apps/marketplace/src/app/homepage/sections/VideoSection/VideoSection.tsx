"use client"

import { useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

interface VideoSectionProps {
  thumbnailUrl?: string;
  videoUrl?: string;
}

export default function VideoSection({ 
  thumbnailUrl = "/video-thumbnail.jpg",
  videoUrl = "https://www.youtube.com/watch?v=your-video-id"
}: VideoSectionProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="w-screen relative -mx-[calc((100vw-100%)/2)]">
      <div className="relative aspect-[21/7] w-full bg-black">
        {!isPlaying ? (
          <>
            {/* Thumbnail */}
            <Image
              src={thumbnailUrl}
              alt="Video thumbnail"
              fill
              className="object-cover"
              priority
            />
            
            {/* Play Button */}
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute inset-0 flex items-center justify-center group"
              aria-label="Play video"
            >
              <div className="relative flex items-center justify-center w-24 h-24 rounded-full bg-black/30 
                             group-hover:bg-black/50 group-hover:scale-110 transition-all duration-300">
                <div className="absolute inset-0 bg-black/20 rounded-full animate-pulse opacity-50" />
                <Play className="w-12 h-12 text-white relative ml-1" />
              </div>
            </button>
          </>
        ) : (
          <div className="absolute inset-0">
            <ReactPlayer
              url={videoUrl}
              width="100%"
              height="100%"
              playing
              controls
              config={{
                youtube: {
                  playerVars: { showinfo: 1 }
                }
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
} 