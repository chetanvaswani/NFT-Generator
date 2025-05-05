import { NextResponse } from 'next/server';
import prisma from '../../../../db';


export async function POST(request: Request) {
  try {
    const { name, description, coverImage, artistId } = await request.json();

    if (!name || !coverImage || !artistId) {
      return NextResponse.json({ error: 'Name, cover image, and artist ID are required' }, { status: 400 });
    }

    const artist = await prisma.artist.findUnique({ where: { id: artistId } });
    if (!artist) {
      return NextResponse.json({ error: 'Artist not found' }, { status: 404 });
    }

    const collection = await prisma.collection.create({
      data: {
        name,
        description,
        coverImage,
        artistId,
      },
    });

    console.log('Created collection:', collection);

    return NextResponse.json({ message: 'Collection created successfully', collection }, { status: 201 });
  } catch (error) {
    console.error('Error creating collection:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}