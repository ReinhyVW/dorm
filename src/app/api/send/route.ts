import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function GET(request: any) {
  const data = await request.json();

  const { ReportedBy, AssignedTo, StatusId, CenterId, ActionDescription, Acuteness, ItemId } = await data;

  try {
    const data = await resend.emails.send({
      from: 'mcaballero@dhgmc.com',
      to: ['mcaballero@dhgmc.com'],
      subject: 'Hello world',
      text: "Hola"
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
