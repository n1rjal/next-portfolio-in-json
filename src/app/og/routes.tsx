import { useProfileStore } from "@/context/data-store";
import { ImageResponse } from "next/server";
import React from "react";
// App router includes @vercel/og.
// No need to install it.

export const runtime = "edge";

export async function GET() {
  const { data } = useProfileStore(({ host, setHost, setData, data }) => ({
    host,
    data,
    setHost,
    setData,
  }));

  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 40,
          color: "black",
          background: "white",
          width: "100%",
          height: "100%",
          padding: "50px 200px",
          textAlign: "center",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {data?.bio}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
