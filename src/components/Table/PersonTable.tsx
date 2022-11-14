import { useState, useEffect, useCallback, useMemo } from 'react'
import { Cell, createColumnHelper } from "@tanstack/react-table"
import { parse, ParseResult } from 'papaparse'
import Table from './Table'

/**
 * Retrieves the specified dataset and decodes it.
 * 
 * @param url - The location of the dataset to be fetched.
 * @returns The csv as a string
 */
async function fetchData(url: string) {
    const response = await fetch(url)
    const reader = response.body!.getReader()
    const result = await reader.read()
    const decoder = new TextDecoder('utf-8')
    const csv = decoder.decode(result.value)
    return csv
}

function PersonTable() {
    const [data, setData] = useState<Person[]>([])

    const getData = useCallback(async () => {
        parse(await fetchData("dataset.csv"), {
            worker: true,
            header: true,
            skipEmptyLines: true,
            delimiter: ";",
            complete: (result: ParseResult<Person>) => {
                setData(result.data)
            }
        })
    }, [])

    useEffect(() => {
        getData()
    }, [])

    const columnHelper = createColumnHelper<Person>()
    const columns = useMemo(() => [
        columnHelper.accessor('rank', {
            cell: info => info.getValue(),
            header: () => <span>Rank</span>
        }),
        columnHelper.accessor('name', {
            cell: info => info.getValue(),
            header: () => <span>Name</span>
        }),
        columnHelper.accessor('networth', {
            cell: info => info.getValue(),
            header: () => <span>Net Worth</span>
        }),
        columnHelper.accessor('lastchange', {
            id: 'lastchange',
            cell: info => info.getValue(),
            header: () => <span>Last Change ($)</span>
        }),
        columnHelper.accessor('ytdchange', {
            id: 'ytdchange',
            cell: info => info.getValue(),
            header: () => <span>YTD Change ($)</span>
        }),
        columnHelper.accessor('country', {
            cell: info => info.getValue(),
            header: () => <span>Country</span>
        }),
        columnHelper.accessor('industry', {
            cell: info => info.getValue(),
            header: () => <span>Industry</span>
        }),
    ], [])

    const cellStyle = (cell: Cell<Person, any>) => {
        if (cell.column.id === 'ytdchange' || cell.column.id === 'lastchange') {
            return {
                backgroundColor:  ((cell.getValue() as string).startsWith("-") ? "#DF896F" : "#BEDD98"),
                color: "black"
            }
        }

        return {}
    }

    return (
        <Table<Person> data={data} columns={columns} cellStyle={cellStyle}/>
    )
}

export default PersonTable