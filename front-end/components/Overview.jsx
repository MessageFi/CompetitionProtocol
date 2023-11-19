import React from 'react'
import styles from 'styles/OverView.module.css'
import TimeCard from './UI/TimeCard'
import ApplyButton from './UI/ApplyButton'

const Overview = () => {
  return (
    <div className={styles.container}>
        <p className={styles.tittle} style={{paddingTop:'80px'}}>2023 ChainLink</p>
        <p className={styles.tittle}>fall Hackathon</p>
        <p className={styles.desc}>ETH Hangzhou is a Hangzhou on-site hackathon sponsored by the Ethereum Foundation Ecosystem Support Program (ESP) for all ethereum developers to promote the development of the ethereum ecosystem in China. <br />The hackathon invites a number of senior blockchain practitioners to provide guidance, <br />and participants can develop applications or solutions based on the ethereum blockchain, as well as communicate and collaborate with other developers during the event.</p>
        <TimeCard />
        <ApplyButton />
    </div>
  )
}

export default Overview