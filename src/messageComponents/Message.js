import React, { useCallback, useRef } from 'react';
import { printTime } from "helperFunctions/printTime";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/CloseRounded";
import CancelIcon from "@material-ui/icons/CancelRounded";
import $clamp from "clamp-js";
import ReactSwipe from 'react-swipe';
import PropTypes from 'prop-types'; 

const FONT_SIZE = 1.5;
const MAX_LINES = 5;

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            width: '100%',
            maxWidth: `calc(100% - 2em - 60px)`,
            margin: '15px 30px 10px calc(100% + 30px)',

            padding: '0.75em 1em 0.5em',
            paddingBottom: '10px',
            textAlign: 'left',
            overflowWrap: 'break-word',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
        },
        avatar: {
            height: "2.5rem",
            width: "2.5rem",
            marginRight: "0.75rem",
        },
        content: {
            maxHeight: FONT_SIZE * MAX_LINES + "rem",
            overflow: "hidden",
        },
    })
);

const messageStyleObject = {
    container: {
        overflow: 'hidden',
        visibility: 'hidden',
        position: 'relative',

        display: 'flex',
        flexDirection: 'row'
    },
    wrapper: {
        overflow: 'hidden',
        position: 'relative',
    },
    child: {
        float: 'left',
        position: 'relative',
        transition: 'all 300ms ease-in-out',
    }
}

function Message({ photoHost, item, index, removeItem }) {
    const indicatorRef = useRef();
    const swipeRef = useRef();
    const cardRef = useRef();

    const swipeOptions = {
        continuous: false,
        startSlide: 1,
        swiping: (percentage) => {
            console.log(percentage);
            if (indicatorRef.current) indicatorRef.current.style.opacity = -percentage * 2;
        },
        transitionEnd: () => {

        },
        callback: () => {
            if (cardRef.current) cardRef.current.style.opacity = 0;
            if (indicatorRef.current) indicatorRef.current.style.opacity = 1;
            setTimeout(() => {
                removeItem();
            }, 300)
        },
    }

    const classes = useStyles();

    const clampOverflow = useCallback((element) => { if (element && element.clientHeight < element.scrollHeight) $clamp(element, { clamp: MAX_LINES, useNativeClamp: false, splitOnChars: ['.', '"', ',', ' '] }); }, []);

    return (
        <ReactSwipe
            ref={swipeRef}
            swipeOptions={swipeOptions}
            style={messageStyleObject}
        >
            <Card
                ref={cardRef}
                elevation={3}
                className={classes.root}
            >
                <CardHeader
                    avatar={ //what units are proper??
                        <Avatar className={classes.avatar} alt={item.author.name} src={photoHost + item.author.photoUrl} aria-label="recipe">
                            {item.author.name.charAt(0)}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="dismiss" onClick={() => { if (swipeRef.current) swipeRef.current.prev() }}>
                            <CloseIcon />
                        </IconButton>
                    }
                    title={
                        <strong>
                            {index}
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
            <div ref={indicatorRef} style={{ opacity: 0, position: "absolute", top: '45%', bottom: '50%', backgroundColor: "transparent", alignItems: "center" }}>
                <CancelIcon style={{transform: 'scale(2)', float: 'right', marginBottom: '1em', marginRight: '1em', color: 'gray'}} />
            </div>
        </ReactSwipe>
    )
}

Message.propTypes = {
    photoHost: PropTypes.string.isRequired,
    item: PropTypes.object,
    index: PropTypes.number.isRequired,
    removeItem: PropTypes.func.isRequired,
}

export default Message;