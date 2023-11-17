import Skeleton from "../../../../components/atoms/Skeleton"

const SkeletonTable = () => {
    return (
        <div className='w-3/4 '>
            <div >
                <div className="flex gap-1 justify-between ">
                    <Skeleton width="w-full" height="h-12" />


                </div>
            </div>
            <div className="mt-2">
                <div className="flex flex-col gap-1 ">
                    <Skeleton width="w-full" height="h-10" />
                    <Skeleton width="w-full" height="h-10" />
                    <Skeleton width="w-full" height="h-10" />
                    <Skeleton width="w-full" height="h-10" />
                    <Skeleton width="w-full" height="h-10" />
                    <Skeleton width="w-full" height="h-10" />
                </div>
            </div>
            <div className="mt-2 ">
                <div className="flex justify-between gap-1 ">
                    <Skeleton width="w-14" height="h-8" />
                    <Skeleton width="w-14" height="h-8" />
                    <Skeleton width="w-14" height="h-8" />
                </div>
            </div>
        </div>

    )
}

export default SkeletonTable
