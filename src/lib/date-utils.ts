/**
 * Date formatting utilities for consistent date display across the application
 */

/**
 * Format a date string to a localized date format
 * @param dateString - ISO date string or Date object
 * @param options - Intl.DateTimeFormat options
 * @returns Formatted date string
 */
export function formatDate(
  dateString: string | Date,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }
): string {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString
  return new Intl.DateTimeFormat('en-US', options).format(date)
}

/**
 * Format a date string to a full date and time format
 * @param dateString - ISO date string or Date object
 * @returns Formatted date and time string
 */
export function formatDateTime(dateString: string | Date): string {
  return formatDate(dateString, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

/**
 * Format a date string to a short date format (e.g., "Jan 1, 2024")
 * @param dateString - ISO date string or Date object
 * @returns Formatted short date string
 */
export function formatShortDate(dateString: string | Date): string {
  return formatDate(dateString, {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

/**
 * Get relative time string (e.g., "Posted 2 days ago", "Posted today")
 * @param dateString - ISO date string or Date object
 * @returns Relative time string
 */
export function getRelativeTime(dateString: string | Date): string {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString
  const now = new Date()
  const diffTime = Math.abs(now.getTime() - date.getTime())
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return 'Posted today'
  if (diffDays === 1) return 'Posted yesterday'
  if (diffDays < 7) return `Posted ${diffDays} days ago`
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7)
    return `Posted ${weeks} week${weeks > 1 ? 's' : ''} ago`
  }
  if (diffDays < 365) {
    const months = Math.floor(diffDays / 30)
    return `Posted ${months} month${months > 1 ? 's' : ''} ago`
  }
  const years = Math.floor(diffDays / 365)
  return `Posted ${years} year${years > 1 ? 's' : ''} ago`
}

/**
 * Check if a date is in the past
 * @param dateString - ISO date string or Date object
 * @returns true if the date is in the past
 */
export function isPast(dateString: string | Date): boolean {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString
  return date < new Date()
}

/**
 * Check if a date is in the future
 * @param dateString - ISO date string or Date object
 * @returns true if the date is in the future
 */
export function isFuture(dateString: string | Date): boolean {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString
  return date > new Date()
}

/**
 * Get time until an event (e.g., "In 3 days", "In 2 hours")
 * @param dateString - ISO date string or Date object
 * @returns Time until string
 */
export function getTimeUntil(dateString: string | Date): string {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString
  const now = new Date()
  const diffTime = date.getTime() - now.getTime()

  if (diffTime < 0) return 'Event has passed'

  const diffMinutes = Math.floor(diffTime / (1000 * 60))
  const diffHours = Math.floor(diffTime / (1000 * 60 * 60))
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

  if (diffMinutes < 60) return `In ${diffMinutes} minute${diffMinutes !== 1 ? 's' : ''}`
  if (diffHours < 24) return `In ${diffHours} hour${diffHours !== 1 ? 's' : ''}`
  if (diffDays < 7) return `In ${diffDays} day${diffDays !== 1 ? 's' : ''}`

  const diffWeeks = Math.floor(diffDays / 7)
  return `In ${diffWeeks} week${diffWeeks !== 1 ? 's' : ''}`
}
