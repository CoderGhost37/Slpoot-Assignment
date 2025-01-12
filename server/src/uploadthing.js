import { createUploadthing } from 'uploadthing/express';

const f = createUploadthing();

export const uploadRouter = {
  blogImage: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  }).onUploadComplete((data) => {
    console.log('upload completed', data);
  }),
};
