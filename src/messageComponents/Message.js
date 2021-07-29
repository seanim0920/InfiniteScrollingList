import React, { useCallback } from 'react';
import { printTime } from "helperFunctions/printTime";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import $clamp from "clamp-js";
import ReactSwipe from 'react-swipe';

const FONT_SIZE = 1.5;
const MAX_LINES = 5;

const useStyles = makeStyles(theme =>
    createStyles({
        avatar: {
            height: "2.5rem",
            width: "2.5rem",
            marginRight: "0.75rem",
        },
        content: {
            maxHeight: FONT_SIZE * MAX_LINES + "rem",
            overflow: "hidden",
        }
    })
);

const messageStyleObject = {
    container: {
        overflow: 'hidden',
        visibility: 'hidden',
        position: 'relative',
    },
    wrapper: {
        overflow: 'hidden',
        position: 'relative',
    },
    child: {
        float: 'left',
        width: '100%',
        position: 'relative',
        transitionProperty: 'transform',
        width: 'auto',
        paddingBottom: '10px',
        margin: '15px 30px 10px',
        maxWidth: `calc(100% - 2em - 60px)`,
        
        padding: '0.75em 1em 0.5em',
        textAlign: 'left',
        overflowWrap: 'break-word',
        textOverflow: 'ellipsis',
        overflow: 'hidden',
    }
}

export default function Message({ photoHost, item, index, onClick }) {
    const classes = useStyles();

    const clampOverflow = useCallback((element) => { if (element && element.clientHeight < element.scrollHeight) $clamp(element, { clamp: MAX_LINES, useNativeClamp: false, splitOnChars: ['.', '"', ',', ' '] }); }, []);

    let reactSwipeEl;

    return (
        <ReactSwipe
            swipeOptions={{ continuous: false }}
            ref={el => (reactSwipeEl = el)}
            style={messageStyleObject}
        >
            <Card
                elevation={3}
                onClick={onClick}
            >
                <CardHeader
                    avatar={ //what units are proper??
                        <Avatar className={classes.avatar} alt={item.author.name} src={photoHost + item.author.photoUrl} aria-label="recipe">
                            {item.author.name.charAt(0)}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
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
                <CardContent className={classes.content} ref={clampOverflow}>
                    {item.content}
                </CardContent>
            </Card>
        </ReactSwipe>
    )
}