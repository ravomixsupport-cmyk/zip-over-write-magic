import Layout from "@/components/Layout";
import useSEO from "@/hooks/useSEO";
import screenshotHome from "@/assets/screenshot-home.webp";
import screenshotApplications from "@/assets/screenshot-applications.webp";
import screenshotComplaints from "@/assets/screenshot-complaints.webp";
import screenshotTools from "@/assets/screenshot-tools.webp";
import screenshotForm from "@/assets/screenshot-form.webp";
import screenshotGst from "@/assets/screenshot-gst.webp";
import screenshotSettings from "@/assets/screenshot-settings.webp";
import screenshotGuide from "@/assets/screenshot-guide.webp";

const screenshots = [
  { title: "Home Dashboard", src: screenshotHome },
  { title: "Applications List", src: screenshotApplications },
  { title: "Complaints List", src: screenshotComplaints },
  { title: "Utility Tools", src: screenshotTools },
  { title: "Application Form", src: screenshotForm },
  { title: "GST Calculator", src: screenshotGst },
  { title: "Settings", src: screenshotSettings },
  { title: "Guide", src: screenshotGuide },
];

const PlayStoreAssets = () => {
  useSEO({
    title: "Play Store Assets — Ravomix Android App Screenshots",
    description: "Preview Ravomix Android app screenshots and feature graphics used on the Google Play Store listing.",
    path: "/playstore-assets",
  });
  return (
    <Layout>
      <div className="px-4 pt-4 md:px-6 lg:px-8 pb-8">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Play Store Assets</h1>
          <p className="text-sm text-muted-foreground">Preview screens for app store listing (Dark Mode)</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 max-w-5xl">
          {screenshots.map((s) => (
            <div key={s.title} className="rounded-2xl border border-border bg-card overflow-hidden shadow-md">
              <img src={s.src} alt={s.title} className="w-full h-auto" loading="lazy" />
              <p className="text-xs font-semibold text-center py-2 text-foreground">{s.title}</p>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default PlayStoreAssets;
