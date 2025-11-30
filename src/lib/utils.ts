import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatReviewDate(dateString) {
    if (!dateString) return "Just now";

    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();

    const diffMin = Math.floor(diffMs / (1000 * 60));
    const diffHour = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDay = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffMin < 1) return "Just now";
    if (diffMin < 60) return `${diffMin} min${diffMin > 1 && "s"} ago`;
    if (diffHour < 24) return `${diffHour} hour${diffHour > 1 && "s"} ago`;
    if (diffDay < 5) return `${diffDay} day${diffDay > 1 && "s"} ago`;

    return date.toLocaleDateString();
}