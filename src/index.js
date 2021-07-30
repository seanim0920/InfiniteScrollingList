import React from 'react';
import ReactDOM from 'react-dom';
import { ajaxCall } from 'helperFunctions/ajaxCall'
import { InfinitelyLoadingList } from 'listComponents/InfinitelyLoadingList'
import Message from 'messageComponents/Message'

const host = 'https://message-list.appspot.com/';
const batchSize = 100;

const loadMoreItemsAsync = (nextPageToken) => {
    let url = host + 'messages?limit=' + batchSize;
    if (nextPageToken) url += '&pageToken=' + nextPageToken;

    return new Promise(function (resolve, reject) {
        ajaxCall(url)
            .then(response => resolve([response.messages, response.pageToken]))
            .catch(e => reject(e));
    });
}

const removeItem = (changeList, index) => {
    changeList((array) => {
        array.splice(index, 1);
        return array;
    })
}

ReactDOM.render(
    <InfinitelyLoadingList
        loadMoreItemsAsync={loadMoreItemsAsync}
        loadingPoint={batchSize * 0.3}
    >
        {
            ({ item, index, changeList }) => (
                <Message
                    photoHost={host}
                    item={item}
                    removeItem={() => removeItem(changeList, index)}
                />
            )
        }
    </InfinitelyLoadingList>,
    document.getElementById('root')
);