import React, { useState, useLayoutEffect } from 'react';
import ReactDOM from 'react-dom';
import { ajaxCall } from 'helperFunctions/ajaxCall'
import { InfinitelyLoadingList } from 'listComponents/InfinitelyLoadingList'
import MessageScreen from 'messageComponents/MessageScreen'
import Card from 'messageComponents/Card'

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

export default function App() {
    const [currentMessage, setCurrentMessage] = useState();

    useLayoutEffect(() => {
        const backButton = document.getElementById("backButton");

        function goBack() {
            backButton.style.visibility = "hidden";
            setCurrentMessage(null);
        }
        backButton.addEventListener("click", goBack);
        return () => backButton.removeEventListener("click", goBack);
    }, []);

    return (
        <>
            <InfinitelyLoadingList
                loadMoreItemsAsync={loadMoreItemsAsync}
                loadingPoint={batchSize * 0.3}
            >
                {
                    ({ item, index }) => (
                        <Card
                            photoHost={'http://message-list.appspot.com/'}
                            item={item}
                            index={index}
                            onClick={() => {
                                backButton.style.visibility = "visible";
                                setCurrentMessage(item);
                            }}
                        />
                    )
                }
            </InfinitelyLoadingList>
            {
                currentMessage != null ?
                    <MessageScreen
                        photoHost={'http://message-list.appspot.com/'}
                        item={currentMessage}
                        onDismiss={() => { setCurrentMessage(null); }}
                    />
                    : null
            }
        </>
    );
}