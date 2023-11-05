import React, { useState } from 'react';
import { useChatContext } from 'stream-chat-react';
import 'boxicons';

import { UserList } from './';
import { CloseCreateChannel } from '../assets';

const ChannelNameInput = ({ channelName = '', setChannelName}) => {
    const handleChange = (event) => {
        event.preventDefault();
        
        setChannelName(event.target.value)
    }

    return(
        <div className='flex flex-col h-auto pl-5 shadow-custom2'>
            <p className='text-white text-base mt-8'>Nama Channel Baru</p>
            <input value={channelName} onChange={handleChange} placeholder='channel-name ' 
            className='text-sm my-2 text-black h-10 w-[95%] box-border rounded-lg pl-4 outline-none focus:border focus:border-secondary-100' />
            <div className='text-info-text font-bold flex items-center p-4 bg-info-message w-[95%] rounded-lg border-[3px] border-info-text '>
                <div className=' px-2 flex items-center border-r-2 border-r-info-text'>
                    <box-icon color="#29629d" animation="tada-hover" name="info-circle"></box-icon>
                </div>
                <div className='px-2'>
                    <p>Nama Channel tidak boleh mengandung spasi !! </p>
                </div>
            </div>
            <p className='mt-8 pb-2 text-white text-lg font-medium'>Add Members :</p>
        </div>
    )
}

const CreateChannel = ({ createType, setIsCreating }) => {
    const { client, setActiveChannel } = useChatContext();
    const [selectedUsers, setSelectedUsers] = useState([client.userID || ''])
    const [channelName, setChannelName] = useState('');

    const createChannel = async (e) => {
        e.preventDefault();

        try {
            const newChannel = await client.channel(createType, channelName, {
                name: channelName, members: selectedUsers
            });

            await newChannel.watch();

            setChannelName('');
            setIsCreating(false);
            setSelectedUsers([client.userID]);
            setActiveChannel(newChannel);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className='flex flex-col h-full'>
            <div className='flex items-center justify-between h-20 lg:pt-0 pt-4 pr-5 font-bold text-lg text-white'>
                <p className='ml-5'>{ createType === 'team' ? 'Membuat Channel Baru' : 'Kirim Pesan Langsung' }</p>
                <CloseCreateChannel setIsCreating={setIsCreating} />
            </div>
            { createType === 'team' && <ChannelNameInput channelName={channelName} setChannelName={setChannelName} /> }
            <UserList setSelectedUsers={setSelectedUsers} />
            <div className='h-20 bg-primary-100 flex items-center justify-end rounded-br-lg p-3' onClick={createChannel}>
                <p className='bg-secondary-300 font-bold text-lg py-3 px-5 text-white rounded-lg cursor-pointer'>{ createType === 'team' ? 'Buat Channel' : 'Buat Pesan' }</p>
            </div>
        </div>
    )
}

export default CreateChannel
