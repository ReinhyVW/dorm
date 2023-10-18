export async function getCenters () {
  const res = await fetch(`/api/centers`, { cache: 'no-cache' });

  const centers = await res.json();

  return centers;
}