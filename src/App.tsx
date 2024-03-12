import "./App.css";
import { ThemeProvider } from "@/components/theme-provider";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

import { Button } from "@/components/ui/button";

import { useRef } from "react";
import { useMediaQuery } from "./hooks/use-media-query";
import {
  DrawerContent,
  DrawerTrigger,
  Drawer,
  DrawerHeader,
  DrawerClose,
} from "./components/ui/drawer";
import { ArrowLeft, MenuIcon } from "lucide-react";
import { cn } from "./lib/utils";

import { DailySchedule } from "./lib/dailySchedule";
import { OurStory } from "./lib/ourStory";
import { Accomidations } from "./lib/accomidations";
import { RSVP } from "./lib/rsvp";
import { FAQ } from "./lib/faq";
import { SectionBreak } from "./lib/sectionBreak";
import { GettingThere } from "./lib/gettingThere";
import CampfireIcon from "./assets/icons/campfire.svg";
import FlagIcon from "./assets/icons/flag.svg";
import MapIcon from "./assets/icons/map.svg";
import TentIcon from "./assets/icons/tent.svg";
import QuestionIcon from "./assets/icons/question mark.svg";
import MarshmallowIcon from "./assets/icons/marshmallows.svg";
import { PhotoCarousel } from "./lib/photoCarousel";
import bgImage from "./assets/graphics.svg";
import headerImage from "./assets/photos/photo5.jpg";

function App() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const navMenuClasses = "flex justify-center items-center text-2xl cursor-pointer";
  const headerClasses = "text-4xl font-bimbo text-center pt-5 pb-7";
  const headerIconClasses = "h-10 w-10 float-left";
  const headerIconContainer = "flex justify-center items-center pb-5";
  const homeRef = useRef<HTMLDivElement>(null);
  const usRef = useRef<HTMLDivElement>(null);
  const directionsRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);
  const accomidationsRef = useRef<HTMLDivElement>(null);
  const rsvpRef = useRef<HTMLDivElement>(null);
  const faqRef = useRef<HTMLDivElement>(null);

  /** Define High level structure here */
  const menuData = [
    {
      title: "Our Story",
      ref: usRef,
    },
    {
      title: "A Weekend at Camp!",
      ref: scheduleRef,
    },
    {
      title: "Travel",
      ref: directionsRef,
    },
    {
      title: "Accommodations",
      ref: accomidationsRef,
    },
    {
      title: "FAQ",
      ref: faqRef,
    },
    {
      title: "RSVP",
      ref: rsvpRef,
    },
  ];

  const handleScrollRef = (ref: React.RefObject<HTMLDivElement>) => {
    if (!ref?.current) return;
    ref.current.scrollIntoView({ behavior: "smooth" });
  };

  const renderMainMenu = () => {
    return isDesktop ? (
      <div className="flex justify-center items-center text-2xl">
        <NavigationMenu
          className="pb-8 font-calibre-light"
          orientation="horizontal"
        >
          <NavigationMenuList>
            {menuData.map((item, index) => (
              <NavigationMenuItem key={index}>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle(), navMenuClasses)}
                  onClick={() => handleScrollRef(item.ref)}
                >
                  {item.title}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
            <div className="flex-grow h-16"></div>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    ) : (
      <Drawer direction="left">
        <DrawerTrigger>
          <MenuIcon />
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerClose>
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Close
              </Button>
            </DrawerClose>
          </DrawerHeader>
          <NavigationMenu className="pb-8" orientation="vertical">
            <NavigationMenuList data-orientation="vertical">
              {menuData.map((item, index) => (
                <NavigationMenuItem key={index}>
                  <DrawerClose>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        navMenuClasses
                      )}
                      onClick={() =>
                        setTimeout(() => handleScrollRef(item.ref), 400)
                      }
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </DrawerClose>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </DrawerContent>
      </Drawer>
    );
  };

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      {/* <ModeToggle className="justify-self-end" /> */}
      {renderMainMenu()}
      <h1 className="font-bimbo text-8xl mt-10 relative z-10">Benn + Lenny</h1>
      {/* <div
        ref={homeRef}
        className="w-dvh h-100 flex  flex-1  grow items-center justify-center grayscale"
        style={{
          backgroundImage: `url("/src/assets/photos/IMG_2844.jpg")`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "top center",
          backgroundSize: "100%",
        }}
		
      > */}
      <div
        ref={homeRef}
        className="w-dvh flex  flex-1  grow items-center justify-center grayscale z-0 rounded-lg overflow-hidden"
      >
        <img src={headerImage}></img>
      </div>

      <SectionBreak />

      <h1
        className={headerClasses}
        style={{ fontFamily: "BimboWhiteboard" }}
        ref={usRef}
      >
        <div className={headerIconContainer}>
          <img src={CampfireIcon} className={headerIconClasses} />
        </div>{" "}
        Our Story
      </h1>
      <OurStory className="text-left" />
      <PhotoCarousel isDesktop={isDesktop} />

      <SectionBreak />

      <div ref={scheduleRef}>
        <h1 className={headerClasses} style={{ fontFamily: "BimboWhiteboard" }}>
          <div className={headerIconContainer}>
            <img src={FlagIcon} className={headerIconClasses} />{" "}
          </div>
          A Weekend At Camp
        </h1>
      </div>
      <DailySchedule />

      <SectionBreak />

      <h1
        className={headerClasses}
        style={{ fontFamily: "BimboWhiteboard" }}
        ref={directionsRef}
      >
        <div className={headerIconContainer}>
          <img src={MapIcon} className={headerIconClasses} />
        </div>{" "}
        Getting There{" "}
      </h1>
      <GettingThere />

      <SectionBreak />

      <h1
        className={cn(headerClasses, "pb-5")}
        style={{ fontFamily: "BimboWhiteboard" }}
        ref={accomidationsRef}
      >
        <div className={headerIconContainer}>
          <img src={TentIcon} className={headerIconClasses} />
        </div>
        Accommodations{" "}
      </h1>
      <Accomidations isDesktop={isDesktop} />

      <SectionBreak />

      <h1
        className={headerClasses}
        style={{ fontFamily: "BimboWhiteboard" }}
        ref={faqRef}
      >
        <div className={headerIconContainer}>
          <img src={QuestionIcon} className={headerIconClasses} />
        </div>
        Frequently Asked Questions
      </h1>
      <FAQ />

      <SectionBreak />

      <h1
        className={headerClasses}
        style={{ fontFamily: "BimboWhiteboard" }}
        ref={rsvpRef}
      >
        <div className={headerIconContainer}>
          <img src={MarshmallowIcon} className={headerIconClasses} />
        </div>
        rsvp
      </h1>

      <SectionBreak />
      <RSVP className="pt-5" />
      <img
        src={bgImage}
        className="sticky bottom-0 h-full w-full bg-image -mt-2"
      />
    </ThemeProvider>
  );
}

export default App;
