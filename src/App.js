import React, { useEffect, forwardRef } from 'react';
import './App.css';
import List from './DynamicallySizedList'
import InfiniteLoader from "react-window-infinite-loader";

const DataProvider = () => {
    const [data, setData] = React.useState([]);
  
    const isItemLoaded = index => index < data.length && data[index] !== null;

    const loadMoreItems = (startIndex, stopIndex) => {
      return new Promise(resolve => {
        setTimeout(() => {
          const newData = [...data];
          for (let idx = startIndex; idx < stopIndex; idx++) {
            newData[idx] = faker.lorem.sentence();
          }
          setData(newData);
          resolve();
        }, 2000);
      });
    };

    useEffect(() => {
        //populate array initially
        //initialized data to junk. we should remove this later
        let initialItems = Array(100)
            .fill(true)
            .map(_ => ({
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
            }));

        setData(initialItems);
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

    return (
        <InfiniteLoader
            isItemLoaded={isItemLoaded}
            itemCount={data.length}
            loadMoreItems={loadMoreItems}
        >
            {({ onItemsRendered, ref }) => (
                <List
                    items={data}
                    onAction={toggleItemActive}
                    onItemsRendered={onItemsRendered}
                    ref={ref}
                />
            )}
        </InfiniteLoader>
    );
};

export default DataProvider;