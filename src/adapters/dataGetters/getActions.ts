export async function getAction(actionId: string) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DB_HOST}api/actions/${actionId}`, { cache: 'no-cache' });

  interface Action {
    AssignedOn: Date;
    ReportedBy: string;
    AssignedTo: string;
    Item: string;
    StatusId: number;
    ActionDescription: string;
    Center: string;
    Resolution: null | string
  }

  const action = await res.json() as Action[];

  const actionRecordset = action[0]

  return actionRecordset;
}
