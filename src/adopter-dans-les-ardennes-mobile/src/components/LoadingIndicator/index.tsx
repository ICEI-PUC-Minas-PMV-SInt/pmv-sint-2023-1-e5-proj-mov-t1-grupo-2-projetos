import {Loading} from "src/components/LoadingIndicator/styles";

interface ILoadingIndicator {
    size: number | 'small' | 'large' | undefined
}

const LoadingIndicator = ({size}: ILoadingIndicator) => {
    return (
        <Loading size={size}/>
    )
}

export default LoadingIndicator;