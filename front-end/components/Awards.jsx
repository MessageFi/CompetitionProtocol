import React from 'react'
import styles from 'styles/award.module.css'
const Awards = () => {
  return (
    <div>
      <p className={styles.t}>Awards</p>
      <div class={styles.cards}>
        <div class={styles.card}>
          <p class={styles.track}>Track 1</p>
          <p class={styles.trackName}>Public Goods</p>
          <p class={styles.trackDesc}>Build open-source projects on Ethereum (Protocols, Infrastructure, Developer Tools, ……)</p>
          <div className={styles.list}>
            <div className={styles.list}>
              <div className={styles.ranking}>1st</div>
              <div className={`${styles.numberFirst} ${styles.first}`}>$4000</div>
            </div>
            <div className={styles.list}>
              <div className={styles.ranking}>2st</div>
              <div className={styles.numberSecond}>$3000</div>
            </div>
            <div className={styles.list}>
              <div className={styles.ranking}>3st</div>
              <div className={styles.numberThird}>$2000</div>
            </div>
          </div>
        </div>
        <div class={styles.card}>
        <p class={styles.track}>Track 2</p>
          <p class={styles.trackName}>Layer2 Application</p>
          <p class={styles.trackDesc}>Build projects on Layer 2 that surprise (DAO, On-chain Gaming, Social, ……)</p>
          <div className={styles.list}>
            <div className={styles.list}>
              <div className={styles.ranking}>1st</div>
              <div className={`${styles.numberFirst} ${styles.first}`}>$4000</div>
            </div>
            <div className={styles.list}>
              <div className={styles.ranking}>2st</div>
              <div className={styles.numberSecond}>$3000</div>
            </div>
            <div className={styles.list}>
              <div className={styles.ranking}>3st</div>
              <div className={styles.numberThird}>$2000</div>
            </div>
          </div>
        </div>
        <div class={styles.card}>
        <p class={styles.track}>Track 3</p>
          <p class={styles.trackName}>Zero Knowledge</p>
          <p class={styles.trackDesc}>Build projects with Zero Knowledge (Privacy, Data, Security, ……)</p>
          <div className={styles.list}>
            <div className={styles.list}>
              <div className={styles.ranking}>1st</div>
              <div className={`${styles.numberFirst} ${styles.first}`}>$4000</div>
            </div>
            <div className={styles.list}>
              <div className={styles.ranking}>1st</div>
              <div className={styles.numberSecond}>$4000</div>
            </div>
            <div className={styles.list}>
              <div className={styles.ranking}>1st</div>
              <div className={styles.numberThird}>$4000</div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default Awards