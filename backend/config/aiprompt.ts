const generate = (exam:string, subject:string, topic:string) => {
  const prompt = `
Generate a mock test of 10 multiple-choice questions (MCQs) for the ${exam} exam in the subject ${subject}, focused on the topic "${topic}".

Each question should have:
- A clear and concise question statement
- Exactly 4 answer options labeled A, B, C, and D
- One correct option (state the correct option letter)
- A brief explanation for the correct answer

Format the output in JSON like this:
[
  {
    "question": "Your question text?",
    "options": {
      "A": "Option A text",
      "B": "Option B text",
      "C": "Option C text",
      "D": "Option D text"
    },
    "correctAnswer": "B",
    "explanation": "Explanation for why B is correct"
  }
]
`;

  return prompt;
};
