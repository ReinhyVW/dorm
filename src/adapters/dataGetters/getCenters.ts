export async function getCenters () {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}api/centers`, { cache: 'no-cache' });

  const centers = await res.json();

  return centers;
}