import { CryptoDigestAlgorithm, digestStringAsync } from "expo-crypto";
import { KJUR, hextob64 } from "jsrsasign";

const privateKey = `-----BEGIN PRIVATE KEY-----
MIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDaDIo5LAx7wm3B
ftNvfg88xkrmJFJv1wsjzks5D/pO1mIAGpPILqfSNyXho6WBhpbJm4Y8z3jAyakl
2SQIKQph8eDQSJX6KFgI05oMZbwFO9UTwlfmOU9W2mPg+OE6JNtxz2AMt5EhWhDD
FUs+vaGcjYY0l+5XgOCBv2SzSR8On2qUbX0ACcnNCFtURt+UBEMJ3YBpw94lmP7w
0zby9pW+ydaA4IZ/8I4NxS9HHDqDj83chbncxNM9aGNqcZIgcZGm0FA/iu9YJWvM
dB8ZkcSVEE4IYgvy7idwb7nMzXa4tbDkHT4KKR3fsT6/lSBDyHOkJdUgTvOeOf7S
/uZ1lTpHAgMBAAECggEACgyKkOigc/0EP+b6FD5UB3IAC6vgMg/6uci3xhvKu7gS
RieeE0YLLUX7X0htHT4NqaGa8HyDTSc+E2TMI1AjjrCuCAtVq3S73JRGmjb/Zk0D
8egtUt/l8dPDcfUmXslKD8GwjzAlO8tB0IElDvGAXDhYLLOqeVU9g4fwOnmujmbh
P93nE/AnSl2gCHgeG8bqMVgTY/eyM9Pb+xClbcdo3FrDXjCEwthxZXvckgypIyfg
FN5sATX51EuXVAePFOfDuJ49SqtKOQQxRbGWbdFzW2ZmX/7xnJA2DQKhIeS3hNpp
csOVT/16RQyQhSAU9rubQTIndgBVtY5QLjn+SwiayQKBgQD+fiKx6skNGEG1tgQy
7BdAQyqIq5yK+B98L2rYMvISXb49I5a34ENGRZU5zUUJMHjBnbxaf2eK5k1zAEej
Lxm0OskMb1uK3TtziuIjFT8dSXHnQpERNoc9DeooHohBvIKp+dhZhcfcajbsUcPC
CBuLY1qaTLHOaKHscUgYgX7RswKBgQDbVyXmTdoo17tlj45fI4fPs34ZyK9DgmXV
rzAa2baYBhMNmd9MNJvw2pYd8ROjXnmS8uKAByqQrE8KjXYYCimPzpP45ObZHFDt
Y23d5KIdPGH8ymUAbaXW3x26NSmnVUIsXRYgpbU6zZWmnu1Nfqvc6YOcAOuvUazx
35D1QEQjHQKBgQCk0HWRudcJBvuPPdjMTb/lG1qRdmqESZrCZ0cPyzaglFte5wx1
+uQ2v1ucOocKI30hDxFrnnUlLG9eGgFK+nbwFN4dkoS7kvkso/Y9+EWOpwEAX0jp
1+GPtdI+tz9RK0+H20m0+IHuCk+VjoJzx6JnDCoiIadJYNP094xUapECJwKBgQC4
CA/BgvKXMCKIXQF8a6hIqXYVFh+PSfo9Zqa68I5WUUptL/x9yOpKFGy9pIbwnJTu
qaFHADxDdH9BAF3kX6ptgUsAGrZh1XNFKhaFhY5Lb11bp0lFKbpqZXtgv7g6MLu7
00J8k+xR8SotycybJ7v1N2v4WYFl8OZlbkoGrCw/NQKBgQDb+srVOhqnG0DK4sGq
09YpasLtduIxuhpkaCO1UVRV9M6Tg8Xi45cSMxOedwCpKfCOzx36FAyfTlkgvS2x
1CW+T6UgkPl3zop6SghWdJ2XH80p+hgNAxx2ERzS1ZIt9jXEBCFRnT6xcATXsJCJ
GssHq+StAbGEJ/6lHIXxULPYtg==
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
