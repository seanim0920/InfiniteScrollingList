import React, { useRef, useLayoutEffect, useEffect, useState, memo } from 'react';
import { areEqual } from 'react-window'
import { useWindowSize } from "helperFunctions/getCurrentWindowSize";

export default memo(function ResponsiveListRow({ item, setRowSize, index, style, children }) {
    const cellContainer = useRef();
    const [windowWidth] = useWindowSize();
    const [transitionEnabled, setTransitionEnabled] = useState(false);

    useEffect(() => {
        if (item) setRowSize(index, cellContainer.current.getBoundingClientRect().height); //need to tell the list to resize us and send our new height
    }, [windowWidth, item]);
    
    useLayoutEffect(() => {
        setTransitionEnabled(false); //need to tell the list to resize us and send our new height
    }, [item]);
    
    useLayoutEffect(() => {
        setTransitionEnabled(true); //need to tell the list to resize us and send our new height
    }, [transitionEnabled]);

    return ( //the outer div applies a placeholder style, while the inner div measures the exact size of the cell
        <div
            style={{...style, transition: transitionEnabled ? "all 300ms ease-in-out" : "none"}}
        >
            {
                item ?
                    <div
                        ref={cellContainer}
                    >
                        {//will we need item.id? probably as a key. take this part out and use it as an argument
                            children
                        }
                    </div>
                    : <h2>
                        Loading...
                    </h2>
            }
        </div>
    );
}, areEqual);