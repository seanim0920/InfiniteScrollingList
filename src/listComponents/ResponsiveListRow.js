import React, { useRef, useEffect, useState, memo } from 'react';
import { areEqual } from 'react-window'
import { useWindowSize } from "helperFunctions/getCurrentWindowSize";

export default memo(function ResponsiveListRow({ item, setRowSize, index, style, changeList, children }) {
    const outerContainer = useRef();
    const cellContainer = useRef();
    const [windowWidth] = useWindowSize();
    const [transitionEnabled, setTransitionEnabled] = useState(true);

    useEffect(() => {
        if (item) setRowSize(index, cellContainer.current.getBoundingClientRect().height); //need to tell the list to resize us and send our new height
    }, [windowWidth, item]);
    
    useEffect(() => {
        if (style.height <= 1) {
            setTransitionEnabled(false);
        }
    }, [style]);

    const animateThis = () => {
        //if (outerContainer.current)
                setRowSize(index, 1);
                //outerContainer.current.animate([{backgroundColor: "blue", height: "100px"}, {backgroundColor: "red", height: "0px"}], {duration: 300, fill: "forwards"});
    }

    return ( //the outer div applies a placeholder style, while the inner div measures the exact size of the cell
        <div
            style={{...style, transition:  "all 300ms ease-in-out, background-color .01s linear"}}
            ref={outerContainer}
        >
            {
                item ?
                    <div
                        ref={cellContainer}
                    >
                        {//will we need item.id? probably as a key. take this part out and use it as an argument
                            children({item, setRowSize, index, style, changeList, animateThis})
                        }
                    </div>
                    : <h2>
                        Loading...
                    </h2>
            }
        </div>
    );
}, areEqual);