import { object } from "zod";
import UnderConstruction from "../../components/client/under_construction/under_construction";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";

interface Skill {
  SkillName: string;
  SkillDescription: string;
}

interface SkillsMap {
  Skill: Skill;
}

export default function SkillsPage(): React.ReactNode {
  const mySkills: SkillsMap[] = [
    {
      Skill: {
        SkillName: "Computer Networking",
        SkillDescription:
          "I have experience with using Cisco routers and switches and configuring it for use in a small office / home office setting.",
      },
    },
    {
      Skill: {
        SkillName: "System Administration",
        SkillDescription: "",
      },
    },
    {
      Skill: {
        SkillName: "Web Development & Programming",
        SkillDescription:
          "I have experience working with the C# programming language making CLI apps for Windows as well as apps with a user interface using Windows Forms. I have experience using Python to work with REST API's. I also have experience with using HTML, CSS, and JavaScript to make simple websites.",
      },
    },
    {
      Skill: {
        SkillName: "Database Management",
        SkillDescription:
          "I have experience working SQL and using Postgresql as a database. I know how to do some database management tasks such as creating tables, and views, as well as dropping them. I also have some experience with designing small scale databases and making Entity Relationship diagrams.",
      },
    },
  ];

  const skillsElement = mySkills.map((skill, index) => {
    return (
      <AccordionItem key={index} value={index.toString()}>
        <AccordionTrigger>
          <h2 className="text-lg font-bold">{skill.Skill.SkillName}</h2>
        </AccordionTrigger>
        <AccordionContent>
          <p className="p-2">{skill.Skill.SkillDescription}</p>
        </AccordionContent>
      </AccordionItem>
    );
  });

  return (
    <>
      <div className="m-20" />
      {/* <UnderConstruction /> */}
      <div className="mb-10 ml-20 mr-20">
        <h2 className="relative p-4 font-sans text-4xl font-semibold tracking-tight text-black dark:text-white">
          My Skills Are:
        </h2>
        <Accordion
          type="multiple"
          className="rounded-md bg-slate-700 bg-opacity-40 p-5"
        >
          {skillsElement}
        </Accordion>
      </div>
    </>
  );
}
