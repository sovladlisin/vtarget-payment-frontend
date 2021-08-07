import * as React from 'react';
import { BlockLoading } from 'react-loadingg';
interface ILoadingProps {
    height: number
}

const Loading: React.FunctionComponent<ILoadingProps> = (props) => {
    return <div style={{ position: 'relative', height: props.height + 'px' }}>
        <BlockLoading />
    </div>;
};

export default Loading;
