import { useProfileStore } from "@/context/data-store";
import React from "react";
import Image from "next/image";
import { getFavicon } from "@/utils/getFavicon";
import Link from "next/link";

const Hero = () => {
  const { data } = useProfileStore(({ host, setHost, setData, data }) => ({
    host,
    data,
    setHost,
    setData,
  }));

  if (!data) return <></>;

  if (!data?.info) return "LOADING....";

  return (
    <div className="container sectioned">
      <div
        className="
          grid lg:grid-cols-2 gap-x-[1cm] justify-between items-center
          sm:grid-cols-1 sm:max-w-[100%] sm:w-[100%] sm:justify-center sm:items-center
          h-[100%] h-max-[80vh]
        "
      >
        <div className="lg:max-w-[500px] order-2 md:order-2 md:max-w-[100%]">
          <div className="mb-[20px]">
            <div className="text-sm font-bold">{data?.info.headline}</div>
            <div className="name">{data?.info.name}</div>
            <div>
              {data?.info.title}
              {data?.info.location ? `, ${data?.info.location}` : ""}
            </div>
          </div>
          <div className="my-[10px]">
            {data?.info?.description?.map((text) => (
              <div className="my-[10px] text-[16px]" key={text}>
                {text}
              </div>
            ))}
          </div>
          <div className="gap-x-[20px] py-[5px] flex grid-rows-1 justify-start">
            {data &&
              data.socials &&
              Object.entries(data.socials).map(([key, value]) => (
                <span key={key + value}>
                  <Link key={key} href={value} className="">
                    <Image
                      className="filter grayscale-[0.80] cursor-pointer hover:filter-0 hover:grayscale-0 duration-300"
                      src={getFavicon(value)}
                      alt={key}
                      width={25}
                      height={25}
                    />
                  </Link>
                </span>
              ))}
          </div>
        </div>
        <div className="flex justify-center items-center order-1 md:order-1">
          <Image
            className="rounded-full h-[200px] w-[200px] xl:w-[calc(100%-2rem)] xl:h-[calc(100%-2rem)] md:w-[300px] md:h-[300px] sm:w-[250px] sm:h-[250px]"
            src={data?.info.photo}
            alt={data?.info.name}
            width={1200}
            height={1200}
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
