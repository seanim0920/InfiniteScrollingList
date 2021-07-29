import React, { useRef, useEffect, memo } from 'react';
import { areEqual } from 'react-window'
import { useWindowSize } from "helperFunctions/getCurrentWindowSize";

export default memo(function ResponsiveListRow({ itemExists, setRowSize, index, style, children }) {
    const cellContainer = useRef();
    const [windowWidth] = useWindowSize();

    useEffect(() => {
        if (itemExists) setRowSize(index, cellContainer.current.getBoundingClientRect().height); //need to tell the list to resize us and send our new height
    }, [windowWidth, itemExists]);

    return ( //the outer div applies a placeholder style, while the inner div measures the exact size of the cell
        <div
            style={style}
        >
            {
                itemExists ?
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