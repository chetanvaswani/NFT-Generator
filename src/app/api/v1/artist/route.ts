import { NextResponse } from 'next/server';
import prisma from "../../../../db";


export async function POST(request: Request) {
  try {
    const { name, username, mobNumber, email } = await request.json();


    if (!name || !username) {
      return NextResponse.json({ error: 'Name and username are required' }, { status: 400 });
    }


    if (!email && !mobNumber) {
      return NextResponse.json(
        { error: 'At least one of email or mobile number is required' },
        { status: 400 }
      );
    }


    const user = await prisma.user.create({
      data: {
        name,
        username,
        mobNumber,
        email,
        type: 'ARTIST',
        artist: {
          create: {},
        },
      },
      include: {
        artist: true,
      },
    });

    console.log('Created artist user:', user);

    return NextResponse.json({ message: 'Artist created successfully', user }, { status: 201 });
  } catch (error) {
    console.error('Error creating artist:', error);
    return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}