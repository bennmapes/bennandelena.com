export const ourStory = [
  {
    date: "February 1989",
    title: "Elena Touches Down",
    story: "Elena arrives on earth on a cold February day in Calgary.",
  },
  {
    date: "August 1990",
    title: "Benn's Earthly Debut",
    story:
      "Benn is beamed down from his spaceship, making a grand entrance in a quaint town in New Hampshire.",
  },
  {
    date: "February 2019",
    title: "Escape Room Encounter",
    story:
      "During an evening of escape rooms with friends in Vancouver, Benn meets Elena. They didn't escape the room, or each other!",
  },
  {
    date: "March 2019",
    title: "First Date Ventures: More Than Just Dinner",
    story:
      "Benn and Elena go on a date! Unfortunately for Benn, it’s just dinner and not backcountry skiing.",
  },
  {
    date: "2020",
    title: "Quarantine Chronicles: Love in Lockdown",
    story:
      "Benn and Elena discover that it's pretty fun being stuck at home together. Keeping it local, they go hiking, camping, they make experimental lasagna, they ride bikes to watch the sunset at the beach, and they spend evenings hanging out with their animal roomies Wookie and Picha.",
  },
  {
    date: "2021",
    title: "New Beginnings in North Vancouver",
    story:
      "Adios Lushdome! Benn, Elena and Picha move to North Vancouver together, where their love for each other and for outdoor adventures really thrives. They spend weekends in the forest -  chasing each other around bike trails or sliding down snow-covered mountains. Sometimes they stay up way too late dancing to live music and sometimes they curl up on the couch for a movie.",
  },
  {
    date: "2022",
    title: "Milestones and Growth: Building Dreams Together",
    story:
      "Elena passes her Architectural exams, while Benn's company expands, necessitating a new office—a year of professional triumphs and personal growth.",
  },
  {
    date: "2023",
    title: "The Proposal Expedition: Iceland, Morocco, and a Question",
    story:
      "Benn and Elena go on a big trip to Iceland and Morocco and somewhere in there they decide to get married!",
  },
  {
    date: "September 21st 2024",
    title: "A Stellar Celebration",
    story:
      "Benn and Elena get MARRIED! Surrounded by friends and family in the beautiful Vermont countryside.",
  },
];

export function OurStory({ ...props }) {
  return (
    <div {...props}>
      <ol className="relative border-s border-gray-200 dark:border-gray-700">
        {ourStory.map((storyEvent, index) => (
          <li key={index} className="mb-10 ms-4">
            <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
            <time className="mb-1 text-lg font-normal leading-none text-gray-400 dark:text-gray-500">
              {storyEvent.date}
            </time>
            {/* <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {storyEvent.title}
            </h3> */}
            <p className="mb-4 text-base text-lg  font-normal text-gray-500 dark:text-gray-400">
              {storyEvent.story}
            </p>
          </li>
        ))}
      </ol>
    </div>
  );
}
