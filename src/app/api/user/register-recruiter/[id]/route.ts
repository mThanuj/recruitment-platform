import { NextResponse, NextRequest } from "next/server";
import db from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

type ParamsProp = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(req: NextRequest, { params }: ParamsProp) {
  try {
    const { id } = await params;
    const { company, phone, signature } = await req.json();

    if (!company || !phone || !signature) {
      return NextResponse.json(
        { error: "Please fill all the fields" },
        { status: 400 },
      );
    }

    const response = await db
      .update(users)
      .set({
        companyName: company,
        phone,
        signature,
        role: "recruiter",
      })
      .where(eq(users.id, id))
      .returning();

    if (response.length === 0) {
      return NextResponse.json({
        message: "User not found",
        status: 404,
      });
    }

    return NextResponse.json({
      message: "Recruiter registered successfully",
      status: 200,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error registering recruiter" },
      { status: 500 },
    );
  }
}
