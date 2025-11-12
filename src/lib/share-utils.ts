/**
 * Sharing utilities for Web Share API and clipboard copying
 */

export interface ShareData {
  title: string
  text: string
  url: string
}

/**
 * Share content using the Web Share API if available, otherwise fallback to copy to clipboard
 * @param data - Share data (title, text, url)
 * @returns Promise that resolves when sharing is complete
 */
export async function share(data: ShareData): Promise<boolean> {
  try {
    if (navigator.share) {
      await navigator.share(data)
      return true
    } else {
      // Fallback to copy URL to clipboard
      await copyToClipboard(data.url)
      return true
    }
  } catch (error) {
    // User cancelled or error occurred
    console.error('Error sharing:', error)
    return false
  }
}

/**
 * Copy text to clipboard
 * @param text - Text to copy
 * @returns Promise that resolves when copy is complete
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    } else {
      // Fallback for older browsers
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'fixed'
      textArea.style.left = '-999999px'
      textArea.style.top = '-999999px'
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      const successful = document.execCommand('copy')
      document.body.removeChild(textArea)
      return successful
    }
  } catch (error) {
    console.error('Error copying to clipboard:', error)
    return false
  }
}

/**
 * Generate Twitter share URL
 * @param text - Tweet text
 * @param url - URL to share
 * @returns Twitter share URL
 */
export function getTwitterShareUrl(text: string, url: string): string {
  const params = new URLSearchParams({
    text,
    url
  })
  return `https://twitter.com/intent/tweet?${params.toString()}`
}

/**
 * Generate LinkedIn share URL
 * @param url - URL to share
 * @returns LinkedIn share URL
 */
export function getLinkedInShareUrl(url: string): string {
  const params = new URLSearchParams({
    url
  })
  return `https://www.linkedin.com/sharing/share-offsite/?${params.toString()}`
}

/**
 * Generate Facebook share URL
 * @param url - URL to share
 * @returns Facebook share URL
 */
export function getFacebookShareUrl(url: string): string {
  const params = new URLSearchParams({
    u: url
  })
  return `https://www.facebook.com/sharer/sharer.php?${params.toString()}`
}
