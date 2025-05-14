
import { AppFullName, AppRoomName } from "../config";
import { Metadata } from "next";
import { getLatestRoomStatus } from "~/app/sanity/lib/query";
import InternalLink from "../components/General/InternalLink";
import { cn } from "../utils";
import dynamic from "next/dynamic";
import SCCRoomFloorplanLink from "../components/SCCRoomFloorplanLink";
const CSA_SCC_Room = dynamic(
    () => import('../components/CSA_SCC_Room'),
    { ssr: false }
);

export const metadata: Metadata = {
    title: "Student Computing Centre (SCC)",
    description: `The ${AppFullName} manages the Student Computing Centre (SCC) in room D224 at the Abbotsford campus which has numerous resources for students to take advantage of.`
};

export default async function Page() {
    const roomStatus = await getLatestRoomStatus();
    const isRoomOpen = roomStatus.length > 0 ? roomStatus[0].status : false;

    return (
        <main className="pt-8 text-center">
            <div className="w-11/12 md:w-8/12 lg:w-6/12 mx-auto flex flex-col gap-2 h-full pb-4">
                <h1 className="text-3xl font-bold">{AppRoomName} (SCC)</h1>
                <div>See when <SCCRoomFloorplanLink /> on the Abbotsford campus is open for drop-ins so you can take advantage of the space and it&apos;s resources. <InternalLink href="https://discord.gg/w9yRFQpXYe">Join our Discord</InternalLink> for the schedule.</div>
                <div className="flex items-center justify-center">
                    <div className="font-bold bg-slate-950 px-3 py-1 rounded-l-md">
                        Status
                    </div>
                    <div className={cn("font-bold bg-slate-900 px-3 py-1 rounded-r-md", isRoomOpen ? "text-green-400" : "text-red-400")}>
                        {isRoomOpen ? "Open" : "Closed"}
                    </div>
                </div>
                <div className="text-sm">
                    Since {new Date(roomStatus[0]._updatedAt).toLocaleString("en-CA", {
                        month: "long",
                        day: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: true,
                    })}
                </div>
            </div>
            <CSA_SCC_Room className="flex-1 min-h-[512px] h-full mx-auto" isRoomOpen={isRoomOpen} />
        </main>
    );
}