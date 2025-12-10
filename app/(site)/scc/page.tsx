
import { AppFullName, AppRoomName } from "../config";
import { Metadata } from "next";
import { getLatestRoomStatus } from "~/app/sanity/lib/query";
import InternalLink from "../components/General/InternalLink";
import { cn } from "../utils";
import SCCRoomFloorplanLink from "../components/SCCRoomFloorplanLink";
import CSA_SCC_Room from "../components/CSA_SCC_Room";

export async function generateMetadata(): Promise<Metadata> {
    const siteHost = `http${process.env.NODE_ENV === "development" ? "" : "s"
  }://${process.env.SITE_DOMAIN}`;
    const metadataTitle = `${AppRoomName} (SCC)`;
    const metadataDescription = `The SCC is located in room D224 on the Abbotsford campus, and is managed by the ${AppFullName}.`;
    const baseMetaData: Metadata = {
        title: metadataTitle,
        description: metadataDescription,
        openGraph: {
            title: metadataTitle,
            description: metadataDescription,
            url: `${siteHost}/scc`,
            siteName: AppFullName,
        }
    };
    try {
        const roomStatus = await getLatestRoomStatus();
        const isRoomOpen = roomStatus.length > 0 ? roomStatus[0].status : false;

        if (baseMetaData.openGraph) {
            baseMetaData.openGraph.images = {
                url: `${siteHost}/CSA_SCC_Room_${isRoomOpen ? "Open" : "Closed"}.png`,
                alt: `The ${AppRoomName} (SCC) 3D model`,
            }; 
        }

        return baseMetaData;
    } catch (e) {
        return baseMetaData;
    }
}

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