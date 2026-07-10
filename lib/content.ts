export type Notice = {
  title: string;
  category: string;
  date: string;
  body: string;
};

export type Program = {
  title: string;
  summary: string;
};

export type Institution = {
  name: string;
  type: string;
  address: string;
  phone: string;
  serviceTime: string;
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
