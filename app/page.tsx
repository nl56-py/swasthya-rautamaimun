import Image from "next/image";
import Link from "next/link";
import {
  Activity,
  Bell,
  CalendarPlus,
  Download,
  FileText,
  HeartPulse,
  Mail,
  MapPin,
  Newspaper,
  Phone,
  ShieldAlert,
  Users
} from "lucide-react";
import { SiteHeader, SiteFooter } from "@/components/site-chrome";
import { SubmissionForm } from "@/components/submission-form";
import { InstitutionMap } from "@/components/institution-map";
import { slugify } from "@/lib/slug";
import {
  fetchBranchContact,
  fetchAboutText,
  fetchNotices,
  fetchInstitutions,
  fetchPrograms,
  fetchDownloads,
  fetchReports,
  fetchEmergencyContacts,
  fetchGalleryItems,
  fetchCitizenCharter,
  fetchBlogs,
  fetchVideos
} from "@/lib/db-fetch";

export default async function HomePage() {
  const branchContact = await fetchBranchContact();
  const notices = await fetchNotices();
  const institutions = await fetchInstitutions();
  const programs = await fetchPrograms();
  const downloads = await fetchDownloads();
  const reports = await fetchReports();
  const emergencyContacts = await fetchEmergencyContacts();
  const galleryItems = await fetchGalleryItems();
  const citizenCharter = await fetchCitizenCharter();
  const blogs = await fetchBlogs();
  const videos = await fetchVideos();

  return (
    <main>
      <SiteHeader />
      <Hero branchContact={branchContact} emergencyContacts={emergencyContacts} />
      <NoticeNews notices={notices} />
      <BlogsPreviewSection blogs={blogs} />
      <VideosPreviewSection videos={videos} />
      <InstitutionSection institutions={institutions} branchContact={branchContact} />
      <ProgramsSection programs={programs} />
      <ReportsDownloads reports={reports} downloads={downloads} />
      <FormsSection />
      <EmergencySection emergencyContacts={emergencyContacts} />
      <GalleryContact galleryItems={galleryItems} branchContact={branchContact} />
      <CitizenCharter citizenCharter={citizenCharter} />
      <SiteFooter />
    </main>
  );
}

