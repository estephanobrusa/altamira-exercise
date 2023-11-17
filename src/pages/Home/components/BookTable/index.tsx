import { useState } from 'react'
import Arrow from '../../../../components/atoms/icons/Arrow'
import { Book } from '../../hooks/useGetBooks'
import { BookFields, Sort, orderType } from '../../hooks/useSort'
import { NUMBER_OF_BOOKS_PER_PAGE, Pagination } from '../../hooks/usePagination'

interface Props {
    data: Book[]
    sort: Sort
    handleSort: (orderType: orderType, field: BookFields) => void
    pagination: Pagination
    handlePrevPage: () => void
    handleNextPage: () => void
    handleFieldPerPage: (limit: number) => void
}


const BookTable = ({
    data,
    sort,
    handleSort,
    pagination,
    handlePrevPage,
    handleNextPage,
    handleFieldPerPage }: Props) => {

    const [fieldHover, setFieldHover] = useState<BookFields | null>(null)


    const tableCell = (field: BookFields) => {
        return (
            <td className={`w-32 p-4 ${sort?.field === field && 'bg-slate-400'}`}
                onMouseEnter={() => setFieldHover(field)}
                onMouseLeave={() => setFieldHover(null)}
            >
                <div className='flex items-center gap-3'>
                    <span className='p-2'>{field}</span>

                    {fieldHover === field &&
                        <div className={` transition duration-500 ease-in-out  ${sort?.order === 'ASC' && 'rotate-180'}`}
                            onClick={() => handleSort(sort?.order === 'ASC' ? 'DESC' : 'ASC', field)}
                        >
                            <Arrow />
                        </div>
                    }

                </div>
            </td>
        )
    }
    return (
        <>
            <table className='w-3/4 text-left text-sm font-light'>
                <thead className='px-6 py-6 border-b font-medium bg-slate-700 text-slate-200'>
                    <tr>
                        {tableCell(BookFields.ISBN)}
                        {tableCell(BookFields.TITLE)}
                        {tableCell(BookFields.AUTHOR)}
                        {tableCell(BookFields.YEAR)}
                        {tableCell(BookFields.PUBLISHER)}
                    </tr>
                </thead>
                <tbody>
                    {data?.map((book) => {
                        return (<tr key={book.isbn} className='border-b font-normal text-gray-200 hover:bg-gray-600 hover:scale-110 duration-300 cursor-pointer'>
                            <td className=' px-6 py-6'>
                                {book.isbn}
                            </td>
                            <td className='px-6 py-6'>
                                {book.title}
                            </td>
                            <td className='px-6 py-6'>
                                {book.author}
                            </td>
                            <td className=' px-6 py-6'>
                                {book.year}
                            </td>
                            <td className='w-52 px-6 py-6'>
                                {book.publisher}
                            </td>
                        </tr>)
                    })}
                </tbody>
            </table>
            {data.length === 0 &&
                <p className='text-gray-200 mt-5'>No data
                </p>
            }
            <div className='my-6 w-3/4 flex justify-between text-gray-200'>
                <div className='flex gap-3'>
                    <span className='cursor-pointer' onClick={() => handlePrevPage()}>prev</span>
                    <span>{pagination.page}</span>
                    <span className='cursor-pointer' onClick={() => handleNextPage()}>next</span>
                </div>
                <span>pages: {pagination.pages}</span>
                <div className='flex gap-3'>
                    <span>per page: </span>
                    <select
                        className='w-12  order-none bg-transparent outline-none'
                        defaultValue={pagination.limit.toString()}
                        onChange={(e) => handleFieldPerPage(+e.target.value)}
                    >
                        {Object.values(NUMBER_OF_BOOKS_PER_PAGE).map((number) => {
                            return <option key={number} value={number}>
                                {number}
                            </option>
                        })}
                    </select>
                </div>
                <span>total: {pagination.total}</span>
            </div>
        </>
    )
}

export default BookTable
