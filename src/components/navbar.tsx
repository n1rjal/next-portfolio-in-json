"use client";
import { useProfileStore } from "@/context/data-store";
import React, { useEffect } from "react";

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
    <div className="relative top-0 left-0 w-[100%] max-w-[100%] p-0 py-[10px] bg-white grid grid-cols-2 justify-space-between border-b-[1px] border-gray-300">
      <div className="flex grid-rows-1 justify-space-between gap-x-[20px] py-[5px] px-[20px]">
        <Link href="/">Home</Link>
        <Link href="/#projects">Projects</Link>
        <Link href="/#work">Experience</Link>
        <Link href="/blogs">Blogs</Link>
      </div>
    </div>
  );
};

export default NavBar;
