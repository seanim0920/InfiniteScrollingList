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

export default function Message({ photoHost, item, index, onClick }) {
    const classes = useStyles();

    const checkOverflow = useCallback((element) => { if (element && element.clientHeight < element.scrollHeight) $clamp(element, { clamp: MAX_LINES, useNativeClamp: false, splitOnChars: ['.', '"', ',', ' '] }); }, []);

    return (
        <Card
            elevation={3}
            className={"card"}
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
            <CardContent className={classes.content} ref={checkOverflow}>
                {item.content}
            </CardContent>
        </Card>
    )
}