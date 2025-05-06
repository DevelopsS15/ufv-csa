import { AppRoomNumber } from "../config";
import InternalLink from "./General/InternalLink";

export default function SCCRoomFloorplanLink() {
    return <InternalLink target="_blank" href="./FloorPlans/A-D2.pdf">
        {AppRoomNumber}
    </InternalLink>;
}