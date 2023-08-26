import { headers } from "next/headers";
import React from "react";
import { getRssContent } from "../utils";
import { parser } from "@/singleton/rss-parser-instance";
import slugify from "slugify";
import { Metadata } from "next";

const markdownRegex =
  /^#{1,6}\s|[*-]\s|!\[.*?\]\(.*?\)|\[.*?\]\(.*?\)|`[^`]*?`|<.*?>/;

interface SingleBlogProps {
  params: { slug: string };
  searchParams: Record<string, string>;
}

export async function generateMetadata(
  props: SingleBlogProps
): Promise<Metadata> {
  const headerList = headers();
  const host = headerList.get("host")!;
  const content = await getRssContent(host);

  if (!content) {
    return {
      title: "Blog - Not found",
    };
  }

  const feed = await parser.parseURL(content.rssFeed);

  const blog = feed.items.find(
    (item) =>
      slugify(item.title!.toLowerCase(), {
        remove: /:/,
      }) === props.params.slug
  );

  if (!blog) {
    return {
      title: "Blog - Not found",
    };
  }

  return {
    title: blog.title,
  };
}

const SingleBlog = async (props: SingleBlogProps) => {
  const headerList = headers();
  const host = headerList.get("host")!;
  const content = await getRssContent(host);

  if (!content) {
    return <></>;
  }

  const feed = await parser.parseURL(content.rssFeed);

  const blog = feed.items.find(
    (item) =>
      slugify(item.title!.toLowerCase(), {
        remove: /:/,
      }) === props.params.slug
  );

  if (!blog) {
    return (
      <div>
        <h1>404! Blog not found</h1>
      </div>
    );
  }

  return (
    <div className="w-[100%] bg-white">
      <div className="m-auto lg:max-w-[60vw] xl:max-w-[50vw] md:max-w-[80vw] py-10">
        <div className="my-10">
          <h1 className="xl:text-5xl lg:text-5xl md:text-3xl sm:text-3xl text-2xl w-[100%]">
            {blog.title}
          </h1>
          <div className="mt-2">{new Date(blog.pubDate!).toDateString()}</div>
        </div>

        {(blog.description ?? blog["content:encoded"])?.match(
          markdownRegex
        ) && (
          <div
            className="mb-[100px] blog-content font-serif text-xl"
            dangerouslySetInnerHTML={{ __html: blog["content:encoded"] }}
          />
        )}
      </div>
    </div>
  );
};

export default SingleBlog;
