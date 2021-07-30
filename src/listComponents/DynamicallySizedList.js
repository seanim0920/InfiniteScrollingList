//A VariableSizeList that manages the sizes of the list rows

import React, { useRef, useCallback, forwardRef } from 'react';
import { VariableSizeList } from 'react-window'
import { ResponsiveListRow } from './ResponsiveListRow'
import { ContainerHeightCalculator } from './ContainerHeightCalculator'
import { mergeRefs } from 'helperFunctions/mergeRefs'
import PropTypes from 'prop-types'; 

const DEFAULT_ROW_SIZE = 400;

const DynamicallySizedList = forwardRef(
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
            <ContainerHeightCalculator>
                {
                    (height) =>
                        <VariableSizeList
                            height={height}
                            width={"100%"}
                            itemCount={items.length}
                            itemSize={getRowSize}
                            itemData={items}
                            ref={mergeRefs(localListRef, ref)}
                            onItemsRendered={onItemsRendered}
                        >
                            {
                                ({ index, style }) => (
                                    <ResponsiveListRow
                                        itemExists={items[index] != null}
                                        index={index}
                                        style={style}
                                        setRowSize={setRowSize}
                                    >
                                        {children({ item: items[index], index, changeList, setRowSize })}
                                    </ResponsiveListRow>
                                )
                            }
                        </VariableSizeList>
                }
            </ContainerHeightCalculator>
        );
    }
);

DynamicallySizedList.propTypes = {
    items: PropTypes.array.isRequired,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    changeList: PropTypes.func,
    onItemsRendered: PropTypes.func,
}

export { DynamicallySizedList };