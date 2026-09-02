import type { Metadata } from "next";
import { Contact } from "@/components/contact";
import { PageHero } from "@/components/page-hero";
import { Portfolio } from "@/components/portfolio";
export const metadata: Metadata = { title: "Proyectos", description: "Casos de uso y proyectos digitales creados para distintos sectores." };
export default function ProjectsPage() { return <><PageHero eyebrow="Proyectos" title="Una arquitectura, múltiples posibilidades" description="Demostraciones conceptuales para salud, restauración, tecnología y servicios profesionales." /><Portfolio /><Contact /></>; }
