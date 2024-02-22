# TubeScan: Rapid Info Retrieval

## Overview

This project is a Node.js application designed to interact with YouTube videos, providing users with the ability to ask questions about the content of a video and receive answers generated by an AI model. The application leverages advanced natural language processing techniques to understand and respond to user queries, making it a powerful tool for video analysis and content exploration.

## Features

- **Video Transcript Retrieval**: The application can fetch the transcript of a YouTube video, enabling it to understand the content of the video.
- **Embedding Generation**: It generates embeddings from the video transcript, which are used to represent the video content in a format that can be processed by the AI model.
- **AI-Generated Responses**: Users can ask questions about the video, and the application will generate responses based on the video's content.
- **User Interaction**: The application supports interactive user input, allowing users to ask questions and receive responses in real-time.

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm (v6.0.0 or later)
- An OpenAI API Key

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/afshinjal/tubescan.git
   ```
2. Navigate to the project directory:
   ```
   cd tubescan
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Create `.env` file
   ```
   cp .env.samle .env
   ```
   
5. Set your own OpenAI API key.
   
### Running the Application

To start the application, run the following command in the terminal:

```
npm start
```

The application will prompt you to enter a YouTube video URL. After adding a video, you can ask questions about the video, and the application will provide answers based on the video's content.

## Usage

After starting the application, follow the on-screen prompts to add a YouTube video and ask questions about it. The application will process your questions and generate responses based on the video's content.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue if you find a bug or have a feature request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or need further assistance, please contact the project maintainer at afshnjalili@gmail.com.