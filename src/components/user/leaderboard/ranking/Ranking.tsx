import RankedUser from "./RankedUser";
import { useState, useEffect } from 'react';
// import RankedUser from './RankedUser';

type RankingProps = {
    rankedUsers: Array<React.ReactElement>;
}

function Ranking ({ rankedUsers }: RankingProps): JSX.Element {
    return (
        <div className="flex flex-col justify-center items-center">
            <h3 className="decoration-2 text-2xl">Global Ranking</h3>
            <div className="max-h-[480px] overflow-y-auto">{rankedUsers}</div>
        </div>
    )
}

export default Ranking;