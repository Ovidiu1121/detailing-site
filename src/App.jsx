import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Shield, SprayCan, Car, CalendarDays, Phone, Camera, Check, Instagram, Mail, MapPin } from "lucide-react";
import { toast, Toaster } from "sonner";
import { priceEstimate, validateBooking, runLightTests, baseByTip, pachete, addonPret } from "./utils";

const formatter = new Intl.NumberFormat("ro-RO", { style: "currency", currency: "RON", maximumFractionDigits: 0 });
const Container = ({ children, className = "" }) => <div className={`mx-auto w-full max-w-6xl px-4 md:px-6 ${className}`}>{children}</div>;
const Section = ({ id, children, className = "" }) => <section id={id} className={`scroll-mt-24 py-16 md:py-24 ${className}`}>{children}</section>;

const Feature = ({ icon: Icon, title, desc }) => (
  <div className="flex gap-4">
    <div className="h-12 w-12 rounded-2xl bg-indigo-100 flex items-center justify-center">
      <Icon className="h-6 w-6 text-indigo-700" />
    </div>
    <div>
      <h4 className="font-semibold">{title}</h4>
      <p className="text-sm text-slate-600">{desc}</p>
    </div>
  </div>
);

function Header() {
  const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <header className="fixed inset-x-0 top-0 z-50 bg-white/70 backdrop-blur border-b">
      <Container className="h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-9 w-9 rounded-lg bg-indigo-600 text-white flex items-center justify-center"><Sparkles className="h-5 w-5" /></div>
          <div className="font-extrabold">Crystal Shine</div>
        </div>
        <nav className="hidden md:flex gap-6 text-sm">
          {["acasa", "servicii", "pachete", "galerie", "programari", "contact"].map(id =>
            <button key={id} onClick={() => scrollToId(id)} className="hover:text-indigo-700">{id[0].toUpperCase() + id.slice(1)}</button>
          )}
        </nav>
        <a href="tel:+40722123456" className="hidden md:inline-flex items-center gap-2 text-sm font-medium"><Phone className="h-4 w-4" /> 0722 123 456</a>
      </Container>
    </header>
  );
}

function Hero() {
  const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <Section id="acasa" className="pt-24 bg-gradient-to-b from-white to-slate-50">
      <Container className="grid gap-10 md:grid-cols-2 md:items-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="space-y-6">
          <span className="inline-flex items-center rounded-full bg-indigo-50 px-3 py-1 text-sm text-indigo-700">✨ Detailing premium în Sibiu</span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Redăm strălucirea mașinii tale</h1>
          <p className="text-lg text-slate-600">Polish profesional, protecție ceramică, curățare interioară în profunzime și pachete personalizate.</p>
          <div className="flex flex-wrap gap-3">
            <button onClick={() => scrollToId("programari")} className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold flex items-center gap-2"><CalendarDays className="h-5 w-5" /> Programează</button>
            <button onClick={() => scrollToId("pachete")} className="px-5 py-3 rounded-xl border font-semibold">Vezi pachetele</button>
          </div>
          <div className="grid grid-cols-3 gap-6 pt-4">
            <Feature icon={Sparkles} title="Polish 3 etape" desc="Corecție lac cu rezultate vizibile." />
            <Feature icon={Shield} title="Protecție ceramică" desc="Durabilitate 12–36 luni." />
            <Feature icon={SprayCan} title="Interior igienizat" desc="Abur, ozon, detergenți profesionali." />
          </div>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="relative">
          <div className="aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl bg-slate-100">
            <img
              className="h-full w-full object-cover"
              alt="Mașină după detailing"
              src="public/images/hero_picture.jpg"
            />
          </div>
          <div className="absolute -bottom-5 -left-5 hidden md:flex items-center gap-3 rounded-2xl bg-white/90 p-4 shadow-xl border">
            <Camera className="h-5 w-5" />
            <div className="text-sm"><div className="font-semibold">Finish oglindă</div><div className="text-slate-600">Fără halouri</div></div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}

