import { useProfileStore } from "@/context/data-store";
import Link from "next/link";
import React, { useState } from "react";

const Work = () => {
  const { data } = useProfileStore(({ host, setHost, setData, data }) => ({
    host,
    data,
    setHost,
    setData,
  }));

  const [showExp, setShowExp] = useState(
    new Array(data?.workExperiences.length).fill(false)
  );

  if (!data) return <></>;

  if (!data.projects) return <></>;

  const prettyPrintDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });
  };

  const showExpClickHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number
  ) => {
    event.preventDefault();
    setShowExp((prev) => {
      const newArr = [...prev];
      newArr[index] = !newArr[index];
      return newArr;
    });
  };

  return (
    <div className="grid grid-cols-1 gap-x-5 xl:px-10 lg:px-10 sm:gap-y-10 gradiented sectioned">
      <div className="sm:p-0">
        <div className="xl:bg-white lg:bg-white xl:p-5 lg:p-5 xl:rounded-lg lg:rounded-lg">
          <h1
            className="mb-[10px] font-bold text-3xl md:text-3xl sm:text-2xl lg:text-4xl sm:p-0"
            id="contact"
          >
            Contact
          </h1>
          {Object.entries(data.contacts).map(([key, contact]) => (
            <div key={key} className="my-[15px]">
              <p>{key + ":"}</p>
              <Link href={contact.link}>
                <p>{contact.show}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="sectioned w-[100%] sm:p-0 lg:p-10">
        <h1 className="mb-[10px] font-bold text-3xl lg:text-4xl" id="work">
          Work
        </h1>
        <div className="my-[10px] w-[100%] p-0">
          {data.workExperiences.map((work, index) => (
            <div
              className="my-[5px] w-[100%]"
              key={work.title + work.companyName}
            >
              <div
                className="py-5 cursor-pointer"
                onClick={(e) => showExpClickHandler(e, index)}
              >
                <h2 className="text-2xl font-semibold">
                  {work.title} - {work.companyName}
                </h2>
                <p className="text-sm">
                  {work.city} | {prettyPrintDate(work.startDate)} -{" "}
                  {prettyPrintDate(work.endDate)}
                </p>
                <ul itemType="list">
                  {showExp[index] &&
                    work.description.map((desc) => (
                      <li key={desc} className="ml-[20px]">
                        {desc}
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="">
        <div className="sectioned w-[100%] sm:p-0 lg:p-10">
          <h1 className="mb-[10px] font-bold text-3xl lg:text-4xl" id="awards">
            Awards
          </h1>
          <div className="my-[10px] w-[100%] p-0">
            {data.awards.map((award) => (
              <div className="my-[5px] w-[100%]" key={award.title}>
                <div className="py-5 cursor-pointer">
                  <h2 className="text-xl">{award.title}</h2>
                  <p className="text-sm">
                    {award.issuedBy} - {prettyPrintDate(award.date)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Work;
