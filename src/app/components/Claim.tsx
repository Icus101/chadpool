"use client";
import React, { useEffect, useState } from "react";
import {
  useAccount,
  useBalance,
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { abi } from "./contract";

import Countdown from "./Countdown";
import { IoIosRefresh } from "react-icons/io";
import Image from "next/image";
import FetchBal from "./FetchBal";
import LatestBuyer from "./LatestBuyer";
import LatestBuyTime from "./LatestBuyTime";
import TimeLeft from "./TimeLeft";
import { shortText } from "./Connect";
import ClaimToken from "./ClaimToken";

const Claim = () => {
  const { isConnected, address } = useAccount();

  return (
    <div className="text-center ">
      <h3 className="sm:text-[30px] text-[20px] nes-text font-[600]">
        Welcome
      </h3>

      {!isConnected && <h2>Please connect your Wallet</h2>}
      {isConnected && (
        <div>
          <h4>{shortText(address!, 8)}</h4>
        </div>
      )}

      <div className=" flex justify-center mb-[20px]">
        <Image src="/COTP.png" alt="COTP" height={500} width={500} />
      </div>
      <TimeLeft />
      <FetchBal />

      <div>
        <ClaimToken />
      </div>

      <div className="sm:flex block  justify-center gap-3">
        <a href="https://app.uniswap.org/swap">
          <button className="nes-btn">BUY COTP ON UNISWAP</button>
        </a>
        <a href="https://www.dextools.io/app/en/ether/pair-explorer/0xd3b4f5b4cf06498e4fbdd71c9da4f5befe01a0ed">
          <button className="nes-btn">CHART</button>
        </a>
      </div>

      <div className="">
        <LatestBuyer />
        <LatestBuyTime />
      </div>
    </div>
  );
};

export default Claim;
