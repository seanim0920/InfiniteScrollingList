import React, { useCallback, useEffect } from 'react';
import Card from "./Card";

export default function MessageScreen({ item, photoHost }) {
    return (
        <div
            className={"message"}>
            <Card
                item={item}
                photoHost={photoHost}
                fullSize={true}
            />
        </div>
    )
}