import { NextResponse } from 'next/server';
import prisma from '../../../../db';

export async function GET(request: Request) {
    try {
      const url = new URL(request.url);
      const collectionIdStr = url.searchParams.get('collectionId');
  
      if (!collectionIdStr) {
        return NextResponse.json({ error: 'Collection ID is required' }, { status: 400 });
      }
  
      const collectionId = parseInt(collectionIdStr, 10);
      if (isNaN(collectionId)) {
        return NextResponse.json({ error: 'Invalid collection ID' }, { status: 400 });
      }
  
      const categories = await prisma.category.findMany({
        where: { collectionId: collectionId },
        select: { id: true, name: true, collectionId: true },
      });
  
      if (categories.length === 0) {
        return NextResponse.json({ message: 'No categories found for this collection' }, { status: 200 });
      }
  
      return NextResponse.json({ message: 'Categories fetched successfully', data: categories }, { status: 200 });
    } catch (error: any) {
      console.error('Error fetching categories:', error);
      return NextResponse.json({ error: 'Internal server error', details: error?.message }, { status: 500 });
    }
}