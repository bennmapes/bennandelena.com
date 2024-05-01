import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import farmMap from "../assets/map-tamarack-farm.jpg";
import { cn } from "./utils";

export const dailyEvents = [
  {
    title: "Friday, September 20th",
    events: [
      {
        time: "Afternoon",
        description:
          "Arrive on Friday (if you'd like!) to help us set the stage for the weekend and embrace the great outdoors.",
      },
      {
        time: "5:00 pm - Evening",
        description:
          "Welcome dinner and campfire! We'll have a casual evening of food, drinks, and catching up with friends and family.",
      },
    ],
  },
  {
    title: "Saturday, September 21st",
    events: [
      {
        time: "3:00 pm",
        description: "Join us for a heartfelt ceremony on the farmhouse lawn",
      },
      { time: "4:00 pm", description: "Photos, cocktails, and games" },
      { time: "6:00 pm", description: "Reception dinner in the farmhouse" },
      { time: "Evening", description: "Dance party in the barn" },
      {
        time: "Late Night",
        description:
          "Campfire and s'mores! For those staying overnight, prepare for a truly rustic experience. It’s all part of the adventure!",
      },
    ],
  },
  {
    title: "Sunday, September 22nd",
    events: [
      {
        time: "9:00 am",
        description:
          "A casual farewell, sharing stories of the past days' festivities.",
      },
    ],
  },
];

export function DailySchedule({ ...props }) {
  return (
    <div {...props}>
      <div className="-my-4 divide-y text-gray-500">
        <h3 className="text-lg">Stay tuned for more details! </h3>
      </div>
      {dailyEvents.map((day, index) => {
        return (
          <section className="antialiased text-left" key={index}>
            <div className="max-w-screen-xl px-4 py-8 mx-auto lg:px-3 sm:py-8 lg:py-12">
              <div className="max-w-3xl mx-auto text-left">
                <h3 className="text-2xl font-extrabold leading-tight tracking-tight text-gray-900 dark:text-white">
                  {day.title}
                </h3>
              </div>
              <div className="flow-root max-w-3xl mx-auto mt-8 sm:mt-12 lg:mt-16">
                <div className="-my-4 divide-y divide-gray-200 dark:divide-gray-700">
                  {day.events.map((event, index) => (
                    <div
                      className="flex flex-col gap-2 py-4 sm:gap-6 sm:flex-row sm:items-center"
                      key={index}
                    >
                      <p className="w-32 text-lg font-normal text-gray-500 sm:text-left dark:text-gray-400 shrink-0 text-left">
                        {event.time}
                      </p>
                      <h4 className="text-base text-lg font-semibold text-gray-900 dark:text-white hover:underline text-left">
                        {event.description}
                      </h4>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
      })}
      <Accordion type="single" collapsible className="mx-auto">
        <AccordionItem value="map">
          <AccordionTrigger className={cn("cursor-pointer w-3/6 text-center ")}>
            <span className="text-2xl">View Map of Tamarack Farm</span>
          </AccordionTrigger>
          <AccordionContent>
            <img src={farmMap} alt="Camp Map" />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
