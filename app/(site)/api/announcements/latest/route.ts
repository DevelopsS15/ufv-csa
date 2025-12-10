import { NextResponse } from "next/server";
import { getLatestAnnouncements } from "~/app/sanity/lib/query";

export const revalidate = 300; // 5 minutes
export async function GET() {
  try {
    const latestAnnouncement = await getLatestAnnouncements(1);
    return NextResponse.json({
      success: true,
      data: Array.isArray(latestAnnouncement) ? latestAnnouncement : [],
    });
  } catch (e) {
    return NextResponse.json({
      success: false,
      data: [],
    });
  }
}
