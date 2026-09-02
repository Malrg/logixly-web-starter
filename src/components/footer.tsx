import Link from "next/link";
import { BriefcaseBusiness, Camera, Code2 } from "lucide-react";
import { Logo } from "@/components/logo";
import { navigation, siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="border-t border-border bg-secondary text-white">
      <div className="container-shell grid gap-12 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div><Logo className="text-white" /><p className="mt-5 max-w-sm text-sm leading-6 text-white/55">{siteConfig.description}</p></div>
        <div><p className="text-sm font-semibold">Navegación</p><nav className="mt-5 grid gap-3">{navigation.map((item) => <Link key={item.href} href={item.href} className="text-sm text-white/55 hover:text-white">{item.label}</Link>)}</nav></div>
        <div><p className="text-sm font-semibold">Contacto</p><div className="mt-5 grid gap-3 text-sm text-white/55"><a href={`mailto:${siteConfig.email}`} className="hover:text-white">{siteConfig.email}</a><span>{siteConfig.address}</span><div className="mt-2 flex gap-2"><a aria-label="Instagram" href={siteConfig.socials.instagram} className="rounded-full bg-white/5 p-2 hover:bg-white/10"><Camera className="size-4" /></a><a aria-label="LinkedIn" href={siteConfig.socials.linkedin} className="rounded-full bg-white/5 p-2 hover:bg-white/10"><BriefcaseBusiness className="size-4" /></a><a aria-label="GitHub" href={siteConfig.socials.github} className="rounded-full bg-white/5 p-2 hover:bg-white/10"><Code2 className="size-4" /></a></div></div></div>
      </div>
      <div className="border-t border-white/10"><div className="container-shell flex flex-col gap-2 py-5 text-xs text-white/40 sm:flex-row sm:justify-between"><p>© {new Date().getFullYear()} {siteConfig.commercialName}. Todos los derechos reservados.</p><p>Diseñado para crecer contigo.</p></div></div>
    </footer>
  );
}
