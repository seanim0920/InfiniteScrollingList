import React, { useRef, useEffect, useState, useCallback, memo, forwardRef } from 'react';
import './App.css';
import { VariableSizeList as List, areEqual } from 'react-window'
import ListRow from './ListRow'
import { getContainerHeight } from './hooks/getContainerHeight'
import { mergeRefs } from './hooks/mergeRefs'

const GUTTER_SIZE = 15;
const MARGIN_SIZE = 30;

export const DynamicallySizedList = forwardRef(
    ({ items, onAction, onItemsRendered }, ref) => {
        const localListRef = useRef();
        const rowSizes = useRef({});
        const listHeight = getContainerHeight();

        const getRowSize = useCallback(index => rowSizes.current[index] || 150, []);

        const setRowSize = useCallback((index, size) => {
            rowSizes.current[index] = size + GUTTER_SIZE;

            localListRef.current.resetAfterIndex(index); //may be able to collect them all and use a timeout function for debouncing
        }, []);

        return (
            <List
                height={listHeight}
                width={"100%"}
                itemCount={items.length}
                itemSize={getRowSize}
                itemData={items}
                ref={mergeRefs(localListRef, ref)}
                onItemsRendered={onItemsRendered}
            >
                {
                    ({ index, style }) => <ListRow
                        item={items[index]}
                        index={index}
                        style={{ ...style, top: style.top + GUTTER_SIZE, left: style.left + MARGIN_SIZE, width: `calc(${style.width} - ${MARGIN_SIZE * 2}px)` }}
                        onAction={onAction}
                        currentRowSize={getRowSize(index)}
                        setRowSize={setRowSize}
                    />
                }
            </List>
        );
    }
);