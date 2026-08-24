import { Book, Chapter, BibleVersion, BibleVersionId, Verse } from '../types';

export const BIBLE_VERSIONS: BibleVersion[] = [
  {
    id: 'adb',
    name: 'Ang Dating Biblia (1905)',
    shortName: 'ADB',
    subtitle: 'Tradisyonal na Tagalog',
    year: '1905',
    description: 'Ang klasikong salin sa Tagalog na pamilyar at kinagisnan sa mga tradisyonal na simbahan.'
  },
  {
    id: 'mbb',
    name: 'Magandang Balita Biblia (MBBTAG)',
    shortName: 'MBB',
    subtitle: 'Makabagong Tagalog',
    year: 'Contemporary',
    description: 'Madaling maunawaan, likas at dinamikong salin sa Tagalog para sa pangkalahatang mambabasa.'
  },
  {
    id: 'snd',
    name: 'Ang Salita ng Diyos (SND)',
    shortName: 'SND',
    subtitle: 'Napapanahong Salin',
    year: '2015',
    description: 'Tapat at malinaw na modernong salin na nagpapanatili ng katumpakan sa orihinal na teksto.'
  }
];

export function getVerseText(verse: Verse, versionId: BibleVersionId = 'adb'): string {
  if (verse.versions && verse.versions[versionId]) {
    return verse.versions[versionId]!;
  }
  return verse.text;
}

export const BOOKS: Book[] = [
  {
    id: 'genesis',
    name: 'Genesis',
    testament: 'Lumang Tipan',
    category: 'Kasaysayan',
    chaptersCount: 50,
    availableChapters: [1]
  },
  {
    id: 'salmo',
    name: 'Mga Awit (Salmo)',
    testament: 'Lumang Tipan',
    category: 'Mga Tula at Karunungan',
    chaptersCount: 150,
    availableChapters: [23, 91, 121]
  },
  {
    id: 'kawikaan',
    name: 'Mga Kawikaan',
    testament: 'Lumang Tipan',
    category: 'Mga Tula at Karunungan',
    chaptersCount: 31,
    availableChapters: [3]
  },
  {
    id: 'mateo',
    name: 'Mateo',
    testament: 'Bagong Tipan',
    category: 'Ebanghelyo',
    chaptersCount: 28,
    availableChapters: [1, 5, 6]
  },
  {
    id: 'juan',
    name: 'Juan',
    testament: 'Bagong Tipan',
    category: 'Ebanghelyo',
    chaptersCount: 21,
    availableChapters: [1, 3, 14]
  },
  {
    id: 'roma',
    name: 'Mga Taga-Roma',
    testament: 'Bagong Tipan',
    category: 'Mga Sulat',
    chaptersCount: 16,
    availableChapters: [8]
  },
  {
    id: '1corinto',
    name: '1 Mga Taga-Corinto',
    testament: 'Bagong Tipan',
    category: 'Mga Sulat',
    chaptersCount: 16,
    availableChapters: [13]
  },
  {
    id: 'filipos',
    name: 'Mga Taga-Filipos',
    testament: 'Bagong Tipan',
    category: 'Mga Sulat',
    chaptersCount: 4,
    availableChapters: [4]
  },
  {
    id: 'pahayag',
    name: 'Pahayag',
    testament: 'Bagong Tipan',
    category: 'Panghuhula',
    chaptersCount: 22,
    availableChapters: [21]
  }
];