function Hero({
  branchContact,
  emergencyContacts
}: {
  branchContact: any;
  emergencyContacts: any[];
}) {
  return (
    <section id="home" className="bg-white">
      <div className="container-civic grid gap-6 py-8 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="civic-card overflow-hidden">
          <div className="bg-[var(--civic-navy)] px-5 py-3 text-white">
            <p className="text-sm font-bold">स्वास्थ्य शाखाको परिचय</p>
          </div>
          <div className="grid gap-6 p-6 md:grid-cols-[1fr_220px]">
            <div>
              <h2 className="text-3xl font-extrabold leading-tight text-[var(--civic-navy)]">
                समुदायमै गुणस्तरीय, पहुँचयोग्य र उत्तरदायी स्वास्थ्य सेवा
              </h2>
              <p className="mt-4 leading-8 text-slate-700">
                रौतामाई गाउँपालिकाको स्वास्थ्य शाखाले स्वास्थ्य संस्था समन्वय, मातृ तथा शिशु स्वास्थ्य, खोप, पोषण, रोग नियन्त्रण,
                स्वास्थ्य तथ्याङ्क, आकस्मिक सेवा सूचना र नागरिक गुनासो व्यवस्थापनका कार्यहरू सञ्चालन गर्छ।
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link href="/appointments" className="rounded-md bg-[var(--civic-red)] px-4 py-2 font-bold text-white">अपोइन्टमेन्ट अनुरोध</Link>
                <Link href="/grievance" className="rounded-md border border-[var(--civic-blue)] px-4 py-2 font-bold text-[var(--civic-blue)]">गुनासो पठाउनुहोस्</Link>
              </div>
            </div>
            <div id="chief" className="rounded-md border border-slate-200 bg-slate-50 p-4 text-center">
              <Image src="/ram.jfif" alt="स्वास्थ्य इकाई प्रमुख" width={180} height={176} className="mx-auto h-40 w-40 rounded-md object-cover" />
              <p className="mt-3 font-extrabold text-[var(--civic-navy)]">{branchContact.chief}</p>
              <p className="text-sm text-slate-600">{branchContact.chiefTitle}</p>
            </div>
          </div>
        </div>
        <div className="grid gap-4">
          {emergencyContacts.slice(0, 3).map((item) => (
            <div key={item.title} className="civic-card border-l-4 border-l-[var(--civic-red)] p-4">
              <p className="text-sm font-bold text-slate-500">{item.title}</p>
              <p className="mt-1 text-2xl font-extrabold text-[var(--civic-navy)]">{item.phone}</p>
              <p className="text-sm text-slate-600">{item.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NoticeNews({ notices }: { notices: any[] }) {
  return (
    <section id="notices" className="py-10">
      <div className="container-civic grid gap-6 lg:grid-cols-[1fr_0.7fr]">
        <div className="civic-card p-5">
          <h2 className="section-title">प्रमुख सूचना तथा समाचार</h2>
          <div className="mt-5 grid gap-4">
            {notices.map((notice) => (
              <Link key={notice.title} href={`/notices/${slugify(notice.title)}`} className="block border-b border-slate-200 pb-4 last:border-0 last:pb-0">
                <div className="flex flex-wrap items-center gap-3 text-sm">
                  <span className="rounded bg-[var(--civic-red)] px-2 py-1 font-bold text-white">{notice.category}</span>
                  <span className="font-semibold text-slate-500">{notice.date}</span>
                </div>
                <h3 className="mt-2 text-lg font-extrabold text-[var(--civic-navy)]">{notice.title}</h3>
                <p className="mt-1 text-slate-600">{notice.body}</p>
              </Link>
            ))}
          </div>
        </div>
        <div className="civic-card p-5">
          <h2 className="section-title">सूचना पाटी</h2>
          <div className="mt-5 space-y-3">
            {["परिपत्र", "निर्देशिका", "कार्यविधि", "वार्षिक प्रतिवेदन", "स्वास्थ्य प्रोफाइल"].map((item) => (
              <div key={item} className="flex items-center justify-between rounded border border-slate-200 bg-slate-50 px-3 py-3">
                <span className="font-bold">{item}</span>
                <FileText size={18} className="text-[var(--civic-red)]" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BlogsPreviewSection({ blogs }: { blogs: any[] }) {
  if (blogs.length === 0) return null;
  return (
    <section className="py-10 bg-slate-50 border-y border-slate-200">
      <div className="container-civic">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">स्वास्थ्य सन्देश तथा ब्लगहरू</h2>
          <Link href="/blogs" className="rounded-md bg-[var(--civic-blue)] px-4 py-2 text-xs font-bold text-white hover:bg-opacity-90">
            सबै ब्लगहरू हेर्नुहोस् &rarr;
          </Link>
        </div>
        {/* Horizontal scroll on desktop, vertical list on mobile */}
        <div className="flex flex-col md:flex-row gap-6 md:overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-300">
          {blogs.map((blog) => (
            <article key={blog.id} className="civic-card bg-white overflow-hidden hover:shadow-md transition-shadow flex flex-col w-full md:w-[320px] md:shrink-0 border border-slate-200">
              {blog.cover_image_url && (
                <div className="relative aspect-[16/10] bg-slate-100 shrink-0">
                  <img src={blog.cover_image_url} alt={blog.title} className="h-full w-full object-cover" />
                </div>
              )}
              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-[11px] text-slate-500 font-semibold mb-2">
                    {new Date(blog.published_at).toLocaleDateString("ne-NP")}
                  </p>
                  <h3 className="font-extrabold text-sm text-[var(--civic-navy)] line-clamp-2 hover:text-[var(--civic-red)] transition-colors leading-snug">
                    <Link href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                  </h3>
                </div>
                <Link href={`/blogs/${blog.slug}`} className="mt-3 inline-block font-bold text-xs text-[var(--civic-blue)] hover:underline">
                  थप पढ्नुहोस् &rarr;
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function VideosPreviewSection({ videos }: { videos: any[] }) {
  const featuredVideos = videos.slice(0, 3);
  if (featuredVideos.length === 0) return null;
  return (
    <section className="py-10 bg-white border-b border-slate-200">
      <div className="container-civic">
        <div className="flex items-center justify-between mb-6">
          <h2 className="section-title">स्वास्थ्य सचेतना भिडियोहरू</h2>
          <Link href="/videos" className="rounded-md bg-[var(--civic-red)] px-4 py-2 text-xs font-bold text-white hover:bg-opacity-90">
            सबै भिडियोहरू हेर्नुहोस् &rarr;
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredVideos.map((video) => {
            const embedUrl = getEmbedUrl(video.youtube_url);
            return (
              <div key={video.id} className="civic-card overflow-hidden bg-white flex flex-col h-full border border-slate-200">
                <div className="relative aspect-video w-full bg-slate-200">
                  {embedUrl ? (
                    <iframe
                      src={embedUrl}
                      title={video.title}
                      className="absolute inset-0 h-full w-full border-0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div className="grid h-full place-items-center text-xs text-slate-400">Preview</div>
                  )}
                </div>
                <div className="p-4 flex-1 flex flex-col justify-center">
                  <h3 className="font-extrabold text-[var(--civic-navy)] leading-snug line-clamp-2 text-sm">
                    {video.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function InstitutionSection({ institutions, branchContact }: { institutions: any[]; branchContact: any }) {
  return (
    <section id="institutions" className="py-10">
      <div className="container-civic">
        <h2 className="section-title">स्वास्थ्य संस्थाहरूको विवरण</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3 mb-6">
          {institutions.map((item) => (
            <div key={item.name} className="civic-card p-5 bg-white border border-slate-200">
              <MapPin className="text-[var(--civic-red)]" />
              <h3 className="mt-3 font-extrabold text-[var(--civic-navy)]">{item.name}</h3>
              <p className="text-sm font-bold text-slate-500">{item.type}</p>
              <p className="mt-3 text-sm text-slate-600">{item.address}</p>
              <p className="mt-2 text-sm">{item.phone}</p>
              <p className="mt-2 rounded bg-slate-100 px-3 py-2 text-sm font-bold">{item.serviceTime}</p>
            </div>
          ))}
        </div>
        <InstitutionMap institutions={institutions} branchMapUrl={branchContact.map_url} />
      </div>
    </section>
  );
}

function ProgramsSection({ programs }: { programs: any[] }) {
  return (
    <section id="programs" className="bg-white py-10">
      <div className="container-civic">
        <h2 className="section-title">कार्यक्रम तथा सेवाहरू</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((program, index) => (
            <Link key={program.title} href={`/programs/${slugify(program.title)}`} className="civic-card block p-5 hover:border-[var(--civic-blue)]">
              <div className="grid h-11 w-11 place-items-center rounded bg-[var(--civic-blue)] text-white">
                {index % 2 === 0 ? <HeartPulse size={22} /> : <Activity size={22} />}
              </div>
              <h3 className="mt-4 font-extrabold text-[var(--civic-navy)]">{program.title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{program.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function ReportsDownloads({ reports, downloads }: { reports: any[]; downloads: any[] }) {
  return (
    <section id="reports" className="py-10">
      <div className="container-civic grid gap-6 lg:grid-cols-2">
        <div className="civic-card p-5">
          <h2 className="section-title">तथ्याङ्क तथा प्रतिवेदन</h2>
          <div className="mt-5 grid grid-cols-2 gap-4">
            {reports.map((item) => (
              <Link href="/reports" key={item.title} className="block rounded border border-slate-200 bg-slate-50 p-4 hover:border-[var(--civic-blue)] transition-colors">
                <Newspaper className="text-[var(--civic-red)]" />
                <p className="mt-3 font-bold">{item.title}</p>
              </Link>
            ))}
          </div>
        </div>
        <div id="downloads" className="civic-card p-5">
          <h2 className="section-title">डाउनलोड केन्द्र</h2>
          <div className="mt-5 space-y-3">
            {downloads.map((item) => (
              <a key={item.title} href={item.fileUrl || "#"} className="flex w-full items-center justify-between rounded border border-slate-200 px-3 py-3 text-left font-bold hover:border-[var(--civic-blue)]">
                {item.title}
                <Download size={18} className="text-[var(--civic-blue)]" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FormsSection() {
  return (
    <section id="forms" className="bg-white py-10">
      <div className="container-civic grid gap-6 lg:grid-cols-2">
        <SubmissionForm
          id="grievance-form"
          endpoint="/api/grievances"
          title="अनलाइन गुनासो फाराम"
          icon={<ShieldAlert />}
          fields={[
            ["full_name", "नाम", "text", false],
            ["phone", "फोन", "tel", false],
            ["category", "गुनासो विषय", "text", false]
          ]}
          textarea={["message", "गुनासो विवरण"]}
        />
        <SubmissionForm
          id="appointment-form"
          endpoint="/api/appointments"
          title="अनलाइन अपोइन्टमेन्ट अनुरोध"
          icon={<CalendarPlus />}
          fields={[
            ["full_name", "नाम", "text", true],
            ["phone", "फोन", "tel", true],
            ["service", "सेवा प्रकार", "text", true],
            ["preferred_date", "इच्छित मिति", "date", false]
          ]}
          textarea={["message", "थप विवरण"]}
        />
      </div>
    </section>
  );
}

function EmergencySection({ emergencyContacts }: { emergencyContacts: any[] }) {
  return (
    <section id="emergency" className="py-10">
      <div className="container-civic">
        <h2 className="section-title">आकस्मिक सेवा जानकारी</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-4">
          {emergencyContacts.map((item) => (
            <div key={item.title} className="civic-card p-5">
              <Bell className="text-[var(--civic-red)]" />
              <h3 className="mt-3 font-extrabold text-[var(--civic-navy)]">{item.title}</h3>
              <p className="mt-2 text-xl font-extrabold">{item.phone}</p>
              <p className="text-sm text-slate-600">{item.details}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GalleryContact({ galleryItems, branchContact }: { galleryItems: string[]; branchContact: any }) {
  const placeholders = ["स्वास्थ्य शिविर", "खोप अभियान", "स्वास्थ्य सचेतना भिडियो"];
  const filteredItems = galleryItems.filter((item) => !placeholders.includes(item));

  return (
    <section id="gallery" className="bg-white py-10">
      <div className="container-civic grid gap-6 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <h2 className="section-title">स्वास्थ्य गतिविधि, शिविर तथा सचेतना ग्यालरी</h2>
          {filteredItems.length === 0 ? (
            <div className="mt-6 p-8 border border-dashed border-slate-300 bg-slate-50 text-slate-500 font-bold text-center rounded-md">
              हाल कुनै फोटो तथा भिडियोहरू उपलब्ध छैनन्, चाँडै अद्यावधिक गरिनेछ।
            </div>
          ) : (
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              {filteredItems.map((item) => (
                <div key={item} className="civic-card aspect-[4/3] overflow-hidden">
                  <div className="grid h-full place-items-center bg-slate-100 p-4 text-center font-extrabold text-[var(--civic-navy)]">
                    {item}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        <div id="contact" className="civic-card p-5">
          <h2 className="section-title">सम्पर्क गर्नुहोस्</h2>
          <div className="mt-5 space-y-3 text-slate-700">
            <p className="flex gap-2"><MapPin className="text-[var(--civic-red)]" /> {branchContact.address}</p>
            <p className="flex gap-2"><Phone className="text-[var(--civic-red)]" /> {branchContact.phone}</p>
            <p className="flex gap-2"><Mail className="text-[var(--civic-red)]" /> {branchContact.email}</p>
            <p className="font-bold text-[var(--civic-blue)]">Social Media Links</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CitizenCharter({ citizenCharter }: { citizenCharter: any[] }) {
  return (
    <section className="py-10">
      <div className="container-civic">
        <h2 className="section-title">नागरिक बडापत्र</h2>
        <div className="civic-card mt-6 overflow-x-auto">
          <table className="w-full min-w-[680px] border-collapse text-left">
            <thead className="bg-[var(--civic-navy)] text-white">
              <tr>
                <th className="p-3">उपलब्ध सेवा</th>
                <th className="p-3">सेवा शुल्क</th>
                <th className="p-3">सेवा प्रदान गर्ने समय</th>
              </tr>
            </thead>
            <tbody>
              {citizenCharter.map((item) => (
                <tr key={item.service} className="border-b border-slate-200">
                  <td className="p-3 font-bold">{item.service}</td>
                  <td className="p-3">{item.fee}</td>
                  <td className="p-3">{item.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

function getEmbedUrl(url: string) {
  let videoId = "";
  try {
    const urlObj = new URL(url);
    if (urlObj.hostname === "youtu.be") {
      videoId = urlObj.pathname.slice(1);
    } else if (urlObj.hostname.includes("youtube.com")) {
      videoId = urlObj.searchParams.get("v") || "";
      if (!videoId && urlObj.pathname.startsWith("/embed/")) {
        videoId = urlObj.pathname.slice(7);
      }
    }
  } catch (e) {
    const match = url.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
    if (match) videoId = match[1];
  }
  return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
}


