export const MAX_FILE_SIZE = 5 * 1024 * 1024; 

export const ALLOWED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg"];
export const ALLOWED_PDF_TYPE = "application/pdf";

export const ALLOWED_TYPES = [...ALLOWED_IMAGE_TYPES, ALLOWED_PDF_TYPE];

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

export function validateFile(file: {
  name: string;
  size: number;
  mimeType: string | null;
}): FileValidationResult {
  // Check file size
  if (file.size > MAX_FILE_SIZE) {
    return {
      isValid: false,
      error: "Only PNG/JPG/PDF under 5 MB allowed.",
    };
  }

  // Check file type
  if (!file.mimeType || !ALLOWED_TYPES.includes(file.mimeType)) {
    return {
      isValid: false,
      error: "Only PNG/JPG/PDF under 5 MB allowed.",
    };
  }

  return { isValid: true };
}

export function isImageFile(mimeType: string | null): boolean {
  return mimeType ? ALLOWED_IMAGE_TYPES.includes(mimeType) : false;
}

export function isPdfFile(mimeType: string | null): boolean {
  return mimeType === ALLOWED_PDF_TYPE;
}

