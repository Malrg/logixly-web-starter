# Logixly Web Starter

Plantilla maestra oficial de **Logixly Studio** para crear páginas web profesionales, rápidas y reutilizables sin empezar cada proyecto desde cero.

Construida con Next.js, React, TypeScript, Tailwind CSS y componentes siguiendo el enfoque de shadcn/ui. Incluye una landing comercial completa, páginas internas, modo claro/oscuro, configuración centralizada y una base SEO lista para personalizar.

## Qué incluye

- Diseño moderno y responsive para móvil, tablet y escritorio.
- Navegación responsive, hero, servicios, beneficios, portfolio, testimonios, precios, FAQ, contacto y footer.
- Botón de WhatsApp configurable.
- Páginas `/servicios`, `/nosotros`, `/proyectos` y `/contacto`.
- Metadata, Open Graph dinámico, sitemap, robots y datos estructurados JSON-LD.
- Componentes accesibles basados en Radix UI y el patrón de shadcn/ui.
- Tema claro/oscuro mediante `next-themes`.
- Arquitectura preparada para Vercel.

## Tecnologías

- Next.js 16 con App Router
- React 19
- TypeScript 5
- Tailwind CSS 4
- shadcn/ui (arquitectura de componentes locales)
- Radix UI
- Lucide React
- next-themes
- ESLint

La plantilla utiliza una pila de fuentes del sistema para que la compilación no dependa de servicios externos. Si el cliente necesita una tipografía de marca, se recomienda alojarla en `public/fonts` y cargarla con `next/font/local`.

## Instalación

Requisitos: Node.js 20.9 o superior y npm.

```bash
git clone https://github.com/Malrg/logixly-web-starter.git
cd logixly-web-starter
npm install
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000).

## Comandos

```bash
npm run dev        # servidor de desarrollo
npm run build      # compilación de producción
npm run start      # ejecutar la compilación
npm run lint       # análisis ESLint
npm run typecheck  # comprobación TypeScript
```

## Crear una web para un cliente

### 1. Crea el nuevo proyecto desde esta plantilla

Puedes usar el botón **Use this template** de GitHub cuando la opción de repositorio plantilla esté activada, o clonar el repositorio y cambiar el remoto:

```bash
git clone https://github.com/Malrg/logixly-web-starter.git nombre-cliente
cd nombre-cliente
git remote remove origin
git remote add origin URL_DEL_NUEVO_REPOSITORIO
npm install
```

### 2. Cambia la identidad visual

Edita `src/config/branding.ts`:

- nombre de empresa;
- logo;
- colores principales y secundarios;
- tipografías;
- radio, densidad y tono visual.

Los tokens CSS que aplican los colores a Tailwind están en `src/app/globals.css`. Mantén ambos archivos alineados al cambiar una marca.

### 3. Cambia los datos del negocio y el SEO

Edita `src/config/site.ts`:

- nombre comercial y descripción;
- teléfono, WhatsApp, email y dirección;
- redes sociales;
- dominio definitivo;
- título, descripción, palabras clave y Open Graph.

> Antes de publicar, sustituye obligatoriamente `https://example.com` por el dominio del cliente.

### 4. Configura los servicios y el contenido

- `src/config/services.ts`: servicios, iconos, descripciones, beneficios y CTA.
- `src/config/content.ts`: beneficios, proyectos, testimonios, precios y preguntas frecuentes.
- `public/images`: fotografías e imágenes del cliente.
- `public/logos`: logotipos.
- `public/icons`: iconos propios.

### 5. Activa o elimina secciones

La portada se compone en `src/app/page.tsx`. Para adaptar el alcance, añade, reordena o elimina componentes sin modificar su implementación interna. La sección de precios es opcional.

### 6. Conecta el formulario

El formulario de contacto envía los envíos directamente a [Formspree](https://formspree.io) desde el navegador (`src/lib/formspree.ts`), sin backend propio. Para activarlo, copia el Form ID de tu cuenta de Formspree en la variable `NEXT_PUBLIC_FORMSPREE_FORM_ID` (ver `.env.example`) tanto en `.env.local` como en las variables de entorno de Vercel.

## Estructura

```text
src/
├── app/
│   ├── contacto/
│   ├── nosotros/
│   ├── proyectos/
│   ├── servicios/
│   ├── layout.tsx
│   ├── opengraph-image.tsx
│   ├── page.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── ui/
│   ├── navbar.tsx
│   ├── hero.tsx
│   ├── services.tsx
│   ├── features.tsx
│   ├── portfolio.tsx
│   ├── testimonials.tsx
│   ├── pricing.tsx
│   ├── faq.tsx
│   ├── contact.tsx
│   └── footer.tsx
├── config/
│   ├── branding.ts
│   ├── content.ts
│   ├── services.ts
│   └── site.ts
└── lib/
    └── utils.ts

public/
├── icons/
├── images/
└── logos/
```

## Añadir componentes shadcn/ui

El proyecto contiene `components.json` y los alias necesarios. Si la CLI está disponible:

```bash
npx shadcn@latest add dialog tabs sheet
```

Los componentes se guardan en `src/components/ui`, por lo que el proyecto no depende de una librería visual cerrada y cada componente puede adaptarse.

## Despliegue en Vercel

1. Sube el proyecto a GitHub.
2. En Vercel, selecciona **Add New → Project**.
3. Importa el repositorio.
4. Vercel detectará Next.js automáticamente.
5. Añade las variables de entorno necesarias.
6. Pulsa **Deploy**.
7. Configura el dominio y actualiza `siteConfig.domain`.

También puedes utilizar la CLI:

```bash
npx vercel
```

## Checklist antes de publicar

- [ ] Cambiar todos los datos de `site.ts`.
- [ ] Actualizar marca y tokens de color.
- [ ] Sustituir proyectos y testimonios de demostración.
- [ ] Añadir textos legales y política de privacidad.
- [ ] Conectar y probar el formulario.
- [ ] Optimizar imágenes y revisar textos alternativos.
- [ ] Ejecutar `npm run lint`, `npm run typecheck` y `npm run build`.
- [ ] Probar navegación, móvil, modo oscuro y enlaces externos.

## Licencia y uso

Proyecto privado de Logixly Studio. Define la licencia comercial adecuada antes de distribuirlo fuera de la organización.
