import { useProfileStore } from "@/context/data-store";
import Link from "next/link";
import React from "react";

const Project = () => {
  const { data } = useProfileStore(({ host, setHost, setData, data }) => ({
    host,
    data,
    setHost,
    setData,
  }));

  if (!data) return <></>;

  if (!data.projects) return <></>;

  return (
    <div className="sectioned">
      <div className="">
        <h1
          className="mb-[10px] font-bold md:text-3xl sm:text-3xl lg:text-4xl"
          id="projects"
        >
          Projects
        </h1>
        <p>{data.projects.intro}</p>
      </div>
      <div className="">
        {data.projects.data.map((project) => (
          <div
            key={project.name}
            className="grid md:grid-cols-2 lg:my-[40px] xl:my-[40px] sm:my-[10px] sm:grid-cols-1"
          >
            <div className="pt-[20px]"></div>
            <div className="">
              <h2 className="text-2xl mb-[10px] font-semibold">
                {project.name}
              </h2>
              <div className="text-md">{project.description}</div>
              <div className="my-[20px] max-w-[100%]">
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
