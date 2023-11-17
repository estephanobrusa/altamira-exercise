interface Props {
    width?: string;
    height?: string;
    extraProps?: string;
}

const Skeleton = ({ width = 'w-48', height = 'h-6', extraProps = '' }: Props) => {
    return (
        <div className={`bg-gray-300 rounded-md animate-pulse ${width} ${height} ${extraProps}`} />
    );
};

export default Skeleton;