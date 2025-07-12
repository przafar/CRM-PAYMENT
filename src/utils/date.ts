import { format } from 'date-fns'
/**
 * @param date
 * @param pattern
 */
export function formatDate(date: string, pattern = 'dd-MM-yyyy'): string {
  return format(new Date(date), pattern)
}