export const CHAPTERS: Chapter[] = [
  {
    id: 'mateo-1',
    bookId: 'mateo',
    bookName: 'Mateo',
    chapterNumber: 1,
    title: 'Ang Talaangkanan at Kapanganakan ni Jesu-Cristo',
    testament: 'Bagong Tipan',
    summary: 'Ang talaangkanan ni Jesu-Cristo mula kay Abraham hanggang kay Jose, at ang pagpapahayag ng anghel kay Jose hinggil sa pagsilang ni Jesus.',
    verses: [
      {
        number: 1,
        text: "Ang aklat ng lahi ni Jesu-Cristo, na anak ni David, na anak ni Abraham.",
        versions: {
          adb: "Ang aklat ng lahi ni Jesu-Cristo, na anak ni David, na anak ni Abraham.",
          mbb: "Ito ang talaan ng mga ninuno ni Jesu-Cristo na mula sa angkan ni David, na mula naman sa angkan ni Abraham.",
          snd: "Ito ang talaan ng mga ninuno ni Jesu-Cristo na anak ni David, na anak ni Abraham."
        },
        englishText: "The book of the genealogy of Jesus Christ, the son of David, the son of Abraham."
      },
      {
        number: 2,
        text: "Naging anak ni Abraham si Isaac; at naging anak ni Isaac si Jacob; at naging anak ni Jacob si Juda at ang kaniyang mga kapatid;",
        versions: {
          adb: "Naging anak ni Abraham si Isaac; at naging anak ni Isaac si Jacob; at naging anak ni Jacob si Juda at ang kaniyang mga kapatid;",
          mbb: "Si Abraham ang ama ni Isaac; si Isaac ang ama ni Jacob; si Jacob ang ama ni Juda at ng kanyang mga kapatid;",
          snd: "Si Abraham ang naging ama ni Isaac; si Isaac ang naging ama ni Jacob; at si Jacob ang naging ama ni Juda at ng kanyang mga kapatid;"
        },
        englishText: "Abraham became the father of Isaac. Isaac became the father of Jacob. Jacob became the father of Judah and his brothers."
      },
      {
        number: 3,
        text: "At naging anak ni Juda kay Tamar si Fares at si Zara; at naging anak ni Fares si Esrom; at naging anak ni Esrom si Aram;",
        versions: {
          adb: "At naging anak ni Juda kay Tamar si Fares at si Zara; at naging anak ni Fares si Esrom; at naging anak ni Esrom si Aram;",
          mbb: "si Juda ang ama nina Perez at Zera kay Tamar; si Perez ang ama ni Hezron; si Hezron ang ama ni Ram;",
          snd: "si Juda ang ama nina Perez at Zera kay Tamar; si Perez ang ama ni Hezron; at si Hezron ang ama ni Ram;"
        },
        englishText: "Judah became the father of Perez and Zerah by Tamar. Perez became the father of Hezron. Hezron became the father of Ram."
      },
      {
        number: 4,
        text: "At naging anak ni Aram si Aminadab; at naging anak ni Aminadab si Naason; at naging anak ni Naason si Salmon;",
        versions: {
          adb: "At naging anak ni Aram si Aminadab; at naging anak ni Aminadab si Naason; at naging anak ni Naason si Salmon;",
          mbb: "si Ram ang ama ni Aminadab; si Aminadab ang ama ni Naason; si Naason ang ama ni Salmon;",
          snd: "si Ram ang ama ni Aminadab; si Aminadab ang ama ni Naason; at si Naason ang ama ni Salmon;"
        },
        englishText: "Ram became the father of Amminadab. Amminadab became the father of Nahshon. Nahshon became the father of Salmon."
      },
      {
        number: 5,
        text: "At naging anak ni Salmon kay Rahab si Booz; at naging anak ni Booz kay Rut si Obed; at naging anak ni Obed si Jesse;",
        versions: {
          adb: "At naging anak ni Salmon kay Rahab si Booz; at naging anak ni Booz kay Rut si Obed; at naging anak ni Obed si Jesse;",
          mbb: "si Salmon ang ama ni Boaz kay Rahab; si Boaz ang ama ni Obed kay Ruth; si Obed ang ama ni Jesse;",
          snd: "si Salmon ang ama ni Boaz kay Rahab; si Boaz ang ama ni Obed kay Ruth; at si Obed ang ama ni Jesse;"
        },
        englishText: "Salmon became the father of Boaz by Rahab. Boaz became the father of Obed by Ruth. Obed became the father of Jesse."
      },
      {
        number: 6,
        text: "At naging anak ni Jesse ang haring si David. At naging anak ni David si Salomon, sa naging asawa ni Urias;",
        versions: {
          adb: "At naging anak ni Jesse ang haring si David. At naging anak ni David si Salomon, sa naging asawa ni Urias;",
          mbb: "at si Jesse ang ama ni Haring David. Si David ang ama ni Solomon sa dating asawa ni Urias;",
          snd: "at si Jesse ang ama ng haring si David. Si David ang ama ni Solomon sa dating asawa ni Uria;"
        },
        englishText: "Jesse became the father of King David. David became the father of Solomon by her who had been Uriah's wife."
      },
      {
        number: 7,
        text: "At naging anak ni Salomon si Roboam; at naging anak ni Roboam si Abias; at naging anak ni Abias si Asa;",
        versions: {
          adb: "At naging anak ni Salomon si Roboam; at naging anak ni Roboam si Abias; at naging anak ni Abias si Asa;",
          mbb: "si Solomon ang ama ni Rehoboam; si Rehoboam ang ama ni Abias; si Abias ang ama ni Asa;",
          snd: "si Solomon ang ama ni Rehoboam; si Rehoboam ang ama ni Abias; at si Abias ang ama ni Asa;"
        },
        englishText: "Solomon became the father of Rehoboam. Rehoboam became the father of Abijah. Abijah became the father of Asa."
      },
      {
        number: 8,
        text: "At naging anak ni Asa si Josafat; at naging anak ni Josafat si Joram; at naging anak ni Joram si Ozias;",
        versions: {
          adb: "At naging anak ni Asa si Josafat; at naging anak ni Josafat si Joram; at naging anak ni Joram si Ozias;",
          mbb: "si Asa ang ama ni Jehoshafat; si Jehoshafat ang ama ni Joram; si Joram ang ama ni Uzias;",
          snd: "si Asa ang ama ni Josafat; si Josafat ang ama ni Joram; at si Joram ang ama ni Uzias;"
        },
        englishText: "Asa became the father of Jehoshaphat. Jehoshaphat became the father of Joram. Joram became the father of Uzziah."
      },
      {
        number: 9,
        text: "At naging anak ni Ozias si Joatam; at naging anak ni Joatam si Acaz; at naging anak ni Acaz si Ezequias;",
        versions: {
          adb: "At naging anak ni Ozias si Joatam; at naging anak ni Joatam si Acaz; at naging anak ni Acaz si Ezequias;",
          mbb: "si Uzias ang ama ni Jotam; si Jotam ang ama ni Ahaz; si Ahaz ang ama ni Hezekias;",
          snd: "si Uzias ang ama ni Jotam; si Jotam ang ama ni Ahaz; at si Ahaz ang ama ni Hezekias;"
        },
        englishText: "Uzziah became the father of Jotham. Jotham became the father of Ahaz. Ahaz became the father of Hezekiah."
      },
      {
        number: 10,
        text: "At naging anak ni Ezequias si Manases; at naging anak ni Manases si Amon; at naging anak ni Amon si Josias;",
        versions: {
          adb: "At naging anak ni Ezequias si Manases; at naging anak ni Manases si Amon; at naging anak ni Amon si Josias;",
          mbb: "si Hezekias ang ama ni Manases; si Manases ang ama ni Amon; si Amon ang ama ni Josias;",
          snd: "si Hezekias ang ama ni Manases; si Manases ang ama ni Amon; at si Amon ang ama ni Josias;"
        },
        englishText: "Hezekiah became the father of Manasseh. Manasseh became the father of Amon. Amon became the father of Josiah."
      },
      {
        number: 11,
        text: "At naging anak ni Josias si Jeconias at ang kaniyang mga kapatid, nang panahon ng paglipat sa Babilonia.",
        versions: {
          adb: "At naging anak ni Josias si Jeconias at ang kaniyang mga kapatid, nang panahon ng paglipat sa Babilonia.",
          mbb: "at si Josias ang ama ni Jeconias at ng kanyang mga kapatid noong panahon ng pagkabihag ng mga Israelita sa Babilonia.",
          snd: "at si Josias ang ama ni Jeconias at ng kanyang mga kapatid noong panahon ng pagkatapon sa Babilonia."
        },
        englishText: "Josiah became the father of Jechoniah and his brothers, at the time of the exile to Babylon."
      },
      {
        number: 12,
        text: "At pagkatapos ng paglipat sa Babilonia, ay naging anak ni Jeconias si Salatiel; at naging anak ni Salatiel si Zorobabel;",
        versions: {
          adb: "At pagkatapos ng paglipat sa Babilonia, ay naging anak ni Jeconias si Salatiel; at naging anak ni Salatiel si Zorobabel;",
          mbb: "Pagkatapos ng pagkabihag sa Babilonia, si Jeconias ang naging ama ni Salatiel; si Salatiel ang ama ni Zerubabel;",
          snd: "Pagkatapos ng pagkatapon sa Babilonia, si Jeconias ang ama ni Sealtiel; at si Sealtiel ang ama ni Zerubabel;"
        },
        englishText: "After the exile to Babylon, Jechoniah became the father of Shealtiel. Shealtiel became the father of Zerubbabel."
      },
      {
        number: 13,
        text: "At naging anak ni Zorobabel si Abiud; at naging anak ni Abiud si Eliaquim; at naging anak ni Eliaquim si Azor;",
        versions: {
          adb: "At naging anak ni Zorobabel si Abiud; at naging anak ni Abiud si Eliaquim; at naging anak ni Eliaquim si Azor;",
          mbb: "si Zerubabel ang ama ni Abiud; si Abiud ang ama ni Eliakim; si Eliakim ang ama ni Azor;",
          snd: "si Zerubabel ang ama ni Abiud; si Abiud ang ama ni Eliakim; at si Eliakim ang ama ni Azor;"
        },
        englishText: "Zerubbabel became the father of Abiud. Abiud became the father of Eliakim. Eliakim became the father of Azor."
      },
      {
        number: 14,
        text: "At naging anak ni Azor si Sadoc; at naging anak ni Sadoc si Aquim; at naging anak ni Aquim si Eliud;",
        versions: {
          adb: "At naging anak ni Azor si Sadoc; at naging anak ni Sadoc si Aquim; at naging anak ni Aquim si Eliud;",
          mbb: "si Azor ang ama ni Zadok; si Zadok ang ama ni Aquim; si Aquim ang ama ni Eliud;",
          snd: "si Azor ang ama ni Sadoc; si Sadoc ang ama ni Aquim; at si Aquim ang ama ni Eliud;"
        },
        englishText: "Azor became the father of Zadok. Zadok became the father of Achim. Achim became the father of Eliud."
      },
      {
        number: 15,
        text: "At naging anak ni Eliud si Eleazar; at naging anak ni Eleazar si Matan; at naging anak ni Matan si Jacob;",
        versions: {
          adb: "At naging anak ni Eliud si Eleazar; at naging anak ni Eleazar si Matan; at naging anak ni Matan si Jacob;",
          mbb: "si Eliud ang ama ni Eleazar; si Eleazar ang ama ni Matan; si Matan ang ama ni Jacob;",
          snd: "si Eliud ang ama ni Eleazar; si Eleazar ang ama ni Matan; at si Matan ang ama ni Jacob;"
        },
        englishText: "Eliud became the father of Eleazar. Eleazar became the father of Matthan. Matthan became the father of Jacob."
      },
      {
        number: 16,
        text: "At naging anak ni Jacob si Jose na asawa ni Maria, na siyang nanganak kay Jesus, na tinatawag na Cristo.",
        versions: {
          adb: "At naging anak ni Jacob si Jose na asawa ni Maria, na siyang nanganak kay Jesus, na tinatawag na Cristo.",
          mbb: "at si Jacob ang ama ni Jose na asawa ni Maria. Si Maria ang ina ni Jesus na tinatawag na Cristo.",
          snd: "at si Jacob ang ama ni Jose na asawa ni Maria, na siyang nagsilang kay Jesus, na tinatawag na Cristo."
        },
        englishText: "Jacob became the father of Joseph, the husband of Mary, from whom was born Jesus, who is called Christ."
      },
      {
        number: 17,
        text: "Sa makatuwid ang lahat ng mga salinlahi mula kay Abraham hanggang kay David ay labing apat na salinlahi; at mula kay David hanggang sa paglipat sa Babilonia ay labing apat na salinlahi; at mula sa paglipat sa Babilonia hanggang kay Cristo ay labing apat na salinlahi.",
        versions: {
          adb: "Sa makatuwid ang lahat ng mga salinlahi mula kay Abraham hanggang kay David ay labing apat na salinlahi; at mula kay David hanggang sa paglipat sa Babilonia ay labing apat na salinlahi; at mula sa paglipat sa Babilonia hanggang kay Cristo ay labing apat na salinlahi.",
          mbb: "Kaya't may labing-apat na salinlahi mula kay Abraham hanggang kay David, labing-apat na salinlahi mula kay David hanggang sa pagkabihag sa Babilonia, at labing-apat ding salinlahi mula sa pagkabihag sa Babilonia hanggang kay Cristo.",
          snd: "Kaya may labing-apat na salinlahi mula kay Abraham hanggang kay David; labing-apat na salinlahi mula kay David hanggang sa pagkatapon sa Babilonia; at labing-apat na salinlahi mula sa pagkatapon sa Babilonia hanggang kay Cristo."
        },
        englishText: "So all the generations from Abraham to David are fourteen generations; from David to the exile to Babylon fourteen generations; and from the exile to Babylon to the Christ, fourteen generations."
      },
      {
        number: 18,
        text: "Ang pagkapanganak nga kay Jesu-Cristo ay ganito: Nang si Maria na kaniyang ina ay magaasawa kay Jose, bago sila nagsama ay nasumpungang siya'y nagdadalang-tao sa pamamagitan ng Espiritu Santo.",
        versions: {
          adb: "Ang pagkapanganak nga kay Jesu-Cristo ay ganito: Nang si Maria na kaniyang ina ay magaasawa kay Jose, bago sila nagsama ay nasumpungang siya'y nagdadalang-tao sa pamamagitan ng Espiritu Santo.",
          mbb: "Ganito ang nangyari sa kapanganakan ni Jesu-Cristo. Si Maria na kanyang ina at si Jose ay nakatakda nang magpakasal. Ngunit bago sila nagsama bilang mag-asawa, nalamang nagdadalang-tao si Maria sa pamamagitan ng Banal na Espiritu.",
          snd: "Ganito ang kapanganakan ni Jesu-Cristo: Si Maria na Kanyang ina ay nakatakda nang ikasal kay Jose. Ngunit bago sila nagsama, natuklasang siya ay nagdadalang-tao sa pamamagitan ng Banal na Espiritu."
        },
        englishText: "Now the birth of Jesus Christ was like this: After his mother, Mary, was engaged to Joseph, before they came together, she was found pregnant by the Holy Spirit."
      },
      {
        number: 19,
        text: "At si Jose na kaniyang asawa, palibhasa'y lalaking matuwid, at ayaw na ihayag sa madla ang kaniyang kapurihan, ay nagpasiyang hiwalayan siya nang lihim.",
        versions: {
          adb: "At si Jose na kaniyang asawa, palibhasa'y lalaking matuwid, at ayaw na ihayag sa madla ang kaniyang kapurihan, ay nagpasiyang hiwalayan siya nang lihim.",
          mbb: "Dahil si Jose na kanyang mapapangasawa ay isang taong matuwid at ayaw niyang malagay sa kahihiyan si Maria, binalak niyang hiwalayan ito nang lihim.",
          snd: "Si Jose na kanyang mapapangasawa, palibhasa'y matuwid na tao at ayaw itong mapahiya sa madla, ay nagbalak na makipaghiwalay nang lihim."
        },
        englishText: "Joseph, her husband, being a righteous man, and not willing to make her a public example, intended to put her away secretly."
      },
      {
        number: 20,
        text: "Datapuwa't samantalang pinagiisip niya ito, narito, ang isang anghel ng Panginoon ay napakita sa kaniya sa panaginip, na nagsasabi: Jose, anak ni David, huwag kang mangamba sa pagtanggap kay Maria na iyong asawa: sapagka't ang kaniyang dinadalang-tao ay sa Espiritu Santo.",
        versions: {
          adb: "Datapuwa't samantalang pinagiisip niya ito, narito, ang isang anghel ng Panginoon ay napakita sa kaniya sa panaginip, na nagsasabi: Jose, anak ni David, huwag kang mangamba sa pagtanggap kay Maria na iyong asawa: sapagka't ang kaniyang dinadalang-tao ay sa Espiritu Santo.",
          mbb: "Habang iniisip ito ni Jose, nagpakita sa kanya sa panaginip ang isang anghel ng Panginoon. Sinabi nito sa kanya, 'Jose, anak ni David, huwag kang matakot na pakasalan si Maria, sapagkat ang sanggol na dinadala niya ay mula sa Banal na Espiritu.'",
          snd: "Ngunit habang pinag-iisipan niya ito, nagpakita sa kanya sa panaginip ang isang anghel ng Panginoon at nagsabi: 'Jose, anak ni David, huwag kang matakot na tanggapin si Maria bilang iyong asawa, sapagkat ang sanggol sa kanyang sinapupunan ay mula sa Banal na Espiritu.'"
        },
        englishText: "But when he thought about these things, behold, an angel of the Lord appeared to him in a dream, saying, 'Joseph, son of David, don't be afraid to take to yourself Mary, your wife, for that which is conceived in her is of the Holy Spirit.'"
      },
      {
        number: 21,
        text: "At siya'y manganganak ng isang lalake; at ang pangalang itatawag mo sa kaniya'y JESUS; sapagka't ililigtas niya ang kaniyang bayan sa kanilang mga kasalanan.",
        versions: {
          adb: "At siya'y manganganak ng isang lalake; at ang pangalang itatawag mo sa kaniya'y JESUS; sapagka't ililigtas niya ang kaniyang bayan sa kanilang mga kasalanan.",
          mbb: "Magsisilang siya ng isang batang lalaki at Jesus ang ipapangalan mo sa kanya, sapagkat ililigtas niya ang kanyang bayan sa kanilang mga kasalanan.",
          snd: "Magsisilang siya ng isang anak na lalaki at papangalanan mo Siyang JESUS, sapagkat ililigtas Niya ang Kanyang bayan mula sa kanilang mga kasalanan."
        },
        englishText: "She shall bring forth a son. You shall call his name Jesus, for it is he who shall save his people from their sins."
      },
      {
        number: 22,
        text: "Nangyari nga ang lahat ng ito, upang matupad ang sinalita ng Panginoon sa pamamagitan ng propeta, na nagsasabi:",
        versions: {
          adb: "Nangyari nga ang lahat ng ito, upang matupad ang sinalita ng Panginoon sa pamamagitan ng propeta, na nagsasabi:",
          mbb: "Nangyari ang lahat ng ito upang matupad ang sinabi ng Panginoon sa pamamagitan ng propeta:",
          snd: "Nangyari ang lahat ng ito upang matupad ang sinabi ng Panginoon sa pamamagitan ng propeta:"
        },
        englishText: "Now all this has happened that it might be fulfilled which was spoken by the Lord through the prophet, saying:"
      },
      {
        number: 23,
        text: "Narito, ang dalaga'y magdadalang-tao at manganganak ng isang lalake, at ang pangalang itatawag nila sa kaniya ay Emmanuel; na kung liliwanagin ay, Kasama natin ang Dios.",
        versions: {
          adb: "Narito, ang dalaga'y magdadalang-tao at manganganak ng isang lalake, at ang pangalang itatawag nila sa kaniya ay Emmanuel; na kung liliwanagin ay, Kasama natin ang Dios.",
          mbb: "'Maglilihi ang isang dalaga at magsisilang ng isang batang lalaki, at tatawagin itong Emmanuel,' na ang kahulugan ay 'Kasama natin ang Diyos.'",
          snd: "'Narito, ang isang birhen ay magdadalang-tao at magsisilang ng isang anak na lalaki, at tatawagin nila Siyang Emmanuel,' na ang ibig sabihin ay 'Kasama natin ang Diyos.'"
        },
        englishText: "'Behold, the virgin shall be with child, and shall bring forth a son. They shall call his name Immanuel;' which is, being interpreted, 'God with us.'"
      },
      {
        number: 24,
        text: "At nagbangon si Jose sa kaniyang pagkakatulog, at ginawa niya ang ayon sa ipinag-utos sa kaniya ng anghel ng Panginoon, at tinanggap ang kaniyang asawa;",
        versions: {
          adb: "At nagbangon si Jose sa kaniyang pagkakatulog, at ginawa niya ang ayon sa ipinag-utos sa kaniya ng anghel ng Panginoon, at tinanggap ang kaniyang asawa;",
          mbb: "Nang magising si Jose, sinunod niya ang utos ng anghel ng Panginoon; pinakasalan niya si Maria.",
          snd: "Kaya paggising ni Jose mula sa pagkakatulog, ginawa niya ang iniutos sa kanya ng anghel ng Panginoon at pinakasalan si Maria."
        },
        englishText: "Joseph arose from his sleep, and did as the angel of the Lord commanded him, and took his wife to himself;"
      },
      {
        number: 25,
        text: "At hindi nakilala siya hanggang sa maipanganak ang isang lalake: at tinawag niya ang kaniyang pangalang JESUS.",
        versions: {
          adb: "At hindi nakilala siya hanggang sa maipanganak ang isang lalake: at tinawag niya ang kaniyang pangalang JESUS.",
          mbb: "Ngunit hindi ginalaw ni Jose si Maria hanggang sa maipanganak nito ang sanggol na pinangalanan ngang Jesus.",
          snd: "Ngunit hindi siya sumiping sa kanya hanggang sa maipanganak nito ang kanyang panganay na anak na lalaki; at tinawag niya itong JESUS."
        },
        englishText: "and didn't know her clinically until she had brought forth her firstborn son. He named him Jesus."
      }
    ]
  },
  {
    id: 'mateo-5',
    bookId: 'mateo',
    bookName: 'Mateo',
    chapterNumber: 5,
    title: 'Ang Sermon sa Bundok (Ang mga Mapapalad)',
    testament: 'Bagong Tipan',
    summary: 'Ang mga aral ni Jesus sa bundok tungkol sa mga mapapalad, ang asin at ilaw ng sanlibutan, at ang kautusan ng pag-ibig.',
    verses: [
      {
        number: 1,
        text: "At pagkakita sa mga karamihan, ay umahon siya sa bundok: at pagkaupo niya, ay nagsilapit sa kaniya ang kaniyang mga alagad:",
        versions: {
          adb: "At pagkakita sa mga karamihan, ay umahon siya sa bundok: at pagkaupo niya, ay nagsilapit sa kaniya ang kaniyang mga alagad:",
          mbb: "Nang makita ni Jesus ang napakaraming tao, umakyat siya sa bundok. Pagkaupo niya, lumapit sa kanya ang kanyang mga alagad,",
          snd: "Pagkakita sa napakaraming tao, umakyat si Jesus sa bundok. Pagkaupo Niya, lumapit sa Kanya ang Kanyang mga alagad;"
        },
        englishText: "Seeing the multitudes, he went up onto the mountain. When he had sat down, his disciples came to him."
      },
      {
        number: 2,
        text: "At binuksan niya ang kaniyang bibig at tinuruan sila, na sinasabi,",
        versions: {
          adb: "At binuksan niya ang kaniyang bibig at tinuruan sila, na sinasabi,",
          mbb: "at sila'y sinimulan niyang turuan:",
          snd: "at binuksan Niya ang Kanyang bibig at tinuruan sila, na nagsasabi:"
        },
        englishText: "He opened his mouth and taught them, saying,"
      },
      {
        number: 3,
        text: "Mapapalad ang mga mapagpakumbabang-loob sa espiritu: sapagka't kanila ang kaharian ng langit.",
        versions: {
          adb: "Mapapalad ang mga mapagpakumbabang-loob sa espiritu: sapagka't kanila ang kaharian ng langit.",
          mbb: "Pinagpala ang mga kumikilala sa kanilang espirituwal na pangangailangan, sapagkat mapapabilang sila sa kaharian ng langit.",
          snd: "Mapapalad ang mga dukha sa espiritu, sapagkat sa kanila ang kaharian ng langit."
        },
        englishText: "Blessed are the poor in spirit, for theirs is the Kingdom of Heaven."
      },
      {
        number: 4,
        text: "Mapapalad ang nangagluluksa: sapagka't sila'y aaliwin.",
        versions: {
          adb: "Mapapalad ang nangagluluksa: sapagka't sila'y aaliwin.",
          mbb: "Pinagpala ang mga nagdadalamhati, sapagkat sila'y aaliwin ng Diyos.",
          snd: "Mapapalad ang mga nagdadalamhati, sapagkat sila ay aaliwin."
        },
        englishText: "Blessed are those who mourn, for they shall be comforted."
      },
      {
        number: 5,
        text: "Mapapalad ang maaamo: sapagka't mamamahin nila ang lupa.",
        versions: {
          adb: "Mapapalad ang maaamo: sapagka't mamamahin nila ang lupa.",
          mbb: "Pinagpala ang mga mapagpakumbaba, sapagkat mamanahin nila ang lupa.",
          snd: "Mapapalad ang maaamo, sapagkat mamanahin nila ang sanlibutan."
        },
        englishText: "Blessed are the gentle, for they shall inherit the earth."
      },
      {
        number: 6,
        text: "Mapapalad ang nangagugutom at nangauuhaw sa katuwiran: sapagka't sila'y bubusugin.",
        versions: {
          adb: "Mapapalad ang nangagugutom at nangauuhaw sa katuwiran: sapagka't sila'y bubusugin.",
          mbb: "Pinagpala ang mga nagugutom at nauuhaw sa katuwiran, sapagkat sila'y bubusugin.",
          snd: "Mapapalad ang mga nagugutom at nauuhaw sa katuwiran, sapagkat sila ay bubusugin."
        },
        englishText: "Blessed are those who hunger and thirst after righteousness, for they shall be filled."
      },
      {
        number: 7,
        text: "Mapapalad ang mga mahabagin: sapagka't sila'y kahahabagan.",
        versions: {
          adb: "Mapapalad ang mga mahabagin: sapagka't sila'y kahahabagan.",
          mbb: "Pinagpala ang mga mahabagin, sapagkat kahahabagan sila ng Diyos.",
          snd: "Mapapalad ang mga mahabagin, sapagkat sila ay tatanggap ng habag."
        },
        englishText: "Blessed are the merciful, for they shall obtain mercy."
      },
      {
        number: 8,
        text: "Mapapalad ang mga may malinis na puso: sapagka't makikita nila ang Dios.",
        versions: {
          adb: "Mapapalad ang mga may malinis na puso: sapagka't makikita nila ang Dios.",
          mbb: "Pinagpala ang mga may malinis na puso, sapagkat makikita nila ang Diyos.",
          snd: "Mapapalad ang may dalisay na puso, sapagkat makikita nila ang Diyos."
        },
        englishText: "Blessed are the pure in heart, for they shall see God."
      },
      {
        number: 9,
        text: "Mapapalad ang mga mapagpayapa: sapagka't sila'y tatawaging mga anak ng Dios.",
        versions: {
          adb: "Mapapalad ang mga mapagpayapa: sapagka't sila'y tatawaging mga anak ng Dios.",
          mbb: "Pinagpala ang mga nagtataguyod ng kapayapaan, sapagkat sila'y ituturing na mga anak ng Diyos.",
          snd: "Mapapalad ang mga mapagpayapa, sapagkat sila ay tatawaging mga anak ng Diyos."
        },
        englishText: "Blessed are the peacemakers, for they shall be called children of God."
      },
      {
        number: 10,
        text: "Mapapalad ang mga pinaguusig dahil sa katuwiran: sapagka't kanila ang kaharian ng langit.",
        versions: {
          adb: "Mapapalad ang mga pinaguusig dahil sa katuwiran: sapagka't kanila ang kaharian ng langit.",
          mbb: "Pinagpala ang mga inuusig dahil sa kanilang pagsunod sa kalooban ng Diyos, sapagkat mapapabilang sila sa kaharian ng langit.",
          snd: "Mapapalad ang mga pinag-uusig dahil sa katuwiran, sapagkat sa kanila ang kaharian ng langit."
        },
        englishText: "Blessed are those who have been persecuted for righteousness' sake, for theirs is the Kingdom of Heaven."
      },
      {
        number: 11,
        text: "Mapapalad kayo pagka kayo'y inaalimura, at kayo'y pinaguusig, at kayo'y pinagsasabihan ng sarisaring kasamaan na kasinungalingan, dahil sa akin.",
        versions: {
          adb: "Mapapalad kayo pagka kayo'y inaalimura, at kayo'y pinaguusig, at kayo'y pinagsasabihan ng sarisaring kasamaan na kasinungalingan, dahil sa akin.",
          mbb: "Pinagpala kayo kapag dahil sa akin ay inaalipusta kayo, inuusig, at pinaparatangan ng lahat ng uri ng kasamaan na pawang kasinungalingan.",
          snd: "Mapapalad kayo kapag nilalait kayo, inuusig, at sinasabihan ng sari-saring masasamang salita na may kasinungalingan dahil sa Akin."
        },
        englishText: "Blessed are you when people reproach you, persecute you, and say all kinds of evil against you falsely, for my sake."
      },
      {
        number: 12,
        text: "Kayo'y mangagalak, at mangagsayang totoo: sapagka't malaki ang ganti sa inyo sa langit: sapagka't gayon din ang kanilang pagkausig sa mga propeta na nanguna sa inyo.",
        versions: {
          adb: "Kayo'y mangagalak, at mangagsayang totoo: sapagka't malaki ang ganti sa inyo sa langit: sapagka't gayon din ang kanilang pagkausig sa mga propeta na nanguna sa inyo.",
          mbb: "Magalak kayo at magdiwang sapagkat malaki ang inyong gantimpala sa langit. Gayon din ang ginawa nilang pag-usig sa mga propetang nauna sa inyo.",
          snd: "Magalak kayo at labis na magsaya, sapagkat malaki ang inyong gantimpala sa langit; sapagkat gayon din nila inusig ang mga propetang nauna sa inyo."
        },
        englishText: "Rejoice, and be exceedingly glad, for great is your reward in heaven. For that is how they persecuted the prophets who were before you."
      },
      {
        number: 13,
        text: "Kayo ang asin ng lupa: nguni't kung ang asin ay tumabang, ano ang ipagpapaalat? Wala nang ano pa mang kabuluhan, kundi upang itapon sa labas at yurakan ng mga tao.",
        versions: {
          adb: "Kayo ang asin ng lupa: nguni't kung ang asin ay tumabang, ano ang ipagpapaalat? Wala nang ano pa mang kabuluhan, kundi upang itapon sa labas at yurakan ng mga tao.",
          mbb: "Kayo ang asin ng sanlibutan. Ngunit kung ang asin ay mawalan na ng alat, paano pa ito mapapaalat muli? Wala na itong kabuluhan kundi ang itapon at tapakan ng mga tao.",
          snd: "Kayo ang asin ng lupa; ngunit kung ang asin ay mawalan ng lasa, paano pa ito magiging maalat muli? Wala na itong silbi kundi itapon at tapak-tapakan ng mga tao."
        },
        englishText: "You are the salt of the earth, but if the salt has lost its flavor, with what will it be salted? It is then good for nothing, but to be cast out and trodden under the feet of men."
      },
      {
        number: 14,
        text: "Kayo ang ilaw ng sanglibutan. Ang isang bayan na natatayo sa ibabaw ng isang bundok ay hindi maitatago.",
        versions: {
          adb: "Kayo ang ilaw ng sanglibutan. Ang isang bayan na natatayo sa ibabaw ng isang bundok ay hindi maitatago.",
          mbb: "Kayo ang ilaw ng sanlibutan. Ang isang lunsod na nakatayo sa ibabaw ng burol ay hindi maitatago.",
          snd: "Kayo ang ilaw ng sanlibutan. Ang isang lunsod na nakatayo sa ibabaw ng burol ay hindi maitatago."
        },
        englishText: "You are the light of the world. A city located on a hill can't be hidden."
      },
      {
        number: 15,
        text: "Hindi rin sinisindihan ang isang ilawan, at inilalagay sa ilalim ng isang takalan, kundi sa talagang lalagyan; at lumiliwanag sa lahat ng nangasa bahay.",
        versions: {
          adb: "Hindi rin sinisindihan ang isang ilawan, at inilalagay sa ilalim ng isang takalan, kundi sa talagang lalagyan; at lumiliwanag sa lahat ng nangasa bahay.",
          mbb: "Walang nagsisindi ng ilaw at pagkatapos ay nagtatakip nito ng takalan. Sa halip, inilalagay ito sa patungan upang magbigay-liwanag sa lahat ng nasa bahay.",
          snd: "Wala ring nagsisindi ng ilawan at naglalagay nito sa ilalim ng basket, kundi sa lalagyan nito, upang magliwanag sa lahat ng nasa bahay."
        },
        englishText: "Neither do you light a lamp, and put it under a measuring basket, but on a stand; and it shines to all who are in the house."
      },
      {
        number: 16,
        text: "Lumiwanag na gayon ang inyong ilaw sa harap ng mga tao; upang mangakita nila ang inyong mabubuting gawa, at kanilang luwalhatiin ang inyong Ama na nasa langit.",
        versions: {
          adb: "Lumiwanag na gayon ang inyong ilaw sa harap ng mga tao; upang mangakita nila ang inyong mabubuting gawa, at kanilang luwalhatiin ang inyong Ama na nasa langit.",
          mbb: "Gayundin naman, dapat ninyong paliwanagin ang inyong ilaw sa harap ng mga tao upang makita nila ang inyong mabubuting gawa at papurihan ang inyong Ama na nasa langit.",
          snd: "Kaya't paliwanagin ninyo ang inyong ilaw sa harap ng mga tao upang makita nila ang inyong mabubuting gawa at luwalhatiin ang inyong Ama na nasa langit."
        },
        englishText: "Even so, let your light shine before men; that they may see your good works, and glorify your Father who is in heaven."
      }
    ]
  },
  {
    id: 'mateo-6',
    bookId: 'mateo',
    bookName: 'Mateo',
    chapterNumber: 6,
    title: 'Ang Panalangin ng Panginoon at Huwag Mabalisa',
    testament: 'Bagong Tipan',
    summary: 'Ang panalangin ng Ama Namin, ang kayamanan sa langit, at ang pagtitiwala sa pagkalinga ng Diyos.',
    verses: [
      {
        number: 9,
        text: "Manalangin nga kayo ng ganito: Ama namin na nasa langit ka, Sambahin nawa ang pangalan mo.",
        versions: {
          adb: "Manalangin nga kayo ng ganito: Ama namin na nasa langit ka, Sambahin nawa ang pangalan mo.",
          mbb: "Kaya ganito kayo dapat manalangin: 'Ama naming nasa langit, sambahin nawa ang iyong pangalan.'",
          snd: "Kaya't manalangin kayo nang ganito: 'Ama namin na nasa langit, sambahin ang Iyong banal na pangalan.'"
        },
        englishText: "Pray like this: 'Our Father in heaven, may your name be kept holy.'"
      },
      {
        number: 10,
        text: "Dumating nawa ang kaharian mo. Gawin nawa ang iyong kalooban, kung paano sa langit, gayon din naman sa lupa.",
        versions: {
          adb: "Dumating nawa ang kaharian mo. Gawin nawa ang iyong kalooban, kung paano sa langit, gayon din naman sa lupa.",
          mbb: "'Nawa'y maghari ka sa amin. Sundin nawa ang iyong kalooban dito sa lupa tulad ng sa langit.'",
          snd: "'Dumating nawa ang Iyong kaharian. Masunod nawa ang Iyong kalooban, kung paano sa langit gayundin naman sa lupa.'"
        },
        englishText: "Let your Kingdom come. Let your will be done on earth as it is in heaven."
      },
      {
        number: 11,
        text: "Ibigay mo sa amin ngayon ang aming kakanin sa araw-araw.",
        versions: {
          adb: "Ibigay mo sa amin ngayon ang aming kakanin sa araw-araw.",
          mbb: "'Bigyan mo kami ng aming kakainin sa araw-araw.'",
          snd: "'Ipagkaloob Mo sa amin ngayon ang aming kakanin sa araw-araw.'"
        },
        englishText: "Give us today our daily bread."
      },
      {
        number: 12,
        text: "At ipatawad mo sa amin ang aming mga utang, gaya naman namin na nagpapatawad sa mga may utang sa amin.",
        versions: {
          adb: "At ipatawad mo sa amin ang aming mga utang, gaya naman namin na nagpapatawad sa mga may utang sa amin.",
          mbb: "'At patawarin mo kami sa aming mga kasalanan, tulad ng pagpapatawad namin sa mga nagkakasala sa amin.'",
          snd: "'At patawarin Mo kami sa aming mga utang at kasalanan, kung paanong pinatatawad din namin ang mga nagkakautang sa amin.'"
        },
        englishText: "Forgive us our debts, as we also forgive our debtors."
      },
      {
        number: 13,
        text: "At huwag mo kaming ihatid sa tukso, kundi iligtas mo kami sa masama. Sapagka't iyo ang kaharian, at ang kapangyarihan, at ang kaluwalhatian, magpakailan man. Siya nawa.",
        versions: {
          adb: "At huwag mo kaming ihatid sa tukso, kundi iligtas mo kami sa masama. Sapagka't iyo ang kaharian, at ang kapangyarihan, at ang kaluwalhatian, magpakailan man. Siya nawa.",
          mbb: "'At huwag mo kaming hayaang sumuko sa tukso, kundi iligtas mo kami sa Masama! Sapagkat iyo ang kaharian, at ang kapangyarihan, at ang kaluwalhatian magpakailanman. Amen.'",
          snd: "'At huwag Mo kaming dalhin sa tukso, kundi iligtas Mo kami sa masama. Sapagkat Iyo ang kaharian, ang kapangyarihan, at ang kaluwalhatian magpakailanman. Amen.'"
        },
        englishText: "Bring us not into temptation, but deliver us from the evil one. For yours is the Kingdom, the power, and the glory forever. Amen."
      },
      {
        number: 33,
        text: "Datapuwa't hanapin muna ninyo ang kaniyang kaharian, at ang kaniyang katuwiran; at ang lahat ng mga bagay na ito ay pawang idaragdag sa inyo.",
        versions: {
          adb: "Datapuwa't hanapin muna ninyo ang kaniyang kaharian, at ang kaniyang katuwiran; at ang lahat ng mga bagay na ito ay pawang idaragdag sa inyo.",
          mbb: "Ngunit higit sa lahat ay bigyang-halaga ninyo ang kaharian ng Diyos at ang kanyang katuwiran, at ibibigay niya sa inyo ang lahat ng mga bagay na ito.",
          snd: "Ngunit unahin ninyong hanapin ang kaharian ng Diyos at ang Kanyang katuwiran, at ang lahat ng mga bagay na ito ay idaragdag sa inyo."
        },
        englishText: "But seek first God's Kingdom, and his righteousness; and all these things will be given to you as well."
      },
      {
        number: 34,
        text: "Kaya't huwag ninyong ikabalisa ang araw ng bukas: sapagka't ang araw ng bukas ay mababalisa sa kaniyang sarili. Sukat na sa kaarawan ang kaniyang kasamaan.",
        versions: {
          adb: "Kaya't huwag ninyong ikabalisa ang araw ng bukas: sapagka't ang araw ng bukas ay mababalisa sa kaniyang sarili. Sukat na sa kaarawan ang kaniyang kasamaan.",
          mbb: "Kaya nga, huwag ninyong ikabalisa ang araw ng bukas; dahil ang araw ng bukas ay may sariling alalahanin. Sapat na ang suliranin sa bawat araw.",
          snd: "Kaya't huwag ninyong alalahanin ang araw ng bukas, sapagkat ang bukas ay may sariling alalahanin. Sapat na sa bawat araw ang sarili nitong suliranin."
        },
        englishText: "Therefore don't be anxious for tomorrow, for tomorrow will be anxious for itself. Each day's own trouble is enough."
      }
    ]
  },
  {
    id: 'juan-1',
    bookId: 'juan',
    bookName: 'Juan',
    chapterNumber: 1,
    title: 'Ang Salita ay Naging Tao',
    testament: 'Bagong Tipan',
    summary: 'Nang pasimula ay ang Salita, at ang Salita ay sumasa Dios, at ang Salita ay Dios.',
    verses: [
      {
        number: 1,
        text: "Nang pasimula ay narito na ang Salita, at ang Salita ay kasama ng Dios, at ang Salita ay Dios.",
        versions: {
          adb: "Nang pasimula ay narito na ang Salita, at ang Salita ay kasama ng Dios, at ang Salita ay Dios.",
          mbb: "Nang pasimula ay naroroon na ang Salita; ang Salita ay kasama ng Diyos, at ang Salita ay Diyos.",
          snd: "Nang pasimula ay naroroon na ang Salita, at ang Salita ay kasama ng Diyos, at ang Salita ay Diyos."
        },
        englishText: "In the beginning was the Word, and the Word was with God, and the Word was God."
      },
      {
        number: 2,
        text: "Ito rin nang pasimula ay kasama ng Dios.",
        versions: {
          adb: "Ito rin nang pasimula ay kasama ng Dios.",
          mbb: "Sa pasimula pa'y kasama na siya ng Diyos.",
          snd: "Siya sa pasimula ay kasama ng Diyos."
        },
        englishText: "The same was in the beginning with God."
      },
      {
        number: 3,
        text: "Ang lahat ng mga bagay ay nilikha sa pamamagitan niya; at kung wala siya ay hindi nalikha ang anomang nalikha.",
        versions: {
          adb: "Ang lahat ng mga bagay ay nilikha sa pamamagitan niya; at kung wala siya ay hindi nalikha ang anomang nalikha.",
          mbb: "Nilikha ang lahat ng bagay sa pamamagitan niya, at walang anumang nalikha nang hindi sa pamamagitan niya.",
          snd: "Ang lahat ng bagay ay nilikha sa pamamagitan Niya, at kung wala Siya ay walang anumang nilikha na nalikha."
        },
        englishText: "All things were made through him. Without him was not anything made that has been made."
      },
      {
        number: 4,
        text: "Nasa kaniya ang buhay; at ang buhay ay siyang ilaw ng mga tao.",
        versions: {
          adb: "Nasa kaniya ang buhay; at ang buhay ay siyang ilaw ng mga tao.",
          mbb: "Nasa kanya ang buhay, at ang buhay ay siyang ilaw ng sangkatauhan.",
          snd: "Nasa Kanya ang buhay, at ang buhay ay siyang ilaw ng mga tao."
        },
        englishText: "In him was life, and the life was the light of men."
      },
      {
        number: 5,
        text: "At ang ilaw ay lumiliwanag sa kadiliman; at ito'y hindi naunawa ng kadiliman.",
        versions: {
          adb: "At ang ilaw ay lumiliwanag sa kadiliman; at ito'y hindi naunawa ng kadiliman.",
          mbb: "Nagliliwanag sa kadiliman ang ilaw, at hindi ito nagapi ng kadiliman.",
          snd: "Nagliliwanag ang ilaw sa kadiliman, at hindi ito nadaig ng kadiliman."
        },
        englishText: "The light shines in the darkness, and the darkness hasn't overcome it."
      },
      {
        number: 12,
        text: "Datapuwa't ang lahat ng sa kaniya'y nagsitanggap, ay pinagkalooban niya sila ng karapatang maging mga anak ng Dios, sa makatuwid baga'y ang mga nagsisisampalataya sa kaniyang pangalan:",
        versions: {
          adb: "Datapuwa't ang lahat ng sa kaniya'y nagsitanggap, ay pinagkalooban niya sila ng karapatang maging mga anak ng Dios, sa makatuwid baga'y ang mga nagsisisampalataya sa kaniyang pangalan:",
          mbb: "Subalit ang lahat ng tumanggap at sumampalataya sa kanya ay binigyan niya ng karapatang maging mga anak ng Diyos.",
          snd: "Ngunit ang lahat ng tumanggap sa Kanya at sumampalataya sa Kanyang pangalan ay binigyan Niya ng karapatang maging mga anak ng Diyos."
        },
        englishText: "But as many as received him, to them he gave the right to become God's children, to those who believe in his name:"
      },
      {
        number: 14,
        text: "At nagkatawang-tao ang Salita, at tumahan sa gitna natin (at nakita namin ang kaniyang kaluwalhatian, kaluwalhatian gaya ng sa bugtong ng Ama), na puspos ng biyaya at katotohanan.",
        versions: {
          adb: "At nagkatawang-tao ang Salita, at tumahan sa gitna natin (at nakita namin ang kaniyang kaluwalhatian, kaluwalhatian gaya ng sa bugtong ng Ama), na puspos ng biyaya at katotohanan.",
          mbb: "Naging tao ang Salita at nanirahan sa piling natin. Nakita namin ang kanyang kaluwalhatian, kaluwalhatiang puno ng biyaya at katotohanan na tinanggap niya mula sa Ama bilang kanyang kaisa-isang Anak.",
          snd: "At ang Salita ay nagkatawang-tao at nanahan sa gitna natin. Nakita namin ang Kanyang kaluwalhatian, kaluwalhatian na gaya ng sa bugtong na Anak ng Ama, na puspos ng biyaya at katotohanan."
        },
        englishText: "The Word became flesh, and lived among us. We saw his glory, such glory as of the one and only Son of the Father, full of grace and truth."
      }
    ]
  },
  {
    id: 'juan-3',
    bookId: 'juan',
    bookName: 'Juan',
    chapterNumber: 3,
    title: 'Si Jesus at si Nicodemo',
    testament: 'Bagong Tipan',
    summary: 'Ang bagong kapanganakan at ang dakilang pag-ibig ng Diyos sa sanlibutan.',
    verses: [
      {
        number: 16,
        text: "Sapagka't gayon na lamang ang pagsinta ng Dios sa sanglibutan, na ibinigay niya ang kaniyang bugtong na Anak, upang ang sinomang sa kaniya'y sumampalataya ay huwag mapahamak, kundi magkaroon ng buhay na walang hanggan.",
        versions: {
          adb: "Sapagka't gayon na lamang ang pagsinta ng Dios sa sanglibutan, na ibinigay niya ang kaniyang bugtong na Anak, upang ang sinomang sa kaniya'y sumampalataya ay huwag mapahamak, kundi magkaroon ng buhay na walang hanggan.",
          mbb: "Sapagkat gayon na lamang ang pag-ibig ng Diyos sa sangkatauhan, kaya't ibinigay niya ang kanyang kaisa-isang Anak, upang ang sinumang sumampalataya sa kanya ay hindi mapahamak, kundi magkaroon ng buhay na walang hanggan.",
          snd: "Sapagkat labis na inibig ng Diyos ang sanlibutan kaya ibinigay Niya ang Kanyang bugtong na Anak, upang ang sinumang sumampalataya sa Kanya ay hindi mapahamak kundi magkaroon ng buhay na walang hanggan."
        },
        englishText: "For God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life."
      },
      {
        number: 17,
        text: "Sapagka't hindi sinugo ng Dios ang Anak sa sanglibutan upang hatulan ang sanglibutan; kundi upang ang sanglibutan ay maligtas sa pamamagitan niya.",
        versions: {
          adb: "Sapagka't hindi sinugo ng Dios ang Anak sa sanglibutan upang hatulan ang sanglibutan; kundi upang ang sanglibutan ay maligtas sa pamamagitan niya.",
          mbb: "Sapagkat hindi sinugo ng Diyos ang kanyang Anak upang hatulan ang sanlibutan, kundi upang iligtas ito sa pamamagitan niya.",
          snd: "Sapagkat hindi isinugo ng Diyos ang Kanyang Anak sa sanlibutan upang hatulan ang sanlibutan, kundi upang ang sanlibutan ay maligtas sa pamamagitan Niya."
        },
        englishText: "For God didn't send his Son into the world to judge the world, but that the world should be saved through him."
      },
      {
        number: 18,
        text: "Ang sumasampalataya sa kaniya ay hindi hinahatulan: ang hindi sumasampalataya ay hinatulan na, sapagka't hindi siya sumampalataya sa pangalan ng bugtong na Anak ng Dios.",
        versions: {
          adb: "Ang sumasampalataya sa kaniya ay hindi hinahatulan: ang hindi sumasampalataya ay hinatulan na, sapagka't hindi siya sumampalataya sa pangalan ng bugtong na Anak ng Dios.",
          mbb: "Ang sumasampalataya sa kanya ay hindi hahatulan; ngunit ang hindi sumasampalataya ay hinatulan na, dahil hindi siya sumampalataya sa kaisa-isang Anak ng Diyos.",
          snd: "Ang sumasampalataya sa Kanya ay hindi hinahatulan; ngunit ang hindi sumasampalataya ay hinatulan na, sapagkat hindi siya sumampalataya sa pangalan ng bugtong na Anak ng Diyos."
        },
        englishText: "He who believes in him is not judged. He who doesn't believe has been judged already, because he has not believed in the name of the one and only Son of God."
      }
    ]
  },
  {
    id: 'juan-14',
    bookId: 'juan',
    bookName: 'Juan',
    chapterNumber: 14,
    title: 'Ang Daan, ang Katotohanan, at ang Buhay',
    testament: 'Bagong Tipan',
    summary: 'Ang kapayapaan na iniwan ni Jesus at ang pangako ng Banal na Espiritu.',
    verses: [
      {
        number: 1,
        text: "Huwag magulumihanan ang inyong puso: magsisampalataya kayo sa Dios, magsisampalataya naman kayo sa akin.",
        versions: {
          adb: "Huwag magulumihanan ang inyong puso: magsisampalataya kayo sa Dios, magsisampalataya naman kayo sa akin.",
          mbb: "Huwag mabagabag ang inyong puso. Magtiwala kayo sa Diyos, magtiwala rin kayo sa akin.",
          snd: "Huwag mabagabag ang inyong mga puso. Sumampalataya kayo sa Diyos, sumampalataya rin kayo sa Akin."
        },
        englishText: "Don't let your heart be troubled. Believe in God. Believe also in me."
      },
      {
        number: 2,
        text: "Sa bahay ng aking Ama ay may maraming tahanan; kung di gayon, ay sinabi ko sana sa inyo; sapagka't ako'y paroroon upang ipaghanda ko kayo ng dakong kalalagyan.",
        versions: {
          adb: "Sa bahay ng aking Ama ay may maraming tahanan; kung di gayon, ay sinabi ko sana sa inyo; sapagka't ako'y paroroon upang ipaghanda ko kayo ng dakong kalalagyan.",
          mbb: "Sa bahay ng aking Ama ay maraming silid. Kung hindi gayon, sasabihin ko ba sa inyong pupunta ako roon upang ipaghanda kayo ng matitirhan?",
          snd: "Sa tahanan ng Aking Ama ay maraming silid; kung hindi gayon ay sinabi Ko na sana sa inyo. Pupunta Ako roon upang maghanda ng matutuluyan para sa inyo."
        },
        englishText: "In my Father's house are many homes. If it weren't so, I would have told you. I am going to prepare a place for you."
      },
      {
        number: 6,
        text: "Sinabi sa kaniya ni Jesus, Ako ang daan, at ang katotohanan, at ang buhay: sinoman ay di makaparoroon sa Ama, kundi sa pamamagitan ko.",
        versions: {
          adb: "Sinabi sa kaniya ni Jesus, Ako ang daan, at ang katotohanan, at ang buhay: sinoman ay di makaparoroon sa Ama, kundi sa pamamagitan ko.",
          mbb: "Sumagot si Jesus, 'Ako ang daan, ang katotohanan, at ang buhay. Walang makakarating sa Ama kundi sa pamamagitan ko.'",
          snd: "Sumagot si Jesus sa kanya, 'Ako ang daan, ang katotohanan, at ang buhay. Walang makapupunta sa Ama kundi sa pamamagitan Ko.'"
        },
        englishText: "Jesus said to him, 'I am the way, the truth, and the life. No one comes to the Father, except through me.'"
      },
      {
        number: 27,
        text: "Ang kapayapaan ay iniiwan ko sa inyo; ang aking kapayapaan ay ibinibigay ko sa inyo: hindi gaya ng ibinibigay ng sanglibutan, ang ibinibigay ko sa inyo. Huwag magulumihanan ang inyong puso, ni matakot man.",
        versions: {
          adb: "Ang kapayapaan ay iniiwan ko sa inyo; ang aking kapayapaan ay ibinibigay ko sa inyo: hindi gaya ng ibinibigay ng sanglibutan, ang ibinibigay ko sa inyo. Huwag magulumihanan ang inyong puso, ni matakot man.",
          mbb: "Kapayapaan ang iniiwan ko sa inyo; ang aking kapayapaan ang ibinibigay ko sa inyo. Hindi ito tulad ng ibinibigay ng sanlibutan. Huwag mabagabag ang inyong puso at huwag matakot.",
          snd: "Iniiwan Ko sa inyo ang kapayapaan; ang Aking kapayapaan ay ibinibigay Ko sa inyo. Hindi tulad ng ibinibigay ng sanlibutan ang ibinibigay Ko sa inyo. Huwag mabagabag ang inyong puso, at huwag matakot."
        },
        englishText: "Peace I leave with you. My peace I give to you; not as the world gives, give I to you. Don't let your heart be troubled, neither let it be afraid."
      }
    ]
  },
  {
    id: 'genesis-1',
    bookId: 'genesis',
    bookName: 'Genesis',
    chapterNumber: 1,
    title: 'Ang Paglikha sa Sanglibutan',
    testament: 'Lumang Tipan',
    summary: 'Nang pasimula ay nilikha ng Dios ang langit at ang lupa.',
    verses: [
      {
        number: 1,
        text: "Nang pasimula ay nilikha ng Dios ang langit at ang lupa.",
        versions: {
          adb: "Nang pasimula ay nilikha ng Dios ang langit at ang lupa.",
          mbb: "Nang pasimula ay nilikha ng Diyos ang langit at ang lupa.",
          snd: "Nang pasimula, nilikha ng Diyos ang kalangitan at ang lupa."
        },
        englishText: "In the beginning, God created the heavens and the earth."
      },
      {
        number: 2,
        text: "At ang lupa ay walang anyo at walang laman; at ang kadiliman ay sumasa ibabaw ng kalaliman; at ang Espiritu ng Dios ay sumasa ibabaw ng tubig.",
        versions: {
          adb: "At ang lupa ay walang anyo at walang laman; at ang kadiliman ay sumasa ibabaw ng kalaliman; at ang Espiritu ng Dios ay sumasa ibabaw ng tubig.",
          mbb: "Ang lupa ay walang hugis at walang laman. Kadiliman ang bumabalot sa kailaliman at ang Espiritu ng Diyos ay kumikilos sa ibabaw ng tubig.",
          snd: "Ang lupa ay walang hugis at walang laman; ang kadiliman ay nasa ibabaw ng kalaliman, at ang Espiritu ng Diyos ay umiihip sa ibabaw ng tubig."
        },
        englishText: "The earth was formless and empty. Darkness was on the surface of the deep and God's Spirit was hovering over the surface of the waters."
      },
      {
        number: 3,
        text: "At sinabi ng Dios, Magkaroon ng liwanag; at nagkaroon ng liwanag.",
        versions: {
          adb: "At sinabi ng Dios, Magkaroon ng liwanag; at nagkaroon ng liwanag.",
          mbb: "Sinabi ng Diyos, 'Magkaroon ng liwanag!' At nagkaroon nga ng liwanag.",
          snd: "Sinabi ng Diyos, 'Magkaroon ng liwanag,' at nagkaroon ng liwanag."
        },
        englishText: "God said, 'Let there be light,' and there was light."
      },
      {
        number: 4,
        text: "At nakita ng Dios ang liwanag na mabuti: at inihiwalay ng Dios ang liwanag sa kadiliman.",
        versions: {
          adb: "At nakita ng Dios ang liwanag na mabuti: at inihiwalay ng Dios ang liwanag sa kadiliman.",
          mbb: "Nasiyahan ang Diyos nang makita niyang mabuti ang liwanag. Pagkatapos, inihiwalay niya ang liwanag sa kadiliman.",
          snd: "Nakita ng Diyos na mabuti ang liwanag; at inihiwalay ng Diyos ang liwanag mula sa kadiliman."
        },
        englishText: "God saw the light, and saw that it was good. God divided the light from the darkness."
      },
      {
        number: 5,
        text: "At tinawag ng Dios ang liwanag na Araw, at ang kadiliman ay tinawag niyang Gabi. At nagkahapon at nagkaumaga ang unang araw.",
        versions: {
          adb: "At tinawag ng Dios ang liwanag na Araw, at ang kadiliman ay tinawag niyang Gabi. At nagkahapon at nagkaumaga ang unang araw.",
          mbb: "Tinawag niyang 'Araw' ang liwanag at 'Gabi' naman ang kadiliman. Lumipas ang gabi at sumapit ang umaga—iyon ang unang araw.",
          snd: "Tinawag ng Diyos ang liwanag na 'Araw' at ang kadiliman ay tinawag Niyang 'Gabi.' Nagkaroon ng gabi at nagkaroon ng umaga, ang unang araw."
        },
        englishText: "God called the light 'day', and the darkness he called 'night'. There was evening and there was morning, one day."
      },
      {
        number: 27,
        text: "At nilalang ng Dios ang tao ayon sa kaniyang sariling larawan, ayon sa larawan ng Dios siya nilalang; nilalang niya sila na lalake at babae.",
        versions: {
          adb: "At nilalang ng Dios ang tao ayon sa kaniyang sariling larawan, ayon sa larawan ng Dios siya nilalang; nilalang niya sila na lalake at babae.",
          mbb: "Kaya't nilalang ng Diyos ang tao ayon sa kanyang larawan. Nilalang niya sila ayon sa larawan ng Diyos; nilalang niya silang lalaki at babae.",
          snd: "Kaya nilalang ng Diyos ang tao ayon sa Kanyang sariling larawan, ayon sa larawan ng Diyos nilalang Niya siya; nilalang Niya sila na lalaki at babae."
        },
        englishText: "God created man in his own image. In God's image he created him; male and female he created them."
      },
      {
        number: 31,
        text: "At nakita ng Dios ang lahat ng kaniyang nilikha, at, narito, napakabuti. At nagkahapon at nagkaumaga ang ikaanim na araw.",
        versions: {
          adb: "At nakita ng Dios ang lahat ng kaniyang nilikha, at, narito, napakabuti. At nagkahapon at nagkaumaga ang ikaanim na araw.",
          mbb: "Tiningnan ng Diyos ang lahat ng kanyang nilikha, at nakitang ito ay napakabuti. Lumipas ang gabi at sumapit ang umaga—iyon ang ikaanim na araw.",
          snd: "Nakita ng Diyos ang lahat ng Kanyang nilikha, at narito, ito ay napakabuti. Nagkaroon ng gabi at nagkaroon ng umaga, ang ikaanim na araw."
        },
        englishText: "God saw everything that he had made, and, behold, it was very good. There was evening and there was morning, a sixth day."
      }
    ]
  },
  {
    id: 'salmo-23',
    bookId: 'salmo',
    bookName: 'Mga Awit (Salmo)',
    chapterNumber: 23,
    title: 'Ang Panginoon ang Aking Pastol',
    testament: 'Lumang Tipan',
    summary: 'Ang Salmo ni David tungkol sa lubos na pag-iingat, gabay, at pagpapala ng Panginoon.',
    verses: [
      {
        number: 1,
        text: "Ang Panginoon ay aking pastol; hindi ako magkukulang.",
        versions: {
          adb: "Ang Panginoon ay aking pastol; hindi ako magkukulang.",
          mbb: "Si Yahweh ang aking pastol, hindi ako magkukulang.",
          snd: "Ang Panginoon ang aking pastol; wala akong kukulangin."
        },
        englishText: "The Lord is my shepherd; I shall not want."
      },
      {
        number: 2,
        text: "Pinahihiga niya ako sa mga sariwang pastulan: inaakay niya ako sa tabi ng mga tubig na pahingahan.",
        versions: {
          adb: "Pinahihiga niya ako sa mga sariwang pastulan: inaakay niya ako sa tabi ng mga tubig na pahingahan.",
          mbb: "Pinahihimlay niya ako sa luntiang pastulan, at inaakay sa tabi ng payapang batisan.",
          snd: "Pinahihiga Niya ako sa sariwang pastulan; inaakay Niya ako sa tabi ng tahimik na tubig."
        },
        englishText: "He makes me lie down in green pastures. He leads me beside still waters."
      },
      {
        number: 3,
        text: "Kaniyang pinapanunumbalik ang aking kaluluwa: inaakay niya ako sa mga landas ng katuwiran alang-alang sa kaniyang pangalan.",
        versions: {
          adb: "Kaniyang pinapanunumbalik ang aking kaluluwa: inaakay niya ako sa mga landas ng katuwiran alang-alang sa kaniyang pangalan.",
          mbb: "Pinapanumbalik niya ang aking kalakasan, at inaakay sa tamang landas alang-alang sa kanyang banal na pangalan.",
          snd: "Pinapanumbalik Niya ang aking kaluluwa; ginagabayan Niya ako sa mga landas ng katuwiran alang-alang sa Kanyang pangalan."
        },
        englishText: "He restores my soul. He guides me in the paths of righteousness for his name's sake."
      },
      {
        number: 4,
        text: "Oo, bagaman ako'y lumalakad sa libis ng lilim ng kamatayan, wala akong katatakutang kasamaan; sapagka't ikaw ay kasama ko: ang iyong pamalo at ang iyong tungkod, ang mga ito'y umaaliw sa akin.",
        versions: {
          adb: "Oo, bagaman ako'y lumalakad sa libis ng lilim ng kamatayan, wala akong katatakutang kasamaan; sapagka't ikaw ay kasama ko: ang iyong pamalo at ang iyong tungkod, ang mga ito'y umaaliw sa akin.",
          mbb: "Kahit lumakad ako sa pinakamadilim na lambak ng kamatayan, hindi ako matatakot sapagkat kasama kita. Ang iyong pamalo at tungkod ang nagbibigay-lakas sa akin.",
          snd: "Kahit lumakad man ako sa lambak ng lilim ng kamatayan, wala akong katatakutang kasamaan, sapagkat Ikaw ay kasama ko; ang Iyong pamalo at tungkod ay umaaliw sa akin."
        },
        englishText: "Even though I walk through the valley of the shadow of death, I will fear no evil, for you are with me. Your rod and your staff, they comfort me."
      },
      {
        number: 5,
        text: "Ipinaghahanda mo ako ng dulang sa harap ko sa harapan ng aking mga kaaway: iyong pinahiran ang aking ulo ng langis; ang aking saro ay umaapaw.",
        versions: {
          adb: "Ipinaghahanda mo ako ng dulang sa harap ko sa harapan ng aking mga kaaway: iyong pinahiran ang aking ulo ng langis; ang aking saro ay umaapaw.",
          mbb: "Ipinaghahanda mo ako ng masaganang salu-salo sa harap ng aking mga kaaway; pinapahiran mo ng langis ang aking ulo, at pinapapawis ang aking tasa sa kasaganaan.",
          snd: "Ipinaghahanda Mo ako ng hapag-kainan sa harap ng aking mga kaaway; pinahiran Mo ng langis ang aking ulo; ang aking kopa ay umaapaw."
        },
        englishText: "You prepare a table before me in the presence of my enemies. You anoint my head with oil. My cup runs over."
      },
      {
        number: 6,
        text: "Tunay na ang kabutihan at kaawaan ay susunod sa akin sa lahat ng mga araw ng aking buhay: at ako'y tatahan sa bahay ng Panginoon magpakailan man.",
        versions: {
          adb: "Tunay na ang kabutihan at kaawaan ay susunod sa akin sa lahat ng mga araw ng aking buhay: at ako'y tatahan sa bahay ng Panginoon magpakailan man.",
          mbb: "Tiyak na ang kabutihan at tapat na pag-ibig ay sasama sa akin sa lahat ng araw ng aking buhay, at ako'y mananahan sa tahanan ni Yahweh magpakailanman.",
          snd: "Tunay na ang kabutihan at kagandahang-loob ay susunod sa akin sa lahat ng mga araw ng aking buhay, at ako ay mananahan sa bahay ng Panginoon magpakailanman."
        },
        englishText: "Surely goodness and loving kindness shall follow me all the days of my life, and I will dwell in the house of the Lord forever."
      }
    ]
  },
  {
    id: 'salmo-91',
    bookId: 'salmo',
    bookName: 'Mga Awit (Salmo)',
    chapterNumber: 91,
    title: 'Ang Pagsukob sa Lilim ng Makapangyarihan',
    testament: 'Lumang Tipan',
    summary: 'Ang dakilang proteksyon at kaligtasan para sa mga nananahan sa kalinga ng Kataas-taasan.',
    verses: [
      {
        number: 1,
        text: "Siyang tumatahan sa lihim na dako ng Kataastaasan ay mananatili sa ilalim ng lilim ng Makapangyarihan sa lahat.",
        versions: {
          adb: "Siyang tumatahan sa lihim na dako ng Kataastaasan ay mananatili sa ilalim ng lilim ng Makapangyarihan sa lahat.",
          mbb: "Siyang nananahan sa kalinga ng Kataas-taasan ay mananatili sa lilim ng Makapangyarihan sa lahat.",
          snd: "Siyang naninirahan sa kublihan ng Kataas-taasan ay mamamahinga sa ilalim ng lilim ng Makapangyarihan sa lahat."
        },
        englishText: "He who dwells in the secret place of the Most High will rest in the shadow of the Almighty."
      },
      {
        number: 2,
        text: "Aking sasabihin tungkol sa Panginoon, Siya'y aking kanlungan at aking kuta; ang aking Dios, na siyang aking pinagtitiwalaan.",
        versions: {
          adb: "Aking sasabihin tungkol sa Panginoon, Siya'y aking kanlungan at aking kuta; ang aking Dios, na siyang aking pinagtitiwalaan.",
          mbb: "Masasabi niya kay Yahweh: 'Ikaw ang aking kanlungan at kuta, ang aking Diyos na pinagtitiwalaan.'",
          snd: "Aking sasabihin sa Panginoon, 'Siya ang aking kanlungan at aking kuta; ang aking Diyos na Aking pinagkakatiwalaan.'"
        },
        englishText: "I will say of the Lord, 'He is my refuge and my fortress; my God, in whom I trust.'"
      },
      {
        number: 3,
        text: "Sapagka't kaniyang ililigtas ka sa silo ng manghuhuli ng ibon, at sa nakamamatay na salot.",
        versions: {
          adb: "Sapagka't kaniyang ililigtas ka sa silo ng manghuhuli ng ibon, at sa nakamamatay na salot.",
          mbb: "Tiyak na ililigtas ka niya sa bitag ng mangangaso, at sa nakamamatay na salot.",
          snd: "Sapagkat ililigtas ka Niya sa bitag ng manghuhuli ng ibon at sa mapaminsalang salot."
        },
        englishText: "For he will deliver you from the snare of the fowler, and from the deadly pestilence."
      },
      {
        number: 4,
        text: "Kaniyang tatakpan ka ng kaniyang mga bagwis, at sa ilalim ng kaniyang mga pakpak ay manganganlong ka: ang kaniyang katotohanan ay pananggalang at kalasag.",
        versions: {
          adb: "Kaniyang tatakpan ka ng kaniyang mga bagwis, at sa ilalim ng kaniyang mga pakpak ay manganganlong ka: ang kaniyang katotohanan ay pananggalang at kalasag.",
          mbb: "Tatakpan ka niya ng kanyang mga pakpak, at sa ilalim ng mga ito ay ligtas ka; ang kanyang katapatan ang iyong kalasag at sanggalang.",
          snd: "Kukublihan ka Niya ng Kanyang mga pakpak, at sa ilalim ng Kanyang mga pakpak ay makasusumpong ka ng kanlungan; ang Kanyang katapatan ay magiging kalasag at pananggalang."
        },
        englishText: "He will cover you with his feathers. Under his wings you will take refuge. His faithfulness is your shield and rampart."
      },
      {
        number: 11,
        text: "Sapagka't kaniyang bibigyan ang kaniyang mga anghel ng tagubilin tungkol sa iyo, upang ingatan ka sa lahat ng iyong mga lakad.",
        versions: {
          adb: "Sapagka't kaniyang bibigyan ang kaniyang mga anghel ng tagubilin tungkol sa iyo, upang ingatan ka sa lahat ng iyong mga lakad.",
          mbb: "Sapagkat uutusan niya ang kanyang mga anghel upang bantayan ka sa lahat ng iyong lalakaran.",
          snd: "Sapagkat iuutos Niya sa Kanyang mga anghel tungkol sa iyo, na ingatan ka sa lahat ng iyong mga lakad."
        },
        englishText: "For he will put his angels in charge of you, to guard you in all your ways."
      },
      {
        number: 12,
        text: "Sila'y magdadala sa iyo sa kanilang mga kamay, baka maipanganyaya ang iyong paa sa isang bato.",
        versions: {
          adb: "Sila'y magdadala sa iyo sa kanilang mga kamay, baka maipanganyaya ang iyong paa sa isang bato.",
          mbb: "Bubuhatin ka nila sa kanilang mga kamay upang hindi maipit o matisod ang iyong paa sa bato.",
          snd: "Bubuhatin ka nila sa kanilang mga kamay upang hindi mauntog ang iyong paa sa bato."
        },
        englishText: "They will bear you up in their hands, so that you won't dash your foot against a stone."
      }
    ]
  },
  {
    id: 'salmo-121',
    bookId: 'salmo',
    bookName: 'Mga Awit (Salmo)',
    chapterNumber: 121,
    title: 'Ang Tulong ay Mula sa Panginoon',
    testament: 'Lumang Tipan',
    summary: 'Aawitin sa pag-akyat: Ang Panginoon ang tagapag-ingat sa iyo.',
    verses: [
      {
        number: 1,
        text: "Aking ititingin ang aking mga mata sa mga bundok: saan manggagaling ang aking saklolo?",
        versions: {
          adb: "Aking ititingin ang aking mga mata sa mga bundok: saan manggagaling ang aking saklolo?",
          mbb: "Titingin ako sa mga burol; saan kaya magmumula ang aking tulong?",
          snd: "Itinataas ko ang aking mga mata sa kaburulan; saan magmumula ang aking saklolo?"
        },
        englishText: "I will lift up my eyes to the hills. Where does my help come from?"
      },
      {
        number: 2,
        text: "Ang saklolo sa akin ay nagmumula sa Panginoon, na gumawa ng langit at lupa.",
        versions: {
          adb: "Ang saklolo sa akin ay nagmumula sa Panginoon, na gumawa ng langit at lupa.",
          mbb: "Ang tulong sa akin ay magmumula kay Yahweh, ang lumikha ng langit at ng lupa.",
          snd: "Ang tulong sa akin ay nagmumula sa Panginoon, na lumikha ng langit at ng lupa."
        },
        englishText: "My help comes from the Lord, who made heaven and earth."
      },
      {
        number: 3,
        text: "Hindi niya itutulot na ang iyong paa ay makilos: siyang nagiingat sa iyo ay hindi mahihiidlip.",
        versions: {
          adb: "Hindi niya itutulot na ang iyong paa ay makilos: siyang nagiingat sa iyo ay hindi mahihiidlip.",
          mbb: "Hindi niya hahayaang madulas ang iyong paa; ang nag-iingat sa iyo ay hindi matutulog kailanman.",
          snd: "Hindi Niya pahihintulutang madulas ang iyong mga paa; Siya na nag-iingat sa iyo ay hindi aantukin."
        },
        englishText: "He will not allow your foot to be moved. He who keeps you will not slumber."
      },
      {
        number: 7,
        text: "Iingatan ka ng Panginoon sa lahat ng kasamaan; kaniyang iingatan ang iyong kaluluwa.",
        versions: {
          adb: "Iingatan ka ng Panginoon sa lahat ng kasamaan; kaniyang iingatan ang iyong kaluluwa.",
          mbb: "Iingatan ka ni Yahweh sa lahat ng kapahamakan; iingatan niya ang iyong buhay.",
          snd: "Iingatan ka ng Panginoon sa lahat ng kasamaan; Kanyang iingatan ang iyong buhay."
        },
        englishText: "The Lord will keep you from all evil. He will keep your soul."
      },
      {
        number: 8,
        text: "Iingatan ng Panginoon ang iyong paglabas at ang iyong pagpasok, mula sa panahong ito at magpakailan man.",
        versions: {
          adb: "Iingatan ng Panginoon ang iyong paglabas at ang iyong pagpasok, mula sa panahong ito at magpakailan man.",
          mbb: "Iingatan ka ni Yahweh sa iyong pag-alis at pagdating, ngayon at magpakailanman.",
          snd: "Iingatan ng Panginoon ang iyong paglabas at pagpasok, mula ngayon at magpakailanman."
        },
        englishText: "The Lord will keep your going out and your coming in, from this time forth, and forevermore."
      }
    ]
  },
  {
    id: 'kawikaan-3',
    bookId: 'kawikaan',
    bookName: 'Mga Kawikaan',
    chapterNumber: 3,
    title: 'Magtiwala sa Panginoon nang Buong Puso',
    testament: 'Lumang Tipan',
    summary: 'Ang payo ng karunungan tungkol sa pagtitiwala sa Panginoon at hindi sa sariling kaunawaan.',
    verses: [
      {
        number: 5,
        text: "Tumiwala ka sa Panginoon ng buong puso mo, at huwag kang manalig sa iyong sariling kaunawaan:",
        versions: {
          adb: "Tumiwala ka sa Panginoon ng buong puso mo, at huwag kang manalig sa iyong sariling kaunawaan:",
          mbb: "Sa Panginoon ka magtiwala nang buong puso mo, at huwag kang manalig sa sarili mong karunungan.",
          snd: "Magtiwala ka sa Panginoon nang buong puso mo, at huwag kang umasa sa iyong sariling pang-unawa."
        },
        englishText: "Trust in the Lord with all your heart, and don't lean on your own understanding."
      },
      {
        number: 6,
        text: "Kilalanin mo siya sa lahat ng iyong mga lakad, at kaniyang ituturo ang iyong mga landas.",
        versions: {
          adb: "Kilalanin mo siya sa lahat ng iyong mga lakad, at kaniyang ituturo ang iyong mga landas.",
          mbb: "Sa lahat ng iyong mga lakad ay alalahanin mo Siya, at itutuwid Niya ang iyong mga landas.",
          snd: "Kilalanin mo Siya sa lahat ng iyong mga lakad, at gagawin Niyang matuwid ang iyong mga landas."
        },
        englishText: "In all your ways acknowledge him, and he will make your paths straight."
      },
      {
        number: 7,
        text: "Huwag kang magpakapantas sa iyong sariling mga mata; matakot ka sa Panginoon, at lumayo ka sa kasamaan:",
        versions: {
          adb: "Huwag kang magpakapantas sa iyong sariling mga mata; matakot ka sa Panginoon, at lumayo ka sa kasamaan:",
          mbb: "Huwag mong ituring ang sarili mong marunong; igalang mo ang Panginoon at lumayo ka sa kasamaan.",
          snd: "Huwag kang maging marunong sa iyong sariling paningin; matakot ka sa Panginoon at lumayo sa masama."
        },
        englishText: "Don't be wise in your own eyes. Fear the Lord, and depart from evil."
      }
    ]
  },
  {
    id: 'roma-8',
    bookId: 'roma',
    bookName: 'Mga Taga-Roma',
    chapterNumber: 8,
    title: 'Buhay sa Espiritu at Walang Makapaghihiwalay sa Pag-ibig ng Dios',
    testament: 'Bagong Tipan',
    summary: 'Walang hatol sa mga na kay Cristo Jesus, at higit pa tayo sa mga mapagtagumpay.',
    verses: [
      {
        number: 1,
        text: "Ngayon nga'y wala nang anomang hatol sa mga na kay Cristo Jesus.",
        versions: {
          adb: "Ngayon nga'y wala nang anomang hatol sa mga na kay Cristo Jesus.",
          mbb: "Kaya ngayon, wala nang kaparusahan para sa mga nakipag-isa na kay Cristo Jesus.",
          snd: "Kaya ngayon, wala nang hatol sa mga na kay Cristo Jesus na lumalakad ayon sa Espiritu."
        },
        englishText: "There is therefore now no condemnation to those who are in Christ Jesus."
      },
      {
        number: 28,
        text: "At nalalaman natin na ang lahat ng mga bagay ay nagkakalakip na gumagawa sa ikabubuti ng mga nagsisiibig sa Dios, sa makatuwid baga'y niyaong mga tinawag alinsunod sa kaniyang nasa.",
        versions: {
          adb: "At nalalaman natin na ang lahat ng mga bagay ay nagkakalakip na gumagawa sa ikabubuti ng mga nagsisiibig sa Dios, sa makatuwid baga'y niyaong mga tinawag alinsunod sa kaniyang nasa.",
          mbb: "Alam nating sa lahat ng bagay ay gumagawa ang Diyos para sa ikabubuti ng mga nagmamahal sa kanya, silang mga tinawag ayon sa kanyang layunin.",
          snd: "Nalalaman natin na sa lahat ng bagay ang Diyos ay gumagawang kasama ng mga umiibig sa Kanya para sa ikabubuti nila, sa kanila na mga tinawag ayon sa Kanyang layunin."
        },
        englishText: "We know that all things work together for good for those who love God, to those who are called according to his purpose."
      },
      {
        number: 31,
        text: "Ano nga ang ating sasabihin sa mga bagay na ito? Kung ang Dios ay kakampi natin, sino ang laban sa atin?",
        versions: {
          adb: "Ano nga ang ating sasabihin sa mga bagay na ito? Kung ang Dios ay kakampi natin, sino ang laban sa atin?",
          mbb: "Ano pa ang masasabi natin tungkol dito? Kung ang Diyos ay panig sa atin, sino ang makakalaban sa atin?",
          snd: "Ano nga ang masasabi natin sa mga bagay na ito? Kung ang Diyos ay kakampi natin, sino ang makakalaban sa atin?"
        },
        englishText: "What then shall we say about these things? If God is for us, who can be against us?"
      },
      {
        number: 37,
        text: "Hindi, kundi sa lahat ng mga bagay na ito tayo'y higit pa sa mga mapagtagumpay sa pamamagitan niyaong sa atin ay umibig.",
        versions: {
          adb: "Hindi, kundi sa lahat ng mga bagay na ito tayo'y higit pa sa mga mapagtagumpay sa pamamagitan niyaong sa atin ay umibig.",
          mbb: "Hindi! Sa lahat ng mga ito, tayo'y higit pang magtatagumpay sa pamamagitan niya na nagmahal sa atin.",
          snd: "Hindi! Sa lahat ng mga bagay na ito, tayo ay higit pa sa mga nagtatagumpay sa pamamagitan Niya na umibig sa atin."
        },
        englishText: "No, in all these things, we are more than conquerors through him who loved us."
      },
      {
        number: 38,
        text: "Sapagka't ako'y naniniwalang lubos, na kahit ang kamatayan man, kahit ang buhay, kahit ang mga anghel, kahit ang mga pamunuan, kahit ang mga bagay na kasalukuyan, kahit ang mga bagay na darating, kahit ang mga kapangyarihan,",
        versions: {
          adb: "Sapagka't ako'y naniniwalang lubos, na kahit ang kamatayan man, kahit ang buhay, kahit ang mga anghel, kahit ang mga pamunuan, kahit ang mga bagay na kasalukuyan, kahit ang mga bagay na darating, kahit ang mga kapangyarihan,",
          mbb: "Sapagkat natitiyak kong walang makapaghihiwalay sa atin sa kanyang pag-ibig. Kahit ang kamatayan o ang buhay, ang mga anghel o ang mga pamunuan, ang kasalukuyan o ang hinaharap, ang mga kapangyarihan,",
          snd: "Sapagkat ako ay may lubos na pagtitiwala na kahit ang kamatayan, o ang buhay, o ang mga anghel, o ang mga pamunuan, o ang mga kapangyarihan, o ang mga bagay na pangkasalukuyan, o ang mga bagay na darating,"
        },
        englishText: "For I am persuaded that neither death, nor life, nor angels, nor principalities, nor things present, nor things to come, nor powers,"
      },
      {
        number: 39,
        text: "Kahit ang kataasan, kahit ang kalaliman, kahit ang anomang ibang nilalang, ay hindi makapaghitiwalay sa atin sa pag-ibig ng Dios, na nasa kay Cristo Jesus na Panginoon natin.",
        versions: {
          adb: "Kahit ang kataasan, kahit ang kalaliman, kahit ang anomang ibang nilalang, ay hindi makapaghitiwalay sa atin sa pag-ibig ng Dios, na nasa kay Cristo Jesus na Panginoon natin.",
          mbb: "ang kataasan o ang kalaliman, o alinmang nilalang ay hindi makapaghihiwalay sa atin sa pag-ibig ng Diyos na ipinadama niya sa pamamagitan ni Cristo Jesus na ating Panginoon.",
          snd: "o ang kataasan, o ang kalaliman, o ang anupamang ibang nilalang, ay hindi makapaghihiwalay sa atin sa pag-ibig ng Diyos na na kay Cristo Jesus na ating Panginoon."
        },
        englishText: "nor height, nor depth, nor any other created thing, will be able to separate us from the love of God, which is in Christ Jesus our Lord."
      }
    ]
  },
  {
    id: '1corinto-13',
    bookId: '1corinto',
    bookName: '1 Mga Taga-Corinto',
    chapterNumber: 13,
    title: 'Ang Dakilang Pag-ibig',
    testament: 'Bagong Tipan',
    summary: 'Ang katangian ng tunay na pag-ibig: matiisin, magandang-loob, at hindi nagmamapuri.',
    verses: [
      {
        number: 4,
        text: "Ang pag-ibig ay mapagpahinuhod, at magandang-loob; ang pag-ibig ay hindi nananaghili; ang pag-ibig ay hindi nagmamapuri, hindi palalo,",
        versions: {
          adb: "Ang pag-ibig ay mapagpahinuhod, at magandang-loob; ang pag-ibig ay hindi nananaghili; ang pag-ibig ay hindi nagmamapuri, hindi palalo,",
          mbb: "Ang pag-ibig ay matiyaga at magandang-loob; ang pag-ibig ay hindi naiinggit, hindi nagmamapuri, at hindi mayabang.",
          snd: "Ang pag-ibig ay matiisin at mabait; ang pag-ibig ay hindi naiinggit; ang pag-ibig ay hindi nagpaparangya, hindi palalo,"
        },
        englishText: "Love is patient and is kind; love doesn't envy. Love doesn't brag, is not proud,"
      },
      {
        number: 7,
        text: "Lahat ay binabata, lahat ay pinaniniwalaan, lahat ay inaasahan, lahat ay tinitiis.",
        versions: {
          adb: "Lahat ay binabata, lahat ay pinaniniwalaan, lahat ay inaasahan, lahat ay tinitiis.",
          mbb: "Ang pag-ibig ay nagtitiis ng lahat ng bagay, palaging naniniwala, laging umaasa, at nananatili hanggang wakas.",
          snd: "Lahat ay binabata, lahat ay pinaniniwalaan, lahat ay inaasahan, at lahat ay tinitiis."
        },
        englishText: "bears all things, believes all things, hopes all things, endures all things."
      },
      {
        number: 8,
        text: "Ang pag-ibig ay hindi nagkukulang kailan man: datapuwa't maging mga hula, ay mangatatapos; maging mga wika, ay titigil; maging kaalaman, ay lilipas.",
        versions: {
          adb: "Ang pag-ibig ay hindi nagkukulang kailan man: datapuwa't maging mga hula, ay mangatatapos; maging mga wika, ay titigil; maging kaalaman, ay lilipas.",
          mbb: "Ang pag-ibig ay walang katapusan. Matatapos ang mga pahayag mula sa Diyos, titigil ang pagsasalita sa iba't ibang wika, at lilipas ang kaalaman.",
          snd: "Ang pag-ibig ay hindi nagwawakas kailanman. Ngunit kung may mga propesiya, ang mga ito ay magwawakas; kung may mga wika, ang mga ito ay titigil; kung may kaalaman, ito ay lilipas."
        },
        englishText: "Love never fails. But where there are prophecies, they will be done away with. Where there are languages, they will cease. Where there is knowledge, it will be done away with."
      },
      {
        number: 13,
        text: "Datapuwa't ngayo'y nananatili ang pananampalataya, ang pag-asa, ang pag-ibig, ang tatlong ito; nguni't ang pinakadakila sa mga ito ay ang pag-ibig.",
        versions: {
          adb: "Datapuwa't ngayo'y nananatili ang pananampalataya, ang pag-asa, ang pag-ibig, ang tatlong ito; nguni't ang pinakadakila sa mga ito ay ang pag-ibig.",
          mbb: "Kaya't ang tatlong ito ay nananatili: ang pananampalataya, pag-asa, at pag-ibig. Ngunit ang pinakadakila sa mga ito ay ang pag-ibig.",
          snd: "Kaya ngayon ay nananatili ang pananampalataya, pag-asa, at pag-ibig, ang tatlong ito; ngunit ang pinakadakila sa mga ito ay ang pag-ibig."
        },
        englishText: "Now faith, hope, and love remain—these three. The greatest of these is love."
      }
    ]
  },
  {
    id: 'filipos-4',
    bookId: 'filipos',
    bookName: 'Mga Taga-Filipos',
    chapterNumber: 4,
    title: 'Kagalakan at Kapayapaan sa Panginoon',
    testament: 'Bagong Tipan',
    summary: 'Huwag kayong mangabalisa sa anomang bagay; magalak kayong lagi sa Panginoon.',
    verses: [
      {
        number: 4,
        text: "Mangagalak kayong lagi sa Panginoon: muling sasabihin ko, Mangagalak kayo.",
        versions: {
          adb: "Mangagalak kayong lagi sa Panginoon: muling sasabihin ko, Mangagalak kayo.",
          mbb: "Magalak kayong lagi sa Panginoon. Inuulit ko, magalak kayo!",
          snd: "Magalak kayong lagi sa Panginoon; muli kong sinasabi, Magalak kayo!"
        },
        englishText: "Rejoice in the Lord always! Again I will say, 'Rejoice!'"
      },
      {
        number: 6,
        text: "Huwag kayong mangabalisa sa anomang bagay; kundi sa lahat ng mga bagay sa pamamagitan ng panalangin at daing na may pagpapasalamat ay ipakilala ninyo ang inyong mga kahilingan sa Dios.",
        versions: {
          adb: "Huwag kayong mangabalisa sa anomang bagay; kundi sa lahat ng mga bagay sa pamamagitan ng panalangin at daing na may pagpapasalamat ay ipakilala ninyo ang inyong mga kahilingan sa Dios.",
          mbb: "Huwag kayong mabalisa tungkol sa anumang bagay. Sa halip, sa pamamagitan ng panalangin at pagsusumamo na may pasasalamat, ipaalam ninyo sa Diyos ang inyong mga kahilingan.",
          snd: "Huwag kayong mabalisa sa anumang bagay, kundi sa lahat ng bagay sa pamamagitan ng panalangin at pagsusumamo na may pagpapasalamat ay ipaalam ninyo ang inyong mga kahilingan sa Diyos."
        },
        englishText: "In nothing be anxious, but in everything, by prayer and petition with thanksgiving, let your requests be made known to God."
      },
      {
        number: 7,
        text: "At ang kapayapaan ng Dios, na di masayod ng pagiisip, ay mag-iingat sa inyong mga puso at sa inyong mga pagiisip kay Cristo Jesus.",
        versions: {
          adb: "At ang kapayapaan ng Dios, na di masayod ng pagiisip, ay mag-iingat sa inyong mga puso at sa inyong mga pagiisip kay Cristo Jesus.",
          mbb: "At ang kapayapaan ng Diyos na hindi kayang abutin ng pag-iisip ng tao ang mag-iingat sa inyong mga puso at pag-iisip sa pamamagitan ni Cristo Jesus.",
          snd: "At ang kapayapaan ng Diyos, na hindi kayang maunawaan ng pag-iisip, ang mag-iingat sa inyong mga puso at sa inyong mga pag-iisip kay Cristo Jesus."
        },
        englishText: "And the peace of God, which surpasses all understanding, will guard your hearts and your thoughts in Christ Jesus."
      },
      {
        number: 13,
        text: "Lahat ng mga bagay ay aking magagawa doon sa nagpapalakas sa akin.",
        versions: {
          adb: "Lahat ng mga bagay ay aking magagawa doon sa nagpapalakas sa akin.",
          mbb: "Kayang-kaya kong harapin ang anumang kalagayan sa pamamagitan ng tulong ni Cristo na nagpapatatag sa akin.",
          snd: "Magagawa ko ang lahat ng mga bagay sa pamamagitan ni Cristo na nagpapalakas sa akin."
        },
        englishText: "I can do all things through Christ, who strengthens me."
      },
      {
        number: 19,
        text: "At pupunan ng aking Dios ang bawat kailangan ninyo ayon sa kaniyang mga kayamanan sa kaluwalhatian kay Cristo Jesus.",
        versions: {
          adb: "At pupunan ng aking Dios ang bawat kailangan ninyo ayon sa kaniyang mga kayamanan sa kaluwalhatian kay Cristo Jesus.",
          mbb: "At ang aking Diyos ang magpupuno sa lahat ng inyong pangangailangan ayon sa kanyang masaganang kayamanan kay Cristo Jesus.",
          snd: "At ipagkakaloob ng aking Diyos ang bawat kailangan ninyo ayon sa Kanyang kayamanan sa kaluwalhatian kay Cristo Jesus."
        },
        englishText: "My God will supply every need of yours according to his riches in glory in Christ Jesus."
      }
    ]
  },
  {
    id: 'pahayag-21',
    bookId: 'pahayag',
    bookName: 'Pahayag',
    chapterNumber: 21,
    title: 'Ang Bagong Langit at ang Bagong Lupa',
    testament: 'Bagong Tipan',
    summary: 'Papahirin ng Dios ang bawat luha sa kanilang mga mata; at hindi na magkakaroon ng kamatayan.',
    verses: [
      {
        number: 1,
        text: "At nakita ko ang isang bagong langit at ang isang bagong lupa: sapagka't ang unang langit at ang unang lupa ay naparam; at ang dagat ay wala na.",
        versions: {
          adb: "At nakita ko ang isang bagong langit at ang isang bagong lupa: sapagka't ang unang langit at ang unang lupa ay naparam; at ang dagat ay wala na.",
          mbb: "Pagkatapos nito, nakita ko ang isang bagong langit at isang bagong lupa. Nawala na ang unang langit at ang unang lupa, at wala na ring dagat.",
          snd: "At nakita ko ang isang bagong langit at isang bagong lupa, sapagkat ang unang langit at ang unang lupa ay lumipas na, at wala na ang dagat."
        },
        englishText: "I saw a new heaven and a new earth: for the first heaven and the first earth have passed away, and the sea is no more."
      },
      {
        number: 3,
        text: "At narinig ko ang isang dakilang tinig na mula sa luklukan, na nagsasabi, Narito, ang tabernakulo ng Dios ay nasa mga tao, at siya'y mananahan sa kanila, at sila'y magiging mga bayan niya, at ang Dios din ay sasa kanila, at magiging Dios nila:",
        versions: {
          adb: "At narinig ko ang isang dakilang tinig na mula sa luklukan, na nagsasabi, Narito, ang tabernakulo ng Dios ay nasa mga tao, at siya'y mananahan sa kanila, at sila'y magiging mga bayan niya, at ang Dios din ay sasa kanila, at magiging Dios nila:",
          mbb: "Narinig ko ang isang malakas na tinig mula sa trono na nagsasabi: 'Ngayon, ang tahanan ng Diyos ay nasa piling na ng mga tao! Maninirahan siyang kasama nila, at sila'y magiging bayan niya. Ang Diyos mismo ang makakapiling nila.'",
          snd: "At narinig ko ang isang malakas na tinig mula sa trono na nagsasabi, 'Narito, ang tahanan ng Diyos ay nasa piling ng mga tao, at Siya ay mananahan na kasama nila, at sila ay magiging Kanyang bayan, at ang Diyos Mismo ay sasakanila at magiging kanilang Diyos.'"
        },
        englishText: "I heard a loud voice out of heaven saying, 'Behold, God's dwelling is with people, and he will dwell with them, and they will be his people, and God himself will be with them as their God.'"
      },
      {
        number: 4,
        text: "At papahirin niya ang bawa't luha sa kanilang mga mata; at hindi na magkakaroon ng kamatayan; hindi na magkakaroon pa ng dalamhati, o ng pananambitan man, o ng hirap pa man: ang mga unang bagay ay naparam na.",
        versions: {
          adb: "At papahirin niya ang bawa't luha sa kanilang mga mata; at hindi na magkakaroon ng kamatayan; hindi na magkakaroon pa ng dalamhati, o ng pananambitan man, o ng hirap pa man: ang mga unang bagay ay naparam na.",
          mbb: "Papahirin niya ang bawat luha sa kanilang mga mata. Wala nang kamatayan, kalungkutan, pag-iyak, o sakit man, sapagkat lumipas na ang dating mga bagay.",
          snd: "At papahirin Niya ang bawat luha sa kanilang mga mata; at hindi na magkakaroon ng kamatayan, o ng dalamhati, o ng pag-iyak, o ng kirot pa man, sapagkat ang mga dating bagay ay lumipas na."
        },
        englishText: "He will wipe away every tear from their eyes. Death will be no more; neither will there be mourning, nor crying, nor pain, any more. The first things have passed away."
      },
      {
        number: 6,
        text: "At sinabi niya sa akin, Nagawa na. Ako ang Alpha at ang Omega, ang pasimula at ang wakas. Ang nauuhaw ay aking paiinumin sa bukal ng tubig ng buhay na walang bayad.",
        versions: {
          adb: "At sinabi niya sa akin, Nagawa na. Ako ang Alpha at ang Omega, ang pasimula at ang wakas. Ang nauuhaw ay aking paiinumin sa bukal ng tubig ng buhay na walang bayad.",
          mbb: "At sinabi pa niya sa akin, 'Naganap na! Ako ang Alpha at ang Omega, ang Pasimula at ang Wakas. Ang nauuhaw ay bibigyan ko ng inuming walang bayad mula sa bukal ng tubig na nagbibigay-buhay.'",
          snd: "At sinabi Niya sa akin, 'Naganap na! Ako ang Alpha at ang Omega, ang Pasimula at ang Wakas. Ang nauuhaw ay bibigyan Ko nang walang bayad mula sa bukal ng tubig ng buhay.'"
        },
        englishText: "He said to me, 'It is done! I am the Alpha and the Omega, the Beginning and the End. I will give freely to him who is thirsty from the spring of the water of life.'"
      }
    ]
  }
];

