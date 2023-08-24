import Parser from "rss-parser";

export const parser = new Parser({
  customFields: {
    item: ["content:encoded", "description"],
  },
});
