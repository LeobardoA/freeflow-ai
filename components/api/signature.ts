import { CryptoDigestAlgorithm, digestStringAsync } from "expo-crypto";
import { KJUR, hextob64 } from "jsrsasign";

const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDm1RQmdkEl8Qq0
NrsY7nCK7iPVCdfGDl3DdbFyntFcj+zrOGl0n6VMu8ob6AdThGZ7ar20E64tl5bA
//VNGBlG/BoKyvDgSBuNIGuexhjLOizXi3NRaA/k4ZGL/WmzENIbLu4iDsJoG7zE
6kIZDY2qnXwtmeu2gd5b6+6Ib6qqIS3H2Pa/JxeCkPDqMSr6PXmPPXAfAPMEHhTm
a2WRgkAbrdekDClkZS6luK4gcCBetvsUD0722KgXhMPca0EHMXAG0FxfJtbw21WM
/mXojDp4yosu4BT0X/xrgSTEQ8ruf0qmniZWG35LiRykvA6lmWkyRQ4pZBYx1LWZ
BhbIayV1AgMBAAECggEAICpSdb6WOu+A9pZG0YVOTOm8t/+4X8qaMbWpfaeYVG3g
zXEtrrjdS5lCY0uck7x4HFwGJbz1UTiVovy3xZ+lTBEuntDjKlmZ7zs0i+oeQ9lu
LLXroo0d496zzZ5JF5DxOiT6vWexmti8n/LltYCAPGVYC7GuWR71KXlxonTvAug7
bYzS17KbWZKHD9AyjOO5b3Ocz2FA0AYn4yS857wTjIiq6ww57dbon17bjPeNVDen
PgUf3XG5oULS0s1sYPf+0hGAcSOM/XFGszLYLv8NBiSfv2eI9EJh9eIeuWU8+Z27
8A29biXRWCK4vRbYTUpWJkNMaUDe3H4qaRSyBX34wQKBgQDz/fG13H270GOZFgk1
DcNx2pfpxXoe4/jH71uNB6GUXGmsMvy9MW0fEI9yrwtDdVBkT/tUJOfJdvASjGkG
s70vsvkEguUaJd4u2fQN2O4ch5FQfT3aPJeHZLtuzyUiOU0dX5hsre+9bcT7Xeug
ONUx1ArWD7I8fXUdWdbK/LjfwQKBgQDyMVYXDaMHTJAKtW6kNqg0XtvUmktGbzZa
mf2L16W5fKtA7fZMlWVN/wpbSSoZNYmd39O0VJOxyFpwTTSeQ9RaSKlDs3g8cG+1
hpnBMcaU0qEAcQZbxiWzfxmCz81yBwYqD0SIVHAVN6oiIwyiXYbjyxfaeGULixEV
2LynelFytQKBgBfl0I3iecIyh/7PhLlYjsMRCP4RpINwCsbyb8IhdDcG0ibWm6Cg
PbLkOVifQngp/mTE3LYCI129M4htjj/kzOvmGLPTakMkYF2wZVIR5EiREq+ShMNi
Wekd+anByj5O5HmzCkfixW+FV9zS9ygrSN5niWQsB2YbV6Q3T210UVtBAoGBAOrN
PAqTlPexmYBYT5Dy0HYddQCUKeB6V3bVDkPyaOAAZsNHMN8kg5dvaGoB78eK6QVf
B48v5BSbClsP7rB1UD3LbhaNu0bVNugFO7FagYys+5xC94gn/UsdMO1qa2JePvKt
5KJLQnK/ibkYw9nx1KGpt1F+IXBkfcbxXkz8QFR1AoGAT3ax/X7r2yspIwirDfAp
PZMhUktJjNRrV1KkWuSmmuVpmBRyz6QFCoTFf/+H3T9jC5jlnM2ijBtcRz/piNW0
f48R5NyNYf8wqL1WCjTaLgkgDcnxGJaqrzesu0ViqFiIt+IpGumFSov6Q2w4kjGh
HpJWTi9asF7wa+3rM5uSlIs=
-----END PRIVATE KEY-----`;

export async function generateSignature(
  method: string,
  url: string,
  appId: string,
  body: any
): Promise<string> {
  const methodStr = method.toUpperCase();
  const urlStr = url;
  const timestamp = Math.floor(Date.now() / 1000).toString();
  const nonceStr = await createMD5(timestamp);
  const bodyStr = body ? JSON.stringify(body) : "";
  const toSign = `${methodStr}\n${urlStr}\n${timestamp}\n${nonceStr}\n${bodyStr}`;

  const rsa = new KJUR.crypto.Signature({ alg: "SHA256withRSA" });
  rsa.init(privateKey);
  rsa.updateString(toSign);
  const signature = hextob64(rsa.sign());

  return `TAMS-SHA256-RSA app_id=${appId},nonce_str=${nonceStr},timestamp=${timestamp},signature=${signature}`;
}

async function createMD5(input: string): Promise<string> {
  return await digestStringAsync(CryptoDigestAlgorithm.MD5, input);
}
