import { ColumnDef, getCoreRowModel, useReactTable, flexRender, SortingState, getSortedRowModel } from '@tanstack/react-table'
import { useState } from 'react'
import "../../styles/Table.css"

type TableProps<T> = {
    data: T[]
    columns: ColumnDef<T, any>[]
    cellStyle: Function
}

// The generic table class used to display some dataset. I made the decision
// to abstract that functionality as in a real usecase more than a single csv
// would likely be displayed. Here data represents the rows, columns the
// columns, and cellStyle any desired conditional formatting.
function Table<E>({ data, columns, cellStyle }: TableProps<E> ) {
    const [sorting, setSorting] = useState<SortingState>([])

    const table = useReactTable({
        data,
        columns,
        enableColumnResizing: true,
        state: {
            sorting
        },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    })

    return (
        <div className="p-2">
            <table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <th key={header.id} colSpan={header.colSpan}>
                                    {header.isPlaceholder ? null : 
                                       <div style={(header.column.getCanSort() ? { cursor: "pointer" }: {})}
                                         onClick={header
                                                    .column
                                                    .getToggleSortingHandler()} >
                                       {flexRender(
                                         header.column.columnDef.header,
                                         header.getContext()
                                       )}
                                       {{
                                         asc: ' ^',
                                         desc: ' v',
                                       }[header.column.getIsSorted() as string] 
                                            ?? null}
                                     </div>
                                    }
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                        <tr key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <td style={cellStyle(cell)} key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, 
                                        cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Table