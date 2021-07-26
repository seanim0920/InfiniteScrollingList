import React, { useRef, useEffect, useState, useCallback, memo } from 'react';
import './App.css';
import { VariableSizeList as List, areEqual } from 'react-window'
import ListRow from './ListRow'

const GUTTER_SIZE = 15;

export default function DynamicallySizedList({ items, onAction, containerHeight }) { //layout only. we may be able to calculate width and height from in here.
    const listRef = useRef();
    const rowSizes = React.useRef({});

    const getRowSize = React.useCallback(index => rowSizes.current[index] || 100, []);
 
    const setRowSize = React.useCallback((index, size) => {
        rowSizes.current[index] = size + GUTTER_SIZE;
        
        listRef.current.resetAfterIndex(index); //may be able to collect them all and use a timeout function for debouncing
      }, []);

    return (
        items.length > 0 ?
        <div>
            <List
                height={containerHeight}
                width={"100%"}
                itemCount={items.length}
                itemSize={getRowSize}
                ref={listRef}
            >
                {
                    ({ index, style }) => <ListRow
                        item={items[index]}
                        index={index}
                        style={{...style, top: style.top + GUTTER_SIZE}}
                        onAction={onAction}
                        setRowSize={setRowSize}
                    />
                }
            </List>
        </div>
        : null //placeholder
    );
};