import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

export async function uploadToCloudinary(imageBuffer: Buffer, folder: string, index: number, symbol: string): Promise<string> {
    return new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload_stream(
        { folder, public_id: `${symbol}${index}`, resource_type: 'image' },
        (error: any, result: any) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        }
      ).end(imageBuffer);
    });
  }