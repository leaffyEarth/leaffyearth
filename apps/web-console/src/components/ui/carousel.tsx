import React from "react"
import useEmblaCarousel from "embla-carousel-react"
import type { EmblaOptionsType } from "embla-carousel"
import AutoPlay from "embla-carousel-autoplay"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface CarouselProps {
  options?: EmblaOptionsType
  className?: string
  images: string[]
}

export function Carousel({
  options = { loop: true },
  className,
  images,
}: CarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(options, [AutoPlay()])
  const [selectedIndex, setSelectedIndex] = React.useState(0)

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = React.useCallback(() => {
    if (!emblaApi) return
    setSelectedIndex(emblaApi.selectedScrollSnap())
  }, [emblaApi])

  React.useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on("select", onSelect)
  }, [emblaApi, onSelect])

  if (!images.length) return null

  return (
    <div className={cn("relative", className)}>
      <div className="overflow-hidden rounded-lg" ref={emblaRef}>
        <div className="flex">
          {images.map((image, index) => (
            <div
              className="relative flex-[0_0_100%] min-w-0"
              key={index}
            >
              <div className="relative pt-[100%]">
                <img
                  src={image}
                  alt={`Plant image ${index + 1}`}
                  className="absolute inset-0 w-full h-full object-contain bg-muted"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={cn(
              "h-2 w-2 rounded-full bg-white/50 transition-colors",
              index === selectedIndex && "bg-white"
            )}
            onClick={() => emblaApi?.scrollTo(index)}
          />
        ))}
      </div>

      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white"
        onClick={scrollNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
} 