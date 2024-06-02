// expects host to be passed in `host:port` format
export const getBaseUrlByHost = (host: string): URL => {
  return new URL(`https://nirjalpaudel.com.np`);
};

export async function getRssContent(
  host: string,
): Promise<{ rssFeed: string } | null> {
  try {
    const baseUrl = getBaseUrlByHost(host);
    const res = await fetch(
      `${baseUrl.toString()}/entries/${baseUrl.hostname}.json`,
    );
    if (res.status !== 200) {
      return null;
    }
    const data = await res.json();
    return data;
  } catch (e) {
    console.log(e);
    throw e;
  }
}

export async function generateLocalUrlOfRssLink(originalUrl: string) {
  const url = new URL(originalUrl);
  url.pathname;
}
