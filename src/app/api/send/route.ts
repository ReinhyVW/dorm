import { EmailTemplate } from '@/components/emails/assignedEmail';
import { NextResponse } from 'next/server'; // Assuming 'next/server' is a valid import
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);

interface EmailTemplateProps {
  ActionId: number;
  On: string;
  ReportedByUserId: any; // It's unclear whether ReportedByUserId and AssignedToUserId should be 'any'
  ReportedBy: string;
  ReportedByEmail: string;
  AssignedToUserId: any;
  AssignedTo: string;
  AssignedToEmail: string;
  Item: string;
  Status: string;
  ActionDescription: string;
  Acuteness: string;
  Center: string;
  Resolution: null | string;
}

export async function POST(request: Request) {
  const requestData: EmailTemplateProps = await request.json();

  const {
    ActionId,
    On,
    ReportedByUserId,
    ReportedBy,
    ReportedByEmail,
    AssignedToUserId,
    AssignedTo,
    AssignedToEmail,
    Item,
    Status,
    ActionDescription,
    Acuteness,
    Center,
  } = requestData; // Removed unnecessary 'await'

  try {
    const data = await resend.emails.send({
      from: ReportedByEmail,
      to: [AssignedToEmail], // Assuming 'AssignedToEmail' is the recipient's email
      subject: `Action Assignment #${ActionId}`,
      react: EmailTemplate(requestData), // Passing requestData instead of calling the function
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error });
  }
}
