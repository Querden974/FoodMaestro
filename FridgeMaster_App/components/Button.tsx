import React from 'react'
import {Link, RelativePathString} from "expo-router";

export function ButtonLink({url, style, text, action} : {url: RelativePathString, style?: string, text:string, action? : ()=>void}) {
    let btnStyle:string ="";

    if (style === "primary"){
        btnStyle = "text-center bg-blue-200 py-3 rounded-xl"
    }else if(style === "secondary"){
        btnStyle = "text-center border-2 border-blue-200 py-3 rounded-xl"
    }
    return (

        <Link href={url} className={""}>{text}</Link>
    )
}
