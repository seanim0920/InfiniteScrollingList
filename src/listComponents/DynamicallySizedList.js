//A VariableSizeList that manages the sizes of the list rows

import React, { useState, useLayoutEffect, useRef, useCallback, forwardRef } from 'react';
import { VariableSizeList } from 'react-window'
import ListRow from './ResponsiveListRow'
import { ListHeightCalculator } from './ListHeightCalculator'
import { mergeRefs } from 'helperFunctions/mergeRefs'

const DEFAULT_ROW_SIZE = 400;

export const DynamicallySizedList = forwardRef(
    ({ items, changeList, onItemsRendered, children }, ref) => {
        const localListRef = useRef();
        const rowSizesMap = useRef({});

        const getRowSize = useCallback(index => rowSizesMap.current[index] || DEFAULT_ROW_SIZE, []);

        const setRowSize = useCallback((index, size) => {
            if (rowSizesMap.current[index] !== size) {
                rowSizesMap.current[index] = size;

                localListRef.current.resetAfterIndex(index);
            }
        }, []);

        return (
            <ListHeightCalculator>
                {
                    (height) =>
                        <VariableSizeList
                            height={height}
                            width={"100%"}
                            itemCount={items.length}
                            itemSize={index => rowSizesMap.current[index] || DEFAULT_ROW_SIZE}
                            itemData={items}
                            ref={mergeRefs(localListRef, ref)}
                            onItemsRendered={onItemsRendered}
                        >
                            {
                                ({ index, style }) => (
                                    <ListRow
                                        itemExists={items[index] != null}
                                        index={index}
                                        style={{...style, paddingRight: "100px"}}
                                        setRowSize={setRowSize}
                                    >
                                        {children({ item: items[index], index, changeList, setRowSize })}
                                    </ListRow>
                                )
                            }
                        </VariableSizeList>
                }
            </ListHeightCalculator>
        );
    }
);