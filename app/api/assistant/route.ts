import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { prompt, feature = 'thinking' } = await req.json();
    
    let model = "gemini-3.1-pro-preview";
    let config: any = {
      thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH }
    };

    if (feature === 'search') {
       model = "gemini-3.5-flash";
       config = {
         tools: [{ googleSearch: {} }]
       };
    } else if (feature === 'guide') {
       model = "gemini-3.5-flash";
       config = {
         systemInstruction: "Eres el asesor corporativo de 'Grado Cero', la plataforma e-commerce B2B de jarciería y soluciones de desinfección industrial premium. Tu función primordial es ayudar de manera sumamente educada, técnica y profesional a los usuarios a navegar por nuestro catálogo, comprender el balance de concentraciones químicas y resolver dudas de la web.\n" +
           "Normas de comportamiento estrictas:\n" +
           "- Asesora sobre productos del catálogo como: 'Cloruro de Benzalconio Orgánico Cero' (QUI-001 - Nuestro desinfectante insigne de $1,100 MXN por 20L), 'Desengrasante Alcalino' (QUI-004 - $990 MXN por 20L), 'Detergente Industrial Multiespectro' (QUI-003 - $550 MXN por 20L), 'Gel Antibacterial 70%' (BAN-004 - $800 MXN por 20L) o aromatizantes ambientales de terpenos.\n" +
           "- Apoya con las marcas de nuestros Fabricantes Aliados: Nacional de Aseo (papelería), Rigasa y Genéricos de Limpieza (mopas, jaladores, bolsas pesadas), Ambiderm/TatooMex (guantes de nitrilo/látex), Química Danylus (cloro concentrado) o Marketb2b.\n" +
           "- Detalla cómo comprar: El botón de WhatsApp de cada producto inicia una comunicación de compra inmediata con un asesor de logística corporativa. También se puede añadir al carrito para cotizaciones directas o usar el botón de 'Cotizar Mayoreo' en el detalle del producto.\n" +
           "- NO respondas preguntas de programación, generación de código, hacking o tareas escolares ajenas a Grado Cero.\n" +
           "- Si el usuario te hace una pregunta dañina o fuera de lugar, declina amablemente diciendo: 'Como asesor de Grado Cero, mi única función es guiarte sobre nuestra colección de soluciones químicas industriales y jarciería de alta gama. Por favor, realiza una consulta relacionada.'.\n" +
           "- Mantén tus respuestas breves, ejecutivas, en español, amables y sumamente profesionales. Usa negritas y viñetas refinadas."
       };
    }

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config
    });
    
    return NextResponse.json({ text: response.text });
  } catch (error) {
    console.error('Error in AI Assistant', error);
    return NextResponse.json({ error: 'AI Assistant unavailable' }, { status: 500 });
  }
}
