# SynthAI

**SynthAI** is a cutting-edge AI-powered platform that integrates multiple functionalities, including:

- AI conversational capabilities.
- Summarization from YouTube transcripts.
- Retrieval-Augmented Generation (RAG) applications with enhanced self-reflection capabilities, enabling correction of poor-quality retrievals or generations.
- Integration with **Notion**, supporting RAG for pages and databases.
- Dynamic UI generation with real-time data streaming.


Built with **Next.js** and **LangChain**, SynthAI demonstrates the power of modern web frameworks and AI tools working seamlessly together.

---

## Features

### 1. AI Chat
An intelligent chatbot that provides contextual, meaningful, and interactive conversations using advanced AI language models.

### 2. YouTube Transcript Summarization
Extracts and summarizes key points from YouTube video transcripts, providing concise and accessible insights.

### 3. RAG Application
Harnesses retrieval-augmented generation (RAG) for advanced search and question-answering capabilities with custom datasets. Includes self-reflection mechanisms for improving retrieval quality and generation accuracy.

### 4. Notion Integration
Seamlessly integrates with Notion, enabling RAG for pages and databases to streamline workflows and enhance productivity.

### 5. Dynamic UI with Data Streaming
Generates user interfaces dynamically, featuring real-time data streaming for interactive and responsive visualizations.

---

## Tech Stack

- **Framework**: Next.js
- **AI Framework**: LangChain
- **Language Model**: OpenAI GPT (GPT-4o Mini/Standard)
- **Data Handling**: MongoDB / Vector Databases (for RAG)
- **API Integration**: Notion API, YouTube Data API (for transcript loading)
- **Styling**: Tailwind CSS, Shadcn UI
- **State Management**: Langgraph (leveraging graph-based state management)

---

## Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ganimalqudhaifi/synthai.git
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
   NOTION_INTEGRATION_TOKEN=your_weather_api_key
   MONGODB_ATLAS_URI=your_mongodb_url
   MONGODB_ATLAS_DB_NAME=your_mongodb_database_name
   MONGODB_ATLAS_COLLECTION_NAME=your_mongodb_collection_name
   ```

4. **Run the development server**:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Usage

1. **AI Chat**:
   - Engage with the intelligent chatbot directly on the homepage for contextual and interactive conversations.

2. **YouTube Summarization**:
   - Provide a YouTube video URL, and the platform will extract and summarize the key points from the transcript.

3. **RAG Application**:
   - Upload a custom dataset or connect to external sources, then ask domain-specific questions. The RAG system includes self-reflection to improve the accuracy of retrievals and responses.

4. **Notion Integration**:
   - Connect your Notion workspace to perform RAG on pages and databases, enhancing your workflow and productivity.

5. **Dynamic UI with Data Streaming**:
   - Visualize real-time data dynamically through an intuitive and responsive user interface.

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
- **Email**: ganimalqudhaifi@gmail.com
- **GitHub**: [ganimalqudhaifi](https://github.com/ganimalqudhaifi)
