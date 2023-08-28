import { parse } from "node-html-parser";

export async function getOGImage(url: string) {
  try {
    const resp = await fetch(url);
    const html = await resp.text();

    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const ogImage = doc.querySelector('meta[property="og:image"]');

    if (ogImage) {
      const imageUrl = ogImage.getAttribute("content");
      return imageUrl;
    } else {
      throw new Error("No Og Image Found");
    }
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export function getImagesFromHtml(htmlContent: string): string[] {
  const root = parse(htmlContent);
  const imageUrls: string[] = [];
  const images = root.querySelectorAll("img");
  images.forEach((image) => {
    const imageUrl = image.getAttribute("src");
    if (imageUrl) {
      imageUrls.push(imageUrl);
    }
  });

  return imageUrls;
}
