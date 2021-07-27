import React, { useRef, useEffect, useState, useCallback, memo, forwardRef } from 'react';
import './App.css';
import { VariableSizeList as List, areEqual } from 'react-window'
import ListRow from './ListRow'
import { getContainerHeight } from './hooks/getContainerHeight'
import { mergeRefs } from './hooks/mergeRefs'
import InfiniteLoader from "react-window-infinite-loader";

const GUTTER_SIZE = 15;
const MARGIN_SIZE = 30;

const DataProvider = () => {
    const [data, setData] = React.useState([]);
  
    const isItemLoaded = index => index < data.length && data[index] !== null;

    const loadMoreItems = (startIndex, stopIndex) => {
        console.log("loading more items")
        return new Promise(resolve => {
            setTimeout(() => {
            const newData = [...data];
            for (let idx = startIndex; idx < stopIndex; idx++) {
                newData[idx] = {
                    author: {
                        name: Math.random()
                            .toString(36)
                            .substr(2)
                            .repeat(Math.ceil(Math.random() * 10)),
                        photoUrl: "https://picsum.photos/200",
                    },
                    updated: Date.now(),
                    content: (Math.random()
                        .toString(36)
                        .substr(2) + " ")
                        .repeat(Math.ceil(Math.random() * 10)),
                }
            }
            setData(newData);
            resolve();
            }, 2000);
        });
    };

    useEffect(() => {
        //populate array initially
        //initialized data to junk. we should remove this later
        setData(Array.from({ length: 100 }).map((_) => null));
    }, []);

    const toggleItemActive = index => {
        /*
        let newitems = [...items];

        const item = newitems[index];
        newitems[index] = {
            ...item,
            isActive: !item.isActive,
        };

        setItems(newitems);
        */
    }
    
    //const localListRef = useRef();
    const rowSizes = useRef({});
    const listHeight = getContainerHeight();

    const getRowSize = useCallback(index => rowSizes.current[index] || 150, []);

    const setRowSize = useCallback((index, size) => {
        rowSizes.current[index] = size + GUTTER_SIZE;

        //localListRef.current.resetAfterIndex(index); //may be able to collect them all and use a timeout function for debouncing
    }, []);

    return (
        <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={data.length}
            loadMoreItems={loadMoreItems}
        >
            {({ onItemsRendered, ref }) => (
                <List
                    height={listHeight}
                    width={"100%"}
                    itemCount={data.length}
                    itemSize={getRowSize}
                    itemData={data}
                    ref={ref}
                    onItemsRendered={onItemsRendered}
                >
                    {
                        ({ index, style }) => <ListRow
                            item={data[index]}
                            index={index}
                            style={{ ...style, top: style.top + GUTTER_SIZE, left: style.left + MARGIN_SIZE, width: `calc(${style.width} - ${MARGIN_SIZE * 2}px)` }}
                            onAction={toggleItemActive}
                            currentRowSize={getRowSize(index)}
                            setRowSize={setRowSize}
                        />
                    }
                </List>
            )}
        </InfiniteLoader>
    );
};

export default DataProvider;