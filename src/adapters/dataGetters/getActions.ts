export async function getActions() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}api/actions`, { cache: 'no-cache' });

  const action = await res.json();

  const actionRecordset = action

  return actionRecordset;
}

export async function getAction(actionId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}api/actions/${actionId}`, { cache: 'no-cache' });

  const action = await res.json();

  const actionRecordset = action[0]

  return actionRecordset;
}

export async function getActionsByReporter(userId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}api/actions/user/${userId}`, { cache: 'no-cache' });

  const action = await res.json();

  const actionRecordset = action[0]

  return actionRecordset;
}
