export async function getItems() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}api/items`, { cache: 'no-cache' });
  const items = await res.json();

  return items;
}
