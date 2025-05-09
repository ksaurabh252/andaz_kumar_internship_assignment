import type { Metadata } from "next";
import DoctorsPage from "./components/DoctorsPage";

export const metadata: Metadata = {
  title: "General Physician | Apollo247 Clone",
  description:
    "Book appointments with top General Physicians and Internal Medicine Specialists",
  openGraph: {
    title: "General Physician | Apollo247 Clone",
    description:
      "Book appointments with top General Physicians and Internal Medicine Specialists",
    type: "website",
  },
  other: {
    "script:ld+json": JSON.stringify({
      "@context": "https://schema.org",
      "@type": "MedicalOrganization",
      name: "Apollo247",
      medicalSpecialty: "General Physician",
    }),
  },
};
interface PageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Home({ searchParams }: PageProps) {
  const searchParamsResolved = await searchParams;

  return (
    <>
      <DoctorsPage searchParams={searchParamsResolved} />{" "}
    </>
  );
}
