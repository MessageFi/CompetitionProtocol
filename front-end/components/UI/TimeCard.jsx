import React from 'react'
import styles from 'styles/timecard.module.css'

const TimeCard = () => {
    return (
        <div>
            <div className={styles.card} style={{marginTop:'60px'}}>


                <h1>Registration Time</h1>
                <p className={styles.p}>
                    Nov 10 - Nov 15 2023
                </p>
            </div>
            <div className={styles.card}>


                <h1>Hackathon Time</h1>
                <p className={styles.p}>
                    Nov 10 - Nov 15 2023
                </p>
            </div>
        </div>

    )
}

export default TimeCard