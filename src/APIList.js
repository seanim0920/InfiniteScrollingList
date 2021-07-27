import React, { useState } from 'react';
import './App.css';
import { InfinitelyLoadingList } from './InfinitelyLoadingList'
import { ajaxCall } from './hooks/ajaxCall'
import Card from './components/Card'

export default function App () {
    const loadMoreItems = (nextPageToken) => {
        return new Promise(function (resolve, reject) {
            let url = 'http://message-list.appspot.com/messages?limit=' + 100;
            if (nextPageToken) url += '&pageToken=' + nextPageToken;

            ajaxCall(url)
            .then(response => resolve([response.messages, response.pageToken])) //if this fails? //can't pass multiple values directly, as seen here https://stackoverflow.com/questions/28703625/how-do-you-properly-return-multiple-values-from-a-promise
            .catch(e => reject(e));
        });
    }

    return (
        <InfinitelyLoadingList
            loadMoreItemsAsync={loadMoreItems}
            loadingPoint={30}
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