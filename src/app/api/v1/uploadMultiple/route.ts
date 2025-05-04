// import { NextResponse } from 'next/server';
// import prisma from "../../../../db"; 

// export async function POST(request: Request) {
//   try {
//     console.log('DATABASE_URL:', process.env.DATABASE_URL ? 'Set' : 'Not set');

//     const { imagesByFolder } = await request.json();

//     if (!imagesByFolder || typeof imagesByFolder !== 'object') {
//       return NextResponse.json({ error: 'Invalid input: imagesByFolder is required' }, { status: 400 });
//     }

//     const uploadData: any = [];

//     for (const [categoryName, urls] of Object.entries(imagesByFolder)) {
//       if (!Array.isArray(urls)) continue;

//       for (const imageUrl of urls) {
//         const urlParts = imageUrl.split('/');
//         const fileNameWithId = urlParts[urlParts.length - 1]; 
//         const traitName = fileNameWithId.split('_')[0]; 

//         const data = {
//           collection: 'bored-ape',
//           artist: 'bored-ape-orignals',
//           categoryName,
//           imageUrl,
//           traitName,
//         };

//         const insertedRecord = await prisma.layerImage.create({
//           data: {
//             collection: data.collection,
//             artist: data.artist,
//             categoryName: data.categoryName,
//             imageUrl: data.imageUrl,
//             traitName: data.traitName,
//             createdAt: new Date(),
//           },
//         });

//         // after each upload
//         console.log(`Uploaded record:`, insertedRecord);

//         uploadData.push(data);
//       }
//     }

//     return NextResponse.json({ message: 'Data uploaded successfully', data: uploadData }, { status: 200 });
//   } catch (error: any) {
//     console.error('Error processing request:', error);
//     return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
//   } finally {
//     await prisma.$disconnect();
//   }
// }