import { ImageResponse } from "next/server";
import React from "react";
// App router includes @vercel/og.
// No need to install it.

export const runtime = "edge";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const params = url.searchParams;
  const title = params.get("title");
  const author = params.get("author");
  const image = params.get("image");

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          fontSize: 30,
          background: "#f6f6f6",
          fontFamily: "'Raleway', sans-serif",
          width: "100vw",
          height: "100vh",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          padding: "2cm",
          color: "white",
          border: "5px solid #fff",
          backgroundImage: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        }}
      >
        <div
          className=""
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "left",
            height: "100%",
            maxWidth: "100%",
          }}
        >
          <div
            className=""
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
              textAlign: "left",
              height: "90%",
              width: "90%",
            }}
          >
            <div
              className=""
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-start",
                textAlign: "left",
                height: "100%",
                maxWidth: "100%",
              }}
            >
              <h1 style={{ textAlign: "left", maxWidth: "70%" }}>{title}</h1>
              <p
                style={{
                  textAlign: "left",
                  maxWidth: "70%",
                }}
              >
                - {author}
              </p>
            </div>

            <div
              className=""
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "flex-end",
                textAlign: "left",
                height: "100%",
                maxWidth: "100%",
              }}
            >
              <img
                className="rounded-full h-[200px] w-[200px] xl:w-[calc(100%-2rem)] xl:h-[calc(100%-2rem)] md:w-[300px] md:h-[300px] sm:w-[250px] sm:h-[250px]"
                src={image!}
                alt={title!}
                width={1200}
                height={1200}
                style={{
                  borderRadius: "100%",
                  width: "250px",
                  height: "250px",
                  border: "2px solid #fff",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      emoji: "noto",
    }
  );
}
