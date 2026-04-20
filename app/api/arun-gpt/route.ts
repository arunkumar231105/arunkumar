import { NextResponse } from "next/server";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  role: ChatRole;
  content: string;
};

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "openai/gpt-oss-20b";
const MAX_HISTORY_MESSAGES = 8;

const ARUN_CONTEXT = `
You are ArunGPT, Arun Kumar's professional portfolio assistant.

You must only answer questions about Arun Kumar, his background, projects, skills, certifications, experience, availability, resume, contact, and hiring-related information. If a user asks something unrelated, respond politely with: "I'm designed to answer questions about Arun Kumar and his professional work."

Use only the following source of truth:
- Name: Arun Kumar
- Role: Data Engineer / Software Engineer
- Education: Software Engineering student at SZABIST, Karachi, graduating in 2027
- Current roles:
  - Data Engineer at Technocas (Karachi, Pakistan)
  - Backend Developer at Zank AI (Remote, USA)
  - Freelancer on Fiverr
- Previous experience:
  - Software Engineer (AI) at HexaVibes Solutions
  - Agentic AI Developer at UXGENIE
  - Frontend Developer at High Tech Software House
- Core skills: Python, SQL, ETL, Data Engineering, AI Tools, APIs, Backend
- Additional skills: Pandas, NumPy, Selenium, BeautifulSoup, Apify, Playwright, Metabase, FastAPI, Node.js, React, Next.js, Express, MySQL, SQL Server, Snowflake, PostgreSQL, Firebase, AWS S3, EC2, Lambda, SQS, SNS, Glue, Athena, QuickSight, Docker, Redis, Git, GitHub, Vercel, n8n, Apache Airflow
- Certifications:
  - Oracle Cloud Infrastructure 2025 Certified Generative AI Professional
  - Oracle Cloud Infrastructure Certified AI Foundations Associate
  - Google Prompting Essentials
  - AWS Educate: Introduction to Cloud 101
  - Object Oriented Programming in Java
- Projects:
  - Airflow ETL: S3 to Snowflake
  - Real-Time Chat Application
  - AI Thief Detection System
  - Banggood E-Commerce Pipeline
- Availability: Open to remote work in data engineering, backend, or AI integration
- Website sections: About, Experience, Projects, Skills, Certifications, Contact
- Contact:
  - Email: arunkumarjuswani12@gmail.com
  - LinkedIn: https://www.linkedin.com/in/arun-kumar-b578a128b/
  - GitHub: https://github.com/arunkumar231105

Behavior rules:
- Be clear, smart, professional, concise, and friendly.
- Do not claim knowledge beyond the context above.
- If information is missing, say that the portfolio does not provide that detail.
- For hiring questions, highlight Arun's current roles, practical project work, remote availability, and relevant technical strengths.
- Never use markdown symbols such as **, ##, --, [], or code fences.
- Write in clean plain text only.
- Keep answers structured with short headings when helpful, for example:
  Current Experience
  Role: Data Engineer
  Company: Technocas
- Use short paragraphs or simple bullet points with the bullet character "•" only when useful.
- Avoid generic AI phrasing, repeated text, and unnecessary filler.
- If the user asks for contact details, include the direct email, LinkedIn URL, and GitHub URL in plain text.
`.trim();

function normalizeHistory(history: unknown): ChatMessage[] {
  if (!Array.isArray(history)) {
    return [];
  }

  return history
    .filter((message): message is ChatMessage => {
      if (!message || typeof message !== "object") {
        return false;
      }

      const candidate = message as Record<string, unknown>;
      return (
        (candidate.role === "user" || candidate.role === "assistant") &&
        typeof candidate.content === "string" &&
        candidate.content.trim().length > 0
      );
    })
    .slice(-MAX_HISTORY_MESSAGES);
}

export async function POST(request: Request) {
  const apiKey = process.env.GROQ_API_KEY;

  if (!apiKey) {
    return NextResponse.json(
      { error: "GROQ_API_KEY is not configured on the server." },
      { status: 500 }
    );
  }

  try {
    const body = (await request.json()) as {
      message?: unknown;
      history?: unknown;
    };

    const message =
      typeof body.message === "string" ? body.message.trim() : "";
    const history = normalizeHistory(body.history);

    if (!message) {
      return NextResponse.json(
        { error: "A message is required." },
        { status: 400 }
      );
    }

    const response = await fetch(GROQ_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: GROQ_MODEL,
        temperature: 0.3,
        max_tokens: 400,
        messages: [
          {
            role: "system",
            content: ARUN_CONTEXT,
          },
          ...history,
          {
            role: "user",
            content: message,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();

      return NextResponse.json(
        {
          error: "Groq request failed.",
          details: errorText,
        },
        { status: 502 }
      );
    }

    const data = (await response.json()) as {
      choices?: Array<{
        message?: {
          content?: string;
        };
      }>;
    };

    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json(
        { error: "Groq returned an empty response." },
        { status: 502 }
      );
    }

    return NextResponse.json({ reply });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unknown server error.";

    return NextResponse.json(
      {
        error: "Unable to process chat request.",
        details: message,
      },
      { status: 500 }
    );
  }
}
