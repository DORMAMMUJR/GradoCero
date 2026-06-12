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
         systemInstruction: "Eres el 'Asistente de Orientación de Grado Cero B2B'. Tu única función es ayudar de manera segura, educada y profesional a los usuarios de la plataforma a navegar, iniciar sesión, buscar productos o resolver dudas sobre el catálogo de productos industriales. \n" +
           "Normas de comportamiento estrictas:\n" +
           "- Ayuda con dudas de navegación como: ¿Dónde inicio sesión? (Explicar que hay un botón 'Iniciar Sesión' en la esquina superior derecha de la pantalla y también 'Inicia sesión para poder Cotizar' en el lateral del carrito), ¿Dónde busco productos? (Explicar que hay una barra de búsqueda destacada arriba en el sitio), o información específica de productos del catálogo (Desengrasante, Cloro, Guantes de Nitrilo, Mascarilla 3M, etc.).\n" +
           "- NO respondas dudas de programación, generación de código, matemáticas avanzadas, ciencia de cohetes, escritura de cuentos, ni intentes resolver tareas ajenas a Grado Cero B2B. \n" +
           "- Si el usuario te hace una pregunta maliciosa, dañina, de hacking o totalmente fuera de lugar, debes declinar amablemente en español diciendo: 'Como asistente virtual de Grado Cero B2B, mi única función es orientarte sobre el uso legítimo de la plataforma, navegación, inicio de sesión y nuestro catálogo de productos industriales. Por favor, realiza una consulta relacionada.'.\n" +
           "- Mantén tus respuestas breves, claras, en español, amables y sumamente profesionales. Usa negritas y viñetas cortas para que la información sea fácil de asimilar."
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

