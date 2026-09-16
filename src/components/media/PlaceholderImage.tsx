"use client";

import Image from "next/image";
import { cn } from "@/lib/cn";

type PlaceholderImageProps = {
  src: string;
  alt: string;
  /** TODO caption describing the intended production photograph */
  caption: string;
  width?: number;
  height?: number;
  fill?: boolean;
  className?: string;
  sizes?: string;
  priority?: boolean;
  radius?: string;
};

export function PlaceholderImage({
  src,
  alt,
  caption,
  width,
  height,
  fill,
  className,
  sizes,
  priority,
}: PlaceholderImageProps) {
  return (
    <div
      className={cn("relative overflow-hidden bg-surface", fill && "absolute inset-0", className)}
      title={caption}
    >
      {fill ? (
        <Image
          src={src}
          alt={alt}
          fill
          sizes={sizes ?? "100vw"}
          className="object-cover"
          priority={priority}
        />
      ) : (
        <Image
          src={src}
          alt={alt}
          width={width ?? 800}
          height={height ?? 260}
          sizes={sizes}
          className="h-full w-full object-cover"
          priority={priority}
        />
      )}
      <span className="sr-only">{caption}</span>
    </div>
  );
}
