import SkeletonTable from './components/SkeletonTable'
import BookTable from './components/BookTable'
import useGetBooks from './hooks/useGetBooks'
import usePagination from './hooks/usePagination'
import useSort, { BookFields, orderType } from './hooks/useSort'

const Home = () => {
    const {
        isLoading,
        data,
        isError
    } = useGetBooks()

    const {
        sortableData,
        sort,
        handleSortASC,
        handleSortDSC
    } = useSort({ data })

    const {
        data: books,
        pagination,
        handleNextPage,
        handlePrevPage,
        handleFieldPerPage
    } = usePagination({ books: sortableData, sort })



    const handleSort = (orderType: orderType, field: BookFields) => {
        switch (orderType) {
            case 'ASC':
                handleSortASC({ field, order: 'ASC' })
                break;
            case 'DESC':
                handleSortDSC({ field, order: 'DESC' })
                break;
            default: return
        }
    }


    if (isLoading) {
        return (
            <div className=' flex flex-col items-center justify-center mt-10'>
                <SkeletonTable />
            </div>
        )
    }

    if (isError) {
        return (
            <div className=' h-screen flex flex-col items-center justify-center mt-10 text-3xl font-bold text-gray-200'>
                <p>Ops :S</p>
                <p>Something went wrong</p>
            </div>
        )
    }

    return (
        <div className=' flex flex-col items-center justify-center mt-10'>
            <BookTable
                data={books}
                sort={sort}
                handleSort={handleSort}
                pagination={pagination}
                handleNextPage={handleNextPage}
                handlePrevPage={handlePrevPage}
                handleFieldPerPage={handleFieldPerPage}
            />
        </div>
    )
}

export default Home
