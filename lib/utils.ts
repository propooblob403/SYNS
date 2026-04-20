export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: value >= 1000 ? 0 : 2
  }).format(value);
}

export function formatCompactCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1
  }).format(value);
}

export function formatPercentFromPrice(price: number) {
  return `${Math.round(price * 100)}%`;
}

export function formatCents(price: number) {
  return `${Math.round(price * 100)}c`;
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short"
  }).format(new Date(date));
}

export function timeFromNow(date: string) {
  const target = new Date(date).getTime();
  const now = Date.now();
  const diff = target - now;
  const abs = Math.abs(diff);
  const days = Math.floor(abs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((abs / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((abs / (1000 * 60)) % 60);

  if (days > 0) {
    return diff >= 0 ? `${days}d ${hours}h left` : `${days}d ago`;
  }

  if (hours > 0) {
    return diff >= 0 ? `${hours}h ${minutes}m left` : `${hours}h ago`;
  }

  return diff >= 0 ? `${minutes}m left` : `${minutes}m ago`;
}
