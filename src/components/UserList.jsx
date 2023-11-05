import React, { useEffect, useState } from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';

import { InviteIcon } from '../assets';

const ListContainer = ({ children }) => {
    return (
        <div className='flex flex-col h-full'>
            <div className='flex items-center mx-5 justify-between text-base text-gray-500 mt-4'>
                <p>User</p>
                <p>Invite</p>
            </div>
            { children }
        </div>
    )
}

const UserItem = ({ user, setSelectedUsers }) => {
    const [ selected, setSelected ] = useState(false);

    const handleSelected = () => {
        if(selected) {
            setSelectedUsers((prevUsers) => prevUsers.filter((prevUser) => prevUser !== user.id ))
        } else {
            setSelectedUsers((prevUsers) => [ ...prevUsers, user.id ])
        }

        setSelected((prevSelected) => !prevSelected);
    }

    return (
        <div className='flex items-center mx-5 justify-between hover:bg-blue-500 hover:bg-opacity-40 px-2 py-1 cursor-pointer rounded-lg mb-2' onClick={handleSelected}>
            <div className='flex items-center flex-[2] text-left'>
                <Avatar image={user.image} name={user.fullName || user.id} size={32} />
                <p className='font-medium text-white'>{user.fullName || user.id}</p>
            </div>
            { selected ? <InviteIcon /> : <div className='h-7 w-7 bg-white border rounded-2xl box-border ml-1' /> }
        </div>
    )
}


const UserList = ( { setSelectedUsers }) => {
    const { client } = useChatContext();
    const [ users, setUsers ] = useState([]);
    const [ loading, setLoading ] = useState(false);
    const [ listEmpty, setListEmpty ] = useState(false);
    const [ error, setError ] = useState(false);

    useEffect(() => {
        const getUsers = async () => {
            if(loading) return;

            setLoading(true);

            try {
                const response = await client.queryUsers(
                    { id: { $ne: client.userID } },
                    { id: 1 },
                    { limit: 8 }
                );

                if(response.users.length) {
                    setUsers(response.users);
                } else {
                    setListEmpty(true);
                }
            } catch (error) {
                
                setError(true);
            }
            setLoading(false);
        }

        if(client) getUsers();
    }, []);

    if(error) {
        return (
            <ListContainer>
                <div className='text-base text-red-600 font-bold m-5'>
                    Error, please try again later !!
                </div>
            </ListContainer>
        )
    }

    if(listEmpty) {
        return (
            <ListContainer>
                <div className='text-base m-5'>
                    Tidak ada user ditemukan
                </div>
            </ListContainer>
        )
    }

    return (
        <ListContainer>
            { loading ? <div className='text-base font-bold text-white m-5'>
                Loading user . . .
            </div> : (
                users?.map((user, i) => (
                    <UserItem index={i} key={user.id} user={user} setSelectedUsers={setSelectedUsers} />
                ))
            ) }
        </ListContainer>
    )
}

export default UserList
