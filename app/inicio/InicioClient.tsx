'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  ShoppingCart,
  User,
  Check,
  X,
  ArrowRight,
  ArrowLeft,
  Phone,
  Shield,
  Award,
  Truck,
  Sparkles,
  Filter,
  Info,
  ChevronRight,
  ChevronDown,
  Star,
  Facebook,
  Instagram,
  Linkedin,
  Clock,
  Lock,
  Plus,
  Minus,
  Loader2,
  Menu
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Footer } from '@/components/layout/Footer';

// === ESTRUCTURAS DE DATOS ===
interface Product {
  id: string;
  sku: string;
  name: string;
  category: string;
  brand: string;
  isOfficial: boolean; // true = Grado Cero, false = Fabricante Aliado
  price: number;
  rating: number;
  reviews: number;
  imageUrl: string;
  allImages: string[];
  shortDesc: string;
  longDesc: string;
  availability: string;
  specs: Record<string, string>;
  isHero?: boolean;
}

interface CartItem {
  product: Product;
  quantity: number;
}

// === CONSTANTES DE MAQUETA EN ESPAÑOL ===
const PRODUCTS_DATA: Product[] = [
  {
    id: 'gc-01',
    sku: 'QUI-001',
    name: 'Cloruro de Benzalconio Orgánico Cero',
    category: 'Desinfección de Alta Gama',
    brand: 'Grado Cero',
    isOfficial: true,
    price: 1100,
    rating: 4.95,
    reviews: 240,
    imageUrl: 'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=600',
    allImages: [
      'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600'
    ],
    shortDesc: 'Desinfectante Alimenticio ultra-concentrado en Cloruro de Benzalconio de Alta Pureza. Presentación en Bidón de 20 Litros.',
    longDesc: 'Nuestra fórmula estrella Grado Cero para la industria alimentaria y hotelera. Desinfectante biodegradable con estabilidad termo-molecular prolongada, diseñado para erradicar patógenos en segundos. Su base activa purificada de Cloruro de Benzalconio de primera generación actúa rompiendo instantáneamente membranas lípidas, garantizando inocuidad quirúrgica sin dejar fragancias residuales molestas ni manchas químicas.',
    availability: 'Disponible para envío inmediato',
    specs: {
      'Presentación': 'Bidón de 20 Litros',
      'Componente Activo': 'Cloruro de Benzalconio de Pureza Certificada',
      'Rendimiento sugerido': 'Dilución de hasta 1:100 en agua purificada',
      'Certificados': 'Grado Alimenticio, Registro Cofepris y FDA',
      'Origen': 'Producido bajo estándares Grado Cero'
    }
  },
  {
    id: 'gc-02',
    sku: 'QUI-003',
    name: 'Detergente Industrial Multiespectro',
    category: 'Detergentes y Químicos',
    brand: 'Grado Cero',
    isOfficial: true,
    price: 550,
    rating: 4.88,
    reviews: 185,
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600',
    allImages: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=600'
    ],
    shortDesc: 'Fórmula tensioactiva biodegradable super desengrasante y catalizadora de suciedad. Presentación en Bidón de 20 Litros.',
    longDesc: 'Detercon original formulado bajo el estricto rigor de Grado Cero. Penetra profundamente en las superficies más complejas, desprendiendo aceites hidrofóbicos, grasas minerales y hollín de manera inmediata. Su pH equilibrado reduce drásticamente el desgaste de materiales metálicos o polímeros de instrumentación industrial.',
    availability: 'Disponible para envío inmediato',
    specs: {
      'Presentación': 'Bidón de 20 Litros (Envase de alta densidad a cambio)',
      'Tipo de Fórmula': 'Tensioactivos no iónicos biodegradables',
      'Efectividad': 'Uso en aceros refractarios, vidrios y cerámicas de tránsito extremo',
      'Dosificación': '20ml por litro para limpieza estándar corporativa'
    }
  },
  {
    id: 'gc-03',
    sku: 'QUI-004',
    name: 'Desengrasante Alcalino de Grado Cero',
    category: 'Detergentes y Químicos',
    brand: 'Grado Cero',
    isOfficial: true,
    price: 990,
    rating: 4.97,
    reviews: 312,
    imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600',
    allImages: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600'
    ],
    shortDesc: 'Concentrado superalcalino biodegradable para remoción extrema de aceites carbonizados. Presentación en Concentrado Alcalino de 20 Litros.',
    longDesc: 'Grado Cero presenta su fórmula desengrasante termoactiva definitiva. Diseñado quirúrgicamente para la licuación directa de grasas pesadas, ceras endurecidas e incrustaciones de carbón en cocinas comerciales y naves de producción. Su alta concentración permite su dilución masiva sin mermar la capacidad de disolución lípida.',
    availability: 'Disponible para envío inmediato',
    specs: {
      'Presentación': 'Bidón de 20 Litros Concentrado',
      'Grado de alcalinidad': 'Superalcalino optimizado',
      'Seguridad': 'Uso exclusivo con equipo de protección personal (EPP)',
      'Dilución': 'Hasta 1:5 para grasas extremadamente carbonizadas'
    }
  },
  {
    id: 'gc-04',
    sku: 'BAN-002',
    name: 'Bruma Ambiental Terpenos Cero',
    category: 'Baños e Higiene',
    brand: 'Grado Cero',
    isOfficial: true,
    price: 450,
    rating: 4.89,
    reviews: 122,
    imageUrl: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=600',
    allImages: [
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=600'
    ],
    shortDesc: 'Aromatizante molecular concentrado de larga duración. Notas de eucalipto glacial y maderas finas. Presentación en Bidón de 20 Litros.',
    longDesc: 'Una obra maestra para transformar aromáticamente el ambiente en oficinas corporativas y salas ejecutivas de Grado Cero. Equipada con agentes de fijación molecular que neutralizan olores orgánicos indeseados en lugar de enmascararlos, brindando una atmósfera impecable de pureza y distinción higiénica.',
    availability: 'Disponible para envío inmediato',
    specs: {
      'Presentación': 'Bidón de 20 Litros',
      'Fragancias Disponibles': 'Eucalipto, Lavanda Glacial, Cítricos de Invierno',
      'Duración Residual': 'Hasta 48 horas continuas en superficies'
    }
  },
  {
    id: 'gc-05',
    sku: 'BAN-004',
    name: 'Gel Antibacterial Molecular 70%',
    category: 'Baños e Higiene',
    brand: 'Grado Cero',
    isOfficial: true,
    price: 800,
    rating: 4.91,
    reviews: 158,
    imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600',
    allImages: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=600',
      'https://images.unsplash.com/photo-1526947425960-945c6e72858f?auto=format&fit=crop&q=80&w=600'
    ],
    shortDesc: 'Sanitizante cristalino enriquecido con dermoprotectores humectantes y glicerina vegetal. Presentación en Porrón de 20 Litros.',
    longDesc: 'Seguridad absoluta sin descuidar la salud dérmica. Este gel de grado farmacopea contiene un 70% de Alcohol Etílico purificado, eliminando al instante bacterias y hongos sin dejar residuos pegajosos. Enriquecido con humectantes selectos para un tacto suave y de absorción premium.',
    availability: 'Disponible para envío inmediato',
    specs: {
      'Presentación': 'Porrón de 20 Litros',
      'Concentración de Alcohol': '70% Etanol de Alta Pureza de grado USP',
      'Textura': 'Gel fluido libre de aromas residuales'
    }
  },
  // --- FABRICANTES ALIADOS ---
  {
    id: 'aliado-01',
    sku: 'PAP-001',
    name: 'Papel Higiénico Industrial Elite',
    category: 'Papel e Higiene',
    brand: 'Nacional de Aseo',
    isOfficial: false,
    price: 450,
    rating: 4.65,
    reviews: 98,
    imageUrl: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&q=80&w=600',
    allImages: [
      'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&q=80&w=600'
    ],
    shortDesc: 'Caja con 6 rollos gigantes de 500 metros cada uno de hoja doble. Absorción elástica superior.',
    longDesc: 'Abastecimiento de gran escala provisto por Nacional de Aseo. Fibra biodegradable doble hoja con una textura que equilibra una resistencia elástica insuperable en seco con una disolución rápida al contacto con flujos de agua sanitarios, evitando acumulaciones.',
    availability: 'Disponible para envío inmediato',
    specs: {
      'Marca': 'Nacional de Aseo (Socio Aliado)',
      'Formato': 'Caja con 6 rollos',
      'Metraje por rollo': '500 metros lineales',
      'Tipo': 'Hoja doble ultra-suave'
    }
  },
  {
    id: 'aliado-02',
    sku: 'PAP-002',
    name: 'Toallas de Papel Interdobladas Multifold',
    category: 'Papel e Higiene',
    brand: 'Rigasa / Nacional de Aseo',
    isOfficial: false,
    price: 320,
    rating: 4.7,
    reviews: 120,
    imageUrl: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&q=80&w=600',
    allImages: [
      'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&q=80&w=600'
    ],
    shortDesc: 'Caja premium de Toallas Sanitas, conteniendo 2000 piezas individuales para dispensación de higiene.',
    longDesc: 'Dobladas con precisión milimétrica para un secado de manos pulcro sin dobleces cruzados. Disminuyen el costo operativo gracias a su extraordinaria absorción capilar, de modo que una sola hoja es suficiente para eliminar la humedad total de la piel.',
    availability: 'Disponible para envío inmediato',
    specs: {
      'Marca': 'Rigasa / Nacional de Aseo (Socio Aliado)',
      'Cantidad': '2000 piezas por caja',
      'Compatibilidad': 'Universal con la mayoría de dispensadores de toallas interdobladas'
    }
  },
  {
    id: 'aliado-03',
    sku: 'PAP-003',
    name: 'Papel Absorbente Industrial Pesado',
    category: 'Papel e Higiene',
    brand: 'Genéricos de Limpieza',
    isOfficial: false,
    price: 580,
    rating: 4.78,
    reviews: 64,
    imageUrl: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&q=80&w=600',
    allImages: [
      'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&q=80&w=600'
    ],
    shortDesc: 'Bobina azul de limpieza ultra pesada de 300 metros de longitud. Tejido reforzado.',
    longDesc: 'Bobina para arrastre de aceites e hidrocarburos pesados en laboratorios o manufactura. Su exclusiva textura rugosa posee micro-cavidades que encapsulan sedimentos sin desmoronarse o soltar pelusas de algodón.',
    availability: 'Disponible para envío inmediato',
    specs: {
      'Marca': 'Genéricos de Limpieza (Socio Aliado)',
      'Longitud': '300 metros continuos',
      'Espesor': 'Reforzado de triple capa'
    }
  },
  {
    id: 'aliado-04',
    sku: 'PAP-004',
    name: 'Dispensador Papel Jumbo Oval Humo',
    category: 'Papel e Higiene',
    brand: 'Bodega de Papel',
    isOfficial: false,
    price: 550,
    rating: 4.58,
    reviews: 43,
    imageUrl: 'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&q=80&w=600',
    allImages: [
      'https://images.unsplash.com/photo-1584556812952-905ffd0c611a?auto=format&fit=crop&q=80&w=600'
    ],
    shortDesc: 'Gabinete de dosificación Jumbo de alta resistencia acrílica color humo translúcido.',
    longDesc: 'Construido en resina de policarbonato industrial capaz de soportar vandalismo e impactos severos en áreas de uso masivo. Su elegante domo color negro humo permite monitorizar el nivel de consumo de papel de un simple vistazo.',
    availability: 'Disponible para envío inmediato',
    specs: {
      'Marca': 'Bodega de Papel (Socio Aliado)',
      'Capacidad': 'Para rollos de hasta 500m de diámetro estándar',
      'Accesorios': 'Incluye llave de seguridad antirobo y herrajes de instalación'
    }
  },
  {
    id: 'aliado-05',
    sku: 'PRO-001',
    name: 'Guantes de Nitrilo Industrial (Caja 100)',
    category: 'Protección Personal',
    brand: 'Ambiderm / TatooMex',
    isOfficial: false,
    price: 350,
    rating: 4.88,
    reviews: 145,
    imageUrl: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=600',
    allImages: [
      'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=600'
    ],
    shortDesc: 'Caja con 100 guantes de nitrilo premium libre de polvo, disponibles en Negro o Azul de alta resistencia.',
    longDesc: 'Tolerancia térmica y durabilidad incrementada desarrollados por Ambiderm. Exentos de aceleradores de azufre o látex natural, eliminando alergias. Su acabado texturizado en yemas maximiza la motricidad con aceites.',
    availability: 'Disponible para envío inmediato',
    specs: {
      'Marca': 'Ambiderm / TatooMex (Socio Aliado)',
      'Presentación': 'Caja dispensadora de 100 piezas',
      'Acabado': 'Libre de polvo lubricante / Texturizado'
    }
  },
  {
    id: 'aliado-06',
    sku: 'PRO-002',
    name: 'Guantes de Látex Texturizados (Caja 100)',
    category: 'Protección Personal',
    brand: 'Ambiderm',
    isOfficial: false,
    price: 380,
    rating: 4.67,
    reviews: 74,
    imageUrl: 'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=600',
    allImages: [
      'https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?auto=format&fit=crop&q=80&w=600'
    ],
    shortDesc: 'Caja con 100 guantes de látex natural de gran estepicidad, libres de polvo lubricante químico.',
    longDesc: 'Guantes de tactilidad hipersensible marca Ambiderm. Hechos de látex orgánico purificado de alto gramaje para proveer una flexibilidad sublime durante limpiezas prolongadas o manipulaciones de precisión química.',
    availability: 'Disponible para envío inmediato',
    specs: {
      'Marca': 'Ambiderm (Socio Aliado)',
      'Cantidad': '100 piezas por caja',
      'Espesor nominal': '0.12 mm'
    }
  },
  {
    id: 'aliado-07',
    sku: 'QUI-002',
    name: 'Desinfectante Industrial Amonio Cuaternario',
    category: 'Detergentes y Químicos',
    brand: 'Químicos y Esencias',
    isOfficial: false,
    price: 850,
    rating: 4.8,
    reviews: 130,
    imageUrl: 'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=600',
    allImages: [
      'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=600'
    ],
    shortDesc: 'Amonio cuaternario de quinta generación concentrado. Presentación de Bidón de 20 Litros.',
    longDesc: 'Potente desinfectante multiespectro formulado por Químicos y Esencias. Actúa aniquilando hongos, esporas y bacterias resistentes en suelos y paramentos de tránsito rústico, dejando una película microscópica desinfectante activa de largo espectro.',
    availability: 'Disponible para envío inmediato',
    specs: {
      'Marca': 'Químicos y Esencias (Socio Aliado)',
      'Base Química': 'Sales de Amonio Cuaternario de Quinta Generación',
      'Volumen': 'Bidón de 20 Litros'
    }
  },
  {
    id: 'aliado-08',
    sku: 'QUI-005',
    name: 'Cloro Industrial Concentrado 6%',
    category: 'Detergentes y Químicos',
    brand: 'Química Danylus',
    isOfficial: false,
    price: 300,
    rating: 4.72,
    reviews: 110,
    imageUrl: 'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=600',
    allImages: [
      'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=600'
    ],
    shortDesc: 'Hipoclorito de sodio al 6% activo puro en agua desionizada. Bidón de 20 Litros de alta densidad.',
    longDesc: 'Agente blanqueador alcalino de alta reactividad purificado por Química Danylus. Ideal para protocolos severos de blanqueamiento textil, eliminación de bacterias anaerobias y saneamiento de fosas o cisternas industriales.',
    availability: 'Disponible para envío inmediato',
    specs: {
      'Marca': 'Química Danylus (Socio Aliado)',
      'Volumen': '20 Litros en bidón compatible a cambio',
      'Concentración': '6% Activo Garantizado'
    }
  },
  {
    id: 'aliado-09',
    sku: 'QUI-006',
    name: 'Limpiavidrios Concentrado de Alto Brillo',
    category: 'Detergentes y Químicos',
    brand: 'Genéricos de Limpieza',
    isOfficial: false,
    price: 420,
    rating: 4.69,
    reviews: 58,
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600',
    allImages: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600'
    ],
    shortDesc: 'Fórmula alcoholizada libre de marcas. Elimina grasas dactilares y estáticas. Bidón de 20 Litros.',
    longDesc: 'Composición evaporable instantánea provista por Genéricos de Limpieza. Diseñada para paneles vidriados templados extensos, fachadas de espejos y vitrinas corporativas. Su fórmula antiempañamiento repele el polvo por más tiempo gracias a su tecnología antiestática.',
    availability: 'Disponible para envío inmediato',
    specs: {
      'Marca': 'Genéricos de Limpieza (Socio Aliado)',
      'Base': 'Isopropanol purificado e inhibidores salinos',
      'Presentación': 'Bidón de 20 Litros'
    }
  },
  {
    id: 'aliado-10',
    sku: 'QUI-007',
    name: 'Sanitizante Orgánico de Frutas y Verduras',
    category: 'Detergentes y Químicos',
    brand: 'Químicos y Esencias',
    isOfficial: false,
    price: 350,
    rating: 4.88,
    reviews: 90,
    imageUrl: 'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=600',
    allImages: [
      'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=600'
    ],
    shortDesc: 'Fórmula ecológica de grado alimenticio para esterilización biológica de legumbres. Bidón de 5 Litros.',
    longDesc: 'Sanitizante botánico orgánico provisto por Químicos y Esencias. No altera las propiedades de sabor, frescura o aroma original de los alimentos cosechados, eliminando amebas, virus y microorganismos en un baño de inmersión rápido de 5 minutos.',
    availability: 'Disponible para envío inmediato',
    specs: {
      'Marca': 'Químicos y Esencias (Socio Aliado)',
      'Volumen': 'Envase de 5 Litros',
      'Biodegradabilidad': '100% libre de cloro residual'
    }
  },
  {
    id: 'aliado-11',
    sku: 'QUI-008',
    name: 'Shampoo Especial para Alfombras Pesadas',
    category: 'Detergentes y Químicos',
    brand: 'Marketb2b',
    isOfficial: false,
    price: 850,
    rating: 4.76,
    reviews: 62,
    imageUrl: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600',
    allImages: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=600'
    ],
    shortDesc: 'Diseñado para máquinas de inyección-succión industriales. Baja espuma y limpieza profunda. Bidón de 20 Litros.',
    longDesc: 'Champú para tapices densos y moquetas ejecutivas provisto por Marketb2b. Sus abrillantadores ópticos recuperan la viveza original de la fibra del hilo, mientras neutralizan ácaros y esporas fúngicas con un agradable perfume de frescura higiénica.',
    availability: 'Disponible para envío inmediato',
    specs: {
      'Marca': 'Marketb2b (Socio Aliado)',
      'Volumen': 'Bidón de 20 Litros',
      'Compatibilidad': 'Apto para marcas líderes de inyección y extracción de lavado'
    }
  },
  {
    id: 'aliado-12',
    sku: 'BAN-001',
    name: 'Pastillas Desodorantes para Inodoro (Caja 50)',
    category: 'Baños e Higiene',
    brand: 'Genéricos de Limpieza',
    isOfficial: false,
    price: 350,
    rating: 4.54,
    reviews: 132,
    imageUrl: 'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=600',
    allImages: [
      'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=600'
    ],
    shortDesc: 'Caja con 50 pastillas concentradas para inodoros o mingitorios. Gran control de sarro aromático.',
    longDesc: 'Bloques de desodorización pesada de evaporación modulada. Liberan un agente quelante que ralentiza la solidificación de sales de calcio (sarro) en tuberías sanitarias, despidiendo una fragancia vigorizante en cada descarga.',
    availability: 'Disponible para envío inmediato',
    specs: {
      'Marca': 'Genéricos de Limpieza (Socio Aliado)',
      'Cantidad': '50 unidades sanitarias individuales',
      'Fragancia': 'Cherry-Mentol de choque ambiental'
    }
  },
  {
    id: 'aliado-13',
    sku: 'BAN-003',
    name: 'Jabón para Manos Premium Perlescente',
    category: 'Baños e Higiene',
    brand: 'Marketb2b',
    isOfficial: false,
    price: 650,
    rating: 4.84,
    reviews: 104,
    imageUrl: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600',
    allImages: [
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&q=80&w=600'
    ],
    shortDesc: 'Jabón líquido cremoso perlescente con emolientes de coco. Bidón de 20 Litros.',
    longDesc: 'Fórmula cosmética corporativa desarrollada por Marketb2b. Aporta un lavado aromático sumamente suntuoso, removiendo bacterias al instante sin maltratar la barrera lipídica epidérmica debido a su pH neutro hipoalergénico.',
    availability: 'Disponible para envío inmediato',
    specs: {
      'Marca': 'Marketb2b (Socio Aliado)',
      'Volumen': 'Bidón de 20 Litros',
      'Estética': 'Color blanco perla con brillo de seda'
    }
  },
  {
    id: 'aliado-14',
    sku: 'JAR-001',
    name: 'Bolsas de Basura Industriales Calibre Grueso',
    category: 'Instrumentación y Accesorios',
    brand: 'Rigasa Limpieza',
    isOfficial: false,
    price: 420,
    rating: 4.82,
    reviews: 142,
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=600',
    allImages: [
      'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=600'
    ],
    shortDesc: 'Rollo con 100 piezas negras tamaño institucional de calibre extra grueso. Anti-escurrimientos.',
    longDesc: 'Láminas de polietileno re-procesado de alta densidad desarrolladas por Rigasa. Su calibre elevado resiste la perforación por astillas, cartones húmedos o desechos punzantes comunes en comedores u oficinas.',
    availability: 'Disponible para envío inmediato',
    specs: {
      'Marca': 'Rigasa Limpieza (Socio Aliado)',
      'Medición': '90cm x 120cm institucional',
      'Espesor o calibre': 'Super grueso calibre 300'
    }
  },
  {
    id: 'aliado-15',
    sku: 'JAR-002',
    name: 'Cepillo Industrial Cerdas Duras',
    category: 'Instrumentación y Accesorios',
    brand: 'Genéricos de Limpieza',
    isOfficial: false,
    price: 160,
    rating: 4.62,
    reviews: 34,
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=600',
    allImages: [
      'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=600'
    ],
    shortDesc: 'Cepillo de restregado con block de madera y cerdas de polipropileno indeformables de alta dureza.',
    longDesc: 'Diseñado por Genéricos de Limpieza para la remoción mecánica de lama, lodo estancado y sarro folicular en pisos epóxicos, vialidades o andenes de carga pesados.',
    availability: 'Disponible para envío inmediato',
    specs: {
      'Marca': 'Genéricos de Limpieza (Socio Aliado)',
      'Cerdas': 'Fibras de polipropileno de alta densidad recuperativa',
      'Bastidor': 'Madera de pino estufada con rosca universal'
    }
  },
  {
    id: 'aliado-16',
    sku: 'JAR-003',
    name: 'Jalador de Piso Metálico Premium 60cm',
    category: 'Instrumentación y Accesorios',
    brand: 'Rigasa Limpieza',
    isOfficial: false,
    price: 210,
    rating: 4.85,
    reviews: 69,
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=600',
    allImages: [
      'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=600'
    ],
    shortDesc: 'Jalador metálico de 60cm de ancho con doble goma de neopreno. Arrastre de agua perfecto.',
    longDesc: 'Instrumento fabricado por Rigasa. Su doble labio de neopreno esponjado se amolda excelentemente a las crestas de azulejos o relieves de piedra, arrastrando líquidos grasos o aguas pluviales sin agrietarse ante insolaciones continuas.',
    availability: 'Disponible para envío inmediato',
    specs: {
      'Marca': 'Rigasa Limpieza (Socio Aliado)',
      'Ancho operativo': '60 centímetros lineales',
      'Material': 'Chasis de lámina electro-soldada con pintura anticorrosiva'
    }
  },
  {
    id: 'aliado-17',
    sku: 'JAR-004',
    name: 'Trapeador Industrial Pabilo Algodón 500g',
    category: 'Instrumentación y Accesorios',
    brand: 'Genéricos de Limpieza',
    isOfficial: false,
    price: 95,
    rating: 4.75,
    reviews: 112,
    imageUrl: 'https://images.unsplash.com/photo-1527515637462-cff18e15552a?auto=format&fit=crop&q=80&w=600',
    allImages: [
      'https://images.unsplash.com/photo-1527515637462-cff18e15552a?auto=format&fit=crop&q=80&w=600'
    ],
    shortDesc: 'Trapeador elaborado con pabilo de algodón cerrado súper absorbente. Peso neto de 500 gramos.',
    longDesc: 'Pabilo de hilaza de algodón de alta torsión térmica fabricada por Genéricos de Limpieza. Proporciona una extraordinaria absorción capilar, atrapando grasas flotantes y sedimentos suspendidos de una sola pasada.',
    availability: 'Disponible para envío inmediato',
    specs: {
      'Marca': 'Genéricos de Limpieza (Socio Aliado)',
      'Peso en algodón': '500 gramos de hilaza virgen',
      'Bastidor': 'Madera de pino con grapa de alta fijación'
    }
  },
  {
    id: 'aliado-18',
    sku: 'JAR-005',
    name: 'Fibra Verde Abrasiva Industrial (Corte 12)',
    category: 'Instrumentación y Accesorios',
    brand: 'Rigasa Limpieza',
    isOfficial: false,
    price: 220,
    rating: 4.61,
    reviews: 51,
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=600',
    allImages: [
      'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=600'
    ],
    shortDesc: 'Paquete de 12 piezas de fibra abrasiva verde de alto desempeño mecánico. Anti-microbiano.',
    longDesc: 'Fibras tejidas con filamentos de grafito abrasivo aglomerados súper resistentes. Ideal para la desincrustación extrema de asadores, charolas o refractarios en áreas de producción de alimentos sin perder espesor primario.',
    availability: 'Disponible para envío inmediato',
    specs: {
      'Marca': 'Rigasa Limpieza (Socio Aliado)',
      'Embalaje': 'Paquete hermético de 12 piezas gigantes',
      'Fórmula activa': 'Mineral abrasivo de óxido de aluminio con tratamiento funguicida'
    }
  },
  {
    id: 'aliado-19',
    sku: 'JAR-006',
    name: 'Esponjas Multiusos Doble Cara (Caja 24)',
    category: 'Instrumentación y Accesorios',
    brand: 'Rigasa Limpieza',
    isOfficial: false,
    price: 180,
    rating: 4.69,
    reviews: 47,
    imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=600',
    allImages: [
      'https://images.unsplash.com/photo-1532187863486-abf9d39d66e8?auto=format&fit=crop&q=80&w=600'
    ],
    shortDesc: 'Paquete con 24 esponjas sintéticas de doble cara activa. Excelente espumación de retención.',
    longDesc: 'Esponja de celulosa hidrofílica de alto rendimiento que combina una cara suave altamente absorbente con un respaldo de fibra abrasiva verde fina, apta para el aseo de superficies delicadas o vidriados sin rayadura.',
    availability: 'Disponible para envío inmediato',
    specs: {
      'Marca': 'Rigasa Limpieza (Socio Aliado)',
      'Cantidad': '24 esponjas por paquete empacadas en origen',
      'Lavabilidad': 'Aptas para esterilizar en autoclaves térmicas'
    }
  }
];

