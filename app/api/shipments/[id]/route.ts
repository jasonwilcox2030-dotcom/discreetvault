import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const trackingId = params.id;

    if (!trackingId) {
      return NextResponse.json(
        { error: 'Tracking ID required' },
        { status: 400 }
      );
    }

    const { data, error } = await supabase
      .from('shipments')
      .select('*')
      .eq('tracking_number', trackingId.toUpperCase())
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'Shipment not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json(
      { error: 'Failed to fetch shipment' },
      { status: 500 }
    );
  }
}
