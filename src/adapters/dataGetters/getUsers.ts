export async function getUsers() {
  const res = await fetch(`/api/users`, { cache: 'no-cache' });

  const center = await res.json();

  return center
}

export async function getUser(id: string) {
  const res = await fetch(`/api/users/${id}`, { cache: 'no-cache' });

  const center = await res.json();

  return center
}