// --- Slides Exclusivas del Carrusel del Hero (Exclusivos Grado Cero) ---
const HERO_SLIDES = [
  {
    title: 'Cloruro de Benzalconio Orgánico Cero',
    subtitle: 'NUESTRA REINVENCIÓN MÁS EXCLUSIVA EN DESINFECCIÓN',
    tagline: 'Primero lo nuestro. Después, lo mejor del mercado.',
    description: 'La pureza de un amonio cuaternario de grado alimenticio concentrado al máximo estándar biológico. Inocuidad total y protección prolongada para tu industria en Bidón de 20l.',
    productId: 'gc-01',
    imageUrl: 'https://images.unsplash.com/photo-1608248597481-496100c80836?auto=format&fit=crop&q=80&w=1400'
  }
];

const CATEGORIES = [
  { id: 'all', name: 'Todos los productos' },
  { id: 'biocidas', name: 'Desinfección de Alta Gama' },
  { id: 'quimicos', name: 'Detergentes y Químicos' },
  { id: 'papel', name: 'Papel e Higiene' },
  { id: 'proteccion', name: 'Protección Personal' },
  { id: 'jarcieria', name: 'Instrumentación y Accesorios' }
];

export default function InicioClient() {
  // === ESTADOS REACTIVOS ===
  const [products] = useState<Product[]>(PRODUCTS_DATA);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeHeroSlide, setActiveHeroSlide] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [brandFilter, setBrandFilter] = useState<'all' | 'official' | 'allies'>('all');
  const [priceMax, setPriceMax] = useState<number>(4000);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // --- Estados de Autenticación de Lujo ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authUser, setAuthUser] = useState<{ name: string; email: string } | null>(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authEmail, setAuthEmail] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authIsRegisterState, setAuthIsRegisterState] = useState(false);
  const [authError, setAuthError] = useState('');
  const [isAuthLoading, setIsAuthLoading] = useState(false);

  // --- Estado de Cotización Mayorista Especial ---
  const [wholesaleModalOpen, setWholesaleModalOpen] = useState(false);
  const [wholesaleProduct, setWholesaleProduct] = useState<Product | null>(null);
  const [wholesaleEmail, setWholesaleEmail] = useState('');
  const [wholesaleUnits, setWholesaleUnits] = useState(50);
  const [wholesaleNotes, setWholesaleNotes] = useState('');
  const [wholesaleSuccess, setWholesaleSuccess] = useState(false);

  // === EFECTOS ===
  // Carrusel automático para el Hero (intervalo de 6 segundos)
  useEffect(() => {
    const slideTimer = setInterval(() => {
      setActiveHeroSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(slideTimer);
  }, []);

  // Cargar perfil local y carrito de forma segura en el cliente (evitando re-renderizados síncronos)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedCart = localStorage.getItem('gc_luxury_cart');
      const savedUser = localStorage.getItem('gc_luxury_user');
      
      const timer = setTimeout(() => {
        if (savedCart) {
          try { 
            setCart(JSON.parse(savedCart)); 
          } catch (e) { 
            console.error(e); 
          }
        }
        if (savedUser) {
          try {
            const u = JSON.parse(savedUser);
            setAuthUser(u);
            setIsAuthenticated(true);
          } catch (e) { 
            console.error(e); 
          }
        }
      }, 0);

      return () => clearTimeout(timer);
    }
  }, []);

  const saveCart = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('gc_luxury_cart', JSON.stringify(newCart));
  };

  // === ACCIONES DE COMPRA ===
  const handleAddToCart = (product: Product, quantity = 1, showDrawer = true) => {
    const existing = cart.find(item => item.product.id === product.id);
    let updated: CartItem[];
    if (existing) {
      updated = cart.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updated = [...cart, { product, quantity }];
    }
    saveCart(updated);
    if (showDrawer) {
      setIsCartOpen(true);
    }
  };

  const handleRemoveFromCart = (productId: string) => {
    const updated = cart.filter(item => item.product.id !== productId);
    saveCart(updated);
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    if (quantity < 1) return;
    const updated = cart.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    saveCart(updated);
  };

  // Redirección de Conversión WhatsApp Directa (ESTRATEGIA CENTRAL)
  const handleBuyOnWhatsApp = (product: Product) => {
    const defaultText = `Hola Grado Cero, me interesa adquirir el producto oficial "${product.name}" (SKU: ${product.sku}) con valor de $${product.price} MXN. ¿Me podrían indicar la cobertura de entrega y opciones de empaque premium? Muchas gracias.`;
    const encoded = encodeURIComponent(defaultText);
    const url = `https://wa.me/525555555555?text=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleCartStripeCheckout = () => {
    if (cart.length === 0) return;
    setIsAuthLoading(true);
    // Simulación de pasarela de pago premium
    setTimeout(() => {
      setIsAuthLoading(false);
      alert('Redirigiendo de forma segura a la pasarela de pagos integrados de Grado Cero con Stripe.');
      saveCart([]);
      setIsCartOpen(false);
    }, 1500);
  };

  // --- Flujo de Autenticación Local ---
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    if (!authEmail.includes('@')) {
      setAuthError('Ingesa un correo electrónico válido');
      return;
    }
    setIsAuthLoading(true);
    setTimeout(() => {
      setIsAuthLoading(false);
      const simulatedUser = {
        name: authIsRegisterState ? authName || 'Socio Grado Cero' : authEmail.split('@')[0],
        email: authEmail
      };
      setAuthUser(simulatedUser);
      setIsAuthenticated(true);
      localStorage.setItem('gc_luxury_user', JSON.stringify(simulatedUser));
      setAuthModalOpen(false);
      // Reset campos
      setAuthEmail('');
      setAuthName('');
      setAuthPassword('');
    }, 1200);
  };

  const handleLogOut = () => {
    setIsAuthenticated(false);
    setAuthUser(null);
    localStorage.removeItem('gc_luxury_user');
  };

  // --- Enviar Solicitud de Mayoreo ---
  const handleWholesaleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wholesaleEmail) return;
    setIsAuthLoading(true);
    setTimeout(() => {
      setIsAuthLoading(false);
      setWholesaleSuccess(true);
      setTimeout(() => {
        setWholesaleModalOpen(false);
        setWholesaleSuccess(false);
        setWholesaleNotes('');
      }, 3000);
    }, 1400);
  };

  // === MOTOR DE FILTRADO INTELIGENTE ===
  const filteredProducts = products.filter(p => {
    // Normalizar acentos y strings para búsqueda robusta
    const query = searchTerm.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const nameMatch = p.name.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(query);
    const skuMatch = p.sku.toLowerCase().includes(query);
    const descMatch = p.shortDesc.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").includes(query);
    const searchMatch = nameMatch || skuMatch || descMatch;

    // Filtro Categoría
    const catObject = CATEGORIES.find(c => c.id === selectedCategory);
    const categoryMatch = selectedCategory === 'all' || p.category === catObject?.name;

    // Filtro Fabricante
    const brandMatch =
      brandFilter === 'all' ||
      (brandFilter === 'official' && p.isOfficial) ||
      (brandFilter === 'allies' && !p.isOfficial);

    // Filtro Precio Max
    const priceMatch = p.price <= priceMax;

    return searchMatch && categoryMatch && brandMatch && priceMatch;
  });

  const officialProducts = products.filter(p => p.isOfficial);
  const alliedProducts = products.filter(p => !p.isOfficial);

  const scrollIntoView = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans antialiased overflow-x-hidden selection:bg-amber-500/25 selection:text-amber-300">
      
      {/* HEADER DE ALTA GAMA (FIJO) */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-zinc-950/85 backdrop-blur-xl border-b border-white/10 py-4 px-4 sm:px-6 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Logo Corporativo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setSelectedProduct(null)}>
            <div className="relative w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-amber-700 flex items-center justify-center font-serif text-black font-extrabold text-sm tracking-tighter">
              GC
              <div className="absolute inset-0.5 rounded-md border border-neutral-950/30" />
            </div>
            <span className="font-extrabold text-white tracking-widest text-base sm:text-lg">
              GRADO CERO <span className="text-[10px] text-amber-500 font-mono font-bold ml-1 uppercase tracking-[0.2em]">Maison</span>
            </span>
          </div>

          {/* Menú de Navegación */}
          <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-[0.15em] font-medium text-neutral-400">
            <button onClick={() => { setSelectedProduct(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-amber-400 transition-colors cursor-pointer">Inicio</button>
            <button onClick={() => scrollIntoView('grado-cero-brand')} className="hover:text-amber-400 transition-colors cursor-pointer">Grado Cero</button>
            <button onClick={() => scrollIntoView('allied-catalog')} className="hover:text-amber-400 transition-colors cursor-pointer">Catálogo</button>
            <button onClick={() => { setBrandFilter('allies'); scrollIntoView('allied-catalog'); }} className="hover:text-amber-400 transition-colors cursor-pointer">Marcas Aliadas</button>
            <button onClick={() => { setWholesaleProduct(null); setWholesaleModalOpen(true); }} className="hover:text-amber-400 transition-colors cursor-pointer text-amber-500">Mayoreo</button>
            <button onClick={() => scrollIntoView('grado-cero-footer')} className="hover:text-amber-400 transition-colors cursor-pointer">Contacto</button>
          </nav>

          {/* Iconos de Interacción */}
          <div className="flex items-center gap-4 sm:gap-5">
            
            {/* Buscador Rápido */}
            <div className="relative hidden md:block w-48 lg:w-64 group">
              <input 
                type="text"
                placeholder="Buscar esencia, crema..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-zinc-800/60 text-xs text-zinc-200 placeholder-zinc-500 border border-white/10 rounded-full px-4 py-2 pl-9 focus:outline-none focus:border-amber-400/50 focus:w-72 transition-all duration-300"
              />
              <Search size={14} className="absolute left-3 top-2.5 text-neutral-500 group-focus-within:text-amber-400 transition-colors" />
            </div>

            {/* Carrito de Compras */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              id="header-cart-trigger"
            >
              <ShoppingCart size={18} className="stroke-[1.5]" />
              {cart.reduce((sum, item) => sum + item.quantity, 0) > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-[9px] font-black text-black rounded-full flex items-center justify-center shadow-lg border border-neutral-950">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>

            {/* Módulo de Cuenta / Login */}
            {isAuthenticated && authUser ? (
              <div className="flex items-center gap-3">
                <div className="h-7 w-7 rounded-full bg-gradient-to-tr from-amber-500 to-amber-600 flex items-center justify-center text-xs font-bold text-black border border-white/10 shrink-0">
                  {authUser.name.slice(0, 2).toUpperCase()}
                </div>
                <button 
                  onClick={handleLogOut}
                  className="hidden sm:inline-block text-[10px] uppercase tracking-wider text-neutral-500 hover:text-white transition-colors"
                >
                  Salir
                </button>
              </div>
            ) : (
              <button 
                onClick={() => { setAuthIsRegisterState(false); setAuthModalOpen(true); }}
                className="p-2 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                title="Abrir panel de usuario"
                aria-label="Abrir panel de usuario"
              >
                <User size={18} className="stroke-[1.5]" />
              </button>
            )}

            {/* Menú de Dispositivo Móvil */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-300 hover:text-white transition-colors cursor-pointer"
              title="Abrir menú"
              aria-label="Abrir menú"
            >
              <Menu size={20} />
            </button>

          </div>
        </div>
      </header>

      {/* MENÚ MÓVIL DESPLEGABLE */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-[65px] left-0 right-0 z-45 bg-zinc-950/95 backdrop-blur-xl border-b border-white/10 lg:hidden overflow-hidden flex flex-col p-6 space-y-4 text-sm font-semibold tracking-widest text-center"
          >
            <button onClick={() => { setSelectedProduct(null); window.scrollTo({ top: 0, behavior: 'smooth' }); setMobileMenuOpen(false); }} className="text-neutral-300 hover:text-amber-400 py-2">Inicio</button>
            <button onClick={() => scrollIntoView('grado-cero-brand')} className="text-neutral-300 hover:text-amber-400 py-2">Grado Cero</button>
            <button onClick={() => scrollIntoView('allied-catalog')} className="text-neutral-300 hover:text-amber-400 py-2">Catálogo</button>
            <button onClick={() => { setBrandFilter('allies'); scrollIntoView('allied-catalog'); setMobileMenuOpen(false); }} className="text-neutral-300 hover:text-amber-400 py-2">Marcas Aliadas</button>
            <button onClick={() => { setWholesaleProduct(null); setWholesaleModalOpen(true); setMobileMenuOpen(false); }} className="text-amber-500 py-2">Mayoreo</button>
            <button onClick={() => scrollIntoView('grado-cero-footer')} className="text-neutral-300 hover:text-amber-400 py-2">Contacto</button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="h-[75px]" /> {/* Espacio para el header fijo */}

      <AnimatePresence mode="wait">
        {!selectedProduct ? (
          
          <motion.div 
            key="home-screen"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {/* HERO PRINCIPAL: ESCAPARATE PREMIUM (CAROUSEL AUTOMÁTICO DE ANCHO COMPLETO - EXCLUSIVAMENTE GRADO CERO) */}
            <section className="relative w-full overflow-hidden bg-zinc-900 border-b border-white/10" id="carrusel-hero">
              <div className="relative h-[450px] sm:h-[550px] md:h-[650px] flex items-center justify-center">
                
                {/* Animación del Fondo del Slide */}
                <div className="absolute inset-0">
                  <Image 
                    src={HERO_SLIDES[activeHeroSlide].imageUrl}
                    alt={HERO_SLIDES[activeHeroSlide].title}
                    fill
                    className="object-cover opacity-40 scale-102 transition-transform duration-[6000ms]"
                    referrerPolicy="no-referrer"
                    priority
                  />
                  {/* Gradientes Oscuros de Exclusividad */}
                  <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/60 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-zinc-950/40" />
                </div>

                {/* Contenido Visual y de Venta */}
                <div className="relative max-w-7xl mx-auto px-6 sm:px-8 md:px-12 w-full z-10 flex flex-col justify-center h-full pt-10">
                  
                  <motion.div
                    key={activeHeroSlide}
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl space-y-4 sm:space-y-6"
                  >
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-500/20 text-xs tracking-[0.25em] text-amber-400 font-mono font-semibold uppercase">
                      <Sparkles size={11} /> Colección Oficial Grado Cero
                    </span>

                    <h1 className="text-4xl sm:text-6xl font-serif font-light text-white tracking-tight leading-none">
                      {HERO_SLIDES[activeHeroSlide].title}
                    </h1>

                    <p className="text-amber-100/90 font-serif text-lg italic tracking-wide">
                      &quot;{HERO_SLIDES[activeHeroSlide].tagline}&quot;
                    </p>

                    <p className="text-sm text-neutral-400 leading-relaxed max-w-lg font-light">
                      {HERO_SLIDES[activeHeroSlide].description}
                    </p>

                    <div className="pt-2 flex flex-wrap gap-4">
                      
                      <button 
                        onClick={() => {
                          const targetProd = products.find(p => p.id === HERO_SLIDES[activeHeroSlide].productId);
                          if (targetProd) {
                            setSelectedProduct(targetProd);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                        }}
                        className="bg-amber-500 hover:bg-amber-600 active:scale-[0.98] text-neutral-950 px-8 py-3 rounded-md text-xs uppercase tracking-[0.2em] font-extrabold transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-lg shadow-amber-500/10"
                      >
                        Comprar ahora <ArrowRight size={14} />
                      </button>

                      <button 
                        onClick={() => scrollIntoView('grado-cero-brand')}
                        className="border border-white/10 hover:border-white/30 bg-neutral-900/60 backdrop-blur-sm text-white hover:text-amber-400 px-6 py-3 rounded-md text-xs uppercase tracking-[0.2em] font-bold transition-all cursor-pointer"
                      >
                        Ver colección recomendada
                      </button>
                    </div>
                  </motion.div>

                </div>

                {/* Controles de Navegación del Carrusel (Estéticos) */}
                <div className="absolute bottom-8 right-8 z-20 flex gap-2">
                  {HERO_SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveHeroSlide(idx)}
                      className={`w-16 h-1 rounded transition-all duration-500 ${
                        idx === activeHeroSlide ? 'bg-amber-500' : 'bg-neutral-800'
                      }`}
                      title={`Slide ${idx + 1}`}
                    />
                  ))}
                </div>

              </div>
            </section>

            {/* SECCIÓN DE CONFIANZA EN CONVERSIONES (GLASSMORPHISM HORIZONTAL BARS) */}
            <section className="py-10 bg-zinc-900/25 text-xs font-mono uppercase tracking-[0.1em]" id="trust-bar">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-4">
                  
                  <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-800/50 border border-white/10 backdrop-blur-md shadow-lg">
                    <Truck size={18} className="text-amber-400 shrink-0" />
                    <span className="text-[10px] leading-tight text-neutral-400">Envíos Asegurados <br /><strong className="text-white">a todo México</strong></span>
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-800/50 border border-white/10 backdrop-blur-md shadow-lg">
                    <Shield size={18} className="text-amber-400 shrink-0" />
                    <span className="text-[10px] leading-tight text-neutral-400">Pagos Seguros <br /><strong className="text-white">Encriptación SSL</strong></span>
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-800/50 border border-white/10 backdrop-blur-md shadow-lg">
                    <Phone size={18} className="text-amber-400 shrink-0" />
                    <span className="text-[10px] leading-tight text-neutral-400">Atención Directa <br /><strong className="text-white">Personalizada 24/7</strong></span>
                  </div>

                  <div className="flex items-center gap-3 p-4 rounded-xl bg-zinc-800/50 border border-white/10 backdrop-blur-md shadow-lg">
                    <Sparkles size={18} className="text-amber-400 shrink-0" />
                    <span className="text-[10px] leading-tight text-neutral-400">Selección Curada <br /><strong className="text-white">Productos Certificados</strong></span>
                  </div>

                  <div className="col-span-2 md:col-span-4 lg:col-span-1 flex items-center gap-3 p-4 rounded-xl bg-zinc-800/50 border border-white/10 backdrop-blur-md shadow-lg justify-center lg:justify-start">
                    <Award size={18} className="text-amber-400 shrink-0" />
                    <span className="text-[10px] leading-tight text-neutral-400">Garantía Extrema <br /><strong className="text-white">de Satisfacción</strong></span>
                  </div>

                </div>
              </div>
            </section>

            {/* SECCIÓN DESTACADA: COLECCIÓN OFICIAL GRADO CERO (NUESTRO VALOR DOMINANTE) */}
            <section className="py-24 bg-zinc-950 relative" id="grado-cero-brand">
              
              {/* Esferas de luz sutil gótica para el efecto cristal */}
              <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-amber-500/5 rounded-full filter blur-[100px] pointer-events-none" />
              <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-neutral-500/5 rounded-full filter blur-[120px] pointer-events-none" />

              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                
                <div className="text-center space-y-3">
                  <span className="text-xs uppercase tracking-[0.3em] text-amber-500 font-mono font-semibold">Flaghsip Collection</span>
                  <h2 className="text-3xl sm:text-4xl font-serif font-light tracking-wide text-white">
                    Colección Oficial Grado Cero
                  </h2>
                  <div className="h-[2px] w-16 bg-amber-500/30 mx-auto" />
                  <p className="text-xs text-neutral-400 max-w-lg mx-auto font-light leading-relaxed">
                    Formulaciones de ultra-lujo molecular y biocosmética científica de Grado Cero. Diseños atemporales, ingredientes estables de máxima pureza.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
                  {officialProducts.map((p) => (
                    <div 
                      key={p.id}
                      className="bg-zinc-800/40 backdrop-blur-md border border-white/8 rounded-2xl overflow-hidden hover:border-amber-500/30 shadow-2xl transition-all duration-500 group flex flex-col sm:flex-row h-full relative"
                    >
                      <div className="sm:w-1/2 aspect-square sm:aspect-auto relative bg-zinc-900 p-6 flex items-center justify-center overflow-hidden">
                        <Image 
                          src={p.imageUrl} 
                          alt={p.name} 
                          fill 
                          className="object-cover opacity-95 group-hover:opacity-100 group-hover:scale-105 transition-all duration-750" 
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute inset-0 bg-neutral-950/10 pointer-events-none" />
                        
                        {/* Etiqueta de Marca Dominante Oficial */}
                        <span className="absolute top-3 left-3 bg-gradient-to-r from-amber-500/20 to-amber-700/20 backdrop-blur border border-amber-400/30 text-[9px] font-mono font-bold tracking-widest text-amber-300 px-2.5 py-1 rounded">
                          ★ GRADO CERO ORIGINAL
                        </span>
                      </div>

                      <div className="sm:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-4">
                        <div className="space-y-2">
                          <p className="text-[10px] font-mono text-neutral-500 tracking-wider">SKU: {p.sku}</p>
                          <h3 className="text-lg sm:text-xl font-serif text-white group-hover:text-amber-300 transition-colors cursor-pointer" onClick={() => setSelectedProduct(p)}>
                            {p.name}
                          </h3>
                          <div className="flex items-center gap-1.5 text-xs text-amber-500/90 font-mono">
                            <Star size={11} fill="currentColor" />
                            <span>{p.rating}</span>
                            <span className="text-neutral-500 font-normal">({p.reviews} reseñas)</span>
                          </div>
                          <p className="text-xs text-neutral-400 font-light leading-relaxed line-clamp-3">
                            {p.shortDesc}
                          </p>
                        </div>

                        <div>
                          <p className="text-[9px] text-neutral-500 uppercase font-mono tracking-widest">Inversión Exclusiva</p>
                          <p className="text-2xl font-serif font-light text-white tracking-tight">${p.price.toLocaleString('es-MX')} <span className="text-xs text-neutral-400 font-sans font-medium">MXN</span></p>
                          
                          <div className="mt-4 flex gap-2">
                            <button 
                              onClick={() => { setSelectedProduct(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                              className="flex-1 bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold py-2.5 rounded text-xs uppercase tracking-widest transition cursor-pointer text-center"
                            >
                              Comprar
                            </button>
                            <button 
                              onClick={() => handleBuyOnWhatsApp(p)}
                              className="p-2.5 bg-neutral-950 hover:bg-neutral-850 text-emerald-400 border border-emerald-500/20 hover:border-emerald-500/40 rounded transition cursor-pointer"
                              title="Consultar por WhatsApp"
                            >
                              <Phone size={14} className="fill-emerald-400" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

              </div>
            </section>

            {/* SECCIÓN CATÁLOG: INICIO DE FABRICANTES ALIADOS & BUSQUEDA INTEGRADORA */}
            <section className="py-24 bg-zinc-900/20 border-t border-white/10 relative" id="allied-catalog">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
                
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/5 pb-8">
                  <div className="space-y-3">
                    <span className="text-xs uppercase tracking-[0.3em] text-neutral-500 font-mono">Complementaria de Alta Gama</span>
                    <h2 className="text-3xl font-serif font-light text-white">
                      Colección de Fabricantes Aliados y Alternativos
                    </h2>
                    <p className="text-xs text-neutral-400 max-w-xl font-light">
                      Amplía el ticket promedio de tu tocador corporativo o personal con marcas de fabricantes independientes seleccionados con rigurosa afinidad estética y de efectividad.
                    </p>
                  </div>

                  {/* Accionador de Filtros Rápidos */}
                  <div className="bg-zinc-800/50 border border-white/10 p-2 rounded-lg flex gap-2 text-[10px] font-mono">
                    <button 
                      onClick={() => setBrandFilter('all')} 
                      className={`px-3 py-1.5 rounded transition ${brandFilter === 'all' ? 'bg-amber-500 text-black font-extrabold' : 'text-neutral-400'}`}
                    >
                      Todos ({products.length})
                    </button>
                    <button 
                      onClick={() => setBrandFilter('official')} 
                      className={`px-3 py-1.5 rounded transition ${brandFilter === 'official' ? 'bg-amber-500 text-black font-extrabold' : 'text-neutral-400'}`}
                    >
                      Grado Cero ({officialProducts.length})
                    </button>
                    <button 
                      onClick={() => setBrandFilter('allies')} 
                      className={`px-3 py-1.5 rounded transition ${brandFilter === 'allies' ? 'bg-amber-500 text-black font-extrabold' : 'text-neutral-400'}`}
                    >
                      Aliados ({alliedProducts.length})
                    </button>
                  </div>
                </div>

                {/* FILTROS INTERACTIVOS LATERALES Y CUADRÍCULA */}
                <div className="flex flex-col lg:flex-row gap-8">
                  
                  {/* Panel de Filtros a la Izquierda (Glassmorphism de Rigor) */}
                  <aside className="w-full lg:w-64 space-y-6 shrink-0 bg-zinc-800/35 border border-white/10 rounded-xl p-5 backdrop-blur-md self-start">
                    <div className="flex items-center gap-2 border-b border-white/5 pb-3">
                      <Filter size={14} className="text-amber-500" />
                      <h3 className="text-xs uppercase tracking-[0.2em] font-mono text-white font-bold">Filtro de Catálogo</h3>
                    </div>

                    {/* Categorías */}
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-mono uppercase text-neutral-400 font-bold">Categorías</h4>
                      <div className="flex flex-col gap-1">
                        {CATEGORIES.map((cat) => (
                          <button
                            key={cat.id}
                            onClick={() => setSelectedCategory(cat.id)}
                            className={`text-left text-xs py-1.5 px-3 rounded-md transition-all flex items-center justify-between ${
                              selectedCategory === cat.id 
                                ? 'bg-white/5 text-amber-400 font-semibold border-l-2 border-amber-500' 
                                : 'text-neutral-400 hover:text-white'
                            }`}
                          >
                            <span>{cat.name}</span>
                            <ChevronRight size={10} className="opacity-40" />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Rangos de Precio */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <h4 className="text-[10px] font-mono uppercase text-neutral-400 font-bold">Precio Máximo</h4>
                        <span className="text-xs font-mono text-amber-500">${priceMax} MXN</span>
                      </div>
                      <input 
                        type="range" 
                        min={500}
                        max={4000}
                        step={100}
                        value={priceMax}
                        onChange={(e) => setPriceMax(parseInt(e.target.value))}
                        className="w-full accent-amber-500 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                        title="Precio máximo"
                        aria-label="Precio máximo"
                      />
                      <div className="flex justify-between text-[10px] text-neutral-500 font-mono">
                        <span>$500 MXN</span>
                        <span>$4,000 MXN</span>
                      </div>
                    </div>

                    {/* Buscador de Producto */}
                    <div className="space-y-2">
                      <h4 className="text-[10px] font-mono uppercase text-neutral-400 font-bold">Buscar por texto</h4>
                      <input 
                        type="text" 
                        placeholder="ej: Absoluto, carbón..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-zinc-900/80 text-xs text-zinc-200 border border-white/10 p-2 rounded-md focus:outline-none focus:border-amber-500"
                      />
                    </div>

                    {/* Reset de todos los Filtros */}
                    <button 
                      onClick={() => {
                        setSearchTerm('');
                        setSelectedCategory('all');
                        setBrandFilter('all');
                        setPriceMax(4000);
                      }}
                      className="w-full py-2 bg-zinc-900/60 hover:bg-zinc-800/80 border border-white/10 hover:border-white/20 rounded text-[10px] uppercase font-mono tracking-wider font-semibold transition"
                    >
                      Limpiar Filtros
                    </button>
                  </aside>

                  {/* Cuadrícula de Exposición de Productos */}
                  <div className="flex-1 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {filteredProducts.map((p) => (
                        <div 
                          key={p.id}
                          className="bg-zinc-800/35 border border-white/10 hover:border-amber-500/30 hover:bg-zinc-800/60 rounded-xl overflow-hidden shadow-xl transition-all duration-300 group flex flex-col h-full relative"
                        >
                          
                          {/* Badge Identificativo */}
                          <div className="absolute top-3 left-3 z-10">
                            {p.isOfficial ? (
                              <span className="bg-amber-500/10 backdrop-blur-md border border-amber-500/35 text-[8px] font-mono font-bold tracking-widest text-amber-400 px-2.5 py-0.5 rounded">
                                ⭐ ORIGINAL GRADO CERO
                              </span>
                            ) : (
                              <span className="bg-neutral-800/60 backdrop-blur-md border border-white/10 text-[8px] font-mono tracking-widest text-neutral-300 px-2.5 py-0.5 rounded">
                                🤝 FABRICANTE ALIADO ({p.brand})
                              </span>
                            )}
                          </div>

                          {/* Imagen con Reflejo */}
                          <div 
                            onClick={() => { setSelectedProduct(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                            className="aspect-square bg-zinc-950 p-6 flex items-center justify-center relative cursor-pointer overflow-hidden border-b border-white/10"
                          >
                            <Image 
                              src={p.imageUrl} 
                              alt={p.name} 
                              fill 
                              className="object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
                              referrerPolicy="no-referrer"
                            />
                            <div className="absolute inset-0 bg-neutral-900/5 pointer-events-none" />
                          </div>

                          {/* Contenido Comercial */}
                          <div className="p-4 flex flex-col justify-between flex-1 space-y-3">
                            <div className="space-y-1">
                              <p className="text-[9px] font-mono text-neutral-500 uppercase">{p.category}</p>
                              <h4 
                                onClick={() => { setSelectedProduct(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                                className="text-sm font-serif text-neutral-100 group-hover:text-amber-400 transition-colors line-clamp-1 cursor-pointer leading-tight font-medium"
                              >
                                {p.name}
                              </h4>
                              <p className="text-[11px] text-neutral-400 font-light leading-relaxed line-clamp-2">
                                {p.shortDesc}
                              </p>
                            </div>

                            <div className="pt-2 border-t border-white/5 flex items-end justify-between">
                              <div>
                                <p className="text-[8px] text-neutral-500 font-mono tracking-widest">PRECIO INVERSIÓN</p>
                                <p className="text-base font-serif font-light text-white">${p.price.toLocaleString('es-MX')} <span className="text-[9px] font-sans font-normal text-neutral-400">MXN</span></p>
                              </div>

                              <button 
                                onClick={() => handleAddToCart(p, 1)}
                                className="bg-amber-500/10 hover:bg-amber-500 text-amber-400 hover:text-black border border-amber-500/25 hover:border-amber-500 transition-all text-[9px] uppercase tracking-widest font-mono font-black py-2 px-3 rounded cursor-pointer"
                              >
                                Añadir
                              </button>
                            </div>
                          </div>

                        </div>
                      ))}

                      {filteredProducts.length === 0 && (
                        <div className="col-span-full py-16 text-center text-neutral-500 space-y-3">
                          <Search className="mx-auto w-10 h-10 text-neutral-700" />
                          <p className="text-sm">No encontramos productos con los filtros seleccionados.</p>
                          <button 
                            onClick={() => {
                              setSearchTerm('');
                              setSelectedCategory('all');
                              setBrandFilter('all');
                              setPriceMax(4000);
                            }}
                            className="text-amber-500 hover:underline text-xs tracking-wider uppercase font-mono"
                          >
                            Restablecer búsqueda
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                </div>

              </div>
            </section>

          </motion.div>
        ) : (
          
          // ==================== FICHA DETALLE SIMPLE / COMPREHENSIVE VIEW (GLASSMORPHISM EXTRACT) ====================
          <motion.div 
            key="product-detail"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-12"
          >
            {/* Migas de Pan y Botón de Retorno */}
            <div className="flex items-center gap-2 text-xs uppercase tracking-[0.15em] text-neutral-400">
              <button 
                onClick={() => setSelectedProduct(null)}
                className="flex items-center gap-1.5 hover:text-amber-400 transition-colors cursor-pointer text-white font-bold"
              >
                <ArrowLeft size={14} /> Volver al catálogo
              </button>
              <span>/</span>
              <span className="text-neutral-600">{selectedProduct.category}</span>
              <span>/</span>
              <span className="text-neutral-400 font-mono truncate">{selectedProduct.sku}</span>
            </div>

            {/* Contenedor Escombroso de la Ficha */}
            <div className="bg-zinc-800/40 border border-white/10 backdrop-blur-md rounded-2xl p-6 md:p-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 shadow-2xl">
              
              {/* Bloque Izquierdo: Galería de Fotos (Fusión Múltiples Ángulos) */}
              <div className="lg:col-span-6 space-y-4 flex flex-col md:flex-row gap-4">
                
                {/* Miniaturas a la izquierda en computadoras */}
                <div className="flex md:flex-col gap-3 shrink-0 order-2 md:order-1">
                  {selectedProduct.allImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImageIndex(i)}
                      className={`w-14 h-14 rounded-lg bg-neutral-950 p-1 border relative overflow-hidden transition-all ${
                        activeImageIndex === i ? 'border-amber-500 ring-1 ring-amber-500/40' : 'border-white/5 hover:border-white/15'
                      }`}
                      title={`Ver ángulo ${i + 1}`}
                      aria-label={`Ver ángulo ${i + 1}`}
                    >
                      <Image 
                        src={img} 
                        alt={`Ángulo ${i + 1}`} 
                        fill 
                        className="object-cover opacity-80" 
                        referrerPolicy="no-referrer"
                      />
                    </button>
                  ))}
                </div>

                {/* Gran Imagen de Exposición */}
                <div className="flex-1 aspect-[4/5] bg-zinc-950 border border-white/10 rounded-xl relative overflow-hidden flex items-center justify-center p-8 order-1 md:order-2">
                  <Image 
                    src={selectedProduct.allImages[activeImageIndex]}
                    alt={selectedProduct.name}
                    fill
                    priority
                    className="object-cover opacity-95 hover:scale-102 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-neutral-900/5 pointer-events-none" />
                </div>
              </div>

              {/* Bloque Derecho: Conversión y Argumento Comercial */}
              <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
                
                <div className="space-y-4">
                  
                  {/* Badge de Pureza / Alianza */}
                  <div>
                    {selectedProduct.isOfficial ? (
                      <span className="inline-block bg-amber-500/10 border border-amber-500/30 text-[9px] font-mono font-bold tracking-widest text-amber-400 px-3 py-1 rounded">
                        ★ PRODUCTO OFICIAL GRADO CERO
                      </span>
                    ) : (
                      <span className="inline-block bg-neutral-800/60 border border-white/10 text-[9px] font-mono tracking-widest text-neutral-300 px-3 py-1 rounded">
                        🤝 FABRICANTE ALIADO ({selectedProduct.brand})
                      </span>
                    )}
                  </div>

                  <h1 className="text-3xl sm:text-4xl font-serif text-white tracking-wide leading-tight">
                    {selectedProduct.name}
                  </h1>

                  {/* Reseñas */}
                  <div className="flex items-center gap-1.5 text-xs text-neutral-300 font-mono">
                    <div className="flex text-amber-400 items-center">
                      {[...Array(5)].map((_, idx) => (
                        <Star key={idx} size={13} fill={idx < Math.floor(selectedProduct.rating) ? 'currentColor' : 'none'} className="shrink-0" />
                      ))}
                    </div>
                    <span>{selectedProduct.rating}</span>
                    <span className="text-neutral-600">({selectedProduct.reviews} reseñas corporativas)</span>
                  </div>

                  {/* Precios sin rodeos */}
                  <div className="bg-zinc-900/60 p-5 rounded-xl border border-white/10 space-y-1">
                    <p className="text-[10px] text-neutral-500 font-mono tracking-widest uppercase">Precio Oficial de Suministro</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-serif text-white font-light tracking-tight">
                        ${selectedProduct.price.toLocaleString('es-MX')}
                      </span>
                      <span className="text-xs text-neutral-400 font-mono uppercase">MXN / NETO</span>
                    </div>
                    <p className="text-[10px] text-emerald-400 font-mono flex items-center gap-1 pt-1.5 font-bold">
                      <Check size={12} className="stroke-[2.5]" /> {selectedProduct.availability} • Envío express gratuito
                    </p>
                  </div>

                  {/* Argumentación Comercial */}
                  <div className="space-y-2">
                    <h3 className="text-xs uppercase tracking-widest font-mono text-neutral-400 font-bold">Descripción</h3>
                    <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed whitespace-pre-wrap">
                      {selectedProduct.longDesc}
                    </p>
                  </div>

                </div>

                {/* ACCIONES DE COMPRA PARA CONVERSIÓN EXTREMA */}
                <div className="space-y-4 pt-4 border-t border-white/5">
                  
                  {/* BOTÓN PRIMARIO DE COMPRA WHATSAPP (Estrategia Central) */}
                  <button 
                    onClick={() => handleBuyOnWhatsApp(selectedProduct)}
                    className="w-full bg-emerald-600 hover:bg-emerald-500 active:scale-[0.98] text-white font-extrabold py-3.5 rounded-xl transition-all duration-300 text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-emerald-600/15"
                  >
                    <Phone size={15} className="fill-white" /> Comprar por WhatsApp
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    
                    {/* Botón Añadir a Carrito con pasarela */}
                    <button 
                      onClick={() => handleAddToCart(selectedProduct, 1)}
                      className="bg-neutral-900 border border-white/10 hover:border-white/20 text-neutral-300 hover:text-white font-bold py-3 rounded-lg text-xs uppercase tracking-widest transition cursor-pointer"
                    >
                      Añadir al carrito
                    </button>

                    {/* Botón de Mayoreo Secundario */}
                    <button 
                      onClick={() => { setWholesaleProduct(selectedProduct); setWholesaleModalOpen(true); }}
                      className="bg-neutral-950 hover:bg-neutral-900 border border-amber-500/20 hover:border-amber-500/40 text-amber-500 font-bold py-3 rounded-lg text-xs uppercase tracking-widest transition cursor-pointer"
                    >
                      Opción Mayoreo
                    </button>

                  </div>

                  <p className="text-center text-[10px] text-neutral-500 font-mono leading-relaxed">
                    ¿Requieres embalaje personalizado, mayoreo para boutiques o amenidades hoteleras? Conversa de inmediato con nuestro especialista de suministro o solicita presupuesto.
                  </p>

                </div>

              </div>
            </div>

            {/* TABLA DE ESPECIFICACIONES TÉCNICAS */}
            <div className="bg-zinc-800/40 border border-white/10 rounded-2xl p-6 md:p-8 space-y-6">
              <h3 className="text-lg font-serif text-white flex items-center gap-2">
                <Info size={16} className="text-amber-500" /> Ficha Técnica y Composición Química
              </h3>

              <div className="border border-white/10 rounded-xl overflow-hidden divide-y divide-white/10 font-light text-xs sm:text-sm">
                {Object.entries(selectedProduct.specs).map(([key, val]) => (
                  <div key={key} className="grid grid-cols-1 md:grid-cols-12">
                    <div className="md:col-span-4 bg-zinc-900/80 p-4 font-mono text-[10px] uppercase text-neutral-400 font-bold tracking-wider">
                      {key}
                    </div>
                    <div className="md:col-span-8 p-4 text-neutral-200">
                      {val}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PRODUCTOS RELACIONADOS RECOMENDADOS (COMPLEMENTARIOS) */}
            <section className="space-y-6 border-t border-white/5 pt-12">
              <h3 className="text-xl font-serif text-white">Quienes exploraron esta pieza también adquirieron</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.filter(p => p.id !== selectedProduct.id).slice(0, 4).map((p) => (
                  <div 
                    key={p.id}
                    onClick={() => { setSelectedProduct(p); setActiveImageIndex(0); }}
                    className="bg-neutral-900/40 border border-white/5 rounded-xl overflow-hidden hover:border-amber-500/25 transition cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="aspect-[4/3] relative bg-neutral-950 overflow-hidden">
                      <Image src={p.imageUrl} alt={p.name} fill className="object-cover opacity-75 group-hover:scale-103 group-hover:opacity-100 transition-all duration-300" referrerPolicy="no-referrer" />
                    </div>
                    <div className="p-4 space-y-1">
                      <p className="text-[8px] font-mono text-neutral-500 uppercase">{p.category}</p>
                      <h4 className="text-xs font-serif text-white group-hover:text-amber-400 transition-colors truncate">{p.name}</h4>
                      <p className="text-xs font-mono text-amber-500">${p.price.toLocaleString('es-MX')} MXN</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </motion.div>
        )}
      </AnimatePresence>

      {/* --- CARRITO / ESTIMADOR EN TIEMPO REAL (SLIDE OVER DRAWER) --- */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            
            {/* Capa Traslúcida de fondo */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Contenedor del Drawer */}
            <div className="absolute inset-y-0 right-0 pl-10 max-w-full flex">
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="w-screen max-w-md bg-zinc-950 border-l border-white/10 text-neutral-200 flex flex-col h-full shadow-2xl relative"
              >
                {/* Cabecera */}
                <div className="p-6 border-b border-white/10 bg-neutral-900/30 flex justify-between items-center bg-zinc-950">
                  <div>
                    <h3 className="font-serif text-white text-lg">Tu Selección Premium</h3>
                    <p className="text-[9px] text-neutral-500 font-mono uppercase tracking-[0.2em]">Estimado en tiempo real</p>
                  </div>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="p-1 rounded-lg hover:bg-neutral-900 text-neutral-400 hover:text-white transition cursor-pointer"
                    title="Cerrar carrito"
                    aria-label="Cerrar carrito"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Lista del Carrito */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cart.length > 0 ? (
                    cart.map((item) => (
                      <div key={item.product.id} className="bg-zinc-800/50 border border-white/10 p-4 rounded-xl space-y-3 relative">
                        
                        {/* Eliminar de Selección */}
                        <button 
                          onClick={() => handleRemoveFromCart(item.product.id)}
                          className="absolute top-4 right-4 text-neutral-550 hover:text-red-400 transition cursor-pointer"
                          title="Eliminar producto"
                          aria-label="Eliminar producto"
                        >
                          <Trash2Icon />
                        </button>

                        <div className="flex gap-3">
                          <div className="w-12 h-12 rounded-lg border border-white/5 relative overflow-hidden shrink-0">
                            <Image src={item.product.imageUrl} alt={item.product.name} fill className="object-cover" referrerPolicy="no-referrer" />
                          </div>
                          <div className="truncate flex-1 pr-4">
                            <p className="text-[8px] font-mono text-neutral-500">{item.product.sku}</p>
                            <h5 className="font-serif text-xs text-white truncate leading-tight font-medium">{item.product.name}</h5>
                            <p className="text-[10px] text-amber-500 font-mono mt-0.5">${item.product.price} MXN c/u</p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between border-t border-white/5 pt-3">
                          {/* Modificador de Cantidad */}
                          <div className="flex items-center gap-2 bg-zinc-900 border border-white/10 rounded p-0.5">
                            <button 
                              onClick={() => handleUpdateQuantity(item.product.id, item.quantity - 1)}
                              className="px-2 py-0.5 hover:bg-neutral-900 text-neutral-400 font-bold text-xs transition"
                            >
                              -
                            </button>
                            <span className="text-xs font-mono font-bold text-white min-w-[20px] text-center">{item.quantity}</span>
                            <button 
                              onClick={() => handleUpdateQuantity(item.product.id, item.quantity + 1)}
                              className="px-2 py-0.5 hover:bg-neutral-900 text-neutral-400 font-bold text-xs transition"
                            >
                              +
                            </button>
                          </div>

                          <span className="font-mono text-xs text-neutral-300 font-bold">
                            Subtotal: ${ (item.product.price * item.quantity).toLocaleString('es-MX') }
                          </span>
                        </div>

                      </div>
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-16 text-neutral-500 space-y-4">
                      <ShoppingCart className="w-10 h-10 text-neutral-700 stroke-[1.5]" />
                      <p className="text-xs leading-normal max-w-xs font-light">
                        No has añadido productos de autor a tu selección activa. Explora el catálogo y agrégalos de inmediato a tu tocador.
                      </p>
                      <button 
                        onClick={() => setIsCartOpen(false)}
                        className="text-xs font-bold text-amber-500 hover:underline cursor-pointer tracking-widest font-mono uppercase"
                      >
                        Cerrar y Explorar
                      </button>
                    </div>
                  )}
                </div>

                {/* Subtotal y pasarelas de pago */}
                <div className="p-6 border-t border-white/5 bg-neutral-900/30 space-y-4">
                  {cart.length > 0 && (
                    <>
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs text-neutral-400 font-mono">
                          <span>Suma de Artículos</span>
                          <span>${cart.reduce((sum, item) => sum + (item.quantity * item.product.price), 0).toLocaleString('es-MX')} MXN</span>
                        </div>
                        <div className="flex justify-between text-xs text-emerald-400 font-mono font-bold">
                          <span>Entrega Premium</span>
                          <span>SIN COSTO (Express)</span>
                        </div>
                        <div className="border-t border-white/5 pt-2.5 flex justify-between text-sm font-bold text-white font-serif">
                          <span>Inversión Total Neto</span>
                          <span className="text-neutral-100 font-mono text-base text-amber-400">
                            ${cart.reduce((sum, item) => sum + (item.quantity * item.product.price), 0).toLocaleString('es-MX')}
                          </span>
                        </div>
                      </div>

                      {/* Botón de Pago con Stripe */}
                      <button
                        onClick={handleCartStripeCheckout}
                        disabled={isAuthLoading}
                        className="w-full bg-amber-500 hover:bg-amber-600 font-extrabold py-3 rounded-lg text-neutral-950 transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer shadow"
                      >
                        {isAuthLoading ? <Loader2 size={14} className="animate-spin" /> : 'Proceder al Pago con Stripe 💳'}
                      </button>

                      {/* Botón Consolidado por WhatsApp */}
                      <button
                        onClick={() => {
                          const orderDetails = cart.map(item => `- ${item.product.name} (Cantidad: ${item.quantity})`).join('\n');
                          const text = `Hola Grado Cero, me interesa consolidar la compra de mi carrito decorativo:\n${orderDetails}\n\nCon un total neto de $${cart.reduce((sum, item) => sum + (item.quantity * item.product.price), 0).toLocaleString('es-MX')} MXN. ¿Me podrían asesorar por esta vía? Muchas gracias.`;
                          window.open(`https://wa.me/525555555555?text=${encodeURIComponent(text)}`, '_blank');
                        }}
                        className="w-full bg-emerald-600 hover:bg-emerald-500 font-extrabold py-3 rounded-lg text-white transition-all text-xs uppercase tracking-widest flex items-center justify-center gap-2 cursor-pointer border border-emerald-500/20"
                      >
                        <Phone size={14} className="fill-white animate-pulse" /> Consolidar por WhatsApp
                      </button>
                    </>
                  )}

                  <div className="flex gap-2 p-3 bg-neutral-950 border border-white/5 rounded-lg text-[9px] text-neutral-500 leading-normal">
                    <Info size={14} className="text-amber-500 shrink-0 mt-0.5" />
                    <span>Cada orden de Grado Cero incluye obsequios de viales miniatura de autor y se procesa bajo los más altos estándares de paquetería de ultra-lujo.</span>
                  </div>
                </div>

              </motion.div>
            </div>

          </div>
        )}
      </AnimatePresence>

      {/* --- MODAL DE AUTENTICACIÓN (ESTÉTICA DARK GLASS) --- */}
      <AnimatePresence>
        {authModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setAuthModalOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-sm bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden p-6 sm:p-8 space-y-6 z-10"
            >
              <div className="text-center space-y-2">
                <div className="w-12 h-12 bg-gradient-to-tr from-amber-500 to-amber-700 text-neutral-950 flex items-center justify-center font-serif text-lg font-bold rounded-xl mx-auto shadow">
                  GC
                </div>
                <h3 className="text-lg font-serif text-white tracking-wide">
                  {authIsRegisterState ? 'Crear Perfil Premium' : 'Ingresar a Maison'}
                </h3>
                <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-[0.15em]">
                  Acceso exclusivo para socios
                </p>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                {authIsRegisterState && (
                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 font-bold">Nombre</label>
                    <input 
                      type="text" 
                      required
                      placeholder="ej: Constanza Medina"
                      value={authName}
                      onChange={(e) => setAuthName(e.target.value)}
                      className="w-full bg-zinc-950/80 border border-white/10 rounded p-2.5 text-xs focus:outline-none focus:border-amber-500 text-neutral-250"
                    />
                  </div>
                )}

                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 font-bold">Correo electrónico</label>
                  <input 
                    type="email" 
                    required
                    placeholder="ej: cliente@maison.com"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    className="w-full bg-zinc-950/80 border border-white/10 rounded p-2.5 text-xs focus:outline-none focus:border-amber-500 text-neutral-250"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 font-bold">Contraseña</label>
                  <input 
                    type="password" 
                    required
                    placeholder="••••••••"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    className="w-full bg-zinc-950/80 border border-white/10 rounded p-2.5 text-xs focus:outline-none focus:border-amber-500 text-neutral-250"
                  />
                </div>

                {authError && <p className="text-[9px] text-red-500 font-mono bg-red-500/10 p-2 rounded">{authError}</p>}

                <button
                  type="submit"
                  disabled={isAuthLoading}
                  className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-neutral-950 font-bold py-2.5 rounded text-xs uppercase tracking-widest transition cursor-pointer"
                >
                  {isAuthLoading ? <Loader2 size={12} className="animate-spin mx-auto" /> : (authIsRegisterState ? 'Crear Perfil comercial' : 'Acceder')}
                </button>
              </form>

              <div className="text-center pt-2 border-t border-white/5">
                <button
                  onClick={() => setAuthIsRegisterState(!authIsRegisterState)}
                  className="text-[10px] text-neutral-400 hover:text-amber-400 font-mono uppercase tracking-wider transition"
                >
                  {authIsRegisterState ? '¿Ya tienes perfil? Inicia sesión' : '¿Socio nuevo? Crea tu perfil'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- MODAL DE SOLICITUD DE MAYOREO Y AMENIDADES --- */}
      <AnimatePresence>
        {wholesaleModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setWholesaleModalOpen(false)}
              className="absolute inset-0 bg-black/85 backdrop-blur-sm"
            />

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-md bg-zinc-900 border border-white/10 rounded-2xl overflow-hidden p-6 sm:p-8 space-y-6 z-10"
            >
              {/* Header */}
              <div className="text-center space-y-2">
                <span className="p-1.5 px-3 bg-amber-500/10 border border-amber-500/30 text-[9px] font-mono tracking-widest text-amber-400 font-bold uppercase rounded-full">
                  Línea Corporativa & Mayoreo
                </span>
                <h3 className="text-xl font-serif text-white tracking-wide">
                  Plan de Suministros y Distribución Grado Cero
                </h3>
                <p className="text-[10px] text-neutral-500 font-mono tracking-relaxed leading-relaxed">
                  Descuentos de hasta el 40% para distribución comercial, boutiques y amenities de hospitalidad premium.
                </p>
              </div>

              {wholesaleSuccess ? (
                <div className="py-8 text-center space-y-3 flex flex-col items-center">
                  <div className="w-12 h-12 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-400 border border-emerald-500/20">
                    <Check size={24} />
                  </div>
                  <h4 className="font-serif text-white">¡Solicitud Procesada!</h4>
                  <p className="text-xs text-neutral-400 leading-normal max-w-xs font-light">
                    Un asesor técnico de Grado Cero se comunicará de inmediato con su corporativo para ofrecer tarifas y convenios especiales.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleWholesaleSubmit} className="space-y-4">
                  
                  {wholesaleProduct && (
                    <div className="bg-neutral-950 p-3 rounded-lg border border-white/5 flex gap-3">
                      <div className="w-10 h-10 relative overflow-hidden rounded border border-white/5 bg-neutral-900 shrink-0">
                        <Image src={wholesaleProduct.imageUrl} alt={wholesaleProduct.name} fill className="object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="truncate">
                        <p className="text-[8px] font-mono text-neutral-500 uppercase">Artículo de Interés</p>
                        <h4 className="text-xs font-serif text-white truncate font-medium">{wholesaleProduct.name}</h4>
                      </div>
                    </div>
                  )}

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 font-bold">Correo Electrónico Corporativo</label>
                    <input 
                      type="email" 
                      required
                      placeholder="ejemplo@bodega.com"
                      value={wholesaleEmail}
                      onChange={(e) => setWholesaleEmail(e.target.value)}
                      className="w-full bg-zinc-950/80 border border-white/10 rounded p-2.5 text-xs focus:outline-none focus:border-amber-500 text-neutral-250"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[9px] font-mono uppercase tracking-wider text-neutral-400 font-bold">
                      <span>Cantidad Estimada de Unidades</span>
                      <span className="text-amber-500">{wholesaleUnits} unidades</span>
                    </div>
                    <input 
                      type="range" 
                      min={20}
                      max={1000}
                      step={10}
                      value={wholesaleUnits}
                      onChange={(e) => setWholesaleUnits(parseInt(e.target.value))}
                      className="w-full accent-amber-500 h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer"
                      title="Cantidad estimada de unidades"
                      aria-label="Cantidad estimada de unidades"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-mono uppercase tracking-wider text-neutral-400 font-bold font-semibold">Notas especiales o Requerimientos de Marca</label>
                    <textarea 
                      rows={2}
                      value={wholesaleNotes}
                      onChange={(e) => setWholesaleNotes(e.target.value)}
                      placeholder="p. ej., Solicito cotización con etiqueta privada para hotel boutique en Los Cabos."
                      className="w-full bg-neutral-950 border border-white/5 rounded p-2.5 text-xs focus:outline-none focus:border-amber-500 text-neutral-200"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isAuthLoading}
                    className="w-full bg-amber-500 hover:bg-amber-600 disabled:opacity-50 text-neutral-950 font-bold py-2.5 rounded text-xs uppercase tracking-widest transition cursor-pointer"
                  >
                    {isAuthLoading ? <Loader2 size={12} className="animate-spin mx-auto" /> : 'Enviar Solicitud de Distribuidor'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* --- BOTÓN FLOTANTE DE WHATSAPP VISIBLE EN TODO MOMENTO --- */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            const productText = selectedProduct 
              ? `¿Me podrían asistir con la fragancia o tratamiento "${selectedProduct.name}" (SKU: ${selectedProduct.sku})?`
              : "Hola Grado Cero, me gustaría recibir asistencia exclusiva de cuidado personal e información de envíos.";
            window.open(`https://wa.me/525555555555?text=${encodeURIComponent(productText)}`, '_blank');
          }}
          className="bg-emerald-600 hover:bg-emerald-500 text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer relative group border border-emerald-500/20"
          id="whatsapp-floating-bubble"
        >
          <Phone size={22} className="fill-white" />
          
          <span className="max-w-0 overflow-hidden group-hover:max-w-[200px] transition-all duration-300 ease-in-out text-xs font-bold whitespace-nowrap tracking-wider font-mono pl-0 group-hover:pl-2">
            Maison Asesor
          </span>

          <span className="absolute -top-1 -right-1 flex h-4.5 w-4.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4.5 w-4.5 bg-emerald-500 text-[10px] font-black text-white flex items-center justify-center">1</span>
          </span>
        </motion.button>
      </div>

      {/* PIE DE PÁGINA CORPORATIVO */}
      <Footer />

    </div>
  );
}

// --- ICONOS LOCALES MENORES ---
const Trash2Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2 text-neutral-500 hover:text-red-400 transition-colors">
    <path d="M3 6h18"/>
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
    <line x1="10" x2="10" y1="11" y2="17"/>
    <line x1="14" x2="14" y1="11" y2="17"/>
  </svg>
);
