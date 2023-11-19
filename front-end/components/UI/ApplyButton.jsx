import React from 'react'
import styles from 'styles/applyButton.module.css'

const ApplyButton = () => {
    return (
        <div >
            <button className={styles.button} style={{margin:'30px 250px'}}> Apply
            </button>
            <button className={styles.button} style={{margin:'10px 223px'}}> Community
            </button>
        </div>
    )
}

export default ApplyButton