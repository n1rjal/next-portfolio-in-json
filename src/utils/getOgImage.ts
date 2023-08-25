export async function getOGImage(url: string) {
  try {
    console.log(url);
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
