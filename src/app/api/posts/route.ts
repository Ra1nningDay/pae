/**
 *  api/posts/route.ts
 *  Handles all post-related API requests
 *
 */

/**
 * @param Get - Fetches posts based on search query or returns all posts
 * @param Post - Creates a new post with title, content, contact info, tags, and author details
 *
 */

import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  let q = searchParams.get("tag");
  if (q) q = q.trim();

  let posts;
  if (q && q.length > 0) {
    if (q.startsWith("#")) {
      const tagName = q.slice(1);
      posts = await prisma.post.findMany({
        where: {
          AND: [
            {
              OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
            },
            {
              tags: {
                some: {
                  name: { equals: tagName, mode: "insensitive" },
                },
              },
            },
          ],
        },
        include: { tags: true },
        orderBy: { createdAt: "desc" },
      });
    } else {
      posts = await prisma.post.findMany({
        where: {
          AND: [
            {
              OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
            },
            {
              title: { contains: q, mode: "insensitive" },
            },
          ],
        },
        include: { tags: true },
        orderBy: { createdAt: "desc" },
      });
    }
  } else {
    posts = await prisma.post.findMany({
      where: {
        OR: [{ expiresAt: null }, { expiresAt: { gt: new Date() } }],
      },
      include: { tags: true },
      orderBy: { createdAt: "desc" },
    });
  }
  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, content, contactInfo, tags, authorName, authorIpaddress } =
    body;
  if (!title || !content || !tags || !authorName) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Calculate expiration time (24 hours from now)
  const expiresAt = new Date();
  expiresAt.setHours(expiresAt.getHours() + 24);

  // Split tags and upsert
  const tagArr = tags
    .split(",")
    .map((t: string) => t.trim())
    .filter(Boolean);
  const tagRecords = await Promise.all(
    tagArr.map(async (tag: string) =>
      prisma.tag.upsert({
        where: { name: tag },
        update: {},
        create: { name: tag },
      })
    )
  );
  const post = await prisma.post.create({
    data: {
      title,
      content,
      contactInfo,
      authorName,
      author_ipaddress: authorIpaddress || "",
      expiresAt,
      tags: {
        connect: tagRecords.map((t) => ({ id: t.id })),
      },
    },
    include: { tags: true },
  });
  return NextResponse.json(post, { status: 201 });
}
