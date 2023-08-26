import { useProfileStore } from "@/context/data-store";
import Link from "next/link";
import React from "react";

const Work = () => {
  const { data } = useProfileStore(({ host, setHost, setData, data }) => ({
    host,
    data,
    setHost,
    setData,
  }));

  if (!data) return <></>;

  if (!data.projects) return <></>;

  const prettyPrintDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  return (
    <div className="grid grid-cols-1 gap-x-5 p-0 sm:gap-y-10 gradiented sectioned">
      <div className="sm:p-0 order-2">
        <div className="xl:bg-white lg:bg-white xl:p-5 lg:p-5 xl:rounded-lg lg:rounded-lg">
          <h1
            className="mb-[10px] font-bold text-3xl md:text-3xl sm:text-2xl lg:text-4xl sm:p-0"
            id="contact"
          >
            Contact
          </h1>
          <div className="flex flex-wrap">
            {Object.entries(data.contacts).map(([key, contact]) => (
              <Link key={key} href={contact.link}>
                <div
                  className="px-[10px] py-[10px] m-[5px] 
                my-[15px]
                px-[10px] py-[10px] m-[5px] border-2
              odd:border-green-900 even:border-blue-900"
                >
                  <p className="text-xl font-semibold">{key + ":"}</p>
                  <p>{contact.show}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="w-[100%] sm:p-0 lg:p-10 order-1">
        <h1 className="mb-[10px] font-bold text-3xl lg:text-4xl" id="work">
          Work
        </h1>
        <div className="my-[10px] w-[100%] p-0">
          {data.workExperiences.map((work) => (
            <div
              className="my-[5px] w-[100%]"
              key={work.title + work.companyName}
            >
              <div className="py-5 cursor-pointer">
                <h2 className="text-xl">
                  {work.title} - {work.companyName}
                </h2>
                <p className="text-sm">
                  {work.city} | {prettyPrintDate(work.startDate)} -{" "}
                  {prettyPrintDate(work.endDate)}
                </p>
                <ul
                  itemType="list"
                  className="list-disc xl:ml-[1cm] lg:ml-[1cm] p-[20px]"
                >
                  {work.description.map((desc) => (
                    <li key={desc} className="ml-[20px] text-md">
                      {desc.substring(0, 1).toUpperCase() + desc.substring(1)}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-[100%] sm:p-0 lg:p-5 order-3">
        <h1 className="mb-[10px] font-bold text-3xl lg:text-4xl" id="awards">
          Awards
        </h1>
        <div className="my-[10px] w-[100%] p-0 flex flex-wrap">
          {data.awards.map((award) => (
            <div
              className="px-[10px] py-[10px] m-[5px] 
                my-[15px]
                px-[10px] py-[10px] m-[5px] border-2
              odd:border-green-900 even:border-blue-900"
              key={award.title}
            >
              <div className="cursor-pointer">
                <h2 className="text-xl font-semibold">{award.title}</h2>
                <p className="text-sm">
                  {award.issuedBy} - {prettyPrintDate(award.date)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Work;
