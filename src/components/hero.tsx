"use client";
import { useProfileStore } from "@/context/data-store";
import React, { useEffect } from "react";

const Hero = () => {
  const { setData, setHost, host, data } = useProfileStore(
    ({ host, setHost, setData, data }) => ({
      host,
      data,
      setHost,
      setData,
    })
  );

  useEffect(() => {
    if (!host) setHost(window.location.host);
    if (!data) setData(window.location.host);
  }, []);

  return (
    <div className="grid-row2 h-100vh">
      <div className="grid-2 max-w-5v">
        <div className="text-2xl">{data?.info.name.toUpperCase()}</div>
        <div className="text-red-600">{data?.info.title}</div>
        <div className="">{data?.info.location}</div>
      </div>
    </div>
  );
};

export default Hero;
