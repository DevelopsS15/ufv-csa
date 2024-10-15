import { NextResponse } from "next/server";
import { getLatestRoomStatus } from "~/app/sanity/lib/query";

export const revalidate = process.env.NODE_ENV === "development" ? 0 : 300; // 5 minutes
export async function GET() {
  try {
    const latestRoomStatus = await getLatestRoomStatus();
    return NextResponse.json({
      success: true,
      data: Array.isArray(latestRoomStatus) ? latestRoomStatus : [],
    });
  } catch (e) {
    return NextResponse.json({
      success: false,
      data: [],
    });
  }
}
