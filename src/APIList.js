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
            .then(response => {
                return resolve(response.messages, response.pageToken);
            }) //if this fails?
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