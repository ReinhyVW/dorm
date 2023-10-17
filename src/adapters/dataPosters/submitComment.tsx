export default async function submitComment(data: any) {
  const { ActionId, UserId, commentContent } = data;

  const request = { ActionId, UserId, commentContent }

  const res = await fetch(`${process.env.HOST_ROUTE}api/comments`, {
    method: 'POST',
    body: JSON.stringify(request),
    headers: { 'Content-Type': 'application/json' }
  })

  const resData = res
}