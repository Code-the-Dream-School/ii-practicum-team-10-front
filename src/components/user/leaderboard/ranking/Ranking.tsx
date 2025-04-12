import RankedUser from "./RankedUser";
import { useState, useEffect } from 'react';
// import RankedUser from './RankedUser';

type RankingProps = {
    rankedUsers: Array<React.ReactElement>;
}

function Ranking ({ rankedUsers }: RankingProps): JSX.Element {
    return (
        <div className="flex justify-center items-center">
            <div className="bg-red-400 w-90 h-119 m-1 rounded-3xl"></div>
            <div className="max-h-[480px] overflow-y-auto">{rankedUsers}</div>
        </div>
    )
}

export default Ranking;