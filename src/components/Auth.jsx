import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';
import Swal from 'sweetalert2';
import { LogoUnity_1, Cloud } from '../assets';
import '../index.css';

const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
}

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignin, setSignIn] = useState(false);
    const [isSignUp, setSignUp] = useState(false);

    const switchToSignIn = () => {
        setSignIn((previsSignin) => !previsSignin);
    };

    const switchToSignUp = () => {
        setSignUp((previsSignUp) => !previsSignUp);
    };

    const switchMode = () => {
        setSignUp((previsSignUp) => !previsSignUp);
        setSignIn((previsSignin) => !previsSignin);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { username, password, phoneNumber, avatarURL } = form;

        // const URL = 'http://localhost:5000/auth';
        const URL = 'https://unity-cloud--albertmangiri.repl.co/auth';

        try {
            const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${isSignUp ? 'signup' : 'login'}`, {
                username, password, fullName: form.fullName, phoneNumber, avatarURL,
            });

            cookies.set('token', token);
            cookies.set('username', username);
            cookies.set('fullName', fullName);
            cookies.set('userId', userId);

            if (isSignUp) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Berhasil membuat akun',
                    timer: 3000
                });

                cookies.set('phoneNumber', phoneNumber);
                cookies.set('avatarURL', avatarURL);
                cookies.set('hashedPassword', hashedPassword);
            }

            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data && error.response.data.message === 'Password salah') {
                await Swal.fire({
                    icon: 'error',
                    title: 'Oops, password anda salah ! !',
                    text: 'Silahkan buat akun atau memasukkan password yang benar.',
                    confirmButtonText: 'Baiklah',
                    buttonsStyling: false,
                    customClass: {
                        confirmButton: 'btn-confirm-class',
                    },
                    width: '36rem',
                    background: '#0D366D',
                    color: '#fff',
                    didOpen: () => {
                        const confirmButton = document.querySelector('.btn-confirm-class');
                        if (confirmButton) {
                            confirmButton.style.backgroundColor = '#005fff';
                            confirmButton.style.borderRadius = '3px';
                            confirmButton.style.width = '8rem';
                            confirmButton.style.height = '2.5rem';
                        }
                    }
                });
            } else {
                console.error('Terjadi error ', error);
            }
        }
    };

    return (
        <>
            <div className="bg-primary-100 h-screen ">
                <div className={`flex xl:flex-row flex-col justify-end h-screen ${(isSignin || isSignUp) ? 'hidden' : ''} `}>
                    <div className='xl:hidden flex justify-center items-center xl:pb-0 pb-40'>
                        <img src={LogoUnity_1} alt='unity' className='md:w-[55%]' />
                    </div>
                    <div className={`bg-black xl:w-[40%] xl:h-screen flex flex-col justify-center items-center ${(isSignin || isSignUp) ? 'hidden' : ''}`}>
                        <div className='w-[55%] xl:block hidden'>
                            <img src={LogoUnity_1} alt='unity' />
                        </div>
                        <div className='text-white font-bold xl:text-3xl text-2xl pt-6'>
                            <h1>Welcome</h1>
                        </div>
                        <div className='flex xl:gap-4 gap-2 xl:pt-2 pt-6 xl:pb-0 pb-16 px-1'>
                            <button className='text-white xl:text-xl text-xs bg-secondary-200 xl:w-60 w-40 xl:h-11 h-8 rounded-md' onClick={switchToSignIn}>Sign In</button>
                            <button className='xl:text-white text-secondary-200 xl:text-xl text-xs xl:bg-secondary-200 bg-white xl:w-60 w-40 xl:h-11 h-8 rounded-md' onClick={switchToSignUp}>Sign Up</button>
                        </div>
                    </div>
                </div>
                <div className={`flex flex-col h-screen items-center ${(isSignin || isSignUp) ? '' : 'hidden'}`} >
                    <div className="w-full h-[80%] bg-cover bg-[50%] absolute top-56 left-0 overflow-y-hidden" style={{ backgroundImage: `url(${Cloud})` }}></div>
                    <div className='xl:w-1/3 w-full xl:pt-16 pt-8  z-[1]'>
                        <img src={LogoUnity_1} alt='Unity' className='' />
                    </div>
                    <div className='flex flex-col h-[60%] justify-start items-center z-[1] xl:pt-32 md:pt-28 pt-56 '>
                        <div className='font-bold text-3xl '>
                            <h1 >
                                {isSignin ? "Sign In" : "Sign Up"}
                            </h1>
                        </div>
                        <div >
                            <form className='pt-6' onSubmit={handleSubmit}>
                                {isSignUp && (
                                    <div className=''>
                                        <input
                                            name='fullName'
                                            type='text'
                                            placeholder='Full Name'
                                            onChange={handleChange}
                                            required
                                            className='xl:w-96 w-60 bg-gray-200 px-4 py-2 outline-none rounded-xl shadow-custom'
                                        />
                                    </div>
                                )}
                                {(isSignin || isSignUp) && (
                                    <div className='pt-6'>
                                        <input
                                            name='username'
                                            type='text'
                                            placeholder='Username'
                                            onChange={handleChange}
                                            required
                                            className=' xl:w-96 w-60 bg-gray-200 px-4 py-2 outline-none rounded-xl shadow-custom'
                                        />
                                    </div>
                                )}
                                {isSignUp && (
                                    <div className='pt-6'>
                                        <input
                                            name='phoneNumber'
                                            type='text'
                                            placeholder='Phone Number'
                                            onChange={handleChange}
                                            required
                                            className=' xl:w-96 w-60 bg-gray-200 px-4 py-2 outline-none rounded-xl shadow-custom'
                                        />
                                    </div>
                                )}
                                {isSignUp && (
                                    <div className='pt-6'>
                                        <input
                                            name='avatarURL'
                                            type='text'
                                            placeholder='Link URL Foto Profil'
                                            onChange={handleChange}
                                            required
                                            className=' xl:w-96 w-60 bg-gray-200 px-4 py-2 outline-none rounded-xl shadow-custom'
                                        />
                                    </div>
                                )}
                                {(isSignin || isSignUp) && (
                                    <div className='pt-6'>
                                        <input
                                            name='password'
                                            type='password'
                                            placeholder='Password'
                                            onChange={handleChange}
                                            required
                                            className=' xl:w-96 w-60 bg-gray-200 px-4 py-2 outline-none rounded-xl shadow-custom'
                                        />
                                    </div>
                                )}
                                {isSignUp && (
                                    <div className='pt-6'>
                                        <input
                                            name='confirmPassword'
                                            type='password'
                                            placeholder='Confirm Password'
                                            onChange={handleChange}
                                            required
                                            className=' xl:w-96 w-60 bg-gray-200 px-4 py-2 outline-none rounded-xl shadow-custom'
                                        />
                                    </div>
                                )}
                                {(isSignin || isSignUp) && (
                                    <div className='pt-6 pb-4'>
                                        <button className='xl:w-96 w-60 bg-secondary-200 py-3 text-white font-bold rounded-xl'>{isSignin ? 'Login' : 'Sign Up'}</button>
                                    </div>
                                )}
                            </form>
                            {isSignin && (
                                <div onClick={switchMode} className='cursor-pointer'>
                                    <p>
                                        Belum punya akun ?
                                    </p>
                                </div>
                            )}
                            {isSignUp && (
                                <div onClick={switchMode} className='cursor-pointer pb-10'>
                                    <p>
                                        Sudah punya akun ?
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Auth
