export default async function saveRecord(data: any) {
  const request = { data }

  const res = await fetch('api/records', {
    method: 'POST',
    body: JSON.stringify(request),
    headers: { 'Content-Type': 'application/json' }
  })

  const resData = res
}