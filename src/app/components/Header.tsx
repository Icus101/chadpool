import React from 'react'
import { useConnect, useDisconnect, useAccount, useBalance, Connector } from 'wagmi'
import Link from '../../../node_modules/next/link'
import { Connect } from './Connect'
import { SocialIcon } from 'react-social-icons'



const Header = () => {
    return (
        <div className='container mx-auto nes-text mb-[50px]'>
            <div className='flex  justify-between items-center sm:text-[20px] text-[15px] py-[20px] '>
                <div className='nes-text   '>
                    CHADOFPOOL
                </div>
                <div className='sm:flex hidden  gap-2'>
                    <div>
                        <SocialIcon url="https://twitter.com" />
                    </div>
                    <div>
                        <SocialIcon url="https://telegram.com" />
                    </div>
                </div>
                <Connect />
            </div>
        </div>
    )
}

export default Header