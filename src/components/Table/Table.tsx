import { ColumnDef, getCoreRowModel, useReactTable, flexRender } from '@tanstack/react-table'

type TableProps<T> = {
    data: T[]
    columns: ColumnDef<T, any>[]
}

function Table<E>({ data, columns }: TableProps<E> ) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        enableColumnResizing: true,
    })

    return (
        <div className="p-2">
            <table>
                <thead>
                    {table.getHeaderGroups().map(headerGroup => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map(header => (
                        <th key={header.id} colSpan={header.colSpan}>
                            {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                                )}
                        </th>
                        ))}
                    </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows.map(row => (
                    <tr key={row.id}>
                        {row.getVisibleCells().map(cell => (
                        <td key={cell.id}>
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
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