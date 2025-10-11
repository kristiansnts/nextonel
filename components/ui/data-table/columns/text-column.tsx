"use client"

import { Button } from "@/components/ui/button"
import { ArrowUpDown } from "lucide-react"
import { TextColumnProps } from "../types"
import { Column, Row } from "@tanstack/react-table"

export function TextColumn() {
  // This component doesn't render anything - it's just for configuration
  return null
}

// Column definition generator
TextColumn.createColumnDef = (props: TextColumnProps) => {
  const {
    accessor = "",
    header = "",
    sortable = false,
    filterable = false,
    hideable = true,
    transform,
    numeric = false,
    format,
  } = props

  return {
    accessorKey: accessor,
    header: sortable
      ? ({ column }: { column: Column<unknown> }) => (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            {header}
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      : header,
    cell: ({ row, getValue }: { row: Row<unknown>; getValue: () => unknown }) => {
      const value = getValue()

      // Handle numeric columns
      if (numeric) {
        const numValue = value as number
        return <span>{format ? format(numValue) : numValue}</span>
      }

      // Handle transform function
      if (transform) {
        return <span>{transform(value)}</span>
      }

      // Handle nested accessors like "company.name"
      if (accessor.includes(".")) {
        const keys = accessor.split(".")
        let nestedValue = row.original
        for (const key of keys) {
          nestedValue = nestedValue?.[key]
        }
        return <span>{nestedValue}</span>
      }

      // Handle string values with capitalize
      if (typeof value === "string") {
        return <span className="capitalize">{value}</span>
      }

      return <span>{value}</span>
    },
    enableSorting: sortable,
    enableHiding: hideable,
    filterFn: filterable
      ? (row: Row<unknown>, id: string, value: string[]) => {
          return value.includes(String(row.getValue(id)))
        }
      : undefined,
  }
}
