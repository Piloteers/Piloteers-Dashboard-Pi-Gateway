export const extractFirstQuotedText = (str) => {
  const matches = str.match(/"(.*?)"/);
  return matches
    ? matches[1]
    : null;
}