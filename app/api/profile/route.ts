import { NextResponse } from 'next/server';

export async function GET() {
  const userId = process.env.PROJECTS_USER_ID;
  const apiBase = process.env.API_BASE_URL;
  if (!userId || !apiBase) {
    return NextResponse.json(
      { error: 'PROJECTS_USER_ID or API_BASE_URL not configured in environment' },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(`${apiBase}/profiles/${userId}`, {
      next: { revalidate: 300 } // Cache profile for 5 minutes
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch profile: ${res.statusText}`);
    }

    const profile = await res.json();
    return NextResponse.json(profile);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    console.error('Error fetching profile:', error);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
