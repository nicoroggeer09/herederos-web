import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useEffect } from "react";
import { themes, fonts } from "./theme";

import { CalendarDays, MapPin, Phone, Instagram, Facebook, Music2, Ticket, ChevronLeft, ChevronRight, Images, Info, GalleryHorizontalEnd, Megaphone, ExternalLink } from "lucide-react";

const BRAND = {
  nombre: "Herederos Bar Folklórico",
  slogan: "Peña, comida criolla y música en vivo",
  direccion: "Av. Ituzaingó 2219, Olavarría, Buenos Aires",
  telefono: "+54 9 2284 619488",
  instagram: "https://instagram.com/",
  facebook: "https://facebook.com/",
  whatsapp: "https://wa.me/5492284619488",
  entradasLink: "#entradas",
};

const EVENTOS = [
  { date: "2025-12-05", titulo: "Gran Apertura", detalle: "Diablito Martinez, Pancho Fuentes, Herederos", hora: "20:30", precio: "$8.000", etiquetas: ["peña","en vivo"] },
  { date: "2025-12-06", titulo: "Peña", detalle: "Manu Garcia Pereyra, Martin Barraza, Herederos", hora: "20:30", precio: "$8.000", etiquetas: ["peña"] },
  { date: "2025-12-07", titulo: "Domingo Peñero", detalle: "Martin Graf, Nico Centineo, Herederos", hora: "20:30", precio: "$8000", etiquetas: ["peña"] },
  { date: "2025-12-12", titulo: "Peña", detalle: "Paloma Pacheco, Duo Fernandez-Orioli, Sincopa", hora: "20:30", precio: "$8.000", etiquetas: ["en vivo"] },
  { date: "2025-12-13", titulo: "Peña", detalle: "Carolina Centurión, La Voladura, Herederos", hora: "20:30", precio: "$8.000", etiquetas: ["peña"] },
  { date: "2025-12-14", titulo: "Domingo Peñero", detalle: "Franco Coria, Campero Campero, Los de Ahora", hora: "20:30", precio: "$8.000", etiquetas: ["en vivo"] },
];

const GALERIA = [
  { src: "https://images.unsplash.com/photo-1521337586134-df01dd7dd0c1", alt: "Peña" },
  { src: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3", alt: "Guitarras" },
  { src: "https://images.unsplash.com/photo-1560944527-a4a429848866", alt: "Bombo" },
  { src: "https://images.unsplash.com/photo-1504674900247-0877df9cc836", alt: "Mesa criolla" },
  { src: "https://images.unsplash.com/photo-1559339352-11d035aa65de", alt: "vivo" },
  { src: "https://images.unsplash.com/photo-1530268729831-4b0b9e170218", alt: "Peña – escenario" },
];

const SPONSORS = [
  { nombre: "Pinturerias centro", logo: "https://images.unsplash.com/photo-1541592106381-b31e9677c0e5", url: "#" },
  { nombre: "Tubos Olavarria", logo: "https://images.unsplash.com/photo-1510915228340-29c85a43dcfe", url: "#" },
  { nombre: "Tu Dolar", logo: "https://images.unsplash.com/photo-1520975722210-4ca376c0122e", url: "#" },
  { nombre: "Grizly", logo: "https://images.unsplash.com/photo-1542831371-29b0f74f9713", url: "#" },
];

function getMonthMatrix(year, month) {
  const first = new Date(year, month, 1);
  const last = new Date(year, month + 1, 0);
  const startDay = (first.getDay() + 6) % 7; // Lunes=0
  const daysInMonth = last.getDate();
  const weeks = [];
  let day = 1 - startDay;
  while (day <= daysInMonth) {
    const week = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(year, month, day);
      week.push({
        date: d,
        inMonth: d.getMonth() === month,
        key: `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`,
      });
      day++;
    }
    weeks.push(week);
  }
  return weeks;
}

function formatDate(d) {
  return d.toISOString().slice(0, 10);
}

