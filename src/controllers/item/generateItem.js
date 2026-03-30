const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateItem(req, res) {
  try {
    const { itemname, image } = req.body; 
    if (!itemname) return res.status(400).json({ error: "Item name is required" });

    const prompt = `Create a short description of this item to give information about a lost item to others: ${itemname}. ${
      image ? `Here is the image URL for reference: ${image}` : ""
    } Keep it under 60 words.`;

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You generate short, catchy item descriptions." },
        { role: "user", content: prompt },
      ],
      max_tokens: 50,
    });

    const description = response.choices?.[0]?.message?.content?.trim() || "";
    return res.json({ description });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate description" });
  }
}

module.exports = { generateItem };