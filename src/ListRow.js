import React, { useRef, useEffect, useState, useCallback, memo } from 'react';
import './App.css';
import { areEqual } from 'react-window'
import { useWindowSize } from "./hooks/getCurrentWindowSize";
import { printTime } from "./hooks/printTime";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

const loading = false;

export default memo(function ListRow({ item, currentRowSize, setRowSize, onAction, index, style }) {
    const root = useRef();
    const [windowWidth] = useWindowSize();

    useEffect(() => {
        if (currentRowSize !== root.current.getBoundingClientRect().height)
            setRowSize(index, root.current.getBoundingClientRect().height); //need to tell the list to resize us and send our new height
    }, [windowWidth]);

    return (
        <div
            style={style}
            className={"cell"}
        >
            {//will we need item.id? probably as a key. take this part out and use it as an argument
                item ?
                    <Card
                        onClick={() => onAction(index)}
                        className={"card"}
                        ref={root}>
                        <CardHeader
                            avatar={ //need a placeholder while this image loads. what units are proper??
                                <Avatar height={"3rem"} width={"3rem"} alt={item.author.name} src={item.author.photoUrl} aria-label="recipe">
                                    {item.author.name.charAt(0)}
                                </Avatar>
                            }
                            action={
                                <button>placeholder</button>
                            }
                            title={
                                <strong>
                                    {item.author.name}
                                </strong>
                            }
                            subheader={
                                <small>
                                    {printTime(item.updated)}
                                </small>
                            }
                        />
                        <CardContent>
                            {item.content}
                        </CardContent>
                    </Card>
                    : null
            }
        </div>
    );
}, areEqual);