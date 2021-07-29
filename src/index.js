import React from 'react';
import ReactDOM from 'react-dom';
import { ajaxCall } from 'helperFunctions/ajaxCall'
import { InfinitelyLoadingList } from 'listComponents/InfinitelyLoadingList'
import Message from 'messageComponents/Message'

const batchSize = 100;

const loadMoreItemsAsync = (nextPageToken) => {
    let url = 'http://message-list.appspot.com/messages?limit=' + batchSize;
    if (nextPageToken) url += '&pageToken=' + nextPageToken;

    return new Promise(function (resolve, reject) {
        ajaxCall(url)
            .then(response => resolve([response.messages, response.pageToken])) //if this fails? //can't pass multiple values directly, as seen here https://stackoverflow.com/questions/28703625/how-do-you-properly-return-multiple-values-from-a-promise
            .catch(e => reject(e));
    });
}

ReactDOM.render(
    <InfinitelyLoadingList
        loadMoreItemsAsync={loadMoreItemsAsync}
        loadingPoint={batchSize * 0.3}
    >
        {
            ({ item, index, changeList }) => (
                <Message
                    photoHost={'http://message-list.appspot.com/'}
                    item={item}
                    index={index}
                    changeList={changeList}
                />
            )
        }
    </InfinitelyLoadingList>,
    document.getElementById('root')
);