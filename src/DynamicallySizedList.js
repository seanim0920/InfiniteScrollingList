import React from 'react';
import './App.css';
import { VariableSizeList as List, areEqual } from 'react-window'
import { useWindowSize } from "./getCurrentWindowSize";

const DynamicallySizedList = ({ items, onAction, containerHeight, containerWidth }) => { //layout only. we may be able to calculate width and height from in here.
    const listRef = React.useRef();
    const rowSizes = {};

    React.useEffect(() => {
        console.log(rowSizes);
        listRef.current.resetAfterIndex(0); //refresh list sizes cache
    }, [items, rowSizes]);

    const setRowSize = ({ index, size }) => {
        rowSizes[index] = size;
    }

    return (
        <List
            height={containerHeight}
            width={containerWidth}
            itemCount={items.length}
            itemSize={index => 100}//rowSizes.length > index ? rowSizes[index] : 100}
            ref={listRef}
        >
            {
                ({ index, style }) => <Row
                item={items[index]}
                index={index}
                style={style}
                onAction={onAction}
                setRowSize={setRowSize}
                />
            }
        </List>
    );
};

const Row = React.memo(({ item, setRowSize, onAction, index, style }) => {
    const root = React.useRef();
    const [windowWidth] = useWindowSize();

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