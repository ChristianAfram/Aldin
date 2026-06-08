export type City = {
  slug: string
  name: string
  region: string
  industries: string
  jobMarket: string
}

export const cities: City[] = [
  {
    slug: 'berlin',
    name: 'Berlin',
    region: 'Berlin',
    industries: 'Tech, Startups, Kreativwirtschaft, Medien',
    jobMarket: 'Berlins Jobmarkt boomt – besonders im Tech- und Startup-Umfeld. Ausbildungsplaetze und Praktika in Unternehmen wie Zalando, Delivery Hero oder zahllosen Startups sind stark umkaempft.',
  },
  {
    slug: 'hamburg',
    name: 'Hamburg',
    region: 'Hamburg',
    industries: 'Logistik, Handel, Medien, Luftfahrt',
    jobMarket: 'Hamburg ist das Tor zur Welt – Hafen, Handel und Medienbranche bieten zahlreiche Ausbildungsplaetze und Praktika. Airbus, Otto und viele Medienhaeuser suchen Nachwuchs.',
  },
  {
    slug: 'muenchen',
    name: 'München',
    region: 'Bayern',
    industries: 'Automobil, Versicherungen, Tech, Luft- und Raumfahrt',
    jobMarket: 'Muenchen hat die niedrigste Arbeitslosenquote Deutschlands. BMW, MAN, Allianz und Siemens bieten exzellente Ausbildungsplaetze. Die Konkurrenz ist hoch – ein starker Lebenslauf ist Pflicht.',
  },
  {
    slug: 'koeln',
    name: 'Köln',
    region: 'Nordrhein-Westfalen',
    industries: 'Medien, Versicherungen, Chemie, Einzelhandel',
    jobMarket: 'Koeln als Medienhauptstadt bietet viele Praktika und Einstiegsstellen. RTL, WDR und zahlreiche Versicherungen bilden regelmaessig aus.',
  },
  {
    slug: 'frankfurt',
    name: 'Frankfurt',
    region: 'Hessen',
    industries: 'Finanzen, Banking, Unternehmensberatung, Logistik',
    jobMarket: 'Frankfurts Finanzsektor ist europaweit fuehrend. Deutsche Bank, Commerzbank und internationale Banken bieten Top-Ausbildungsplaetze – besonders im kaufmaennischen Bereich.',
  },
  {
    slug: 'stuttgart',
    name: 'Stuttgart',
    region: 'Baden-Württemberg',
    industries: 'Automobil, Maschinenbau, IT, Ingenieurwesen',
    jobMarket: 'Stuttgart ist die Automobilhauptstadt Deutschlands. Mercedes-Benz, Porsche und Bosch bieten hervorragende Ausbildungsplaetze und Praktika – aber die Bewerber sind top vorbereitet.',
  },
  {
    slug: 'duesseldorf',
    name: 'Düsseldorf',
    region: 'Nordrhein-Westfalen',
    industries: 'Mode, Werbung, Telekommunikation, Stahl',
    jobMarket: 'Duesseldorf punktet als Modehauptstadt und Werbestandort. Vodafone, Henkel und Metro haben hier ihren Sitz und bilden regelmaessig aus.',
  },
  {
    slug: 'leipzig',
    name: 'Leipzig',
    region: 'Sachsen',
    industries: 'Logistik, Automobil, Kreativwirtschaft, Medien',
    jobMarket: 'Leipzig waechst rasant. BMW-Werk, Amazon-Logistik und eine aufbluehende Startup-Szene schaffen immer mehr Ausbildungsplaetze fuer junge Bewerber.',
  },
  {
    slug: 'dortmund',
    name: 'Dortmund',
    region: 'Nordrhein-Westfalen',
    industries: 'Logistik, IT, Stahl, Handel',
    jobMarket: 'Dortmund hat sich vom Stahlstandort zur IT-Stadt gewandelt. Zalando, Signal Iduna und ThyssenKrupp suchen Nachwuchs. Ein professioneller Lebenslauf ist der erste Schritt.',
  },
  {
    slug: 'essen',
    name: 'Essen',
    region: 'Nordrhein-Westfalen',
    industries: 'Energie, Stahl, Einzelhandel, Gesundheit',
    jobMarket: 'Essen als Energiestandort bietet Ausbildungsplaetze bei RWE, Aldi und der Universitaetsklinik. Der Wettbewerb um gute Stellen ist gross.',
  },
]

export function getCityBySlug(slug: string): City | undefined {
  return cities.find((c) => c.slug === slug)
}
