import React, { useEffect, useState, forwardRef } from 'react';
import './App.css';
import { DynamicallySizedList } from './DynamicallySizedList'
import InfiniteLoader from "react-window-infinite-loader";
import Card from "./components/Card"

const DataProvider = () => {
    const [isNextPageLoading, setIsNextPageLoading] = useState(false);
    const [data, setData] = useState([null]);

    const isItemLoaded = index => index < data.length - 33; //condition to determine if we should load more items

    const loadMoreItems = isNextPageLoading ? () => {} : (startIndex, stopIndex) => {
        console.log("loading more")
        setIsNextPageLoading(true);
        return new Promise(resolve => {
            setTimeout(() => {
                const newData = [...data];
                //should use splice method here. or delete the last item and push the extra 100 items.
                newData.pop();
                for (let i = 0; i < 100; ++i) {
                    newData.push({
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
                    });
                }
                newData.push(null);
                console.log("added new data", startIndex, " ", stopIndex)
                setData(newData);
                setIsNextPageLoading(false);
                resolve();
            }, 2000);
        });
    };

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

    return (
        <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={data.length + 1}
            loadMoreItems={loadMoreItems}
        >
            {({ onItemsRendered, ref }) => (
                <DynamicallySizedList
                    items={data}
                    onItemsRendered={onItemsRendered}
                    ref={ref}
                >
                    {
                        ({ item, index }) => (
                            <Card
                                item={item}
                                index={index}
                                onClick={() => { }}
                            />
                        )
                    }
                </DynamicallySizedList>
            )}
        </InfiniteLoader>
    );
};

export default DataProvider;