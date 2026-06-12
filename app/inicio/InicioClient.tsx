'use client';

import React, { useState, useEffect } from 'react';
import {
  Search,
  ShoppingCart,
  Menu,
  ChevronRight,
  Droplet,
  Shield,
  Wind,
  Wrench,
  Trash2,
  Brush,
  Zap,
  ArrowLeft,
  Check,
  Star,
  Users,
  Building2,
  Phone,
  Mail,
  Lock,
  Loader2,
  X,
  FileText,
  Clock,
  LogOut,
  ChevronDown,
  Info,
  Bot,
  Send,
  MessageSquare,
  Sparkles
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'motion/react';
import { Footer } from '@/components/layout/Footer';

// === DEFINICIONES DE TIPOS ===
interface Product {
  id: string;
  sku: string;
  name: string;
  description: string;
  category: string;
  purchaseCost: number;
  finalSalePrice: number;
  imageUrl: string;
  stock: number;
  rating: number;
  sales: number;
  specs: Record<string, string>;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface QuoteItem {
  id: string;
  quoteNumber: string;
  clientName: string;
  companyName: string;
  agentName: string;
  itemCount: number;
  totalAmount: number;
  status: 'PENDING' | 'ACCEPTED' | 'REJECTED' | 'COMPLETED';
  date: string;
  notes?: string;
  items: { productName: string; quantity: number; unitPrice: number }[];
}

interface UserSession {
  email: string;
  name: string;
  companyName: string;
  phone: string;
  loginMethod: 'google' | 'phone' | 'email';
}

// === DATOS DE MAQUETA ENRIQUECIDOS ===
const initialProductsList: Product[] = [
  {
    id: 'p1',
    sku: 'GC-QI-001',
    name: 'Desengrasante Industrial Alto Rendimiento 20L',
    category: 'Químicos Industriales',
    description: 'Desengrasante concentrado base agua de alto desempeño diseñado para remover aceites pesados, grasas carbonizadas e hidrocarburos en maquinaria pesada y pisos industriales. Biodegradable y libre de solventes clorados.',
    purchaseCost: 96.53,
    finalSalePrice: 125.50,
    imageUrl: 'https://picsum.photos/seed/desengrasante/600/600',
    stock: 450,
    rating: 4.9,
    sales: 124,
    specs: {
      'Presentación': 'Galón Reforzado de 20 Litros',
      'Biodegradable': 'Sí (Fórmula ecológica)',
      'Valor de pH': '12.5 (Alcalino fuerte)',
      'Dilución Recomendada': '1:10 hasta 1:50 según nivel de grasa',
      'Certificación': 'ISO 9001, FDA indirect food contact'
    }
  },
  {
    id: 'p2',
    sku: 'GC-PC-023',
    name: 'Papel Higiénico Jumbo Roll 500m (Caja 6 uni)',
    category: 'Papel & Celulosa',
    description: 'Papel de alta resistencia y suavidad óptimo para dispensers de tráfico pesado. Doble hoja con precorte texturizado para un consumo eficiente. Ideal para oficinas, estadios e industrias.',
    purchaseCost: 35.30,
    finalSalePrice: 45.90,
    imageUrl: 'https://picsum.photos/seed/papeljumbo/600/600',
    stock: 1200,
    rating: 4.7,
    sales: 580,
    specs: {
      'Longitud Total': '500 metros por rollo',
      'Cantidad': 'Caja con 6 rollos jumbo',
      'Número de Hojas': 'Doble hoja absorbente',
      'Ancho': '9 cm',
      'Textura': 'Gofrado suave'
    }
  },
  {
    id: 'p3',
    sku: 'GC-EP-011',
    name: 'Mascarilla Respirador Medio Rostro 3M 6200',
    category: 'Equipos de Protección (EPP)',
    description: 'Respirador reutilizable de medio rostro que ofrece protección versátil contra gases, vapores y partículas. El diseño de perfil bajo ofrece mejor visibilidad e integración con gafas de seguridad.',
    purchaseCost: 24.76,
    finalSalePrice: 32.20,
    imageUrl: 'https://picsum.photos/seed/mascarilla/600/600',
    stock: 120,
    rating: 4.8,
    sales: 310,
    specs: {
      'Marca': '3M original',
      'Modelo': '6200 (Talla M)',
      'Material': 'Termoplástico elastómero sintético',
      'Tipo de Conexión': 'Bayoneta (Cartucho doble)',
      'Aprobación': 'NIOSH / OSHA'
    }
  },
  {
    id: 'p4',
    sku: 'GC-IM-045',
    name: 'Escoba Barredora Industrial Filamentos Duros',
    category: 'Implementos Manuales',
    description: 'Escoba de alta densidad con cerdas rígidas aptas para concreto, asfalto y superficies rugosas. Excelente vida útil e inalterable ante ambientes ácidos o alcalinos.',
    purchaseCost: 13.84,
    finalSalePrice: 18.00,
    imageUrl: 'https://picsum.photos/seed/escoba/600/600',
    stock: 35,
    rating: 4.5,
    sales: 92,
    specs: {
      'Cerdas': 'Polipropileno de alto impacto 4"',
      'Ancho de Bloque': '60 cm',
      'Mango Incluido': 'Madera premium roscable de 1.50m',
      'Resistencia Térmica': 'Hasta 90°C'
    }
  },
  {
    id: 'p5',
    sku: 'GC-QI-002',
    name: 'Cloro Concentrado 5% Galón 4L',
    category: 'Químicos Industriales',
    description: 'Desinfectante e higienizante clorado Premium para la sanitización profunda de superficies operativas, baños e instalaciones sanitarias de alto contacto. Elimina el 99.9% de gérmenes comunes.',
    purchaseCost: 8.50,
    finalSalePrice: 11.05,
    imageUrl: 'https://picsum.photos/seed/clorConcentrado/600/600',
    stock: 800,
    rating: 4.6,
    sales: 420,
    specs: {
      'Concentración': 'Hipoclorito de sodio al 5%',
      'Presentación': 'Galón 4 Litros',
      'Caducidad': '12 meses bajo almacenamiento fresco',
      'Acción bactericida': 'Verificación microbiológica de rango completo'
    }
  },
  {
    id: 'p6',
    sku: 'GC-EP-012',
    name: 'Guantes de Nitrilo de Alta Resistencia (Caja 100u)',
    category: 'Equipos de Protección (EPP)',
    description: 'Guantes descartables de nitrilo de grado químico. Libres de látex y polvo, texturizados en la punta de los dedos para un agarre excepcional en condiciones húmedas u aceitosas.',
    purchaseCost: 14.23,
    finalSalePrice: 18.50,
    imageUrl: 'https://picsum.photos/seed/nitriloguantes/600/600',
    stock: 340,
    rating: 4.8,
    sales: 650,
    specs: {
      'Material': 'Nitrilo sintético 100%',
      'Color': 'Negro industrial',
      'Espesor de pared': '6 milésimas (ultra reforzado)',
      'Tallas': 'M / L / XL',
      'Presentación': 'Caja dispensadora de 100 unidades'
    }
  },
  {
    id: 'p7',
    sku: 'GC-PC-024',
    name: 'Toalla de Papel Interdoblada (Caja 2000 hojas)',
    category: 'Papel & Celulosa',
    description: 'Hojas de toalla intercaladas biodegradables ultra absorbentes de alta resistencia química. La caja contiene empaques higiénicos sellados listos para dispensadores estándar.',
    purchaseCost: 23.00,
    finalSalePrice: 29.90,
    imageUrl: 'https://picsum.photos/seed/toalladoblada/600/600',
    stock: 410,
    rating: 4.4,
    sales: 240,
    specs: {
      'Empaque': 'Caja con 2,000 toallas (10 fajillas de 200u)',
      'Medidas de servicio': '21 x 24 cm',
      'Material': 'Celulosa reciclada premium',
      'Compatibilidad': 'Dispensadores de toallas en Z'
    }
  },
  {
    id: 'p8',
    sku: 'GC-ML-099',
    name: 'Aspiradora Industrial Polvo y Agua 30L',
    category: 'Maquinaria de Limpieza',
    description: 'Equipo profesional de alta succión con motor bypass de doble etapa. Tanque de acero inoxidable resistente ante químicos corrosivos cotidianos. Ruedas pivotantes multidireccionales.',
    purchaseCost: 145.38,
    finalSalePrice: 189.00,
    imageUrl: 'https://picsum.photos/seed/aspiradora/600/600',
    stock: 45,
    rating: 4.9,
    sales: 38,
    specs: {
      'Capacidad del Tanque': '30 Litros',
      'Material Cuerpo': 'Acero Inoxidable Cr-Ni',
      'Potencia': '1400 Watts / 1.8 HP',
      'Flujo de Aire': '53 lts / segundo',
      'Voltajes': '220V standard industrial'
    }
  },
  {
    id: 'p9',
    sku: 'GC-GR-102',
    name: 'Contenedor Móvil de Basura de 120L con Ruedas',
    category: 'Gestión de Residuos',
    description: 'Bote de basura móvil inyectado en HDPE de alta densidad con aditivo filtro UV para uso exterior rudo. Eje de acero sólido y llantas de hule macizo antiponchaduras.',
    purchaseCost: 37.69,
    finalSalePrice: 49.00,
    imageUrl: 'https://picsum.photos/seed/contenedor/600/600',
    stock: 180,
    rating: 4.7,
    sales: 112,
    specs: {
      'Capacidad Volumétrica': '120 Litros',
      'Carga Máxima': '60 kg',
      'Material': 'Polietileno de Alta Densidad (HDPE)',
      'Diámetro Llantas': '20 cm macizas',
      'Colores Homologados': 'Verde (Orgánico), Gris (Inorgánico), Azul (Papel)'
    }
  },
  {
    id: 'p10',
    sku: 'GC-AO-005',
    name: 'Dispensador de Jabón en Espuma para Pared',
    category: 'Accesorios y Otros',
    description: 'Dispensador manual de alta durabilidad con depósito rellenable. Válvula dosificadora de precisión que evita derrames o goteos indeseados. Incluye kit completo de empotramiento.',
    purchaseCost: 18.46,
    finalSalePrice: 24.00,
    imageUrl: 'https://picsum.photos/seed/dispensador/600/600',
    stock: 150,
    rating: 4.3,
    sales: 85,
    specs: {
      'Funcionamiento': 'Pulsador ergonómico manual',
      'Capacidad Recarga': '1000 mL',
      'Material Carcasa': 'Plástico ABS anti-vandalismo',
      'Instalación': 'Atornillado a pared o cinta doble cara industrial'
    }
  }
];

const categories = [
  { id: 'all', name: 'Todos los productos', icon: <ChevronRight size={20} /> },
  { id: '1', name: 'Químicos Industriales', icon: <Droplet size={20} /> },
  { id: '2', name: 'Equipos de Protección (EPP)', icon: <Shield size={20} /> },
  { id: '3', name: 'Papel & Celulosa', icon: <Wind size={20} /> },
  { id: '4', name: 'Maquinaria de Limpieza', icon: <Wrench size={20} /> },
  { id: '5', name: 'Gestión de Residuos', icon: <Trash2 size={20} /> },
  { id: '6', name: 'Implementos Manuales', icon: <Brush size={20} /> },
  { id: '7', name: 'Accesorios y Otros', icon: <Zap size={20} /> },
];

export default function InicioClient() {
  // === ESTADOS GENERALES ===
  const [products, setProducts] = useState<Product[]>(initialProductsList);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [orderNotes, setOrderNotes] = useState<string>('');
  const [successOrderNumber, setSuccessOrderNumber] = useState<string | null>(null);

  // === ESTADOS DE AUTENTICACIÓN ===
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [currentUser, setCurrentUser] = useState<UserSession | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [authStep, setAuthStep] = useState<'email' | 'password' | 'register' | 'google_picker' | 'phone_number' | 'phone_verify' | 'success'>('email');
  const [authEmail, setAuthEmail] = useState<string>('');
  const [authPassword, setAuthPassword] = useState<string>('');
  const [authName, setAuthName] = useState<string>('');
  const [authCompanyName, setAuthCompanyName] = useState<string>('');
  const [authPhone, setAuthPhone] = useState<string>('');
  const [smsCode, setSmsCode] = useState<string>('');
  const [smsCountdown, setSmsCountdown] = useState<number>(60);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(false);
  const [isStripeLoading, setIsStripeLoading] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState<boolean>(false);

  // === ESTADOS DE IA ORIENTADORA ===
  const [isAssistantOpen, setIsAssistantOpen] = useState<boolean>(false);
  const [assistantMessages, setAssistantMessages] = useState<Array<{ sender: 'user' | 'bot'; text: string }>>([
    {
      sender: 'bot',
      text: '¡Hola! Soy tu **Asistente de Orientación de Grado Cero B2B** 🧪.\n\nEstoy aquí para guiarte en nuestro catálogo y uso seguro del sitio. ¿En qué te puedo ayudar hoy? Puedes preguntarme:\n\n- **¿Cómo iniciar sesión?**\n- **¿Dónde buscar un producto?**\n- **¿Qué información hay de los productos de limpieza?**\n- **¿Cómo solicitar una cotización B2B?**'
    }
  ]);
  const [assistantInput, setAssistantInput] = useState<string>('');
  const [isAssistantLoading, setIsAssistantLoading] = useState<boolean>(false);

  const handleSendAssistantMessage = async (textToSend?: string) => {
    const rawText = textToSend || assistantInput;
    if (!rawText.trim() || isAssistantLoading) return;

    if (!textToSend) {
      setAssistantInput('');
    }

    const newMessages = [...assistantMessages, { sender: 'user' as const, text: rawText }];
    setAssistantMessages(newMessages);
    setIsAssistantLoading(true);

    try {
      const res = await fetch('/api/assistant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: rawText, feature: 'guide' }),
      });
      const data = await res.json();
      if (data.error) {
        setAssistantMessages(prev => [...prev, { sender: 'bot' as const, text: 'Disculpa, el orientador virtual no está disponible en este momento. Por favor, intenta de nuevo.' }]);
      } else {
        setAssistantMessages(prev => [...prev, { sender: 'bot' as const, text: data.text }]);
      }
    } catch (err) {
      console.error(err);
      setAssistantMessages(prev => [...prev, { sender: 'bot' as const, text: 'Hubo un error de conectividad al comunicarme con el sistema de asistencia. Por favor, revisa tu red.' }]);
    } finally {
      setIsAssistantLoading(false);
    }
  };

  const formatMessageText = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, idx) => {
      const isBullet = line.trim().startsWith('- ') || line.trim().startsWith('* ');
      const content = isBullet ? line.trim().substring(2) : line;

      const parts = content.split(/\*\*(.*?)\*\*/g);
      const parsedLine = parts.map((part, pIdx) => {
        if (pIdx % 2 === 1) {
          return <strong key={pIdx} className="font-extrabold text-orange-400">{part}</strong>;
        }
        return part;
      });

      if (isBullet) {
        return (
          <li key={idx} className="ml-4 list-disc text-xs text-neutral-300 mb-1 leading-relaxed">
            {parsedLine}
          </li>
        );
      }

      return (
        <p key={idx} className="text-xs text-neutral-200 mb-2 leading-relaxed whitespace-pre-line">
          {parsedLine}
        </p>
      );
    });
  };

  // === AUXILIAR DE ACCIÓN DESPUÉS DEL LOGIN ===
  const [pendingCartAction, setPendingCartAction] = useState<{ product: Product; quantity: number } | null>(null);

  // === DETECCIÓN Y SINCRONIZACIÓN CON LOCAL STORAGE ===
  useEffect(() => {
    // Sincronizar sesión de usuario
    const savedUser = localStorage.getItem('grado_cero_user');
    if (savedUser) {
      try {
        const parsed = JSON.parse(savedUser);
        setTimeout(() => {
          setCurrentUser(parsed);
          setIsAuthenticated(true);
        }, 0);
      } catch (err) {
        console.error("Error al leer sesión remota:", err);
      }
    }

    // Sincronizar carrito local
    const savedCart = localStorage.getItem('grado_cero_cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setTimeout(() => {
          setCart(parsedCart);
        }, 0);
      } catch (e) {
        console.error("Error al leer carrito local:", e);
      }
    }

    // Sincronizar inventario modificado localmente si existe
    const savedProducts = localStorage.getItem('grado_cero_products');
    if (savedProducts) {
      try {
        const parsedProducts = JSON.parse(savedProducts);
        setTimeout(() => {
          setProducts(parsedProducts);
        }, 0);
      } catch (e) {
        console.error("Error al leer productos locales:", e);
      }
    }
  }, []);

  // Timer para Cuenta Regresiva de SMS
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (authStep === 'phone_verify' && smsCountdown > 0) {
      timer = setTimeout(() => setSmsCountdown(prev => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [authStep, smsCountdown]);

  // Almacenar datos en LocalStorage ante cambios
  const updateCartState = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('grado_cero_cart', JSON.stringify(newCart));
  };

  const handleUpdateUserSession = (user: UserSession | null) => {
    if (user) {
      setCurrentUser(user);
      setIsAuthenticated(true);
      localStorage.setItem('grado_cero_user', JSON.stringify(user));
    } else {
      setCurrentUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('grado_cero_user');
    }
  };

  const handleLogOut = () => {
    handleUpdateUserSession(null);
    setIsAccountMenuOpen(false);
  };

  // === FILTRADO DE PRODUCTOS ===
  // Función auxiliar para normalizar texto eliminando acentos/diacríticos para una búsqueda robusta en español
  const removeAccentsAndLowercase = (str: string): string => {
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();
  };

  const filteredProducts = products.filter(p => {
    const matchesCategory = selectedCategory === 'all' || p.category === categories.find(c => c.id === selectedCategory)?.name;
    
    const normalizedSearch = removeAccentsAndLowercase(searchTerm);
    const matchesSearch = 
      removeAccentsAndLowercase(p.name).includes(normalizedSearch) || 
      removeAccentsAndLowercase(p.sku).includes(normalizedSearch) ||
      removeAccentsAndLowercase(p.category).includes(normalizedSearch);
      
    return matchesCategory && matchesSearch;
  });

  // === TRATAMIENTO DE PRODUCTO DETALLE SELECCIONADO (MERCADO LIBRE STYLE) ===
  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Obtener productos similares para pantalla de detalle (Misma Categoría, excepto el seleccionado)
  const similarProducts = selectedProduct 
    ? products.filter(p => p.category === selectedProduct.category && p.id !== selectedProduct.id).slice(0, 4)
    : [];

  // === EVENTOS DEL CARRITO / COTIZACIONES ===
  const addToCart = (product: Product, quantity: number) => {
    const existingIndex = cart.findIndex(item => item.product.id === product.id);
    let newCart = [...cart];
    
    if (existingIndex > -1) {
      newCart[existingIndex].quantity += quantity;
    } else {
      newCart.push({ product, quantity });
    }

    // Limitar segun stock disponible
    if (newCart[existingIndex > -1 ? existingIndex : newCart.length - 1].quantity > product.stock) {
      newCart[existingIndex > -1 ? existingIndex : newCart.length - 1].quantity = product.stock;
    }

    updateCartState(newCart);
    setIsCartOpen(true);
  };

  // Acción principal de checkout / iniciar cotización
  const handleStartQuoteProcess = (product: Product, quantity: number) => {
    if (!isAuthenticated) {
      setPendingCartAction({ product, quantity });
      setAuthStep('email');
      setAuthError(null);
      setIsAuthModalOpen(true);
    } else {
      addToCart(product, quantity);
    }
  };

  // Enviar formulario de Cotización final al administrador (prisma & localStorage)
  const handleFinalizeQuoteSubmission = () => {
    if (cart.length === 0) return;
    if (!currentUser) {
      setAuthStep('email');
      setIsAuthModalOpen(true);
      return;
    }

    setIsAuthLoading(true);

    setTimeout(() => {
      // Generar ID único y número de cotizacion
      const quoteId = 'qt_' + Math.random().toString(36).substring(2, 9);
      const randHex = Math.random().toString(16).substring(2, 8).toUpperCase();
      const quoteNumber = `COT-${randHex}`;

      const totalAmount = cart.reduce((sum, item) => sum + (item.quantity * item.product.finalSalePrice), 0);

      const newQuote: QuoteItem = {
        id: quoteId,
        quoteNumber,
        clientName: currentUser.companyName,
        companyName: currentUser.companyName,
        agentName: currentUser.name || currentUser.email,
        itemCount: cart.length,
        totalAmount,
        status: 'PENDING',
        date: new Date().toISOString(),
        notes: orderNotes,
        items: cart.map(c => ({
          productName: c.product.name,
          quantity: c.quantity,
          unitPrice: c.product.finalSalePrice
        }))
      };

      // 1. Guardar cotización en localStorage de manera que el panel /admin pueda leerla
      const existingQuotesRaw = localStorage.getItem('grado_cero_quotes');
      let existingQuotes: any[] = [];
      if (existingQuotesRaw) {
        try {
          existingQuotes = JSON.parse(existingQuotesRaw);
        } catch (e) {}
      }
      existingQuotes.unshift(newQuote);
      localStorage.setItem('grado_cero_quotes', JSON.stringify(existingQuotes));

      // 2. Disminuir stock en LocalStorage para simular almacén vivo
      const updatedProducts = products.map(productItem => {
        const itemInCart = cart.find(c => c.product.id === productItem.id);
        if (itemInCart) {
          return {
            ...productItem,
            stock: Math.max(0, productItem.stock - itemInCart.quantity)
          };
        }
        return productItem;
      });

      setProducts(updatedProducts);
      localStorage.setItem('grado_cero_products', JSON.stringify(updatedProducts));

      // Vaciar carrito
      updateCartState([]);
      setOrderNotes('');
      setSuccessOrderNumber(quoteNumber);
      setIsCartOpen(false);
      setIsAuthLoading(false);
      
      // Si el detalle estaba abierto, actualizar stock del actual seleccionado
      if (selectedProduct) {
        const currentUpdated = updatedProducts.find(p => p.id === selectedProduct.id);
        if (currentUpdated) {
          setSelectedProduct(currentUpdated);
        }
      }
    }, 1500);
  };

  // Enviar el carrito al controlador de pasarela de Stripe B2B o simulación
  const handleStripeCheckout = async () => {
    if (cart.length === 0) return;
    if (!currentUser) {
      setAuthStep('email');
      setIsAuthModalOpen(true);
      return;
    }

    setIsStripeLoading(true);
    setCheckoutError(null);

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map(item => ({
            productId: item.product.id,
            quantity: item.quantity
          })),
          user: {
            email: currentUser.email,
            name: currentUser.name,
            companyName: currentUser.companyName
          }
        })
      });

      const data = await response.json();

      if (data.error) {
        setCheckoutError(data.error);
        return;
      }

      if (data.url) {
        // Limpiamos los estados locales
        updateCartState([]);
        setOrderNotes('');
        setIsCartOpen(false);
        // Redirección directa hacia la pasarela de Stripe (o simulación exitosa)
        window.location.href = data.url;
      }
    } catch (error: any) {
      console.error("Fallo durante el checkout con Stripe:", error);
      setCheckoutError("Ocurrió un inconveniente al conectar con el servidor de pagos.");
    } finally {
      setIsStripeLoading(false);
    }
  };

  // === LOGICA DE AUTENTICACION SIMULADA MERCADO LIBRE ===
  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authEmail || !authEmail.includes('@')) {
      setAuthError('Ingresa un correo electrónico corporativo válido.');
      return;
    }
    setAuthError(null);
    setIsAuthLoading(true);

    // Simular retraso de búsqueda en la DB
    setTimeout(() => {
      setIsAuthLoading(false);
      // Simular que ciertas direcciones ya existen y otras son de registro nuevo
      // Si es un email conocido como un email común o de prueba, va a password, sino va a registro.
      if (authEmail.includes('alexis') || authEmail.includes('admin') || authEmail.includes('test')) {
        setAuthStep('password');
      } else {
        setAuthStep('register');
        setAuthName('');
        setAuthCompanyName('');
        setAuthPhone('');
      }
    }, 800);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (authPassword.length < 4) {
      setAuthError('La contraseña debe tener al menos 4 caracteres.');
      return;
    }
    setAuthError(null);
    setIsAuthLoading(true);

    setTimeout(() => {
      setIsAuthLoading(false);
      const name = authEmail.split('@')[0];
      const simulatedUser: UserSession = {
        email: authEmail,
        name: name.charAt(0).toUpperCase() + name.slice(1),
        companyName: 'Industrias ' + (name.charAt(0).toUpperCase() + name.slice(1)) + ' S.A.',
        phone: '+52 55 ' + Math.floor(10000000 + Math.random() * 90000000),
        loginMethod: 'email'
      };
      
      handleLoginSuccess(simulatedUser);
    }, 1000);
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authName || !authCompanyName || !authPassword) {
      setAuthError('Por favor complete todos los datos requeridos.');
      return;
    }
    setAuthError(null);
    setIsAuthLoading(true);

    setTimeout(() => {
      setIsAuthLoading(false);
      const simulatedUser: UserSession = {
        email: authEmail,
        name: authName,
        companyName: authCompanyName,
        phone: authPhone || '+52 55 1234 5678',
        loginMethod: 'email'
      };
      
      handleLoginSuccess(simulatedUser);
    }, 1000);
  };

  const handleGoogleAuthInit = () => {
    setAuthStep('google_picker');
    setAuthError(null);
  };

  const handlePhoneAuthInit = () => {
    setAuthStep('phone_number');
    setAuthError(null);
    setAuthPhone('');
  };

  const selectGoogleAccount = (email: string, name: string) => {
    setIsAuthLoading(true);
    setTimeout(() => {
      setIsAuthLoading(false);
      const simulatedUser: UserSession = {
        email: email,
        name: name,
        companyName: 'Corporativo ' + name.split(' ')[0] + ' S.A.B.',
        phone: '+52 55 9876 5432',
        loginMethod: 'google'
      };
      handleLoginSuccess(simulatedUser);
    }, 1500);
  };

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authPhone || authPhone.length < 8) {
      setAuthError('Ingresa un número de teléfono celular válido.');
      return;
    }
    setAuthError(null);
    setIsAuthLoading(true);

    setTimeout(() => {
      setIsAuthLoading(false);
      setAuthStep('phone_verify');
      setSmsCountdown(60);
      setSmsCode('');
    }, 1000);
  };

  const handlePhoneVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (smsCode.length < 6) {
      setAuthError('El código verificador SMS debe tener 6 dígitos.');
      return;
    }
    setAuthError(null);
    setIsAuthLoading(true);

    setTimeout(() => {
      setIsAuthLoading(false);
      const simulatedUser: UserSession = {
        email: 'movil_' + authPhone.replace(/\D/g, '') + '@gradocero.com',
        name: 'Usuario Celular',
        companyName: 'Consumidor Telefónico B2B',
        phone: authPhone,
        loginMethod: 'phone'
      };
      handleLoginSuccess(simulatedUser);
    }, 1200);
  };

  const handleLoginSuccess = (user: UserSession) => {
    handleUpdateUserSession(user);
    setAuthStep('success');

    // Si había una acción de cotización pendiente, ejecutarla automáticamente
    if (pendingCartAction) {
      addToCart(pendingCartAction.product, pendingCartAction.quantity);
      setPendingCartAction(null);
    }

    setTimeout(() => {
      setIsAuthModalOpen(false);
      setAuthEmail('');
      setAuthPassword('');
      setAuthName('');
      setAuthCompanyName('');
      setAuthPhone('');
      setSmsCode('');
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-200 font-sans selection:bg-orange-500/30 selection:text-white">
      
      {/* HEADER PRINCIPAL CORPORATIVO */}
      <header className="sticky top-0 z-40 bg-neutral-900 border-b border-neutral-800 shadow-xl py-4 backdrop-blur-md bg-opacity-90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => setSelectedProduct(null)}>
            <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-1.5 transition hover:scale-[1.02]">
              <span className="text-orange-500 font-extrabold">GRADO</span> CERO
            </h1>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded text-[10px] bg-neutral-800 border border-neutral-700 text-neutral-400 font-mono font-medium uppercase tracking-widest">
              B2B PORTAL
            </span>
          </div>
          
          {/* BARRA DE BÚSQUEDA INTEGRADA EN TIEMPO REAL */}
          <div className="flex-1 max-w-2xl px-2 relative">
            <div className="relative group">
              <input 
                type="text" 
                placeholder="Buscar desengrasantes, mascarillas, SKU, categorías..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  // Si estamos en detalle y busca, salir del detalle para mostrar resultados de catálogo
                  if (selectedProduct) setSelectedProduct(null);
                }}
                className="w-full bg-neutral-800/80 text-neutral-100 border border-neutral-700 rounded-full py-2.5 px-5 pl-11 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all placeholder-neutral-500 text-sm focus:bg-neutral-800"
              />
              <Search className="absolute left-4 top-3 text-neutral-500 group-focus-within:text-orange-500 transition-colors w-4 h-4" />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-4 top-3 text-neutral-400 hover:text-white"
                >
                  <X size={16} />
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center gap-5">
            {/* INICIAR SESIÓN O PANEL DE MI CUENTA */}
            <div className="relative">
              {isAuthenticated && currentUser ? (
                <div>
                  <button 
                    onClick={() => setIsAccountMenuOpen(!isAccountMenuOpen)}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-neutral-800 hover:bg-neutral-800/60 transition group text-sm font-semibold tracking-wide text-neutral-300 hover:text-white"
                  >
                    <div className="w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-xs">
                      {currentUser.name ? currentUser.name.slice(0,2).toUpperCase() : 'US'}
                    </div>
                    <span className="hidden md:inline truncate max-w-[124px]">
                      {currentUser.name}
                    </span>
                    <ChevronDown size={14} className={`text-neutral-500 transition-transform ${isAccountMenuOpen ? 'rotate-180':''}`} />
                  </button>

                  <AnimatePresence>
                    {isAccountMenuOpen && (
                      <>
                        <div className="fixed inset-0 z-40" onClick={() => setIsAccountMenuOpen(false)} />
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          className="absolute right-0 mt-2 w-64 bg-neutral-900 border border-neutral-800 rounded-xl shadow-2xl p-4 z-50 text-left"
                        >
                          <div className="border-b border-neutral-800 pb-3 mb-3">
                            <p className="text-xs text-neutral-500 font-mono uppercase tracking-widest">CLIENTE B2B ACTIVADO</p>
                            <h4 className="font-bold text-white text-sm truncate">{currentUser.name}</h4>
                            <p className="text-xs text-neutral-400 truncate flex items-center gap-1.5 mt-1">
                              <Building2 size={12} className="text-orange-500 shrink-0" />
                              {currentUser.companyName}
                            </p>
                            <p className="text-xs text-neutral-500 truncate mt-1 overflow-hidden">{currentUser.email}</p>
                          </div>
                          
                          <Link 
                            href="/admin/cotizaciones" 
                            className="flex items-center gap-2.5 px-3 py-2 text-sm text-neutral-300 hover:text-white hover:bg-neutral-800/70 rounded-lg transition"
                          >
                            <FileText size={16} className="text-neutral-400" />
                            Portal de Administración
                          </Link>

                          <button 
                            onClick={handleLogOut}
                            className="w-full flex items-center gap-2.5 px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition mt-2 text-left"
                          >
                            <LogOut size={16} />
                            Cerrar Sesión B2B
                          </button>
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button 
                  onClick={() => {
                    setAuthStep('email');
                    setAuthError(null);
                    setIsAuthModalOpen(true);
                  }}
                  className="text-xs md:text-sm font-semibold tracking-wider text-orange-400 hover:text-orange-300 transition-colors border border-orange-500/20 px-4 py-2 rounded-full hover:bg-orange-500/5 cursor-pointer"
                  id="header-login-btn"
                >
                  INGRESAR / REGISTRARSE
                </button>
              )}
            </div>

            {/* BOTÓN CARRITO / SOLICITUD DE COTIZACIÓN */}
            <button 
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-2 bg-neutral-800 border border-neutral-700/60 px-4 py-2 rounded-full hover:bg-neutral-700 hover:border-neutral-600 transition cursor-pointer relative group"
            >
              <ShoppingCart className="w-4 h-4 text-orange-500 group-hover:scale-110 transition-transform" />
              <span className="font-bold text-white text-xs md:text-sm">
                {cart.reduce((sum, item) => sum + item.quantity, 0)}
              </span>
              <span className="hidden sm:inline text-xs font-medium text-neutral-300">Cotizar</span>
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-orange-500 rounded-full animate-ping" />
              )}
            </button>

          </div>
        </div>
      </header>

      {/* NOTIFICACIÓN DE SOLICITUD GENERADA CON ÉXITO */}
      {successOrderNumber && (
        <div className="bg-gradient-to-r from-orange-600 to-amber-700 text-white py-4 px-6 relative flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-full">
              <Check size={20} className="text-white" />
            </div>
            <div>
              <p className="font-bold text-sm md:text-base">¡Tu Cotización Corporativa {successOrderNumber} ha sido enviada con éxito!</p>
              <p className="text-xs opacity-90">Un asesor técnico de Grado Cero evaluará tus volúmenes comerciales para aplicar descuentos de hasta el 35%.</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Link 
              href="/admin/cotizaciones" 
              className="bg-white text-orange-950 font-bold px-4 py-1.5 rounded-lg text-xs hover:bg-neutral-100 transition whitespace-nowrap"
            >
              Ver en Panel Admin
            </Link>
            <button 
              onClick={() => setSuccessOrderNumber(null)}
              className="text-white hover:opacity-80 p-1"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <AnimatePresence mode="wait">
          {!selectedProduct ? (
            
            // ==================== LISTA DE PRODUCTOS / PORTADA ====================
            <motion.div 
              key="catalog"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12"
            >
              
              {/* BANNER PRINCIPAL (HERO) */}
              <section className="relative rounded-2xl overflow-hidden bg-neutral-900 aspect-[21/9] md:aspect-[32/8] border border-neutral-800 shadow-2xl flex items-center group">
                <div className="absolute inset-0 z-0">
                  <Image 
                    src="https://picsum.photos/seed/industrialcleaning/1800/600"
                    alt="Industrial Cleaning Supplies"
                    fill
                    priority
                    className="object-cover opacity-25 transition-transform duration-1000 group-hover:scale-102"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/85 to-transparent" />
                </div>
                
                <div className="relative z-10 p-6 md:p-14 max-w-2xl space-y-4">
                  <span className="inline-block px-3 py-1 bg-orange-500/10 text-orange-400 text-[11px] font-bold tracking-widest uppercase rounded-full border border-orange-500/30">
                    SÍNDROME DE LIMPIEZA INDUSTRIAL PRO
                  </span>
                  <h2 className="text-3xl md:text-5xl font-black text-white leading-tight">
                    Precios Corporativos del Almacén B2B.
                  </h2>
                  <p className="text-sm md:text-base text-neutral-400 max-w-lg">
                    Agrega químicos alcalinos, absorbentes ecológicos, consumibles de celulosa y EPIs de alta densidad para estimación de cotización automática.
                  </p>
                  <div className="pt-2 flex flex-wrap gap-4">
                    <button 
                      onClick={() => {
                        setSelectedCategory('1');
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                      }}
                      className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 px-6 rounded-full transition shadow-lg text-xs md:text-sm tracking-wide cursor-pointer"
                    >
                      Explorar Químicos
                    </button>
                    <button 
                      onClick={() => {
                        setSelectedCategory('2');
                        window.scrollTo({ top: 400, behavior: 'smooth' });
                      }}
                      className="bg-neutral-800 hover:bg-neutral-700 text-neutral-100 font-bold py-2.5 px-6 rounded-full transition border border-neutral-700 text-xs md:text-sm tracking-wide cursor-pointer"
                    >
                      Línea de EPP
                    </button>
                  </div>
                </div>
              </section>

              {/* LISTADO DE CATEGORÍAS EN FORMA DE COMPONENTES DE SELECCIÓN */}
              <section className="space-y-4">
                <h3 className="text-base font-extrabold text-neutral-300 uppercase tracking-widest font-mono">Filtrar por Categoría B2B</h3>
                <div className="flex flex-wrap gap-3">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl border transition-all text-xs font-bold cursor-pointer ${
                        (selectedCategory === cat.id)
                          ? 'bg-orange-500 border-orange-400 text-white shadow-md'
                          : 'bg-neutral-900 border-neutral-850 text-neutral-400 hover:border-neutral-700 hover:text-white hover:bg-neutral-850'
                      }`}
                    >
                      {cat.icon}
                      <span>{cat.name}</span>
                    </button>
                  ))}
                </div>
              </section>

              {/* CUADRÍCULA DE EXPOSICIÓN DE PRODUCTOS (GRILLA) */}
              <section className="space-y-6">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    {selectedCategory === 'all' ? 'Catálogo Completo' : categories.find(c => c.id === selectedCategory)?.name}
                    <span className="text-xs font-mono font-normal bg-neutral-900 text-neutral-500 px-2 py-0.5 rounded border border-neutral-800">
                      {filteredProducts.length} productos
                    </span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((p) => (
                    <div 
                      key={p.id} 
                      className="bg-neutral-900 border border-neutral-850 rounded-2xl overflow-hidden hover:border-neutral-750 hover:shadow-2xl transition-all duration-300 group flex flex-col h-full relative"
                      id={`product-card-${p.id}`}
                    >
                      
                      {/* Badge de stock crítico */}
                      {p.stock < 100 && (
                        <span className="absolute top-3 left-3 z-10 bg-red-600/90 text-white font-mono text-[9px] font-bold tracking-widest px-2 py-0.5 rounded shadow">
                          RESTRICCIÓN DE STOCK
                        </span>
                      )}

                      {/* Imagen con hover de opacidad */}
                      <div 
                        onClick={() => handleSelectProduct(p)}
                        className="relative aspect-square bg-neutral-950 border-b border-neutral-850 p-6 flex items-center justify-center cursor-pointer overflow-hidden"
                      >
                        <Image 
                          src={p.imageUrl}
                          alt={p.name}
                          fill
                          className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>

                      {/* Cuerpo de información */}
                      <div className="p-5 flex flex-col flex-1 space-y-3">
                        <span className="text-[10px] font-mono font-bold text-orange-500 uppercase tracking-widest">
                          {p.category}
                        </span>

                        <h4 
                          onClick={() => handleSelectProduct(p)}
                          className="text-base font-bold text-neutral-100 hover:text-orange-400 cursor-pointer line-clamp-2 leading-tight transition-colors min-h-[40px]"
                        >
                          {p.name}
                        </h4>

                        <div className="flex items-center gap-1.5">
                          <div className="flex text-amber-500 items-center">
                            <Star size={13} fill="currentColor" />
                          </div>
                          <span className="text-xs text-neutral-300 font-bold">{p.rating}</span>
                          <span className="text-neutral-500 text-xs">| {p.sales} compras</span>
                        </div>

                        {/* Métrica de Precios (B2B sin detallar porcentajes mas que estéticamente) */}
                        <div className="pt-2 border-t border-neutral-850/60 mt-auto">
                          <p className="text-[11px] text-neutral-500 font-mono">PRECIO UNITARIO B2B</p>
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-mono text-white font-extrabold tracking-tight">
                              ${p.finalSalePrice.toFixed(2)}
                            </span>
                            <span className="text-[10px] text-neutral-500 uppercase font-bold">MXN</span>
                          </div>
                          <p className="text-[10px] text-green-500 font-bold">Llega gratis mañana</p>
                        </div>

                        {/* Botones de acción rápida */}
                        <div className="flex flex-col gap-2 pt-2">
                          <button 
                            onClick={() => handleSelectProduct(p)}
                            className="w-full bg-neutral-800 hover:bg-neutral-750 text-neutral-200 font-semibold py-2 rounded-lg text-xs transition border border-neutral-700/60 flex items-center justify-center gap-1.5 cursor-pointer"
                          >
                            Ver Detalles (Mercado Libre)
                          </button>
                          
                          <button 
                            onClick={() => handleStartQuoteProcess(p, 1)}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg text-xs transition flex items-center justify-center gap-1.5 shadow hover:shadow-orange-500/20 cursor-pointer"
                          >
                            <ShoppingCart size={13} />
                            Cotizar Ahora
                          </button>
                        </div>

                      </div>
                    </div>
                  ))}

                  {filteredProducts.length === 0 && (
                    <div className="col-span-full py-16 text-center text-neutral-500">
                      <Search className="mx-auto w-10 h-10 text-neutral-600 mb-3" />
                      <p className="text-sm">No pudimos encontrar productos que coincidan con &quot;{searchTerm}&quot;</p>
                      <button 
                        onClick={() => { setSearchTerm(''); setSelectedCategory('all'); }} 
                        className="text-orange-500 hover:underline text-xs mt-2 font-bold cursor-pointer"
                      >
                        Limpiar todos los filtros
                      </button>
                    </div>
                  )}
                </div>
              </section>

            </motion.div>
          ) : (
            
            // ==================== DETALLE DE PRODUCTO (ESTILO MERCADO LIBRE) ====================
            <motion.div 
              key="detail"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-8"
            >
              
              {/* Botón Volver y Categorías Migas de Pan */}
              <div className="flex items-center gap-2 text-sm text-neutral-400">
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="flex items-center gap-1.5 text-neutral-300 hover:text-white transition font-semibold cursor-pointer"
                >
                  <ArrowLeft size={16} /> Volver al catálogo
                </button>
                <span>/</span>
                <span className="text-neutral-500">{selectedProduct.category}</span>
                <span>/</span>
                <span className="text-neutral-300 font-mono truncate">{selectedProduct.sku}</span>
              </div>

              {/* Ficha Principal Mercado Libre Style */}
              <div className="bg-neutral-900 border border-neutral-850 rounded-3xl p-6 md:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 shadow-2xl">
                
                {/* Lado Izquierdo: Galería de Fotos (8 de 12 para computadoras) */}
                <div className="col-span-1 lg:col-span-7 flex flex-col md:flex-row gap-5">
                  {/* Miniaturas a la izquierda */}
                  <div className="hidden md:flex flex-col gap-3">
                    {[1, 2, 3].map((num) => (
                      <div 
                        key={num} 
                        className={`w-14 h-14 rounded-xl border p-1 bg-neutral-950 relative cursor-pointer overflow-hidden transition-all duration-200 ${
                          num === 1 ? 'border-orange-500 ring-1 ring-orange-500' : 'border-neutral-800 hover:border-neutral-700'
                        }`}
                      >
                        <Image 
                          src={selectedProduct.imageUrl} 
                          alt="preview" 
                          fill 
                          className="object-cover opacity-80"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>

                  {/* Imagen Principal de Exposición */}
                  <div className="flex-1 min-h-[350px] md:min-h-[450px] max-h-[500px] border border-neutral-800 bg-neutral-950 rounded-2xl relative flex items-center justify-center p-8 overflow-hidden group">
                    <Image 
                      src={selectedProduct.imageUrl}
                      alt={selectedProduct.name}
                      fill
                      priority
                      className="object-cover opacity-90 group-hover:scale-105 transition-transform duration-700 pointer-events-none"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-neutral-950/5 pointer-events-none" />
                    
                    {/* Tag de Zoom Estético */}
                    <span className="absolute bottom-4 right-4 bg-black/60 backdrop-blur text-[10px] text-neutral-400 border border-neutral-800 px-3 py-1.5 rounded-full font-mono">
                      IMAGEN ZOOM-IN AUTOMÁTICO
                    </span>
                  </div>
                </div>

                {/* Lado Derecho: Contenedor Compra Mercado Libre Style (5 de 12) */}
                <div className="col-span-1 lg:col-span-5 flex flex-col justify-between space-y-6">
                  
                  <div className="space-y-4">
                    {/* Condicionales Industriales */}
                    <div className="flex items-center gap-1.5 text-xs text-neutral-400 font-mono font-medium">
                      <span>Nuevo B2B</span>
                      <span>|</span>
                      <span className="text-orange-400 font-bold">{selectedProduct.sales}+ vendidos corporativos</span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-black text-white leading-tight">
                      {selectedProduct.name}
                    </h2>

                    {/* Reseñas y Estrellas */}
                    <div className="flex items-center gap-1.5">
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={15} fill={i < Math.floor(selectedProduct.rating) ? "currentColor" : "none"} />
                        ))}
                      </div>
                      <span className="text-xs text-neutral-200 font-bold">{selectedProduct.rating}</span>
                      <span className="text-neutral-500 text-xs">({Math.floor(selectedProduct.sales / 3)} calificaciones B2B)</span>
                    </div>

                    {/* Precios y Bonficaciones */}
                    <div className="bg-neutral-950 p-4 rounded-2xl border border-neutral-850 space-y-1">
                      <span className="text-neutral-400 text-xs font-mono">PRECIO UNITARIO SIN IVA</span>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-3xl font-mono text-white font-extrabold tracking-tight">
                          ${selectedProduct.finalSalePrice.toFixed(2)}
                        </span>
                        <span className="text-sm text-neutral-400 font-bold uppercase font-mono">MXN</span>
                      </div>
                      <div className="flex items-center gap-1.5 pt-1.5 text-xs text-green-400 font-bold">
                        <Check size={14} /> Envío Gratis en todo México
                      </div>
                      <p className="text-[11px] text-neutral-500 pt-1 leading-normal">
                        * Factura deducible autorizada por el SAT. Descuento Adicional del 10% a partir de 20 unidades.
                      </p>
                    </div>

                    {/* Atributos Clave */}
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between border-b border-neutral-850 pb-2">
                        <span className="text-neutral-500">SKU de Almacén</span>
                        <span className="font-mono text-xs text-neutral-300 font-bold">{selectedProduct.sku}</span>
                      </div>
                      <div className="flex justify-between border-b border-neutral-850 pb-2">
                        <span className="text-neutral-500">Stock Operativo</span>
                        <span className={`font-semibold ${selectedProduct.stock > 100 ? 'text-green-400' : 'text-amber-500'}`}>
                          {selectedProduct.stock > 0 ? `${selectedProduct.stock} unidades listas` : 'Sin stock momentáneo'}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-neutral-850 pb-2">
                        <span className="text-neutral-500">Despacho</span>
                        <span className="text-neutral-300">Inmediato (Mismo día)</span>
                      </div>
                    </div>
                  </div>

                  {/* Selector de cantidad y botones de compra con flujo login */}
                  <div className="space-y-4">
                    
                    {/* Panel de cantidad */}
                    <div className="flex items-center justify-between bg-neutral-950/60 border border-neutral-850 p-3 rounded-2xl">
                      <span className="text-sm font-semibold text-neutral-400">Cantidad para cotizar:</span>
                      <select 
                        defaultValue="10"
                        id="quote-quantity-select"
                        className="bg-neutral-900 border border-neutral-700 text-white rounded-lg px-2.5 py-1.5 text-xs font-bold focus:ring-1 focus:ring-orange-500 focus:outline-none"
                      >
                        <option value="1">1 Unidad</option>
                        <option value="5">5 Unidades</option>
                        <option value="10">10 Unidades (Recomendado)</option>
                        <option value="20">20 Unidades (-10% Descuento)</option>
                        <option value="50">50 Unidades (-15% Descuento)</option>
                        <option value="100">100 Unidades (Fracción de Contenedor)</option>
                      </select>
                    </div>

                    {/* Botón de compra / cotización con gatillo de login */}
                    <div className="space-y-2.5">
                      <button 
                        onClick={() => {
                          const selectEl = document.getElementById('quote-quantity-select') as HTMLSelectElement;
                          const qty = selectEl ? parseInt(selectEl.value) : 10;
                          handleStartQuoteProcess(selectedProduct, qty);
                        }}
                        className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 text-white font-extrabold py-3.5 rounded-2xl transition shadow-lg text-sm tracking-wide flex items-center justify-center gap-2 cursor-pointer"
                        id="btn-cotizar-ahora"
                      >
                        Adquirir / Cotizar Volumen Mayorista
                      </button>

                      <button 
                        onClick={() => {
                          const selectEl = document.getElementById('quote-quantity-select') as HTMLSelectElement;
                          const qty = selectEl ? parseInt(selectEl.value) : 10;
                          addToCart(selectedProduct, qty);
                        }}
                        className="w-full bg-neutral-850 hover:bg-neutral-800 text-neutral-200 font-bold py-3.5 rounded-2xl transition border border-neutral-750 text-sm tracking-wide flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <ShoppingCart size={16} />
                        Agregar a la cotización activa
                      </button>
                    </div>

                  </div>

                </div>
              </div>

              {/* Ficha Técnica Detallada (Descripciones e ISOs) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                
                {/* Características técnicas a la izquierda */}
                <div className="col-span-1 lg:col-span-8 bg-neutral-900 border border-neutral-850 rounded-3xl p-6 md:p-8 space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-4">Descripción General</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed whitespaces-pre-line">
                      {selectedProduct.description}
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-white mb-4">Ficha Técnica Operativa (B2B)</h3>
                    <div className="border border-neutral-800 rounded-xl overflow-hidden divide-y divide-neutral-850">
                      {Object.entries(selectedProduct.specs).map(([key, val]) => (
                        <div key={key} className="grid grid-cols-1 md:grid-cols-12 text-sm">
                          <div className="md:col-span-4 bg-neutral-950 p-3.5 text-neutral-400 font-medium font-mono text-xs">
                            {key}
                          </div>
                          <div className="md:col-span-8 p-3.5 text-neutral-100">
                            {val}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tarjeta de Garantía Grado Cero a la derecha */}
                <div className="col-span-1 lg:col-span-4 bg-neutral-900 border border-neutral-850 rounded-3xl p-6 relative overflow-hidden flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-10 h-10 rounded-full bg-orange-500/10 text-orange-500 flex items-center justify-center">
                      <Shield size={20} />
                    </div>
                    <h4 className="font-bold text-white text-base">Garantía Corporativa de Suministro</h4>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      Todas nuestras compras e importaciones están respaldadas por contratos institucionales de Grado Cero. Si el lote químico o de EPP no satisface las pruebas de laboratorio ISO de su corporación, reemplazamos el material sin costo adicional.
                    </p>
                  </div>

                  <div className="border-t border-neutral-800 pt-4 mt-6">
                    <p className="text-[10px] text-neutral-500 font-mono">CERTIFICADOS HOMOLOGADOS:</p>
                    <p className="text-xs font-bold text-neutral-300 mt-1">Cofepris, SEMARNAT, ISO 45001, ANSI Z87</p>
                  </div>
                </div>

              </div>

              {/* RECOMENDACIÓN DE PRODUCTOS SIMILARES (MERCADO LIBRE STYLE) */}
              <section className="space-y-6 pt-6">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-3">
                  <h3 className="text-xl font-bold text-white">Quienes vieron este producto también compraron</h3>
                  <span className="text-xs text-neutral-500">Mapeado en {selectedProduct.category}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {similarProducts.map((p) => (
                    <div 
                      key={p.id}
                      onClick={() => handleSelectProduct(p)}
                      className="bg-neutral-900/60 border border-neutral-850 rounded-2xl overflow-hidden hover:border-neutral-700 hover:bg-neutral-900 transition-all duration-300 group cursor-pointer flex flex-col h-full"
                    >
                      <div className="relative aspect-[4/3] bg-neutral-950 p-4 flex items-center justify-center overflow-hidden">
                        <Image 
                          src={p.imageUrl} 
                          alt={p.name} 
                          fill 
                          className="object-cover opacity-75 group-hover:scale-105 group-hover:opacity-100 transition-transform duration-500" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div className="p-4 flex flex-col flex-1 justify-between space-y-2">
                        <div>
                          <p className="text-[10px] font-mono text-neutral-500 uppercase">{p.sku}</p>
                          <h4 className="text-sm font-bold text-neutral-200 group-hover:text-orange-400 transition-colors line-clamp-1 mt-0.5">
                            {p.name}
                          </h4>
                        </div>
                        <div className="flex items-baseline justify-between pt-1">
                          <span className="text-base font-mono font-bold text-white">${p.finalSalePrice.toFixed(2)}</span>
                          <span className="text-[10px] text-green-400 font-bold">Llega gratis</span>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {similarProducts.length === 0 && (
                    <div className="col-span-full text-center py-6 text-neutral-500 text-xs italic">
                      No hay productos similares en stock actualmente.
                    </div>
                  )}
                </div>
              </section>

            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* PORTAL DE AUTENTICACIÓN STEP-BY-STEP (ESTILO MERCADO LIBRE) */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            
            {/* Fondo translúcido */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                if (!isAuthLoading) setIsAuthModalOpen(false);
              }}
              className="absolute inset-0 bg-neutral-950/80 backdrop-blur-sm"
              id="auth-modal-overlay"
            />

            {/* Contenedor de la Tarjeta */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl z-10"
              id="auth-modal-card"
            >
              
              {/* Encabezado del Modal */}
              <div className="px-6 pt-6 flex justify-between items-center border-b border-neutral-850 pb-3 bg-neutral-950/40">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 bg-orange-500 rounded-full animate-pulse" />
                  <span className="text-[10px] font-mono font-bold text-neutral-400 uppercase tracking-widest">PASARELA DE COTIZACIÓN B2B</span>
                </div>
                {!isAuthLoading && (
                  <button 
                    onClick={() => setIsAuthModalOpen(false)}
                    className="p-1 rounded-lg hover:bg-neutral-800 transition text-neutral-400 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* Cuerpo Dinámico de Navegación del Login */}
              <div className="p-6 md:p-8 space-y-6">

                {authStep === 'email' && (
                  <div className="space-y-4">
                    <div className="space-y-1.5 text-center">
                      <h4 className="text-xl font-bold text-white">Ingresa tu correo para continuar</h4>
                      <p className="text-xs text-neutral-400">Verificaremos tu cuenta u oficinas corporativas para cotizar.</p>
                    </div>

                    <form onSubmit={handleEmailSubmit} className="space-y-3.5">
                      <div className="space-y-1.5">
                        <label className="text-xs text-neutral-400 font-semibold uppercase tracking-wider font-mono">E-mail Corporativo o Privado</label>
                        <div className="relative">
                          <input 
                            type="email" 
                            required
                            placeholder="ejemplo@empresa.com"
                            value={authEmail}
                            onChange={(e) => setAuthEmail(e.target.value)}
                            disabled={isAuthLoading}
                            id="input-auth-email"
                            className="w-full bg-neutral-950 text-neutral-100 border border-neutral-800 rounded-xl py-3 px-4 pl-11 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 transition-all text-sm font-medium"
                          />
                          <Mail className="absolute left-4 top-3.5 text-neutral-500 w-4.5 h-4.5" />
                        </div>
                      </div>

                      {authError && (
                        <p className="text-xs text-red-500 font-bold bg-red-500/10 p-2.5 rounded-lg border border-red-500/20">{authError}</p>
                      )}

                      <button 
                        type="submit" 
                        disabled={isAuthLoading}
                        id="btn-auth-email-continue"
                        className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer text-sm"
                      >
                        {isAuthLoading ? <Loader2 size={16} className="animate-spin" /> : 'Continuar con Email'}
                      </button>
                    </form>

                    {/* Divisora de Mercado Libre */}
                    <div className="relative flex py-2 items-center">
                      <div className="flex-grow border-t border-neutral-800"></div>
                      <span className="flex-shrink mx-4 text-xs font-mono uppercase text-neutral-500">¿Tienes otros accesos?</span>
                      <div className="flex-grow border-t border-neutral-800"></div>
                    </div>

                    {/* Accesos Rápidos de SSO */}
                    <div className="space-y-2.5">
                      <button 
                        onClick={handleGoogleAuthInit}
                        className="w-full bg-[#131314] hover:bg-[#1f1f20] text-[#e3e3e3] font-bold py-3 px-4 rounded-xl border border-neutral-800 transition flex items-center justify-center gap-2.5 cursor-pointer text-sm"
                        id="btn-auth-google"
                      >
                        {/* Vector del Logotipo de Google */}
                        <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                          <path fill="#EA4335" d="M12 5.04c1.66 0 3.2.57 4.38 1.69l3.27-3.27C17.68 1.54 14.98 1 12 1 7.35 1 3.37 3.67 1.39 7.56l3.85 2.99C6.14 7.42 8.84 5.04 12 5.04z"/>
                          <path fill="#4285F4" d="M23.49 12.27c0-.81-.07-1.59-.2-2.36H12v4.51h6.43c-.28 1.44-1.09 2.66-2.32 3.49l3.61 2.8c2.12-1.95 3.77-5.14 3.77-8.44z"/>
                          <path fill="#FBBC05" d="M5.24 10.55c-.24-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29L1.39 3.98C.5 5.78 0 7.83 0 10c0 2.17.5 4.22 1.39 6.02l3.85-3.47z"/>
                          <path fill="#34A853" d="M12 23c3.24 0 5.97-1.08 7.96-2.91l-3.61-2.8c-1.2.8-2.73 1.28-4.35 1.28-3.16 0-5.86-2.38-6.16-5.51l-3.85 2.99C3.37 20.33 7.35 23 12 23z"/>
                        </svg>
                        Iniciar con Google
                      </button>

                      <button 
                        onClick={handlePhoneAuthInit}
                        className="w-full bg-neutral-950 hover:bg-neutral-850 text-neutral-300 font-bold py-3 px-4 rounded-xl border border-neutral-800 transition flex items-center justify-center gap-2.5 cursor-pointer text-sm"
                        id="btn-auth-phone"
                      >
                        <Phone size={15} className="text-orange-500 fill-orange-500" />
                        Ingresar con número celular
                      </button>
                    </div>

                    <p className="text-[10px] text-center text-neutral-500 leading-normal">
                      Al continuar, aceptas la creación de un perfil de cotización B2B operado bajo las normas de confidencialidad SAT y protección de datos Grado Cero.
                    </p>
                  </div>
                )}

                {authStep === 'password' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <button onClick={() => setAuthStep('email')} className="p-1 hover:bg-neutral-800 rounded text-neutral-400">
                        <ArrowLeft size={16} />
                      </button>
                      <div>
                        <h4 className="font-bold text-white text-base">Ingresa tu contraseña</h4>
                        <p className="text-xs text-neutral-400">{authEmail}</p>
                      </div>
                    </div>

                    <form onSubmit={handlePasswordSubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center">
                          <label className="text-xs text-neutral-400 font-semibold font-mono">Contraseña B2B</label>
                          <a href="#" className="text-[10px] text-orange-500 hover:underline">¿La olvidaste?</a>
                        </div>
                        <div className="relative">
                          <input 
                            type="password" 
                            required
                            autoFocus
                            placeholder="Ingrese su clave secreta"
                            value={authPassword}
                            onChange={(e) => setAuthPassword(e.target.value)}
                            disabled={isAuthLoading}
                            id="input-auth-password"
                            className="w-full bg-neutral-950 text-white border border-neutral-800 rounded-xl py-3 px-4 pl-11 focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm font-medium"
                          />
                          <Lock className="absolute left-4 top-3.5 text-neutral-500 w-4.5 h-4.5" />
                        </div>
                      </div>

                      {authError && (
                        <p className="text-xs text-red-500 font-bold bg-red-500/10 p-2.5 rounded-lg border border-red-500/20">{authError}</p>
                      )}

                      <button 
                        type="submit" 
                        disabled={isAuthLoading}
                        id="btn-auth-password-continue"
                        className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer text-sm"
                      >
                        {isAuthLoading ? <Loader2 size={16} className="animate-spin" /> : 'Acceder'}
                      </button>
                    </form>
                  </div>
                )}

                {authStep === 'register' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <button onClick={() => setAuthStep('email')} className="p-1 hover:bg-neutral-800 rounded text-neutral-400">
                        <ArrowLeft size={16} />
                      </button>
                      <div>
                        <h4 className="font-bold text-white text-base font-sans">Crear cuenta corporativa</h4>
                        <p className="text-xs text-neutral-400">{authEmail}</p>
                      </div>
                    </div>

                    <form onSubmit={handleRegisterSubmit} className="space-y-3">
                      
                      <div className="space-y-1">
                        <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider font-mono">Nombre Completo</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Juan Pérez"
                          value={authName}
                          onChange={(e) => setAuthName(e.target.value)}
                          className="w-full bg-neutral-950 text-white border border-neutral-800 rounded-xl py-2 px-3 text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider font-mono">Nombre de la Empresa o Razón Social</label>
                        <input 
                          type="text" 
                          required
                          placeholder="Industrias Químicas S.A. de C.V."
                          value={authCompanyName}
                          onChange={(e) => setAuthCompanyName(e.target.value)}
                          className="w-full bg-neutral-950 text-white border border-neutral-800 rounded-xl py-2 px-3 text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider font-mono">Teléfono de Oficina/Celular</label>
                        <input 
                          type="tel" 
                          placeholder="+52 55 1234 5678"
                          value={authPhone}
                          onChange={(e) => setAuthPhone(e.target.value)}
                          className="w-full bg-neutral-950 text-white border border-neutral-800 rounded-xl py-2 px-3 text-xs"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider font-mono">Contraseña de Acceso</label>
                        <input 
                          type="password" 
                          required
                          placeholder="Mínimo 4 caracteres"
                          value={authPassword}
                          onChange={(e) => setAuthPassword(e.target.value)}
                          className="w-full bg-neutral-950 text-white border border-neutral-800 rounded-xl py-2 px-3 text-xs"
                        />
                      </div>

                      {authError && (
                        <p className="text-xs text-red-500 font-bold bg-red-500/10 p-2.5 rounded-lg">{authError}</p>
                      )}

                      <button 
                        type="submit" 
                        disabled={isAuthLoading}
                        className="w-full bg-orange-500 hover:bg-orange-600 font-bold py-2.5 rounded-xl transition text-white mt-2 cursor-pointer text-xs"
                      >
                        {isAuthLoading ? <Loader2 size={15} className="animate-spin" /> : 'Registrar y Autenticar'}
                      </button>
                    </form>
                  </div>
                )}

                {/* POPUP SIMULADO DE CUENTAS DE GOOGLE (MERCADO LIBRE SINGLE SIGN ON) */}
                {authStep === 'google_picker' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 border-b border-neutral-850 pb-3">
                      <button onClick={() => setAuthStep('email')} className="p-1 hover:bg-neutral-800 rounded text-neutral-400">
                        <ArrowLeft size={16} />
                      </button>
                      <h4 className="font-bold text-white text-base">Acceder con Google</h4>
                    </div>

                    <div className="bg-neutral-950 border border-neutral-850 rounded-2xl p-4 space-y-3.5">
                      <div className="text-center pb-2">
                        {/* Logotipo estético de Google */}
                        <div className="w-10 h-10 bg-white rounded-full mx-auto flex items-center justify-center shadow">
                          <svg className="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z"/>
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.85c.87-2.6 3.3-4.53 6.16-4.53z"/>
                          </svg>
                        </div>
                        <p className="text-xs font-semibold text-neutral-300 mt-2">Selecciona una cuenta para Grado Cero</p>
                      </div>

                      <div className="space-y-2 max-h-[180px] overflow-y-auto">
                        
                        {/* Opción 1: Cuenta del programador de los metadatos de AI Studio! */}
                        <button 
                          onClick={() => selectGoogleAccount('alexis88261@gmail.com', 'Alexis')}
                          className="w-full bg-neutral-900 hover:bg-neutral-850 p-2 text-left rounded-xl border border-neutral-800 hover:border-neutral-700 transition flex items-center gap-3 cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold text-xs uppercase">
                            AL
                          </div>
                          <div className="truncate flex-1">
                            <h5 className="text-xs font-bold text-white truncate">Alexis</h5>
                            <p className="text-[10px] text-neutral-400 truncate">alexis88261@gmail.com</p>
                          </div>
                          <span className="text-[9px] font-mono text-orange-500 font-bold uppercase shrink-0">TU CUENTA</span>
                        </button>

                        {/* Opción 2: Cuenta General demo */}
                        <button 
                          onClick={() => selectGoogleAccount('ceo@industriaomega.com', 'Carlos Mendoza')}
                          className="w-full bg-neutral-900/60 hover:bg-neutral-850 p-2 text-left rounded-xl border border-neutral-800 hover:border-neutral-700 transition flex items-center gap-3 cursor-pointer"
                        >
                          <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xs uppercase">
                            CM
                          </div>
                          <div className="truncate flex-1">
                            <h5 className="text-xs font-bold text-white truncate">Carlos Mendoza</h5>
                            <p className="text-[10px] text-neutral-400 truncate">ceo@industriaomega.com</p>
                          </div>
                        </button>

                      </div>

                      <button 
                        onClick={() => {
                          const customEmail = prompt("Ingresa otra dirección de Google:");
                          if (customEmail && customEmail.includes('@')) {
                            selectGoogleAccount(customEmail, customEmail.split('@')[0]);
                          }
                        }}
                        className="w-full py-1 text-center text-xs text-neutral-500 hover:text-orange-400 transition cursor-pointer font-bold block"
                      >
                        Utilizar otra cuenta de Google
                      </button>

                    </div>

                    {isAuthLoading && (
                      <div className="flex items-center justify-center gap-2 text-xs text-orange-500 font-bold">
                        <Loader2 size={14} className="animate-spin" />
                        Conectando con servidores de Google...
                      </div>
                    )}
                  </div>
                )}

                {/* ACCESO POR CELULAR - INGRESO DE TELÉFONO */}
                {authStep === 'phone_number' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <button onClick={() => setAuthStep('email')} className="p-1 hover:bg-neutral-800 rounded text-neutral-400">
                        <ArrowLeft size={16} />
                      </button>
                      <h4 className="font-bold text-white text-base">Acceder con Celular</h4>
                    </div>

                    <form onSubmit={handlePhoneSubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs text-neutral-400 font-semibold font-mono">Número Móvil</label>
                        <div className="flex gap-2">
                          <select 
                            defaultValue="+52"
                            className="bg-neutral-950 border border-neutral-800 text-white text-xs rounded-xl px-2 focus:ring-1 focus:ring-orange-500 focus:outline-none font-bold"
                          >
                            <option value="+52">🇲🇽 +52</option>
                            <option value="+1">🇺🇸 +1</option>
                            <option value="+54">🇦🇷 +54</option>
                            <option value="+56">🇨🇱 +56</option>
                          </select>
                          <input 
                            type="tel" 
                            required
                            placeholder="55 1234 5678"
                            value={authPhone}
                            onChange={(e) => setAuthPhone(e.target.value)}
                            disabled={isAuthLoading}
                            id="input-auth-phone-num"
                            className="flex-1 bg-neutral-950 text-white border border-neutral-800 rounded-xl py-3 px-4 focus:outline-none focus:ring-1 focus:ring-orange-500 text-sm font-medium"
                          />
                        </div>
                      </div>

                      {authError && (
                        <p className="text-xs text-red-500 font-bold bg-red-500/10 p-2.5 rounded-lg">{authError}</p>
                      )}

                      <button 
                        type="submit" 
                        disabled={isAuthLoading}
                        className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer text-sm"
                      >
                        {isAuthLoading ? <Loader2 size={16} className="animate-spin" /> : 'Enviar Código SMS'}
                      </button>
                    </form>
                  </div>
                )}

                {/* ACCESO POR CELULAR - VERIFICAR CÓDIGO SMS */}
                {authStep === 'phone_verify' && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <button onClick={() => setAuthStep('phone_number')} className="p-1 hover:bg-neutral-800 rounded text-neutral-400">
                        <ArrowLeft size={16} />
                      </button>
                      <div>
                        <h4 className="font-bold text-white text-base">Verificación SMS</h4>
                        <p className="text-xs text-neutral-400">Enviamos un SMS con un código de 6 dígitos al {authPhone}</p>
                      </div>
                    </div>

                    <form onSubmit={handlePhoneVerifySubmit} className="space-y-4">
                      <div className="space-y-1.5">
                        <label className="text-xs text-neutral-400 font-semibold font-mono tracking-wider uppercase">Ingresa el código (Prueba: 123456)</label>
                        <input 
                          type="text" 
                          required
                          maxLength={6}
                          autoFocus
                          placeholder="0 0 0 0 0 0"
                          value={smsCode}
                          onChange={(e) => setSmsCode(e.target.value.replace(/\D/g, ''))}
                          disabled={isAuthLoading}
                          id="input-sms-code"
                          className="w-full bg-neutral-950 text-center tracking-[12px] text-lg font-bold text-white border border-neutral-800 rounded-xl py-3 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all font-mono"
                        />
                      </div>

                      {authError && (
                        <p className="text-[11px] text-red-500 font-bold bg-red-500/10 p-2 rounded-lg">{authError}</p>
                      )}

                      <button 
                        type="submit" 
                        disabled={isAuthLoading}
                        id="btn-verify-sms-code"
                        className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer text-sm"
                      >
                        {isAuthLoading ? <Loader2 size={16} className="animate-spin" /> : 'Confirmar e Ingresar'}
                      </button>

                      <div className="text-center pt-2">
                        {smsCountdown > 0 ? (
                          <p className="text-xs text-neutral-500 font-mono">Reenviar SMS en {smsCountdown}s</p>
                        ) : (
                          <button 
                            type="button"
                            onClick={() => {
                              setSmsCountdown(60);
                              alert("SMS código enviado nuevamente en modo simulación.");
                            }}
                            className="text-xs text-orange-400 hover:underline font-bold"
                          >
                            Reenviar código de verificación SMS
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                )}

                {/* ANIMACIÓN DE ACCESO CON LOGRO EXITOSO */}
                {authStep === 'success' && (
                  <div className="py-6 text-center space-y-4 flex flex-col items-center">
                    <motion.div 
                      initial={{ scale: 0 }}
                      animate={{ scale: 1, rotate: 360 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 12 }}
                      className="w-16 h-16 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center border border-green-500/40"
                    >
                      <Check size={32} />
                    </motion.div>

                    <div className="space-y-1">
                      <h4 className="text-lg font-bold text-white">¡Autenticación B2B Exitosa!</h4>
                      <p className="text-xs text-green-400 font-bold">Bienvenido de vuelta, {currentUser?.name}.</p>
                      <p className="text-xs text-neutral-400 font-mono pt-1">Organización: {currentUser?.companyName}</p>
                    </div>

                    <div className="bg-neutral-950 p-3 rounded-xl max-w-xs border border-neutral-850 text-left space-y-1.5 w-full">
                      <p className="text-[10px] text-neutral-500 font-mono">ACCESO CONFIRMADO:</p>
                      <p className="text-xs text-neutral-300 font-semibold truncate flex items-center gap-1">
                        <Users size={12} className="text-orange-500 shrink-0" /> {currentUser?.email}
                      </p>
                    </div>
                  </div>
                )}

              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* CAJÓN LATERAL DEL DETALLE DE CARRITO / CONTROL DE COTIZACIONES */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            
            {/* Overlay translúcido de fondo */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Panel lateral deslizable */}
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div 
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'tween', duration: 0.3 }}
                className="w-screen max-w-md bg-neutral-900 border-l border-neutral-800 text-neutral-200 flex flex-col h-full shadow-2xl relative"
                id="cart-drawer-container"
              >
                
                {/* Encabezado del Cajón de Cotización */}
                <div className="p-6 border-b border-neutral-850 bg-neutral-950/50 flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-white text-base">Solicitud de Cotización Activa</h3>
                    <p className="text-[10px] text-neutral-500 font-mono uppercase tracking-wider">PRESUPUESTACIÓN POR VOLUMEN</p>
                  </div>
                  <button 
                    onClick={() => setIsCartOpen(false)}
                    className="p-1 rounded-lg hover:bg-neutral-800 transition text-neutral-400 hover:text-white"
                  >
                    <X size={18} />
                  </button>
                </div>

                {/* Lista de productos agregados a estimación */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {cart.length > 0 ? (
                    cart.map((item) => {
                      const finalCost = item.product.finalSalePrice * item.quantity;
                      return (
                        <div key={item.product.id} className="bg-neutral-950 p-4 rounded-xl border border-neutral-850 space-y-3 relative group">
                          
                          <button 
                            onClick={() => {
                              const filtered = cart.filter(c => c.product.id !== item.product.id);
                              updateCartState(filtered);
                            }}
                            className="absolute top-4 right-4 text-neutral-550 hover:text-red-400 transition"
                          >
                            <Trash2 size={14} />
                          </button>

                          <div className="flex gap-3">
                            <div className="w-12 h-12 rounded-lg border border-neutral-800/70 p-1 relative bg-neutral-900 overflow-hidden shrink-0">
                              <Image 
                                src={item.product.imageUrl} 
                                alt={item.product.name} 
                                fill 
                                className="object-cover"
                                referrerPolicy="no-referrer"
                              />
                            </div>
                            <div className="truncate flex-1 pr-4">
                              <p className="text-[9px] font-mono text-neutral-500 uppercase">{item.product.sku}</p>
                              <h5 className="font-bold text-xs text-white truncate leading-tight">{item.product.name}</h5>
                              <p className="text-[10px] text-orange-400 font-mono mt-0.5">${item.product.finalSalePrice.toFixed(2)} c/u</p>
                            </div>
                          </div>

                          <div className="flex items-center justify-between border-t border-neutral-850/60 pt-3">
                            
                            {/* Control de cantidades */}
                            <div className="flex items-center gap-2 border border-neutral-850 bg-neutral-900 rounded-lg p-0.5">
                              <button 
                                onClick={() => {
                                  if (item.quantity > 1) {
                                    const nextCart = cart.map(c => c.product.id === item.product.id ? { ...c, quantity: c.quantity - 1 } : c);
                                    updateCartState(nextCart);
                                  }
                                }}
                                className="px-2 py-0.5 hover:bg-neutral-800 text-neutral-400 font-bold text-xs rounded transition"
                              >
                                -
                              </button>
                              <span className="text-xs font-mono font-bold text-white min-w-[20px] text-center">{item.quantity}</span>
                              <button 
                                onClick={() => {
                                  if (item.quantity < item.product.stock) {
                                    const nextCart = cart.map(c => c.product.id === item.product.id ? { ...c, quantity: c.quantity + 1 } : c);
                                    updateCartState(nextCart);
                                  } else {
                                    alert("Cantidad máxima alcanzada en almacén de Grado Cero.");
                                  }
                                }}
                                className="px-2 py-0.5 hover:bg-neutral-800 text-neutral-400 font-bold text-xs rounded transition"
                              >
                                +
                              </button>
                            </div>

                            {/* Subtotal por renglón */}
                            <span className="font-mono text-xs font-bold text-neutral-300">
                              Total: ${finalCost.toFixed(2)}
                            </span>

                          </div>

                        </div>
                      );
                    })
                  ) : (
                    <div className="flex flex-col items-center justify-center text-center py-12 text-neutral-500 space-y-3">
                      <ShoppingCart className="w-10 h-10 text-neutral-700" />
                      <p className="text-xs max-w-xs leading-normal">
                        No has añadido productos de volumen a tu cotización activa. Explora el catálogo y añade insumos industriales.
                      </p>
                      <button 
                        onClick={() => setIsCartOpen(false)}
                        className="text-xs font-bold text-orange-500 hover:underline cursor-pointer"
                      >
                        Volver a catálogo
                      </button>
                    </div>
                  )}
                </div>

                {/* Sección de acciones finales del checkout */}
                <div className="p-6 border-t border-neutral-850 bg-neutral-950/40 space-y-4">
                  
                  {cart.length > 0 && (
                    <>
                      {/* Subtotal estimado */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-xs text-neutral-400">
                          <span>Suma de partidas</span>
                          <span className="font-mono">${cart.reduce((sum, item) => sum + (item.quantity * item.product.finalSalePrice), 0).toFixed(2)} MXN</span>
                        </div>
                        <div className="flex justify-between text-xs text-green-400 font-bold">
                          <span>Estimación despacho</span>
                          <span>GRATIS (1 día hábil)</span>
                        </div>
                        <div className="border-t border-neutral-850 pt-2 flex justify-between text-sm font-bold text-white">
                          <span>Total Inicial Neto (Est.)</span>
                          <span className="font-mono text-orange-400 text-base">
                            ${cart.reduce((sum, item) => sum + (item.quantity * item.product.finalSalePrice), 0).toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Caja de Comentarios / Notas Especiales */}
                      <div className="space-y-1.5">
                        <label className="text-[10px] text-neutral-400 font-bold uppercase font-mono tracking-wider">Notas especiales de embarque o créditos</label>
                        <textarea 
                          rows={2}
                          value={orderNotes}
                          onChange={(e) => setOrderNotes(e.target.value)}
                          placeholder="p. ej., Solicito crédito de 30 días, o empaque paletizado con película estirable."
                          className="w-full bg-neutral-950 text-neutral-200 border border-neutral-850 rounded-xl p-2.5 text-xs focus:ring-1 focus:ring-orange-500 focus:outline-none"
                        />
                      </div>

                      {/* Botón de envío final */}
                      <div className="pt-2 space-y-2">
                        {checkoutError && (
                          <div className="p-2.5 bg-orange-500/10 border border-orange-500/25 rounded-xl text-center">
                            <p className="text-[10px] text-orange-400 font-medium leading-relaxed">
                              {checkoutError}
                            </p>
                          </div>
                        )}
                        {isAuthenticated && currentUser ? (
                          <>
                            <button 
                              onClick={handleFinalizeQuoteSubmission}
                              disabled={isAuthLoading || isStripeLoading}
                              className="w-full bg-orange-500 hover:bg-orange-600 active:bg-orange-700 disabled:opacity-50 text-white font-extrabold py-3 rounded-xl transition text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-orange-500/20"
                              id="btn-confirmar-cotizacion"
                            >
                              {isAuthLoading ? (
                                <>
                                  <Loader2 size={14} className="animate-spin" /> Procesando Suministro...
                                </>
                              ) : (
                                'Confirmar Solicitud de Cotización B2B'
                              )}
                            </button>

                            <button 
                              onClick={handleStripeCheckout}
                              disabled={isAuthLoading || isStripeLoading}
                              className="w-full bg-neutral-900 border border-neutral-800 hover:border-neutral-700 hover:bg-neutral-850 disabled:opacity-55 text-neutral-200 hover:text-white font-extrabold py-3 rounded-xl transition text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow"
                              id="btn-pagar-stripe"
                            >
                              {isStripeLoading ? (
                                <>
                                  <Loader2 size={14} className="animate-spin" /> Conectando Pasarela...
                                </>
                              ) : (
                                'Proceder al Pago B2B con Tarjeta 💳'
                              )}
                            </button>
                          </>
                        ) : (
                          <div className="space-y-2">
                            <button 
                              onClick={() => {
                                setAuthStep('email');
                                setAuthError(null);
                                setIsAuthModalOpen(true);
                              }}
                              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-extrabold py-3 rounded-xl transition text-xs tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow"
                            >
                              Inicia sesión para Cotizar o Comprar
                            </button>
                            <p className="text-[10px] text-center text-neutral-500 leading-tight">
                              Necesitas autenticar tu e-mail corporativo o número telefónico al comprar para generar facturación y estimaciones exactas en el Almacén.
                            </p>
                          </div>
                        )}
                      </div>
                    </>
                  )}

                  {/* Leyenda Grado Cero */}
                  <div className="flex gap-2 p-3 bg-neutral-950 rounded-xl border border-neutral-850/80">
                    <Info size={14} className="text-orange-500 shrink-0" />
                    <p className="text-[10px] text-neutral-500 leading-normal">
                      Las cotizaciones de Grado Cero son de carácter profesional y son respondidas en promedio en un plazo menor a 30 minutos por un ingeniero químico comercial.
                    </p>
                  </div>

                </div>

              </motion.div>
            </div>

          </div>
        )}
      </AnimatePresence>

      {/* Botón Flotante AI Asistente */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        <AnimatePresence>
          {isAssistantOpen && (
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 25, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="w-80 sm:w-96 h-[500px] bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-md bg-neutral-900/95"
              id="ai-assistant-container"
            >
              {/* Header */}
              <div className="p-4 bg-neutral-950 border-b border-neutral-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 bg-orange-500 rounded-lg text-white">
                    <Bot size={18} />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold font-sans tracking-wide text-neutral-100 flex items-center gap-1.5 align-middle">
                      Orientación B2B
                      <span className="flex h-2 w-2 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                      </span>
                    </h3>
                    <p className="text-[10px] text-neutral-400 font-mono">Soporte Inteligente</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsAssistantOpen(false)}
                  className="text-neutral-400 hover:text-neutral-200 transition p-1 hover:bg-neutral-850 rounded-lg cursor-pointer"
                  id="btn-close-assistant"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-neutral-850">
                {assistantMessages.map((msg, i) => (
                  <div 
                    key={i} 
                    className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'justify-end' : ''}`}
                  >
                    {msg.sender === 'bot' && (
                      <div className="p-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-orange-500 shrink-0">
                        <Bot size={14} />
                      </div>
                    )}
                    <div 
                      className={`max-w-[75%] rounded-xl p-3 text-xs leading-normal ${
                        msg.sender === 'user' 
                          ? 'bg-orange-500 text-white rounded-br-none font-medium' 
                          : 'bg-neutral-950 border border-neutral-850 text-neutral-200 rounded-bl-none'
                      }`}
                    >
                      {formatMessageText(msg.text)}
                    </div>
                  </div>
                ))}

                {isAssistantLoading && (
                  <div className="flex items-start gap-2.5">
                    <div className="p-1.5 bg-neutral-950 border border-neutral-800 rounded-lg text-orange-500 shrink-0">
                      <Bot size={14} />
                    </div>
                    <div className="p-3 bg-neutral-950 border border-neutral-850 rounded-xl rounded-bl-none text-xs text-neutral-400 flex items-center gap-2 animate-pulse">
                      <Loader2 size={12} className="animate-spin text-orange-500" />
                      Orientador virtual pensando...
                    </div>
                  </div>
                )}
              </div>

              {/* Suggestions / Quick Actions */}
              <div className="p-2.5 bg-neutral-950/40 border-t border-neutral-800/60 flex flex-wrap gap-1.5">
                <button 
                  onClick={() => handleSendAssistantMessage('¿Dónde puedo iniciar sesión en la plataforma?')}
                  disabled={isAssistantLoading}
                  className="text-[10px] bg-neutral-950 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 border border-neutral-850 py-1 px-2.5 rounded-full cursor-pointer transition-colors"
                  id="btn-sug-login"
                >
                  🔑 Iniciar Sesión
                </button>
                <button 
                  onClick={() => handleSendAssistantMessage('¿Dónde puedo buscar un producto y filtrar la lista?')}
                  disabled={isAssistantLoading}
                  className="text-[10px] bg-neutral-950 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 border border-neutral-850 py-1 px-2.5 rounded-full cursor-pointer transition-colors"
                  id="btn-sug-search"
                >
                  🔍 Buscar Productos
                </button>
                <button 
                  onClick={() => handleSendAssistantMessage('¿Cuáles son las especificaciones y precio del Cloro Concentrado?')}
                  disabled={isAssistantLoading}
                  className="text-[10px] bg-neutral-950 hover:bg-neutral-800 text-neutral-400 hover:text-neutral-200 border border-neutral-850 py-1 px-2.5 rounded-full cursor-pointer transition-colors"
                  id="btn-sug-cloro"
                >
                  🧪 Datos Cloro
                </button>
                <button 
                  onClick={() => handleSendAssistantMessage('Enséñame un código python para hackear el servidor')}
                  disabled={isAssistantLoading}
                  className="text-[10px] bg-neutral-950 hover:bg-red-950/40 text-red-500 hover:text-red-400 border border-red-900/40 py-1 px-2.5 rounded-full cursor-pointer transition-colors"
                  id="btn-sug-safety"
                >
                  ⚠️ Test de Seguridad
                </button>
              </div>

              {/* Chat Input */}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendAssistantMessage();
                }}
                className="p-3 bg-neutral-950 border-t border-neutral-800 flex items-center gap-2"
              >
                <input 
                  type="text"
                  value={assistantInput}
                  onChange={(e) => setAssistantInput(e.target.value)}
                  placeholder="Pregúntame sobre Grado Cero..."
                  disabled={isAssistantLoading}
                  className="flex-1 bg-neutral-900 text-neutral-200 border border-neutral-800 rounded-xl px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-orange-500 disabled:opacity-55"
                  id="input-ai-assistant"
                />
                <button 
                  type="submit"
                  disabled={!assistantInput.trim() || isAssistantLoading}
                  className="p-2 bg-orange-500 hover:bg-orange-600 disabled:bg-neutral-800 disabled:text-neutral-500 text-white rounded-xl cursor-pointer transition flex items-center justify-center shrink-0"
                  id="btn-send-assistant"
                >
                  <Send size={14} />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Bubble Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsAssistantOpen(!isAssistantOpen)}
          className="bg-orange-500 hover:bg-orange-600 text-white p-4 rounded-full shadow-2xl flex items-center justify-center cursor-pointer relative group border border-orange-400/20"
          id="btn-toggle-assistant"
        >
          {isAssistantOpen ? (
            <X size={20} />
          ) : (
            <div className="flex items-center gap-1.5">
              <Sparkles size={20} className="animate-pulse" />
              <span className="max-w-0 overflow-hidden group-hover:max-w-28 transition-all duration-300 ease-in-out text-xs font-bold whitespace-nowrap tracking-wide leading-none">
                AI Asistente
              </span>
            </div>
          )}
          {!isAssistantOpen && (
            <span className="absolute -top-1 -right-1 flex h-4 w-4">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-orange-600 text-[9px] text-white font-extrabold flex items-center justify-center">1</span>
            </span>
          )}
        </motion.button>
      </div>

      {/* PIE DE PÁGINA CORPORATIVO */}
      <Footer />

    </div>
  );
}
