import React from 'react'
import styles from 'styles/Teams.module.css'

const Teams = () => {
  return (
    <div className={styles.container}>
      <p className={styles.t}>Teams</p>
      <div className={styles.teams}>
        <div className={styles.card}>
          <div className={styles.card2}>
            <p className={styles.tittle}>competition protocol</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.card2}>
            <p className={styles.tittle}>competition protocol</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.card2}>
            <p className={styles.tittle}>competition protocol</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Teams