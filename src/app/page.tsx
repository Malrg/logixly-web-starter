import { Contact } from "@/components/contact";
import { FAQ } from "@/components/faq";
import { Features } from "@/components/features";
import { Hero } from "@/components/hero";
import { Portfolio } from "@/components/portfolio";
import { Pricing } from "@/components/pricing";
import { Services } from "@/components/services";
import { Testimonials } from "@/components/testimonials";

export default function HomePage() { return <><Hero /><Services /><Features /><Portfolio limit={3} /><Testimonials /><Pricing /><FAQ /><Contact /></>; }
