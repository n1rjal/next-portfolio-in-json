"use client";
import Hero from "@/components/hero";
import { getBaseUrlByHost } from "./blog/utils";
import { useProfileStore } from "@/context/data-store";

export default function Home() {
  return (
    <div>
      <Hero />
    </div>
  );
}
