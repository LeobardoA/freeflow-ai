import { CryptoDigestAlgorithm, digestStringAsync } from "expo-crypto";
import { generateSignature } from "./signature";

// tensor
const urlPre = "https://ap-east-1.tensorart.cloud";
const appId = "MvwDVIWuj";

const jobUrl = "/v1/jobs";

export interface Txt2imgData {
  requestId: string;
  stages: {
    type: string;
    inputInitialize?: {
      seed: string | number;
      count: number;
    };
    diffusion?: {
      width: number;
      height: number;
      prompts: {
        text: string;
      }[];
      negativePrompts?: {
        text: string;
      }[];
      sdModel: string;
      sdVae: string;
      sampler: string;
      steps: number;
      cfgScale: number;
      clipSkip: number;
      etaNoiseSeedDelta?: number;
      lora?: {
        items: {
          loraModel: string;
          weight: string;
        }[];
      };
    };
    image_to_adetailer?: {
      args: {
        ad_model: string;
        ad_confidence: number;
        ad_dilate_erode: number;
        ad_denoising_strength: number;
        ad_inpaint_only_masked: boolean;
        ad_inpaint_only_masked_padding: number;
      }[];
    };
    image_to_upscaler?: {
      hr_upscaler: string;
      hr_scale: number;
      hr_second_pass_steps: number;
      denoising_strength: number;
    };
  }[];
}

export function createTxt2imgData(): Txt2imgData {
  return {
    requestId: "",
    stages: [
      {
        type: "INPUT_INITIALIZE",
        inputInitialize: {
          seed: "-1",
          count: 1,
        },
      },
      {
        type: "DIFFUSION",
        diffusion: {
          width: 512,
          height: 768,
          prompts: [
            {
              text: "masterpiece, best quality, 1girl, blonde hair, long hair, white shirt, off-shoulder shirt, black thighhighs, garter straps, smile, blush,",
            },
          ],
          negativePrompts: [
            {
              text: "EasyNegative",
            },
          ],
          sdModel: "600315593373002855",
          sdVae: "Automatic",
          sampler: "Euler a",
          steps: 25,
          cfgScale: 7,
          clipSkip: 2,
          etaNoiseSeedDelta: 31337,
          lora: {
            items: [],
          },
        },
      },
    ],
  };
}

export async function text2img(
  data: Txt2imgData | null
): Promise<string | null> {
  if (data !== null) {
    // console.log(JSON.stringify(data, null, 4));
    data.requestId = await createMD5();
    const txt2imgData = data;
    const resp = await createJob(txt2imgData);
    if ("job" in resp) {
      const job_dict = resp.job;
      const job_id = job_dict.id;
      const job_status = job_dict.status;
      console.log(job_id, job_status);
      return await getJobResult(job_id);
    }
  }
  return null;
}

async function createJob(txt2imgData: Txt2imgData) {
  const authHeader = await generateSignature(
    "POST",
    jobUrl,
    appId,
    txt2imgData
  );
  return await sendRequest("POST", urlPre + jobUrl, txt2imgData, authHeader);
}

async function getJobResult(jobId: string): Promise<string | null> {
  while (true) {
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Sleep for 1 second
    const authHeader = await generateSignature(
      "GET",
      jobUrl + "/" + jobId,
      appId,
      null
    );
    const resp = await sendRequest(
      "GET",
      urlPre + jobUrl + "/" + jobId,
      null,
      authHeader
    );
    if ("job" in resp) {
      const jobDict = resp.job;
      const jobStatus = jobDict.status;
      console.log(jobStatus);
      if (jobStatus === "SUCCESS") {
        console.log(JSON.stringify(jobDict));
        if (
          jobDict.successInfo &&
          jobDict.successInfo.images &&
          jobDict.successInfo.images[0]
        ) {
          return jobDict.successInfo.images[0].url;
        }
        break;
      } else if (jobStatus === "FAILED") {
        console.log(JSON.stringify(jobDict));
        break;
      } else {
        console.log(JSON.stringify(jobDict));
      }
    }
  }
  return null;
}

async function sendRequest(
  method: string,
  url: string,
  body: any,
  signature: string
) {
  const headers = {
    "Content-Type": "application/json",
    Accept: "application/json",
    Authorization: signature,
  };

  const response = body
    ? await fetch(url, {
        method: method,
        headers: headers,
        body: JSON.stringify(body),
      })
    : await fetch(url, {
        method: method,
        headers: headers,
      });

  if (!response.ok) {
    console.log(
      "RESPUESTA CON ERROR: ",
      response.status,
      " message: ",
      response.statusText
    );

    return response;
  } else {
  }

  return await response.json();
}

async function createMD5(): Promise<string> {
  const timestamp = Date.now().toString();
  const digest = await digestStringAsync(CryptoDigestAlgorithm.MD5, timestamp);
  return digest;
}

// Nueva función para obtener los detalles del modelo
export async function checkModelData(modelID: string) {
  console.log("Checking model: " + modelID);
  const authHeader = await generateSignature(
    "GET",
    "/v1/models/" + modelID,
    appId,
    null
  );
  const response = await sendRequest(
    "GET",
    urlPre + "/v1/models/" + modelID,
    null,
    authHeader
  );
  if (response.model !== undefined) {
    return response.model;
  } else {
    console.error("RESPONSE STATUS: ", response.status);
    return null;
  }
}
