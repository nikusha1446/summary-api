import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const generateSummary = async (content, style = 'brief') => {
  try {
    const stylePrompts = {
      brief: 'Provide a brief, concise summary in 2-3 sentences.',
      detailed:
        'Provide a detailed summary covering all main points and key details.',
      'bullet-points':
        'Provide a summary in bullet points, highlighting the key takeaways.',
    };

    const stylePrompt = stylePrompts[style] || stylePrompts.brief;

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that summarizes text content.',
        },
        {
          role: 'user',
          content: `${stylePrompt}\n\nText to summarize:\n${content}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    const summary = completion.choices[0].message.content.trim();

    return summary;
  } catch (error) {
    console.error('OpenAI API error:', error);
    throw new Error('Failed to generate summary');
  }
};
