import React from "react";
import { headers } from "next/headers";
import Link from "next/link";
import { getRssContent } from "./utils";
import { parser } from "@/singleton/rss-parser-instance";
import slugify from "slugify";
import { Metadata } from "next";
import { getJsonData } from "@/utils/getJsonData";

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
    title: `Blogs - ${data.info.name}`,
    description: "Generated by create next app",
  };
}

const Blog = async () => {
  const headerList = headers();
  const host = headerList.get("host")!;

  const content = await getRssContent(host);

  if (!content) {
    return <></>;
  }
  const feed = await parser.parseURL(content.rssFeed);

  return (
    <div className="m-10 sectioned bg-transparent">
      {feed?.items &&
        feed.items.map((item) => (
          <div key={item.guid} className="first:pt-5 last:pb-5 my-10">
            <Link
              href={`/blogs/${slugify(item.title!.toLowerCase(), {
                remove: /:/,
              })}`}
            >
              <h1 className="text-xl font-semibold">{item.title}</h1>
              <div className="text-sm">
                {new Date(item.pubDate!).toDateString()}
              </div>
            </Link>
            <div>
              {item.categories?.map((category) => (
                <span key={category} className="blog-tags">
                  {category}
                </span>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
};

export default Blog;