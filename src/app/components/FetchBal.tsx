import React from 'react'
import { useBalance } from 'wagmi'
import { shortText } from './Connect'

const FetchBal = () => {

    const FetchBalances = () => {
        const { data, isError, isLoading } = useBalance({
            address: '0xfDD2f833bA242F436928379DFDeAfb6411E8146d',
            watch: true
        })
        if (isLoading) return <div>Fetching balance…</div>
        if (isError) return <div>Error fetching balance</div>
        return (
            
            <div>
                {data ? <div className='sm:text-[20px] text-[12px]'>Prize Pool: {shortText(data.formatted.toString(), 6)} {data?.symbol}</div> : <> Loading...</>}

                 {/* {shortText(data?.formatted.toString(),6)} {data?.symbol} */}
            </div>
        )
    }


    return (
        <div className='mt-[15px]'>
            <FetchBalances />
        </div>
    )
}

export default FetchBal