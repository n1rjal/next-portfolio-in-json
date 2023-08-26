import { useProfileStore } from "@/context/data-store";
import React from "react";

const Skills = () => {
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
      <div>
        <div className="xl:bg-white xl:p-5 lg:p-5 lg:bg-white xl:rounded-lg lg:rounded-lg">
          <h1
            className="mb-[10px] font-bold text-3xl md:text-3xl sm:text-3xl lg:text-4xl mb-6"
            id="skills"
          >
            Skills
          </h1>
          {Object.entries(data.skills).map(([skillCategory, skills]) => (
            <div className="my-[10px]" key={skillCategory}>
              <h2 className="mt-[10px]">
                {skillCategory.substring(0, 1).toUpperCase() +
                  skillCategory.substring(1)}
              </h2>
              <div className="flex flex-wrap w-[100%]">
                {skills.map((skill) => (
                  <span
                    className="px-[20px] py-[10px] mx-[7px] my-[2px] border-[1px] border-black cursor-pointer text-sm
                  hover:border-black hover:text-white
                  even:hover:bg-blue-700 odd:hover:bg-green-700
                  transition ease-in-out duration-[600ms]"
                    key={skill}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Skills;
