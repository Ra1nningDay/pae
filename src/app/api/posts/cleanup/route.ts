/**
 * API route for cleaning up expired posts (older than 24 hours)
 * This endpoint can be called manually or by a cron job
 */

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function DELETE(_req: NextRequest) {
  try {
    // Delete posts where expiresAt is in the past
    const now = new Date();

    // First, find expired posts for logging
    const expiredPosts = await prisma.post.findMany({
      where: {
        expiresAt: {
          lte: now,
        },
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        expiresAt: true,
      },
    });

    // Delete expired posts
    const deleteResult = await prisma.post.deleteMany({
      where: {
        expiresAt: {
          lte: now,
        },
      },
    });

    console.log(`Deleted ${deleteResult.count} expired posts`);

    return NextResponse.json({
      success: true,
      deletedCount: deleteResult.count,
      deletedPosts: expiredPosts,
      cleanupTime: now.toISOString(),
    });
  } catch (error) {
    console.error("Error cleaning up expired posts:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to clean up expired posts",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

// GET method to check what posts are expired
export async function GET(_req: NextRequest) {
  try {
    const now = new Date();

    const expiredPosts = await prisma.post.findMany({
      where: {
        expiresAt: {
          lte: now,
        },
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        expiresAt: true,
        authorName: true,
      },
      orderBy: {
        expiresAt: "desc",
      },
    });

    return NextResponse.json({
      expiredPosts,
      count: expiredPosts.length,
      checkTime: now.toISOString(),
    });
  } catch (error) {
    console.error("Error checking expired posts:", error);
    return NextResponse.json(
      { error: "Failed to check expired posts" },
      { status: 500 }
    );
  }
}
