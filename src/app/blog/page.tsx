import React from "react";
import { headers } from "next/headers";

import Link from "next/link";
import { getRssContent } from "./utils";
import { parser } from "@/singleton/rss-parser-instance";
import slugify from "slugify";

const Blog = async () => {
  const headerList = headers();
  const host = headerList.get("host")!;
  const content = await getRssContent(host);
  const feed = await parser.parseURL(content.rssFeed);

  return (
    <div className="m-10">
      <h1 className="text-4xl my-5">Blog Page</h1>
      {feed?.items &&
        feed.items.map((item) => (
          <div key={item.guid} className="first:pt-5 last:pb-5 my-10">
            <Link
              href={`/blog/${slugify(item.title!.toLowerCase(), {
                remove: /:/,
              })}`}
            >
              <div className="text-xl">{item.title}</div>
              <div>{new Date(item.pubDate!).toDateString()}</div>
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
