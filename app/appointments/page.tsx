import { Metadata } from "next";
import { SitePage } from "@/components/site-chrome";
import { SubmissionForm } from "@/components/submission-form";

export const metadata: Metadata = {
  title: "अनलाइन अपोइन्टमेन्ट",
  description: "रौतामाई गाउँपालिका स्वास्थ्य शाखामा अनलाइन अपोइन्टमेन्ट लिनुहोस् — सरल, सुलभ र तुरुन्तै।",
  keywords: ["अनलाइन अपोइन्टमेन्ट", "Online Appointment", "Health Appointment Rautamai", "स्वास्थ्य अपोइन्टमेन्ट"]
};

export default function AppointmentsPage() {
  return (
    <SitePage title="अनलाइन अपोइन्टमेन्ट अनुरोध">
      <SubmissionForm
        endpoint="/api/appointments"
        fields={[
          ["full_name", "नाम", "text", true],
          ["phone", "फोन", "tel", true],
          ["service", "सेवा प्रकार", "text", true],
          ["preferred_date", "इच्छित मिति", "nepali-date", false]
        ]}
        textarea={["message", "थप विवरण"]}
      />
    </SitePage>
  );
}
