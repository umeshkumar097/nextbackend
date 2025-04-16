import { Injectable } from '@nestjs/common';
import { v2 as cloudinary } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });
  }

  uploadPdf(buffer: Buffer, fileName: string) {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          resource_type: 'raw',
          public_id: `contracts/${fileName}`,
          format: 'pdf',
        },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        },
      ).end(buffer);
    });
  }
}
