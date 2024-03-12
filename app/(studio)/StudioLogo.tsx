import Image from "next/image";
import { AppFullName } from "../(site)/config";

export default function StudioLogo() {
  return (
    <Image
      src="/CSA_Leaf_144x144.png"
      alt={`${AppFullName} Logo`}
      width={32}
      height={32}
    />
  );
}
