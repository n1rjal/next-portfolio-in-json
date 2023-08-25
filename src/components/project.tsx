"use client";
import { useProfileStore } from "@/context/data-store";
import Link from "next/link";
import React, { useEffect } from "react";

const Project = () => {
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

  if (!data.projects) return <></>;

  return (
    <div>
      <h1 className="mb-[10px]">Projects</h1>
      <p>{data.projects.intro}</p>
      <div className="">
        {data.projects.data.map((project) => (
          <div key={project.name} className="grid grid-cols-2 my-[40px]">
            <div className="pt-[20px]"></div>
            <div className="">
              <h1 className="text-3xl mb-[10px] font-bold">{project.name}</h1>
              <div className="text-md">{project.description}</div>
              <div className="my-[20px]">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-sm px-[15px] py-[7px] bg-gray-300 first:ml-0 last:mr-0 mx-[5px]"
                  >
                    {`${tag.substring(0, 1).toUpperCase()}${tag
                      .substring(1)
                      .toLowerCase()}`}
                  </span>
                ))}
              </div>
              <div className="mt-[30px]">
                {project.githubUrl && (
                  <Link
                    target="_blank"
                    href={project.githubUrl}
                    className="button"
                  >
                    Github
                  </Link>
                )}
                {project.liveUrl && (
                  <Link
                    target="_blank"
                    href={project.liveUrl}
                    className="button"
                  >
                    Live
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Project;
