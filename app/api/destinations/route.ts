import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("wanderlust");
    const destinations = await db.collection("destinations").find({}).toArray();
    return NextResponse.json(destinations);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch destinations' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("wanderlust");
    const data = await request.json();
    
    const result = await db.collection("destinations").insertOne({
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    });
    
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create destination' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    const client = await clientPromise;
    const db = client.db("wanderlust");
    const data = await request.json();
    const { _id, ...updateData } = data;
    
    const result = await db.collection("destinations").updateOne(
      { _id: new ObjectId(_id) },
      { 
        $set: {
          ...updateData,
          updatedAt: new Date()
        }
      }
    );
    
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update destination' }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');
    
    if (!id) {
      return NextResponse.json({ error: 'ID is required' }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("wanderlust");
    
    const result = await db.collection("destinations").deleteOne({
      _id: new ObjectId(id)
    });
    
    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete destination' }, { status: 500 });
  }
}