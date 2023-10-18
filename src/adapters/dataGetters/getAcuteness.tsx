export async function getAcuteness() {
  const res = await fetch(`/api/acuteness`, { cache: 'no-cache' });

  const acuteness = await res.json();

  return acuteness;
}
