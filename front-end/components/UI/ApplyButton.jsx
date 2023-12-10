import React from 'react'
import styles from 'styles/applyButton.module.css'
import Link from 'next/link'

const ApplyButton = () => {
    return (
        <div >
            <Link href="/apply">
            <button className={styles.button} style={{margin:'30px 250px'}}>
                 Apply
            </button>
            </Link>
            <button className={styles.button} style={{margin:'10px 223px'}}> Community
            </button>
        </div>
    )
}

export default ApplyButton