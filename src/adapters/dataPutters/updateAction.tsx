export async function updateAction(actionId: string, data: any) {
  const { StatusId, Resolution } = data;

  const request = { StatusId, Resolution }

  const res = await fetch(`/api/actions/${actionId}`, {
    method: 'PUT',
    body: JSON.stringify(request),
    headers: { 'Content-Type': 'application/json' }
  })

  const resData = res

  return resData
}
