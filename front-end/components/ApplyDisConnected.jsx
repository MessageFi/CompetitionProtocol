import React from 'react'
import { Result, Button } from 'antd'
import Link from 'next/link'
import {ethers} from 'ethers'
const ApplyDisConnected = () => {
    const connect = async() => {
        const accounts = await window.ethereum.request({
            method: 'eth_requestAccounts'
          });
          console.log(accounts);
          location.reload()
    }
    return (
        <Result
            title="You need connect your wallect"
            extra={
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
                    <Link href='/'>
                        <Button >
                            Cancel
                        </Button>
                    </Link>
                    <Button onClick={connect }>
                        Connect
                    </Button>
                </div>
            } />
    )
}

export default ApplyDisConnected