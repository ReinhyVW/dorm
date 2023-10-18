import { getItemTypes } from "@/adapters/dataGetters/getItemsType";
import { getColumns, getRows } from "../adapters/getTableData";

import DatePicker from "@/components/inputs/DatePicker";
import MeetingTable from "../components/MeetingTable";

import GeneralSection from "../components/GeneralSection";

export default async function Meeting({ params }: { params: { date: string } }) {
  const date = params.date

  const itemTypes = await getItemTypes()

  const columns = await getColumns()

  const rows = await getRows()


  return (
    <main className="max-w-screen min-h-screen flex flex-col items-center py-10 gap-5" aria-hidden="true">
      <div className="w-2/3 flex items-center justify-center gap-5">
        <h1 className="text-2xl text-foreground-500 font-semibold">Record New Meeting</h1>
        <DatePicker readOnly={true} selectedDate={date} />
      </div>

      <div className="w-10/12 flex flex-col justify-evenly items-center gap-5">
        {
          itemTypes.map((itemType: any) => (
            <div key={itemType.id} className="flex flex-col w-full gap-2">
              <h2 className="text-xl text-foreground-500" key={itemType.TypeId}>{itemType.Type}</h2>
              <MeetingTable
                key={`${itemType.TypeId}-table`}
                id={`${itemType.TypeId}-table`}
                columns={columns}
                rows={rows.filter((row: any) => row.ItemType === itemType.Type)}
              />
            </div>
          ))
        }
      </div>

      <div className="w-4/5 flex flex-col gap-8 items-center">
        <GeneralSection date={{ date }} />
      </div>

    </main>
  );
}
