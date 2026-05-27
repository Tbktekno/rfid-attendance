import axios, { AxiosInstance } from "axios";
import { StatusCodes } from "http-status-codes";
import { AppError } from "../errors/app-error";
import { env } from "../../config/env";
import { readFileAsBase64 } from "../utils/file-storage";

interface EncodeResponse {
  descriptor: number[];
}

interface VerifyResponse {
  isMatch: boolean;
  distance: number;
  confidence: number;
}

export class FaceRecognitionClient {
  private readonly http: AxiosInstance;

  constructor() {
    this.http = axios.create({
      baseURL: env.FACE_SERVICE_URL,
      timeout: 15000
    });
  }

  async encodeFace(input: { imageBase64?: string; imagePath?: string }): Promise<number[]> {
    const imageBase64 = input.imageBase64 ?? (input.imagePath ? await readFileAsBase64(input.imagePath) : undefined);

    if (!imageBase64) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Face image is required");
    }

    const { data } = await this.http.post<EncodeResponse>("/encode", {
      imageBase64
    });

    return data.descriptor;
  }

  async verifyFace(input: {
    imageBase64?: string;
    imagePath?: string;
    referenceDescriptor: number[];
  }): Promise<VerifyResponse> {
    const imageBase64 = input.imageBase64 ?? (input.imagePath ? await readFileAsBase64(input.imagePath) : undefined);

    if (!imageBase64) {
      throw new AppError(StatusCodes.BAD_REQUEST, "Face image is required");
    }

    const { data } = await this.http.post<VerifyResponse>("/verify", {
      imageBase64,
      referenceDescriptor: input.referenceDescriptor,
      threshold: env.FACE_MATCH_THRESHOLD
    });

    return data;
  }
}
