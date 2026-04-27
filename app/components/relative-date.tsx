'use client'

import { useEffect, useState } from 'react'

function getRelativeTime(date: string) {
  let now = new Date()
  if (!date.includes('T')) {
    date = `${date}T00:00:00`
  }
  let targetDate = new Date(date)

  let diffMs = now.getTime() - targetDate.getTime()
  let diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  let totalMonths =
    (now.getFullYear() - targetDate.getFullYear()) * 12 +
    (now.getMonth() - targetDate.getMonth())

  // Adjust if we haven't reached the same day in the current month
  if (now.getDate() < targetDate.getDate()) {
    totalMonths--
  }

  let years = Math.floor(totalMonths / 12)
  let months = totalMonths % 12

  if (years > 0 && months > 0) {
    return `${years}y ${months}mo ago`
  } else if (years > 0) {
    return `${years}y ago`
  } else if (months > 0) {
    return `${months}mo ago`
  } else if (diffDays > 0) {
    return `${diffDays}d ago`
  } else {
    return 'Today'
  }
}

export function RelativeDate({ date, fullDate }: { date: string; fullDate: string }) {
  let [relative, setRelative] = useState('')

  useEffect(() => {
    setRelative(getRelativeTime(date))
  }, [date])

  if (!relative) {
    return <>{fullDate}</>
  }

  return <>{fullDate} ({relative})</>
}
