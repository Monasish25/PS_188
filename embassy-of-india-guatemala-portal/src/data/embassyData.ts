export interface SlideData {
  id: number;
  tagline: string;
  title: string;
  subtitle: string;
  date: string;
  imageUrl: string;
  linkText: string;
}

export interface GeneralInfoTab {
  id: string;
  title: string;
  contentTitle: string;
  description: string;
  extraDetails?: string[];
  tableData?: { col1: string; col2: string; col3?: string }[];
}

export interface ItecCard {
  id: string;
  title: string;
  description: string;
  category: string;
  badge: string;
  highlights: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  isNew?: boolean;
}

export const HERO_SLIDES: SlideData[] = [
  {
    id: 1,
    tagline: 'Embassy Of India Organized A',
    title: 'Meeting With Guatemalan Ministry Of Economy',
    subtitle: 'For Indian Investors 17 December 2022',
    date: '17 December 2022',
    imageUrl: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=1200&q=80',
    linkText: 'Know More',
  },
  {
    id: 2,
    tagline: 'Strengthening Bilateral Cooperation',
    title: 'High-Level Trade & Investment Delegation to Guatemala City',
    subtitle: 'Promoting Pharmaceuticals, IT, Agriculture & Renewable Energy',
    date: '12 January 2023',
    imageUrl: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=1200&q=80',
    linkText: 'Read Press Release',
  },
  {
    id: 3,
    tagline: 'Cultural Exchange & Diplomacy',
    title: 'Festival of India & Gandhi Peace Commemoration',
    subtitle: 'Held in Antigua Guatemala with Ministry of Culture & Sports',
    date: '02 October 2022',
    imageUrl: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80',
    linkText: 'View Gallery',
  },
];

export const GENERAL_INFO_TABS: GeneralInfoTab[] = [
  {
    id: 'about',
    title: 'About Embassy',
    contentTitle: 'About Embassy',
    description:
      'This Embassy Started Rendering All Consular Services With Effect From October 21, 2010. The Chancery Building Was Formally Inaugurated By H.E. Mr. E. Ahamed, Hon\'ble Minister Of State For External Affairs On April 29th, 2011 During His Visit To Guatemala.',
    extraDetails: [
      'Concurrent accreditation: Republic of El Salvador and Republic of Honduras.',
      'Promotes political, economic, commercial, cultural, educational, and consular ties.',
      'Provides emergency assistance and passport/visa/OCI documentation to Indian diaspora and foreign nationals.',
    ],
  },
  {
    id: 'ambassadors',
    title: 'Former Ambassadors Of India To Guatemala',
    contentTitle: 'Former Ambassadors Of India To Guatemala',
    description:
      'Distinguished career diplomats who represented the Republic of India to Guatemala, El Salvador, and Honduras since the mission establishment.',
    tableData: [
      { col1: 'H.E. Mr. Subrata Bhattacharjee', col2: 'Ambassador of India', col3: '2012 - 2015' },
      { col1: 'H.E. Mr. Sajeev Babu Kurup', col2: 'Ambassador of India', col3: '2015 - 2019' },
      { col1: 'H.E. Mr. B. S. Mubarak', col2: 'Ambassador of India', col3: '2019 - 2021' },
      { col1: 'H.E. Dr. Manoj Kumar Mohapatra', col2: 'Ambassador of India', col3: '2021 - Present' },
    ],
  },
  {
    id: 'officers',
    title: 'List Of Officers',
    contentTitle: 'List Of Officers & Mission Secretariat',
    description:
      'Official diplomatic corps and consular staff at the Embassy of India, Guatemala City.',
    tableData: [
      { col1: 'Dr. Manoj Kumar Mohapatra', col2: 'Ambassador Extraordinary and Plenipotentiary', col3: 'amb.guatemala@mea.gov.in' },
      { col1: 'Shri Neeraj Agrawal', col2: 'Head of Chancery & Second Secretary (Pol & Com)', col3: 'hoc.guatemala@mea.gov.in' },
      { col1: 'Shri Anand Kumar', col2: 'Attaché (Consular & Visa)', col3: 'cons.guatemala@mea.gov.in' },
      { col1: 'Shri R. P. Sharma', col2: 'Attaché (Administration & Finance)', col3: 'admn.guatemala@mea.gov.in' },
    ],
  },
  {
    id: 'holidays2022',
    title: 'List Of Holidays 2022',
    contentTitle: 'Closed Holidays Observed During 2022',
    description:
      'List of closed holidays observed by the Embassy of India, Guatemala City during the calendar year 2022.',
    tableData: [
      { col1: 'Republic Day', col2: '26 January 2022', col3: 'Wednesday' },
      { col1: 'Holi / Good Friday', col2: '15 April 2022', col3: 'Friday' },
      { col1: 'Independence Day of India', col2: '15 August 2022', col3: 'Monday' },
      { col1: 'Guatemala Independence Day', col2: '15 September 2022', col3: 'Thursday' },
      { col1: 'Mahatma Gandhi Birthday', col2: '02 October 2022', col3: 'Sunday' },
      { col1: 'Diwali (Deepavali)', col2: '24 October 2022', col3: 'Monday' },
    ],
  },
  {
    id: 'holidays2023',
    title: 'List Of Holidays 2023',
    contentTitle: 'Closed Holidays Observed During 2023',
    description:
      'Official list of gazetted public and national holidays observed by the Embassy during 2023.',
    tableData: [
      { col1: 'Republic Day', col2: '26 January 2023', col3: 'Thursday' },
      { col1: 'Mahavir Jayanti / Semana Santa', col2: '06-07 April 2023', col3: 'Thu / Fri' },
      { col1: 'Eid-ul-Fitr', col2: '22 April 2023', col3: 'Saturday' },
      { col1: 'Independence Day of India', col2: '15 August 2023', col3: 'Tuesday' },
      { col1: 'Guatemala National Day', col2: '15 September 2023', col3: 'Friday' },
      { col1: 'Dussehra & Diwali', col2: '24 Oct & 12 Nov 2023', col3: 'Official' },
    ],
  },
];

