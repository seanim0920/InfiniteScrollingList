import React from 'react';
import './App.css';
import { VariableSizeList as List, areEqual } from 'react-window'
import { useWindowSize } from "./getCurrentWindowSize";

const DynamicallySizedList = ({ items, onAction, containerHeight, containerWidth }) => { //layout only. we may be able to calculate width and height from in here.
    const listRef = React.useRef();
    const rowSizes = {};
    const [windowWidth] = useWindowSize();
    
    React.useEffect(() => {
        console.log(windowWidth);
        console.log(rowSizes);
        listRef.current.resetAfterIndex(0); //refresh list sizes cache
    }, [items, windowWidth, rowSizes]);

    const setRowSize = ({index, size}) => {
        rowSizes[index] = size;
    }

    return (
        <List
            height={containerHeight}
            width={containerWidth}
            itemCount={items.length}
            itemData={{ items, onAction, setRowSize, windowWidth }}
            itemSize={index => 100}//rowSizes.length > index ? rowSizes[index] : 100}
            ref={listRef}
        >
            {Row}
        </List>
    );
};

const Row = React.memo(({ data, index, style }) => {
    // Data passed to List as "itemData" is available as props.data
    const { items, onAction, setRowSize, windowWidth } = data;
    const item = items[index];
    const root = React.useRef();

    React.useEffect(() => {
        setRowSize(index, root.current.getBoundingClientRect().height);
    }, [windowWidth]);

    return (
        <div
            onClick={() => onAction(index)}
            className={"card"}
            style={style}
            ref={root}
        >
            {item.label} is {item.isActive ? 'active' : 'inactive'}
        </div>
    );
}, areEqual);

export default DynamicallySizedList;