export const DAILY_VERSES = [
  {
    reference: "Mateo 1:21",
    text: "At siya'y manganganak ng isang lalake; at ang pangalang itatawag mo sa kaniya'y JESUS; sapagka't ililigtas niya ang kaniyang bayan sa kanilang mga kasalanan.",
    versions: {
      adb: "At siya'y manganganak ng isang lalake; at ang pangalang itatawag mo sa kaniya'y JESUS; sapagka't ililigtas niya ang kaniyang bayan sa kanilang mga kasalanan.",
      mbb: "Magsisilang siya ng isang batang lalaki at Jesus ang ipapangalan mo sa kanya, sapagkat ililigtas niya ang kanyang bayan sa kanilang mga kasalanan.",
      snd: "Magsisilang siya ng isang anak na lalaki at papangalanan mo Siyang JESUS, sapagkat ililigtas Niya ang Kanyang bayan mula sa kanilang mga kasalanan."
    },
    theme: "Kaligtasan at Pagsilang ni Jesus",
    chapterId: "mateo-1",
    verseNumber: 21
  },
  {
    reference: "Salmo 23:1",
    text: "Ang Panginoon ay aking pastol; hindi ako magkukulang.",
    versions: {
      adb: "Ang Panginoon ay aking pastol; hindi ako magkukulang.",
      mbb: "Si Yahweh ang aking pastol, hindi ako magkukulang.",
      snd: "Ang Panginoon ang aking pastol; wala akong kukulangin."
    },
    theme: "Kalinga at Katapatan ng Diyos",
    chapterId: "salmo-23",
    verseNumber: 1
  },
  {
    reference: "Filipos 4:13",
    text: "Lahat ng mga bagay ay aking magagawa doon sa nagpapalakas sa akin.",
    versions: {
      adb: "Lahat ng mga bagay ay aking magagawa doon sa nagpapalakas sa akin.",
      mbb: "Kayang-kaya kong harapin ang anumang kalagayan sa pamamagitan ng tulong ni Cristo na nagpapatatag sa akin.",
      snd: "Magagawa ko ang lahat ng mga bagay sa pamamagitan ni Cristo na nagpapalakas sa akin."
    },
    theme: "Kalakasan kay Cristo",
    chapterId: "filipos-4",
    verseNumber: 13
  },
  {
    reference: "Juan 3:16",
    text: "Sapagka't gayon na lamang ang pagsinta ng Dios sa sanglibutan, na ibinigay niya ang kaniyang bugtong na Anak, upang ang sinomang sa kaniya'y sumampalataya ay huwag mapahamak, kundi magkaroon ng buhay na walang hanggan.",
    versions: {
      adb: "Sapagka't gayon na lamang ang pagsinta ng Dios sa sanglibutan, na ibinigay niya ang kaniyang bugtong na Anak, upang ang sinomang sa kaniya'y sumampalataya ay huwag mapahamak, kundi magkaroon ng buhay na walang hanggan.",
      mbb: "Sapagkat gayon na lamang ang pag-ibig ng Diyos sa sangkatauhan, kaya't ibinigay niya ang kanyang kaisa-isang Anak, upang ang sinumang sumampalataya sa kanya ay hindi mapahamak, kundi magkaroon ng buhay na walang hanggan.",
      snd: "Sapagkat labis na inibig ng Diyos ang sanlibutan kaya ibinigay Niya ang Kanyang bugtong na Anak, upang ang sinumang sumampalataya sa Kanya ay hindi mapahamak kundi magkaroon ng buhay na walang hanggan."
    },
    theme: "Walang Hanggang Pag-ibig",
    chapterId: "juan-3",
    verseNumber: 16
  },
  {
    reference: "Kawikaan 3:5-6",
    text: "Tumiwala ka sa Panginoon ng buong puso mo, at huwag kang manalig sa iyong sariling kaunawaan: Kilalanin mo siya sa lahat ng iyong mga lakad, at kaniyang ituturo ang iyong mga landas.",
    versions: {
      adb: "Tumiwala ka sa Panginoon ng buong puso mo, at huwag kang manalig sa iyong sariling kaunawaan: Kilalanin mo siya sa lahat ng iyong mga lakad, at kaniyang ituturo ang iyong mga landas.",
      mbb: "Sa Panginoon ka magtiwala nang buong puso mo, at huwag kang manalig sa sarili mong karunungan. Sa lahat ng iyong mga lakad ay alalahanin mo Siya, at itutuwid Niya ang iyong mga landas.",
      snd: "Magtiwala ka sa Panginoon nang buong puso mo, at huwag kang umasa sa iyong sariling pang-unawa. Kilalanin mo Siya sa lahat ng iyong mga lakad, at gagawin Niyang matuwid ang iyong mga landas."
    },
    theme: "Pagtitiwala sa Diyos",
    chapterId: "kawikaan-3",
    verseNumber: 5
  }
];
