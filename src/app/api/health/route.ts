import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { dbConnect } from "src/lib/dbConnect";
import Doctor from "src/models/Doctor";

export async function GET() {
  try {
    await dbConnect();

    // Verify connection is established and db exists
    if (!mongoose.connection.db) {
      throw new Error("MongoDB database connection not established");
    }

    // List all collections in the connected database
    const collections = await mongoose.connection.db
      .listCollections()
      .toArray();
    console.log("All collections:", collections);

    // Count all documents in doctors collection
    const count = await Doctor.countDocuments({});
    console.log("Total doctors in database:", count);

    // Fetch first 5 doctors without filters
    const sampleDoctors = await Doctor.find({}).limit(5);

    return NextResponse.json({
      status: "healthy",
      collections,
      doctorCount: count,
      sampleDoctors,
      dbStatus:
        mongoose.connection.readyState === 1 ? "connected" : "disconnected",
      timestamp: new Date().toISOString(),
      databaseName: mongoose.connection.name,
    });
  } catch (error) {
    console.error("Health check error:", error);
    return NextResponse.json(
      {
        connected: false,
        status: "unhealthy",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
