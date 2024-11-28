import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

// const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI("AIzaSyD2wSBEPKaxfZtL_QFTcbHDpltvwcLlXyo");


const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "application/json",
};

async function run(subtopic) {
    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        systemInstruction:
          `Create a list of 10 quiz questions related to the subtopic ${subtopic}. Each question should include the following:A clear and concise question text.A list of multiple-choice options (4 options).A correct answer that includes:A basic answer (the correct option from the list). A detailed explanation of why the answer is correct. Ensure the response is structured in the following format:[ { "question": "Your question text here",\n "options": ["Option 1", "Option 2", "Option 3", "Option 4"],"correctAnswer": {"basicAnswer": "The correct option here", "detailedAnswer": "A detailed explanation for the correct answer here"}}]Please make sure the questions align with the subtopic and cover key concepts comprehensively.`,
      });
      
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage("generate quiz questions");
  return JSON.parse(result.response.text())
}

export const generateQuizQuestions = async (subtopic)=>{
    const quizes = await run();
    return quizes;
}
// run();
