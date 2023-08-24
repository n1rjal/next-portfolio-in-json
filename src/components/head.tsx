import React from "react";
import Head from "next/head";
import { getJsonData } from "@/utils/getJsonData";
import { headers } from "next/headers";

const CustomHead = async () => {
  const headerList = headers();
  const host = headerList.get("host")!;
  const data = await getJsonData(host);
  return (
    <Head key={JSON.stringify(data)}>
      <title>
        {data.info.name} - {data.info.title}
      </title>
    </Head>
  );
};

export default CustomHead;
