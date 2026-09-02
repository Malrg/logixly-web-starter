import type { Metadata } from "next";
import { Contact } from "@/components/contact";
import { FAQ } from "@/components/faq";
import { PageHero } from "@/components/page-hero";
export const metadata: Metadata = { title: "Contacto", description: "Solicita una propuesta para tu nueva página web o proyecto digital." };
export default function ContactPage() { return <><PageHero eyebrow="Hablemos" title="Tu próximo proyecto empieza aquí" description="Comparte el contexto, los objetivos y el plazo. Te ayudaremos a definir el siguiente paso." /><Contact /><FAQ /></>; }
