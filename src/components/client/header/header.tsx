"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "../../ui/navbar-menu";
import { cn } from "lib/utils";

export function Header() {
  const [isDarkTheme, setIsDarkTheme] = useState(true); // Assuming you want to enable dark theme by default

  return (
    <div
      className={`relative flex w-full items-center justify-center ${isDarkTheme ? "dark" : ""}`}
    >
      <Navbar className={`top-3 ${isDarkTheme ? "dark" : ""}`} />
    </div>
  );
}

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  return (
    <div
      className={cn("fixed inset-x-0 top-10 z-50 mx-auto max-w-2xl", className)}
    >
      <Menu setActive={setActive}>
        <MenuItem setActive={setActive} active={active} item="About">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/about">About Me</HoveredLink>
            <HoveredLink href="/contact">Contact</HoveredLink>
          </div>
        </MenuItem>
        <MenuItem setActive={setActive} active={active} item="Skills">
          <div className="flex flex-col space-y-4 text-sm">
            <HoveredLink href="/skills">My Skills</HoveredLink>
            <HoveredLink href="/projects">My Projects</HoveredLink>
          </div>
        </MenuItem>
        <HoveredLink href="/blog">My Blog</HoveredLink>
      </Menu>
    </div>
  );
}
