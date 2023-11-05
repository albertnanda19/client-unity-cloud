import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';

import { UserList } from './';
import { CloseCreateChannel } from '../assets';

const ChannelNameInput = ({ channelName = '', setChannelName}) => {
    const handleChange = (event) => {
        event.preventDefault();
        
        setChannelName(event.target.value)
    }

    return(
        <div className='flex flex-col h-44 pl-5 shadow-custom2'>
            <p className='text-base text-white mt-8 '>Name</p>
            <input value={channelName} onChange={handleChange} placeholder='channel-name' className='text-sm mt-2 text-black h-10 w-[95%] box-border rounded-lg pl-4 outline-none focus:border focus:border-secondary-100' />
            <p className='mt-8 pb-2 text-white text-lg font-medium'>Add Members :</p>
        </div>
    )
}

const EditChannel = ({ setIsEditing }) => {
    const { channel } = useChatContext();
    const [ channelName, setChannelName ] = useState(channel?.data?.name);
    const [ selectedUsers, setSelectedUsers ] = useState([]);

    const updateChannel = async (event) => {
        event.preventDefault();

        const nameChanged = channelName !== (channel.data.name || channel.data.id);

        if(nameChanged) {
            await channel.update({ name: channelName }, { text: `Nama channel telah diubah menjadi ${channelName}` });
        }

        if(selectedUsers.length) {
            await channel.addMembers(selectedUsers);
        }

        setChannelName(null);
        setIsEditing(false);
        setSelectedUsers([]);
    }

    return (
        <div className='flex flex-col h-full'>
            <div className='flex items-center justify-between h-16 pr-5'>
                <p className='font-bold text-lg text-white ml-6 mt-4'>Edit Channel</p>
                <CloseCreateChannel setIsEditing={setIsEditing} />
            </div>
            <ChannelNameInput channelName={channelName} setChannelName={setChannelName} />
            <UserList setSelectedUsers={setSelectedUsers} />
            <div className='h-20 bg-primary-100 flex items-center justify-end rounded-br-lg p-3' onClick={updateChannel}>
                <p className='bg-secondary-300 font-bold text-lg py-3 px-5 text-white rounded-lg cursor-pointer '>Simpan perubahan</p>
            </div>
        </div>
    )
}

export default EditChannel
