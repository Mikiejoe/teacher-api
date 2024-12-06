import { config, } from "dotenv";
import {
  GoogleGenerativeAI,
} from "@google/generative-ai";

config();
const apiKey = process.env.GEMINI_API_KEY;

const genAI = new GoogleGenerativeAI(apiKey);


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
          `Create a list of 10 quiz questions related to the subtopic ${subtopic}. Each question should include the following:A clear and concise question text.A list of multiple-choice options (4 options).A correct answer that includes:A basic answer (the correct option from the list). A detailed explanation of why the answer is correct. Ensure the response is structured in the following format:[ { "question": "Your question text here",\n "options": ["Option 1", "Option 2", "Option 3", "Option 4"],"correctAnswer": {"basicAnswer": "The correct option here", "detailedAnswer": "A detailed explanation for the correct answer here"}}]Please make sure the questions align with the subtopic and cover key concepts comprehensively. The questions should be of increasing difficulty, starting with easy questions and progressing to more challenging ones.`,
      });
      
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  try{
    const result = await chatSession.sendMessage("generate quiz questions");
    const response = JSON.parse(result.response.text());
    const res = {
      error: false,
      response: response,
      status: result.status,
    }
    
    return res;
  }
  catch(error){
    const res = {
      error: true,
      status: 500,
    }
    return res;
  }
}

export const generateQuizQuestions = async (subtopic)=>{
    const quizes = await run(subtopic);
    return quizes;
}
