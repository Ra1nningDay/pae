/**
 * Background cleanup utility
 * Automatically cleans up old posts when users visit the site
 */

export async function cleanupOldPosts(): Promise<void> {
  try {
    console.log("Running background cleanup...");

    const response = await fetch("/api/posts/cleanup", {
      method: "DELETE",
    });

    if (response.ok) {
      const result = await response.json();
      if (result.deletedCount > 0) {
        console.log(`Cleaned up ${result.deletedCount} old posts`);
      }
    }
  } catch (error) {
    console.error("Background cleanup failed:", error);
  }
}

// Run cleanup with a random delay to prevent all users from hitting the API at once
export function scheduleBackgroundCleanup(): void {
  // Random delay between 5-15 seconds
  const randomDelay = Math.random() * 10000 + 5000;

  setTimeout(() => {
    cleanupOldPosts();
  }, randomDelay);
}

export default cleanupOldPosts;
