import { useState, useEffect } from 'react';
import Character from '../../../user/shared/Character.tsx';

type RankedUserProps = {
    userName: string;
    userCharacter: React.ReactElement;
    ranking: number;
}

function RankedUser({ userName, userCharacter, ranking }: RankedUserProps): JSX.Element {
    return (
        <div className='flex justify-between items-center bg-gray-300 w-100 h-23 p-5 m-1 rounded-2xl'>
            <div className='flex justify-center items-center'>
                <div>{userCharacter}</div>
                <div className='px-5'>{userName}</div>
            </div>
            <div>{ranking}</div>
        </div>
    )
}

export default RankedUser;