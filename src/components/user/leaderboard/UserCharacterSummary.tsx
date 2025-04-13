import RankedUser from "./RankedUser";
import { useState, useEffect } from 'react';
import Character from "../shared/Character";
// import RankedUser from './RankedUser';

type UserCharacterSummaryProps = {
    cssScore: number | undefined;
    htmlScore: number | undefined,
    javaScriptScore: number | undefined,
    nodeJsScore: number | undefined,
    reactScore: number | undefined,
    overallScore: number | undefined
}

function UserCharacterSummary ({cssScore, htmlScore, javaScriptScore, nodeJsScore, reactScore, overallScore}: UserCharacterSummaryProps): JSX.Element {
    return (
        <div className="flex flex-col justify-center items-center bg-red-400 w-90 h-129 m-1 rounded-3xl">
            <img src="images/character_img.png" className="w-56" />
            {/* <Character/> */}
            <div className="flex">
                <div className="m-2">
                    <div><span className="font-bold">HTML Score:</span> {htmlScore}</div>
                    <div><span className="font-bold">CSS Score:</span> {cssScore}</div>
                    <div><span className="font-bold">JavaScript Score:</span> {javaScriptScore}</div>
                </div>
                <div className="m-2">
                    <div><span className="font-bold">React Score:</span> {reactScore}</div>
                    <div><span className="font-bold">NodeJS Score:</span> {nodeJsScore}</div>
                    <div><span className="font-bold">Overall Score:</span> {overallScore}</div>
                </div>
            </div>
        </div>
    )
}

export default UserCharacterSummary;