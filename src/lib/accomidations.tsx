import { buttonVariants } from "@/components/ui/button";
import { ChevronRightIcon } from "lucide-react";
import { cn } from "./utils";
import tamarackFarm  from "/src/assets/photos/accomidations/tamarak_farm.png";
import inAtWatersEdge from "/src/assets/photos/accomidations/waters-edge.jpeg";
import woodstockInn from "/src/assets/photos/accomidations/woodstock_inn.jpg";

export const accomidations = [
  {
    name: "Tamarack Farm",
    address_line_1:
      "Camp out with us! Prepare for the charm of outdoor living! While these three-sided lean-to's are as rustic as they come, on a clear night they are million-star hotels.",
    address_line_2: "",
    image: tamarackFarm,
  },
  {
    name: "The Inn at Water's Edge",
    address_line_1: "45 Kingdom Rd",
    address_line_2: "Ludlow, VT 05149",
    image: inAtWatersEdge,
    website: "https://www.innatwatersedge.com/",
  },
  {
    name: "Woodstock Inn & Resort",
    address_line_1: "14 The Green",
    address_line_2: "Woodstock, VT 05091",
    image: woodstockInn,
    website: "https://www.woodstockinn.com/",
  },
  // {
  //   name: "VRBO",
  //   address_line_1: "Plymouth VT",
  //   address_line_2: "",
  //   image: "/src/assets/photos/accomidations/house.png",
  //   website: "https://www.vrbo.com/en-ca/search?adults=4&d1=2024-09-20&d2=2024-09-22&destination=Plymouth%2C%20Vermont%2C%20United%20States%20of%20America&endDate=2024-09-22&regionId=146918&semdtl=&sort=RECOMMENDED&startDate=2024-09-20&theme=&userIntent=",
  // },
  // {
  //   name: "Airbnb",
  //   address_line_1: "Plymouth VT",
  //   address_line_2: "",
  //   image: "/src/assets/photos/accomidations/house.png",
  //   website: "https://www.airbnb.com/s/Plymouth--Vermont--United-States/homes?tab_id=home_tab&refinement_paths[]=%2Fhomes&flexible_trip_lengths[]=one_week&monthly_start_date=2024-04-01&monthly_length=3&monthly_end_date=2024-07-01&price_filter_input_type=0&channel=EXPLORE&date_picker_type=calendar&place_id=ChIJU1xKrEYt4IkRpAPL1S40yOM&query=Plymouth%2C%20Vermont%2C%20United%20States&checkin=2024-09-20&checkout=2024-09-22",
  // },
];

export function Accomidations({ isDesktop = true, ...props }) {
  return (
    <div
      {...props}
      // className={cn("flex", isDesktop && "flex-row", !isDesktop && "flex-col")}
      className="flex flex-col md:flex-row m-3"
    >
      {accomidations.map((location, index) => (
        <div
          key={index}
          className={cn(
            "max-w-sm bg-white border border-gray-200 rounded-lg  dark:bg-gray-800 dark:border-gray-700",
            isDesktop && "mr-10",
            !isDesktop && "mb-5"
          )}
        >
          <img className="rounded-t-lg max-h-80" src={location.image} alt="" />

          <div className="p-5">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {location.name}
            </h5>

            {location.address_line_1 && (
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {location.address_line_1}
              </p>
            )}
            {location.address_line_2 && (
              <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                {location.address_line_2}
              </p>
            )}
            {location.website && (
              <a
                className={buttonVariants({ variant: "outline" })}
                href={location.website}
              >
                Visit Website
                <ChevronRightIcon className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
