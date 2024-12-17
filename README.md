# SynthAI

**SynthAI** is a cutting-edge AI-powered platform that integrates multiple functionalities, including:

- AI conversational capabilities.
- Summarization from YouTube transcripts.
- Retrieval-Augmented Generation (RAG) applications.
- Weather prediction and analysis.

Built with **Next.js** and **LangChain**, SynthAI demonstrates the power of modern web frameworks and AI tools working seamlessly together.

---

## Features

### 1. AI Chat
An intelligent chatbot that provides contextual, meaningful, and interactive conversations using advanced AI language models.

### 2. YouTube Transcript Summarization
Extract and summarize key points from YouTube video transcripts, making content more accessible and concise.

### 3. RAG Application
Utilizes retrieval-augmented generation for advanced search and question-answering capabilities with custom datasets.

### 4. Weather Prediction
Leverages external APIs to predict weather conditions with user-friendly visualizations.

---

## Tech Stack

- **Framework**: Next.js
- **AI Framework**: LangChain
- **Language Model**: OpenAI GPT (GPT-4 Turbo/Standard)
- **Data Handling**: Pinecone / Vector Databases (for RAG)
- **API Integration**: OpenWeatherMap API, YouTube Data API
- **Styling**: Tailwind CSS
- **State Management**: Zustand / Redux

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/your-username/synthai.git
   cd synthai
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env.local` file in the root directory and configure the following:
   ```plaintext
   OPENAI_API_KEY=your_openai_api_key
   WEATHER_API_KEY=your_weather_api_key
   NEXT_PUBLIC_YOUTUBE_API_KEY=your_youtube_api_key
   PINECONE_API_KEY=your_pinecone_api_key
   PINECONE_ENVIRONMENT=your_pinecone_environment
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

1. **AI Chat**:
   - Interact with the chatbot on the homepage.

2. **YouTube Summarization**:
   - Input the YouTube video URL to generate a concise summary.

3. **RAG Application**:
   - Upload or point to a dataset and ask domain-specific questions.

4. **Weather Prediction**:
   - Enter a city or region to receive weather forecasts.

---

## Contribution

We welcome contributions! To contribute:

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature-name`.
3. Commit your changes: `git commit -m "Add feature"`.
4. Push to the branch: `git push origin feature-name`.
5. Open a Pull Request.

---

## License

This project is licensed under the [MIT License](LICENSE).

---

## Contact

For questions or collaboration, reach out at: 
- **Email**: your-email@example.com
- **GitHub**: [your-username](https://github.com/your-username)
