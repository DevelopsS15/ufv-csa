import Image from "next/image";
import Link from "next/link";
import { AppFullName, AppLogoLightGreen } from "../config";

export default function LogoWithCSAStacked() {
  return (
    <Link className="flex items-center text-left" href="/">
      <Image
        src={"/CSA_Leaf_144x144.png"}
        width={64}
        height={64}
        alt={`${AppFullName} logo`}
      />
      <div
        className="text-sm font-bold"
        style={{
          color: AppLogoLightGreen,
        }}
      >
        {AppFullName.split(" ").map((word) => (
          <div key={word}>
            <span
              style={{
                fontSize: "1.025rem",
              }}
            >
              {word.substring(0, 1)}
            </span>
            <span>{word.substring(1)}</span>
          </div>
        ))}
      </div>
    </Link>
  );
}
