import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_API_KEY,
});

export default async function handler(request, response) {
  console.log(request.body);
  const { emotionType, intensity, notes } = request.body;

  const prompt = `
  Provide actionable and empathetic feedback in maximum three sentences for an emotion entry. The emotion type is ${emotionType} with an intensity level ${intensity} of 3. The user has notes: ${
    notes ? notes : "Not provided"
  }.
  `;

  const data = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  const completion = data.choices[0].message.content;

  response.status(200).json({ output: completion });
}
