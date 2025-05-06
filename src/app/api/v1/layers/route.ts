import { NextResponse } from 'next/server';
import prisma from '../../../../db';

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const categoryIdStr = url.searchParams.get('categoryId');

    if (!categoryIdStr) {
      return NextResponse.json({ error: 'Category ID is required' }, { status: 400 });
    }

    const categoryId = parseInt(categoryIdStr, 10);
    if (isNaN(categoryId)) {
      return NextResponse.json({ error: 'Invalid category ID' }, { status: 400 });
    }

    const layers = await prisma.layers.findMany({
      where: { categoryId: categoryId },
      select: { id: true, imageUrl: true, traitName: true, createdAt: true, artistId: true, collectionId: true, categoryId: true },
    });

    if (layers.length === 0) {
      return NextResponse.json({ message: 'No layers found for this category' }, { status: 200 });
    }

    return NextResponse.json({ message: 'Layers fetched successfully', data: layers }, { status: 200 });
  } catch (error: any) {
    console.error('Error fetching layers:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  }
}