function Packages() {
  const Card = ({ children }) => <div className="rounded-2xl border bg-white shadow-sm p-6">{children}</div>;
  const PackageCard = ({ name, price, features = [], best = false }) => (
    <Card>
      {best && <div className="mb-2 text-xs inline-flex px-2 py-1 rounded-full bg-indigo-100 text-indigo-800">Cel mai popular</div>}
      <div className="flex items-center justify-between">
        <div className="text-xl font-bold">{name}</div>
        <div className="text-2xl font-extrabold">{price} RON</div>
      </div>
      <ul className="mt-4 space-y-2 text-sm">
        {features.map((f, i) => <li key={i} className="flex gap-2"><Check className="h-4 w-4 text-indigo-600" />{f}</li>)}
      </ul>
    </Card>
  );
  return (
    <Section id="pachete" className="bg-slate-50">
      <Container>
        <div className="mb-10 text-center">
          <div className="inline-flex px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-sm">Pachete</div>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Alege pachetul potrivit</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          <PackageCard name="Basic" price={pachete.Basic} features={["Spălare premium exterior", "Aspirație + ștergere interioară", "Protecție spray 1–2 luni", "Curățare jante & anvelope"]} />
          <PackageCard name="Premium" price={pachete.Premium} best features={["Polish într-o etapă", "Curățare interioară completă", "Protecție ceramică 12 luni", "Tratament geamuri hidrofob"]} />
          <PackageCard name="Ultra" price={pachete.Ultra} features={["Corecție lac 2–3 etape", "Protecție ceramică 36 luni", "Detaliere motor", "Protecție textile & piele"]} />
        </div>
      </Container>
    </Section>
  );
}

function Gallery() {
  const imgs = [
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=1600&auto=format&fit=crop",
    "public/images/bmw.jpeg",
  ];

  return (
    <Section id="galerie">
      <Container>
        <div className="mb-10 text-center">
          <div className="inline-flex px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-sm">Galerie</div>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Înainte & după</h2>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">Rezultate reale din proiectele noastre. Mai multe pe Instagram.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
          {imgs.map((src, i) => (
            <div key={i} className="group overflow-hidden rounded-2xl border">
              <img src={src} alt={`Detaliu ${i + 1}`} className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
          ))}
        </div>
        {/*<div className="mt-6 text-center">
          <button onClick={() => window.open("https://instagram.com", "_blank")} className="px-4 py-2 rounded-xl border inline-flex items-center gap-2">
            <Instagram className="h-4 w-4" /> Urmărește-ne pe Instagram
          </button>
        </div>*/}
      </Container>
    </Section>
  );
}

function Booking() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", tip: "Sedan", pachet: "Premium", add: {}, date: "", time: "", message: "" });
  const [total, setTotal] = useState(0);
  useEffect(() => { setTotal(priceEstimate({ tip: form.tip, pachet: form.pachet, add: form.add })); }, [form.tip, form.pachet, form.add]);

  const onChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const toggleAdd = (k) => setForm(f => ({ ...f, add: { ...f.add, [k]: !f.add?.[k] } }));
  const submit = (e) => {
    e.preventDefault();
    if (!validateBooking({ name: form.name, email: form.email, phone: form.phone, date: form.date, time: form.time })) {
      toast("Verifică Nume, Email, Telefon, Dată, Oră."); return;
    }
    toast.success("Programare trimisă! Te contactăm pentru confirmare.");
  };

  return (
    <Section id="programari">
      <Container className="grid md:grid-cols-2 gap-8 md:items-start">
        <div>
          <div className="inline-flex px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-sm">Programări</div>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Rezervă-ți locul</h2>
          <p className="mt-2 text-slate-600">Completează formularul pentru o ofertă personalizată.</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li className="flex gap-2"><Check className="h-4 w-4 text-indigo-600" /> Răspuns în aceeași zi</li>
            <li className="flex gap-2"><Check className="h-4 w-4 text-indigo-600" /> Garanție pentru lucrări</li>
            <li className="flex gap-2"><Check className="h-4 w-4 text-indigo-600" /> Plată cu cardul disponibilă</li>
          </ul>
        </div>

        <form onSubmit={submit} className="rounded-2xl border bg-white shadow-sm p-6 grid gap-4">
          <div className="grid md:grid-cols-2 gap-3">
            <input className="border rounded-xl p-3" name="name" placeholder="Nume*" value={form.name} onChange={onChange} />
            <input className="border rounded-xl p-3" name="email" type="email" placeholder="Email*" value={form.email} onChange={onChange} />
            <input className="border rounded-xl p-3" name="phone" placeholder="Telefon*" value={form.phone} onChange={onChange} />
            <input className="border rounded-xl p-3" name="message" placeholder="Mesaj (opțional)" value={form.message} onChange={onChange} />
          </div>

          <div className="grid md:grid-cols-2 gap-3">
            <label className="text-sm">Tip vehicul
              <select name="tip" className="mt-1 border rounded-xl p-3 w-full" value={form.tip} onChange={onChange}>
                {Object.keys(baseByTip).map(t => <option key={t} value={t}>{t}</option>)}
              </select>
            </label>
            <label className="text-sm">Pachet
              <select name="pachet" className="mt-1 border rounded-xl p-3 w-full" value={form.pachet} onChange={onChange}>
                {Object.keys(pachete).map(t => <option key={t} value={t}>{t} — {formatter.format(pachete[t])}</option>)}
              </select>
            </label>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            {Object.entries(addonPret).map(([k, v]) => (
              <label
                key={k}
                className={`rounded-xl border p-3 cursor-pointer ${form.add?.[k] ? "bg-indigo-50 border-indigo-300" : ""}`}
              >
                <div className="flex items-center gap-2">
                  <input type="checkbox" checked={!!form.add?.[k]} onChange={() => toggleAdd(k)} />
                  <span className="text-sm capitalize">{k}</span>
                </div>
                <div className="mt-1 text-xs text-slate-600">{formatter.format(v)}</div>
              </label>
            ))}
          </div>


          <div className="grid md:grid-cols-2 gap-3">
            <input className="border rounded-xl p-3" name="date" type="date" value={form.date} onChange={onChange} />
            <input className="border rounded-xl p-3" name="time" type="time" value={form.time} onChange={onChange} />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-slate-600">Total estimat</div>
              <div className="text-2xl font-extrabold">{formatter.format(total)}</div>
            </div>
            <button className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold" type="submit">Trimite cererea</button>
          </div>
        </form>
      </Container>
    </Section>
  );
}

