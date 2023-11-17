import { useEffect, useState } from 'react'
import { Book } from './useGetBooks'
import { Sort } from './useSort'


export interface Pagination {
    page: number,
    limit: number,
    total: number,
    pages: number
}
export enum NUMBER_OF_BOOKS_PER_PAGE {
    N_10 = "5",
    N_20 = "10",
    N_50 = "20",
    N_100 = "50"
}
interface Props {
    books: Book[]
    sort: Sort
}

const usePagination = ({ books, sort }: Props) => {
    const [data, setData] = useState(books)

    const [pagination, setPagination] = useState<Pagination>({
        page: 1,
        limit: +NUMBER_OF_BOOKS_PER_PAGE.N_10,
        total: 0,
        pages: 0
    })

    const sliceData = () => {
        const newData = books?.slice((pagination.page - 1) * pagination.limit, pagination.page * pagination.limit)
        setData(newData)

    }
    useEffect(() => {
        if (books.length > 0 && pagination.total > 0) {
            sliceData()
        }

    }, [pagination])

    useEffect(() => {
        if (books.length > 0) {
            setPagination({
                ...pagination,
                total: books.length,
                pages: Math.ceil(books.length / pagination.limit)
            })
        }

    }, [books, sort])


    const handleNextPage = () => {
        if (pagination.page === pagination.pages) return
        setPagination({
            ...pagination,
            page: pagination.page + 1
        })
    }

    const handlePrevPage = () => {
        if (pagination.page === 1) return
        sliceData()
        setPagination({
            ...pagination,
            page: pagination.page - 1
        })
    }

    const handleFieldPerPage = (limit: number) => {
        setPagination({
            ...pagination,
            page: 1,
            pages: Math.ceil(books.length / limit),
            limit
        })
        sliceData()
    }



    return {
        data,
        pagination,
        handleNextPage,
        handlePrevPage,
        handleFieldPerPage
    }
}

export default usePagination
