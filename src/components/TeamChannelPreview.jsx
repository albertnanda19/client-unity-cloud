
import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';
import '../index.css'

const TeamChannelPreview = ({ setActiveChannel, setIsCreating, setIsEditing, setToggleContainer, channel, type }) => {
    const { channel: activeChannel, client } = useChatContext();

    const ChannelPreview = () => (
        <p className='flex items-center text-sm font-Poppins text-white px-5 h-full w-full break-all text-ellipsis'>
            #  {channel?.data?.name || channel?.data?.id}
        </p>
    );


    const DirectPreview = () => {
        const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);

        console.log(members[0]);

        return (
            <div className='flex items-center text-sm text-white px-5 h-full w-full break-all text-ellipsis'>
                <Avatar
                    image={members[0]?.user?.image}
                    name={members[0]?.user?.fullName || members[0]?.user.id}
                    size={24}
                />
                <p style={{ fontFamily: "Poppins" }} >{members[0]?.user?.fullName || members[0]?.user.id}</p>
            </div>
        )
    }

    return (
        <div className={
            channel?.id === activeChannel?.id
                ? 'h-9 my-1 flex items-center bg-opacity-40 bg-gray-400 rounded-lg rounded-br-lg font-bold mx-4 cursor-pointer z-[2]'
                : 'h-9 my-1  rounded-tr-lg rounded-lg mx-4 cursor-pointer z-[2] hover:bg-opacity-60 hover:bg-gray-800 hover:font-bold'
        }
            onClick={() => {
                setIsCreating(false);
                setIsEditing(false);
                setActiveChannel(channel);
                if (setToggleContainer) {
                    setToggleContainer((prevState) => !prevState);
                }
            }}
        >
            {type === 'team' ? <ChannelPreview /> : <DirectPreview />}
        </div>
    )
}

export default TeamChannelPreview
