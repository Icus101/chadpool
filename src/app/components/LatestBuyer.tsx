import React from 'react'
import { IoIosRefresh } from 'react-icons/io'
import { useContractRead } from 'wagmi'
import { abi } from './contract'


const shortText = (text: string, n: number) => {
    if (text.length > n) {
        const shortenedText = text.substring(0, n).concat('...')
        return shortenedText
    }
    return text

}

const LatestBuyer = () => {
    const { data, isRefetching, refetch } = useContractRead({
        address: '0xfDD2f833bA242F436928379DFDeAfb6411E8146d',
        abi,
        functionName: 'getLatestBuyer',
        enabled: true,
        cacheOnBlock: true,
        watch: true,
    })
    return (
        <div>
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



                </div>




            </div>
        </div>
    )
}

export default LatestBuyer