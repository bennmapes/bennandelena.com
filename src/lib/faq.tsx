import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Ban, Check, Info } from "lucide-react";
import confusedGif from "../assets/pulp-fiction-confused.gif";

const questions = [
  {
    question: "What should I bring to camp?",
    answers: [
      "A sleeping bag or blanket if possible!",
      "Comfy walking shoes",
      "Comfy dancing shoes!",
      "A flashlight or headlamp",
      "A towel",
      "Sunscreen",
      "Warm layers (wool)",
      "Waterproof layers",
      "Swimsuit",
      "Bugspray",
    ],
    icon: "check",
  },
  {
    question: "Are children invited?",
    answers: [
      "Yes! We're so excited to have your little ones join us. Please let us know if you're bringing any children so we can plan accordingly.",
    ],
    icon: "info",
  },
  {
    question: "What kind of attire is this affair?",
    answers: [
      "Festive or Casual attire and grass friendly shoes will be just perfect.",
    ],
    icon: "info",
  },
  {
    question: "Will the wedding be indoors or outdoors?",
    answers: [
      "The wedding will be primarily outdoors, weather permitting. The ceremony will take place on the lawn at Tamarack Farm. The reception dinner will be indoors in the farmhouse, with dancing in an outdoor covered area, the Dance Barn, located next to the farmhouse.",
    ],
    icon: "info",
  },
  {
    question: "What shouldn’t I bring to camp?",
    answers: ["Pets", "Drugs", "Alcohol (don’t worry, we’ve got you covered!)"],
    icon: "ban",
  },
  {
    question: "Will there be food for people with dietary restrictions?",
    answers: [
      "Yes, we plan to offer a variety of foods to accommodate everyone attending, including vegetarian, gluten-free, and dairy-free options. If you have specific allergens or dietary needs, please contact Benn or Elena, and we’ll do our best to ensure you have something to eat!",
    ],
    icon: "info",
  },
  {
    question: "Where should we park for the weekend?",
    answers: [
      "There’s some parking behind the farmhouse, and some out front of the farmhouse - these are great for unloading or vehicles you want easy access to. Feel free to drop off overnight gear at the farmhouse and then move your car to the apple orchard parking lot.",
    ],
    icon: "info",
  },
  {
    question: "How about getting home after the party? ",
    answers: ["We’re working on organizing a shuttle for guests. Stay tuned!"],
    icon: "info",
  },
  {
    question: "Where is your registry?",
    answers: [
      "Just kidding! Your presence is the best gift, just bring yourselves and your dancing shoes!",
    ],
    gif: confusedGif,
  },
  {
    question: "A few camp rules to note…",
    answers: [
      "All waterfront activities on F&W property require a certified lifeguard. We’ll set aside a block of time when a lifeguard is around so we can swim or explore the lake via canoe. If you enter the lake from an F&W access point without a lifeguard on duty, you will be fined.",
      "F&W requires that we keep any drinking to a few designated areas: the main lodge/ dining hall & surrounding porch and immediate lawn area, as well as the dance barn and recreation lodge. No alcohol is permitted on the main road, in parking areas, cabins/sleeping spaces or areas below the main road (lake side) including the waterfront areas.",
    ],
    icon: "info",
  },
  {
    question: "What about the weather?",
    answers: [
      "No guarantees on what the weather will bring yet, but we do tend to see some rain this time of year. Temperatures can be anywhere between 70°F during the day to 40°F at night. Keep an eye on the weather for Plymouth, VT (or Killington) in the weeks leading up to the wedding for a better understanding.",
    ],
    icon: "info",
  },
];

function Icon({ icon = "check", size = 10, ...props }) {
  return (
    <>
      {icon === "info" && <Info size={size} {...props} />}
      {icon === "check" && <Check size={size} {...props} />}
      {icon === "ban" && <Ban size={size} {...props} />}
    </>
  );
}

export function FAQ({ ...props }) {
  return (
    <div {...props}>
      <Accordion type="multiple" className="max-w-md mx-auto pt-5">
        {questions.map((question, index) => (
          <AccordionItem key={index} value={String(index)}>
            <AccordionTrigger className="text-xl">
              {question.question}
            </AccordionTrigger>
            <AccordionContent>
              <ul>
                {question.answers.map((answer, index) => (
                  <li
                    key={index}
                    className="items-center text-left pb-3 text-lg"
                  >
                    {question.gif && <img src={question.gif}></img>}

                    {question.icon && (
                      <>
                        <Icon
                          icon={question.icon}
                          className="float-left mr-3 w-3.5 h-3.5 mt-1 flex-shrink-0 top-0"
                        />{" "}
                      </>
                    )}
                    <p className="flex flex-row">{answer}</p>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
