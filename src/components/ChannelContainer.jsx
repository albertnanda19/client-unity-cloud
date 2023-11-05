import React from 'react';
import { Channel, MessageTeam } from 'stream-chat-react';

import { ChannelInner, CreateChannel, EditChannel } from './';

const ChannelContainer = ({ isCreating, setIsCreating, isEditing, setIsEditing, createType }) => {
    // const { channel } = useChatContext();

    if(isCreating) {
        return (
            <div className='h-full w-full bg-primary-100'>
                <CreateChannel createType={createType} setIsCreating={setIsCreating} />
            </div>
        )
    }

    if(isEditing) {
        return (
            <div className='h-full w-full bg-primary-100'>
                <EditChannel setIsEditing={setIsEditing} />
            </div>
        )
    }

    const EmptyState = () => (
        <div className='flex h-full flex-col justify-end mx-5 pb-5'>
            <p className='font-bold text-lg text-gray-400 mb-3 mt-4'>Selamat chattingan !</p>
            <p className='text-sm m-0 text-gray-600 font-semibold'>Silahkan mulai mengirim pesan, image, link, emoji, dll</p>
        </div>
    )

    return (
        <div className='h-full w-full bg-primary-100'>
            <Channel
                EmptyStateIndicator={EmptyState}
                Message={(messageProps, i) => <MessageTeam key={i} { ... messageProps } /> }
            >
                <ChannelInner setIsEditing={setIsEditing} />
            </Channel>
        </div>
    )
}

export default ChannelContainer
