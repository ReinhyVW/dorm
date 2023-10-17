export async function getAction(actionId: string) {
  const res = await fetch(`/api/actions/${actionId}`, { cache: 'no-cache' });

  interface Action {
    AssignedOn: Date;
    ReportedBy: string;
    AssignedTo: string;
    Item: string;
    StatusId: number;
    ActionDescription: string;
  }

  const action = await res.json() as Action[];

  const actionRecordset = action[0]

  return actionRecordset;
}

