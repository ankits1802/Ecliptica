// This file is no longer used as the voice agent has been refactored
// to use browser-native APIs instead of a LiveKit backend.
// It can be safely deleted.

import { type NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    return NextResponse.json({ error: 'This endpoint is deprecated.' }, { status: 410 });
}
