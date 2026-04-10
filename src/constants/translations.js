const t = {
  // ─── Navbar ───
  nav: {
    howItWorks: { en: 'How It Works', id: 'Cara Kerjanya' },
    startReflecting: { en: 'Start Reflecting', id: 'Mulai Refleksi' },
  },

  // ─── Hero Section ───
  hero: {
    headline: { en: 'Know Your Mood Pattern', id: 'Kenali Pola Mood-mu' },
    headlineAccent: { en: 'In Every Situation', id: 'di Setiap Situasi' },
    subtitle: {
      en: 'A simple self-reflection tool that maps your mood across home, school, social settings, and time alone — in about 5 minutes.',
      id: 'Alat refleksi diri sederhana yang memetakan mood-mu di rumah, sekolah, lingkungan sosial, dan saat sendiri — hanya sekitar 5 menit.',
    },
    cta: { en: 'Start Reflecting', id: 'Mulai Refleksi' },
    seeHow: { en: 'See how it works', id: 'Lihat cara kerjanya' },
    yourMoodMap: { en: 'Your Mood Map', id: 'Peta Mood-mu' },
  },

  // ─── Context labels (used across pages) ───
  contexts: {
    home: { en: 'Home', id: 'Rumah' },
    school: { en: 'School', id: 'Sekolah' },
    social: { en: 'Social Activities', id: 'Aktivitas Sosial' },
    alone: { en: 'Alone', id: 'Saat Sendiri' },
  },

  contextDescriptions: {
    home: {
      en: 'How you feel in your home environment — your everyday space.',
      id: 'Bagaimana perasaanmu saat berada di rumah dan di ruang sehari-harimu.',
    },
    school: {
      en: 'How you feel during school — classes, campus, that whole world.',
      id: 'Bagaimana perasaanmu saat menjalani aktivitas di sekolah.',
    },
    social: {
      en: 'How you feel when you\'re with friends or in social settings.',
      id: 'Bagaimana perasaanmu saat bersama teman atau berada di situasi sosial.',
    },
    alone: {
      en: 'How you feel when it\'s just you — your own time and space.',
      id: 'Bagaimana perasaanmu saat sedang sendiri dan punya waktu untuk dirimu sendiri.',
    },
  },

  // ─── What Is Section ───
  whatIs: {
    title: { en: 'What is Tel-UrMood?', id: 'Apa itu Tel-UrMood?' },
    p1: {
      en: 'Tel-UrMood helps you map your mood across four areas of your life — home, school, social settings, and time alone. By answering a few short statements, you\'ll get a personal mood map based on two things: how comfortable you feel and how much energy you have.',
      id: 'Tel-UrMood membantumu memetakan mood di empat area kehidupanmu — rumah, sekolah, lingkungan sosial, dan saat sendiri. Dengan menjawab beberapa pernyataan singkat, kamu akan mendapatkan peta mood pribadi berdasarkan dua hal: seberapa nyaman perasaanmu dan seberapa besar energimu.',
    },
    p2: {
      en: 'There are no right or wrong answers. It\'s just a way to notice patterns.',
      id: 'Tidak ada jawaban benar atau salah. Ini hanya cara untuk melihat pola.',
    },
  },

  // ─── Contexts Section ───
  contextsSection: {
    title: { en: 'Four Areas, One Picture', id: 'Empat Area, Satu Gambaran' },
    subtitle: {
      en: 'Your mood isn\'t the same everywhere. Tel-UrMood looks at four parts of your daily life. Tap each card to learn more.',
      id: 'Mood-mu tidak selalu sama di setiap tempat. Tel-UrMood melihat empat bagian dari keseharianmu. Ketuk setiap kartu untuk tahu lebih lanjut.',
    },
    explanations: {
      home: {
        en: 'Your home is your everyday base — where you eat, rest, and spend time with family. How comfortable and energized you feel here shapes your overall wellbeing.',
        id: 'Rumah adalah tempat keseharianmu — tempat istirahat dan menghabiskan waktu bersama keluarga. Seberapa nyaman dan berenergi perasaanmu di sini memengaruhi kesejahteraanmu secara keseluruhan.',
      },
      school: {
        en: 'School is where you learn, interact with classmates, and face academic expectations. It\'s normal for your mood here to differ from how you feel at home.',
        id: 'Sekolah adalah tempat belajar, berinteraksi dengan teman, dan menghadapi tuntutan akademis. Wajar kalau mood-mu di sini berbeda dari saat di rumah.',
      },
      social: {
        en: 'Social activities include hanging out with friends, group events, and any time you\'re actively with others. Some people feel recharged, others feel drained.',
        id: 'Aktivitas sosial termasuk nongkrong bareng teman, acara kelompok, dan saat kamu aktif bersama orang lain. Ada yang merasa lebih berenergi, ada juga yang merasa terkuras.',
      },
      alone: {
        en: 'Alone time is when it\'s just you — no obligations, no audience. How you feel during this time reveals a lot about your inner emotional patterns.',
        id: 'Waktu sendiri adalah saat kamu hanya bersama dirimu sendiri — tanpa kewajiban, tanpa penonton. Bagaimana perasaanmu saat ini banyak mengungkap pola emosimu.',
      },
    },
  },

  // ─── How It Works Section ───
  howItWorks: {
    title: { en: 'How It Works', id: 'Cara Kerjanya' },
    subtitle: {
      en: 'Three simple steps. About 5 minutes. Zero complexity.',
      id: 'Tiga langkah sederhana. Sekitar 5 menit. Tanpa ribet.',
    },
    steps: [
      {
        label: { en: 'Answer', id: 'Jawab' },
        description: {
          en: 'Respond to a few simple statements about each area of your life.',
          id: 'Tanggapi beberapa pernyataan sederhana tentang setiap area kehidupanmu.',
        },
      },
      {
        label: { en: 'Map', id: 'Petakan' },
        description: {
          en: 'Your answers are plotted onto a personal mood map.',
          id: 'Jawabanmu dipetakan ke dalam peta mood pribadimu.',
        },
      },
      {
        label: { en: 'Reflect', id: 'Refleksi' },
        description: {
          en: 'See your patterns and take a moment to understand yourself better.',
          id: 'Lihat polamu dan luangkan waktu untuk memahami dirimu lebih baik.',
        },
      },
    ],
    step: { en: 'Step', id: 'Langkah' },
    mockQuestion: {
      en: 'I feel comfortable and at ease when I\u2019m at home.',
      id: 'Saya merasa nyaman dan tenang saat berada di rumah.',
    },
    mockOf: { en: 'of', id: 'dari' },
  },

  // ─── Mood Map Preview Section ───
  moodMapPreview: {
    title: { en: 'Your Personal Mood Map', id: 'Peta Mood Pribadimu' },
    description: {
      en: 'After answering, you\u2019ll see where each part of your life falls on a comfort-and-energy map. Each dot represents one area — so you can see how your mood shifts across different contexts.',
      id: 'Setelah menjawab, kamu akan melihat posisi setiap area kehidupanmu di peta kenyamanan dan energi. Setiap titik mewakili satu area — sehingga kamu bisa melihat bagaimana mood-mu berubah di berbagai konteks.',
    },
    exampleVis: { en: 'Example visualization', id: 'Contoh visualisasi' },
  },

  // ─── Final CTA Section ───
  finalCta: {
    title: { en: 'Ready to Check In With Yourself?', id: 'Siap Luangkan Waktu untuk Dirimu?' },
    subtitle: {
      en: 'It only takes a few minutes. No sign-up, no saving, no judgment.',
      id: 'Hanya butuh beberapa menit. Tanpa daftar, tanpa simpan, tanpa penilaian.',
    },
    cta: { en: 'Start Reflecting', id: 'Mulai Refleksi' },
    note: {
      en: 'No account needed \u00b7 Results stay on your device',
      id: 'Tanpa akun \u00b7 Hasil tetap di perangkatmu',
    },
  },

  // ─── Quadrant labels ───
  quadrants: {
    energeticPleasant: {
      label: { en: 'Energetic Pleasant', id: 'Nyaman & Berenergi' },
      description: { en: 'energized and comfortable', id: 'berenergi dan nyaman' },
      short: { en: 'Lively & at ease', id: 'Berenergi & tenang' },
    },
    calmPleasant: {
      label: { en: 'Calm Pleasant', id: 'Nyaman & Tenang' },
      description: { en: 'calm and at ease', id: 'tenang dan nyaman' },
      short: { en: 'Calm & comfortable', id: 'Tenang & nyaman' },
    },
    energeticUnpleasant: {
      label: { en: 'Energetic Unpleasant', id: 'Tidak Nyaman & Berenergi' },
      description: { en: 'restless or on edge', id: 'gelisah atau tegang' },
      short: { en: 'Restless or on edge', id: 'Gelisah atau tegang' },
    },
    lowUnpleasant: {
      label: { en: 'Low Unpleasant', id: 'Tidak Nyaman & Lelah' },
      description: { en: 'drained or uneasy', id: 'terkuras atau tidak nyaman' },
      short: { en: 'Drained or uneasy', id: 'Terkuras atau gelisah' },
    },
  },

  // ─── Chart axis labels ───
  chart: {
    comfortPlus: { en: 'Comfort +', id: 'Kenyamanan +' },
    energyPlus: { en: 'Energy +', id: 'Energi +' },
    comfort: { en: 'Comfort', id: 'Kenyamanan' },
    energy: { en: 'Energy', id: 'Energi' },
  },

  // ─── Scale labels ───
  scaleLabels: {
    comfort: {
      en: ['Very Uncomfortable', 'Uncomfortable', 'Neutral', 'Comfortable', 'Very Comfortable'],
      id: ['Sangat Tidak Nyaman', 'Tidak Nyaman', 'Biasa Saja', 'Nyaman', 'Sangat Nyaman'],
    },
    energy: {
      en: ['Very Drained', 'Drained', 'Neutral', 'Energized', 'Very Energized'],
      id: ['Sangat Lelah', 'Kurang Berenergi', 'Biasa Saja', 'Berenergi', 'Sangat Berenergi'],
    },
  },

  // ─── Test flow ───
  test: {
    contextInstructions: {
      home: {
        en: 'Think about how you usually feel when you\'re at home.',
        id: 'Coba pikirkan bagaimana biasanya perasaanmu saat berada di rumah.',
      },
      school: {
        en: 'Think about how you usually feel when you\'re at school.',
        id: 'Coba pikirkan bagaimana biasanya perasaanmu saat berada di sekolah.',
      },
      social: {
        en: 'Think about how you usually feel when you\'re with friends or in social settings.',
        id: 'Coba pikirkan bagaimana biasanya perasaanmu saat bersama teman atau berada di situasi sosial.',
      },
      alone: {
        en: 'Think about how you usually feel when you\'re by yourself.',
        id: 'Coba pikirkan bagaimana biasanya perasaanmu saat sedang sendiri.',
      },
    },
    helperTip: {
      en: 'There are no right or wrong answers. Just pick what feels closest to your experience.',
      id: 'Tidak ada jawaban benar atau salah. Pilih saja yang paling mendekati pengalamanmu.',
    },
    nowEntering: { en: 'Now entering:', id: 'Sekarang:' },
    back: { en: 'Back', id: 'Kembali' },
    next: { en: 'Next', id: 'Lanjut' },
    seeMyResults: { en: 'See My Results', id: 'Lihat Hasil Saya' },
    of: { en: 'of', id: 'dari' },
    notDiagnosis: { en: 'Tel-UrMood \u00b7 Not a clinical diagnosis tool.', id: 'Tel-UrMood \u00b7 Bukan alat diagnosis klinis.' },
    questions: {
      home: {
        en: [
          'I feel comfortable and at ease when I\'m at home.',
          'I feel energized and active in my home environment.',
          'I feel safe and relaxed at home.',
          'I feel motivated to do things when I\'m at home.',
        ],
        id: [
          'Saya merasa nyaman dan tenang saat berada di rumah.',
          'Saya merasa berenergi dan aktif di lingkungan rumah.',
          'Saya merasa aman dan rileks di rumah.',
          'Saya merasa termotivasi untuk melakukan sesuatu saat di rumah.',
        ],
      },
      school: {
        en: [
          'I feel comfortable and accepted at school.',
          'I feel energized and engaged during school.',
          'I feel calm and steady when I\'m at school.',
          'I feel enthusiastic about things happening at school.',
        ],
        id: [
          'Saya merasa nyaman dan diterima di sekolah.',
          'Saya merasa berenergi dan terlibat selama di sekolah.',
          'Saya merasa tenang dan stabil saat berada di sekolah.',
          'Saya merasa antusias dengan hal-hal yang terjadi di sekolah.',
        ],
      },
      social: {
        en: [
          'I feel comfortable when I\'m around other people.',
          'I feel energized by social interactions.',
          'I feel relaxed and at ease in social settings.',
          'I feel lively and active when I\'m with friends.',
        ],
        id: [
          'Saya merasa nyaman saat berada di sekitar orang lain.',
          'Saya merasa berenergi saat berinteraksi sosial.',
          'Saya merasa rileks dan tenang di lingkungan sosial.',
          'Saya merasa bersemangat dan aktif saat bersama teman.',
        ],
      },
      alone: {
        en: [
          'I feel comfortable when I\'m by myself.',
          'I feel energized during my alone time.',
          'I feel peaceful and calm when I\'m alone.',
          'I feel motivated to do things on my own.',
        ],
        id: [
          'Saya merasa nyaman saat sendiri.',
          'Saya merasa berenergi saat waktu sendiri.',
          'Saya merasa damai dan tenang saat sendirian.',
          'Saya merasa termotivasi untuk melakukan sesuatu sendiri.',
        ],
      },
    },
  },

  // ─── Progress bar ───
  progressBar: {
    of: { en: 'of', id: 'dari' },
  },

  // ─── Result page ───
  result: {
    title: { en: 'Your Mood Map', id: 'Peta Mood-mu' },
    subtitle: {
      en: 'Here\u2019s a snapshot of how you usually feel across four areas of your life. Take a moment to explore your patterns.',
      id: 'Ini gambaran singkat tentang bagaimana perasaanmu di berbagai bagian keseharianmu. Luangkan waktu sejenak untuk melihat polamu.',
    },
    moodMap: { en: 'Mood Map', id: 'Peta Mood' },
    chartSubtitle: {
      en: 'Each dot represents how you tend to feel in a specific context.',
      id: 'Setiap titik menunjukkan bagaimana perasaanmu di konteks tertentu.',
    },
    contextBreakdown: { en: 'Context Breakdown', id: 'Rincian per Konteks' },
    reflectionTitle: { en: 'A moment to reflect', id: 'Sejenak untuk refleksi' },
    reflectionMessages: {
      energeticPleasant: {
        en: 'You seem to feel lively and at ease here — that\'s a positive space for you.',
        id: 'Kamu tampak merasa bersemangat dan nyaman di sini — ini ruang yang positif untukmu.',
      },
      calmPleasant: {
        en: 'This area brings you a sense of calm comfort — a place where you can recharge.',
        id: 'Area ini memberimu rasa tenang dan nyaman — tempat di mana kamu bisa mengisi ulang energi.',
      },
      energeticUnpleasant: {
        en: 'You might feel on edge or restless here — it\'s okay to notice that.',
        id: 'Kamu mungkin merasa gelisah atau tegang di sini — tidak apa-apa untuk menyadari itu.',
      },
      lowUnpleasant: {
        en: 'This space may leave you feeling drained — recognizing that is the first step.',
        id: 'Ruang ini mungkin membuatmu merasa terkuras — menyadari itu adalah langkah pertama.',
      },
    },
    overallInsights: {
      positive: {
        en: 'Overall, most areas of your life seem to feel pretty comfortable right now. Keep paying attention to how different spaces affect your mood.',
        id: 'Secara keseluruhan, sebagian besar area kehidupanmu terasa cukup nyaman saat ini. Terus perhatikan bagaimana berbagai ruang memengaruhi mood-mu.',
      },
      mixed: {
        en: 'Your mood varies across different parts of your life — that\'s completely normal. Notice which spaces energize or calm you, and which ones feel harder.',
        id: 'Mood-mu bervariasi di berbagai bagian kehidupanmu — itu sangat normal. Perhatikan mana yang memberi energi atau ketenangan, dan mana yang terasa lebih berat.',
      },
      challenging: {
        en: 'It looks like several areas feel challenging right now. Remember, this isn\'t a diagnosis — just a starting point for understanding yourself better.',
        id: 'Sepertinya beberapa area terasa cukup berat saat ini. Ingat, ini bukan diagnosis — hanya titik awal untuk memahami dirimu lebih baik.',
      },
    },
    snapshotNote: {
      en: 'This map is just one snapshot — your mood naturally changes over time. Use this as a gentle starting point, not a label.',
      id: 'Peta ini hanya satu momen — mood-mu secara alami berubah seiring waktu. Gunakan ini sebagai titik awal yang lembut, bukan label.',
    },
    retake: { en: 'Retake', id: 'Ulangi' },
    backToHome: { en: 'Back to Home', id: 'Kembali ke Beranda' },
    disclaimer: {
      en: 'Tel-UrMood is a self-reflection tool for educational purposes only. It is not a clinical assessment, diagnosis, or treatment recommendation.',
      id: 'Tel-UrMood adalah alat refleksi diri untuk tujuan edukasi saja. Ini bukan asesmen klinis, diagnosis, atau rekomendasi penanganan.',
    },
    footerLine1: {
      en: 'Tel-UrMood \u00b7 A self-reflection tool — not a clinical diagnosis.',
      id: 'Tel-UrMood \u00b7 Alat refleksi diri — bukan diagnosis klinis.',
    },
    footerLine2: {
      en: 'Faculty of Psychology, Telkom University',
      id: 'Fakultas Psikologi, Telkom University',
    },
  },

  // ─── Footer ───
  footer: {
    brandDesc: {
      en: 'A self-reflection tool to help you understand how you feel across different parts of your life.',
      id: 'Alat refleksi diri untuk membantumu memahami perasaanmu di berbagai bagian kehidupan.',
    },
    explore: { en: 'Explore', id: 'Jelajahi' },
    howItWorks: { en: 'How It Works', id: 'Cara Kerjanya' },
    takeTheTest: { en: 'Take the Test', id: 'Mulai Tes' },
    connect: { en: 'Connect', id: 'Terhubung' },
    profileVideo: { en: 'Profile Video', id: 'Video Profil' },
    scanQr: { en: 'Scan to watch our profile video', id: 'Scan untuk menonton video profil kami' },
    copyright: {
      en: 'Tel-UrMood \u00b7 Faculty of Psychology, Telkom University',
      id: 'Tel-UrMood \u00b7 Fakultas Psikologi, Telkom University',
    },
    notDiagnosis: { en: 'Not a clinical diagnosis tool.', id: 'Bukan alat diagnosis klinis.' },
  },

  // ─── Transition overlay ───
  transition: {
    loading: { en: 'Loading...', id: 'Memuat...' },
    preparing: { en: 'Preparing your reflection...', id: 'Menyiapkan refleksimu...' },
  },
};

/**
 * Helper: get translated string.
 * Usage: T(t.hero.headline, lang)
 */
export function T(entry, lang) {
  if (!entry) return '';
  return entry[lang] || entry.en || '';
}

export default t;
