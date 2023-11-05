import React, { useState } from 'react';
import { ChannelList, useChatContext } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import '../index.css';

import { ChannelSearch, TeamChannelList, TeamChannelPreview } from './';
import { LogoUnity_2, LogoutIcon } from '../assets'

const cookies = new Cookies();

const SideBar = ({ logout }) => (
    <div className="w-14 bg-primary-100 h-screen">
        <div className="p-2">
            <img src={LogoUnity_2} alt="Unity"  />
        </div>
        <div className="flex h-[86vh] justify-center items-end">
            <div className='p-1 cursor-pointer'>
                <div className="bg-white rounded-full p-1" onClick={logout}>
                    <img src={LogoutIcon} alt="Logout" width="30" />
                </div>
            </div>
        </div>
    </div>
);

const CompanyHeader = () => (
    <div className="flex h-[2.7rem] bg-primary-100 items-center justify-center">
        <p className=" font-semibold text-xl uppercase text-white items-center px-6 ">Unity ChatRoom </p>
    </div>
)

const customChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team');
}

const customChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging');
}

const ChannelListContent = ({ isCreating, setIsCreating, setCreateType, setIsEditing, setToggleContainer }) => {
    const { client } = useChatContext();

    const logout = () => {
        cookies.remove("token");
        cookies.remove('userId');
        cookies.remove('username');
        cookies.remove('fullName');
        cookies.remove('avatarURL');
        cookies.remove('hashedPassword');
        cookies.remove('phoneNumber');

        window.location.reload();
    }

    const filters = { members: { $in: [client.userID] } };

    return (
        <>
            <SideBar logout={logout} />
            <div className="flex flex-col lg:w-72 w-[92%] bg-primary-300">
                <CompanyHeader />
                <ChannelSearch setToggleContainer={setToggleContainer} />
                <ChannelList 
                    filters={filters}
                    channelRenderFilterFn={customChannelTeamFilter}
                    List={(listProps) => (
                        <TeamChannelList 
                            {...listProps}
                            type="team"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType} 
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview 
                            {...previewProps}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                            type="team"
                        />
                    )}
                />
                <ChannelList 
                    filters={filters}
                    channelRenderFilterFn={customChannelMessagingFilter}
                    List={(listProps) => (
                        <TeamChannelList 
                            {...listProps}
                            type="messaging"
                            isCreating={isCreating}
                            setIsCreating={setIsCreating}
                            setCreateType={setCreateType} 
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                        />
                    )}
                    Preview={(previewProps) => (
                        <TeamChannelPreview 
                            {...previewProps}
                            setIsCreating={setIsCreating}
                            setIsEditing={setIsEditing}
                            setToggleContainer={setToggleContainer}
                            type="messaging"
                        />
                    )}
                />
            </div>
        </>
    );
}

const ChannelListContainer = ({ setCreateType, setIsCreating, setIsEditing }) => {
    const [toggleContainer, setToggleContainer] = useState(false);

    return (
        <>
            <div className="lg:flex hidden h-full">
              <ChannelListContent 
                setIsCreating={setIsCreating} 
                setCreateType={setCreateType} 
                setIsEditing={setIsEditing} 
              />
            </div>

            <div className="lg:hidden h-full flex absolute w-[90%] top-0 z-[5] transition-all duration-[800ms] ease-in-out"
                style={{ left: toggleContainer ? "0%" : "-89%", 
                        // backgroundColor: "#005fff"
                    }
                }
            >
                <div className="lg:hidden flex h-14 w-14 bg-primary-200 absolute lg:right-[-2%] sm:right-[-3%] right-[-3%] top-1/2 rounded-[50%] z-[2]" onClick={() => setToggleContainer((prevToggleContainer) => !prevToggleContainer)}>
                </div>
                <ChannelListContent 
                    setIsCreating={setIsCreating} 
                    setCreateType={setCreateType} 
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                />
            </div>
        </>
    )

}

export default ChannelListContainer;
