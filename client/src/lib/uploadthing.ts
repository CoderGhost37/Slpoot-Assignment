import { generateUploadButton } from '@uploadthing/react';

export const UploadButton = generateUploadButton({
  url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/uploadthing`,
});
