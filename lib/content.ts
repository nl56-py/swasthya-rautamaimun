export type Notice = {
  title: string;
  category: string;
  date: string;
  body: string;
  fileUrl?: string;
};

export type Program = {
  title: string;
  summary: string;
  content?: string;
  icon?: string;
};

export type Institution = {
  name: string;
  type: string;
  address: string;
  phone: string;
  serviceTime: string;
  mapUrl?: string;
};

export type EmergencyContact = {
  title: string;
  phone: string;
  details: string;
};

export type DownloadItem = {
  title: string;
  category: string;
  fileUrl?: string;
};

export type CitizenCharterItem = {
  service: string;
  fee: string;
  time: string;
};

export const branchContact = {
  municipality: "रौतामाई गाउँपालिका",
  office: "स्वास्थ्य शाखा",
  provinceLine: "कोशी प्रदेश, उदयपुर",
  slogan: "गुणस्तरीय स्वास्थ्य सेवा, नागरिकमैत्री सूचना र उत्तरदायी सेवा प्रवाह",
  chief: "राम नारायण चौधरी",
  chiefTitle: "स्वास्थ्य इकाई प्रमुख",
  email: "ramnchaudhary989@gmail.com",
  phone: "9862998884",
  address: "रौतामाई गाउँपालिका, गाउँ कार्यपालिकाको कार्यालय, उदयपुर"
};

export const notices: Notice[] = [
  {
    title: "नियमित खोप सेवा सम्बन्धी सूचना",
    category: "सूचना",
    date: "२०८३/०३/२४",
    body: "पालिकाभित्रका सबै स्वास्थ्य संस्थाबाट नियमित खोप सेवा उपलब्ध हुने जानकारी गराइन्छ।"
  },
  {
    title: "मातृ तथा शिशु स्वास्थ्य शिविर सञ्चालन",
    category: "समाचार",
    date: "२०८३/०३/२०",
    body: "गर्भवती जाँच, पोषण परामर्श र बाल स्वास्थ्य सेवाका लागि विशेष शिविर सञ्चालन गरिनेछ।"
  },
  {
    title: "स्वास्थ्य प्रोफाइल अद्यावधिक",
    category: "प्रकाशन",
    date: "२०८३/०३/१८",
    body: "वडा तहका स्वास्थ्य सूचकहरू अद्यावधिक गर्न सम्बन्धित संस्थालाई अनुरोध गरिन्छ।"
  }
];

export const programs: Program[] = [
  { title: "मातृ तथा शिशु स्वास्थ्य", summary: "ANC/PNC सेवा, सुरक्षित प्रसूति परामर्श र बाल स्वास्थ्य निगरानी।" },
  { title: "खोप कार्यक्रम", summary: "राष्ट्रिय खोप तालिकाअनुसार नियमित र विशेष खोप अभियान।" },
  { title: "पोषण कार्यक्रम", summary: "बालबालिका, किशोरी, गर्भवती र सुत्केरी महिलाका लागि पोषण सेवा।" },
  { title: "क्षयरोग (TB) कार्यक्रम", summary: "स्क्रिनिङ, उपचार अनुगमन र DOTS सेवा समन्वय।" },
  { title: "HIV/AIDS कार्यक्रम", summary: "परामर्श, सचेतना र सम्बन्धित सेवामा रेफरल।" },
  { title: "परिवार नियोजन", summary: "परामर्श, अस्थायी साधन र दीर्घकालीन विधिका लागि सेवा समन्वय।" },
  { title: "नसर्ने रोग (NCD)", summary: "रक्तचाप, मधुमेह, जीवनशैली परामर्श र जोखिम पहिचान।" }
];

export const institutions: Institution[] = [
  {
    name: "रौतामाई स्वास्थ्य चौकी",
    type: "स्वास्थ्य चौकी",
    address: "रौतामाई गाउँपालिका",
    phone: "सम्पर्क अद्यावधिक हुँदै",
    serviceTime: "आइतबार-शुक्रबार, १०:००-५:००"
  },
  {
    name: "आधारभूत स्वास्थ्य सेवा केन्द्र",
    type: "आधारभूत स्वास्थ्य सेवा केन्द्र",
    address: "वडा तह सेवा केन्द्र",
    phone: "सम्पर्क अद्यावधिक हुँदै",
    serviceTime: "आइतबार-शुक्रबार, १०:००-५:००"
  },
  {
    name: "पालिका स्वास्थ्य सहायता डेस्क",
    type: "स्वास्थ्य शाखा",
    address: "गाउँ कार्यपालिकाको कार्यालय",
    phone: branchContact.phone,
    serviceTime: "कार्यालय समय"
  }
];

export const emergencyContacts: EmergencyContact[] = [
  { title: "स्वास्थ्य शाखा आकस्मिक सम्पर्क", phone: branchContact.phone, details: "स्वास्थ्य इकाई प्रमुख" },
  { title: "एम्बुलेन्स सेवा", phone: "अद्यावधिक गर्न बाँकी", details: "पालिका क्षेत्रभित्र उपलब्ध एम्बुलेन्स विवरण" },
  { title: "रक्तसञ्चार सेवा", phone: "अद्यावधिक गर्न बाँकी", details: "नजिकको रक्तसञ्चार/रेफरल सेवा" },
  { title: "सर्पदंश उपचार केन्द्र", phone: "अद्यावधिक गर्न बाँकी", details: "नजिकको उपचार केन्द्र जानकारी" }
];

