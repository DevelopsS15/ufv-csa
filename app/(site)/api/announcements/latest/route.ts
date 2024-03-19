import { NextResponse } from "next/server";
import { getLatestAnnouncements } from "~/app/sanity/lib/query";

// export const revalidate = process.env.NODE_ENV === "development" ? 0 : 600; // 5 minutes
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
