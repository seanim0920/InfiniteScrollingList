import React, { useRef, useEffect, useState, useCallback, memo } from 'react';
import './App.css';
import { VariableSizeList as List, areEqual } from 'react-window'
import { useWindowSize } from "./getCurrentWindowSize";

const DynamicallySizedList = ({ items, onAction, containerHeight }) => { //layout only. we may be able to calculate width and height from in here.
    const listRef = useRef();
    const sizeMap = React.useRef({});

    useEffect(()=>{console.log("finished setting sizemap")}, [sizeMap])

    const getSize = React.useCallback(index => sizeMap.current[index] || 100, []);
 
    const setSize = React.useCallback((index, size) => {
        sizeMap.current[index] = size;
        console.log("setting size map ", Date.now());
        
        listRef.current.resetAfterIndex(index); //may be able to collect them all and use a timeout function for debouncing
      }, []);

    return (
        items.length > 0 ?
        <div>
            <List
                height={containerHeight}
                width={"100%"}
                itemCount={items.length}
                itemSize={getSize}
                ref={listRef}
            >
                {
                    ({ index, style }) => <Row
                        item={items[index]}
                        index={index}
                        style={style}
                        onAction={onAction}
                        setRowSize={setSize}
                    />
                }
            </List>
        </div>
        : null //placeholder
    );
};

const Row = memo(({ item, setRowSize, onAction, index, style }) => {
    const root = useRef();
    const [windowWidth] = useWindowSize();

    useEffect(() => {
        console.log("I am gay ", root.current.getBoundingClientRect().height);
        setRowSize(index, root.current.getBoundingClientRect().height);
    }, [windowWidth]);

    return (
        <div
            style={style}
        >
            <div
                onClick={() => onAction(index)}
                className={"card"}
                ref={root}
            >
                {item.label} is {item.isActive ? 'active' : 'inactive'}
            </div>
        </div>
    );
}, areEqual);

export default DynamicallySizedList;