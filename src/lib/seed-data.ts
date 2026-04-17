import type { Opportunity, Organization } from "@/lib/types";

export const seedOrganizations: Organization[] = [
  {
    id: "khazanah",
    displayName: "Khazanah Nasional",
    shortDescriptionEn:
      "National investment institution backing leadership and scholarship development.",
    shortDescriptionMs:
      "Institusi pelaburan nasional yang menyokong pembangunan kepimpinan dan biasiswa.",
    website: "https://www.khazanah.com.my",
  },
  {
    id: "yayasan-inovasi",
    displayName: "Yayasan Inovasi Malaysia",
    shortDescriptionEn:
      "Programs connecting student innovators with communities and practical pilots.",
    shortDescriptionMs:
      "Program yang menghubungkan pelajar inovatif dengan komuniti dan projek rintis.",
    website: "https://www.yim.my",
  },
  {
    id: "myharapan",
    displayName: "myHarapan",
    shortDescriptionEn:
      "Youth-focused foundation building civic leadership and social impact.",
    shortDescriptionMs:
      "Yayasan berfokus belia yang membina kepimpinan sivik dan impak sosial.",
    website: "https://myharapan.org",
  },
  {
    id: "mdec",
    displayName: "Malaysia Digital Economy Corporation",
    shortDescriptionEn:
      "Digital talent and innovation opportunities for future-ready graduates.",
    shortDescriptionMs:
      "Peluang bakat digital dan inovasi untuk graduan yang bersedia ke hadapan.",
    website: "https://mdec.my",
  },
  {
    id: "sunway-research",
    displayName: "Sunway Research Network",
    shortDescriptionEn:
      "Collaborative research and challenge-based learning with university partners.",
    shortDescriptionMs:
      "Penyelidikan kolaboratif dan pembelajaran berasaskan cabaran bersama rakan universiti.",
    website: "https://sunwayuniversity.edu.my",
  },
];

