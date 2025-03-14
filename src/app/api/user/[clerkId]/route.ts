import db from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

type ParamsType = {
  params: Promise<{
    clerkId: string;
  }>;
};

export async function GET(_req: NextRequest, { params }: ParamsType) {
  const { clerkId } = await params;

  const fetchedUsers = await db
    .select()
    .from(users)
    .where(eq(users.clerkId, clerkId));

  const currentUser = fetchedUsers[0];

  return NextResponse.json(currentUser);
}
