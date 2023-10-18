export async function getStatus() {
  const res = await fetch(`/api/status`, { cache: 'no-cache' });

  const status = await res.json();

  return status
}