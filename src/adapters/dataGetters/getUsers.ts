export async function getUsers() {
  const res = await fetch(`/api/users`, { cache: 'no-cache' });

  const users = await res.json();

  return users
}

export async function getUser(id: string) {
  const res = await fetch(`/api/users/${id}`, { cache: 'no-cache' });

  const user = await res.json();

  return user
}

export async function getUserByEmail(email: string) {
  const res = await fetch(`/api/users/email/${email}`, { cache: 'no-cache' });

  const user = await res.json();

  return user
}
