"use client";
import Hero from "@/components/hero";
import Project from "@/components/project";
import Skills from "@/components/skills";
import Work from "@/components/work";
import React from "react";

export default function Home() {
  return (
    <div>
      <Hero />
      <Work />
      <Project />
      <Skills />
    </div>
  );
}
