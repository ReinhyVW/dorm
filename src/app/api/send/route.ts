import EmailTemplate from '@/components/email';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

export async function POST(request: any) {
  const data = await request.json();

  console.log(data);

  try {
    const data = await resend.emails.send({
      from: 'mcaballero@dhgmc.com',
      to: ['mcaballero@dhgmc.com'],
      subject: 'Hello world',
      react: EmailTemplate({ ReportedBy: ReportedBy, AssignedTo: AssignedTo, StatusId: StatusId, CenterId: CenterId, ActionDescription: ActionDescription, Acuteness: Acuteness, ItemId: ItemId }),
      text: ""
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
