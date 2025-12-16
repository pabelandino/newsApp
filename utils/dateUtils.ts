/** Based on the wireframe I noticed that for recent dates shows something
 that doesn't come with the endpoint results so:

 * Converts a date string to a relative time format:
 * - "2h" if less than 24 hours ago
 * - "yesterday" if yesterday
 * - Full date format "2 jun 2025" if older
 */
export function formatRelativeDate(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInHours = diffInMs / (1000 * 60 * 60);
    const diffInDays = diffInHours / 24;

    // Less than 24 hours ago
    if (diffInHours < 24) {
        const hours = Math.floor(diffInHours);
        if (hours === 0) {
            const minutes = Math.floor(diffInMs / (1000 * 60));
            return minutes <= 1 ? '1m' : `${minutes}m`;
        }
        return `${hours}h`;
    }

    // Check if it's yesterday (between 24 and 48 hours ago, and same day yesterday)
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    const isYesterday =
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear();

    if (isYesterday && diffInDays < 2) {
        return 'yesterday';
    }

    // Older than yesterday - return formatted date
    const months = [
        'jan',
        'feb',
        'mar',
        'apr',
        'may',
        'jun',
        'jul',
        'aug',
        'sep',
        'oct',
        'nov',
        'dec',
    ];

    const day = date.getDate();
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
}