function Contact() {
  return (
    <Section id="contact" className="bg-slate-50">
      <Container className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="inline-flex px-3 py-1 rounded-full bg-slate-200 text-slate-800 text-sm">Contact</div>
          <h2 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">Hai să vorbim</h2>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center gap-2"><Phone className="h-4 w-4" /><a className="hover:underline" href="tel:+40722123456">0722 123 456</a></div>
            <div className="flex items-center gap-2"><Mail className="h-4 w-4" /><a className="hover:underline" href="mailto:contact@crystalshine.ro">contact@crystalshine.ro</a></div>
            <div className="flex items-center gap-2"><MapPin className="h-4 w-4" />Sibiu, Str. Exemplu 123</div>
          </div>
        </div>
        <div className="min-h-[320px] overflow-hidden rounded-2xl border">
          <iframe
            title="Harta"
            src="https://www.google.com/maps?q=Sibiu&output=embed"
            className="h-full w-full"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

        </div>
      </Container>
    </Section>
  );
}

function Footer() {
  const scrollToId = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  return (
    <footer className="border-t">
      <Container className="flex flex-col md:flex-row items-center justify-between gap-4 py-6 text-sm text-slate-600">
        <div>© {new Date().getFullYear()} Crystal Shine Detailing. Toate drepturile rezervate.</div>
        <div className="flex items-center gap-3">
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToId("acasa") }} className="hover:underline">Acasă</a>
          <span>•</span>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToId("pachete") }} className="hover:underline">Pachete</a>
          <span>•</span>
          <a href="#" onClick={(e) => { e.preventDefault(); scrollToId("contact") }} className="hover:underline">Contact</a>
        </div>
      </Container>
    </footer>
  );
}

export default function App() {
  useEffect(() => {
    if (typeof window !== "undefined" && !window.__DETAILING_TESTS_RAN__) {
      window.__DETAILING_TESTS_RAN__ = true;
      runLightTests();
    }
  }, []);

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Toaster richColors position="top-right" />
      <Header />
      <main>
        <Hero />
        <Packages />
        <Gallery />
        <Booking />
        <Contact />
      </main>
      <Footer />
      <a href="tel:+40722123456" className="fixed bottom-6 right-6 z-50">
        <button className="h-12 px-5 rounded-full bg-indigo-600 text-white font-semibold shadow-lg inline-flex items-center gap-2">
          <Phone className="h-5 w-5" /> Sună acum
        </button>
      </a>
    </div>
  );
}
