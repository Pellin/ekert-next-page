import Image from 'next/image'
import React from 'react'
import styles from './ClientSection.module.scss'

const ClientSection = () => {
  const clients = [
    { name: 'Nexiko', logo: '/logos/nexico.png' },
    { name: 'Jarowskij', logo: '/logos/jarowskij.svg' },
    { name: 'SVT', logo: '/logos/svt.svg' },
    { name: 'TV4', logo: '/logos/tv4.png' },
    { name: 'Dare', logo: '/logos/dare.png' },
    { name: 'Tale Content', logo: '/logos/tale.jpeg' },
    { name: 'NEP', logo: '/logos/nep.png' },
    { name: 'Storyfire', logo: '/logos/storyfire.jpeg' },
    { name: 'Strix', logo: '/logos/strix.png' },
    { name: 'ITV', logo: '/logos/itv.png' },
    { name: 'Mastiff', logo: '/logos/mastiff.png' },
    { name: 'Art89', logo: '/logos/art89.png' },
    { name: 'UR', logo: '/logos/ur.png' },
    { name: 'Baluba', logo: '/logos/baluba.svg' },
    { name: 'Meter Television', logo: '/logos/meter.png' },
    { name: 'Nordisk Film och TV', logo: '/logos/nordisk.svg' },
    { name: 'Fremantle', logo: '/logos/fremantle.svg' },
  ]

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

// Nexiko
// Jarowskij
// Svt
// Tv4
// Dare
// Tale Content
// NEP
// Storyfire
// Strix
// ITV
// Mastiff
// Art89
// UR
// Baluba
// Meter television
// Nordisk film och tv
// Fremantle
