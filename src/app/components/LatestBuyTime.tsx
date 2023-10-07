import React from 'react'
import { IoIosRefresh } from 'react-icons/io'
import { useContractRead } from 'wagmi'
import { abi } from './contract'

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

const LatestBuyTime = () => {
    const { data, isRefetching, refetch } = useContractRead({
        address: '0xfDD2f833bA242F436928379DFDeAfb6411E8146d',
        abi,
        functionName: 'getLatestBuyBlocktime',
        enabled: true,
        cacheOnBlock: true,
        watch: true,
    })
    return (
        <div>
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
        </div>
    )
}

export default LatestBuyTime