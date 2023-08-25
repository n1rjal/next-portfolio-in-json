"use client";
import { useProfileStore } from "@/context/data-store";
import React, { useEffect } from "react";
import Image from "next/image";

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

  if (!data) return <></>

  if (!data?.info) return "LOADING....";

  return (
    <div className="container">
      <div
        className="
        grid grid-cols-2 gap-x-[1cm] justify-around grid-flow-row place-items-center max-w-5v h-[100%]
      "
      >
        <div className="max-w-[400px]">
          <div className="my-[10px]">
            <div className="text-sm font-bold">{data?.info.headline}</div>
            <div className="name">{data?.info.name}</div>
            <div>
              {data?.info.title}{" "}
              {data?.info.location ? `, ${data?.info.location}` : ""}
            </div>
          </div>
          <div className="my-[10px]">
            {data?.info?.description?.map((text) => {
              return (
                <div className="my-[10px] text-[16px]" key={text}>
                  {text}
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <Image
            className="rounded-full"
            src={data?.info.photo}
            alt={data?.info.name}
            width={200}
            height={200}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
