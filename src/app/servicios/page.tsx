import type { Metadata } from "next";
import { Contact } from "@/components/contact";
import { PageHero } from "@/components/page-hero";
import { Services } from "@/components/services";
export const metadata: Metadata = { title: "Servicios", description: "Diseño web, e-commerce, automatización y ciberseguridad para empresas que quieren crecer." };
export default function ServicesPage() { return <><PageHero eyebrow="Servicios" title="Soluciones digitales con una base sólida" description="Selecciona los bloques que necesita cada cliente y personalízalos sin comprometer la calidad técnica." /><Services /><Contact /></>; }
