import Link from "next/link";
import { BriefcaseBusiness, Camera, Code2 } from "lucide-react";
import { Logo } from "@/components/logo";
import { navigation, siteConfig } from "@/config/site";
import { services } from "@/config/services";
import { Separator } from "@/components/ui/separator";

const legalLinks = [
  { label: "Aviso legal", href: "/legal" },
  { label: "Privacidad", href: "/privacidad" },
  { label: "Cookies", href: "/cookies" },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-ink text-ink-foreground">
      <div className="container-shell grid gap-12 py-14 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <Logo className="text-white" />
          <p className="mt-5 max-w-sm text-sm leading-6 text-ink-muted">{siteConfig.description}</p>
          <div className="mt-5 flex gap-2">
            {siteConfig.socials.instagram && (
              <a
                aria-label="Instagram"
                href={siteConfig.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-white/5 p-2 transition hover:bg-white/10"
              >
                <Camera className="size-4" />
              </a>
            )}
            {siteConfig.socials.linkedin && (
              <a
                aria-label="LinkedIn"
                href={siteConfig.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-white/5 p-2 transition hover:bg-white/10"
              >
                <BriefcaseBusiness className="size-4" />
              </a>
            )}
            {siteConfig.socials.github && (
              <a
                aria-label="GitHub"
                href={siteConfig.socials.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-full bg-white/5 p-2 transition hover:bg-white/10"
              >
                <Code2 className="size-4" />
              </a>
            )}
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold">Navegación</p>
          <nav className="mt-5 grid gap-3">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm text-ink-muted hover:text-white">
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-sm font-semibold">Servicios</p>
          <nav className="mt-5 grid gap-3">
            {services.map((service) => (
              <Link key={service.slug} href={service.href} className="text-sm text-ink-muted hover:text-white">
                {service.title}
              </Link>
            ))}
          </nav>
        </div>

        <div>
          <p className="text-sm font-semibold">Contacto</p>
          <div className="mt-5 grid gap-3 text-sm text-ink-muted">
            <a href={`mailto:${siteConfig.email}`} className="hover:text-white">
              {siteConfig.email}
            </a>
            {siteConfig.phone && (
              <a href={`tel:${siteConfig.phone.replace(/\s/g, "")}`} className="hover:text-white">
                {siteConfig.phone}
              </a>
            )}
            <span>{siteConfig.address}</span>
          </div>
        </div>
      </div>

      <Separator className="bg-ink-border" />
      <div>
        <div className="container-shell flex flex-col gap-3 py-6 text-xs text-ink-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {siteConfig.commercialName}. Todos los derechos reservados.
          </p>
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-white">
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
