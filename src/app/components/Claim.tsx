'use client'
import React, { useEffect, useState } from 'react'
import {
    useAccount, useBalance, useContractRead, useContractWrite,
    usePrepareContractWrite,
    useWaitForTransaction,
} from 'wagmi'
import { abi } from './contract'
import { BaseError } from 'viem'
import Countdown from './Countdown'
import { IoIosRefresh } from "react-icons/io";
import Image from 'next/image'
import FetchBal from './FetchBal'




const shortText = (text: string, n: number) => {
    if (text.length > n) {
        const shortenedText = text.substring(0, n).concat('...')
        return shortenedText
    }
    return text

}


function convertTimestampToDateTime(timestamp: number): string {
    // Create a new Date object and set it to the timestamp
    const date = new Date(timestamp * 1000); // Multiply by 1000 to convert from seconds to milliseconds

    // Get the components of the date and time
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are zero-based, so add 1
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');

    // Create a formatted date and time string
    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;

    return formattedDateTime;
}


const Claim = () => {

    const { connector: activeConnector, isConnected, address } = useAccount()

    function ClaimToken() {
        const { config } = usePrepareContractWrite({
            address: '0xbfa7c25De49276C7B695C5253D074222DF634CbD',
            abi,
            functionName: 'claim'
        })
        const { write, data, error, isLoading, isSuccess, isError } = useContractWrite(config)
        const {
            data: receipt,
            isLoading: isPending,
        } = useWaitForTransaction({ hash: data?.hash })

        return (
            <div className='my-[15px]'>
                <div>
                    <form onSubmit={(e) => {
                        e.preventDefault()
                        write?.()
                        console.log(data);

                    }}>
                        <button type='submit' disabled={isLoading || Number(data!) == 0} className='nes-btn sm:text-[24px]  text-[16px] font-[700] text-[#212529] leading-[36px] '>
                            CLAIM

                        </button>
                    </form>
                </div>

                <div>
                    {isLoading && <div>Claiming...</div>}
                    {isPending && <div>Transaction pending...</div>}
                    {isSuccess && (
                        <>
                            <div>Transaction Hash: {data?.hash}</div>
                            {/* <div>
                            Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
                        </div> */}
                        </>
                    )}
                </div>

                {isError && <div>{(error as BaseError)?.shortMessage}</div>}

            </div>

        )

    }


    function LatestBuyer() {
        const { data, isRefetching, refetch } = useContractRead({
            address: '0xbfa7c25De49276C7B695C5253D074222DF634CbD',
            abi,
            functionName: 'getLatestBuyer',
            enabled: true,
            cacheOnBlock: true,
            watch: true,
        })





        return (
            <div className='nes-text mt-[20px]'>

                <div className='flex justify-center items-center'>
                    {data ? <div className='sm:text-[20px] text-[12px]'>Latest Buyer: {shortText(data.toString(), 10)}</div> : <> Loading...</>}
                    <button
                        className='nes-btn'
                        disabled={isRefetching}
                        onClick={() => refetch()}
                        style={{ marginLeft: 8 }}
                    >
                        {isRefetching ? 'loading...' : <IoIosRefresh size={20} />}
                    </button>
                    {/* <div>
                        {balances}
                    </div> */}


                </div>




            </div>
        )
    }
    function LatestBuyTime() {
        const { data, isRefetching, refetch } = useContractRead({
            address: '0xbfa7c25De49276C7B695C5253D074222DF634CbD',
            abi,
            functionName: 'getLatestBuyBlocktime',
            enabled: true,
            cacheOnBlock: true,
            watch: true,
        })

        return (
            <div className='sm:text-[20px] text-[12px]'>

                Latest Buy Block Time: {convertTimestampToDateTime(Number(data))}
                <button
                    className='nes-btn '
                    disabled={isRefetching}
                    onClick={() => refetch()}
                    style={{ marginLeft: 10 }}
                >
                    {isRefetching ? 'loading...' : <IoIosRefresh size={20} />}
                </button>
            </div>
        )
    }

    function TimeLeftToClaim() {

        const { data, isRefetching, refetch } = useContractRead({
            address: '0xbfa7c25De49276C7B695C5253D074222DF634CbD',
            abi,
            functionName: 'getTimeDiff',
            enabled: false,
            // cacheOnBlock: true,
            watch: true,
        })
        const [seconds, setSeconds] = useState<number>(86400 - Number(data!));

        useEffect(() => {
            const interval = setInterval(() => {
                if (seconds > 0) {
                    setSeconds(seconds - 1);
                }
            }, 1000);

            return () => clearInterval(interval);
        }, [seconds]);

        const formatTime = (timeInSeconds: number): string => {
            const hours = Math.floor(timeInSeconds / 3600);
            const minutes = Math.floor((timeInSeconds % 3600) / 60);
            const seconds = timeInSeconds % 60;

            const formattedHours = hours.toString().padStart(2, '0');
            const formattedMinutes = minutes.toString().padStart(2, '0');
            const formattedSeconds = seconds.toString().padStart(2, '0');

            return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        };



        return (
            <div>
                {/* <h3>Time Left to claim:  {formatTime(seconds)}</h3> */}
                <div>
                    <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg text-center">
                        <h1 className="sm:text-2xl text-[20px] font-semibold mb-2">Countdown Timer</h1>
                        <p className="text-xl">Time Remaining:</p>
                        <div className="sm:text-4xl text-md font-bold mb-2">{formatTime(seconds)}</div>
                        <button
                            className='nes-btn  '
                            disabled={isRefetching}
                            onClick={() => refetch()}
                            style={{ marginLeft: 4 }}
                        >

                            {isRefetching ? 'loading...' : <IoIosRefresh size={20} />}
                        </button>
                    </div>

                </div>

            </div>
        )
    }




    return (
        <div className='text-center '>
            <h3 className='sm:text-[30px] text-[20px] nes-text font-[600]'>Welcome</h3>

            {!isConnected && <h2>Please connect your Wallet</h2>}
            {isConnected &&
                <div>
                    <h4>{shortText(address!, 8)}</h4>
                    {/* <h4>Your account balance is {data?.formatted} ETH</h4> */}
                </div>
            }


            <div className=' flex justify-center mb-[20px]'>
                <Image src='/COTP.png' alt='COTP' height={500} width={500} />
            </div>
            <TimeLeftToClaim />
            <FetchBal />
            <div>
                <ClaimToken />
            </div>
            
            <div className='sm:flex block  justify-center gap-3'>
            <a href="https://app.uniswap.org/swap">
                    <button className='nes-btn'>

                        BUY COTP ON UNISWAP

                    </button>
                </a>
                <a href="https://www.dextools.io/app/en/ether/pair-explorer/0xd3b4f5b4cf06498e4fbdd71c9da4f5befe01a0ed">
                    <button className='nes-btn'>
                        CHART
                    </button>
                </a>
            </div>

            <div className=''>
               
                <LatestBuyer />
                <LatestBuyTime />
            </div>


        </div>

    )
}

export default Claim