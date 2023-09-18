"use client"
import React, { useState, useEffect } from 'react';
import { abi } from './contract';
import { useContractRead } from 'wagmi';



const Countdown: React.FC = () => {



    const { data, isRefetching, refetch } = useContractRead({
        address: '0xbfa7c25De49276C7B695C5253D074222DF634CbD',
        abi,
        functionName: 'getTimeDiff',
        enabled: true,
        cacheOnBlock: true,
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
            <div className="bg-blue-500 text-white p-4 rounded-lg shadow-lg text-center">
                <h1 className="text-2xl font-semibold mb-2">Countdown Timer</h1>
                <p className="text-xl">Time Remaining:</p>
                <div className="text-4xl font-bold mb-2">{formatTime(seconds)}</div>
            </div>
        </div>


    );
};

export default Countdown;
