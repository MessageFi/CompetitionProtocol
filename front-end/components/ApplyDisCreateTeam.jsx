import React from 'react'
import {Result , Button} from 'antd'
import Link from 'next/link'
const ApplyDisCreateTeam = () => {
    const navNScroll = ()=>{
        window.location.href = '/';
    }
    return (
        <Result
            title="You need create or join a team"
            extra={
                <div style={{display:'flex', justifyContent:'center' , gap:'10px'}}>
                    <Button onClick={navNScroll}>
                        create or join
                    </Button>
                </div>
            }/>
      )
}

export default ApplyDisCreateTeam