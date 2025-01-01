import React from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GENAI_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

export default async function GenaiPage() {
    const prompt = "wha should I implement app using GEMENI-AI. response with japanese";
    const { response } = await model.generateContent([prompt]).then((res) => {
        console.count()
        return res
    });

    return (
        <div>
            <div className="flex justify-between">
                <h1 className="text-2xl">GEMINI AI</h1>
            </div>
            <p className="whitespace-pre-wrap">{response.text()}</p>
        </div>
    );
}
