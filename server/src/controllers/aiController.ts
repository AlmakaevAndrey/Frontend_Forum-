import axios from 'axios';
import { Request, Response } from 'express';

interface GroqResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

export const generatePost = async (req: Request, res: Response) => {
  if (!process.env.GROQ_API_KEY) {
    return res.status(500).json({ message: 'GROQ_API_KEY not set' });
  }

  try {
    const { topic, difficulty } = req.body;

    const prompt = `
Write an SEO optimized blog post.

Topic: ${topic}
Difficulty: ${difficulty}

Write plain text only.
Do not use markdown.
Do not use symbols like *, #, -, or bullet lists.

Structure requirements:
1. Engaging introduction
2. Clear section headings
3. Helpful explanation
4. Final conclusion

Return EXACTLY in this format:

Title: blog title
Content: blog content

Do not add anything before Title.
`;

    const response = await axios.post<GroqResponse>(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.1-8b-instant',
        messages: [
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 800,
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const text = response.data.choices[0].message.content;

    res.json({
      content: text,
    });
  } catch (err: any) {
    console.error(err.response?.data || err.message);
    res.status(500).json({ message: 'AI generation failed' });
  }
};
