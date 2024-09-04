// Enum for Sampler options
export enum Sampler {
  EulerA = "Euler a",
  Euler = "Euler",
  LMS = "LMS",
  Heun = "Heun",
  DPM2 = "DPM2",
  DPM2A = "DPM2 a",
  DPMpp2SA = "DPM++ 2S a",
  DPMpp2M = "DPM++ 2M",
  DPMppSDE = "DPM++ SDE",
  DPMpp2MSDE = "DPM++ 2M SDE",
  DPMFast = "DPM fast",
  LMSKarras = "LMS Karras",
  DPM2Karras = "DPM2 Karras",
  DPM2AKarras = "DPM2 a Karras",
  DPMpp2SAKarras = "DPM++ 2S a Karras",
  DPMpp2MKarras = "DPM++ 2M Karras",
  DPMppSDEKarras = "DPM++ SDE Karras",
  DPMpp2MSDEKarras = "DPM++ 2M SDE Karras",
}

// Enum for VAE options
export enum Vae {
  Automatic = "Automatic",
  None = "None",
  VaeFtMse = "vae-ft-mse-840000-ema-pruned.ckpt",
  KlF8Anime = "kl-f8-anime.ckpt",
  KlF8Anime2 = "kl-f8-anime2.ckpt",
  Yozora = "YOZORA.vae.pt",
  OrangeMix = "orangemix.vae.pt",
  Blessed2 = "blessed2.vae.pt",
  AnimeVae = "animevae.pt",
  ClearVae = "ClearVAE.safetensors",
  PastelWaifu = "pastel-waifu-diffusion.vae.pt",
}

// Enum for Upscaler options
export enum Upscaler {
  Latent = "Latent",
  LatentAntialiased = "Latent (antialiased)",
  LatentBicubic = "Latent (bicubic)",
  LatentBicubicAntialiased = "Latent (bicubic antialiased)",
  LatentNearest = "Latent (nearest)",
  LatentNearestExact = "Latent (nearest-exact)",
  None = "None",
  Lanczos = "Lanczos",
  Nearest = "Nearest",
  UltraSharp4x = "4x-UltraSharp",
  Foolhardy4x = "4x_foolhardy_Remacri",
  Esrgan4x = "ESRGAN_4x",
  Resrgan4xPlus = "R-ESRGAN 4x+",
  Resrgan4xPlusAnime = "R-ESRGAN 4x+ Anime6B",
  NMKDSiax4x = "4x_NMKD-Siax_200k",
  AnimeSharp4x = "4x-AnimeSharp",
  NMKDSuperscale4x = "4x_NMKD-Superscale-SP_178000_G",
  SwinIR4x = "SwinIR_4x",
  NMKDSuperscale8x = "8x_NMKD-Superscale_150000_G",
}
