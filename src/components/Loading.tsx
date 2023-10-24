"use client"

import { Image } from "@nextui-org/react"

export default function Loading() {
  return (
    <div className="absolute z-50 top-0 left-0 w-screen h-screen flex items-center justify-center">
      <Image alt="DHG Medical Centers Web Site" src="/loadingImage.gif" className="h-1/2" />
    </div>
  )
}