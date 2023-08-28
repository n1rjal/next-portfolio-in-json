import { headers } from "next/headers";
import React from "react";
import { getRssContent } from "../utils";
import { parser } from "@/singleton/rss-parser-instance";
import { Metadata } from "next";
import { customSlugify } from "../slugify";
import { ImageResponse } from "next/server";

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
    (item) => customSlugify(item.title!.toLowerCase()) === props.params.slug
  );

  if (!blog) {
    return {
      title: "Blog - Not found",
    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const ogImage = new ImageResponse(
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
        {blog.title}
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );

  return {
    title: blog.title,
    openGraph: {
      type: "website",
      description:
        blog.title + " - " + blog["content:encoded"].substring(0, 100),
      title: blog.title,
      url: `https://${host}/blogs/${customSlugify(blog.title!.toLowerCase())}`,
      ttl: 3600,
      images: [],
    },

    category: blog.categories?.join(", "),
    authors: [
      {
        name: blog.creator,
        url: `https://${host}`,
      },
    ],
    description: blog["content:encoded"].substring(1, 100),
    applicationName: "Blogs",
    creator: blog.creator,
    keywords: blog.categories,
    publisher: "Medium",
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
    (item) => customSlugify(item.title!.toLowerCase()) === props.params.slug
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
