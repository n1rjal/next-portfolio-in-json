import slugify from "slugify";

export function customSlugify(input: string): string {
  const symbolRegex = /[-!$%^&*()_+|~=`{}\\[\]:";'<>?,.\\/]/gi;
  const removeRegex = /^(?![a-zA-Z0-9,-]+$)[a-zA-Z0-9-]+$/gi;
  return slugify(
    input.replaceAll(" ", "-").replaceAll(symbolRegex, "").toLowerCase(),
    {
      remove: removeRegex,
    }
  );
}
