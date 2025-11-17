import { STORAGE_BUCKET, supabase, isSupabaseConfigured } from "./supabase";

export interface UploadedFile {
  size: any;
  id: string;
  name: string;
  path: string;
  url: string;
  mimeType: string | null;
  createdAt: string;
}

export async function uploadFile(
  file: { uri: string; name: string; mimeType: string | null },
  onProgress?: (progress: number) => void
): Promise<UploadedFile> {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase is not configured. Please set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY in your .env file."
    );
  }
  try {
    const timestamp = Date.now();
    const fileName = `${timestamp}_${file.name}`;
    const filePath = fileName;

  const response = await fetch(file.uri);
const arrayBuffer = await response.arrayBuffer();
const fileBytes = new Uint8Array(arrayBuffer);


    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .upload(filePath, fileBytes, {
        contentType: file.mimeType || "application/octet-stream",
        upsert: false,
      });

    if (error) {
      throw new Error(`Upload failed: ${error.message}`);
    }

    if (!data || !data.path) {
      throw new Error("Upload succeeded but no path returned");
    }

    const uploadedPath = data.path;

    const {
      data: { publicUrl },
    } = supabase.storage.from(STORAGE_BUCKET).getPublicUrl(uploadedPath);

    console.log("Upload successful:", {
      path: uploadedPath,
      url: publicUrl,
      bucket: STORAGE_BUCKET,
    });

    return {
      id: uploadedPath,
      name: file.name,
      path: uploadedPath,
      url: publicUrl,
      mimeType: file.mimeType,
      size: fileBytes.length,
      createdAt: new Date().toISOString(),
    };
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to upload file"
    );
  }
}

export async function listFiles(): Promise<UploadedFile[]> {
  if (!isSupabaseConfigured()) {
    console.warn(
      "Supabase is not configured. Returning empty file list. Please set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY in your .env file."
    );
    return [];
  }
  try {
    const { data, error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .list("", {
        limit: 100,
        offset: 0,
        sortBy: { column: "created_at", order: "desc" },
      });

    if (error) {
      throw new Error(`Failed to list files: ${error.message}`);
    }

    const files: UploadedFile[] = [];

    for (const item of data) {
      if (item.name && !item.name.endsWith("/")) {
        
        const { data: urlData } = supabase.storage
          .from(STORAGE_BUCKET)
          .getPublicUrl(item.name);

        const originalName = item.name.includes("_")
          ? item.name.substring(item.name.indexOf("_") + 1)
          : item.name;

        files.push({
          id: item.id || item.name,
          name: originalName,
          path: item.name, 
          url: urlData.publicUrl,
          mimeType: item.metadata?.mimetype || null,
            size: item.metadata?.size ?? 0,
          createdAt: item.created_at || new Date().toISOString(),
        });
      }
    }

    return files;
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to list files"
    );
  }
}

export async function deleteFile(filePath: string): Promise<void> {
  if (!isSupabaseConfigured()) {
    throw new Error(
      "Supabase is not configured. Please set EXPO_PUBLIC_SUPABASE_URL and EXPO_PUBLIC_SUPABASE_ANON_KEY in your .env file."
    );
  }
  try {
    const { error } = await supabase.storage
      .from(STORAGE_BUCKET)
      .remove([filePath]);

    if (error) {
      throw new Error(`Failed to delete file: ${error.message}`);
    }
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "Failed to delete file"
    );
  }
}