export const downloads: DownloadItem[] = [
  { title: "स्वास्थ्य सेवा फाराम", category: "फाराम" },
  { title: "मासिक प्रतिवेदन ढाँचा", category: "प्रतिवेदन" },
  { title: "HMIS रिपोर्ट ढाँचा", category: "प्रतिवेदन" },
  { title: "स्वास्थ्य सम्बन्धी IEC सामग्री", category: "सामग्री" },
  { title: "वार्षिक प्रतिवेदन", category: "प्रकाशन" },
  { title: "स्वास्थ्य प्रोफाइल", category: "प्रकाशन" }
];

export const citizenCharter: CitizenCharterItem[] = [
  { service: "नियमित खोप", fee: "निःशुल्क", time: "खोप तालिकाअनुसार" },
  { service: "गर्भवती जाँच", fee: "निःशुल्क", time: "कार्यालय समय" },
  { service: "परिवार नियोजन परामर्श", fee: "निःशुल्क", time: "कार्यालय समय" },
  { service: "स्वास्थ्य सिफारिस/रेफरल", fee: "नियमानुसार", time: "सोही दिन" }
];

export const galleryItems = ["स्वास्थ्य शिविर", "खोप अभियान", "स्वास्थ्य सचेतना भिडियो"];

export const reportItems = ["HMIS रिपोर्ट", "स्वास्थ्य सूचकहरू", "मासिक प्रतिवेदन", "Dashboard"];

export type VaccinationRecord = {
  description: string;
  count_71_72: number | null;
  count_72_73: number | null;
  count_73_74: number | null;
};

export type NutritionStatus = {
  indicator: string;
  count_71_72: number | null;
  count_72_73: number | null;
  count_73_74: number | null;
};

export type FamilyHealthStatus = {
  ward_number: string;
  healthy: number | null;
  common_ill: number | null;
  chronic_ill: number | null;
  not_mentioned: number | null;
  total: number | null;
};

export const vaccinationSeed: VaccinationRecord[] = [
  { description: "बि.सि.जि.", count_71_72: 18296, count_72_73: 8745, count_73_74: null },
  { description: "डि.पि.टि.", count_71_72: 14668, count_72_73: 8435, count_73_74: null },
  { description: "हेपाटाइटिस \"बि\"", count_71_72: 14668, count_72_73: 8435, count_73_74: null },
  { description: "दादुरा", count_71_72: 16886, count_72_73: 2532, count_73_74: null },
  { description: "पोलियो ३", count_71_72: 13174, count_72_73: 8320, count_73_74: null },
  { description: "टि.टि. (गर्भवती महिला)", count_71_72: 15037, count_72_73: 7343, count_73_74: null }
];

export const nutritionSeed: NutritionStatus[] = [
  { indicator: "५ वर्ष भन्दा मुनिको वृद्धि अनुगमन (पटक)", count_71_72: null, count_72_73: null, count_73_74: null },
  { indicator: "गर्भवती महिलाहरुका लागि आइरन चक्की बितरण (जना)", count_71_72: 6485, count_72_73: 3166, count_73_74: 11592 },
  { indicator: "गर्भवती महिलाहरुले प्राप्त गरेको जुकाको औषधी (जना)", count_71_72: 18081, count_72_73: 5515, count_73_74: 18081 },
  { indicator: "सुत्केरी भएका महिलाहरुका लागि भिटामिन ए वितरण (जना)", count_71_72: 5375, count_72_73: 2627, count_73_74: 7149 },
  { indicator: "६ महिना देखि ५ वर्षसम्मका बच्चाहरुलाई खुवाइएको भिटामिन ए (जना)", count_71_72: 34584, count_72_73: 58189, count_73_74: 168840 },
  { indicator: "१ देखि ५ वर्ष सम्मका बच्चाहरुलाई खुवाएको जुकाको औषधी (जना)", count_71_72: 36485, count_72_73: 58040, count_73_74: 135528 }
];

export const familyHealthSeed: FamilyHealthStatus[] = [
  { ward_number: "वडा १", healthy: 1891, common_ill: 4, chronic_ill: 21, not_mentioned: 550, total: 2466 },
  { ward_number: "वडा २", healthy: 2991, common_ill: 232, chronic_ill: 8, not_mentioned: 9, total: 3240 },
  { ward_number: "वडा ३", healthy: 3271, common_ill: 87, chronic_ill: 6, not_mentioned: 18, total: 3382 },
  { ward_number: "वडा ४", healthy: 3079, common_ill: 47, chronic_ill: 71, not_mentioned: 19, total: 3216 },
  { ward_number: "वडा ५", healthy: 3208, common_ill: 25, chronic_ill: 16, not_mentioned: 110, total: 3359 },
  { ward_number: "वडा ६", healthy: 2353, common_ill: 19, chronic_ill: 5, not_mentioned: 24, total: 2409 },
  { ward_number: "वडा ७", healthy: 3916, common_ill: 29, chronic_ill: 11, not_mentioned: 117, total: 4073 },
  { ward_number: "वडा ८", healthy: 2956, common_ill: 7, chronic_ill: 0, not_mentioned: 4, total: 2967 }
];
