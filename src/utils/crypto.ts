// TODO: Make it more secure
const SALT = "jdf82jf";

const applySaltToChar = (codes: number[] | number): number => {
  const code = Array.isArray(codes) ? codes[0] : codes;
  return textToChars(SALT).reduce((a, b) => a ^ b, code);
};

const textToChars = (text: string): number[] =>
  text.split("").map((c) => c.charCodeAt(0));

export const encrypt = (text: string) => {
  const byteHex = (n: number): string =>
    ("0" + Number(n).toString(16)).slice(-2);

  return text
    .split("")
    .map(textToChars)
    .map(applySaltToChar)
    .map(byteHex)
    .join("");
};

export const decrypt = (encoded: string) => {
  return encoded
    .match(/.{1,2}/g)
    ?.map((hex) => parseInt(hex, 16))
    .map(applySaltToChar)
    .map((charCode) => String.fromCharCode(charCode))
    .join("");
};
