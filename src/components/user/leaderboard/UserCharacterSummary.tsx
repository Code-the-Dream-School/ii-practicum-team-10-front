import RankedUser from "./RankedUser";
import { useState, useEffect } from 'react';
import Character from "../shared/Character";
// import RankedUser from './RankedUser';

type UserCharacterSummaryProps = {
    // rankedUsers: Array<React.ReactElement>;
}

function UserCharacterSummary (): JSX.Element {
    return (
        <div className="flex justify-center items-center bg-red-400 w-90 h-129 m-1 rounded-3xl">
            {/* <img src="images/character_img.png" className="w-56" /> */}
            <Character/>
        </div>
    )
}

export default UserCharacterSummary;