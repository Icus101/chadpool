import React from 'react'
import { useConnect, useDisconnect, useAccount, useBalance, Connector } from 'wagmi'
import Link from '../../../node_modules/next/link'
import { Connect } from './Connect'
import { SocialIcon } from 'react-social-icons'
import 'react-social-icons/telegram'
import Image from 'next/image'



const Header = () => {
    return (
        <div className='container mx-auto nes-text mb-[50px]'>
            <div className='sm:flex block text-center  justify-between items-center sm:text-[20px] text-[15px] py-[20px] '>
                <div className=' flex justify-center'>
                    <Image src='/COTP.png' alt='COTP' height={300} width={300}/>
                </div>
                <div className='flex items-center justify-center sm:mt-0 mt-[20px]   gap-2'>
                    <div>
                        <SocialIcon url=" https://twitter.com/chadofthepool"/>
                    </div>
                    <div>
                        <SocialIcon url="https://telegram.me/chadofthepoolportal"/>
                    </div>
                </div>
                <div className='sm:mt-0 mt-[20px]'>
                    <Connect />
                </div>

            </div>
        </div>
    )
}

export default Header