export default function App() {
  const hoy = new Date();
  const [current, setCurrent] = useState({ y: hoy.getFullYear(), m: hoy.getMonth() });
  const matrix = useMemo(() => getMonthMatrix(current.y, current.m), [current]);

  const eventosPorFecha = useMemo(() => {
    const map = new Map();
    EVENTOS.forEach((e) => {
      map.set(e.date, (map.get(e.date) || []).concat(e));
    });
    return map;
  }, []);

  const monthName = new Date(current.y, current.m, 1).toLocaleDateString("es-AR", { month: "long", year: "numeric" });

  const prev = () => {
    const d = new Date(current.y, current.m - 1, 1);
    setCurrent({ y: d.getFullYear(), m: d.getMonth() });
  };
  const next = () => {
    const d = new Date(current.y, current.m + 1, 1);
    setCurrent({ y: d.getFullYear(), m: d.getMonth() });
  };

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* NAV */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#home" className="font-black tracking-tight text-xl">HBF</a>
          <nav className="hidden md:flex gap-6 text-sm">
            <a href="#grilla" className="hover:text-neutral-700 flex items-center gap-2"><CalendarDays className="h-4 w-4"/>Grilla</a>
            <a href="#galeria" className="hover:text-neutral-700 flex items-center gap-2"><Images className="h-4 w-4"/>Fotos</a>
            <a href="#proyecto" className="hover:text-neutral-700 flex items-center gap-2"><Info className="h-4 w-4"/>Proyecto</a>
            <a href="#publicidades" className="hover:text-neutral-700 flex items-center gap-2"><Megaphone className="h-4 w-4"/>Publicidades</a>
            <a href="#contacto" className="hover:text-neutral-700 flex items-center gap-2"><GalleryHorizontalEnd className="h-4 w-4"/>Contacto</a>
          </nav>
          <div className="flex items-center gap-2">
            <a href={BRAND.entradasLink} className="inline-flex items-center px-3 py-2 rounded-2xl bg-black text-white text-sm"><Ticket className="h-4 w-4 mr-1"/>Entradas</a>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-100 via-transparent to-transparent pointer-events-none"/>
        <div className="max-w-6xl mx-auto px-4 py-12 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <motion.div initial={{opacity:0, y:10}} animate={{opacity:1, y:0}} transition={{duration:0.5}}>
            <h1 className="text-4xl md:text-5xl font-black leading-tight">
              {BRAND.nombre}
            </h1>
            <p className="mt-4 text-lg text-neutral-700">{BRAND.slogan}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href="#grilla" className="inline-flex items-center px-3 py-2 rounded-2xl bg-black text-white text-sm"><CalendarDays className="h-4 w-4 mr-1"/>Ver grilla</a>
              <a href="#galeria" className="inline-flex items-center px-3 py-2 rounded-2xl bg-neutral-200 text-black text-sm"><Images className="h-4 w-4 mr-1"/>Ver fotos</a>
              <a href={BRAND.entradasLink} target="_blank" rel="noreferrer" className="inline-flex items-center px-3 py-2 rounded-2xl border text-sm"><Ticket className="h-4 w-4 mr-1"/>Comprar entradas</a>
            </div>
            <div className="mt-6 text-sm text-neutral-600 flex flex-col gap-1">
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4"/>{BRAND.direccion}</p>
              <p className="flex items-center gap-2"><Phone className="h-4 w-4"/>{BRAND.telefono}</p>
            </div>
            <div className="mt-4 flex gap-3">
              <a href={BRAND.instagram} className="inline-flex items-center gap-2 text-neutral-700 hover:text-neutral-900 text-sm"><Instagram className="h-4 w-4"/>Instagram</a>
              <a href={BRAND.facebook} className="inline-flex items-center gap-2 text-neutral-700 hover:text-neutral-900 text-sm"><Facebook className="h-4 w-4"/>Facebook</a>
            </div>
          </motion.div>

          <motion.div initial={{opacity:0, scale:0.98}} animate={{opacity:1, scale:1}} transition={{duration:0.5, delay:0.1}} className="relative">
            <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-xl bg-neutral-200">
              <img src="https://images.unsplash.com/photo-1521335629791-ce4aec67dd53" alt="Peña folklórica" className="w-full h-full object-cover"/>
            </div>
            <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow p-4 flex items-center gap-3">
              <Music2 className="h-5 w-5"/>
              <div>
                <p className="text-sm font-semibold">Música en vivo</p>
                <p className="text-xs text-neutral-600">Todos los fines de semana</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* GRILLA DEL MES */}
      <section id="grilla" className="py-14 bg-white border-t">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-extrabold">Grilla del mes</h2>
            <div className="flex items-center gap-2">
              <button onClick={prev} className="p-2 rounded-full hover:bg-neutral-100"><ChevronLeft className="h-5 w-5"/></button>
              <div className="px-3 py-1 rounded-full bg-neutral-100 text-sm font-medium capitalize">{monthName}</div>
              <button onClick={next} className="p-2 rounded-full hover:bg-neutral-100"><ChevronRight className="h-5 w-5"/></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-px bg-neutral-200 rounded-xl overflow-hidden text-xs md:text-sm">
            {["Lun","Mar","Mié","Jue","Vie","Sáb","Dom"].map((d) => (
              <div key={d} className="bg-neutral-50 font-semibold text-center py-2">{d}</div>
            ))}
            {matrix.map((week, wi) => (
              week.map((d) => {
                const key = formatDate(d.date);
                const evs = d.inMonth ? (eventosPorFecha.get(key) || []) : [];
                return (
                  <div key={d.key} className={`min-h-[110px] p-2 bg-white ${d.inMonth ? "" : "bg-neutral-50 text-neutral-400"}`}>
                    <div className="text-[11px] md:text-xs font-semibold opacity-70">{d.date.getDate()}</div>
                    <div className="mt-1 flex flex-col gap-1">
                      {evs.map((e, i) => (
                        <a href={BRAND.entradasLink} key={i} className="block rounded-lg border hover:shadow-sm transition p-2">
                          <div className="text-[11px] font-bold leading-tight">{e.titulo}</div>
                          <div className="text-[10px] opacity-70 leading-tight">{e.detalle}</div>
                          <div className="mt-1 flex items-center justify-between">
                            <span className="text-[10px]">{e.hora}</span>
                            <span className="text-[10px] font-semibold">{e.precio}</span>
                          </div>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {e.etiquetas?.map((t) => (
                              <span key={t} className="text-[9px] px-1.5 py-0.5 rounded-full bg-neutral-100">#{t}</span>
                            ))}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })
            ))}
          </div>

          {/* Lista rápida de próximos eventos */}
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            {EVENTOS.slice(0,3).map((e, idx) => (
              <div key={idx} className="rounded-2xl border bg-white">
                <div className="p-4 border-b">
                  <div className="text-base font-semibold flex items-start justify-between gap-3">
                    <span>{e.titulo}</span>
                    <span className="text-sm font-normal text-neutral-500">{new Date(e.date).toLocaleDateString('es-AR', { day:'2-digit', month:'short'})}</span>
                  </div>
                </div>
                <div className="p-4 text-sm text-neutral-700">
                  <p>{e.detalle}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-neutral-600">{e.hora}</span>
                    <span className="font-semibold">{e.precio}</span>
                  </div>
                  <a href={BRAND.entradasLink} className="mt-3 w-full inline-flex justify-center items-center gap-2 px-3 py-2 rounded-xl bg-black text-white text-sm"><Ticket className="h-4 w-4"/>Sacar entrada</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* GALERÍA */}
      <section id="galeria" className="py-14 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-6">Fotos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {GALERIA.map((g, i) => (
              <motion.div key={i} initial={{opacity:0, y:6}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{duration:0.3, delay:i*0.05}} className="aspect-square rounded-2xl overflow-hidden bg-neutral-200">
                <img src={g.src} alt={g.alt} className="w-full h-full object-cover"/>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* PROYECTO / INFO */}
      <section id="proyecto" className="py-14 bg-white border-y">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold">El proyecto</h2>
            <p className="mt-4 text-neutral-700 leading-relaxed">
              Herederos Bar Folklórico nace para celebrar la música y la danza argentina con un espacio cálido, comida criolla y una programación pensada para que la peña se viva de verdad. Trabajamos con artistas locales y regionales, promovemos la participación del público y articulamos con escuelas de danza y ballets.
            </p>
            <ul className="mt-4 text-neutral-700 list-disc pl-5 space-y-2">
              <li>Peñas todos los fines de semana</li>
              <li>Gastronomía criolla: empanadas, pizzas, guisos y más</li>
              <li>Convenios con ballets y artistas invitados</li>
              <li>Eventos especiales y fechas patrias</li>
            </ul>
            <div className="mt-6 flex gap-3">
              <a href={BRAND.entradasLink} className="inline-flex items-center px-3 py-2 rounded-2xl bg-black text-white text-sm"><Ticket className="h-4 w-4 mr-1"/>Comprar entradas</a>
              <a href="#contacto" className="inline-flex items-center px-3 py-2 rounded-2xl border text-sm"><ExternalLink className="h-4 w-4 mr-1"/>Ser sponsor</a>
            </div>
          </div>
          <div>
            <div className="rounded-2xl border bg-white">
              <div className="p-4 border-b">
                <div className="text-base font-semibold">Menú rápido</div>
              </div>
              <div className="p-4 text-sm text-neutral-700 grid grid-cols-2 gap-y-2">
                <div>
                  <p className="font-semibold">Bebidas</p>
                  <ul className="text-neutral-600 list-disc pl-4">
                    <li>Cerveza artesanal/industrial</li>
                    <li>Vino tinto/blanco</li>
                    <li>Gaseosas y aguas</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold">Comidas</p>
                  <ul className="text-neutral-600 list-disc pl-4">
                    <li>Empanadas</li>
                    <li>Pizzas</li>
                    <li>Bondiola / Papas / Hamburguesas</li>
                  </ul>
                </div>
                <p className="col-span-2 mt-2 text-xs text-neutral-500">* Podés convertir esta tarjeta en un menú completo o linkear a un PDF/QR.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PUBLICIDADES / SPONSORS */}
      <section id="publicidades" className="py-14 bg-neutral-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-6">Publicidades</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {SPONSORS.map((s, i) => (
              <a key={i} href={s.url} className="bg-white border rounded-2xl p-4 flex items-center justify-center hover:shadow-sm">
                <img src={s.logo} alt={s.nombre} className="h-14 object-contain"/>
              </a>
            ))}
          </div>
          <p className="mt-4 text-sm text-neutral-600">¿Querés ser parte? Escribinos y te enviamos el media kit.</p>
        </div>
      </section>

      {/* CONTACTO */}
      <section id="contacto" className="py-14 bg-white border-t">
        <div className="max-w-6xl mx-auto px-4 grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold">Contacto</h2>
            <p className="mt-2 text-neutral-700">Reservas, prensa, sponsors y artistas.</p>
            <div className="mt-4 space-y-2 text-sm text-neutral-700">
              <p className="flex items-center gap-2"><MapPin className="h-4 w-4"/>{BRAND.direccion}</p>
              <p className="flex items-center gap-2"><Phone className="h-4 w-4"/>{BRAND.telefono}</p>
            </div>
            <div className="mt-4 flex gap-3">
              <a href={BRAND.instagram} className="inline-flex items-center gap-2 text-neutral-700 hover:text-neutral-900 text-sm"><Instagram className="h-4 w-4"/>Instagram</a>
              <a href={BRAND.facebook} className="inline-flex items-center gap-2 text-neutral-700 hover:text-neutral-900 text-sm"><Facebook className="h-4 w-4"/>Facebook</a>
            </div>
            <div className="mt-6 rounded-2xl bg-neutral-50 p-4 border text-sm text-neutral-600">
              <p className="font-semibold mb-1">Mapa</p>
              <p>Insertá tu iframe de Google Maps aquí o un link directo.</p>
            </div>
          </div>
          <div className="rounded-2xl border bg-white">
            <div className="p-4 border-b">
              <div className="text-base font-semibold">Escribinos</div>
            </div>
            <div className="p-4">
              <form onSubmit={(e) => e.preventDefault()} className="space-y-3">
                <input placeholder="Nombre" className="w-full border rounded-lg p-2"/>
                <input placeholder="Email o teléfono" className="w-full border rounded-lg p-2"/>
                <textarea placeholder="Tu consulta" rows={5} className="w-full border rounded-lg p-2"></textarea>
                <div className="flex gap-2">
                  <button className="px-3 py-2 rounded-2xl bg-black text-white text-sm">Enviar</button>
                  <a href={BRAND.whatsapp} target="_blank" rel="noreferrer" className="px-3 py-2 rounded-2xl border text-sm">Whatsapp</a>
                </div>
                <p className="text-xs text-neutral-500">Este formulario es de ejemplo. Podés vincularlo con Formspree, Getform, Google Forms o tu backend.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 bg-neutral-950 text-neutral-200">
        <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            <p className="font-semibold">{BRAND.nombre}</p>
            <p className="text-sm text-neutral-400">{BRAND.slogan}</p>
          </div>
          <div className="text-xs text-neutral-400">© {new Date().getFullYear()} – Hecho con ❤ en Olavarría</div>
        </div>
      </footer>
    </div>
  );
}
