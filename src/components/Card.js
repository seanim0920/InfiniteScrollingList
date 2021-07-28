import React, { useEffect, useState, forwardRef } from 'react';
import { printTime } from "../hooks/printTime";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles, createStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme =>
    createStyles({
        avatar: {
            height: "2.5rem",
            width: "2.5rem",
            marginRight: "0.75rem",
        }
    })
);

export default function Cell({ photoHost, item, index }) {
    const classes = useStyles();

    return (
        <Card
            onClick={() => { }}
            className={"card"}
        >
            <CardHeader
                avatar={ //what units are proper??
                    <Avatar className={classes.avatar} alt={item.author.name} src={photoHost + item.author.photoUrl} aria-label="recipe">
                        {item.author.name.charAt(0)}
                    </Avatar>
                }
                action={
                    <button>placeholdjkhier</button>
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
            <CardContent>
                {item.content}
            </CardContent>
        </Card>
    )
}