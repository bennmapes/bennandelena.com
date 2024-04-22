import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { CarFront, Plane } from "lucide-react";
import { cn } from "./utils";

export function GettingThere({ ...props }) {
  return (
    <div {...props}>
      <section>
        <div className="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6">
          <div className="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-2 md:gap-12 md:space-y-0">
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 lg:h-12 lg:w-12 mx-auto">
                <Plane size={35} className="flex-shrink-0" />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">
                By Plane: A few options!
              </h3>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Burlington International Airport is about 2 hours driving.
                <br />
                Boston Logan International Airport is about 2 hours 45 minutes
                driving. <br />
                Montréal-Pierre Elliott Trudeau International Airport is about 3
                hours 45 minutes driving. <br />
              </p>
            </div>
            <div>
              <div className="flex justify-center items-center mb-4 w-10 h-10 lg:h-12 lg:w-12 mx-auto">
                <CarFront size={35} className="flex-shrink-0" />
              </div>
              <h3 className="mb-2 text-xl font-bold dark:text-white">By car</h3>
              <p className="text-lg text-gray-500 dark:text-gray-400">
                Follow I-93 N and I-89 N to US-4 W/Woodstock Rd in Hartford.
                <br />
                Take exit 1 from I-89 N. Continue on US-4 W. <br />
                Drive to Farm And Wilderness Rd in Plymouth.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Accordion type="single" collapsible className="w-full mx-auto">
        <AccordionItem value="map">
          <AccordionTrigger className={cn("cursor-pointer w-3/6 text-center ")}>
            <span className="text-2xl">View in Google Maps</span>
          </AccordionTrigger>
          <AccordionContent>
            {/* <img src={farmMap} alt="Camp Map" /> */}
            <iframe
              className="w-full min-h-[400px]"
              loading="lazy"
              allowFullScreen
              referrerPolicy="no-referrer-when-downgrade"
              src="https://www.google.com/maps/embed/v1/place?key=AIzaSyCFLBUknGCoWgtXgRWWWZ9kJYWUmWJYywI&q=869+Farm+And+Wilderness+Rd,+Plymouth,+VT+05056,+USA"
            ></iframe>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}
