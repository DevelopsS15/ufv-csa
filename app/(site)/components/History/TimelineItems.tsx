import ExternalLink from "../General/ExternalLink";
import {
  LucideAlbum,
  LucideArchive,
  LucideArmchair,
  LucideAward,
  LucideBug,
  LucideCalendarDays,
  LucideCalendarHeart,
  LucideCircleDollarSign,
  LucideComputer,
  LucideDices,
  LucideGamepad2,
  LucideGlobe,
  LucideHammer,
  LucideImage,
  LucideKeyboard,
  LucideMedal,
  LucideMegaphone,
  LucideMusic,
  LucideNewspaper,
  LucidePin,
  LucidePlane,
  LucideScrollText,
  LucideShirt,
  LucideSpeech,
  LucideTag,
  LucideUserMinus,
  LucideUserPlus,
  LucideUsers,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../UI/carousel";
import { ReactNode } from "react";
import {
  AppAbbreviationName,
  AppDiscordInviteLink,
  AppFullName,
} from "../../config";
import InternalLink from "../General/InternalLink";
import { SiInstagram } from "@icons-pack/react-simple-icons";
import { ExecutiveAvatar } from "../../minutes/ExecutiveAvatar";

const Executive_President_Name = "President";
const Executive_VicePresident_Name = "Vice-President";
const Executive_CommunicationManager_Name = "Communication Manager";
const Executive_SCCManager_Name = "SCC Manager";
const Executive_Webmaster_Name = "Webmaster";
const Executive_ProjectManager_Name = "Project Manager";
const Executive_FinanceOfficer_Name = "Finance Officer";
const Executive_Treasurer_Name = "Treasurer";
const Executive_Secretary_Name = "Secretary";
const Executive_Representative_Name = "Representative";
const Executive_1yrRepresentative_Name = "1st Year Representative";
const Executive_2yrRepresentative_Name = "2nd Year Representative";
const Executive_3yrRepresentative_Name = "3rd Year Representative";
const Executive_4yrRepresentative_Name = "4th Year Representative";

const Executive_Image_Path = "/History/Executives/";

const Executive_Profile_Mike_Lee = {
  name: "Mike Lee",
  linkedInUsername: "mike-lee-b055aa3",
  imageURL: `${Executive_Image_Path}Mike_Lee.jpg`,
};

const Executive_Profile_Tania_Jones = {
  name: "Tania Jones",
};

const Executive_Profile_Chris_Schwarz = {
  name: "Chris Schwarz",
};

const Executive_Profile_Janet_Gehrmann = {
  name: "Janet Gehrmann",
  linkedInUsername: "janet-gehrmann-2098a9ba",
};

const Executive_Profile_Paul_Gehrmann = {
  name: "Paul Gehrmann",
  linkedInUsername: "paul-gehrmann-5a2a0a85",
  imageURL: `${Executive_Image_Path}Paul_Gehrmann.jpg`,
};

const Executive_Profile_Scott_Holbech = {
  name: "Scott Holbech",
  linkedInUsername: "scott-h-21284758",
  imageURL: `${Executive_Image_Path}Scott_Holbech.jpg`,
};

const Executive_Profile_Paul_Anderson = {
  name: "Paul Anderson",
  linkedInUsername: "paul-anderson-0559371",
};

const Executive_Profile_Trevor_McHardy = {
  name: "Trevor McHardy",
  imageURL: `${Executive_Image_Path}Trevor_McHardy.jpg`,
  linkedInUsername: "trevor-mchardy-39a40965",
};

const Executive_Profile_Glen_Lorenz = {
  name: "Glen Lorenz",
  linkedInUsername: "glen-lorenz-657b8810",
};

// TODO: Try find profile
const Executive_Profile_Dave_Peters = {
  name: "Dave Peters",
};

const Executive_Profile_Angela_Afaganis = {
  name: "Angela Afaganis",
  imageURL: `${Executive_Image_Path}Angela_Afaganis.jpg`,
  // Source: https://issuu.com/the-cascade/docs/the_cascade_volume_7_issue_11_2000-03-21
  // TODO: Include story into history
};

const Executive_Profile_Patt_Adams = {
  name: "Patt Adams",
};

const Executive_Profile_Robert_Turner = {
  name: "Robert Turner",
  imageURL: `${Executive_Image_Path}Robert_Turner.jpg`,
  linkedInUsername: "robert-turner-a79a77109",
};

const Executive_Profile_Jared_Dyck = {
  name: "Jared Dyck",
  imageURL: `${Executive_Image_Path}Jared_Harder.jpg`,
  linkedInUsername: `jared-harder-0108811b`,
};

const Executive_Profile_Daleth_Hildebrand = {
  name: "Daleth Hildebrand",
  imageURL: `${Executive_Image_Path}Daleth_Hildebrand.jpg`,
  position: Executive_President_Name,
  linkedInUsername: "dalethhildebrand",
};

const Executive_Profile_Ryan_Neufield = {
  name: "Ryan Neufeld",
  imageURL: `${Executive_Image_Path}Ryan_Neufeld.jpg`,
  linkedInUsername: "rneufeld",
};

const Executive_Profile_Carl_Janzen = {
  name: "Carl Janzen",
  imageURL: `${Executive_Image_Path}Carl_Janzen.jpg`,
  linkedInUsername: `carl-janzen-a339a82`,
};

const Executive_Profile_Jon_Friesen = {
  name: "Jon Friesen",
  imageURL: `${Executive_Image_Path}Jon_Friesen.jpg`,
  linkedInUsername: `jonathanfriesen`,
};

const Executive_Profile_Darren_Nixon = {
  name: "Darren Nixon",
};

const Executive_Profile_Robin_Bains = {
  name: "Robin Bains",
  imageURL: `${Executive_Image_Path}Robin_Bains.jpg`,
  linkedInUsername: "robin-b-0700a392",
};

const Executive_Profile_Tyler_McEnaney = {
  name: "Tyler McEnaney",
};

const Executive_Profile_Dennis_Semeniuk = {
  name: "Dennis Semeniuk",
  linkedInUsername: `dennis-semeniuk`,
};

const Executive_Profile_Maxine_Cowan = {
  name: "Maxine Cowan",
  linkedInUsername: `maxine-c-8b5042142`,
};

const Executive_Profile_Cody_Beaty = {
  name: "Cody Beaty",
  imageURL: `${Executive_Image_Path}Cody_Beaty.jpg`,
  linkedInUsername: `cody-beaty-101`,
};

const Executive_Profile_Michael_Bennett = {
  name: "Michael Bennett",
  linkedInUsername: `michael-bennett-a49045152`,
};

const Executive_Profile_Lizzie_Klassen = {
  name: "Lizzie Klassen",
  imageURL: `${Executive_Image_Path}Lizzi_Klassen.jpg`,
  linkedInUsername: "lizzi-klassen-5aa04948",
};

const Executive_Profile_Graham_StEloi = {
  name: "Graham St. Eloi",
  linkedInUsername: `graham-st-eloi-24607584`,
  imageURL: `${Executive_Image_Path}Graham_StEloi.jpg`,
};

const Executive_Profile_James_Doull = {
  name: "James Doull",
  imageURL: `${Executive_Image_Path}James_Doull.jpg`,
};

const Executive_Profile_James_Hoestra = {
  name: "James Hoestra",
};

const Executive_Profile_Josh_Hoeksta = {
  name: "Josh Hoeksta",
};

const Executive_Profile_John_Nightingale = {
  name: "John Nightingale",
  linkedInUsername: "john-nightingale-5bb344112",
  imageURL: `${Executive_Image_Path}John_Nightingale.jpg`,
};

const Executive_Profile_Kaitlin_Houle = {
  name: "Kaitlin Houle",
  imageURL: `${Executive_Image_Path}Kaitlin_Houle.jpg`,
};

const Executive_Profile_Ashley_ONeil = {
  name: "Ashley O'Neil",
  imageURL: `${Executive_Image_Path}Ashley_ONeil.jpg`,
};

const Executive_Profile_Ryan_Mccann = {
  name: "Ryan Mccann",
  imageURL: `${Executive_Image_Path}Ryan_Mccann.jpg`,
  linkedInUsername: "ryan-mccann-490a5a103",
};

const Executive_Profile_Sean_Phillips = {
  name: "Sean Phillips",
};

const Executive_Profile_Cindy_Cooper = {
  name: "Cindy Cooper",
  imageURL: `${Executive_Image_Path}Cindy_Cooper.jpg`,
};

const Executive_Profile_Timo_Francke = {
  name: "Timo Francke",
  linkedInUsername: "timofrancke",
  imageURL: `${Executive_Image_Path}Timo_Francke.jpg`,
};

const Executive_Profile_Walter_JohnstoneBreen = {
  name: "Walter Johnstone-Breen",
  linkedInUsername: "walterjbreen",
};

const Executive_Profile_Bryce_Mclachlan = {
  name: "Bryce Mclachlan",
  linkedInUsername: "bryce-mclachlan",
  imageURL: `${Executive_Image_Path}Bryce_Mclachlan.jpg`,
};

const Executive_Profile_Joshua_Wilkie = {
  name: "Joshua Wilkie",
  linkedInUsername: "joshua-wilkie-469b99240",
  imageURL: `${Executive_Image_Path}Joshua_Wilkie.jpg`,
};

const Executive_Profile_Atlee_Bols = {
  name: "Atlee Bols",
  linkedInUsername: "atleebols",
  imageURL: `${Executive_Image_Path}Atlee_Bols.jpg`,
};

const Executive_Profile_Kyle_Coraza = {
  name: "Kyle Coraza",
};

const Executive_Profile_Derek_Froese = {
  name: "Derek Froese",
  imageURL: `${Executive_Image_Path}Derek_Forese.jpg`,
};

const Executive_Profile_James_Purdey = {
  name: "James Purdey",
  linkedInUsername: "james-purdey-757105217",
};

const Executive_Profile_Brandon_Schouten = {
  name: "Brandon Schouten",
};

const Executive_Profile_Bradbury_Keller = {
  name: "Bradbury Keller",
  imageURL: `${Executive_Image_Path}Bradbury_Keller.jpg`,
  linkedInUsername: `bradjkeller`,
};

const Executive_Profile_Kevin_McFarlane = {
  name: "Kevin McFarlane",
};

const Executive_Profile_Janam_Gor = {
  name: "Janam Gor",
};

const Executive_Profile_Corey_Norlander = {
  name: "Corey Norlander",
  linkedInUsername: "corey-norlander",
  imageURL: `${Executive_Image_Path}Corey_Norlander.jpg`,
  // TODO: Project Manager     Est: 2015-2019
};

const Executive_Profile_Caleb_Langbroek = {
  name: "Caleb Langbroek",
  linkedInUsername: "caleb-langbroek",
  imageURL:
    "https://cdn.sanity.io/images/aldsu8ui/production/fb5fc0bda2d0c7f17d043019aabb8ddff53fcf83-636x636.jpg",
};

const Executive_Profile_Zach_Griffin = {
  name: "Zach Griffin",
  imageURL:
    "https://cdn.sanity.io/images/aldsu8ui/production/7f0d4a0967bd3d853abd068e2c9e14444f636716-480x480.jpg",
  linkedInUsername: "zgzach",
};

const Executive_Profile_Alex_Kim = {
  name: "Alex Kim",
};

const Executive_Profile_Joshua_Edge = {
  name: "Joshua Edge",
  imageURL: `${Executive_Image_Path}Joshua_Edge.jpg`,
  linkedInUsername: "josh-edge-940980203",
};

const Executive_Profile_Josh_Gourde = {
  name: "Josh Gourde",
  imageURL:
    "https://cdn.sanity.io/images/aldsu8ui/production/ff15b8be798dc2c2b8f0de4ec01499dd32d91437-800x800.jpg",
  linkedInUsername: "josh2k",
};

const Executive_Profile_Akarshi_Sharma = {
  name: "Akarshi Sharma",
  imageURL:
    "https://cdn.sanity.io/images/aldsu8ui/production/95efe0ff68e1983082a534094cc07c15bea8cad3-248x248.jpg",
  linkedInUsername: "akarshi-sharma-a706b618a",
};

const Executive_Profile_Andrew_Majka = {
  name: "Andrew Majka",
  imageURL:
    "https://cdn.sanity.io/images/aldsu8ui/production/bb3e7be728c48b9cebe35d2d45e65c8c6db449ec-235x235.jpg",
  linkedInUsername: "andrew-majka-360a8019b",
};

const Executive_Profile_Henry_Majka = {
  name: "Henry Majka",
  imageURL:
    "https://cdn.sanity.io/images/aldsu8ui/production/f179e0b24f8a357201f66a6c6933048e13afb849-800x800.jpg",
  linkedInUsername: "henry-majka-a9376a256",
};

const Executive_Profile_Sabreen_Gill = {
  name: "Sabreen Gill",
  imageURL:
    "https://cdn.sanity.io/images/aldsu8ui/production/b29eb68036c63e9948fbc6c4582912dec39b333c-406x406.jpg",
  linkedInUsername: "sabreen-gill-67304b269",
};

const Executive_Profile_Avinesh_Bangar = {
  name: "Avinesh Bangar",
  imageURL: `${Executive_Image_Path}Avinesh_Bangar.jpg`,
  linkedInUsername: "avineshb",
};

const Executive_Profile_Samuel_Shull = {
  name: "Samuel Shull",
  linkedInUsername: "samuels22",
};

//
//
//

const Icons_ExecutiveList = <LucideUsers />;
const Icons_ElectionResults = <LucideArchive />;

//
//
//

interface TimelineItemVotingFromAGM {
  position: string;
  votes: string[];
}

const ElectionFor1999: TimelineItemVotingFromAGM[] = [
  {
    position: Executive_VicePresident_Name,
    votes: [
      `${Executive_Profile_Trevor_McHardy.name}: 9`,
      `${Executive_Profile_Glen_Lorenz.name}: 8`,
    ],
  },
  {
    position: Executive_Secretary_Name,
    votes: [`Greg Hughes: 9`, `${Executive_Profile_Angela_Afaganis.name}: 8`],
  },
];

const ElectionFor2015: TimelineItemVotingFromAGM[] = [
  {
    position: Executive_President_Name,
    votes: [
      `${Executive_Profile_James_Doull.name}: 12`,
      `${Executive_Profile_Sean_Phillips.name}: Unknown`,
    ],
  },
  {
    position: Executive_VicePresident_Name,
    votes: [
      `${Executive_Profile_Joshua_Wilkie.name}: 9`,
      `${Executive_Profile_Graham_StEloi.name}: 3`,
    ],
  },
  {
    position: Executive_FinanceOfficer_Name,
    votes: [`${Executive_Profile_Graham_StEloi.name}: Acclamation`],
  },
  {
    position: Executive_Secretary_Name,
    votes: [
      `${Executive_Profile_Maxine_Cowan.name}: 12`,
      `${Executive_Profile_Sean_Phillips.name}: 1`,
    ],
  },
  {
    position: Executive_SCCManager_Name,
    votes: [`${Executive_Profile_Kevin_McFarlane.name}: 12`, `Abstain: 1`],
  },
  {
    position: Executive_CommunicationManager_Name,
    votes: [
      `${Executive_Profile_Darren_Nixon.name}: 5`,
      `${Executive_Profile_Atlee_Bols.name}: 4`,
      `${Executive_Profile_Bradbury_Keller.name}: 4`,
    ],
  },
  {
    position: Executive_ProjectManager_Name,
    votes: [
      `${Executive_Profile_Sean_Phillips.name}: 8`,
      `${Executive_Profile_Atlee_Bols.name}: 5`,
    ],
  },
  {
    position: Executive_Representative_Name,
    votes: [
      `${Executive_Profile_Atlee_Bols.name}: 9`,
      `${Executive_Profile_Bradbury_Keller.name}: 8`,
      `${Executive_Profile_Robin_Bains.name}: 5`,
      `Manjot Nagra: 4`,
    ],
  },
];

const ElectionFor2016: TimelineItemVotingFromAGM[] = [
  {
    position: Executive_President_Name,
    votes: [
      `${Executive_Profile_James_Doull.name}: 8`,
      `${Executive_Profile_Tyler_McEnaney.name}: 5`,
      `Abstain: 1`,
    ],
  },
  {
    position: Executive_VicePresident_Name,
    votes: [
      `${Executive_Profile_Tyler_McEnaney.name}: 12`,
      `Abstain: 2`,
      `Against: 1`,
    ],
  },
  {
    position: Executive_FinanceOfficer_Name,
    votes: [
      `${Executive_Profile_Graham_StEloi.name}: 11`,
      `Abstain: 4`,
      `Against: 1`,
    ],
  },
  {
    position: Executive_Secretary_Name,
    votes: [`${Executive_Profile_Maxine_Cowan.name}: 11`, `Abstain: 5`],
  },
  {
    position: Executive_CommunicationManager_Name,
    votes: [`${Executive_Profile_Cody_Beaty.name}: 12`, `Abstain: 4`],
  },
  {
    position: Executive_ProjectManager_Name,
    votes: [`${Executive_Profile_Michael_Bennett.name}: 14`, `Abstain: 2`],
  },
  {
    position: Executive_SCCManager_Name,
    votes: [`${Executive_Profile_Kyle_Coraza.name}: 15`, `Abstain: 1`],
  },
  {
    position: Executive_Representative_Name,
    votes: [
      `${Executive_Profile_Dennis_Semeniuk.name}: 10`,
      `April: 10`,
      `${Executive_Profile_Brandon_Schouten.name}: 9`,
      `Kyle Viray: 7`,
      `Duncan: 6`,
      `Abstain: 1`,
    ],
  },
];

const ElectionFor2017: TimelineItemVotingFromAGM[] = [
  {
    position: Executive_President_Name,
    votes: [
      `${Executive_Profile_Tyler_McEnaney.name}: 9`,
      `${Executive_Profile_Dennis_Semeniuk.name}: 7`,
      `${Executive_Profile_Cody_Beaty.name}: 1`,
      `Abstrain: 1`,
    ],
  },
  {
    position: Executive_VicePresident_Name,
    votes: [`${Executive_Profile_Dennis_Semeniuk.name}: 17`, `Abstain: 1`],
  },
  {
    position: Executive_FinanceOfficer_Name,
    votes: [
      `${Executive_Profile_Maxine_Cowan.name}: 8`,
      `${Executive_Profile_Cody_Beaty.name}: 5`,
      `Abstain: 1`,
      `Spoiled: 1`,
    ],
  },
  {
    position: Executive_Secretary_Name,
    votes: [
      `${Executive_Profile_Cody_Beaty.name}: 10`,
      `${Executive_Profile_Michael_Bennett.name}: 3`,
      `Spoiled: 1`,
    ],
  },
  {
    position: Executive_CommunicationManager_Name,
    votes: [
      `${Executive_Profile_Michael_Bennett.name}: 13`,
      `No: 1`,
      `Abstain: 1`,
    ],
  },
  {
    position: Executive_ProjectManager_Name,
    votes: [
      `${Executive_Profile_Michael_Bennett.name}: 7`,
      `${Executive_Profile_Kyle_Coraza.name}: 5`,
      `Abstain: 2`,
      `Spoiled: 1`,
    ],
  },
  {
    position: Executive_Representative_Name,
    votes: [
      `${Executive_Profile_Graham_StEloi.name}: 6`,
      `${Executive_Profile_James_Purdey.name}: 9`,
      `${Executive_Profile_Kevin_McFarlane.name}: 8`,
      `${Executive_Profile_Janam_Gor.name}: 4`,
      `${Executive_Profile_Brandon_Schouten.name}: 11`,
      `Spoiled: 2`,
    ],
  },
];

interface TimelineItemVotingViaForm {
  position: string;
  imageFileName: string;
}

const ElectionFor2022And2023: TimelineItemVotingViaForm[] = [
  {
    position: Executive_President_Name,
    imageFileName: "President.jpg",
  },
  {
    position: Executive_VicePresident_Name,
    imageFileName: "VicePresident.jpg",
  },
  {
    position: Executive_FinanceOfficer_Name,
    imageFileName: "FinanceOfficer.jpg",
  },
  {
    position: Executive_CommunicationManager_Name,
    imageFileName: "CommunicationManager.jpg",
  },
  {
    position: Executive_ProjectManager_Name,
    imageFileName: "ProjectManager.jpg",
  },
  {
    position: Executive_Secretary_Name,
    imageFileName: "Secretary.jpg",
  },
  {
    position: Executive_Webmaster_Name,
    imageFileName: "Webmaster.jpg",
  },
];

const ElectionFor2024: TimelineItemVotingViaForm[] = [
  {
    position: Executive_President_Name,
    imageFileName: "President.jpg",
  },
  {
    position: Executive_VicePresident_Name,
    imageFileName: "VicePresident.jpg",
  },
  {
    position: Executive_Secretary_Name,
    imageFileName: "Secretary.jpg",
  },
  {
    position: Executive_FinanceOfficer_Name,
    imageFileName: "Treasurer.jpg",
  },
  {
    position: Executive_CommunicationManager_Name,
    imageFileName: "CommunicationManager.jpg",
  },
];

//
//
//

interface CarouselItems {
  fileName: string;
  alt?: string;
  status?: string;
  date?: Date;
}

const SCC_Renovations: CarouselItems[] = [
  {
    fileName: "Before.jpg",
    status: "Before",
    date: new Date("2023-06-22"),
  },
  {
    fileName: "RoomClearedOut.jpg",
    status: "Room cleared out",
    date: new Date("2023-06-26"),
  },
  {
    fileName: "StartOfRenovations.jpg",
    status: "Start of renovations",
    date: new Date("2023-07-11"),
  },
  {
    fileName: "NewCeilingAndPaint.jpg",
    status: "New ceiling and paint",
    date: new Date("2023-08-08"),
  },
  {
    fileName: "NewCarpet.jpg",
    status: "New carpet",
    date: new Date("2023-08-10"),
  },
  {
    fileName: "Furniture.jpg",
    status: "New Furniture",
    date: new Date("2023-09-07"),
  },
  {
    fileName: "LayoutOfFurniture.jpg",
    status: "Layout of furniture",
    date: new Date("2023-09-14"),
  },
  {
    fileName: "ComputersAdded.jpg",
    status: "Computers added",
    date: new Date("2024-03-15"),
  },
];

const LANParty2004Path = "/History/Events/LANParty2004";
const LANParty2004Items: CarouselItems[] = [
  {
    fileName: `${LANParty2004Path}/IMG_0002.jpg`,
  },
  {
    fileName: `${LANParty2004Path}/IMG_0008.jpg`,
  },
  {
    fileName: `${LANParty2004Path}/IMG_0009.jpg`,
  },
  {
    fileName: `${LANParty2004Path}/IMG_2400.jpg`,
  },
  {
    fileName: `${LANParty2004Path}/IMG_2417.jpg`,
  },
  {
    fileName: `${LANParty2004Path}/IMG_2418.jpg`,
  },
  {
    fileName: `${LANParty2004Path}/IMG_2425.jpg`,
  },
];

const MarioPushpinMuralCompletionPath = "/History/Events/MarioPushpinMural";
const MarioPushpinMuralCompletion: CarouselItems[] = [
  {
    fileName: `${MarioPushpinMuralCompletionPath}/Version1.jpg`,
    status: "Version 1",
  },
  {
    fileName: `${MarioPushpinMuralCompletionPath}/Version2_Start.jpg`,
    status: "Start of Version 2",
  },
  {
    fileName: `${MarioPushpinMuralCompletionPath}/Version2_Progress2.jpg`,
    status: "Before the grid system",
  },
  {
    fileName: `${MarioPushpinMuralCompletionPath}/Version2_Progress.jpg`,
    status: "CISSA Executive working on version 2",
  },
  {
    fileName: `${MarioPushpinMuralCompletionPath}/Version3_LastPin.jpg`,
    status: "Last pin by CISSA President",
  },
  {
    fileName: `${MarioPushpinMuralCompletionPath}/Version3_Complete.jpg`,
    status: "Complete mural",
  },
];

const ChildsPlay2013Path = "/History/Events/ChildPlayGamerthon/";
const ChildsPlay2013CarouselItems: CarouselItems[] = [
  {
    fileName: "Overview.jpg",
    alt: "Overview",
  },
  {
    fileName: "Conversation.jpg",
    alt: "Conversation",
  },
  {
    fileName: "GroupOfPeople.png",
    alt: "Group of people",
  },
  {
    fileName: "Lego.jpg",
    alt: "Lego",
  },
  {
    fileName: "SuperMarioGameplay.jpg",
    alt: "Super Mario Gameplay",
  },
  {
    fileName: "RafflePrizes.jpg",
    alt: "Raffle Prizes",
  },
];

//
//
//

export interface TimelineItemExecutives {
  name: string;
  position?: string;
  imageURL?: string;
  linkedInUsername?: string;
}

export interface TimelineItem {
  header: string;
  icon: JSX.Element;
  date: string;
  time?: string;
  description?: ReactNode;
  executives?: TimelineItemExecutives[] | Promise<TimelineItemExecutives[]>;
  missingCitation?: true;
  missingInformation?: true;
}

//
//
interface ExecutiveHistoryDisplay {
  executive: TimelineItemExecutives;
  showImage?: boolean;
  showPosition?: boolean;
}

export function ExecutiveHistoryDisplayWithSocialLink({
  executive,
  showImage = true,
  showPosition = true,
}: ExecutiveHistoryDisplay) {
  return executive.linkedInUsername ? (
    <ExternalLink
      target="_blank"
      href={`https://linkedin.com/in/${executive.linkedInUsername}`}
    >
      <ExecutiveHistoryDisplay
        executive={executive}
        showImage={showImage}
        showPosition={showPosition}
      />
    </ExternalLink>
  ) : (
    <ExecutiveHistoryDisplay
      executive={executive}
      showImage={showImage}
      showPosition={showPosition}
    />
  );
}

export function ExecutiveHistoryDisplay({
  executive,
  showImage = true,
  showPosition = true,
}: ExecutiveHistoryDisplay) {
  return (
    <div className="inline-flex items-center gap-2">
      {showImage && (
        <ExecutiveAvatar
          executive={{
            fullName: executive.name,
            position: executive.position,
            avatar: executive.imageURL,
          }}
        />
      )}
      <span>
        {executive.name}{" "}
        {executive.position && showPosition && <>({executive.position})</>}
      </span>
    </div>
  );
}

//
//

export const TimelineItems: TimelineItem[] = [
  // TODO: Find when the first CIS courses were offered
  {
    header: "FRASER VALLEY COLLEGE (FVC) FOUNDED",
    date: "1974-04-04",
    icon: <LucideCalendarDays />,
    description: (
      <>
        <div>
          Formal announcement made in Abbosford that Fraser Valley College has
          been proclaimed into existence by the provincial government of British
          Columbia on April 4, 1974.
        </div>
        <Image
          src={"/History/FVC.jpg"}
          width={256}
          height={256}
          className="rounded-md"
          alt="Fraser Valley College announcement"
        />
        <ExternalLink
          className="text-sm"
          href="https://ufv.ca/50/timeline"
          target="_blank"
        >
          Source: UFV 50th Timeline
        </ExternalLink>
      </>
    ),
  },
  {
    header: "CO-OPERATIVE EDUCATION LAUNCHED",
    date: "1990-09-01",
    icon: <LucideCalendarDays />,
    description: (
      <>
        <div>
          Fraser Valley College&apos;s Co-operative Education office is founded.
          Co-op option is offered initially to Computer Information Systems and
          Business Administration students.
        </div>
        <ExternalLink
          className="text-sm"
          href="https://ufv.ca/50/timeline"
          target="_blank"
        >
          Source: UFV 50th Timeline
        </ExternalLink>
        <Link href="/history/NEW_COOP_PROGRAM.jpg" target="_blank">
          <Image
            className="rounded-t-md max-h-96 w-auto"
            src="/History/NEW_COOP_PROGRAM.jpg"
            width={512}
            height={512}
            alt="UCFV Coop Newsletter 1991"
          />
        </Link>
        <ExternalLink
          className="text-sm"
          href="https://www.flickr.com/photos/ufv/3776471470/in/set-72157622188230283"
          target="_blank"
        >
          Source: UCFV Coop Newsletter 1991
        </ExternalLink>
      </>
    ),
  },
  {
    header: 'FRASER VALLEY COLLEGE GAINS "UNIVERSITY-COLLEGE" STATUS',
    date: "1991-07-05",
    icon: <LucideTag />,
    description: (
      <>
        <div>
          Fraser Valley College receives university-college status on July 5,
          1991 and begins using the name the University College of the Fraser
          Valley (UCFV).
        </div>
        <Image
          className="rounded-t-md max-h-96 w-auto"
          src="/History/UCFV.jpg"
          width={512}
          height={512}
          alt="UCFV Announcement"
        />
        <ExternalLink
          className="text-sm"
          href="https://ufv.ca/50/timeline"
          target="_blank"
        >
          Source: UFV 50th Timeline
        </ExternalLink>
      </>
    ),
  },
  {
    header: "BACHELOR OF CIS DEGREE LAUNCHED",
    icon: <LucideScrollText />,
    date: "1993-09-01",
    description: (
      <>
        <div>
          UCFV launches the Bachelor of Computer Information Systems degree
          along with the Bachelor of Science and Bachelor of Arts degrees,
          resulting in record numbers of new faculty and staff.
        </div>
        <ExternalLink
          className="text-sm"
          href="https://ufv.ca/50/timeline"
          target="_blank"
        >
          Source: UFV 50th Timeline
        </ExternalLink>
      </>
    ),
  },
  // TODO: Gather all founders, Mike Lee cofounded it.
  {
    header: "CIS Student Council Founded",
    icon: <LucideCalendarHeart />,
    date: "1994-01-01",
    description: (
      <div>
        <div>
          &quot;Due to the challenges and dissastisfaction the CIS students were
          [facing as a result of] the organziational changes&quot; (FVC to
          UCFV), and the lack of representation within the CIS Department, the
          CIS Student Council was officially co-founded by{" "}
          <ExecutiveHistoryDisplayWithSocialLink
            executive={Executive_Profile_Mike_Lee}
            showImage={false}
            showPosition={false}
          />
        </div>
        <div className="text-sm">Source: {Executive_Profile_Mike_Lee.name}</div>
      </div>
    ),
  },
  {
    header: "1994-1995 EXECUTIVES",
    icon: Icons_ExecutiveList,
    date: "1994-01-01",
    executives: [
      {
        ...Executive_Profile_Mike_Lee,
        position: Executive_VicePresident_Name,
      },
    ],
    missingCitation: true,
    missingInformation: true,
  },
  {
    header: "1995-1996 EXECUTIVES",
    icon: Icons_ExecutiveList,
    date: "1995-01-01",
    executives: [
      {
        ...Executive_Profile_Mike_Lee,
        position: Executive_President_Name,
      },
    ],
    missingCitation: true,
    missingInformation: true,
  },
  {
    header: "UCFV JOINS THE WORLD WIDE WEB",
    icon: <LucideGlobe />,
    date: "1996-05-01",
    description: (
      <>
        <div>
          UCFV unveils its first website at{" "}
          <ExternalLink
            href="https://web.archive.org/web/19970301000000*/ucfv.bc.ca"
            target="_blank"
          >
            ucfv.bc.ca
          </ExternalLink>
        </div>
        <Link href="/History/ucfv.bc.ca.png" target="_blank">
          <Image
            className="rounded-md"
            src={"/History/ucfv.bc.ca.png"}
            width={720}
            height={360}
            alt="ucfv.bc.ca"
          />
        </Link>
      </>
    ),
  },
  {
    header: "1996-1997 EXECUTIVES",
    date: "1996-09-06",
    icon: Icons_ExecutiveList,
    executives: [
      {
        ...Executive_Profile_Avinesh_Bangar,
        position: Executive_Webmaster_Name,
      },
    ],
    missingCitation: true,
    missingInformation: true,
  },
  {
    header: "1997-1998 EXECUTIVES",
    date: "1997-09-06",
    icon: Icons_ExecutiveList,
    executives: [
      {
        ...Executive_Profile_Avinesh_Bangar,
        position: Executive_Webmaster_Name,
      },
    ],
    missingCitation: true,
    missingInformation: true,
  },
  {
    header: "1998-1999 EXECUTIVES",
    date: "1998-09-06",
    icon: Icons_ExecutiveList,
    executives: [
      // https://web.archive.org/web/20020307193421fw_/http://www.ucfv.bc.ca/cissa/meetings/1998/mn101598.htm
      {
        ...Executive_Profile_Paul_Gehrmann,
        position: Executive_President_Name,
      },
      {
        ...Executive_Profile_Avinesh_Bangar,
        position: Executive_Webmaster_Name,
      },
    ],
    missingCitation: true,
    missingInformation: true,
  },
  {
    header: "1999 ELECTIONS",
    date: "1999-03-22",
    icon: Icons_ExecutiveList,
    description: (
      <>
        <div>
          Elections during the 1999 Semi-AGM. All positions decided by
          acclamation except {Executive_VicePresident_Name} and{" "}
          {Executive_Secretary_Name}.
        </div>
        <div className="max-w-48 w-auto">
          <Carousel className="mt-2">
            <CarouselPrevious className="static left-0 top-0 translate-y-0" />
            <CarouselNext className="static left-0 top-0 translate-y-0" />
            <CarouselContent>
              {ElectionFor1999.map((item, index) => (
                <CarouselItem key={index}>
                  <strong className="block">{item.position} Votes</strong>
                  {item.votes.map((vote) => (
                    <div key={vote}>{vote}</div>
                  ))}
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="text-sm mt-2">
            Note: Use the arrow buttons to view more election results.
          </div>
        </div>
        <div className="text-sm">
          <ExternalLink
            href="https://web.archive.org/web/20020307193206fw_/http://www.ucfv.bc.ca/cissa/meetings/1999/mn032299.htm"
            target="_blank"
          >
            Source: CISSA Semi-AGM Minutes - March 22, 1999
          </ExternalLink>
        </div>
      </>
    ),
  },
  {
    header: "MAR 1999 EXECUTIVES",
    date: "1999-03-22",
    icon: Icons_ExecutiveList,
    description: (
      <div className="text-sm">
        <ExternalLink
          href="https://web.archive.org/web/20020307193206fw_/http://www.ucfv.bc.ca/cissa/meetings/1999/mn032299.htm"
          target="_blank"
        >
          Source: CISSA Semi-AGM Minutes - March 22, 1999
        </ExternalLink>
      </div>
    ),
    executives: [
      {
        ...Executive_Profile_Tania_Jones,
        position: Executive_President_Name,
      },
      {
        ...Executive_Profile_Trevor_McHardy,
        position: Executive_VicePresident_Name,
      },
      {
        name: "Greg Hughes",
        position: Executive_Secretary_Name,
      },
      {
        ...Executive_Profile_Janet_Gehrmann,
        position: Executive_Treasurer_Name,
      },
      {
        ...Executive_Profile_Avinesh_Bangar,
        position: Executive_Webmaster_Name,
      },
      {
        name: "Gary Nelson",
        position: Executive_1yrRepresentative_Name,
      },
      {
        name: "Chris Schwarz",
        linkedInUsername: "chris-s-3221a015",
        imageURL: `${Executive_Image_Path}Chris_Schwarz.jpg`,
        position: Executive_2yrRepresentative_Name,
      },
      {
        name: "Rod Neufeld",
        linkedInUsername: "rodgneufeld",
        imageURL: `${Executive_Image_Path}Rod_Neufeld.jpg`,
        position: Executive_3yrRepresentative_Name,
      },
      {
        name: "Jeff Jones",
        linkedInUsername: "jeff-jones-14b7407b",
        imageURL: `${Executive_Image_Path}Jeff_Jones.jpg`,
        position: Executive_4yrRepresentative_Name,
      },
    ],
  },
  {
    // TODO: Get full name of "Sandi"
    header: "JAN 2000 EXECUTIVES",
    date: "2000-01-10",
    icon: Icons_ExecutiveList,
    description: (
      <>
        <div>Sandi resigned as Treasurer</div>
        <div className="text-sm">
          <ExternalLink
            href="https://web.archive.org/web/20010512040331fw_/http://www.ucfv.bc.ca/cissa/meetings/2000/mn011000.htm#sixteen"
            target="_blank"
          >
            Source: CISSA Executive Meeting Minutes - January 10, 2000
          </ExternalLink>
        </div>
      </>
    ),
    executives: [
      {
        ...Executive_Profile_Janet_Gehrmann,
        position: Executive_Treasurer_Name,
      },
    ],
  },
  // TODO: Add votes for each candidate if available
  {
    header: "CISSA ELECTIONS 2000",
    date: "2000-03-20",
    icon: Icons_ElectionResults,
    description: (
      <div className="text-sm">
        <ExternalLink
          href="https://web.archive.org/web/20020307194235fw_/http://www.ucfv.bc.ca/cissa/meetings/agm/2k0320agm.html"
          target="_blank"
        >
          Source: CISSA AGM Minutes - March 20, 2000
        </ExternalLink>
      </div>
    ),
    executives: [
      {
        ...Executive_Profile_Angela_Afaganis,
        position: Executive_President_Name,
      },
      {
        ...Executive_Profile_Chris_Schwarz,
        position: Executive_VicePresident_Name,
      },
      {
        ...Executive_Profile_Janet_Gehrmann,
        position: Executive_Secretary_Name,
      },
      {
        ...Executive_Profile_Glen_Lorenz,
        position: Executive_Treasurer_Name,
      },
      {
        ...Executive_Profile_Tania_Jones,
        position: Executive_Webmaster_Name,
      },
      {
        ...Executive_Profile_Scott_Holbech,
        position: Executive_1yrRepresentative_Name,
      },
      {
        ...Executive_Profile_Paul_Anderson,
        position: Executive_2yrRepresentative_Name,
      },
      {
        name: "Tom Sarkozi",
        linkedInUsername: "tom-sarkozi-96787048",
        position: Executive_3yrRepresentative_Name,
      },
      {
        ...Executive_Profile_Dave_Peters,
        position: Executive_4yrRepresentative_Name,
      },
    ],
  },
  {
    header: "APR 2000 EXECUTIVES",
    icon: Icons_ElectionResults,
    date: "2000-04-10",
    description: (
      <div className="text-sm">
        <ExternalLink
          href="https://web.archive.org/web/20010512035555fw_/http://www.ucfv.bc.ca/cissa/meetings/2000/Mn041000.html#three"
          target="_blank"
        >
          Source: CISSA Executive Meeting Minutes - April 10, 2000
        </ExternalLink>
      </div>
    ),
    executives: [
      {
        name: "Matthew Schellenberg",
        position: Executive_SCCManager_Name,
      },
    ],
  },
  {
    header: "SEP 2000 EXECUTIVES",
    icon: <LucideUserMinus />,
    date: "2000-09-13",
    description: (
      <>
        <div>
          <ExecutiveHistoryDisplayWithSocialLink
            executive={Executive_Profile_Tania_Jones}
            showImage={false}
            showPosition={false}
          />{" "}
          resigned as {Executive_Webmaster_Name}
        </div>
        <div>
          <ExecutiveHistoryDisplayWithSocialLink
            executive={Executive_Profile_Chris_Schwarz}
            showImage={false}
            showPosition={false}
          />{" "}
          resigned as {Executive_VicePresident_Name}
        </div>
        <div>Matthew Schellenberg resigned as {Executive_SCCManager_Name}</div>
        <div className="text-sm">
          <ExternalLink
            href="https://web.archive.org/web/20010716210921fw_/http://www.ucfv.bc.ca/cissa/meetings/2000/2k0913mn.html#fivea"
            target="_blank"
          >
            CISSA Executive Meeting Minutes - September 13, 2000
          </ExternalLink>
        </div>
      </>
    ),
    executives: [
      {
        ...Executive_Profile_Patt_Adams,
        position: Executive_Webmaster_Name,
      },
      {
        ...Executive_Profile_Dave_Peters,
        position: `Acting ${Executive_VicePresident_Name}`,
      },
    ],
  },
  // {
  //   header: "CISSA AGM 2000",
  //   date: "2000-11-15",
  //   icon: <LucideAlbum />,
  //   description: (
  //     <ExternalLink
  //       href="https://web.archive.org/web/20010709150510fw_/http://www.ucfv.bc.ca/cissa/events/index.html"
  //       target="_blank"
  //     >
  //       Source: CISSA Events
  //     </ExternalLink>
  //   ),
  // },
  // {
  //   header: "2000 CHRISTMAS PARTY",
  //   icon: <LucideTreePine />,
  //   date: "2000-12-15",
  //   description: (
  //     <>
  //       Christmas dinner party held at Finnigans (Now UFV Building K) in
  //       Abbotsford
  //     </>
  //   ),
  // },
  // Clarify these positions, perhaps only include the new executives instead (if no AGM was held between March 20, 2000 and these below)
  {
    header: "2000-2001 EXECUTIVES",
    date: "2001-01-15",
    icon: Icons_ExecutiveList,
    description: (
      <>
        <ExternalLink
          className="text-sm"
          href="https://web.archive.org/web/20010716212532fw_/http://www.ucfv.bc.ca/cissa/meetings/2001/20010129mn.html"
          target="_blank"
        >
          Source: CISSA Executive Meeting Minutes - January 15, 2001
        </ExternalLink>
      </>
    ),
    executives: [
      {
        ...Executive_Profile_Angela_Afaganis,
        position: Executive_President_Name,
      },
      {
        ...Executive_Profile_Janet_Gehrmann,
        position: Executive_Secretary_Name,
      },
      {
        ...Executive_Profile_Glen_Lorenz,
        position: Executive_Treasurer_Name,
      },
      {
        name: "Patt Adams",
        position: Executive_Webmaster_Name,
      },
      {
        name: "Cormac Vaughan",
        position: Executive_SCCManager_Name,
      },
      {
        name: "Kate Howerton",
        position: Executive_1yrRepresentative_Name,
      },
      {
        name: "Carlos Jiminez",
        imageURL: `${Executive_Image_Path}Carlos_Jiminez.jpg`,
        linkedInUsername: "carlos-jimenez-6a975342",
        position: Executive_2yrRepresentative_Name,
      },
      {
        ...Executive_Profile_Scott_Holbech,
        position: Executive_3yrRepresentative_Name,
      },
      {
        ...Executive_Profile_Paul_Gehrmann,
        position: Executive_4yrRepresentative_Name,
      },
    ],
  },
  {
    header: "CISSA JOINS THE WORLD WIDE WEB",
    icon: <LucideGlobe />,
    date: "2001-04-24",
    description: (
      <>
        <div>
          CISSA introduces its first webpage at{" "}
          <ExternalLink
            href="https://web.archive.org/web/20010424112740/http://www.ucfv.bc.ca/cissa/"
            target="_blank"
          >
            http://www.ucfv.bc.ca/cissa/
          </ExternalLink>
        </div>
        <Link href="/History/Website/2001.png" target="_blank">
          <Image
            className="rounded-t-md max-h-[512px] w-auto"
            src="/History/Website/2001.png"
            width={720}
            height={360}
            alt="CISSA 2001 webpage"
          />
        </Link>
        <div>
          <ExternalLink
            className="text-sm"
            target="_blank"
            href="https://web.archive.org/web/20010424112740/http://www.ucfv.bc.ca/cissa/"
          >
            Source: 2001 CISSA Webpage
          </ExternalLink>
        </div>
      </>
    ),
  },
  // {
  //   header: "CISSA AGM 2001",
  //   date: "2001-04-05",
  //   icon: <LucideAlbum />,
  //   description: (
  //     <ExternalLink
  //       href="https://web.archive.org/web/20010709150510fw_/http://www.ucfv.bc.ca/cissa/events/index.html"
  //       target="_blank"
  //     >
  //       Source: CISSA Events
  //     </ExternalLink>
  //   ),
  // },
  {
    header: "2001-2002 EXECUTIVES",
    icon: Icons_ExecutiveList,
    date: "2001-05-06",
    executives: [Executive_Profile_Daleth_Hildebrand],
    missingCitation: true,
    missingInformation: true,
  },
  {
    header: "2002-2003 EXECUTIVES",
    icon: Icons_ExecutiveList,
    date: "2002-05-06",
    executives: [Executive_Profile_Daleth_Hildebrand],
    missingCitation: true,
    missingInformation: true,
  },
  // https://web.archive.org/web/20021129044918/http://cissa.lunardreams.net/
  {
    header: "NEW WEBSITE AND LOGO 2002",
    icon: <LucideGlobe />,
    date: "2002-06-22",
    description: (
      <>
        <div>
          CISSA introduces its first dedicated website at{" "}
          <ExternalLink
            href="https://web.archive.org/web/20020622063853/http://cissa.lunardreams.net:80/"
            target="_blank"
          >
            cissa.lunardreams.net
          </ExternalLink>
        </div>
        <Link href="/History/Website/2002.png" target="_blank">
          <Image
            className="rounded-t-md"
            src="/History/Website/2002.png"
            width={720}
            height={360}
            alt="CISSA 2002 Website"
          />
        </Link>
        <div>
          <ExternalLink
            className="text-sm"
            target="_blank"
            href="https://web.archive.org/web/20020622063853/http://cissa.lunardreams.net:80/"
          >
            Source: 2002 CISSA Website
          </ExternalLink>
        </div>
      </>
    ),
  },
  {
    header: "CIS AT UCFV POSTER",
    icon: <LucideImage />,
    date: "2003-03-02",
    description: (
      <Link href={"/History/CISPoster2003.jpg"} target="_blank">
        <Image
          src="/History/CISPoster2003.jpg"
          width={256}
          height={256}
          alt="CIS AT UCFV POSTER"
        />
      </Link>
    ),
  },
  // {
  //   header: "CISSA AGM 2003",
  //   date: "2003-04-08",
  //   icon: <LucideAlbum />,
  // },
  {
    header: "NEW WEBSITE AND CISSA DOMAIN 2003",
    icon: <LucideGlobe />,
    date: "2003-06-10",
    description: (
      <>
        <div>
          CISSA introduces a new website along with a dedicated domain at{" "}
          <ExternalLink
            href="https://web.archive.org/web/20041218222547/http://www.cissa.ca/forum/index1.php"
            target="_blank"
          >
            cissa.ca
          </ExternalLink>
        </div>
        <Link href="/History/Website/2003-2005_1.png" target="_blank">
          <Image
            className="rounded-t-md"
            src="/History/Website/2003-2005.jpg"
            width={720}
            height={360}
            alt="CISSA 2003-2005 Website"
          />
        </Link>
        <div>
          <ExternalLink
            className="text-sm"
            target="_blank"
            href="https://web.archive.org/web/20041218222547/http://www.cissa.ca/forum/index1.php"
          >
            Source: 2003 CISSA Website
          </ExternalLink>
        </div>
      </>
    ),
  },
  // TODO: CISSA/ICCA YEAR END 'Shebang', who is Tom from CISSA? https://web.archive.org/web/20041218222547/http://www.cissa.ca/forum/viewthread.php?tid=493
  // Tom Fast? https://www.linkedin.com/in/tomfast/
  {
    header: "2004-2005 EXECUTIVES",
    icon: Icons_ExecutiveList,
    date: "2004-05-01",
    executives: [
      {
        name: "Andrew Rosychuk",
        position: Executive_President_Name,
      },
      {
        name: "Robin Percy",
        imageURL: `${Executive_Image_Path}Robin_Percy.jpg`,
        position: Executive_VicePresident_Name,
        linkedInUsername: `robin-percy-69969bb`,
      },
      {
        ...Executive_Profile_Ryan_Neufield,
        position: Executive_Representative_Name,
      },
    ],
    missingCitation: true,
    missingInformation: true,
  },
  // {
  //   header: "PICTURE WITH SANTA",
  //   date: "2004-11-18",
  //   icon: <LucideTreePine/>
  // },
  {
    header: "FALL 2004 LAN PARTY",
    icon: <LucideGamepad2 />,
    date: "2004-10-06",
    description: (
      <>
        <div>
          CISSA lan party hosted at Montesina Internet Cafe PC in Abbotsford
        </div>
        <Carousel className="max-h-96 max-w-full mt-2">
          <CarouselPrevious
            style={{
              zIndex: 100,
              marginLeft: 48,
            }}
          />
          <CarouselContent>
            {LANParty2004Items.map((milestone) => (
              <CarouselItem key={milestone.fileName} className="text-center">
                <Image
                  className="max-h-96 w-auto mx-auto rounded-md"
                  src={milestone.fileName}
                  width={720}
                  height={360}
                  alt={milestone.status ?? "LAN Party Image"}
                />
                <div>
                  {milestone.status}
                  {milestone.date && (
                    <>
                      {" - "}
                      {milestone.date.toLocaleDateString(undefined, {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext
            style={{
              zIndex: 100,
              marginRight: 48,
            }}
          />
        </Carousel>
        <div className="text-sm">
          Note: Use the arrow buttons to view more photos.
        </div>
        <div className="text-sm">
          <ExternalLink
            href="https://web.archive.org/web/20041216084626/http://www.cissa.ca/forum/viewthread.php?tid=563"
            target="_blank"
          >
            Source: CISSA Forums Post &quot;LAN Party Success!&quot;
          </ExternalLink>
        </div>
      </>
    ),
  },
  // TODO: Look into full names of these executives
  // TODO: Look into exec electives in sept? https://web.archive.org/web/20041218222547/http://www.cissa.ca/forum/viewthread.php?tid=520
  {
    header: "CISSA AGM 2004",
    icon: <LucideAlbum />,
    date: "2004-10-06",
    description: (
      <div className="text-sm">
        <ExternalLink
          href="https://web.archive.org/web/20050214021353/http://www.cissa.ca/forum/viewthread.php?tid=539"
          target="_blank"
        >
          Source: CISSA AGM - October 6, 2004 and CISSA Forums Post by
          &quot;bepro&quot;
        </ExternalLink>
      </div>
    ),
    executives: [
      {
        // Andrew Rosychuk
        name: "Andrew",
        position: Executive_President_Name,
      },
      {
        name: "Fernando",
        position: Executive_VicePresident_Name,
      },
      {
        // Benjamin Reid
        name: "Ben",
        position: Executive_Treasurer_Name,
      },
      {
        name: "Emily",
        position: Executive_Secretary_Name,
      },
      {
        name: "Filip",
        position: Executive_1yrRepresentative_Name,
      },
      {
        ...Executive_Profile_Ryan_Neufield,
        position: Executive_2yrRepresentative_Name,
      },
    ],
    missingInformation: true,
  },
  {
    header: "2005-2006 EXECUTIVES",
    icon: Icons_ExecutiveList,
    date: "2005-05-01",
    executives: [
      {
        ...Executive_Profile_Carl_Janzen,
        position: Executive_President_Name,
      },
      {
        ...Executive_Profile_Jared_Dyck,
        position: Executive_Webmaster_Name,
      },
    ],
    missingCitation: true,
    missingInformation: true,
  },
  {
    header: "NEW WEBSITE AND LOGO 2005",
    icon: <LucideGlobe />,
    date: "2005-12-14",
    description: (
      <>
        <Link
          href={
            "https://web.archive.org/web/20051214221739/http://www.cissa.ca/"
          }
          target="_blank"
        >
          <Image
            src={`/History/Logo/2005-2012.gif`}
            width={256}
            height={80}
            alt="CISSA 2005 Logo"
          />
        </Link>
        <Link href={"/History/Website/2005-2012.png"} target="_blank">
          <Image
            className="rounded-md"
            src={"/History/Website/2005-2012.png"}
            width={720}
            height={360}
            alt="CISSA 2005 Website"
          />
        </Link>
        <div>
          <ExternalLink
            className="text-sm"
            href={
              "https://web.archive.org/web/20051214221739/http://www.cissa.ca/"
            }
            target="_blank"
          >
            Source: 2005 CISSA Website
          </ExternalLink>
        </div>
      </>
    ),
  },
  {
    header: "2006 EXECUTIVES",
    icon: Icons_ExecutiveList,
    date: "2006-05-01",
    executives: [
      {
        name: "Benjamin Reid",
        imageURL: `${Executive_Image_Path}Benjamin_Reid.jpg`,
        position: Executive_President_Name,
        linkedInUsername: `benjaminxreid`,
      },
    ],
    missingCitation: true,
    missingInformation: true,
  },
  // First Child's Play Gamerthon in 2007, thanks to Graham St. Eloi
  // https://ufvcascade.ca/childs-play-24-hour-gaming-marathon-puts-the-fun-in-fundraising/?highlight=cissa
  {
    header: "CISSA WEBSITE MISHAPS",
    icon: <LucideBug />,
    date: "2007-02-03",
    description: (
      <>
        <pre className="text-wrap text-center bg-white p-2 text-black">
          Due to an error on my part (Jared), I kinda lost everything on the
          site back to the beginning of December. I&apos;ve restored the last
          full backup I made, but that means nearly 2 months of stuff is
          missing. I still have partial wiki records, but recent forum posts
          have been lost (don&apos;t worry, it wasn&apos;t very active
          recently).
          <br />
          <br />
          In any case, this has taught me a valuable lesson: don&apos;t rush
          into making sweeping changes to a structure when you haven&apos;t
          looked at everything.
          <br />
          <br />
          I&apos;ll be working to restore the site as soon as possible. I might
          just go ahead and upgrade to the new Subdreamer CMS we recently
          purchased.
          <br />
          <br />
          Sorry again about the mess! It&apos;ll all be better soon.
          <br />
          <br />
          If you want to yell at me, you can either do it in person, or by email
          at:
          <br />
          <br />
          <b>cissa [dot] ucfv [at] gmail [dot] com</b>
          <br />
          <br />
          Thank you for your patience and understanding.
          <br />
          <br />
          Jared (the inept webmaster)
        </pre>
        <div className="text-sm">
          <ExternalLink
            href="https://web.archive.org/web/20070203020124/http://www.cissa.ca/"
            target="_blank"
          >
            Source: CISSA Website 2007
          </ExternalLink>
        </div>
      </>
    ),
  },
  {
    header: "2007-2008 EXECUTIVES",
    icon: Icons_ExecutiveList,
    date: "2007-05-01",
    description: (
      <ExternalLink
        className="text-sm"
        href="https://web.archive.org/web/20070808194930/http://wiki.cissa.ca/index.php?title=Fall_2007_Elective"
        target="_blank"
      >
        Source: CISSA Wiki Fall 2007 Elective
      </ExternalLink>
    ),
    executives: [
      {
        ...Executive_Profile_Jared_Dyck,
        position: Executive_President_Name,
      },
      {
        name: "Dylan Wagar",
        linkedInUsername: "dylan-wagar-ab270660",
        position: Executive_VicePresident_Name,
      },
      {
        name: "Brent Hunter",
        position: Executive_Treasurer_Name,
        imageURL: `${Executive_Image_Path}Brent_Hunter.jpg`,
        linkedInUsername: "brentwhunter",
      },
      {
        name: "Jeffrey Pernitsky",
        position: Executive_Secretary_Name,
      },
      {
        name: "Jeffrey Pernitsky",
        position: Executive_Webmaster_Name,
      },
      {
        name: "Ben Dippenaar",
        imageURL: `${Executive_Image_Path}Ben_Dippenaar.jpg`,
        linkedInUsername: "ben-dippenaar-94132aa1",
        position: Executive_1yrRepresentative_Name,
      },
      {
        ...Executive_Profile_Ryan_Mccann,
        position: Executive_2yrRepresentative_Name,
      },
      {
        name: "Michael Harder",
        imageURL: `${Executive_Image_Path}Michael_Harder.jpg`,
        linkedInUsername: "michael-harder",
        position: Executive_3yrRepresentative_Name,
      },
      {
        ...Executive_Profile_Robert_Turner,
        position: Executive_4yrRepresentative_Name,
      },
    ],
  },
  {
    header: 'UCFV ACHIEVES "UNIVERSITY" STATUS, BECOMES UFV',
    icon: <LucideTag />,
    date: "2008-04-21",
    description: (
      <>
        <div>
          Premier Gordon Campbell visits UCFV to announce university status and
          a name change to the University of the Fraser Valley.
        </div>
        <ExternalLink
          className="text-sm"
          href="https://ufv.ca/50/timeline"
          target="_blank"
        >
          Source: UFV 50th Timeline
        </ExternalLink>
      </>
    ),
  },
  {
    header: "2008-2009 EXECUTIVES",
    icon: Icons_ExecutiveList,
    date: "2008-05-01",
    executives: [
      {
        ...Executive_Profile_Robert_Turner,
        position: Executive_Secretary_Name,
      },
    ],
    missingCitation: true,
    missingInformation: true,
  },
  {
    header: "MARIO PUSHPIN MURAL COMPLETED",
    icon: <LucidePin />,
    date: "2008-10-15",
    description: (
      <>
        <div>
          After several attempts and over 17,438 push pins, the signature Mario
          pushpin mural was completed. It was eventually put outside of the
          Student Computing Centre in plexiglass for everyone to see. The Flickr
          album by Ranadok has received over 250k views as of May 23, 2024.
        </div>
        <div className="text-sm">
          <ExternalLink
            href="https://www.flickr.com/photos/ranadok/albums/72157608990502708/"
            target="_blank"
          >
            Source: Ranadok on Flickr
          </ExternalLink>
        </div>
        <Carousel className="mt-2">
          <CarouselPrevious
            style={{
              zIndex: 100,
              marginLeft: 48,
            }}
          />
          <CarouselContent>
            {MarioPushpinMuralCompletion.map((milestone) => (
              <CarouselItem
                key={milestone.status}
                className="bg-slate-700 text-center relative h-full w-full flex self-end"
              >
                <Image
                  className="w-full h-full max-w-max mx-auto block max-h-96"
                  src={milestone.fileName}
                  width={720}
                  height={360}
                  alt={milestone.status ?? "Mural progress Image"}
                />
                <div className="absolute bottom-0 w-full text-nowrap bg-slate-700 py-1 max-sm:text-sm">
                  {milestone.status}
                  {milestone.date && (
                    <>
                      {" - "}
                      {milestone.date.toLocaleDateString(undefined, {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext
            style={{
              zIndex: 100,
              marginRight: 48,
            }}
          />
        </Carousel>
        <div className="text-sm">
          Note: Use the arrow buttons to view more photos.
        </div>
      </>
    ),
  },
  {
    header: "2009-2010 EXECUTIVES",
    icon: Icons_ExecutiveList,
    date: "2009-05-01",
    executives: [
      {
        ...Executive_Profile_Jon_Friesen,
        position: Executive_Representative_Name,
      },
    ],
    missingCitation: true,
    missingInformation: true,
  },
  {
    header: "2010-2011 EXECUTIVES",
    icon: Icons_ExecutiveList,
    date: "2010-05-01",
    executives: [
      {
        ...Executive_Profile_Jon_Friesen,
        position: Executive_Representative_Name,
      },
    ],
    missingCitation: true,
    missingInformation: true,
  },
  {
    header: "2011-2012 EXECUTIVES",
    icon: Icons_ExecutiveList,
    date: "2011-05-01",
    executives: [
      {
        ...Executive_Profile_Derek_Froese,
        position: Executive_President_Name,
      },
      {
        ...Executive_Profile_Timo_Francke,
        position: "Unknown",
      },
      {
        name: "Wim",
        position: "Unknown",
      },
      {
        ...Executive_Profile_Ryan_Mccann,
        position: "Unknown",
      },
      {
        ...Executive_Profile_Lizzie_Klassen,
        position: "Unknown",
      },
      {
        ...Executive_Profile_Graham_StEloi,
        position: "Unknown",
      },
      // Ben Dippenaar, must confirm.
      {
        name: "Ben",
        position: "Unknown",
      },
    ],
    missingCitation: true,
    missingInformation: true,
  },
  // TODO: Look for CISSA Annual General Meeting - February 27, 2012
  {
    header: "2012-2013 EXECUTIVES",
    icon: Icons_ExecutiveList,
    date: "2012-05-01",
    executives: [
      {
        ...Executive_Profile_Timo_Francke,
        position: Executive_VicePresident_Name,
      },
      {
        ...Executive_Profile_Graham_StEloi,
        position: "General Executive",
      },
      {
        ...Executive_Profile_Jon_Friesen,
        position: Executive_Representative_Name,
      },
    ],
    missingCitation: true,
    missingInformation: true,
  },
  {
    header: "BIG BANG 2012",
    date: "2012-03-30",
    icon: <LucideMusic />,
    description: (
      <>
        <div>
          Live performances, great food, lots of prizes, and free admission.
        </div>
        <div>
          <strong>Raffle Prizes</strong>: Free UFV Course, $100 Gift Card to
          Thinkgeek, and other Thinkgeek prizes
        </div>
        <div className="my-2">
          <h1 className="font-bold">Hosted by</h1>
          Computer Information Systems Student Association (CISSA)
          <br />
          Biology and Chemistry Student Association (BCSA)
          <br />
          Physics Student Association (PSA)
        </div>
        <Link
          className="block max-w-max"
          href="/History/Events/BigBang2012/Poster.jpg"
          target="_blank"
        >
          <Image
            className="rounded-md max-h-96 w-auto"
            src="/History/Events/BigBang2012/Poster.jpg"
            width={720}
            height={360}
            alt="Big Bang 2012 poster"
          />
        </Link>
        <div className="text-sm">Source: Big Bang 2012 Poster</div>
      </>
    ),
  },
  {
    header: "BIG BANG 2012 MAKES CASCADE HEADLINES",
    icon: <LucideNewspaper />,
    date: "2012-04-04",
    description: (
      <>
        <div>
          <ExternalLink href="https://ufvcascade.ca/" target="_blank">
            The Cascade
          </ExternalLink>{" "}
          covered the end-of-year, &quot;Big Bang&quot; event which was quite
          the success despite some minor inconveniences. Available in{" "}
          <ExternalLink
            href="https://issuu.com/the-cascade/docs/vol20no12"
            target="_blank"
          >
            Vol. 20, No. 12
          </ExternalLink>
        </div>
        <Link
          className="block max-w-max my-1"
          href="/History/Events/BigBang2012/Newspaper.jpg"
          target="_blank"
        >
          <Image
            className="rounded-md max-h-96 w-auto"
            src="/History/Events/BigBang2012/Newspaper.jpg"
            width={720}
            height={360}
            alt="Big Bang 2012"
          />
        </Link>
        <div className="text-sm">Cover Credit to Anthony Biondi</div>
      </>
    ),
  },
  {
    header: "NEW WEBSITE AND LOGO 2012",
    icon: <LucideGlobe />,
    date: "2012-07-25",
    description: (
      <>
        <Link
          href="https://web.archive.org/web/20120725131940/http://www.cissa.ca/"
          target="_blank"
        >
          <Image
            src={`/History/Logo/2012-2017.png`}
            width={256}
            height={80}
            alt="CISSA 2012 to 2017 Logo"
          />
        </Link>
        <Link href="/History/Website/2012-2017.png" target="_blank">
          <Image
            className="rounded-md"
            src="/History/Website/2012-2017.png"
            width={720}
            height={360}
            alt="CISSA 2015 to 2017 Website"
          />
        </Link>
        <div>
          <ExternalLink
            className="text-sm"
            href="https://web.archive.org/web/20120725131940/http://www.cissa.ca/"
            target="_blank"
          >
            Source: 2015 CISSA Website
          </ExternalLink>
        </div>
      </>
    ),
  },
  {
    header: "ZELDA PUSHPIN MURAL COMPLETED",
    date: "2012-10-29",
    icon: <LucidePin />,
    description: (
      <>
        <div>
          Using over 16,900 pins, this iconic Zelda mural is one of many pushpin
          murals located at the Student Computing Centre (SCC) in Room D224.
        </div>
        <Image
          className="block rounded-md"
          src="/History/ZeldaPushPinMural.jpg"
          width={348}
          height={348}
          alt="Zelda Push Pin Mural"
        />
        <div className="text-sm">
          <ExternalLink
            href="https://imgur.com/zelda-pushpin-mural-16-900-pins-finished-today-ELAck"
            target="_blank"
          >
            Source: Imgur Post
          </ExternalLink>
        </div>
      </>
    ),
  },
  {
    header: `THE FROESE MOTION`,
    date: "2012-11-15",
    icon: <LucideSpeech />,
    description: (
      <>
        <div>
          During an Extraordinary General Meeting held by the Student Union
          Society, CISSA {Executive_President_Name}{" "}
          <ExecutiveHistoryDisplayWithSocialLink
            executive={Executive_Profile_Derek_Froese}
            showImage={false}
            showPosition={false}
          />{" "}
          presented a multi-sectioned motion with the intent to keep the campus
          pub, &quot;AfterMath&quot; in E120, open.
        </div>
        <div className="text-sm">
          Source:{" "}
          <ExternalLink
            href="https://ufvcascade.ca/the-aftermath-decision-what-happened-to-the-pub-and-other-tales-from-the-november-egm/"
            target="_blank"
          >
            The Cascade &quot;The AfterMath decision...&quot;
          </ExternalLink>{" "}
          and{" "}
          <ExternalLink
            href="https://ufvcascade.ca/sus-to-divert-additional-money-to-save-aftermath-until-permanent-solution-can-be-reached"
            target="_blank"
          >
            The Cascade &quot;SUS to divert additional money to save
            AfterMath...&quot;
          </ExternalLink>
        </div>
      </>
    ),
  },
  {
    header: "CISSA AGM 2013",
    date: "2013-01-22",
    icon: <LucideAlbum />,
    description: (
      <Image
        src="/History/Events/CSA_AGM_2013/Promotion.png"
        width={256}
        height={256}
        alt="CISSA Annual General Meeting Poster"
      />
    ),
  },
  {
    header: "2013 EXECUTIVES",
    icon: Icons_ExecutiveList,
    date: "2013-04-04",
    description: (
      <>
        <div className="text-sm">Source: CISSA AGM Agenda - April 4, 2013</div>
        <ExternalLink
          className="text-sm"
          href="/History/UFV_Standout_Magazine_2014.pdf"
          target="_blank"
        >
          Source: UFV Standout Magazine 2014
        </ExternalLink>
      </>
    ),
    executives: [
      {
        ...Executive_Profile_Lizzie_Klassen,
        position: Executive_President_Name,
      },
      {
        ...Executive_Profile_Graham_StEloi,
        position: Executive_VicePresident_Name,
      },
      {
        ...Executive_Profile_Cindy_Cooper,
        position: Executive_Secretary_Name,
      },
      {
        name: "Kaitlin Houle",
        position: Executive_FinanceOfficer_Name,
      },
      {
        ...Executive_Profile_Ashley_ONeil,
        position: Executive_CommunicationManager_Name,
      },
      {
        ...Executive_Profile_Jon_Friesen,
        position: Executive_ProjectManager_Name,
      },
      {
        ...Executive_Profile_James_Doull,
        position: Executive_SCCManager_Name,
      },
      {
        name: "Sean Bemister",
        imageURL: `${Executive_Image_Path}Sean_Bemister.jpg`,
        linkedInUsername: "sean-bemister-408aa2162",
        position: Executive_Representative_Name,
      },
      {
        ...Executive_Profile_Josh_Hoeksta,
        position: Executive_Representative_Name,
      },
      {
        name: "Taylor McKenzie",
        position: Executive_Representative_Name,
      },
    ],
  },
  {
    header: `FORMER EXECUTIVE "TO SHINE AT CONVOCATION" AS STUDENT SPEAKER`,
    icon: <LucideMegaphone />,
    date: "2013-06-07",
    description: (
      <>
        <div>
          &quot;Abbotsford&apos;s{" "}
          <ExecutiveHistoryDisplayWithSocialLink
            executive={Executive_Profile_Derek_Froese}
            showImage={false}
            showPosition={false}
          />
          , who is earning his Bachelor of Computer Information Systems[
          degree,] is the student speaker at the Friday, June 14 afternoon
          Convocation ceremony.&quot;
        </div>
        <ExternalLink
          className="text-sm"
          href="https://blogs.ufv.ca/blog/2013/06/6185/"
          target="_blank"
        >
          Source: Three student speakers to shine at convocation
        </ExternalLink>
      </>
    ),
  },
  {
    header: "CHILD'S PLAY GAMERTHON 2013",
    icon: <LucideGamepad2 />,
    date: "2013-11-15",
    description: (
      <div>
        <Carousel
          className="max-h-96"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselPrevious
            style={{
              zIndex: 100,
              marginLeft: 48,
            }}
          />
          <CarouselContent className="max-h-96">
            {ChildsPlay2013CarouselItems.map((item) => (
              <CarouselItem key={item.fileName}>
                <Image
                  className="max-h-96 rounded-md"
                  src={`${ChildsPlay2013Path}${item.fileName}`}
                  width={720}
                  height={360}
                  alt={item.fileName ?? "Child's Play Gamerthon 2013 Image"}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext
            style={{
              zIndex: 100,
              marginRight: 48,
            }}
          />
        </Carousel>
        <div className="text-sm mt-2">
          Note: Use the arrow buttons to view more photos.
        </div>
      </div>
    ),
  },
  {
    header: "CASINO ROYALE 2013",
    icon: <LucideCircleDollarSign />,
    date: "2013-11-27",
    description: (
      <div>
        Hosted by the BCSA, CISSA, and PSA, this event consisted of fun, food
        and fake gambling. Extra gambling credit was given to those who brought
        canned food (all of which was donated).
      </div>
    ),
  },
  {
    header: "JAN 2014-SEPT 2014 EXECUTIVES",
    icon: Icons_ExecutiveList,
    date: "2014-01-22",
    description: (
      <div className="text-sm">Source: CSA AGM Minutes - January 22, 2014</div>
    ),
    executives: [
      {
        ...Executive_Profile_Graham_StEloi,
        position: Executive_President_Name,
      },
      {
        ...Executive_Profile_Lizzie_Klassen,
        position: Executive_VicePresident_Name,
      },
      {
        ...Executive_Profile_Kaitlin_Houle,
        position: Executive_FinanceOfficer_Name,
      },
      {
        ...Executive_Profile_Sean_Phillips,
        position: Executive_Secretary_Name,
      },
      {
        ...Executive_Profile_Ashley_ONeil,
        position: Executive_CommunicationManager_Name,
      },
      {
        ...Executive_Profile_James_Hoestra,
        position: Executive_SCCManager_Name,
      },
      {
        name: "Kevin McFarlane",
        position: Executive_SCCManager_Name,
      },
      {
        name: "Joseph McKenzie",
        position: Executive_ProjectManager_Name,
      },
      {
        ...Executive_Profile_Josh_Hoeksta,
        position: Executive_Representative_Name,
      },
      {
        name: "Andrew Reid",
        position: Executive_Representative_Name,
      },
      {
        name: "Mitchell Martin",
        position: Executive_Representative_Name,
      },
    ],
  },
  {
    header: "CISSA BECOMES CSA",
    icon: <LucideTag />,
    date: "2014-01-22",
    description: (
      <>
        <div>
          <strong>CISSA</strong> strives to be inclusive of all computing
          students so with the Computing Science major in the works and
          confusion behind the meaning of &quot;<strong>CISSA</strong>&quot;,
          the <strong>CISSA AGM 2014</strong> passed a motion presented by{" "}
          <ExecutiveHistoryDisplayWithSocialLink
            executive={Executive_Profile_Graham_StEloi}
            showImage={false}
            showPosition={false}
          />{" "}
          to change the name to &quot;<strong>{AppFullName}</strong>&quot;
          (&quot;
          <strong>{AppAbbreviationName}</strong>&quot;).
        </div>
        <div className="text-sm mt-2">
          Source: CSA AGM Minutes - January 22, 2014
        </div>
      </>
    ),
  },
  {
    header: "NEW CSA DOMAIN",
    icon: <LucideGlobe />,
    date: "2014-03-06",
    description: (
      <div>
        With the new name, the {AppAbbreviationName} migrated over to{" "}
        <ExternalLink
          href="https://web.archive.org/web/20150401000000*/ufvcsa.ca"
          target="_blank"
        >
          ufvcsa.ca
        </ExternalLink>
      </div>
    ),
  },
  {
    header: `CISSA RECOGNIZED AS LEADERS ON CAMPUS`,
    icon: <LucideMegaphone />,
    date: "2014-04-28",
    description: (
      <>
        <div>
          Nominated by the Student Union for hosting the annual Child&apos;s
          Play Charity which raised over $2000. The CISSA was later selected for
          the{" "}
          <ExternalLink
            href="/History/UFV_Standout_Magazine_2014.pdf"
            target="_blank"
          >
            UFV Standout Magazine 2014
          </ExternalLink>
        </div>
        <div>
          Bottom image, left to right:{" "}
          <ExecutiveHistoryDisplayWithSocialLink
            executive={Executive_Profile_Cindy_Cooper}
            showImage={false}
            showPosition={false}
          />
          ,{" "}
          <ExecutiveHistoryDisplayWithSocialLink
            executive={Executive_Profile_Graham_StEloi}
            showImage={false}
            showPosition={false}
          />
          ,{" "}
          <ExecutiveHistoryDisplayWithSocialLink
            executive={Executive_Profile_Lizzie_Klassen}
            showImage={false}
            showPosition={false}
          />
          , and{" "}
          <ExecutiveHistoryDisplayWithSocialLink
            executive={Executive_Profile_Kaitlin_Houle}
            showImage={false}
            showPosition={false}
          />
        </div>
        <Link
          href="/History/UFV_Standout_Magazine_2014_Page23.jpg"
          target="_blank"
          className="block max-w-max"
        >
          <Image
            className="max-h-96 w-auto rounded-md"
            src={`/History/UFV_Standout_Magazine_2014_Page23.jpg`}
            width={720}
            height={360}
            alt="UFV Standout Magazine 2014 Page 23"
          />
        </Link>
        <ExternalLink
          className="text-sm"
          href="https://blogs.ufv.ca/science/2014/04/28/science-students-among-select-ufv-standout-leaders/"
          target="_blank"
        >
          Source: Science students among select UFV STANDOUT leaders
        </ExternalLink>
      </>
    ),
  },
  // TODO: Check if general reps or yr-based
  {
    header: "SEPT 2014-2015 EXECUTIVES",
    icon: Icons_ExecutiveList,
    date: "2014-09-24",
    description: (
      <div className="text-sm">
        Source: CSA AGM Minutes - September 24, 2014
      </div>
    ),
    executives: [
      {
        ...Executive_Profile_Graham_StEloi,
        position: Executive_President_Name,
      },
      {
        ...Executive_Profile_John_Nightingale,
        position: Executive_VicePresident_Name,
      },
      {
        ...Executive_Profile_Bryce_Mclachlan,
        position: Executive_FinanceOfficer_Name,
      },
      {
        ...Executive_Profile_Sean_Phillips,
        position: Executive_Secretary_Name,
      },
      {
        ...Executive_Profile_Kevin_McFarlane,
        position: Executive_SCCManager_Name,
      },
      {
        ...Executive_Profile_Timo_Francke,
        position: Executive_CommunicationManager_Name,
      },
      {
        ...Executive_Profile_James_Doull,
        position: Executive_SCCManager_Name,
      },
      {
        ...Executive_Profile_James_Doull,
        position: Executive_ProjectManager_Name,
      },
      {
        ...Executive_Profile_Josh_Hoeksta,
        position: Executive_Representative_Name,
      },
      {
        name: "Rachel Shaw",
        position: Executive_Representative_Name,
      },
      {
        name: "Gurtaz Bhang",
        position: Executive_Representative_Name,
      },
    ],
  },
  {
    header: "OCT 2014 EXECUTIVES",
    icon: Icons_ExecutiveList,
    date: "2014-10-08",
    description: (
      <>
        <div>
          New webmasters were needed to maintain the website so an internal
          election was held.
        </div>
        <div className="text-sm">
          Source: CSA Executive Meeting Minutes - October 8, 2014
        </div>
      </>
    ),
    executives: [
      {
        ...Executive_Profile_Timo_Francke,
        position: Executive_Webmaster_Name,
      },
      {
        ...Executive_Profile_Walter_JohnstoneBreen,
        position: Executive_Webmaster_Name,
      },
    ],
  },
  {
    header: "JAN 2015 EXECUTIVES",
    icon: Icons_ExecutiveList,
    date: "2015-01-30",
    description: (
      <>
        The duties of {Executive_FinanceOfficer_Name} were temporarily appointed
        by executives.{" "}
        <div className="text-sm">
          Source: CSA Executive Meeting Minutes - January 30, 2015
        </div>
      </>
    ),
    executives: [
      {
        ...Executive_Profile_John_Nightingale,
        position: Executive_FinanceOfficer_Name,
      },
    ],
  },

  {
    header: "LOGO CONTEST 2015",
    icon: <LucideImage />,
    date: "2015-08-1",
    description: (
      <>
        The CSA started a logo contest to replace the old logo for CISSA. The
        winner would receive a $150 gift certificate. Thanks to the CIS
        department for their $75 contribution.
        <div className="text-sm">
          Source: CSA Executive Meeting Minutes - June 26, 2015
        </div>
      </>
    ),
  },
  {
    header: "CSA ELECTIONS 2015",
    icon: Icons_ElectionResults,
    date: "2015-10-13",
    description: (
      <>
        <div>
          New and returning executives were elected during the 2015 AGM.
        </div>
        <div className="max-w-96">
          <Carousel className="mt-2">
            <CarouselPrevious className="static left-0 top-0 translate-y-0" />
            <CarouselNext className="static left-0 top-0 translate-y-0" />
            <CarouselContent>
              {ElectionFor2015.map((item, index) => (
                <CarouselItem key={index}>
                  <strong className="block">{item.position} Votes</strong>
                  {item.votes.map((vote) => (
                    <div key={vote}>{vote}</div>
                  ))}
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="text-sm mt-2">
            Note: Use the arrow buttons to view more election results.
          </div>
        </div>
        <div className="text-sm">
          Source: CSA AGM Minutes - October 13, 2015
        </div>
      </>
    ),
  },
  {
    header: "2015-2016 EXECUTIVES",
    icon: Icons_ExecutiveList,
    date: "2015-10-13",
    description: (
      <div className="text-sm">Source: CSA AGM Minutes - October 13, 2015</div>
    ),
    executives: [
      {
        ...Executive_Profile_James_Doull,
        position: Executive_President_Name,
      },
      {
        ...Executive_Profile_Joshua_Wilkie,
        position: Executive_VicePresident_Name,
      },
      {
        ...Executive_Profile_Graham_StEloi,
        position: Executive_FinanceOfficer_Name,
      },
      {
        ...Executive_Profile_Maxine_Cowan,
        position: Executive_Secretary_Name,
      },
      {
        ...Executive_Profile_Kevin_McFarlane,
        position: Executive_SCCManager_Name,
      },
      {
        ...Executive_Profile_Darren_Nixon,
        position: Executive_CommunicationManager_Name,
      },
      {
        ...Executive_Profile_Sean_Phillips,
        position: Executive_ProjectManager_Name,
      },
      {
        ...Executive_Profile_Atlee_Bols,
        position: Executive_Representative_Name,
      },
      {
        ...Executive_Profile_Bradbury_Keller,
        position: Executive_Representative_Name,
      },
      {
        ...Executive_Profile_Robin_Bains,
        position: Executive_Representative_Name,
      },
    ],
  },
  {
    header: "OCT 2015 EXECUTIVES",
    icon: Icons_ExecutiveList,
    date: "2015-10-27",
    description: (
      <>
        To revive the work on the website, a new {Executive_Webmaster_Name} was
        appointed.
        <div className="text-sm">
          Source: CSA Executive Meeting Minutes - October 27, 2015
        </div>
      </>
    ),
    executives: [
      {
        ...Executive_Profile_Walter_JohnstoneBreen,
        position: Executive_Webmaster_Name,
      },
    ],
  },
  {
    header: "CHILD'S PLAY GAMERTHON 2015",
    icon: <LucideGamepad2 />,
    date: "2015-11-06",
    description: (
      <>
        <div>
          This was the 8<sup>th</sup> annual Child&apos;s Play 24-hour gaming
          marathon which raised $4,338 of the $8,000 goal. The Cascade
          interviewed {Executive_Profile_Graham_StEloi.name} to discuss the
          importance of the fundraiser and what it means for CSA executives and
          members.
        </div>
        <div>
          <ExternalLink
            className="text-sm"
            href="https://ufvcascade.ca/childs-play-24-hour-gaming-marathon-puts-the-fun-in-fundraising"
            target="_blank"
          >
            Source: The Cascade &quot;Child&apos;s Play 24-hour gaming
            marathon...&quot;
          </ExternalLink>
        </div>
      </>
    ),
  },
  {
    header: "JAN 2016 EXECUTIVES",
    icon: Icons_ExecutiveList,
    date: "2016-01-21",
    description: (
      <>
        A new {Executive_CommunicationManager_Name} was appointed during an
        executive meeting.
        <div className="text-sm">
          Source: CSA Executive Meeting Minutes - January 21, 2016
        </div>
      </>
    ),
    executives: [
      {
        ...Executive_Profile_Atlee_Bols,
        position: Executive_CommunicationManager_Name,
      },
    ],
  },
  {
    header: "EXTRAORDINARY GENERAL MEETING 2016",
    icon: <LucideSpeech />,
    date: "2016-02-23",
    description: (
      <>
        <div>
          An Extraordinary General Meeting (EGM) was held to elect a new
          vice-president as{" "}
          <ExecutiveHistoryDisplayWithSocialLink
            executive={Executive_Profile_Joshua_Wilkie}
            showImage={false}
            showPosition={false}
          />{" "}
          was unavailable due to co-op.
        </div>
        <div className="text-sm">
          Source: CSA Meeting Minutes - February 4, 2016 (Executive) and
          February 28, 2016 (Extraordinary General)
        </div>
      </>
    ),
    executives: [
      {
        ...Executive_Profile_Tyler_McEnaney,
        position: Executive_VicePresident_Name,
      },
    ],
  },
  {
    header: "CSA ELECTIONS 2016",
    icon: Icons_ElectionResults,
    date: "2016-09-22",
    description: (
      <>
        <div>
          New and returning executives were elected during the 2016 AGM.
        </div>
        <div className="max-w-96">
          <Carousel className="mt-2">
            <CarouselPrevious className="static left-0 top-0 translate-y-0" />
            <CarouselNext className="static left-0 top-0 translate-y-0" />
            <CarouselContent>
              {ElectionFor2016.map((item, index) => (
                <CarouselItem key={index}>
                  <strong className="block">{item.position} Votes</strong>
                  {item.votes.map((vote) => (
                    <div key={vote}>{vote}</div>
                  ))}
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="text-sm mt-2">
            Note: Use the arrow buttons to view more election results.
          </div>
        </div>
        <div className="text-sm">
          Source: CSA AGM Minutes - September 22, 2016
        </div>
      </>
    ),
  },
  {
    header: "2016-2017 EXECUTIVES",
    icon: Icons_ExecutiveList,
    date: "2016-09-22",
    description: (
      <div className="text-sm">
        Source: CSA AGM Minutes - September 22, 2016
      </div>
    ),
    executives: [
      {
        ...Executive_Profile_James_Doull,
        position: Executive_President_Name,
      },
      {
        ...Executive_Profile_Tyler_McEnaney,
        position: Executive_VicePresident_Name,
      },
      {
        ...Executive_Profile_Graham_StEloi,
        position: Executive_FinanceOfficer_Name,
      },
      {
        ...Executive_Profile_Maxine_Cowan,
        position: Executive_Secretary_Name,
      },
      {
        ...Executive_Profile_Cody_Beaty,
        position: Executive_CommunicationManager_Name,
      },
      {
        ...Executive_Profile_Michael_Bennett,
        position: Executive_ProjectManager_Name,
      },
      {
        ...Executive_Profile_Kyle_Coraza,
        position: Executive_SCCManager_Name,
      },
      {
        name: "April (Jackson) Nickel",
        imageURL: `${Executive_Image_Path}April_Jackson.jpg`,
        linkedInUsername: `april-nickel`,
        position: Executive_Representative_Name,
      },
      {
        name: "Brandon Schouten",
        position: Executive_Representative_Name,
      },
      {
        ...Executive_Profile_Dennis_Semeniuk,
        position: Executive_Representative_Name,
      },
    ],
  },
  {
    header: "GAMES DAY 2016",
    icon: <LucideDices />,
    date: "2016-10-07",
    description: (
      <>
        <Carousel className="max-h-96 mt-2">
          <CarouselPrevious
            style={{
              zIndex: 100,
              marginLeft: 48,
            }}
          />
          <CarouselContent className="max-h-max">
            {[
              {
                src: "FacebookPoster.jpg",
                alt: "Facebook Poster",
              },
              {
                src: "FacebookBanner.jpg",
                alt: "Facebook Banner",
              },
              {
                src: "StartOfEvent.jpg",
                alt: "Start of event",
              },
            ].map((item) => (
              <CarouselItem
                key={item.src}
                className="bg-slate-700 text-center rounded-md"
              >
                <Image
                  className="max-h-96 w-auto mx-auto rounded-md"
                  src={`/History/Events/GamesDay2016/${item.src}`}
                  width={720}
                  height={360}
                  alt={item.alt}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext
            style={{
              zIndex: 100,
              marginRight: 48,
            }}
          />
        </Carousel>
        <div className="text-sm">
          Note: Use the arrow buttons to view more photos.
        </div>
        <div className="text-sm">Source: CSA Games Day 2016 Poster</div>
      </>
    ),
  },
  {
    header: "CHILD'S PLAY GAMERTHON 2016",
    icon: <LucideGamepad2 />,
    date: "2016-11-18",
    description: (
      <>
        <div>
          The 9<sup>th</sup> annual Child&apos;s Play 24-hour gaming marathon
          raised over $4,000 and was held in the Great Hall of the Student Union
          Building. Since the first fundraiser nine years ago, CISSA/CSA has
          raised over $20,000 in total, all of which has gone to help
          hospitalized children in Canada and around the world.
        </div>
        <Image
          className="max-h-96 rounded-md"
          src="/History/Events/ChildPlayGamerthon2016/GreatHall.jpg"
          width={720}
          height={360}
          alt="Student Union Great Hall"
        />
        <div className="text-sm">
          <ExternalLink
            href="https://ufvcascade.ca/childs-play-24-hour-gaming-marathon-puts-the-fun-in-fundraising"
            target="_blank"
          >
            Source: The Cascade &quot;Child&apos;s Play 24-hour gaming
            marathon...&quot;
          </ExternalLink>
          Source: CSA Executive Meeting Minute - June 28, 2016
        </div>
      </>
    ),
  },
  {
    header: "JAN 2017 EXECUTIVES",
    icon: Icons_ExecutiveList,
    date: "2017-01-22",
    // TODO: Add source link/meeting minute
    description: (
      <>
        <div>
          After expressed interest, {Executive_Profile_Joshua_Wilkie.name}{" "}
          became the second {Executive_SCCManager_Name}.
        </div>
        <div className="text-sm">
          Source: CSA Executive Meeting Minutes - January 21, 2017
        </div>
      </>
    ),
    executives: [
      {
        ...Executive_Profile_Joshua_Wilkie,
        position: Executive_SCCManager_Name,
      },
    ],
  },
  {
    header: "NEW WEBSITE AND LOGO 2017",
    icon: <LucideGlobe />,
    date: "2017-02-12",
    description: (
      <>
        <Link
          href={"https://web.archive.org/web/20170520031657/http://ufvcsa.ca/"}
          target="_blank"
        >
          <Image
            src={`/History/Logo/2017-2019.png`}
            width={256}
            height={80}
            alt="CSA 2017 to 2019 Logo"
          />
        </Link>
        <Link href={"/History/Website/2017-2019.png"} target="_blank">
          <Image
            className="rounded-md"
            src="/History/Website/2017-2019.png"
            width={720}
            height={360}
            alt="CSA 2017 to 2019 Website"
          />
        </Link>
        <div>
          <ExternalLink
            className="text-sm"
            href="https://web.archive.org/web/20170520031657/http://ufvcsa.ca/"
            target="_blank"
          >
            Source: CSA 2017 Website
          </ExternalLink>
        </div>
      </>
    ),
  },
  {
    header: "INTRODUCING DISCORD SERVER AND IRC",
    icon: <LucideSpeech />,
    date: "2017-05-16",
    description: (
      <>
        <div>
          To improve communications with CSA executives and members, a{" "}
          <ExternalLink href={AppDiscordInviteLink} target="_blank">
            Discord server
          </ExternalLink>{" "}
          was created with the help of{" "}
          <ExecutiveHistoryDisplayWithSocialLink
            executive={Executive_Profile_Tyler_McEnaney}
            showImage={false}
            showPosition={false}
          />
          .{" "}
          <ExecutiveHistoryDisplayWithSocialLink
            executive={Executive_Profile_Cody_Beaty}
            showImage={false}
            showPosition={false}
          />{" "}
          developed a Discord bot, &quot;CapsLock&quot; which aimed to assist
          with managing the Discord server.
        </div>
        <div className="mt-2">
          In addition, a dedicated{" "}
          <ExternalLink
            href="https://en.wikipedia.org/wiki/IRC"
            target="_blank"
          >
            IRC
          </ExternalLink>{" "}
          channel was introduced.
        </div>
        <div className="text-sm">
          Source: CSA Executive Meeting Minutes - May 16, 2017
        </div>
      </>
    ),
  },
  {
    header: "JUN 2017 EXECUTIVES",
    date: "2017-06-23",
    icon: Icons_ExecutiveList,
    description: (
      <>
        <div>
          As{" "}
          <ExecutiveHistoryDisplayWithSocialLink
            executive={Executive_Profile_James_Doull}
            showImage={false}
            showPosition={false}
          />{" "}
          had graduated, he resigned via written letter and{" "}
          <ExecutiveHistoryDisplayWithSocialLink
            executive={Executive_Profile_Tyler_McEnaney}
            showImage={false}
            showPosition={false}
          />{" "}
          became Acting President until elections.
        </div>
        <div className="text-sm">
          Source: CSA Executive Meeting Minutes - June 23, 2017
        </div>
      </>
    ),
    // TODO: Try obtain the formal letter?
    executives: [
      {
        ...Executive_Profile_Tyler_McEnaney,
        position: "Acting President",
      },
    ],
  },
  {
    header: "CSA ELECTIONS 2017",
    icon: Icons_ElectionResults,
    date: "2017-09-18",
    description: (
      <>
        <div>
          New and returning executives were elected during the 2017 AGM.
        </div>
        <div className="max-w-96">
          <Carousel className="mt-2">
            <CarouselPrevious className="static left-0 top-0 translate-y-0" />
            <CarouselNext className="static left-0 top-0 translate-y-0" />
            <CarouselContent>
              {ElectionFor2017.map((item, index) => (
                <CarouselItem key={index}>
                  <strong className="block">{item.position} Votes</strong>
                  {item.votes.map((vote) => (
                    <div key={vote}>{vote}</div>
                  ))}
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          <div className="text-sm mt-2">
            Note: Use the arrow buttons to view more election results.
          </div>
        </div>
      </>
    ),
  },
  {
    header: "2017-2018 EXECUTIVES",
    icon: Icons_ExecutiveList,
    date: "2017-09-18",
    description: (
      <ExternalLink
        className="text-sm"
        href="https://web.archive.org/web/20180812094133/http://ufvcsa.ca/about/"
        target="_blank"
      >
        Source: CSA AGM Minutes - September 18, 2017
      </ExternalLink>
    ),
    executives: [
      {
        ...Executive_Profile_Tyler_McEnaney,
        position: Executive_President_Name,
      },
      {
        ...Executive_Profile_Dennis_Semeniuk,
        position: Executive_VicePresident_Name,
      },
      {
        ...Executive_Profile_Maxine_Cowan,
        position: Executive_FinanceOfficer_Name,
      },
      {
        ...Executive_Profile_Cody_Beaty,
        position: Executive_Secretary_Name,
      },
      {
        name: "Michael Hines",
        imageURL: `${Executive_Image_Path}Michael_Hines.jpg`,
        linkedInUsername: `michael-hines-3462b517a`,
        position: Executive_CommunicationManager_Name,
      },
      {
        ...Executive_Profile_Michael_Bennett,
        position: Executive_ProjectManager_Name,
      },
      {
        ...Executive_Profile_Brandon_Schouten,
        position: Executive_Representative_Name,
      },
      {
        ...Executive_Profile_James_Purdey,
        position: Executive_Representative_Name,
      },
      {
        ...Executive_Profile_Kevin_McFarlane,
        position: Executive_Representative_Name,
      },
    ],
  },
  {
    header: "CSA INVITED TO CIS DEPARTMENT MEETINGS",
    date: "2017-10-14",
    icon: <LucideSpeech />,
    description: (
      <>
        Thanks to {Executive_Profile_Graham_StEloi.name}, we were invited to CIS
        department meetings which allowed the CSA to get better insights
        regarding activities of the CIS Department and the computing faculties.
      </>
    ),
    missingCitation: true,
  },
  {
    header: "CHILD'S PLAY GAMERTHON 2017 CANCELLED",
    date: "2017-11-17",
    icon: <LucideGamepad2 />,
    description: (
      <>
        <div>
          The 10<sup>th</sup> annual Child&apos;s Play 24-hour gaming marathon
          was planned for November 17. However, due to a change in SUS space
          booking policies, we were unable to get sufficient funding to rent the
          space in the Student Union Building to host the event. This marked the
          end of a nine year annual tradition held by CISSA/CSA in collaboration
          with Child&apos;s Play.
        </div>
        <div>
          <ExternalLink
            className="text-sm"
            href="https://ufvcascade.ca/sus-imposes-fees-on-charity-fundraisers"
            target="_blank"
          >
            Source: The Cascade &quot;SUS imposes fees on charity
            fundraisers&quot;
          </ExternalLink>
        </div>
      </>
    ),
  },
  {
    header: "Chilliwack.Tech /Next",
    icon: <LucideMegaphone />,
    date: "2017-11-18",
    description: (
      <div>
        This five hour event featured three 50-minute hands-on learning
        sessions, and a series of seven smaller &quot;lightning talks&quot;.
        Students got the opportunity to meet local industry members and
        partners.
        <div>
          <ExternalLink
            className="text-sm"
            target="_blank"
            href="https://web.archive.org/web/20181008195721/http://ufvcsa.ca/chilliwack-tech-next/"
          >
            Source: 2018 CSA Chilliwack.Tech /Next
          </ExternalLink>{" "}
          and{" "}
          <ExternalLink
            className="text-sm"
            target="_blank"
            href="https://chilliwack.tech/next"
          >
            Chilliwack.Tech /Next
          </ExternalLink>
        </div>
      </div>
    ),
  },
  {
    header: "NEW COMPUTERS FOR SCC",
    date: "2017-11-25",
    icon: <LucideComputer />,
    description: (
      <>
        Thanks to the CIS department, the SCC received new computers so the CSA
        could improve the peer-to-peer tutoring.
      </>
    ),
  },

  {
    header: "2018-2019 EXECUTIVES",
    icon: Icons_ExecutiveList,
    date: "2018-06-02",
    executives: [
      {
        ...Executive_Profile_Cody_Beaty,
        position: Executive_President_Name,
      },
    ],
    missingCitation: true,
    missingInformation: true,
  },
  {
    header: "COMPUTER SCIENCE MAJOR OFFERED",
    date: "2018-09-06",
    icon: <LucideScrollText />,
    description: (
      <>
        The Computer Science major was approved and offered for the first time
        in Fall 2018.
      </>
    ),
    missingCitation: true,
  },

  {
    header: "QUANTUM COMPUTING CENTRE",
    icon: <LucideComputer />,
    date: "2018-11-17",
    // TODO: Get promotional poster
    description: (
      <>
        In collaboration with the Physics Student Association, we welcomed guest
        speaker, Timothy Richards, a graduate of SFU&apos;s Silicon Quantum
        Technology Lab. <br />
        <br />
        Thanks to the Science Department for funding the event.
        <div>
          <ExternalLink
            className="text-sm"
            href="https://web.archive.org/web/20181008132701/http://ufvcsa.ca/quantum-computing-lecture/"
            target="_blank"
          >
            Source: 2018 CSA Quantum Computing Lecture
          </ExternalLink>{" "}
          and{" "}
          <ExternalLink
            className="text-sm"
            target="_blank"
            href="https://blogs.ufv.ca/science/2017/10/24/timothy-richards-sfu/"
          >
            Quantum Computing with UFV Alumnus
          </ExternalLink>
        </div>
      </>
    ),
  },
  {
    header: "2019-2020 EXECUTIVES",
    icon: Icons_ExecutiveList,
    date: "2019-05-01",
    executives: [
      {
        ...Executive_Profile_Cody_Beaty,
        position: Executive_President_Name,
      },
      {
        name: "William",
        position: Executive_Secretary_Name,
      },
    ],
    missingCitation: true,
    missingInformation: true,
  },
  {
    header: "NEW WEBSITE, DOMAIN, AND LOGO 2019",
    icon: <LucideGlobe />,
    date: "2019-09-01",
    description: (
      <>
        <div>
          Through collaboration with UFV and the System Administrator, Sergey
          Skobkarev, we migrated from{" "}
          <ExternalLink
            href="https://web.archive.org/web/20150401000000*/ufvcsa.ca"
            target="_blank"
          >
            ufvcsa.ca
          </ExternalLink>{" "}
          to{" "}
          <ExternalLink
            href="https://web.archive.org/web/20200501000000*/csa.ufv.ca"
            target="_blank"
          >
            csa.ufv.ca
          </ExternalLink>
          . With the new domain, we also redesigned the website and cleaned up
          the logo.
        </div>
        <div>
          <ExternalLink
            href="https://web.archive.org/web/20201026222531/https://csa.ufv.ca/"
            target="_blank"
          >
            Source: 2019 CSA Site
          </ExternalLink>
        </div>
        <Image
          src={`/History/Logo/2019-2022.png`}
          width={256}
          height={80}
          alt="CSA 2019 to 2022 Logo"
        />
        <Link
          className="block"
          href={"/History/Website/2019-2022.png"}
          target="_blank"
        >
          <Image
            className="rounded-md"
            src="/History/Website/2019-2022.png"
            width={720}
            height={360}
            alt="CSA 2019 to 2022 Website"
          />
        </Link>
      </>
    ),
  },
  {
    header: "2020-2021 EXECUTIVES",
    icon: Icons_ExecutiveList,
    date: "2020-05-01",
    executives: [
      {
        ...Executive_Profile_Michael_Bennett,
        position: "President",
      },
      {
        ...Executive_Profile_James_Purdey,
        position: Executive_ProjectManager_Name,
      },
      {
        name: "Andrew Foisey",
        position: Executive_Webmaster_Name,
      },
      {
        name: "Derek",
        position: "Unknown",
      },
      {
        name: "William",
        position: "Unknown",
      },
    ],
  },
  {
    header: "2021 SCHOOL OF COMPUTING DIRECTOR",
    icon: <LucideUserPlus />,
    date: "2021-05-01",
    description: (
      <>
        <div>
          <ExecutiveHistoryDisplayWithSocialLink
            executive={Executive_Profile_Carl_Janzen}
            showImage={false}
            showPosition={false}
          />
          , the 2005 CISSA {Executive_President_Name}, became the new Director
          of the School of Computing.
        </div>
        <div>
          <ExternalLink
            className="text-sm"
            href={`https://www.linkedin.com/in/${Executive_Profile_Carl_Janzen.linkedInUsername}`}
          >
            Source: Carl Janzen LinkedIn
          </ExternalLink>
        </div>
      </>
    ),
  },
  {
    header: "2021-2022 EXECUTIVES",
    icon: Icons_ExecutiveList,
    date: "2021-05-26",
    executives: [
      {
        ...Executive_Profile_Caleb_Langbroek,
        position: Executive_President_Name,
      },
      {
        name: "Aaron Creor",
        linkedInUsername: "aaroncreor",
        position: Executive_VicePresident_Name,
      },
      {
        name: "Rhys Leflar",
        linkedInUsername: "rhys-leflar-265629194",
        position: Executive_Secretary_Name,
      },
      {
        ...Executive_Profile_Zach_Griffin,
        position: Executive_FinanceOfficer_Name,
      },
      {
        ...Executive_Profile_Joshua_Edge,
        position: Executive_ProjectManager_Name,
      },
      {
        ...Executive_Profile_Joshua_Edge,
        position: Executive_CommunicationManager_Name,
      },
      {
        name: "Mykal Machon",
        imageURL:
          "https://cdn.sanity.io/images/aldsu8ui/production/ffb5fe68c41482a41b0d202bf1b5d08406fcc7eb-800x800.jpg",
        linkedInUsername: "mykalmachon",
        position: Executive_Webmaster_Name,
      },
    ],
  },
  {
    header: "NEW LOGO 2021",
    icon: <LucideImage />,
    date: "2021-10-25",
    description: (
      <>
        <div>Credits to Nathan Roberts for the new logo</div>
        <Image
          src={`/History/Logo/2022.png`}
          width={256}
          height={80}
          alt="CSA 2022 and later Logo"
        />
      </>
    ),
  },
  {
    header: "JAN 2022 EXECUTIVES",
    icon: Icons_ExecutiveList,
    date: "2022-01-01",
    description: (
      <>
        Since Caleb and Mykal were graduating, a new President and Webmaster
        were elected.
      </>
    ),
    executives: [
      {
        ...Executive_Profile_Zach_Griffin,
        position: Executive_President_Name,
      },
      {
        name: "Nitish Jaswal",
        position: Executive_Webmaster_Name,
      },
    ],
  },
  {
    header: "STUART BOWNESS - GUEST SPEAKER",
    icon: <LucideSpeech />,
    date: "2022-02-02",
    description: (
      <>
        <div className="mb-2">
          <ExternalLink
            href="https://www.linkedin.com/in/stuartbowness/"
            target="_blank"
          >
            Stuart Bowness
          </ExternalLink>
          , the Vice President at Workday, provided insight on the industry, how
          he got to where he was, and advice for undergraduates. He also took
          time to answer questions from students during the &quot;Ask me
          anything&quot; session.
        </div>
        <Image
          src="/History/Events/GuestSpeaker-Stuart_Bowness/Poster.jpg"
          width={320}
          height={320}
          alt={`Stuart Bowness Guest Speaker poster`}
        />
      </>
    ),
  },
  {
    header: "CSA Merchandise 2022",
    icon: <LucideShirt />,
    date: "2022-02-09",
    description: (
      <>
        <div>
          The CSA Merchandise for 2022 finally arrived after numerous unexpected
          delays.
        </div>
        <Image
          className="rounded-3xl"
          src="/History/Events/CSAMerch2022/Hoodie.jpg"
          width={256}
          height={256}
          alt="CSA Merchandise 2022"
        />
        <ExternalLink
          href={AppDiscordInviteLink}
          target="_blank"
          className="text-sm"
        >
          Source: CSA Discord Server
        </ExternalLink>
      </>
    ),
  },
  {
    header: "100 INSTAGRAM FOLLOWERS",
    icon: <SiInstagram />,
    date: "2022-02-28",
    description: <></>,
  },
  {
    header: "MAR 2022 EXECUTIVES",
    icon: Icons_ExecutiveList,
    date: "2022-03-02",
    description: (
      <div>
        Reese resigned from {Executive_Secretary_Name}. Alex volunteered to
        become {Executive_Secretary_Name}
      </div>
    ),
    executives: [
      {
        ...Executive_Profile_Alex_Kim,
        position: `Interm ${Executive_Secretary_Name}`,
      },
    ],
  },
  {
    header: "NEW WEBSITE 2022",
    icon: <LucideGlobe />,
    date: "2022-05-22",
    description: (
      <>
        <Link
          className="block"
          href={"/History/Website/2022-2024.png"}
          target="_blank"
        >
          <Image
            className="rounded-md"
            src="/History/Website/2022-2024.png"
            width={720}
            height={360}
            alt="CSA 2022 to 2024 Website"
          />
        </Link>
      </>
    ),
  },
  {
    header: "CSA ELECTIONS 2022",
    date: "2022-05-26",
    icon: Icons_ElectionResults,
    description: (
      <>
        <div>
          The elected candidates for the 2022-2023 {AppAbbreviationName}{" "}
          Executive team were announced.
        </div>
        <Carousel className="max-h-96 mt-2">
          <CarouselPrevious
            style={{
              zIndex: 100,
              marginLeft: 48,
            }}
          />
          <CarouselContent className="max-h-max">
            {ElectionFor2022And2023.map((positionResults) => (
              <CarouselItem
                key={positionResults.position}
                className="bg-slate-700 text-center rounded-md"
              >
                <Image
                  className="max-h-96 w-auto mx-auto rounded-md"
                  src={`/History/Events/CSAElections2022/${positionResults.imageFileName}`}
                  width={720}
                  height={360}
                  alt={`${positionResults.position} Results`}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext
            style={{
              zIndex: 100,
              marginRight: 48,
            }}
          />
        </Carousel>
        <div className="text-sm">
          Note: Use the arrow buttons to view more election results.
        </div>
      </>
    ),
  },
  {
    header: "2022-2023 EXECUTIVES",
    icon: Icons_ExecutiveList,
    date: "2022-05-26",
    description: <>Source: CSA Elections 2022</>,
    executives: [
      {
        ...Executive_Profile_Zach_Griffin,
        position: Executive_President_Name,
      },
      {
        name: "Navdeep Dhillon",
        linkedInUsername: "navdeepdhillon1",
        imageURL:
          "https://cdn.sanity.io/images/aldsu8ui/production/e3b332e82ade43b6bb68b15d400266bd4df5024f-600x600.jpg",
        position: Executive_VicePresident_Name,
      },
      {
        ...Executive_Profile_Alex_Kim,
        position: Executive_FinanceOfficer_Name,
      },
      {
        ...Executive_Profile_Akarshi_Sharma,
        position: Executive_CommunicationManager_Name,
      },
      {
        ...Executive_Profile_Henry_Majka,
        position: Executive_ProjectManager_Name,
      },
      {
        name: "Myles Wolfe",
        imageURL: `${Executive_Image_Path}Myles_Wolfe.jpg`,
        linkedInUsername: "myles-wolfe",
        position: Executive_Secretary_Name,
      },
      {
        name: "Brandon Cotten",
        position: Executive_Webmaster_Name,
      },
    ],
  },
  {
    header: "DEVIN GRIFFIN - GUEST SPEAKER",
    icon: <LucideSpeech />,
    date: "2022-11-29",
    description: (
      <>
        <div className="mb-2">
          <ExternalLink
            href="https://www.linkedin.com/in/devin-t-griffin/"
            target="_blank"
          >
            Devin Griffin
          </ExternalLink>
          , a Bachelor of Business Administration graduate from TRU, prepares
          and recruits candidates for positions within the biggest tech
          companies. During this guest speaker event, we got to hear more about
          his experiences and the best ways to showcase yourself to recruiters.{" "}
          <ExternalLink href="https://youtu.be/fqf5dEW7FOM" target="_blank">
            View presentation
          </ExternalLink>
        </div>
        <Image
          src="/History/Events/GuestSpeaker-Devin_Griffin/Poster.jpg"
          width={320}
          height={320}
          alt={`Devin Griffin Guest Speaker poster`}
        />
      </>
    ),
  },
  {
    header: "NEW FACULTY OF BUSINESS AND COMPUTING LAUNCHES",
    icon: <LucideScrollText />,
    date: "2023-02-28",
    description: (
      <>
        <div>Dr. Chris Schinckus is the inaugural dean.</div>
        <ExternalLink
          href="https://www.youtube.com/watch?v=vWefl3vkQlc"
          target="_blank"
        >
          View announcement video
        </ExternalLink>
      </>
    ),
  },
  {
    header: `${Executive_Profile_Caleb_Langbroek.name} - GUEST SPEAKER`,
    icon: <LucideSpeech />,
    date: "2023-03-23",
    description: (
      <>
        <div className="mb-2">
          Former CSA {Executive_President_Name} and alumni{" "}
          <ExecutiveHistoryDisplayWithSocialLink
            executive={Executive_Profile_Caleb_Langbroek}
            showImage={false}
            showPosition={false}
          />
          , who now works as a Software Engineer for Meta, covered a variety of
          topics during his guest appearance.{" "}
          <ExternalLink href="https://youtu.be/bunw9YqXjvU" target="_blank">
            View presentation
          </ExternalLink>
        </div>
        <Image
          src="/History/Events/GuestSpeaker-Caleb_Langbroek/Poster.png"
          width={320}
          height={320}
          alt={`${Executive_Profile_Caleb_Langbroek.name} Guest Speaker poster`}
        />
      </>
    ),
  },
  {
    header: "CSA ELECTIONS 2023",
    icon: Icons_ElectionResults,
    date: "2023-05-15",
    description: (
      <>
        <div>
          With a great turnout of CSA voters, the elected candidates for the
          2023-2024 {AppAbbreviationName} Executive team were announced.
        </div>
        <Carousel className="mt-2">
          <CarouselPrevious
            style={{
              zIndex: 100,
              marginLeft: 48,
            }}
          />
          <CarouselContent>
            {ElectionFor2022And2023.map((positionResults) => (
              <CarouselItem key={positionResults.position}>
                <Image
                  className="max-h-80 mx-auto rounded-md"
                  src={`/History/Events/CSAElections2023/${positionResults.imageFileName}`}
                  width={720}
                  height={360}
                  alt={`${positionResults.position} Results`}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext
            style={{
              zIndex: 100,
              marginRight: 48,
            }}
          />
        </Carousel>
        <div className="text-sm">
          Note: Use the arrow buttons to view more election results.
        </div>
      </>
    ),
  },
  {
    header: "2023-2024 EXECUTIVES",
    icon: Icons_ExecutiveList,
    date: "2023-05-15",
    description: <>Source: CSA Elections 2023</>,
    executives: [
      {
        ...Executive_Profile_Josh_Gourde,
        position: Executive_President_Name,
      },
      {
        ...Executive_Profile_Akarshi_Sharma,
        position: Executive_VicePresident_Name,
      },
      {
        ...Executive_Profile_Andrew_Majka,
        position: Executive_FinanceOfficer_Name,
      },
      {
        ...Executive_Profile_Sabreen_Gill,
        position: Executive_CommunicationManager_Name,
      },
      {
        ...Executive_Profile_Henry_Majka,
        position: Executive_ProjectManager_Name,
      },
      {
        name: "Ngan Phan",
        imageURL:
          "https://cdn.sanity.io/images/aldsu8ui/production/2e744be0ebaee2a12d4bd79a488c109fcf8e15ed-800x800.jpg",
        linkedInUsername: "ngan-phan-310875209",
        position: Executive_Secretary_Name,
      },
      {
        name: "Montek Kundan",
        imageURL:
          "https://cdn.sanity.io/images/aldsu8ui/production/0b83ef580e909dc59729d9e82016d92290bde265-800x800.jpg",
        linkedInUsername: "montekkundan",
        position: Executive_Webmaster_Name,
      },
    ],
  },
  {
    header: "SCC RENOVATIONS",
    date: "2023-06-03",
    icon: <LucideHammer />,
    description: (
      <>
        <div>
          The Student Computing Centre (SCC) in D224 received approval for
          renovations. The renovations were completed by March 15, 2024. Credits
          to Andrew and Henry Majka for the progress photos.
        </div>
        <Carousel className="mt-2">
          <CarouselPrevious
            style={{
              zIndex: 100,
              marginLeft: 48,
            }}
          />
          <CarouselContent>
            {SCC_Renovations.map((milestone) => (
              <CarouselItem
                key={milestone.status}
                className="bg-slate-700 text-center relative h-full w-full flex self-end"
              >
                <Image
                  className="w-full h-full max-w-max mx-auto block max-h-96"
                  src={`/History/Events/SCC_Renovations/${milestone.fileName}`}
                  width={720}
                  height={360}
                  alt={milestone.status ?? "SCC Renovation Image"}
                />
                <div className="absolute bottom-0 w-full text-nowrap bg-slate-700 py-1 max-sm:text-sm">
                  {milestone.status}
                  {milestone.date && (
                    <>
                      {" - "}
                      {milestone.date.toLocaleDateString(undefined, {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </>
                  )}
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext
            style={{
              zIndex: 100,
              marginRight: 48,
            }}
          />
        </Carousel>
        <div className="text-sm">
          Note: Use the arrow buttons to view more photos.
        </div>
      </>
    ),
  },
  {
    header: "UFV COMPETITIVE PROGRAMMING OCT/23",
    icon: <LucideKeyboard />,
    date: "2023-10-15",
    description: (
      <>
        <div>
          <InternalLink href="https://icpc.global/" target="_blank">
            ICPC
          </InternalLink>
          -inspired programming competition using C++, Java, or Python. 18
          students in six teams attempted to solve eight questions over three
          hours.{" "}
          <ExternalLink
            href="https://www.instagram.com/reel/Cycc1UzLyIm/"
            target="_blank"
          >
            Check it out
          </ExternalLink>
        </div>
        <div className="my-2">
          Thanks to Dr. Maryam Siahbani and Dr. Russell Campbell for
          facilitating the event and congratulations to team &quot;BRIKS&quot;
          (Kshitij Goyal, Ishwak Sharda, and{" "}
          {Executive_Profile_Samuel_Shull.name}) for earning 1st place.
        </div>
        <ExternalLink
          className="text-sm"
          href="https://www.linkedin.com/pulse/acm-international-collegiate-programing-contest-icpc-ufv-carl-janzen-lj9df/"
          target="_blank"
        >
          Source: ACM ICPC at UFV School of Computing
        </ExternalLink>
      </>
    ),
  },
  {
    header: "ICPC NA PACNW 2023",
    icon: <LucideAward />,
    date: "2024-02-24",
    description: (
      <>
        Team &quot;BRIKS&quot; (Kshitij Goyal, Ishwak Sharda, and{" "}
        {Executive_Profile_Samuel_Shull.name}), coached by Dr. Maryam Siahbani,
        represented UFV at the ICPC North America Pacific Northwest Regional in
        Division 2. They placed 25th out of 76 teams.
        <br />
        <ExternalLink
          href="https://www.youtube.com/watch?v=jU3-8AcMOkk"
          target="_blank"
        >
          Watch here
        </ExternalLink>
        <Link
          href="/History/Events/ICPC_NA_PACNW_2023/TheTeam.jpg"
          target="_blank"
          className="block"
        >
          <Image
            className="rounded-md max-h-64 w-auto"
            src="/History/Events/ICPC_NA_PACNW_2023/TheTeam.jpg"
            width={512}
            height={512}
            alt="The Team"
          />
        </Link>
        <div>
          <ExternalLink
            className="text-sm"
            target="_blank"
            href="https://www.linkedin.com/posts/kshitijgoyal7_represented-university-of-the-fraser-valley-activity-7167727575065190400-CF-R"
          >
            Source: Kshitij Goyal LinkedIn Post
          </ExternalLink>
        </div>
      </>
    ),
  },
  {
    header: "FAREWELL SCHOOL OF COMPUTING DIRECTOR",
    icon: <LucideUserMinus />,
    date: "2024-03-02",
    description: (
      <>
        <div>
          After three years, {Executive_Profile_Carl_Janzen.name} &quot;wrapped
          up [his] responsibilities as Director for the School of Computing, and
          prepare[d] to resume [his] teaching role again.&quot;
        </div>

        <ExternalLink
          className="text-sm"
          href="https://www.linkedin.com/feed/update/urn:li:activity:7169533210354278401/"
          target="_blank"
        >
          Source: {Executive_Profile_Carl_Janzen.name} LinkedIn Post
        </ExternalLink>
      </>
    ),
  },
  {
    header: "TECH PANEL & CAREER FAIR 2024",
    icon: <LucideArmchair />,
    date: "2024-03-14",
    description: (
      <>
        <div>
          In collaboration with CECE (Center for Experiential and Career
          Education), this 2-hour tech panel consisted of six industry
          professionals answering questions from computing students. After the
          tech panel, there was a Career Fair with organisations from all over
          the Fraser Valley.
        </div>
        <div className="mt-2">
          Left to right:{" "}
          <ExternalLink
            href="https://www.linkedin.com/in/curtis-joiner-099139a4/"
            target="_blank"
          >
            Curtis Joiner (Cascade Aerospace)
          </ExternalLink>
          ,{" "}
          <ExternalLink
            href="https://www.linkedin.com/in/kim-lawrence-575ba1/"
            target="_blank"
          >
            Kim Lawrence (Ideon Technologies)
          </ExternalLink>
          ,{" "}
          <ExternalLink
            href="https://www.linkedin.com/in/mohammedbearingwala/"
            target="_blank"
          >
            Mohammed Bearingwala (UFV IT Services)
          </ExternalLink>
          ,{" "}
          <ExternalLink
            href="https://www.linkedin.com/in/opeyemiadetutu"
            target="_blank"
          >
            Opeyemi Adetutu (Amazon)
          </ExternalLink>
          ,{" "}
          <ExternalLink
            href="https://www.linkedin.com/in/wimkerkhoff/"
            target="_blank"
          >
            Wim Kerkhoff (Kerkhoff Technologies)
          </ExternalLink>
          , and{" "}
          <ExternalLink
            href="https://www.linkedin.com/in/colin-schmidt/"
            target="_blank"
          >
            Colin Schmidt (Zynim)
          </ExternalLink>
        </div>
        <Image
          className="max-h-72 w-auto h-auto rounded-md"
          src={`/History/Events/TechPanel/MembersOfThePanel.jpg`}
          width={720}
          height={360}
          alt="Members of the panel"
        />
      </>
    ),
  },
  {
    header: "CSA MERCHANDISE 2024",
    icon: <LucideShirt />,
    date: "2024-03-16",
    description: (
      <>
        <div>
          With many hours of designing and hundreds of variations, the final
          merchandise designs were publicly announced.
        </div>
        <Carousel className="max-w-[384px] mt-2">
          <CarouselPrevious
            style={{
              zIndex: 100,
              marginLeft: 48,
            }}
          />
          <CarouselContent className="max-h-max">
            <CarouselItem>
              <Image
                className="max-h-72 w-auto mx-auto rounded-md"
                src={`/History/Events/CSAMerch2024/Glitch.jpg`}
                width={720}
                height={360}
                alt="Glitch logo merchandise"
              />
            </CarouselItem>
            <CarouselItem>
              <Image
                className="max-h-72 w-auto mx-auto rounded-md"
                src={`/History/Events/CSAMerch2024/Pixelated.jpg`}
                width={720}
                height={360}
                alt="Pixelated logo merchandise"
              />
            </CarouselItem>
            <CarouselItem className="flex items-center">
              <Image
                className="max-h-72 w-auto mx-auto rounded-md"
                src={`/History/Events/CSAMerch2024/FinalMerchImages.jpg`}
                width={720}
                height={360}
                alt="Final merchandise images"
              />
            </CarouselItem>
          </CarouselContent>
          <CarouselNext
            style={{
              zIndex: 100,
              marginRight: 48,
            }}
          />
        </Carousel>
        <div className="text-sm">
          Note: Use the arrow buttons to view more photos.
        </div>
      </>
    ),
  },
  {
    header: "NEW WEBSITE 2024",
    icon: <LucideGlobe />,
    date: "2024-04-12",
    description: (
      <>
        After over two years of no website updates,{" "}
        {Executive_Profile_Samuel_Shull.name} volunteered to redesign the
        website in March and it was released about a month later.
        <Link
          className="block"
          href={"/History/Website/2024_1.jpg"}
          target="_blank"
        >
          <Image
            className="rounded-md"
            src="/History/Website/2024.png"
            width={720}
            height={1080}
            alt="CSA 2024 and later Website"
          />
        </Link>
      </>
    ),
  },
  {
    header: "FIELD TRIP TO CHINA",
    icon: <LucidePlane />,
    date: "2024-04-14",
    description: (
      <>
        <div>
          This two week field trip course led by Dr. Frank Zhang explored the
          technology and environment of China. Our VP,{" "}
          {Executive_Profile_Akarshi_Sharma.name} (Far right), had a great time.
          Hosted by{" "}
          <ExternalLink href="http://huas.admissions.cn/" target="_blank">
            Hunan University of Arts and Science
          </ExternalLink>
          .
        </div>
        <Link
          href="/History/Events/FieldTripToChina/TheGroup2.jpg"
          target="_blank"
          className="block"
        >
          <Image
            className="max-h-64 w-auto rounded-md"
            src="/History/Events/FieldTripToChina/TheGroup2.jpg"
            width={512}
            height={348}
            alt="The group of students and instructors"
          />
        </Link>
        <ExternalLink
          className="text-sm"
          target="_blank"
          href="https://www.linkedin.com/posts/boris-massesa_ufv-activity-7190120218566766592-bYBw"
        >
          Source: Boris Massesa LinkedIn Post
        </ExternalLink>
      </>
    ),
  },
  {
    header: "2024 SCHOOL OF COMPUTING DIRECTOR",
    icon: <LucideUserPlus />,
    date: "2024-05-16",
    description: (
      <>
        Opeyemi Adesina, a chairman for the Industry Partnerships and professor
        for the School of Computing at UFV, became the new Director of the
        School of Computing.
        <div>
          <ExternalLink
            className="text-sm"
            target="_blank"
            href="https://www.linkedin.com/posts/opeyemioadesina_congratulations-are-in-order-as-i-attain-activity-7196789488545599488-DjA6?utm_source=share&utm_medium=member_desktop"
          >
            Source: Opeyemi Adesina LinkedIn Post
          </ExternalLink>
        </div>
      </>
    ),
  },
  {
    header: "SKILLS CANADA BC 2024",
    icon: <LucideMedal />,
    date: "2024-04-17",
    description: (
      <>
        This annual competition hosted at TradeX in Abbotsford puts students
        skills to the test.
        <br />
        <br />
        Congratulations to Andrew and {Executive_Profile_Henry_Majka.name} who
        placed 2nd and 3rd in the IT Network Systems Administration category.{" "}
        <ExternalLink
          href="https://skillscanada.bc.ca/competitions/provincial-competitions/2024-skills-canada-british-columbia-provincial-competition-medal/"
          target="_blank"
        >
          View all results
        </ExternalLink>
        <div>
          <Image
            className="max-h-64 w-auto rounded-md"
            src={"/History/Events/SkillsCanadaBC/Top3.jpg"}
            width={512}
            height={512}
            alt="The top 3 podium at Skills Canada BC for IT Networking"
          />
        </div>
        <ExternalLink
          className="text-sm"
          href="https://www.linkedin.com/posts/joelgalbraith_skillscanada-okanagancollege-activity-7186590482125283328-HCc7"
          target="_blank"
        >
          Source: Joel Galbraith (1st place) LinkedIn Post
        </ExternalLink>
      </>
    ),
  },
  {
    header: "CSA ELECTIONS 2024",
    icon: Icons_ElectionResults,
    date: "2024-05-14",
    description: (
      <>
        <div>
          After weeks of nominations, campaigns, and voting, we welcomed the
          2024-2025 {AppAbbreviationName} Executive team.
        </div>
        <Carousel className="max-h-96 mt-2">
          <CarouselPrevious
            style={{
              zIndex: 100,
              marginLeft: 48,
            }}
          />
          <CarouselContent className="max-h-max">
            {ElectionFor2024.map((positionResults) => (
              <CarouselItem
                key={positionResults.position}
                className="bg-slate-700 text-center rounded-md"
              >
                <Image
                  className="max-h-96 w-auto mx-auto rounded-md"
                  src={`/History/Events/CSAElections2024/${positionResults.imageFileName}`}
                  width={720}
                  height={360}
                  alt={`${positionResults.position} Results`}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext
            style={{
              zIndex: 100,
              marginRight: 48,
            }}
          />
        </Carousel>
        <div className="text-sm">
          Note: Use the arrow buttons to view more election results.
        </div>
      </>
    ),
  },
  {
    header: "2024-2025 EXECUTIVES",
    date: "2024-05-14",
    icon: Icons_ExecutiveList,
    executives: [
      {
        ...Executive_Profile_Sabreen_Gill,
        position: Executive_President_Name,
      },
      {
        ...Executive_Profile_Samuel_Shull,
        position: Executive_VicePresident_Name,
      },
      {
        name: "Mason Paquette",
        linkedInUsername: "mason-paquette",
        imageURL:
          "https://cdn.sanity.io/images/aldsu8ui/production/a06fba826b264c102a9dea6a5bd9204fbd182a1c-3980x3980.jpg",
        position: Executive_Secretary_Name,
      },
      {
        name: "Simranjit Singh",
        linkedInUsername: "simranjit-singh-9aa15a246",
        position: Executive_Treasurer_Name,
        imageURL: `https://cdn.sanity.io/images/aldsu8ui/production/f894eef5221d1f304920599e04d6c6a7b8e1c053-656x656.jpg`,
      },
      {
        name: "Krish Manchanda",
        linkedInUsername: "krish-manchanda-23a08b285",
        position: Executive_CommunicationManager_Name,
        imageURL: `https://cdn.sanity.io/images/aldsu8ui/production/0b2295873bb784762d1fe441d5d3f82aca9f4701-167x167.jpg`,
      },
    ],
  },
  // TODO: Fix display on mobile
  {
    header: "CSA STARTUP HACKATHON",
    date: "2024-05-17",
    icon: <LucideKeyboard />,
    description: (
      <>
        <div>
          In collaboration with CHILLIWACK.TECH and numerous sponsors, the CSA
          was able run a Startup Hackathon for students interested in business,
          user experience, and/or technology. With 21 participants, each team
          developed a technology-based business plan and project over the span
          of 24 hours.
        </div>
        <div className="my-2">
          The winner team, &quot;Maid In Canada&quot;, received $1250 to start
          the business with the mentorship of XLRator, the Chilliwack Innovation
          Network, and the Esposito Family Centre for Innovation &
          Entrepreneurship.
        </div>
        <div className="mb-2">
          <ExternalLink href="https://youtu.be/lGQZgU-H7Fs" target="_blank">
            View presentations
          </ExternalLink>
        </div>
        <div className="text-sm">
          <ExternalLink
            href="https://chilliwack.tech/Hackathon"
            target="_blank"
          >
            Source: Chilliwack.Tech Startup Hackathon
          </ExternalLink>
          , and{" "}
          <ExternalLink
            href="https://blogs.ufv.ca/blog/2024/05/ufvs-computing-student-association-hosts-startup-hackathon-may-17/"
            target="_blank"
          >
            UFV Today Blog: CSA Hosts Startup Hackathon
          </ExternalLink>
        </div>
        <Carousel>
          <CarouselPrevious className="static left-0 top-0 translate-y-0" />
          <CarouselNext className="static left-0 top-0 translate-y-0" />
          {/* <CarouselPrevious
            style={{
              zIndex: 100,
              marginLeft: 48,
            }}
          /> */}
          <CarouselContent className="w-full">
            <CarouselItem className="w-full">
              <Image
                className="w-full rounded-md"
                src={`/History/Events/CSAHackathon2024/Thumbnail.jpg`}
                width={720}
                height={360}
                alt="Sponsors: Chilliwack Economic Partners, Community Futures South Fraser, XLRATOR, Zynim, Greenhouse Games, Pocket Piñata Interactive, H2 Portable, Community Futures Stó:lō, Impresario, Crafty Penguins, TopLeft, Werkchain, Cowork Chilliwack, the University of the Fraser Valley (UFV), the UFV Esposito Family Centre for Innovation & Entrepreneurship, the UFV School of Computing, and the UFV Computing Student Association (CSA)."
              />
            </CarouselItem>
            <CarouselItem className="h-full w-full relative">
              <Image
                className="w-full h-full block max-h-96 rounded-md"
                src={`/History/Events/CSAHackathon2024/MaidInCanadaTeam.jpg`}
                width={720}
                height={360}
                alt="Maid In Canada Team"
              />
              <div className="max-sm:text-sm">
                Winning team, &quot;Maid In Canada&quot; by Rishab and Mehak
                Manocha
              </div>
            </CarouselItem>
            <CarouselItem className="h-full w-full relative">
              <Image
                className="w-full h-full block max-h-96 rounded-md"
                src={`/History/Events/CSAHackathon2024/NativeTongueTranslator.jpg`}
                width={720}
                height={360}
                alt="Native Tongue Translator Team"
              />
              <div className="max-sm:text-sm">
                Runner-up team, &quot;Native Tongue Translator&quot; by
                Guranshvir Singh Gill, Raghav Sharma, and Shaurya Sharma
              </div>
            </CarouselItem>
            <CarouselItem>
              <div>
                <strong className="block text-lg">Judges</strong>
                <strong>Dave Leger</strong>: Founder, CEO of H2 Portable, and
                Founder of Loop Energy
                <br />
                <strong>Joseph Willmott</strong>: Senior Associate of Impresario
                Partners
                <br />
                <strong>Nichole Read</strong>: General Manager of Community
                Futures South Fraser
                <br />
                <strong>Jonathon McIntyre</strong>: CTO of i-Open Group
                <br />
                <strong>Rocio Zielinski</strong>: General Manager of Stó:lō
                Community Futures
              </div>
            </CarouselItem>
            <CarouselItem>
              <div>
                <strong className="block text-lg">Mentors</strong>
                <strong>Dave Leger</strong>: Founder, CEO of H2 Portable, and
                Founder of Loop Energy
                <br />
                <strong>Joseph Willmott</strong>: Senior Associate of Impresario
                Partners
                <br />
                <strong>Tim McAlpine</strong>: Owner of Cowork Chilliwack, and
                Chair of the Chilliwack Innovation Network
                <br />
                <strong>Colin Schmidt</strong>: Founder, CEO of Zynim and
                Wisebox Solutions
                <br />
                <strong>Sam Wolfe</strong>: Software Development Manager of
                TopLeft
                <br />
              </div>
            </CarouselItem>
            <CarouselItem className="w-full">
              <Image
                className="w-full rounded-md"
                src={`/History/Events/CSAHackathon2024/ColinWithATeam.JPG`}
                width={720}
                height={360}
                alt="Colin Schmidt and Dave Leger with Team MATRIX"
              />
            </CarouselItem>
            <CarouselItem className="w-full">
              <Image
                className="w-full rounded-md"
                src={`/History/Events/CSAHackathon2024/OverviewOfEvent.JPG`}
                width={720}
                height={360}
                alt="Overview of attendees"
              />
            </CarouselItem>
            <CarouselItem className="w-full">
              <Image
                className="w-full rounded-md"
                src={`/History/Events/CSAHackathon2024/Team_ItsBazaar.JPG`}
                width={720}
                height={360}
                alt="Team It's Bazaar"
              />
            </CarouselItem>
            <CarouselItem className="w-full">
              <Image
                className="w-full rounded-md"
                src={`/History/Events/CSAHackathon2024/Team_CentCheck.JPG`}
                width={720}
                height={360}
                alt="Team CentCheck"
              />
            </CarouselItem>
            <CarouselItem className="w-full">
              <Image
                className="w-full rounded-md"
                src={`/History/Events/CSAHackathon2024/Team_Matrix.JPG`}
                width={720}
                height={360}
                alt="Team MATRIX"
              />
            </CarouselItem>
            <CarouselItem className="w-full">
              <Image
                className="w-full rounded-md"
                src={`/History/Events/CSAHackathon2024/Team_TiffinBox.JPG`}
                width={720}
                height={360}
                alt="Team Tiffin Box"
              />
            </CarouselItem>
            <CarouselItem className="w-full">
              <Image
                className="w-full rounded-md"
                src={`/History/Events/CSAHackathon2024/Judges.JPG`}
                width={720}
                height={360}
                alt="Judges"
              />
            </CarouselItem>
          </CarouselContent>
          {/* <CarouselNext
            style={{
              zIndex: 100,
              marginRight: 48,
            }}
          /> */}
        </Carousel>
        <div className="text-sm">
          Note: Use the arrow buttons to view more photos.
        </div>
      </>
    ),
  },
];
