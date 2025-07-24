"use client"

import type React from "react"

import { useState, useEffect, useRef, useCallback } from "react"
import { RefreshCw } from "lucide-react"
import { useRouter } from 'next/navigation'

interface PullToRefreshProps {
  children: React.ReactNode
  threshold?: number
  resistance?: number
}

export function PullToRefresh({ children, threshold = 80, resistance = 2.5 }: PullToRefreshProps) {
  const router = useRouter()
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [canRefresh, setCanRefresh] = useState(false)
  const startY = useRef(0)
  const currentY = useRef(0)
  const isDragging = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const handleRefresh = useCallback(async () => {
    router.refresh()
  }, [router])

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (window.scrollY === 0) {
      startY.current = e.touches[0].clientY
      isDragging.current = true
    }
  }, [])

  const handleTouchMove = useCallback(
    (e: TouchEvent) => {
      if (!isDragging.current || isRefreshing) return

      currentY.current = e.touches[0].clientY
      const distance = currentY.current - startY.current

      if (distance > 0 && window.scrollY === 0) {
        e.preventDefault()
        const adjustedDistance = distance / resistance
        setPullDistance(adjustedDistance)
        setCanRefresh(adjustedDistance >= threshold)
      }
    },
    [threshold, resistance, isRefreshing],
  )

  const handleTouchEnd = useCallback(async () => {
    if (!isDragging.current) return

    isDragging.current = false

    if (canRefresh && !isRefreshing) {
      setIsRefreshing(true)
      try {
        await handleRefresh()
      } catch (error) {
        console.error("Refresh failed:", error)
      } finally {
        setIsRefreshing(false)
        setPullDistance(0)
        setCanRefresh(false)
      }
    } else {
      setPullDistance(0)
      setCanRefresh(false)
    }
  }, [canRefresh, isRefreshing, handleRefresh])

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    container.addEventListener("touchstart", handleTouchStart, { passive: false })
    container.addEventListener("touchmove", handleTouchMove, { passive: false })
    container.addEventListener("touchend", handleTouchEnd)

    return () => {
      container.removeEventListener("touchstart", handleTouchStart)
      container.removeEventListener("touchmove", handleTouchMove)
      container.removeEventListener("touchend", handleTouchEnd)
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd])

  const refreshIndicatorStyle = {
    transform: `translateY(${Math.min(pullDistance, threshold + 20)}px)`,
    opacity: Math.min(pullDistance / threshold, 1),
  }

  const contentStyle = {
    transform: `translateY(${Math.min(pullDistance, threshold + 20)}px)`,
    transition: isDragging.current ? "none" : "transform 0.3s ease-out",
  }

  return (
    <div ref={containerRef} className="relative overflow-hidden">
      {/* Pull to Refresh Indicator */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-center py-4 z-10"
        style={refreshIndicatorStyle}
      >
        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
          <RefreshCw
            className={`h-5 w-5 ${isRefreshing || canRefresh ? "animate-spin" : ""} ${
              canRefresh ? "text-blue-600 dark:text-blue-400" : ""
            }`}
          />
          <span className="text-sm font-medium">
            {isRefreshing ? "Refreshing..." : canRefresh ? "Release to refresh" : "Pull to refresh"}
          </span>
        </div>
      </div>

      {/* Content */}
      <div style={contentStyle}>{children}</div>
    </div>
  )
}