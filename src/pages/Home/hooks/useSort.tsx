import { useEffect, useState } from 'react'
import { Book } from './useGetBooks'


export interface Sort {
    field: 'ISBN' | 'TITLE' | 'AUTHOR' | 'YEAR' | 'PUBLISHER' | '',
    order: orderType
}

export const enum BookFields {
    ISBN = 'ISBN',
    TITLE = 'TITLE',
    AUTHOR = 'AUTHOR',
    YEAR = 'YEAR',
    PUBLISHER = 'PUBLISHER'
}

export type orderType = 'ASC' | 'DESC'

interface Props {
    data: Book[]
}

const useSort = ({ data }: Props) => {
    const [sortableData, setSortableData] = useState<Book[]>([])
    const [sort, setSort] = useState<Sort>({ field: '', order: 'ASC' })

    useEffect(() => {
        setSortableData(data)
    }, [data])

    const handleSortASC = (sortType: Sort) => {
        let sort: Book[] = []
        switch (sortType.field) {
            case BookFields.ISBN:
                sort = data.sort((a, b) => a?.isbn.localeCompare(b?.isbn))
                break;
            case BookFields.TITLE:
                sort = data.sort((a, b) => a?.title.localeCompare(b?.title))
                break;
            case BookFields.AUTHOR:
                sort = data.sort((a, b) => a?.author.localeCompare(b?.author))
                break;
            case BookFields.YEAR:
                sort = data.sort((a, b) => a.year - b.year)
                break;
            case BookFields.PUBLISHER:
                sort = data.sort((a, b) => a?.publisher.localeCompare(b?.publisher))
                break;
            default: return data
        }

        setSortableData(sort)
        setSort({ field: sortType.field, order: 'ASC' })
    }

    const handleSortDSC = (sortType: Sort) => {
        let sort: Book[] = []
        switch (sortType.field) {
            case "ISBN":
                sort = data.sort((a, b) => b?.isbn.localeCompare(a?.isbn))
                break;
            case "TITLE":
                sort = data.sort((a, b) => b?.title.localeCompare(a?.title))
                break;
            case "AUTHOR":
                sort = data.sort((a, b) => b?.author.localeCompare(a?.author))
                break;
            case "YEAR":
                sort = data.sort((a, b) => b.year - a.year)
                break;
            case "PUBLISHER":
                sort = data.sort((a, b) => b?.publisher.localeCompare(a?.publisher))
                break;
            default: return data
        }
        setSortableData(sort)
        setSort({ field: sortType.field, order: 'DESC' })
    }

    return {
        sortableData,
        sort,
        handleSortASC,
        handleSortDSC
    }
}

export default useSort
