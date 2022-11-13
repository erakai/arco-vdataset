import { useState, useEffect, useCallback } from 'react'
import { createColumnHelper } from "@tanstack/react-table"
import { parse, ParseResult } from 'papaparse'
import Table from './Table'

async function fetchData() {
    const response = await fetch("dataset.csv")
    const reader = response.body!.getReader()
    const result = await reader.read()
    const decoder = new TextDecoder('utf-8')
    const csv = decoder.decode(result.value)
    return csv
}

function PersonTable() {
    const [data, setData] = useState<Person[]>([])

    const getData = useCallback(async () => {
        parse(await fetchData(), {
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

    const columns = [
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
            cell: info => info.getValue(),
            header: () => <span>Last Change</span>
        }),
        columnHelper.accessor('ytdchange', {
            cell: info => info.getValue(),
            header: () => <span>YTD Change</span>
        }),
        columnHelper.accessor('country', {
            cell: info => info.getValue(),
            header: () => <span>Country</span>
        }),
        columnHelper.accessor('industry', {
            cell: info => info.getValue(),
            header: () => <span>Industry</span>
        }),
    ]

    return (
        <Table<Person> data={data} columns={columns}/>
    )
}

export default PersonTable