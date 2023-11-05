import React, { useState } from 'react';
import { MessageList, MessageInput, Thread, Window, useChannelActionContext, Avatar, useChannelStateContext, useChatContext } from 'stream-chat-react';

import { ChannelInfo } from '../assets';

export const GiphyContext = React.createContext({});

const ChannelInner = ({ setIsEditing }) => {
    const [giphyState, setGiphyState] = useState(false);
    const { sendMessage } = useChannelActionContext();

    const overrideSubmitHandler = (message) => {
        let updatedMessage = {
            attachments: message.attachments,
            mentioned_users: message.mentioned_users,
            parent_id: message.parent?.id,
            parent: message.parent,
            text: message.text,
        };

        if (giphyState) {
            updatedMessage = { ...updatedMessage, text: `/giphy ${message.text}` };
        }

        if (sendMessage) {
            sendMessage(updatedMessage);
            setGiphyState(false);
        }
    };

    return (
        <GiphyContext.Provider value={{ giphyState, setGiphyState }}>
            <div style={{ display: 'flex', width: '100%' }}>
                <Window>
                    <TeamChannelHeader setIsEditing={setIsEditing} />
                    <MessageList />
                    <MessageInput overrideSubmitHandler={overrideSubmitHandler} />
                </Window>
                <Thread />
            </div>
        </GiphyContext.Provider>
    );
};

const TeamChannelHeader = ({ setIsEditing }) => {
    const { channel, watcher_count } = useChannelStateContext();
    const { client } = useChatContext();

    const MessagingHeader = () => {
        const members = Object.values(channel.state.members).filter(({ user }) => user.id !== client.userID);
        const additionalMembers = members.length - 3;

        if (channel.type === 'messaging') {
            return (
                <div className='flex-[3] flex items-center overflow-x-auto lg:max-w-lg max-w-3xl whitespace-nowrap'>
                    {members.map(({ user }, i) => (
                        <div key={i} className='flex items-center mr-2 lg:flex-row flex-col last:mr-0'>
                            <Avatar image={user.image} name={user.fullName || user.id} size={32} />
                            <p className='font-bold lg:text-sm text-xs lg:m-0 m-1 text-center text-white mr-2'>{user.fullName || user.id}</p>
                        </div>
                    ))}

                    {additionalMembers > 0 && <p className='font-bold lg:text-sm text-xs lg:m-0 m-1 text-center text-white mr-2'>and {additionalMembers} more</p>}
                </div>
            );
        }

        return (
            <div className='team-channel-header__channel-wrapper'>
                <p className='font-bold md:text-lg text-base lg:m-0 m-1 text-center text-white pr-2'># {channel.data.name}</p>
                <span style={{ display: 'flex' }} onClick={() => setIsEditing(true)}>
                    <ChannelInfo />
                </span>
            </div>
        );
    };

    const getWatcherText = (watchers) => {
        if (!watchers) return 'No users online';
        if (watchers === 1) return '1 user online';
        return `${watchers} users online`;
    };

    return (
        // <div className='relative lg:h-16 h-[4.5rem] flex justify-between items-center px-5 bg-primary-100 z-[1] shadow-custom'>
        //     <MessagingHeader />
        //     <div className='team-channel-header__right'>
        //         <p className='team-channel-header__right-text'>{getWatcherText(watcher_count)}</p>
        //     </div>
        // </div>
        <>
            <div className='flex flex-col'>
                <div className='flex h-[3.2rem] bg-primary-100 items-center justify-center border-b-black'>
                </div>
                <div className='relative lg:h-14 h-[4.5rem] flex justify-between items-center px-5 bg-primary-100 z-[1] shadow-custom2 '>
                    <MessagingHeader />
                    <div className='team-channel-header__right'>
                        <p className='team-channel-header__right-text'>{getWatcherText(watcher_count)}</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ChannelInner;
