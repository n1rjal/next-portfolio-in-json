"use client";
import { useProfileStore } from "@/context/data-store";
import { getFavicon } from "@/utils/getFavicon";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const NavBar = () => {
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

  if (!data) return <></>;

  return (
    <div className="absolute top-0 left-0 max-w-screen w-screen bg-white grid grid-cols-2 py-[10px] gap-x-5 justify-between align-middle">
      <div className="flex grid-rows-1 justify-center gap-x-[20px] py-[5px]">
        {data &&
          data.socials &&
          Object.entries(data.socials).map(([key, value]) => (
            <span key={key + value}>
              <Link key={key} href={value} className="">
                <Image
                  src={getFavicon(value)}
                  alt={key}
                  width={25}
                  height={25}
                />
              </Link>
            </span>
          ))}
      </div>
      <div className="flex grid-rows-1 justify-center gap-x-[20px] py-[5px]">
        {data &&
          data.socials &&
          Object.entries(data.contacts).map(([key, value]) => (
            <span key={key + value}>
              <Link key={key} href={value} className="p-3 bg-yellow-400">
                {key}
              </Link>
            </span>
          ))}
      </div>
    </div>
  );
};

export default NavBar;
