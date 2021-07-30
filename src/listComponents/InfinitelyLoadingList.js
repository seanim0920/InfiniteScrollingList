import React, { useState } from 'react';
import { DynamicallySizedList } from './DynamicallySizedList'
import InfiniteLoader from "react-window-infinite-loader";
import PropTypes from 'prop-types'; 

//A responsive list that references a callback function to fetch data. It will continue to fetch data when the user scrolls down until the callback returns null.

const InfinitelyLoadingList = ({ children, loadMoreItemsAsync, loadingPoint = 30 }) => {
    const [isNextPageLoading, setIsNextPageLoading] = useState(false);
    const [nextPageToken, setNextPageToken] = useState();
    const [data, setData] = useState([null]);

    const isItemLoaded = index => nextPageToken === null || index < data.length - loadingPoint; //condition to determine if we should load more items. why 0.3?

    const appendNewData = isNextPageLoading ? () => { } : () => {
        setIsNextPageLoading(true);

        loadMoreItemsAsync(nextPageToken)
            .then(([newItems, nextPageToken]) => {
                const newData = [...data];
                newData.pop();
                newData.push(...newItems);
                if (nextPageToken) {
                    newData.push(null);
                }
                setData(newData);
                setNextPageToken(nextPageToken);
            })
            .catch(e => {
                console.warn("Error loading more items: ", e);
                setData([]);
                setNextPageToken(null);
            })
            .finally(() =>
                setIsNextPageLoading(false)
            )
    };
    
    const changeList = changeDataFunction => {
        const newData = [...data];
        const replaceData = changeDataFunction(newData);
        setData(replaceData);
    }

    return (
        <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={data.length}
            loadMoreItems={appendNewData}
        >
            {({ onItemsRendered, ref }) => (
                <DynamicallySizedList
                    items={data}
                    changeList={changeList}
                    onItemsRendered={onItemsRendered}
                    ref={ref}
                >
                    {children}
                </DynamicallySizedList>
            )}
        </InfiniteLoader>
    );
};

InfinitelyLoadingList.propTypes = {
    loadMoreItemsAsync: PropTypes.func.isRequired,
    children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
    loadingPoint: PropTypes.number,
}

export { InfinitelyLoadingList };