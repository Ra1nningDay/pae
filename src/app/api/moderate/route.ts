import { NextResponse, NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { text } = body;
  const apiKey = process.env.OPENAI_API_KEY;

  if (!text || typeof text !== "string" || text.trim() === "") {
    return NextResponse.json(
      { error: "Invalid or missing text input" },
      { status: 400 },
    );
  }

  if (!apiKey) {
    return NextResponse.json({ error: "API key is missing" }, { status: 500 });
  }

  try {
    const gptResponse = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content:
                "คุณเป็นโมเดอเรเตอร์เนื้อหา คุณจะต้องตรวจสอบข้อความที่ให้มาและตอบกลับว่าเนื้อหานั้น 'เหมาะสม' หรือ 'ไม่เหมาะสม' เท่านั้น",
            },
            {
              role: "user",
              content: `ข้อความ: "${text}"\nกรุณาตอบเพียงว่า "เหมาะสม" หรือ "ไม่เหมาะสม"`,
            },
          ],
        }),
      },
    );

    const gptData = await gptResponse.json();
    const classification = gptData.choices[0].message.content.trim();

    return NextResponse.json({
      flagged: classification === "ไม่เหมาะสม",
      source: "gpt-filter",
    });
  } catch (error) {
    console.error("Moderation error:", error);
    return NextResponse.json(
      { error: "Failed to moderate content" },
      { status: 500 },
    );
  }
}
