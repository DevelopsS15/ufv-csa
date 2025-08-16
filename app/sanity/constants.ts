export const allCampusOptions: {
    value: string;
    title: string;
    referenceLink?: string;
}[] = [
    { value: "A", title: "Abbotsford", referenceLink: "https://www.ufv.ca/maps/abbotsford-campus/" },
    { value: "CEP", title: "Canada Education Park", referenceLink: "https://www.ufv.ca/maps/chilliwack-campus/" },
    { value: "C", title: "Chilliwack" },
    { value: "CC", title: "Clearbrook Centre", referenceLink: "https://www.ufv.ca/maps/clearbrook-centre/" },
    { value: "H", title: "Hope", referenceLink: "https://www.ufv.ca/maps/hope-centre/" },
    { value: "I", title: "Online" },
    { value: "M", title: "Mission", referenceLink: "https://www.ufv.ca/maps/mission-campus/" },
    { value: "O", title: "Off-Campus" },
] as const;