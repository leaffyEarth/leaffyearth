import Image from "next/image"
import Link from "next/link"

export function Logo() {
  return (
    <Link href="/dashboard" className="flex items-center">
      <Image
        src="/logo.svg"
        alt="LeaffyEarth Logo"
        width={32}
        height={32}
        className="h-8 w-auto"
      />
    </Link>
  )
} 