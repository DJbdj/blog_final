import { generateKey } from "@/features/media/media.utils";

export async function putToR2(env: Env, image: File) {
  const key = generateKey(image.name);
  const contentType = image.type;
  const url = `/images/${key}`;

  await env.R2.put(key, image.stream(), {
    httpMetadata: {
      contentType,
    },
    customMetadata: {
      originalName: image.name,
    },
  });

  return {
    key,
    url,
    fileName: image.name,
    mimeType: contentType,
    sizeInBytes: image.size,
  };
}

export async function deleteFromR2(env: Env, key: string) {
  await env.R2.delete(key);
}

export async function getFromR2(env: Env, key: string) {
  return await env.R2.get(key);
}

/**
 * Upload site asset (favicon, theme images, etc.) to R2
 * @param env - Environment variables
 * @param file - The file to upload
 * @param assetPath - The asset path (e.g., "favicon/favicon.svg", "themes/default/home-image.webp")
 * @returns The URL of the uploaded asset
 */
export async function putSiteAsset(
  env: Env,
  file: File,
  assetPath: string,
): Promise<{ url: string; key: string }> {
  const contentType = file.type;
  const url = `/images/asset/${assetPath}`;

  await env.R2.put(assetPath, file.stream(), {
    httpMetadata: {
      contentType,
    },
    customMetadata: {
      originalName: file.name,
    },
  });

  return {
    key: assetPath,
    url,
  };
}
