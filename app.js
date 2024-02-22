import { stdin as input, stdout as output } from "node:process";
import { createInterface } from "node:readline/promises";
import chalk from "chalk";
import { getTranscript, generateEmbeddings, askLLM } from "./rag.js";

const readline = createInterface({ input, output });

async function addVideo(videoURL) {
  if (videoURL === "") {
    videoURL = await readline.question(
      chalk.green("AI: Please send the youtube video URL") +
        chalk.blue("\nUser: ")
    );
  }

  const transcript = await getTranscript(videoURL);
  if (transcript === "") {
    console.info(
      chalk.red(
        "\nAPP: the application was unable to retrieve the video transcript, please try again\n"
      )
    );
    return false;
  }

  const wasEmbeddingGenerated = await generateEmbeddings(transcript);
  if (!wasEmbeddingGenerated) {
    console.info(
      chalk.red(
        "\nAPP: the application was unable to generate embeddings, please try again\n"
      )
    );
    return false;
  }
  return true;
}

async function main() {
  const wasVideoAdded = await addVideo("");
  if (!wasVideoAdded) {
    return;
  }
  let userInput = await readline.question(
    chalk.green("AI: Ask anything about the Youtube video.") +
      chalk.blue("\nUser: ")
  );
  while (userInput !== ".exit") {
    try {
      if (userInput.includes("https://www.youtube")) {
        const videoURL = userInput;
        const wasVideoAdded = await addVideo(videoURL);
        if (!wasVideoAdded) {
          return;
        }
        userInput = await readline.question(
          chalk.green("AI: Ask anything about the Youtube video.") +
            chalk.blue("\nUser: ")
        );
      }
      const llmResponse = await askLLM(userInput);
      if (llmResponse) {
        userInput = await readline.question(
          chalk.green("\nAI: " + llmResponse.text) + chalk.blue("\nUser: ")
        );
      } else {
        userInput = await readline.question(
          chalk.blue("\nAPP: No response, try asking again") +
            chalk.blue("\nUser: ")
        );
      }
    } catch (error) {
      console.error(chalk.red(error.message));
      return;
    }
  }
}
await main();
readline.close();
