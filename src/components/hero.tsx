"use client";
import { getBaseUrlByHost } from "@/app/blog/utils";
import { useProfileStore } from "@/context/data-store";
import React, { useEffect } from "react";

const Hero = () => {
  const { setData, setHost } = useProfileStore((state) => ({
    setHost: state.setHost,
    setData: state.setData,
  }));

  useEffect(() => {
    const hostValue = getBaseUrlByHost(window.location.hostname);
    setHost(hostValue.hostname);
    setData(hostValue.hostname);
  }, []);

  return (
    <div className="grid-row2 h-100vh">
      <div>{}</div>
    </div>
  );
};

export default Hero;
