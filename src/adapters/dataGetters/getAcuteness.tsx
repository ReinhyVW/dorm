export async function getAcuteness() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}api/acuteness`, { cache: 'no-cache' });

  const acuteness = await res.json();

  return acuteness;
}
