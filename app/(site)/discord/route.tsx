import { NextResponse } from "next/server";
import { AppDiscordInviteLink } from "../config";

export function GET() {
  return NextResponse.redirect(AppDiscordInviteLink);
}
