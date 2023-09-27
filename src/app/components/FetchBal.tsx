import React from 'react'
import { useBalance } from 'wagmi'

const FetchBal = () => {

    const FetchBalances = () => {
        const { data, isError, isLoading } = useBalance({
            address: '0xbfa7c25De49276C7B695C5253D074222DF634CbD',
            watch: true
        })
        if (isLoading) return <div>Fetching balance…</div>
        if (isError) return <div>Error fetching balance</div>
        return (
            <div>
                Prize Pool: {data?.formatted} {data?.symbol}
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