export const seedOpportunities: Opportunity[] = [
  {
    id: "opp-khazanah-spark-2026",
    slug: "khazanah-spark-scholarship-2026",
    titleEn: "Khazanah Spark Scholarship 2026",
    titleMs: "Biasiswa Khazanah Spark 2026",
    summaryEn:
      "Foundation support for first-generation university students with strong community leadership potential.",
    summaryMs:
      "Sokongan asas untuk pelajar universiti generasi pertama yang mempunyai potensi kepimpinan komuniti.",
    descriptionEn:
      "A scholarship pathway for undergraduate students who combine academic ambition with social commitment. Shortlisted students receive funding, mentorship and access to a peer impact network.",
    descriptionMs:
      "Laluan biasiswa untuk pelajar ijazah sarjana muda yang menggabungkan cita-cita akademik dengan komitmen sosial. Pelajar disenarai pendek menerima pembiayaan, bimbingan dan akses kepada rangkaian impak rakan sebaya.",
    eligibilityEn: [
      "Malaysian undergraduate student",
      "Household income or first-generation priority",
      "Demonstrated community involvement",
    ],
    eligibilityMs: [
      "Pelajar sarjana muda warganegara Malaysia",
      "Keutamaan kepada pendapatan isi rumah terhad atau generasi pertama",
      "Mempunyai penglibatan komuniti yang jelas",
    ],
    category: "scholarship",
    organizationId: "khazanah",
    locationLabel: "Kuala Lumpur + nationwide mentoring",
    mode: "hybrid",
    deadlineAt: "2026-05-24T23:59:00.000Z",
    externalUrl: "https://www.khazanah.com.my",
    featured: true,
    status: "published",
    createdAt: "2026-04-01T09:00:00.000Z",
    updatedAt: "2026-04-10T09:00:00.000Z",
  },
  {
    id: "opp-yim-campus-lab",
    slug: "campus-impact-lab-microgrant",
    titleEn: "Campus Impact Lab Microgrant",
    titleMs: "Geran Mikro Makmal Impak Kampus",
    summaryEn:
      "Seed funding for student teams building practical projects for campus wellbeing, access or sustainability.",
    summaryMs:
      "Pembiayaan awal untuk pasukan pelajar yang membina projek praktikal bagi kesejahteraan, akses atau kelestarian kampus.",
    descriptionEn:
      "Student teams propose a fast pilot that solves a visible problem on campus or in the surrounding community. Successful teams receive a small grant, product mentoring and demo-day exposure.",
    descriptionMs:
      "Pasukan pelajar mencadangkan projek rintis pantas yang menyelesaikan masalah nyata di kampus atau komuniti sekeliling. Pasukan yang berjaya menerima geran kecil, bimbingan produk dan pendedahan semasa hari demo.",
    eligibilityEn: [
      "2 to 5 student team members",
      "Pilot must launch within 8 weeks",
      "Strong implementation plan and measurable outcome",
    ],
    eligibilityMs: [
      "2 hingga 5 ahli pasukan pelajar",
      "Projek rintis mesti dilancarkan dalam 8 minggu",
      "Pelan pelaksanaan kukuh dan hasil yang boleh diukur",
    ],
    category: "competition",
    organizationId: "yayasan-inovasi",
    locationLabel: "Nationwide",
    mode: "hybrid",
    deadlineAt: "2026-06-12T23:59:00.000Z",
    externalUrl: "https://www.yim.my",
    featured: true,
    status: "published",
    createdAt: "2026-04-03T09:00:00.000Z",
    updatedAt: "2026-04-12T09:00:00.000Z",
  },
  {
    id: "opp-myharapan-city-volunteers",
    slug: "city-service-volunteer-fellowship",
    titleEn: "City Service Volunteer Fellowship",
    titleMs: "Felo Sukarelawan Khidmat Bandar",
    summaryEn:
      "Weekend volunteering fellowship for students who want to contribute to youth education and urban community resilience.",
    summaryMs:
      "Felo sukarelawan hujung minggu untuk pelajar yang mahu menyumbang kepada pendidikan belia dan daya tahan komuniti bandar.",
    descriptionEn:
      "Participants join a structured cohort, attend orientation sessions and contribute to ongoing partner programs around tutoring, food security and youth outreach.",
    descriptionMs:
      "Peserta menyertai kohort berstruktur, menghadiri sesi orientasi dan menyumbang kepada program rakan berkaitan tuisyen, sekuriti makanan dan jangkauan belia.",
    eligibilityEn: [
      "Open to all Malaysian university students",
      "Minimum 6 weekend sessions",
      "Willingness to work with community partners",
    ],
    eligibilityMs: [
      "Terbuka kepada semua pelajar universiti Malaysia",
      "Minimum 6 sesi hujung minggu",
      "Sedia bekerjasama dengan rakan komuniti",
    ],
    category: "volunteering",
    organizationId: "myharapan",
    locationLabel: "Klang Valley",
    mode: "onsite",
    deadlineAt: "2026-05-08T23:59:00.000Z",
    externalUrl: "https://myharapan.org",
    featured: false,
    status: "published",
    createdAt: "2026-03-29T09:00:00.000Z",
    updatedAt: "2026-04-08T09:00:00.000Z",
  },
  {
    id: "opp-mdec-ai-internship",
    slug: "mdec-ai-product-internship",
    titleEn: "MDEC AI Product Internship",
    titleMs: "Latihan Industri Produk AI MDEC",
    summaryEn:
      "A structured internship for students exploring product operations, civic tech and responsible AI deployment.",
    summaryMs:
      "Latihan industri berstruktur untuk pelajar yang meneroka operasi produk, teknologi sivik dan penggunaan AI yang bertanggungjawab.",
    descriptionEn:
      "Interns support program teams on research synthesis, ecosystem mapping, startup coordination and event delivery. The role is ideal for students who want exposure to product thinking in the public-interest space.",
    descriptionMs:
      "Pelatih menyokong pasukan program dalam sintesis penyelidikan, pemetaan ekosistem, penyelarasan syarikat pemula dan pelaksanaan acara. Peranan ini sesuai untuk pelajar yang mahu pendedahan kepada pemikiran produk dalam ruang kepentingan awam.",
    eligibilityEn: [
      "Current undergraduate or postgraduate student",
      "Available for a 10-week internship",
      "Strong written communication in English",
    ],
    eligibilityMs: [
      "Pelajar sarjana muda atau pascasiswazah semasa",
      "Bersedia untuk latihan industri selama 10 minggu",
      "Kemahiran komunikasi bertulis yang baik dalam Bahasa Inggeris",
    ],
    category: "internship",
    organizationId: "mdec",
    locationLabel: "Cyberjaya",
    mode: "hybrid",
    deadlineAt: "2026-07-03T23:59:00.000Z",
    externalUrl: "https://mdec.my",
    featured: true,
    status: "published",
    createdAt: "2026-04-04T09:00:00.000Z",
    updatedAt: "2026-04-13T09:00:00.000Z",
  },
  {
    id: "opp-sunway-climate-research",
    slug: "climate-resilience-research-assistantship",
    titleEn: "Climate Resilience Research Assistantship",
    titleMs: "Pembantu Penyelidikan Daya Tahan Iklim",
    summaryEn:
      "Research placement for students interested in urban climate adaptation, data collection and policy communication.",
    summaryMs:
      "Penempatan penyelidikan untuk pelajar yang berminat dengan adaptasi iklim bandar, pengumpulan data dan komunikasi dasar.",
    descriptionEn:
      "Students work with faculty and civic partners to support fieldwork, literature reviews and public-facing research briefs on resilient campus and city systems.",
    descriptionMs:
      "Pelajar bekerjasama dengan pensyarah dan rakan sivik untuk menyokong kerja lapangan, semakan literatur dan ringkasan penyelidikan awam tentang sistem kampus dan bandar yang berdaya tahan.",
    eligibilityEn: [
      "Environmental, social science or data background preferred",
      "Able to commit 6 hours a week",
      "Comfortable with collaborative research",
    ],
    eligibilityMs: [
      "Latar belakang alam sekitar, sains sosial atau data digalakkan",
      "Mampu komited 6 jam seminggu",
      "Selesa dengan penyelidikan kolaboratif",
    ],
    category: "research",
    organizationId: "sunway-research",
    locationLabel: "Selangor",
    mode: "hybrid",
    deadlineAt: "2026-08-15T23:59:00.000Z",
    externalUrl: "https://sunwayuniversity.edu.my",
    featured: false,
    status: "published",
    createdAt: "2026-04-05T09:00:00.000Z",
    updatedAt: "2026-04-11T09:00:00.000Z",
  },
  {
    id: "opp-myharapan-future-cities",
    slug: "future-cities-youth-challenge",
    titleEn: "Future Cities Youth Challenge",
    titleMs: "Cabaran Belia Bandar Masa Depan",
    summaryEn:
      "Pitch ideas that improve mobility, inclusivity or student life in Malaysian cities and campuses.",
    summaryMs:
      "Bentangkan idea yang menambah baik mobiliti, keterangkuman atau kehidupan pelajar di bandar dan kampus Malaysia.",
    descriptionEn:
      "This challenge supports early-stage civic ideas with mentor clinics, presentation coaching and showcase access for students who can define a sharp urban problem and a realistic intervention.",
    descriptionMs:
      "Cabaran ini menyokong idea sivik peringkat awal melalui klinik mentor, bimbingan pembentangan dan akses pameran untuk pelajar yang mampu mentakrif masalah bandar dengan jelas serta intervensi yang realistik.",
    eligibilityEn: [
      "Solo applicants or teams of up to 4",
      "Idea must target a real Malaysian urban issue",
      "Short slide deck required",
    ],
    eligibilityMs: [
      "Permohonan individu atau pasukan sehingga 4 orang",
      "Idea mesti menyasar isu bandar sebenar di Malaysia",
      "Perlu menyediakan slaid ringkas",
    ],
    category: "competition",
    organizationId: "myharapan",
    locationLabel: "Remote",
    mode: "remote",
    deadlineAt: "2026-09-01T23:59:00.000Z",
    externalUrl: "https://myharapan.org",
    featured: false,
    status: "published",
    createdAt: "2026-04-06T09:00:00.000Z",
    updatedAt: "2026-04-14T09:00:00.000Z",
  },
  {
    id: "opp-khazanah-leadership-lab",
    slug: "khazanah-public-leadership-lab",
    titleEn: "Khazanah Public Leadership Lab",
    titleMs: "Makmal Kepimpinan Awam Khazanah",
    summaryEn:
      "A short intensive for students who want to turn policy curiosity into practical project leadership.",
    summaryMs:
      "Program intensif ringkas untuk pelajar yang mahu menukar minat terhadap dasar kepada kepimpinan projek praktikal.",
    descriptionEn:
      "Participants attend policy briefings, team workshops and challenge sprints with mentors from public-interest sectors. The lab focuses on execution, not theory alone.",
    descriptionMs:
      "Peserta menghadiri taklimat dasar, bengkel berpasukan dan pecutan cabaran bersama mentor daripada sektor kepentingan awam. Makmal ini berfokus pada pelaksanaan, bukan teori semata-mata.",
    eligibilityEn: [
      "Open to second-year and above undergraduates",
      "Interest in public leadership or policy impact",
      "Available for the full 4-day program",
    ],
    eligibilityMs: [
      "Terbuka kepada pelajar sarjana muda tahun kedua dan ke atas",
      "Berminat dengan kepimpinan awam atau impak dasar",
      "Bersedia hadir sepanjang program 4 hari",
    ],
    category: "scholarship",
    organizationId: "khazanah",
    locationLabel: "Putrajaya",
    mode: "onsite",
    deadlineAt: "2026-10-04T23:59:00.000Z",
    externalUrl: "https://www.khazanah.com.my",
    featured: false,
    status: "published",
    createdAt: "2026-04-07T09:00:00.000Z",
    updatedAt: "2026-04-15T09:00:00.000Z",
  },
];
