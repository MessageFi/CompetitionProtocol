import React from 'react'
import styles from 'styles/Teams.module.css'
import {Button} from 'antd'

const Teams = () => {
  return (
    <div className={styles.container}>
      <p className={styles.t}>Teams</p>
      <div className={styles.teams}>
        <div className={styles.card}>
          <div className={styles.card2}>
            <p className={styles.tittle}>competition protocol</p>
            <p className={styles.trace}>: zero application</p>
            <p className={styles.desc}>: a good good competition protocol</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.card2}>
            <p className={styles.tittle}>competition protocol</p>
            <p className={styles.trace}>: zero application</p>
            <p className={styles.desc}>: a good good competition protocol</p>
          </div>
        </div>
        <div className={styles.card}>
          <div className={styles.card2}>
            <p className={styles.tittle}>competition protocol</p>
            <p className={styles.trace}>: zero application</p>
            <p className={styles.desc}>: a good good competition protocol </p>
          </div>
        </div>
      </div>
      <Button type='primary' className={styles.btn}> Create Team </Button>
    </div>
  )
}

export default Teams