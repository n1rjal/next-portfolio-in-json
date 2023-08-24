import { useRouter } from "next/router";
import { headers } from "next/headers";
import React from "react";
import { getRssContent } from "../utils";
import { parser } from "@/singleton/rss-parser-instance";
import slugify from "slugify";
import ReactMarkdown from "react-markdown";

const markdownRegex =
  /^#{1,6}\s|[*-]\s|!\[.*?\]\(.*?\)|\[.*?\]\(.*?\)|`[^`]*?`|<.*?>/;
const htmlRegex = /^<.*?>|<\/.*?>|<.*?\/>/;

interface SingleBlogProps {
  params: { slug: string };
  searchParams: {};
}

const SingleBlog = async (props: SingleBlogProps) => {
  const headerList = headers();
  const host = headerList.get("host")!;
  const content = await getRssContent(host);
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
    <div className="m-10 blog-content">
      <div className="my-10">
        <h1 className="text-3xl">{blog.title}</h1>
        <div>{new Date(blog.pubDate!).toDateString()}</div>
        {blog.categories?.map((category) => (
          <span key={category} className="blog-tags">
            {category}
          </span>
        ))}
      </div>

      {(blog.description ?? blog["content:encoded"])?.match(markdownRegex) && (
        <ReactMarkdown>
          {blog.description ?? blog["content:encoded"]}
        </ReactMarkdown>
      )}

      {(blog.description ?? blog["content:encoded"])?.match(htmlRegex) && (
        <>This one is html</>
      )}
    </div>
  );
};

export default SingleBlog;
