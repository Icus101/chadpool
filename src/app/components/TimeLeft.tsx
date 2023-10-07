import React, { useEffect, useState } from 'react'
import { IoIosRefresh } from 'react-icons/io'
import { useContractRead } from 'wagmi'
import { abi } from './contract'

const TimeLeft = () => {

    const { data, isRefetching, refetch } = useContractRead({
        address: '0xfDD2f833bA242F436928379DFDeAfb6411E8146d',
        abi,
        functionName: 'getTimeDiff',
        enabled: true,
        // cacheOnBlock: true,
        watch: true,
    })
    const [seconds, setSeconds] = useState<number>( Number(data!));

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
            <div>
                {/* <h3>Time Left to claim:  {formatTime(seconds)}</h3> */}
                <div>
                    <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg text-center">
                        <h1 className="sm:text-2xl text-[20px] font-semibold mb-2">Countdown Timer</h1>
                        <p className="text-xl">Time Remaining:</p>
                        <div className="sm:text-4xl text-md font-bold mb-2">{seconds > 0 ? formatTime(seconds) : <>Loading...</>}</div>
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
        </div>
    )
}

export default TimeLeft