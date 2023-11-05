import React from 'react';

import { AddChannel } from '../assets';

const TeamChannelList = ({ setToggleContainer, children, error = false, loading, type, isCreating, setIsCreating, setCreateType, setIsEditing }) => {
    if(error) {
        return type === 'team' ? (
            <div className='w-full flex flex-col'>
                <p className='text-white px-4'>
                    Terjadi Kesalahan
                </p>
            </div>
        ) : null
    }

    if(loading) {
        return (
            <div className='w-full flex flex-col'>
                <p className='text-white px-4 h-32'>
                    { type === 'team' ? 'Channels' : 'Messages' } loading...
                </p>
            </div>
        )
    }

    return (
        <div className='w-full flex flex-col'>
            <div className='px-4 pb-4 flex justify-between items-center '>
                <p className='text-base h-4 text-gray-400 font-Poppins uppercase font-semibold'>
                    { type === 'team' ? 'Channels' : 'Direct Messages' }
                </p>
                <div className='cursor-pointer transition transform hover:scale-110'>
                    <AddChannel 
                        isCreating={isCreating} 
                        setIsCreating={setIsCreating} 
                        setCreateType={setCreateType} 
                        setIsEditing={setIsEditing}
                        type={ type === 'team' ? 'team' : 'messaging' }
                        setToggleContainer={setToggleContainer}
                    />
                </div>
            </div>
            { children }
        </div>
    )
}

export default TeamChannelList;
