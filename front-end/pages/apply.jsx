import React, { useEffect, useState } from 'react'
import {Flex , Spin} from 'antd'
import ApplyConnected from '@/components/ApplyConnected';
import ApplyDisConnected from '@/components/ApplyDisConnected';
import ApplyDisCreateTeam from '@/components/ApplyDisCreateTeam';
import {useAccount} from 'wagmi'
import { useIsConnected } from '@/hooks/useIsConnected';
import { useIsCreatedTeam } from '@/hooks/useIsCreatedTeam';
const apply = () => {
    const [content, setContent] = useState(null)
    const {address} = useAccount()
    useEffect(() => {
        useIsConnected().then(
            connected=>{
                useIsCreatedTeam(address).then(
                    created=>{
                        if(connected&&created){
                            setContent(<ApplyConnected />)
                        }else if(!connected){
                            setContent(<ApplyDisConnected />)
                        }else if(!created){
                            setContent(<ApplyDisCreateTeam />)
                        }
                    }
                )
            }
        )
    }, [])
    return (
        content
            ? <div>{content}</div>
            : <Flex style={{display:'flex' ,alignItems:'center',justifyContent:'center',marginTop:'150px'}}>
                <Spin size="large" />
            </Flex>
    )
}

export default apply