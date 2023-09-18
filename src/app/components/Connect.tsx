'use client'

import { BaseError } from 'viem'
import { useAccount, useConnect, useDisconnect,Connector } from 'wagmi'

const shortText = (text:string, n:number) => {
    if (text.length > n) {
        const shortenedText = text.substring(0, n).concat('...')
        return shortenedText
    }
    return text

}

export function Connect() {
    const { connector, isConnected,address } = useAccount()
    const { connect,connectAsync,  connectors, error, isLoading, pendingConnector } =
        useConnect()
    const { disconnect } = useDisconnect()

    const handleConnect = async (connector: Connector) => {
        const { chain }=await connectAsync({ connector });
        if (chain.unsupported) {
            alert("Please connect to goerli")
            disconnect()
        }
    }

    return (
        <div>
            <div>
                {isConnected && (
                    <button className='nes-btn' onClick={() => disconnect()}>
                        {shortText(address!,5)}
                    </button>
                )}

                {connectors
                    .filter((x) => x.ready && x.id !== connector?.id)
                    .map((x) => (
                        <button className='nes-btn' key={x.id} onClick={() => handleConnect(x)}>
                            Connect
                            {isLoading && x.id === pendingConnector?.id && ' (connecting)'}
                        </button>
                    ))}
            </div>

            {error && <div>{(error as BaseError).shortMessage}</div>}
        </div>
    )
}