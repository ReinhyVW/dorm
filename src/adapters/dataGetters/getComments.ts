export async function getComments(actionId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}api/comments/${actionId}`, { cache: 'no-cache' });

  const comments = await res.json();

  const commentsRecordset = comments

  return commentsRecordset;
}