// import { NextResponse } from 'next/server';
// import cloudinary from 'cloudinary';

// cloudinary.v2.config({
//   cloud_name: 'drwf6bs9h',
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
//   secure: true
// });

// export async function GET() {
//   const imagesByFolder: any = {};

//   let nextCursor = null;
//   do {
//     const result = await cloudinary.v2.api.resources({
//       resource_type: 'image',
//       type: 'upload',
//       max_results: 500,
//       next_cursor: nextCursor
//     });

//     result.resources.forEach((resource: any) => {
//       const url = resource.secure_url;
//       const publicId = resource.public_id;
//       const pathParts = publicId.split('/');

//       if (pathParts[0] === 'bored_ape_layers' && pathParts.length >= 3) {
//         const subFolder = pathParts[1];
//         if (!imagesByFolder[subFolder]) {
//           imagesByFolder[subFolder] = [];
//         }
//         imagesByFolder[subFolder].push(url);
//       } else {
//         const folder = pathParts.length > 1 ? pathParts[0] : 'root';
//         if (!imagesByFolder[folder]) {
//           imagesByFolder[folder] = [];
//         }
//         imagesByFolder[folder].push(url);
//       }
//     });

//     nextCursor = result.next_cursor;
//   } while (nextCursor);

//   for (const folder in imagesByFolder) {
//     imagesByFolder[folder].sort(); 
//     console.log(`URLs for ${folder}:`);
//     imagesByFolder[folder].forEach((url: any) => console.log(url));
//   }

//   return NextResponse.json({ imagesByFolder });
// }