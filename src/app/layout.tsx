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
      <body className={inter.className}>
        <NavBar />
        <section className="mx-auto pt-[1cm] xl:max-w-[70vw] lg:max-w-[80vw] md:max-w-[90vw] sm:max-w-[100vw]  py-10 p-5">
          {children}
        </section>
      </body>
    </html>
  );
}
