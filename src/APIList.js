import React, { useState } from 'react';
import './App.css';
import { InfinitelyLoadingList } from './InfinitelyLoadingList'
import { ajaxCall } from './hooks/ajaxCall'
import Card from './components/Card'

export default function App ({ batchSize = 100, APIendpoint, children }) {
    const [nextToken, setNextToken] = useState();

    const loadMoreItems = () => {
        return new Promise(function (resolve, reject) {
            let url = 'http://message-list.appspot.com/messages?limit=' + batchSize;
            if (nextToken) url += '&pageToken=' + nextToken;

            ajaxCall(url)
            .then(response => {
                if (response.pageToken) setNextToken(response.pageToken)
                else setNextToken(null); //this could probably be done outside apilist?
                return resolve(response.messages);
            }) //if this fails?
            .catch(e => reject(e));
        });
    }

    return (
        <InfinitelyLoadingList
            hasNextPage={nextToken !== null}
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