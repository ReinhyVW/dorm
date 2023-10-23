export default async function submitAction(data: any) {
  const { ReportedBy, AssignedTo, StatusId, CenterId, ActionDescription, Acuteness, ItemId } = data;

  const request = { ReportedBy, AssignedTo, StatusId, CenterId, ActionDescription, Acuteness, ItemId }

  const res = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}api/actions`, {
    method: 'POST',
    body: JSON.stringify(request),
    headers: { 'Content-Type': 'application/json' }
  })

  const resData = res
}
