import React, { useState } from 'react';
import './App.css';
import { InfinitelyLoadingList } from './InfinitelyLoadingList'
import { ajaxCall } from './hooks/ajaxCall'
import Card from './components/Card'

export default function App ({ batchSize, APIendpoint, children }) {
    const [nextToken, setNextToken] = useState(null);

    const loadMoreItems = () => {
        return new Promise(function (resolve, reject) {
            ajaxCall('http://message-list.appspot.com/messages?limit=100')
            .then(response => resolve(response.messages)) //if this fails?
            .catch(e => reject(e));
        });
    }

    return (
        <InfinitelyLoadingList
            loadMoreItemsAsync={loadMoreItems}
        >
            {
                ({ item, index }) => (
                    <Card
                        photoHost={'http://message-list.appspot.com/'}
                        item={item}
                        index={index}
                        onClick={() => { }}
                    />
                )
            }
        </InfinitelyLoadingList>
    );
};