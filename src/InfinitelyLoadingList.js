import React, { useState } from 'react';
import './App.css';
import { DynamicallySizedList } from './DynamicallySizedList'
import InfiniteLoader from "react-window-infinite-loader";

export const InfinitelyLoadingList = ({ children, loadMoreItemsAsync, loadingPoint = 30}) => {   
    const [isNextPageLoading, setIsNextPageLoading] = useState(false); 
    const [nextPageToken, setNextPageToken] = useState();
    const [data, setData] = useState([null]);

    const isItemLoaded = index => index < data.length - loadingPoint; //condition to determine if we should load more items. why 0.3?

    const setNewData = isNextPageLoading ? () => { } : (startIndex, stopIndex) => {
        setIsNextPageLoading(true);

        loadMoreItemsAsync(nextPageToken)
        .then((newItems, nextPageToken)=>{
            const newData = [...data];
            newData.pop();
            newData.push(...newItems);
            if (nextPageToken) {
                setNextPageToken(nextPageToken);
                newData.push(null);
            }
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