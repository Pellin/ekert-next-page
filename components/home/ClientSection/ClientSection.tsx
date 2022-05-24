import Image from 'next/image'
import React from 'react'
import clients from './clientData.json'
import styles from './ClientSection.module.scss'

const ClientSection = () => {
  return (
    <section className={styles.clientSection}>
      <h2>Uppdragsgivare</h2>
      <ul className={styles.clientList}>
        {clients.map((client) => (
          <li key={client.name} className={styles.clientCard}>
            <Image
              src={client.logo}
              alt={client.name}
              height={80}
              width={80}
              objectFit="contain"
            />
            <h3>{client.name}</h3>
          </li>
        ))}
      </ul>
    </section>
  )
}

export default ClientSection
