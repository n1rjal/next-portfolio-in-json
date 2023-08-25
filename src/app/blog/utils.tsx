// expects host to be passed in `host:port` format
export const getBaseUrlByHost = (host: string): URL => {
  const localIpRegex =
    /^(?:0\.0\.0\.0|127\.0\.0\.1|localhost|::1|(?:10|172\.(?:1[6-9]|2[0-9]|3[01])|192\.168)\.\d{1,3}\.\d{1,3})$/;
  const matchesWithLocalIp = !!host?.split(":")?.shift()?.match(localIpRegex);

  const protocol = matchesWithLocalIp ? "http" : "https";

  return new URL(`${protocol}://${host}`);
};

export async function getRssContent(host: string): Promise<string | null> {
  try {
    const baseUrl = getBaseUrlByHost(host);
    const res = await fetch(
      `${baseUrl.toString()}/entries/${baseUrl.hostname}.json`
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
