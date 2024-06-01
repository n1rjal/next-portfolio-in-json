"use client";
import Hero from "@/components/hero";
import Project from "@/components/project";
import Skills from "@/components/skills";
import Work from "@/components/work";
import React from "react";
import Head from 'next/head'



export default function Home() {
  return (
    <div> 
      <Head>
        <meta name="google-adsense-account" content="ca-pub-2089553262384227">
      </Head>
      <Hero />
      <Work />
      <Project />
      <Skills />
    </div>
  );
}
