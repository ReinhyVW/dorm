import { Columns, Centers } from "@/types";

export async function getColumns() {
  const res = await fetch(`http://localhost:3000/api/centers`, { cache: 'no-cache' });

  const centerData = await res.json();

  const columns: Columns = []

  columns.push({
    key: 'list',
    label: 'Medical Center List',
  })

  centerData.forEach((item: Centers) => {
    columns.push({
      key: String(item.CenterId),
      label: item.Center,
    });
  });

  columns.push(
    { key: 'comments', label: 'Comments' },
    { key: 'reported', label: 'Reported By' },
    { key: 'assigned', label: 'Action For' },
    { key: 'center', label: 'Medical Center' },
    { key: 'acuteness', label: 'Acuteness' },
    { key: 'description', label: 'Action Description' }
  );

  return columns;
}

export async function getRows() {
  const res = await fetch(`http://localhost:3000/api/items`, { cache: 'no-cache' });
  const rows = await res.json();

  return rows;
}
