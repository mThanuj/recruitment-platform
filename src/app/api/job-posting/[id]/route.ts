import db from "@/db";
import { jobPostings } from "@/db/schema";
import { NextRequest, NextResponse } from "next/server";

type ParamsProps = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(req: NextRequest, { params }: ParamsProps) {
  try {
    const { id } = await params;
    const body = await req.json();
    const {
      title,
      description,
      location,
      tags,
      requirements,
      deadline,
      employement_type: employmentType,
      salary_min: salaryMin,
      salary_max: salaryMax,
    } = body;

    console.log("title: ", title);
    console.log("description: ", description);
    console.log("location: ", location);
    console.log("tags: ", tags);
    console.log("requirements: ", requirements);
    console.log("deadline: ", deadline);
    console.log("employmentType: ", employmentType);
    console.log("salaryMin: ", salaryMin);
    console.log("salaryMax: ", salaryMax);

    if (
      !title ||
      !description ||
      !location ||
      !tags ||
      !requirements ||
      !deadline ||
      !employmentType ||
      !salaryMin ||
      !salaryMax
    ) {
      return NextResponse.json({ error: "Please fill all the fields" });
    }

    const response = await db
      .insert(jobPostings)
      .values({
        deadline,
        description,
        title,
        location,
        requirements,
        recruiterId: id,
        tags,
        employmentType,
        salaryMax,
        salaryMin,
      })
      .returning();

    if (response.length === 0) {
      return NextResponse.json({ error: "Error creating job posting" });
    }

    return NextResponse.json({ message: "Job posting created successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Error creating job posting" });
  }
}
