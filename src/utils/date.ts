import {
  formatDistanceToNow as _formatDistanceToNow,
  format,
} from 'date-fns';
import { fr } from 'date-fns/locale';

const OPTIONS = { locale: fr };

export function formatDate(timestamp: number) {
  return format(timestamp, "EEEE do MMMM, H'h'mm", OPTIONS);
}

export function formatDistanceToNow(timestamp: number) {
  return _formatDistanceToNow(timestamp, OPTIONS);
}
