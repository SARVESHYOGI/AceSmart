import { GoogleGenAI } from "@google/genai";
const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

const generate = async(exam:string, subject:string, topic:string) => {
  const prompt = `
Generate a mock test of 10 multiple-choice questions (MCQs) for the ${exam} exam in the subject ${subject}, focused on the topic "${topic}".

Each question should have:
- A clear and concise question statement
- Exactly 4 answer options labeled A, B, C, and D
- One correct option (state the correct option letter)
- A brief explanation for the correct answer
- give space as '*'


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

 Please structure the response strictly in valid JSON format. 
Ensure proper JSON syntax, including correct key-value pairs and appropriate use of quotes.
Do not include extra words like "json starts" or "json ends".
Do not include any additional text or explanations outside the JSON structure.
inside value if there is any space then use '*' .
remove all spaces in the JSON keys and values.
Do not include any additional text or explanations outside the JSON structure.
don't include escaped characters in the JSON structure.
`;
const result = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: [prompt],
  });
  console.log(result.text);
  
  const generatedText = await result.text;
    const cleanedText = generatedText?.replace(/```json\n|\n```/g, '');
    const jsonData = JSON.parse(cleanedText? cleanedText : '[]');


  return jsonData;
};

export default generate;