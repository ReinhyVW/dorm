export default async function submitEmail(data: any) {
  const { ActionId, AssignedOn, ReportedByUserId, ReportedBy, ReportedByEmail, AssignedToUserId, AssignedTo, AssignedToEmail, Item, Status, ActionDescription, Acuteness, Center } = data;

  console.log("Llega a submitEmail")

  const On = AssignedOn?.toISOString();

  const request = { ActionId, On, ReportedByUserId, ReportedBy, ReportedByEmail, AssignedToUserId, AssignedTo, AssignedToEmail, Item, Status, ActionDescription, Acuteness, Center }

  const res = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}api/send`, {
    method: 'POST',
    body: JSON.stringify(request),
    headers: { 'Content-Type': 'application/json' }
  })

  const resData = res
}
