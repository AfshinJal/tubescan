import { YoutubeTranscript } from "youtube-transcript";
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter";
import { Document } from "langchain/document";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { HuggingFaceTransformersEmbeddings } from "@langchain/community/embeddings/hf_transformers";
import { OpenAI } from "@langchain/openai";
import { RetrievalQAChain } from "langchain/chains";
import "dotenv/config";

let vectorStore;

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const model = new OpenAI({
  modelName: "gpt-3.5-turbo",
  openAIApiKey: OPENAI_API_KEY,
  temperature: 0,
});

export async function generateEmbeddings(transcript) {
  const embeddings = new HuggingFaceTransformersEmbeddings({
    modelName: "Xenova/all-MiniLM-L6-v2",
  });
  const textSplitter = new RecursiveCharacterTextSplitter({
    chunkSize: 1000,
    chunkOverlap: 200,
  });
  const splitDocs = await textSplitter.splitDocuments([
    new Document({ pageContent: transcript }),
  ]);
  vectorStore = await MemoryVectorStore.fromDocuments(splitDocs, embeddings);
  // console.log("vectorStore", vectorStore);
  return true;
}

export async function askLLM(question) {
  const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
  const result = await chain.call({
    query: question,
  });
  return result;
}

export async function getTranscript(videoURL) {
  try {
    let transcript = "";
    const transcriptChunks = await YoutubeTranscript.fetchTranscript(videoURL);
    if (transcriptChunks.length > 0) {
      for (let chunk of transcriptChunks) {
        transcript += " " + chunk.text;
      }
    }
    // console.log("transcript", transcript.length, transcript);
    return transcript;
  } catch (error) {
    return "";
  }
}
