import {
  format,
  formatDistanceToNow as _formatDistanceToNow,
} from 'date-fns';
import { fr } from 'date-fns/locale';

const OPTIONS = { locale: fr };

export function formatDate(timestamp) {
  return format(timestamp, "EEEE do MMMM, H'h'mm", OPTIONS);
}

export function formatDistanceToNow(timestamp) {
  return _formatDistanceToNow(timestamp, OPTIONS);
}
