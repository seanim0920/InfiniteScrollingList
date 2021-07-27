//list with dynamically sized rows that will take up the space of the root element
//use ul at some point

import React, { useRef, useEffect, useState, useCallback, memo, forwardRef } from 'react';
import './App.css';
import { VariableSizeList as List, areEqual } from 'react-window'
import ListRow from './ListRow'
import { useWindowSize } from "./hooks/getCurrentWindowSize";

const GUTTER_SIZE = 15;
const MARGIN_SIZE = 30;

export default forwardRef((props, ref) => {
    const rowSizes = React.useRef({});
    const [windowWidth, windowHeight] = useWindowSize();
    const [listHeight, setListHeight] = useState(0);
    const root = useRef();

    useEffect(() => {
        console.log(listHeight);
        console.log("size changed")
        if (root.current)
            setListHeight(root.current.getBoundingClientRect().height);
    }, [windowHeight])

    const getRowSize = React.useCallback(index => rowSizes.current[index] || 150, []);

    const setRowSize = React.useCallback((index, size) => {
        rowSizes.current[index] = size + GUTTER_SIZE;

        if (ref.current)
        ref.current.resetAfterIndex(index); //may be able to collect them all and use a timeout function for debouncing
    }, []);

    return (
            <div style={{ height: "100%" }} ref={root}>
                <List
                    height={listHeight}
                    width={"100%"}
                    itemCount={props.items.length}
                    itemSize={getRowSize}
                    ref={ref}
                    onItemsRendered={props.onItemsRendered}
                >
                    {
                        ({ index, style }) => <ListRow
                            item={props.items[index]}
                            index={index}
                            style={{ ...style, top: style.top + GUTTER_SIZE, left: style.left + MARGIN_SIZE, width: `calc(${style.width} - ${MARGIN_SIZE * 2}px)` }}
                            onAction={props.onAction}
                            currentRowSize={getRowSize(index)}
                            setRowSize={setRowSize}
                        />
                    }
                </List>
            </div>
    );
}
);