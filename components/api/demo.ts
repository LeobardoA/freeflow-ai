import { CryptoDigestAlgorithm, digestStringAsync } from "expo-crypto";
import { generateSignature } from "./signature";
import { useGenerationStore } from "../contexts/GenerationStore";

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
          height: 512,
          prompts: [
            {
              text: "",
            },
          ],
          negativePrompts: [
            {
              text: "",
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

export async function text2img(data: Txt2imgData | null, credits: number) {
  // console.log(JSON.stringify(data, null));
  if (data !== null) {
    const id = await createMD5();
    data.requestId = id;
    const resp = await createJob(data);
    if ("job" in resp) {
      const job_dict = resp.job;
      const job_id = job_dict.id;
      const job_status = job_dict.status;
      // console.log(job_id, job_status);
      useGenerationStore.setState({
        remainingCredits:
          useGenerationStore.getState().remainingCredits - credits,
      });
      const result = await getJobResult(job_id);
      return result;
    }
  }
}

export async function createMD5(): Promise<string> {
  try {
    const timestamp = Date.now().toString();
    const digest = await digestStringAsync(
      CryptoDigestAlgorithm.MD5,
      timestamp
    );
    return digest;
  } catch (error) {
    throw new Error("Error creating MD5: " + error);
  }
}

export async function createJob(txt2imgData: Txt2imgData) {
  console.log("Creando trabajo...");
  try {
    const authHeader = await generateSignature(
      "POST",
      jobUrl,
      appId,
      txt2imgData
    );
    return await sendRequest("POST", urlPre + jobUrl, txt2imgData, authHeader);
  } catch (error) {
    throw new Error("Error creating job: " + error);
  }
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

export async function getJobResult(jobId: string) {
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
      useGenerationStore.setState({
        extra_progressMessage: JSON.stringify(jobDict, null, 4),
      });
      if (jobStatus === "SUCCESS") {
        // console.log(JSON.stringify(jobDict));
        useGenerationStore.setState({ extra_progressMessage: undefined });
        return jobDict;
        break;
      } else if (jobStatus === "FAILED") {
        // console.log(JSON.stringify(jobDict));
        break;
      }
    }
  }
}

export async function getJobCredits(txt2imgData: Txt2imgData) {
  const authHeader = await generateSignature(
    "POST",
    jobUrl + "/credits",
    appId,
    txt2imgData
  );
  const response = await sendRequest(
    "POST",
    urlPre + jobUrl + "/credits",
    txt2imgData,
    authHeader
  );
  console.log(JSON.stringify(response));
  return response;
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
