import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import tamarackFarmOpenAir from "/src/assets/photos/accomidations/tamarak_farm_open_air.png";
import tamarackFarmOpenAir2 from "/src/assets/photos/accomidations/tamarak_farm_open_air2.png";
import tamarackFarmhouse from "/src/assets/photos/accomidations/tamarak_farmhouse.png";
import tamarackFarmhouse2 from "/src/assets/photos/accomidations/tamarak_farmhouse2.png";
import farmMap from "../assets/map-tamarack-farm.jpg";

import { ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "./utils";

export const accomidationsInfo = {
  title: "Accommodation at the Farm",
  description:
    "Please see below for a detailed description of what accommodations are available to us.",
  link: {
    url: "https://docs.google.com/spreadsheets/d/1zz5Gydsoz9slDYpn0SBqzUg3Fy__5d2y5W6TgKUkQP4/edit?usp=sharing",
    text: "Please use this accommodations spreadsheet to reserve your spot!",
  },
  footer: "We would love for all of you to stay with us on the farm!",
  accomidations: [
    {
      location: "Tamarack Farmhouse",
      images: [tamarackFarmhouse, tamarackFarmhouse2],
      description:
        "Indoor heated spaces with electric. These are located on the top floor, and basement of the large farmhouse where the reception will be held. This might be good for families with little ones that need to be monitored, or anyone wishing to have access to a flushing toilet. All the beds are single bunks with mattress pads.",
      spaces: [
        { name: "Yellow room", spaces: 6 },
        { name: "Pink room", spaces: 4 },
        { name: "Orange room", spaces: 6 },
        { name: "Grey room", spaces: 8 },
        { name: "Basement bunkroom", spaces: "12-14" },
      ],
    },
    {
      location: "Open Air Cabins",
      images: [tamarackFarmOpenAir, tamarackFarmOpenAir2],
      description:
        "3-sided open air cabins. These have wooden bunk beds (unless otherwise described), in various sized cabins. All the beds have mattress pads available. Toilets are nearby at all cabins, these are composting outhouses. Showers are also in open air cabins.",
      spaces: [
        { name: "Mandalay", spaces: 12 },
        { name: "Ye- Old Inn", spaces: 12 },
        { name: "Innisfree", spaces: 10 },
        { name: "Pendragon", spaces: 12 },
        { name: "Penc", spaces: 12 },
        { name: "Split", spaces: 6 },
        { name: "Lothlorien", spaces: 6 },
        { name: "Pheonix", spaces: 8 },
        { name: "Pegasus", spaces: 9 },
        {
          name: "Pandelon",
          spaces: "2-3 (double bed inside, double on porch)",
        },
        { name: "Regadot", spaces: "2-3 (double bed inside, single on porch)" },
        { name: "Satilla", spaces: 10 },
        { name: "Silkwood", spaces: "3-4" },
        { name: "Yurt", spaces: "1-2" },
        {
          name: "Jewel weed",
          spaces: "2 (two sides, one single bed per side.)",
        },
        { name: "Uler", spaces: "2 (two separate spaces, 1 bed per space)" },
      ],
    },
    {
      location: "Enclosed Cabins",
      description:
        "These are cabins, or stand alone spaces that are fully enclosed, some cabins have electricity. This would be good for families or friend groups to share if they don't want to be fully out in the open air. There is no visual of these cabins but they are simple enclosed cabins with netting for bugs on any decks. Toilets are nearby all of them, these toilets are composting outhouses.",
      spaces: [
        {
          name: "Duplex",
          spaces:
            "4 (Electric, fully enclosed- Two attached cabins each with two singles)",
        },
        { name: "Sugar Tree", spaces: "6 (Fully enclosed with electric)" },
        {
          name: "Hicks Hilton",
          spaces: "2 (double bed, fully enclosed, electric)",
        },
      ],
    },
  ],
};

export function AccomidationsInfo({ buttonText = "Read More!", ...props }) {
  const [open, setOpen] = useState(false);

  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
    newWindow?.focus();
  };
  return (
    <Dialog
      open={open}
      onOpenChange={(open) => {
        setOpen(open);
      }}
    >
      <DialogTrigger
        className={cn("cursor-pointer", buttonVariants({ variant: "default" }))}
        onClick={() => setOpen(!open)}
      >
        {buttonText}
        <ChevronRightIcon className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent
        className={
          "lg:max-w-screen-lg overflow-y-scroll max-h-screen no-scrollbar"
        }
      >
        <DialogHeader>
          <DialogTitle className="text-4xl">
            Accommodation at the Farm
          </DialogTitle>
        </DialogHeader>
        <div {...props}>
          <p>{accomidationsInfo.description}</p>
          <p className="flex justify-center pt-2">
            <a
              className={cn(
                "cursor-pointer",
                buttonVariants({ variant: "default" })
              )}
              onClick={() => openInNewTab(accomidationsInfo.link.url)}
            >
              {accomidationsInfo.link.text}
              <ChevronRightIcon className="h-4 w-4" />
            </a>
          </p>
          <img className="rounded-lg m-2" src={farmMap} alt="Camp Map" />
          <br />
          {accomidationsInfo.accomidations.map((accomidation, index) => (
            <div key={index}>
              <h3 className="text-2xl">{accomidation.location}</h3>
              <p>{accomidation.description}</p>
              <div className="flex flex-wrap">
                {(accomidation.images ?? []).map((image, index) => (
                  <img
                    key={index}
                    className="rounded-lg max-h-80 m-2"
                    src={image}
                    alt=""
                  />
                ))}
              </div>
              <ul className="list-disc pl-5 list-inside">
                {accomidation.spaces.map((space, index) => (
                  <li key={index}>
                    <span className="font-bold">{space.name}</span>:{" "}
                    {space.spaces}
                  </li>
                ))}
              </ul>
              <br />
            </div>
          ))}
          <p>{accomidationsInfo.footer}</p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
