import React, { useRef, useEffect, memo } from 'react';
import { areEqual } from 'react-window'
import { useWindowSize } from "helperFunctions/getCurrentWindowSize";

export default memo(function ResponsiveListRow({ item, setRowSize, index, style, children }) {
    const cellContainer = useRef();
    const [windowWidth] = useWindowSize();

    useEffect(() => {
        if (item) setRowSize(index, cellContainer.current.getBoundingClientRect().height); //need to tell the list to resize us and send our new height
    }, [windowWidth, item]);

    return ( //the outer div applies a placeholder style, while the inner div measures the exact size of the cell
        <div
            style={style}
        >
            {
                item ?
                    <div
                        ref={cellContainer}
                    >
                        {//will we need item.id? probably as a key. take this part out and use it as an argument
                            children({ item, index })
                        }
                    </div>
                    : <h2>
                        Loading...
                    </h2>
            }
        </div>
    );
}, areEqual);