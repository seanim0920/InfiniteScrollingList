import React, { useState } from 'react';
import './App.css';
import { DynamicallySizedList } from './DynamicallySizedList'
import InfiniteLoader from "react-window-infinite-loader";

export const InfinitelyLoadingList = ({ children, loadMoreItemsAsync, hasNextPage }) => {
    const [isNextPageLoading, setIsNextPageLoading] = useState(false);
    const [data, setData] = useState([null]);

    const isItemLoaded = index => index < data.length - 33; //condition to determine if we should load more items

    const setNewData = isNextPageLoading ? () => { } : (startIndex, stopIndex) => {
        setIsNextPageLoading(true);

        loadMoreItemsAsync()
        .then(newItems=>{
            const newData = [...data];
            newData.pop();
            newData.push(...newItems);
            if (hasNextPage) newData.push(null);
            setData(newData);
        })
        .catch(e=>console.warn("Error loading more items: ", e))
        .finally(()=>setIsNextPageLoading(false))
        
    };

    return (
        <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={data.length + 1}
            loadMoreItems={setNewData}
        >
            {({ onItemsRendered, ref }) => (
                <DynamicallySizedList
                    items={data}
                    onItemsRendered={onItemsRendered}
                    ref={ref}
                >
                    {children}
                </DynamicallySizedList>
            )}
        </InfiniteLoader>
    );
};