import axios from 'axios';
import { Request, Response } from 'express';
import cloudinary from '../config/cloudinary';
import { createCanvas, loadImage, registerFont } from 'canvas';
import path from 'path';

interface GroqResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

interface GroqResponse {
  choices: Array<{
    message: {
      content: string;
    };
  }>;
}

const fontPath = path.join(__dirname, '../fonts/roboto-v49-latin-200.woff2');
registerFont(fontPath, { family: 'Roboto' });

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

export const generateMeme = async (req: Request, res: Response) => {
  try {
    const { topic, level } = req.body;

    const memeTemplates = [
      'https://i.imgflip.com/1bij.jpg', // Frodo
      'https://i.imgflip.com/26am.jpg', // Distracted Boyfriend
      'https://i.imgflip.com/9ehk.jpg', // Drake
      'https://i.imgflip.com/30b1gx.jpg', // Leonardo DiCaprio Cheers
      'https://i.imgflip.com/1ur9b0.jpg', // Woman Yelling at Cat
      'https://i.imgflip.com/4t0m5.jpg', // Expanding Brain
      'https://i.imgflip.com/39t1o.jpg', // Two Buttons
      'https://i.imgflip.com/1otk96.jpg', // Uno Draw 25
      'https://i.imgflip.com/2wifvo.jpg', // Batman Slap
      'https://i.imgflip.com/3lmzyx.jpg', // Mocking SpongeBob
    ];

    const randomTemplate =
      memeTemplates[Math.floor(Math.random() * memeTemplates.length)];
    const img = await loadImage(randomTemplate);

    const colors = [
      { fill: 'white', stroke: 'black' },
      { fill: 'yellow', stroke: 'purple' },
      { fill: 'black', stroke: 'white' },
      { fill: 'red', stroke: 'black' },
      { fill: 'blue', stroke: 'white' },
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    const fontSize = Math.floor(img.height / 30);

    const prompt = `
You are a meme generator for programmers.

Create a funny IT meme about: ${topic}

Humor level: ${level}

Levels description:
easy: light and friendly programming joke
medium: sarcastic developer humor
hard: dark and brutal developer humor that programmers understand

Rules:
- Meme must be about programming, bugs, deploys, JavaScript, TypeScript, DevOps or coding life
- Return short meme text
- Maximum 12 words per line

Return EXACT format:

Top: meme top text
Bottom: meme bottom text
`;

    const groqResponse = await axios.post<GroqResponse>(
      'https://api.groq.com/openai/v1/chat/completions',
      {
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: prompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    const text = groqResponse.data.choices[0].message.content;
    const top = text.split('Top:')[1]?.split('Bottom:')[0]?.trim() || '';
    const bottom = text.split('Bottom:')[1]?.trim() || '';

    const canvas = createCanvas(img.width, img.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);

    ctx.font = `${fontSize}px Roboto`;
    ctx.fillStyle = color.fill;
    ctx.strokeStyle = color.stroke;
    ctx.lineWidth = Math.ceil(fontSize / 15);
    ctx.textAlign = 'center';

    const topY = Math.floor(Math.random() * 20) + fontSize;
    const bottomY = canvas.height - Math.floor(Math.random() * 20) - 10;

    ctx.fillText(top, canvas.width / 2, topY);
    ctx.strokeText(top, canvas.width / 2, topY);

    ctx.fillText(bottom, canvas.width / 2, bottomY);
    ctx.strokeText(bottom, canvas.width / 2, bottomY);

    const buffer = canvas.toBuffer('image/png');

    const upload = await cloudinary.uploader.upload(
      `data:image/png;base64,${buffer.toString('base64')}`,
      { folder: 'memes' }
    );

    res.json({ image: upload.secure_url, top, bottom });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Meme generation failed' });
  }
};
