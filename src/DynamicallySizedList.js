import React, { useRef, useEffect, useState, useCallback, memo } from 'react';
import './App.css';
import { VariableSizeList as List, areEqual } from 'react-window'
import ListRow from './ListRow'
import { useWindowSize } from "./hooks/getCurrentWindowSize";

const GUTTER_SIZE = 15;
const MARGIN_SIZE = 30;

export default function DynamicallySizedList({ items, onAction, containerHeight }) { //layout only. we may be able to calculate width and height from in here.
    const listRef = useRef();
    const rowSizes = React.useRef({});
    const [windowWidth, windowHeight] = useWindowSize();

    const getRowSize = React.useCallback(index => rowSizes.current[index] || 150, []);
 
    const setRowSize = React.useCallback((index, size) => {
        rowSizes.current[index] = size + GUTTER_SIZE;
        
        listRef.current.resetAfterIndex(index); //may be able to collect them all and use a timeout function for debouncing
      }, []);

    return (
        items.length > 0 ?
        <div>
            <List
                height={windowHeight}
                width={"100%"}
                itemCount={items.length}
                itemSize={getRowSize}
                ref={listRef}
            >
                {
                    ({ index, style }) => <ListRow
                        item={items[index]}
                        index={index}
                        style={{...style, top: style.top + GUTTER_SIZE, left: style.left + MARGIN_SIZE, width: `calc(${style.width} - ${MARGIN_SIZE * 2}px)`}}
                        onAction={onAction}
                        setRowSize={setRowSize}
                    />
                }
            </List>
        </div>
        : null //placeholder
    );
};