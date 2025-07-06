'use client'

import { useState } from 'react'
import type { ReactNode } from 'react'

interface ExpandableTextProps {
  /**
   * The short preview shown before the user expands the text.
   */
  preview?: ReactNode
  /**
   * The full content to reveal once the user clicks "More".
   */
  children: ReactNode
  /**
   * Text or JSX shown when the content is collapsed (defaults to "More").
   */
  moreLabel?: ReactNode
  /**
   * Text or JSX shown when the content is expanded (defaults to "Less").
   */
  lessLabel?: ReactNode
}

export function ExpandableText({ preview, children, moreLabel = 'More', lessLabel = 'Less' }: ExpandableTextProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <p className="mb-4">
      {expanded ? children : preview ?? null}
      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setExpanded(!expanded)}
      >
        {expanded ? lessLabel : moreLabel}
      </button>
    </p>
  )
} 