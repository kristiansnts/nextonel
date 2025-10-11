"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { ColumnComponentProps } from "../types"

export function SelectColumn(_props: ColumnComponentProps) {
  // This component doesn't render anything - it's just for configuration
  return null
}

// Column definition generator
SelectColumn.createColumnDef = () => ({
  id: "select",
  header: ({ table }: any) => (
    <Checkbox
      checked={
        table.getIsAllPageRowsSelected() ||
        (table.getIsSomePageRowsSelected() && "indeterminate")
      }
      onCheckedChange={(value: boolean) => table.toggleAllPageRowsSelected(!!value)}
      aria-label="Select all"
    />
  ),
  cell: ({ row }: any) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value: boolean) => row.toggleSelected(!!value)}
      aria-label="Select row"
    />
  ),
  enableSorting: false,
  enableHiding: false,
})
