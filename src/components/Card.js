import React, { useEffect, useState, forwardRef } from 'react';
import { printTime } from "../hooks/printTime";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";

export default function Cell({photoHost, item, index}) {
    return (
        <Card
            onClick={() => { }}
            className={"card"}
        >
            <CardHeader
                avatar={ //what units are proper??
                    <Avatar height={"30rem"} width={"30rem"} alt={item.author.name} src={photoHost + item.author.photoUrl} aria-label="recipe">
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
    )
}