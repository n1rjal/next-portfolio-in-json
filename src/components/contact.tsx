import { useProfileStore } from "@/context/data-store";
import Link from "next/link";
import React, { useEffect } from "react";

const Contact = () => {
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
    <div>
      <div className="flex flex-wrap gap-x-[20px] py-[5px]">
        {data &&
          data.socials &&
          Object.entries(data.contacts).map(([key, value]) => (
            <span key={key + value}>
              <Link
                key={key}
                href={value.link}
                className="px-[20px] py-[10px] text-sm bg-yellow-400 "
              >
                {key}
              </Link>
            </span>
          ))}
      </div>
    </div>
  );
};

export default Contact;
