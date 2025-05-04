/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";
import Doctor from "@/models/Doctor";
import { dbConnect } from "@/lib/dbConnect";

interface FilterCriteria {
  location?: RegExp;
  gender?: string;
  experience?: { $gte?: number; $lte?: number };
  fee?: { $gte?: number; $lte?: number };
  mode?: string;
  languages?: string;
  facilities?: string;
  $or?: Array<{ [key: string]: any }>;
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    const body = await request.json();
    const doctor = await Doctor.create(body);
    return NextResponse.json(doctor, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }
}

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);

    // Initialize filter
    const filter: FilterCriteria = {};

    // Handle search query
    const search = searchParams.get("search");
    if (search) {
      const searchRegex = new RegExp(search, "i");
      filter.$or = [
        { name: searchRegex },
        { specialization: searchRegex },
        { location: searchRegex },
        { clinic: searchRegex },
        { qualification: searchRegex },
      ];
    }

    // Handle other filters
    const location = searchParams.get("location");
    const gender = searchParams.get("gender");
    const minExp = searchParams.get("minExp");
    const maxExp = searchParams.get("maxExp");
    const minFee = searchParams.get("minFee");
    const maxFee = searchParams.get("maxFee");
    const mode = searchParams.get("mode");
    const language = searchParams.get("language");
    const facility = searchParams.get("facility");

    if (location) filter.location = new RegExp(location, "i");
    if (gender) filter.gender = gender;

    if (minExp || maxExp) {
      filter.experience = {};
      if (minExp) filter.experience.$gte = parseInt(minExp);
      if (maxExp) filter.experience.$lte = parseInt(maxExp);
    }

    if (minFee || maxFee) {
      filter.fee = {};
      if (minFee) filter.fee.$gte = parseInt(minFee);
      if (maxFee) filter.fee.$lte = parseInt(maxFee);
    }

    if (mode) filter.mode = mode;
    if (language) filter.languages = language;
    if (facility) filter.facilities = facility;

    // Handle pagination
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "6");
    const skip = (page - 1) * limit;

    // Execute queries
    const [doctors, total] = await Promise.all([
      Doctor.find(filter).skip(skip).limit(limit).sort({ experience: -1 }), // Sort by experience (descending)
      Doctor.countDocuments(filter),
    ]);

    return NextResponse.json({
      doctors,
      total,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
    });
  } catch (error: any) {
    console.error("Database error:", error);
    return NextResponse.json(
      {
        error: error.message,
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      },
      { status: 500 }
    );
  }
}
