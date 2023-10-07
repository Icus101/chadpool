import React from "react";
import {
  useAccount,
  useContractWrite,
  usePrepareContractWrite,
  useWaitForTransaction,
} from "wagmi";
import { abi } from "./contract";
import { BaseError } from "viem";

const ClaimToken = () => {
   
  const { isConnected, address } = useAccount();
  const {
    config,
    error: prepareError,
    isError: isPrepareError,
    refetch,
  } = usePrepareContractWrite({
    address: "0xfDD2f833bA242F436928379DFDeAfb6411E8146d",
    abi: abi,
    functionName: "claim",
    // enabled: false
  });

  const { write, data, error, isError } = useContractWrite(config);

  const { isLoading, isSuccess } = useWaitForTransaction({
    hash: data?.hash,
    // onSettled(data, error) {
    //     const response = data ? data.logs[0] : []
    //     console.log("Settled", response)
    // }
  });

  // const handleSubmit = (e: any) => {
  //     e.preventDefault(); // Prevent the form from automatically submitting
  //     // Add your form submission logic here
  //     write?.()
  //     console.log('clicked');
  // };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(config);
    

    if (write) {
      write();
    }
  };
  return (

    <div className="my-[15px]">
      <button
        type="button"
        disabled={!isConnected || !write}
        onClick={handleClick}
        // onClick={() => console.log('just clicked')}
        className="nes-btn"
      >
        {isLoading ? <>CLAIMING</> : <>CLAIM</>}
      </button>

      <div>
        {isSuccess && (
          <>
            <div>Transaction Hash: {data?.hash}</div>
            {/* <div>
                            Transaction Receipt: <pre>{stringify(receipt, null, 2)}</pre>
                        </div> */}
          </>
        )}
      </div>
      <div>
        {(isPrepareError || isError) && (
        //   <div>Error: {(prepareError || error)?.message}</div>
        <div>Not yet time to claim</div>
        )}
      </div>
    </div>
  );
};

export default ClaimToken;
