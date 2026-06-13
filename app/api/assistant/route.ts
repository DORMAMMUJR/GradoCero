import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@/auth';
import { getClientIp } from '@/lib/http/client-ip';
import { consumeRateLimit } from '@/lib/security/rate-limit';
import { assistantRequestSchema } from '@/lib/validation/assistant';

const GUIDE_INSTRUCTION = `
Eres el asesor corporativo de Grado Cero, un comercio B2B mexicano de
soluciones de limpieza y desinfección industrial. Responde en español,
de forma breve, profesional y basada únicamente en el catálogo o contexto
proporcionado. No inventes precios, disponibilidad, concentraciones ni
propiedades químicas. Para recomendaciones que impliquen seguridad química,
indica que se debe consultar la ficha técnica y al responsable de seguridad.
Rechaza solicitudes ajenas a Grado Cero.
`.trim();

let aiInstance: GoogleGenAI | undefined;

function getAi() {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error('GEMINI_NOT_CONFIGURED');
  }

  aiInstance ??= new GoogleGenAI({ apiKey });
  return aiInstance;
}

export async function POST(request: NextRequest) {
  const session = await auth();

  if (!session?.user) {
    return NextResponse.json({ error: 'No autorizado.' }, { status: 401 });
  }

  const rateLimit = consumeRateLimit(
    `assistant:${session.user.id || getClientIp(request)}`,
    20,
    60_000,
  );

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: 'Límite de consultas alcanzado.' },
      {
        status: 429,
        headers: { 'Retry-After': String(rateLimit.retryAfterSeconds) },
      },
    );
  }

  try {
    const parsed = assistantRequestSchema.safeParse(await request.json());

    if (!parsed.success) {
      return NextResponse.json(
        { error: 'La consulta no es válida.' },
        { status: 400 },
      );
    }

    const { prompt, feature } = parsed.data;
    const response = await getAi().models.generateContent({
      model:
        feature === 'thinking'
          ? process.env.GEMINI_REASONING_MODEL || 'gemini-3.1-pro-preview'
          : process.env.GEMINI_FAST_MODEL || 'gemini-3.5-flash',
      contents: prompt,
      config:
        feature === 'search'
          ? { tools: [{ googleSearch: {} }] }
          : feature === 'guide'
            ? { systemInstruction: GUIDE_INSTRUCTION }
            : { thinkingConfig: { thinkingLevel: ThinkingLevel.HIGH } },
    });

    return NextResponse.json({ text: response.text ?? '' });
  } catch (error) {
    console.error('AI assistant failed', error);
    return NextResponse.json(
      { error: 'El asistente no está disponible.' },
      { status: 503 },
    );
  }
}
