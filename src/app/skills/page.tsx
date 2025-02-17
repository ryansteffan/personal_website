import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import React from "react";

interface Skill {
  SkillName: string;
  SkillDescription: React.JSX.Element;
}

interface SkillsMap {
  Skill: Skill;
}

export default function SkillsPage(): React.ReactNode {
  const mySkills: SkillsMap[] = [
    {
      Skill: {
        SkillName: "Computer Networking",
        SkillDescription: (
          <>
            <p>
              I have experience working with Cisco routers and switches to
              configure secure small to medium sized networks using technologies
              such as:
            </p>
            <ul className="list-inside list-disc space-y-2 pl-2 pt-3">
              <li>IPv4 and IPv6</li>
              <li>VLANs and InterVLAN Routing</li>
              <li>Static Routing and Dynamic routing with OSPF</li>
              <li>Designing fault tolerant networks</li>
              <li>NAT</li>
              <li>Access Control Lists and Port Security</li>
              <li>DHCP</li>
            </ul>
            <p className="pt-3">
              Additionally I have experience working with pfSense firewalls
              implementing many of the same technologies.
            </p>
          </>
        ),
      },
    },
    {
      Skill: {
        SkillName: "System Administration",
        SkillDescription: (
          <>
            <p className="">
              I have experience with working with Windows and Linux server
              operating systems:
            </p>
            <ul className="list-inside list-disc space-y-2 pl-2 pt-3">
              <li>Windows Server</li>
              <li>Ubuntu Server</li>
              <li>Debian 12</li>
              <li>Proxmox Hypervisor</li>
            </ul>
            <p className="pt-3">
              I have experience with configuring and managing services such as:
            </p>
            <ul className="list-inside list-disc space-y-2 pl-2 pt-3">
              <li>Active Directory</li>
              <li>Group Policy</li>
              <li>SMB File Sharing</li>
              <li>VPN</li>
              <li>DNS</li>
              <li>Database Servers (MySQL, MSSQL)</li>
              <li>Virtualization (Proxmox)</li>
              <li>Docker</li>
            </ul>
            <p className="pt-3">
              I am also familiar with installing, maintaining, and upgrading
              computer hardware, such as Laptops and Desktop Computers.
            </p>
          </>
        ),
      },
    },
    {
      Skill: {
        SkillName: "Web Development & Programming",
        SkillDescription: (
          <>
            <h2 className="text-lg underline">Languages that I know:</h2>
            <ul className="list-inside list-disc space-y-2 pl-2 pt-3">
              <li>Python</li>
              <li>C#</li>
              <li>PHP</li>
              <li>HTML/CSS</li>
              <li>JavaScript/TypeScript</li>
              <li>SQL</li>
              <li>Bash</li>
            </ul>
            <h2 className="pt-3 text-lg underline">Web Development:</h2>
            <p className="pt-3">
              I have experience working with various web development
              technologies:
            </p>
            <ul className="list-inside list-disc space-y-2 pl-2 pt-3">
              <li>NextJS & React</li>
              <li>TailwindCSS</li>
              <li>DrizzleORM</li>
              <li>NextAuth</li>
            </ul>
            <h2 className="pt-2 text-lg underline">Application Development:</h2>
            <p className="pt-3">
              I have experience writing server software and client applications:
            </p>
            <ul className="list-inside list-disc space-y-2 pl-2 pt-3">
              <li>Working with TCP/UDP Sockets in Python</li>
              <li>Building UI&apos;s in .NET and C#</li>
              <li>Working with Async Code in C# and Python</li>
            </ul>
            <p className="pt-3">
              I am also familiar with Bash scripting and writing
              Dockerfile&apos;s.
            </p>
          </>
        ),
      },
    },
    {
      Skill: {
        SkillName: "Database Management",
        SkillDescription: (
          <>
            <p>I am familiar with Postgresql and Microsoft SQL Server.</p>
            <p className="pt-3">I have experience:</p>
            <ul className="list-inside list-disc space-y-2 pl-2">
              <li className="pt-3">Creating Databases</li>
              <li>Writing SQL Queries</li>
              <li>Creating Stored Procedures and Functions (SQLServer)</li>
              <li>Creating and Managing Users</li>
              <li>Creating and Managing Roles</li>
            </ul>
          </>
        ),
      },
    },
  ];

  const skillsElement = mySkills.map((skill, index) => {
    return (
      <AccordionItem
        key={index}
        value={index.toString()}
        className="border-slate-400"
      >
        <AccordionTrigger>
          <h2 className="text-xl font-bold">{skill.Skill.SkillName}</h2>
        </AccordionTrigger>
        <AccordionContent>{skill.Skill.SkillDescription}</AccordionContent>
      </AccordionItem>
    );
  });

  return (
    <>
      <div className="m-14" />
      {/* <UnderConstruction /> */}
      <div className="mb-10 ml-32 mr-32">
        <h2 className="relative p-4 font-sans text-4xl font-semibold tracking-tight text-black dark:text-white">
          My Skills Are:
        </h2>
        <Accordion
          type="single"
          className="rounded-md bg-slate-700 bg-opacity-40 p-5"
        >
          {skillsElement}
        </Accordion>
      </div>
    </>
  );
}
