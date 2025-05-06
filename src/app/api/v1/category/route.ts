import { NextResponse } from 'next/server';
import prisma from '../../../../db';

export async function POST(request: Request) {
  try {
    const { name, collectionId } = await request.json();

    if (!name || !collectionId) {
      return NextResponse.json({ error: 'Name and collection ID are required' }, { status: 400 });
    }

    const collection = await prisma.collection.findUnique({ where: { id: collectionId } });
    if (!collection) {
      return NextResponse.json({ error: 'Collection not found' }, { status: 404 });
    }

    const category = await prisma.category.create({
      data: {
        name,
        collectionId,
      },
    });

    console.log('Created category:', category);

    return NextResponse.json({ message: 'Category created successfully', category }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating category:', error);
    return NextResponse.json({ error: 'Internal server error', details: error?.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}