export async function getStatus() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}api/status`, { cache: 'no-cache' });

  const status = await res.json();

  return status
}