import Head from "next/head";
import DoctorsPage from "./components/DoctorsPage";
import Navbar from "./components/Navbar";

interface PageProps {
  searchParams?: {
    search?: string;
    page?: string;
  };
}

export default function Home({ searchParams }: PageProps) {
  return (
    <>
      <Head>
        <title>General Physician | Apollo247 Clone</title>{" "}
        <meta
          name="description"
          content="Book appointments with top General Physicians and Internal Medicine Specialists"
        />{" "}
        <meta
          property="og:title"
          content="General Physician | Apollo247 Clone"
        />
        <meta
          property="og:description"
          content="Book appointments with top General Physicians and Internal Medicine Specialists"
        />
        <meta property="og:type" content="website" />{" "}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "MedicalOrganization",
            name: "Apollo247",
            medicalSpecialty: "General Physician",
          })}
        </script>
      </Head>
      <Navbar /> <DoctorsPage searchParams={searchParams} />{" "}
    </>
  );
}
