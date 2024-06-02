import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import React from "react";
import { getJsonData } from "@/utils/getJsonData";
import { headers } from "next/headers";
import NavBar from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const headerList = headers();
  const host = headerList.get("host")!;
  const data = await getJsonData(host);

  if (!data) {
    return {
      title: `404! Not found`,
      description: "Nothing is found in this route",
    };
  }

  return {
    title: `${data.info.name} | ${data.info.title}`,
    description: data?.info?.description.join(" "),
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content="ca-pub-2089553262384227" />
      </head>
      <body className={inter.className}>
        <NavBar />
        {children}
      </body>
    </html>
  );
}
