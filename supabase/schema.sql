create extension if not exists pgcrypto;

create table if not exists site_sections (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  body text,
  metadata jsonb default '{}',
  updated_at timestamptz default now()
);

create table if not exists staff (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  role text not null,
  email text,
  phone text,
  photo_url text,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists health_institutions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  type text not null,
  address text,
  phone text,
  service_time text,
  map_url text,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists notices (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  body text,
  published_at date default current_date,
  file_url text,
  is_featured boolean default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists programs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  summary text not null,
  icon text,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists downloads (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  file_url text,
  sort_order int default 0,
  updated_at timestamptz default now()
);

create table if not exists emergency_contacts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  phone text not null,
  details text,
  sort_order int default 0,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  media_type text default 'photo',
  media_url text,
  thumbnail_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

create table if not exists citizen_charter (
  id uuid primary key default gen_random_uuid(),
  service text not null,
  fee text not null,
  service_time text not null,
  sort_order int default 0,
  updated_at timestamptz default now()
);

create table if not exists grievances (
  id uuid primary key default gen_random_uuid(),
  full_name text,
  phone text,
  email text,
  category text,
  message text not null,
  status text default 'new' check (status in ('new', 'in_review', 'resolved', 'closed')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists appointments (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  phone text not null,
  service text not null,
  preferred_date date,
  message text,
  status text default 'requested' check (status in ('requested', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

alter table site_sections enable row level security;
alter table staff enable row level security;
alter table health_institutions enable row level security;
alter table notices enable row level security;
alter table programs enable row level security;
alter table downloads enable row level security;
alter table emergency_contacts enable row level security;
alter table gallery_items enable row level security;
alter table citizen_charter enable row level security;
alter table grievances enable row level security;
alter table appointments enable row level security;

create policy "public read site sections" on site_sections for select using (true);
create policy "public read staff" on staff for select using (true);
create policy "public read health institutions" on health_institutions for select using (true);
create policy "public read notices" on notices for select using (true);
create policy "public read programs" on programs for select using (true);
create policy "public read downloads" on downloads for select using (true);
create policy "public read emergency contacts" on emergency_contacts for select using (true);
create policy "public read gallery items" on gallery_items for select using (true);
create policy "public read citizen charter" on citizen_charter for select using (true);

create policy "public create grievances" on grievances for insert with check (true);
create policy "public create appointments" on appointments for insert with check (true);

create policy "authenticated manage site sections" on site_sections for all to authenticated using (true) with check (true);
create policy "authenticated manage staff" on staff for all to authenticated using (true) with check (true);
create policy "authenticated manage health institutions" on health_institutions for all to authenticated using (true) with check (true);
create policy "authenticated manage notices" on notices for all to authenticated using (true) with check (true);
create policy "authenticated manage programs" on programs for all to authenticated using (true) with check (true);
create policy "authenticated manage downloads" on downloads for all to authenticated using (true) with check (true);
create policy "authenticated manage emergency contacts" on emergency_contacts for all to authenticated using (true) with check (true);
create policy "authenticated manage gallery items" on gallery_items for all to authenticated using (true) with check (true);
create policy "authenticated manage citizen charter" on citizen_charter for all to authenticated using (true) with check (true);
create policy "authenticated manage grievances" on grievances for all to authenticated using (true) with check (true);
create policy "authenticated manage appointments" on appointments for all to authenticated using (true) with check (true);

create table if not exists blogs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  content text not null, -- rich text HTML
  cover_image_url text,
  published_at timestamptz default now(),
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table if not exists videos (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  youtube_url text not null,
  is_reel boolean default false,
  sort_order int default 0,
  created_at timestamptz default now()
);

alter table blogs enable row level security;
alter table videos enable row level security;

create policy "public read blogs" on blogs for select using (true);
create policy "public read videos" on videos for select using (true);

create policy "authenticated manage blogs" on blogs for all to authenticated using (true) with check (true);
create policy "authenticated manage videos" on videos for all to authenticated using (true) with check (true);

-- Seed blogs
insert into blogs (title, slug, content, cover_image_url, published_at) values
(
  'नेपालमा सरकारी स्वास्थ्य बीमा कार्यक्रम: प्रक्रिया, शुल्क र फाइदाहरू',
  'government-health-insurance-nepal',
  '<h1>सरकारी स्वास्थ्य बीमा कार्यक्रम: प्रक्रिया, शुल्क र फाइदाहरू</h1><p>नेपाल सरकारले नागरिकहरूको स्वास्थ्य उपचारमा सहज पहुँच पुऱ्याउन र सम्भावित आर्थिक संकटबाट जोगाउन स्वास्थ्य बीमा कार्यक्रम सुरु गरेको छ। यस लेखमा हामी स्वास्थ्य बीमा बोर्ड (HIB) अन्तर्गतको स्वास्थ्य बीमा कसरी गर्ने, यसको शुल्क कति लाग्छ र यसका फाइदाहरू के-के हुन् भन्नेबारे विस्तृत जानकारी दिनेछौं।</p><h2>१. स्वास्थ्य बीमा के हो?</h2><p>स्वास्थ्य बीमा भनेको बिरामी पर्दा लाग्ने उपचार खर्चको व्यवस्थापन गर्ने एक सहकारी मोडेल हो। यस अन्तर्गत, बीमित परिवारले निश्चित वार्षिक योगदान रकम तिरेपछि सरकारले तोकेको सीमासम्मको स्वास्थ्य उपचार सेवा निःशुल्क प्राप्त गर्दछन्।</p><h2>२. दर्ता प्रक्रिया र आवश्यक कागजातहरू</h2><p>स्वास्थ्य बीमा गराउनका लागि तपाईंको वडामा खटिएका दर्ता सहयोगी (Enrollment Assistant) मार्फत दर्ता गर्न सकिन्छ। यसका लागि निम्न कागजातहरू आवश्यक पर्छन्:</p><ul><li>घरका सम्पूर्ण सदस्यहरूको नागरिकता वा जन्मदर्ताको प्रतिलिपि</li><li>पासपोर्ट साइजको फोटो</li><li>यदि जेष्ठ नागरिक, विपन्न वा अपाङ्गता भएका सदस्य हुनुहुन्छ भने सम्बन्धित परिचयपत्र</li></ul><h2>३. बीमा शुल्क (योगदान रकम) र उपचार सुविधाको सीमा</h2><p>५ जनासम्मको परिवारका लागि वार्षिक ३,५०० रुपैयाँ योगदान रकम तिर्नुपर्छ। यसबापत परिवारले वार्षिक १ लाख रुपैयाँसम्मको स्वास्थ्य उपचार सेवा निःशुल्क पाउँछ। ५ जनाभन्दा बढी सदस्य भएमा प्रति सदस्य थप ७०० रुपैयाँ तिर्नुपर्छ र प्रति सदस्य उपचार सीमा २० हजारले बढ्छ (अधिकतम २ लाख रुपैयाँसम्म)।</p><h2>४. नि:शुल्क उपचार गरिने सेवाहरू</h2><p>यस बीमा अन्तर्गत तोकिएका सरकारी र सामुदायिक अस्पतालहरूबाट ओपिडी (OPD), आकस्मिक सेवा, ल्याब टेस्ट, एक्स-रे, अपरेशन र तोकिएका औषधिहरू निःशुल्क पाइन्छ।</p>',
  '/health_insurance_cover.png',
  now()
),
(
  'जीवन बीमा भनेको के हो? यसको प्रक्रिया र फाइदाहरू',
  'life-insurance-process-benefits-nepal',
  '<h1>जीवन बीमा: सुरक्षित भविष्य र वित्तीय योजना</h1><p>जीवन बीमा आफ्नो र आफ्नो परिवारको सुरक्षित भविष्यको लागि गरिने एक महत्वपूर्ण सम्झौता हो। यस लेखमा जीवन बीमाको आवश्यकता, यसको प्रक्रिया र फाइदाहरूबारे चर्चा गरिएको छ।</p><h2>१. जीवन बीमाका प्रकारहरू</h2><ul><li>साबधिक जीवन बीमा (Endowment Policy): निश्चित अवधिको लागि गरिने र अवधि समाप्त भएपछि सावाँ र बोनस फिर्ता हुने।</li><li>आजीवन जीवन बीमा (Whole Life Policy): बीमितको मृत्यु भएपछि मात्र हकवालाले रकम पाउने।</li><li>म्यादी जीवन बीमा (Term Life Policy): निश्चित अवधिको लागि मात्र वित्तीय जोखिम बहन गर्ने।</li></ul><h2>३. सरकारी प्रक्रिया र नियमन</h2><p>नेपालमा सञ्चालित सबै बीमा कम्पनीहरू नेपाल बीमा प्राधिकरण (Nepal Insurance Authority) बाट इजाजतपत्र प्राप्त र नियमन गरिएका हुन्छन्। ग्राहकहरूले बीमा गर्नुअघि कम्पनी प्राधिकरणमा दर्ता भएको निश्चित गर्नुपर्छ।</p>',
  '/life_insurance_cover.png',
  now()
),
(
  'पारिवारिक स्वास्थ्य र यसको हेरचाह कसरी गर्ने?',
  'family-health-care-tips',
  '<h1>पारिवारिक स्वास्थ्य र हेरचाहका व्यावहारिक उपायहरू</h1><p>स्वस्थ परिवार नै समृद्ध समाजको आधार हो। परिवारका सबै सदस्यहरूलाई स्वस्थ राख्नका लागि दैनिक जीवनमा केही सजिला बानीहरू अपनाउन सकिन्छ।</p><h2>१. सन्तुलित र स्वच्छ खानपान</h2><p>घरको खानामा जोड दिने, हरियो सागसब्जी र फलफूल नियमित रूपमा समावेश गर्ने। जंक फुड र बढी चिनीयुक्त पेय पदार्थबाट टाढा रहने।</p><h2>२. शारीरिक व्यायाम र योग</h2><p>दैनिक कम्तिमा ३० मिनेट हिँड्ने, योग गर्ने वा शारीरिक व्यायाममा संलग्न हुने। यसले मुटु र मानसिक स्वास्थ्य राम्रो राख्छ।</p><h2>३. नियमित स्वास्थ्य परीक्षण</h2><p>वर्षमा कम्तिमा एक पटक सम्पूर्ण शरीरको जाँच (Full Body Checkup) गराउने। यसले सम्भावित रोगहरू सुरुवाती अवस्थामै पत्ता लगाउन मद्दत गर्छ।</p>',
  '/family_health_cover.png',
  now()
),
(
  'हैजा (Cholera) बाट कसरी बच्ने? कारण, लक्षण र उपचार',
  'cholera-prevention-treatment-nepal',
  '<h1>हैजा (Cholera) संक्रमण: सतर्कता र प्राथमिक उपचार</h1><p>हैजा एक तीव्र संक्रामक झाडापखाला रोग हो, जुन भाइब्रियो कोलेरी (Vibrio cholerae) नामक जीवाणुका कारण लाग्ने गर्छ। यो दुषित पानी र खानाको माध्यमबाट फैलिन्छ।</p><h2>१. हैजाका मुख्य लक्षणहरू</h2><ul><li>अचानक तारन्तार पानी जस्तो पातलो दिसा हुनु</li><li>वान्ता हुनु</li><li>शरीरको पानी खेर गई जलवियोजन (Dehydration) हुनु</li><li>मांसपेशी बाउँडिनु र थकाई लाग्नु</li></ul><h2>२. रोकथामका उपायहरू</h2><p>सधैं उमालेको वा क्लोरिन हालेको शुद्ध पानी मात्र पिउने। खाना खानुअघि र शौच गरेपछि साबुन पानीले हात धुने बानी बसाल्ने। बासी, सडेगलेको वा झिंगा भन्केको खाना नखाने।</p><h2>३. प्राथमिक उपचार</h2><p>बिरामीलाई तत्कालै जीवनजल (ORS) पानी प्रशस्त मात्रामा दिने र तुरुन्त नजिकैको स्वास्थ्य संस्थामा लैजाने।</p>',
  '/cholera_prevention_cover.png',
  now()
),
(
  'डेङ्गु (Dengue) संक्रमण: लक्षण, बच्ने उपाय र प्राथमिक उपचार',
  'dengue-fever-prevention-symptoms',
  '<h1>डेङ्गु संक्रमण: बच्ने उपाय र प्राथमिक उपचार</h1><p>डेङ्गु एडिस (Aedes) जातको लामखुट्टेको टोकाइबाट सर्ने एक प्रकारको भाइरल ज्वरो हो। यो लामखुट्टेले सफा र जमेको पानीमा फुल पार्छ र प्रायः दिउँसो टोक्छ।</p><h2>१. डेङ्गुका लक्षणहरू</h2><ul><li>अचानक उच्च ज्वरो आउनु</li><li>आँखाको गेडी दुख्नु र कडा टाउको दुख्नु</li><li>मांसपेशी र जोर्नीहरू दुख्नु</li><li>शरीरमा राता डाबरहरू आउनु</li></ul><h2>२. लामखुट्टे नियन्त्रणका उपायहरू</h2><p>आफ्नो घर र वरपर पानी जम्न नदिने। पानीका ट्याङ्की, बाल्टिन र गमलाहरू सधैं छोपेर राख्ने। शरीर पूरै ढाक्ने लुगा लगाउने र लामखुट्टे भगाउने क्रिम वा धूप प्रयोग गर्ने।</p><h2>३. उपचार विधि</h2><p>ज्वरो आएमा चिकित्सकको सल्लाह बिना जथाभावी एस्पिरिन वा आइबुप्रोफेन जस्ता औषधि खानु हुँदैन, यसले आन्तरिक रक्तस्राव बढाउन सक्छ। केवल सिटामोल प्रयोग गर्ने र प्रशस्त झोलिलो खानेकुरा खाने।</p>',
  '/dengue_prevention_cover.png',
  now()
),
(
  'झाडापखाला (Diarrhoea) को घरेलु उपचार र रोकथामका उपायहरू',
  'diarrhoea-treatment-prevention-nepal',
  '<h1>झाडापखाला: घरेलु उपचार र रोकथामका उपायहरू</h1><p>झाडापखाला वर्षैभरि, विशेषगरी वर्षायाममा देखिने एक आम स्वास्थ्य समस्या हो। सही समयमा उपचार नभएमा यसले ज्यान समेत लिन सक्छ।</p><h2>१. जलवियोजन (Dehydration) बाट बच्ने</h2><p>झाडापखाला हुँदा शरीरबाट नुन र पानी खेर जान्छ। यसलाई रोक्न जीवनजल (ORS) वा नुन-चिनी-पानीको घोल नियमित रूपमा पिउनुपर्छ।</p><h2>२. सरसफाईमा ध्यान दिने</h2><p>दिशा पिसाब गरिसकेपछि र खाना खानु वा बनाउनुअघि साबुन पानीले हात धुने बानी बसाल्ने। खानेकुराहरू सधैं छोपेर राख्ने।</p><h2>३. कतिबेला अस्पताल जाने?</h2><p>यदि बिरामीले दिसामा रगत देखियो, उच्च ज्वरो आयो, वा वान्ता भएर जीवनजल पिउन सकेन भने ढिला नगरी तुरुन्त अस्पताल लैजानुपर्छ।</p>',
  '/diarrhoea_rehydration_cover.png',
  now()
),
(
  'पोषणको महत्त्व: सन्तुलित भोजन र स्वस्थ जीवनशैली',
  'importance-of-nutrition-balanced-diet',
  '<h1>पोषणको महत्त्व: सन्तुलित भोजन र स्वस्थ जीवनशैली</h1><p>पोषण शरीरको वृद्धि, विकास र प्रतिरक्षा प्रणालीलाई बलियो बनाउन आवश्यक पर्ने तत्व हो। सन्तुलित भोजनले नै हामीलाई विभिन्न रोगहरूबाट टाढा राख्छ।</p><h2>१. सन्तुलित भोजनका तत्वहरू</h2><ul><li>कार्बोहाइड्रेट: ऊर्जाको लागि (चामल, गहुँ, कोदो)</li><li>प्रोटिन: मांसपेशी निर्माण र मर्मतको लागि (गेडागुडी, अन्डा, दूध)</li><li>भिटामिन र खनिज: रोग प्रतिरोधात्मक क्षमताका लागि (हरियो सागपात, फलफूल)</li></ul><h2>२. बालबालिका र गर्भवती महिलामा पोषण</h2><p>शारीरिक वृद्धि हुने समयमा बालबालिका र गर्भवती महिलालाई अतिरिक्त पोषणको आवश्यकता पर्छ। उनीहरूको खानामा हरियो सागपात, फलफूल, अण्डा, र पोषिलो लिटो नियमित रूपमा समावेश हुनुपर्छ।</p>',
  '/nutrition_balanced_diet_cover.png',
  now()
),
(
  'सामाजिक सुरक्षा कोष (SSF) र यसबाट आम नागरिकलाई हुने फाइदाहरू',
  'social-security-fund-ssf-nepal',
  '<h1>सामाजिक सुरक्षा कोष (SSF) र यसका फाइदाहरू</h1><p>नेपाल सरकारले अनौपचारिक र औपचारिक क्षेत्रका श्रमिकहरूका लागि योगदानमा आधारित सामाजिक सुरक्षा योजना सुरु गरेको छ। यस लेखमा सामाजिक सुरक्षा कोष (SSF) को महत्त्वबारे व्याख्या गरिएको छ।</p><h2>१. सामाजिक सुरक्षा कोष के हो?</h2><p>यो श्रमिक र रोजगारदाताको निश्चित योगदान रकम संकलन गरी श्रमिकको उपचार, मातृत्व, दुर्घटना र पेन्सनको सुनिश्चितता गर्ने सरकारी प्रणाली हो।</p><h2>२. यसका मुख्य सुविधाहरू</h2><ul><li>औषधि उपचार, स्वास्थ्य तथा मातृत्व सुरक्षा योजना</li><li>दुर्घटना र अशक्तता सुरक्षा योजना</li><li>आश्रित परिवार सुरक्षा योजना</li><li>वृद्धावस्था सुरक्षा योजना (पेन्सन)</li></ul><h2>३. आम नागरिक र अनौपचारिक क्षेत्र</h2><p>हाल सरकारले अनौपचारिक क्षेत्र र वैदेशिक रोजगारीमा रहेका श्रमिकहरूलाई पनि कोषमा आबद्ध हुन मिल्ने गरी कार्यविधि बनाएको छ। यसले विपन्न वर्गलाई वृद्धावस्थामा ढुक्क बनाउँछ।</p>',
  '/social_security_fund_cover.png',
  now()
),
(
  'मातृ तथा शिशु स्वास्थ्य: गर्भावस्थामा ध्यान दिनुपर्ने कुराहरू',
  'maternal-child-health-care-nepal',
  '<h1>मातृ तथा शिशु स्वास्थ्य: गर्भावस्थामा ध्यान दिनुपर्ने कुराहरू</h1><p>स्वस्थ बच्चा जन्माउन र आमाको स्वास्थ्य सुरक्षित राख्न गर्भावस्थामा विशेष स्याहार र पोषणको आवश्यक पर्छ।</p><h2>१. चार पटक स्वास्थ्य परीक्षण</h2><p>गर्भावस्थामा कम्तिमा ४ पटक (४, ६, ८ र ९ महिनामा) स्वास्थ्य संस्थामा गई गर्भ परीक्षण गराउनुपर्छ र तोकिएको आइरन चक्की र फोलिक एसिड नियमित सेवन गर्नुपर्छ।</p><h2>२. उचित आराम र पोषण</h2><p>गर्भवती महिलाले गह्रौँ भारी बोक्नु हुँदैन र पर्याप्त निद्रा लिनुपर्छ। खानामा दूध, हरियो तरकारी, फलफूल र गेडागुडी नियमित खानुपर्छ।</p><h2>३. संस्थागत सुत्केरी</h2><p>सुत्केरी गराउँदा सधैं दक्ष स्वास्थ्यकर्मीको उपस्थितिमा स्वास्थ्य संस्थामा मात्र गराउनुपर्छ, जसले आमा र बच्चा दुवैको ज्यान जोखिमबाट जोगाउँछ।</p>',
  '/maternal_child_health_cover.png',
  now()
),
(
  'मानसिक स्वास्थ्य: तनाव व्यवस्थापन र यसको समाधान',
  'mental-health-stress-management',
  '<h1>मानसिक स्वास्थ्य: तनाव व्यवस्थापन र यसको समाधान</h1><p>मानसिक स्वास्थ्य शारीरिक स्वास्थ्य जत्तिकै महत्वपूर्ण छ। दैनिक जीवनको व्यस्तता र समस्याहरूका कारण मानसिक तनाव बढ्न सक्छ, जसको व्यवस्थापन बेलैमा गर्नुपर्छ।</p><h2>१. मानसिक स्वास्थ्यका संकेतहरू</h2><p>अनिद्रा, लगातार चिन्ता, रिस उठ्नु, समाजबाट टाढा बस्न मन लाग्नु मानसिक अस्वस्थताका लक्षण हुन सक्छन्।</p><h2>२. तनाव व्यवस्थापनका उपायहरू</h2><ul><li>आफ्नो भावना मिल्ने साथी वा परिवारसँग साटासाट गर्ने</li><li>नियमित रूपमा शारीरिक व्यायाम वा ध्यान (Meditation) गर्ने</li><li>कम्प्युटर वा मोबाइलको स्क्रिन समय घटाउने र प्रकृतिसँग समय बिताउने</li></ul><h2>३. परामर्श लिन नहिचकिचाउने</h2><p>यदि मानसिक तनाव आफैले कम गर्न सकिएन भने दक्ष मनोपरामर्शदाता वा चिकित्सकको सेवा लिनुपर्छ।</p>',
  '/mental_health_wellness_cover.png',
  now()
)
on conflict (slug) do nothing;

-- Seed emergency contacts
truncate table emergency_contacts;
insert into emergency_contacts (title, phone, details, sort_order) values
('स्वास्थ्य शाखा आकस्मिक सम्पर्क', '9862998884', 'स्वास्थ्य इकाई प्रमुख', 1),
('एम्बुलेन्स सेवा', '102', 'पालिका क्षेत्रभित्र उपलब्ध एम्बुलेन्स विवरण', 2),
('रक्तसञ्चार सेवा', '01-4219597', 'नेपाल रेडक्रस सोसाइटी', 3),
('सर्पदंश उपचार केन्द्र', '035-520199', 'उदयपुर जिल्ला अस्पताल', 4);

