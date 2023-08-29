import { parser } from "@/singleton/rss-parser-instance";
import { Metadata } from "next";
import { headers } from "next/headers";
import { customSlugify } from "../slugify";
import { getRssContent } from "../utils";
import React from "react";
import { getImagesFromHtml } from "@/utils/getOgImage";
import Link from "next/link";
import { Item } from "rss-parser";

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

  const images = getImagesFromHtml(blog["content:encoded"]);

  return {
    title: blog.title,
    openGraph: {
      type: "website",
      description:
        blog.title + " - " + blog["content:encoded"].substring(0, 100),
      title: blog.title,
      url: `https://${host}/blogs/${customSlugify(blog.title!.toLowerCase())}`,
      ttl: 3600,
      images: images[0],
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

  const getRandomItemsFromArray = <
    T extends { "content:encoded": string } & { description: string } & Item
  >(
    arr: T[],
    count: number
  ): T[] => {
    const choicesDict: Record<string, T> = {};

    while (Object.entries(choicesDict).length < count) {
      const choice = Math.floor(Math.random() * arr.length);
      const exists = !!choicesDict[arr[choice].guid!];
      if (exists) continue;
      choicesDict[arr[choice].guid!] = arr[choice];
    }

    return Object.values(choicesDict);
  };

  const otherBlogs = feed.items.filter(
    (item) => customSlugify(item.title!.toLowerCase()) !== props.params.slug
  );

  return (
    <div className="w-[100%] bg-white">
      <div className="m-auto lg:max-w-[60vw] xl:max-w-[50vw] md:max-w-[80vw] p-5 xl:px-0 md:px-0 lg:px-0">
        <div className="my-10">
          <h1 className="xl:text-5xl lg:text-5xl md:text-3xl sm:text-3xl text-3xl w-[100%]">
            {blog.title}
          </h1>
          <div className="mt-2">{new Date(blog.pubDate!).toDateString()}</div>
        </div>

        {(blog.description ?? blog["content:encoded"])?.match(
          markdownRegex
        ) && (
          <div
            className="mb-[10px] blog-content font-serif text-xl"
            dangerouslySetInnerHTML={{ __html: blog["content:encoded"] }}
          />
        )}

        <div>
          <div className="w-[100%]">
            {blog.categories &&
              blog.categories?.map((category) => (
                <span key={category} className="blog-tags text-[20px]">
                  {category}
                </span>
              ))}
          </div>

          <div className="my-[1cm] border border-gray-950 p-[20px]">
            <div className="">
              <Link href={blog.link!} target="_blank">
                <p className="text-sm">Support this article</p>
                <h2 className="text-4xl font-bold">{blog.title}</h2>
                <p className="text-sm">
                  {new Date(blog.pubDate!).toLocaleString("en-US", {
                    month: "long",
                    year: "numeric",
                  }) + ", "}
                  {blog.creator}
                </p>
              </Link>
            </div>
          </div>
          <div className="my-[50px] border border-gray-950 p-[20px]">
            <div className="">
              <Link href={feed.link!} target="_blank">
                <p className="text-sm">Support this author</p>
                <h2 className="text-4xl font-bold">{feed.title}</h2>
                <p className="text-sm">
                  {new Date(blog.pubDate!).toLocaleString("en-US", {
                    month: "long",
                    year: "numeric",
                  }) + ", "}
                  {blog.creator}
                </p>
              </Link>
            </div>
          </div>
          <div className="my-3">
            <h3 className="mt-[2cm] mb-[1cm] text-2xl font-bold">
              Latest Blogs
            </h3>
            {otherBlogs
              .slice(0, 3)
              .filter(
                (item) =>
                  customSlugify(item.title!.toLowerCase()) !== props.params.slug
              )
              .map((blog) => (
                <div className="mt-3" key={blog.guid}>
                  <div key={blog.guid} className="first:mt-0 last:mb-5">
                    <Link
                      href={`/blogs/${customSlugify(
                        blog.title!.toLowerCase()
                      )}`}
                    >
                      <h2 className="text-xl font-semibold">{blog.title}</h2>
                      <div className="text-sm">
                        {new Date(blog.pubDate!).toDateString()}
                      </div>
                    </Link>
                    <div>
                      {blog.categories?.map((category) => (
                        <span key={category} className="blog-tags">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
          </div>

          {otherBlogs && (
            <div className="my-3">
              <h3 className="mt-[2cm] mb-[1cm] text-2xl font-bold">
                Some Random Blogs
              </h3>
              {getRandomItemsFromArray(otherBlogs, 3)
                .filter(
                  (item) =>
                    customSlugify(item.title!.toLowerCase()) !==
                    props.params.slug
                )
                .map((blog) => (
                  <div className="mt-3" key={blog.guid}>
                    <div key={blog.guid} className="first:mt-0 last:mb-5">
                      <Link
                        href={`/blogs/${customSlugify(
                          blog.title!.toLowerCase()
                        )}`}
                      >
                        <h2 className="text-xl font-semibold">{blog.title}</h2>
                        <div className="text-sm">
                          {new Date(blog.pubDate!).toDateString()}
                        </div>
                      </Link>
                      <div>
                        {blog.categories?.map((category) => (
                          <span key={category} className="blog-tags">
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SingleBlog;
