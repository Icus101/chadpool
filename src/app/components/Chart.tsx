'use client'
import React, { useEffect, useState } from 'react'
import axios, { AxiosResponse } from 'axios';



interface PairData {
    // Define the structure of the data you expect for a pair
    // Adjust this according to the actual data structure returned by Dextools
    name: string;
    price: number;
}

const Chart = () => {
    // const [cryptoData, setCryptoData] = useState<PairData | null>(null);

    // const getData = async () => {

    //     const apiKey: string = '6eb1a326680b81edc20c4006b31cb3c7';
    //     const chain = 'ether'
    //     const pairAdd = '0xa29fe6ef9592b5d408cca961d0fb9b1faf497d6d'
    //     // const apiUrl: string = `https://api.dextools.io/v1/pair?chain_id=${chainId}&pair_address=${pairAddress}`;


    //     const reqUrl = `https://api.dextools.io/v1/pair?chain=${chain}&address=${pairAdd}`;

    //     await axios
    //         .get(reqUrl, {
    //             headers: {
    //                 Authorization: `Bearer ${apiKey}`,
    //                 Accept: "application/json",   
    //                 'Access-Control-Allow-Credentials':'true'
    //             },

    //         })
    //         .then((response: AxiosResponse<PairData>) => {
    //             console.log(response)
    //             setCryptoData(response.data);
    //         })
    //         .catch((error: Error) => {

    //             console.error(error);
    //         });
    // }

    // useEffect(() => {
    //   getData()


    // }, [])

    return (
        <div className='flex flex-col justify-between items-center'>
            <div className='flex justify-center items-center w-1/2 sm:w-full pb-[10px]'>
                <iframe id="dextools-widget"
                    title="DEXTools Trading Chart"
                    width="400"
                    height="400"
                    src="https://www.dextools.io/widget-chart/en/ether/pe-light/0xa29fe6ef9592b5d408cca961d0fb9b1faf497d6d?theme=light&chartType=2&chartResolution=30&drawingToolbars=false">

                </iframe>
            </div>

            <div className="">
                <p className="text-center   text-[#D1D1D6]">
                    All rights reserved . | COTP, 2023{" "}
                </p>
            </div>



            {/* <div>
                <h1>Cryptocurrency Data</h1>
                {cryptoData ? (
                    <div>
                        <p>Name: {cryptoData.name}</p>
                        <p>Price: ${cryptoData.price}</p>
                    </div>
                ) : (
                    <p>Loading...</p>
                )}
            </div> */}

        </div>

    )
}

export default Chart