export const ITEC_CARDS: ItecCard[] = [
  {
    id: 'itec-about',
    title: 'What Is The ITEC Program?',
    description:
      'The Indian Technical And Economic Cooperation (ITEC) Programme was created in 1964 as a flagship capacity-building platform sharing India\'s developmental expertise with 160+ partner nations.',
    category: 'Flagship Capacity Building',
    badge: 'Overview',
    highlights: ['Established 1964', 'Partnered with 160+ Countries', 'Civilian & Defence Courses'],
  },
  {
    id: 'e-itec',
    title: 'E-ITEC',
    description:
      'ITEC Is About Cooperation And Partnership For Mutual Benefit. Live online interactive courses conducted by premier Indian institutes in governance, IT, healthcare, and engineering.',
    category: 'Digital Learning',
    badge: 'Virtual',
    highlights: ['Zero Travel Required', 'Premier IITs & IIMs Faculty', 'Certified by Government of India'],
  },
  {
    id: 'itec-apply',
    title: 'How To Apply For ITEC Scholarships',
    description:
      'Government Of India, In An Effort To Contribute To Capacity Building. Detailed guidelines for government employees, public sector officials, and professionals in Guatemala, Honduras & El Salvador.',
    category: 'Application Desk',
    badge: 'Step-by-Step',
    highlights: ['Register on ITEC Portal', 'Departmental Nomination', 'Embassy Interview & Visa Grant'],
  },
  {
    id: 'itec-included',
    title: "What's Included In ITEC Scholarships?",
    description:
      'Government Of India, In An Effort To Contribute To Capacity Building. Full airfare, comprehensive tuition, comfortable accommodation, living stipend, and study tour allowance.',
    category: 'Full Fellowship',
    badge: '100% Funded',
    highlights: ['Round-trip Airfare Covered', 'Tax-free Monthly Stipend', 'Medical Insurance Included'],
  },
];

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: '1',
    title: 'Advertisement For Yoga Teacher, EOI Guatemala City',
    date: '26 December 2022',
    category: 'Notice',
    isNew: true,
  },
  {
    id: '2',
    title: "Photo Exhibition To Commemorate 'VEER BAAL DIWAS'",
    date: '26 December 2022',
    category: 'Cultural',
    isNew: true,
  },
  {
    id: '3',
    title: 'Ambassador & Mr. S. Nagarajan, Co-Founder Of Indian IT Company (@247ai) Virtual Meeting With Vice Minister Of Economy',
    date: '23 December 2022',
    category: 'Trade & IT',
  },
  {
    id: '4',
    title: "Ambassador's Interaction With Mr. S. Nagarajan, Co-Founder Of Indian IT Company",
    date: '23 December 2022',
    category: 'Bilateral',
  },
  {
    id: '5',
    title: 'Special Consular Camp Announcement in San Salvador & Tegucigalpa',
    date: '18 December 2022',
    category: 'Consular',
  },
];

export const USEFUL_GOV_LINKS = [
  { name: 'Government Of India', url: 'https://www.india.gov.in' },
  { name: 'National Portal Of India', url: 'https://www.india.gov.in' },
  { name: 'Federation Of Indian Chambers Of Commerce And Industry', url: 'https://www.ficci.in' },
  { name: 'Confederation Of Indian Industry', url: 'https://www.cii.in' },
  { name: 'Tourism (Incredible India)', url: 'https://www.incredibleindia.org' },
  { name: 'Project Exports Promotion Council Of India', url: 'https://www.projectexports.com' },
  { name: 'Basic Chemicals, Pharmaceuticals And Cosmetics Export Promotion Council', url: 'https://chemexcil.in' },
  { name: 'Invest India (National Investment Promotion)', url: 'https://www.investindia.gov.in' },
  { name: 'Gem And Jewellery Export Promotion Council', url: 'https://gjepc.org' },
  { name: 'The Plastics Export Promotion Council', url: 'https://plexconcil.org' },
];

export const GOV_PARTNER_LOGOS = [
  { name: 'Make In India', subtitle: 'Global Manufacturing Hub', acronym: 'MAKE IN INDIA' },
  { name: 'Swachh Bharat', subtitle: 'Clean India Mission', acronym: 'एक कदम स्वच्छता की ओर' },
  { name: 'Invest India', subtitle: 'National Promotion & Facilitation', acronym: 'INVEST INDIA' },
  { name: 'MADAD', subtitle: 'Consular Grievances Monitoring System', acronym: 'MADAD Portal' },
  { name: 'Bharat Quiz', subtitle: 'Know India Initiative', acronym: 'भारत QUIZ' },
  { name: 'Pravasi Bharatiya Divas', subtitle: 'Connecting Indian Diaspora', acronym: 'PBD' },
  { name: 'India Perspectives', subtitle: 'Flagship Magazine of MEA', acronym: 'INDIA PERSPECTIVES' },
];
