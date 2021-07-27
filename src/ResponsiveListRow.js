import React, { useRef, useEffect, useState, useCallback, memo } from 'react';
import './App.css';
import { areEqual } from 'react-window'
import { useWindowSize } from "./hooks/getCurrentWindowSize";

const loading = false;

export default memo(function ResponsiveListRow({ item, setRowSize, index, style, children }) {
    const root = useRef();
    const [windowWidth] = useWindowSize();

    useEffect(() => {
        if (item) setRowSize(index, root.current.getBoundingClientRect().height); //need to tell the list to resize us and send our new height
    }, [windowWidth, item]);

    return (
        <div
            style={style}
            className={"cell"}
        >
            {
                item ?
                    <div
                        ref={root}
                    >
                        {//will we need item.id? probably as a key. take this part out and use it as an argument
                            children({ item, index })
                        }
                    </div>
                    : null
            }
        </div>
    );
}, areEqual);