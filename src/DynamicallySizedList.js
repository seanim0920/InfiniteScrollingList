//A VariableSizeList that manages the sizes of the list rows

import React, { useRef, useCallback, forwardRef } from 'react';
import { VariableSizeList } from 'react-window'
import ListRow from './ResponsiveListRow'
import { getContainerHeight } from './hooks/getContainerHeight'
import { mergeRefs } from './hooks/mergeRefs'

const GUTTER_SIZE = 15;
const MARGIN_SIZE = 30;
const DEFAULT_ROW_SIZE = 400;

export const DynamicallySizedList = forwardRef(
    ({ items, onItemsRendered, children }, ref) => {
        const localListRef = useRef();
        const rowSizesMap = useRef({});
        const containerHeight = getContainerHeight();

        const getRowSize = useCallback(index => rowSizesMap.current[index] || DEFAULT_ROW_SIZE, []);

        const setRowSize = useCallback((index, size) => {
            if (rowSizesMap.current[index] !== size + GUTTER_SIZE) {
                rowSizesMap.current[index] = size + GUTTER_SIZE;

                localListRef.current.resetAfterIndex(index);
            }
        }, []);

        return (
            <VariableSizeList
                height={containerHeight}
                width={"100%"}
                itemCount={items.length}
                itemSize={getRowSize}
                itemData={items}
                ref={mergeRefs(localListRef, ref)}
                onItemsRendered={onItemsRendered}
            >
                {
                    ({ index, style }) => (
                        <ListRow
                            item={items[index]}
                            index={index}
                            style={{ ...style, top: style.top + GUTTER_SIZE, left: style.left + MARGIN_SIZE, width: `calc(${style.width} - ${MARGIN_SIZE * 2}px)` }}
                            setRowSize={setRowSize}
                        >
                            {children}
                        </ListRow>
                    )
                }
            </VariableSizeList>
        );
    }
);