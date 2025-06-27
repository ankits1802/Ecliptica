
import type { LucideIcon } from 'lucide-react';
import { Code, Cpu, Database, Cloud, BarChart3, BrainCircuit, FileText, DatabaseZap, Workflow, Laptop, Users, Package, Layers, Settings2, LayoutPanelLeft, Server, PenTool, PieChart, TestTubeDiagonal, Share2 } from 'lucide-react'; // Added TestTubeDiagonal, Share2

export type SkillCategory = {
  name: string;
  icon: LucideIcon;
  skills: Skill[];
};

export type Skill = {
  name: string;
  level?: 'Expert' | 'Advanced' | 'Proficient' | 'Intermediate' | 'Familiar';
  description?: string;
  logoUrl?: string;
};

export const skillsData: SkillCategory[] = [
  {
    name: "Programming Languages",
    icon: Code,
    skills: [
      { name: "Python", level: 'Expert', description: 'Core language for AI/ML, data science, and backend scripting.', logoUrl: '/Logos/Python.svg' },
      { name: "Java", level: 'Intermediate', description: 'Enterprise application development and Android apps.', logoUrl: '/Logos/java.svg' },
      { name: "C", level: 'Proficient', description: 'Low-level programming for performance-critical applications.', logoUrl: '/Logos/C.svg' },
      { name: "C++", level: 'Proficient', description: 'Used in systems programming and high-performance computing.', logoUrl: '/Logos/C++.svg' },
      { name: "Bash", level: 'Proficient', description: 'Shell scripting for automation and system administration.', logoUrl: '/Logos/bash.svg' },
      { name: "Kotlin", level: 'Familiar', description: 'Modern language for Android development and JVM applications.', logoUrl: '/Logos/kotlin.svg' },
      { name: "MATLAB", level: 'Proficient', description: 'Numerical computing and algorithm prototyping.', logoUrl: '/Logos/matlab.svg' },
      { name: "R", level: 'Intermediate', description: 'Statistical computing and data analysis.', logoUrl: '/Logos/R.svg' },
      { name: "SQL", level: 'Advanced', description: 'Standard language for managing and querying relational databases.', logoUrl: '/Logos/sql.svg' },
    ],
  },
  {
    name: "Frontend Development",
    icon: LayoutPanelLeft,
    skills: [
      { name: "HTML", level: 'Expert', description: 'Standard markup language for creating web pages.', logoUrl: '/Logos/html.svg' },
      { name: "CSS", level: 'Expert', description: 'Style sheet language for describing the presentation of web pages.', logoUrl: '/Logos/css.svg' },
      { name: "JavaScript", level: 'Expert', description: 'Core language for web interactivity and frontend logic.', logoUrl: '/Logos/javascript.svg' },
      { name: "TypeScript", level: 'Advanced', description: 'Superset of JavaScript adding static type definitions.', logoUrl: '/Logos/typescript.svg' },
      { name: "React", level: 'Advanced', description: 'Popular library for building user interfaces.', logoUrl: '/Logos/react.svg' },
      { name: "Next.js", level: 'Advanced', description: 'React framework for production: SSR, SSG, API routes.', logoUrl: '/Logos/next.js.svg' },
      { name: "Tailwind CSS", level: 'Proficient', description: 'Utility-first CSS framework for rapid UI development.', logoUrl: '/Logos/Tailwind CSS.svg' },
      { name: "D3.js", level: 'Intermediate', description: 'JavaScript library for producing dynamic, interactive data visualizations in web browsers.', logoUrl: '/Logos/D3.js.svg'},
      { name: "Streamlit", level: 'Intermediate', description: 'Python library for creating web apps for machine learning and data science.', logoUrl: '/Logos/Streamlit.svg'},
      { name: "Responsive Design", level: 'Expert', description: 'Ensuring applications work well on all device sizes.' },
      { name: "State Management (Redux, Zustand)", level: 'Intermediate', description: 'Managing complex application state.', logoUrl: '/Logos/redux.svg' },
      { name: "UI/UX Principles", level: 'Proficient', description: 'Understanding user experience and interface design best practices.' },
      { name: "Web Performance Optimization", level: 'Intermediate', description: 'Techniques for faster loading and smoother web experiences.' },
      { name: "Browser Developer Tools", level: 'Advanced', description: 'Debugging and inspecting web applications.' },
    ],
  },
  {
    name: "Backend Development & Databases",
    icon: Server,
    skills: [
      { name: "Node.js", level: 'Advanced', description: 'JavaScript runtime for server-side development.', logoUrl: '/Logos/node-js.svg' },
      { name: "Express.js", level: 'Advanced', description: 'Web application framework for Node.js.', logoUrl: '/Logos/Express.svg' },
      { name: "FastAPI", level: 'Advanced', description: 'Modern, fast web framework for building APIs with Python.', logoUrl: '/Logos/FastAPI.svg' },
      { name: "Flask", level: 'Proficient', description: 'Micro web framework for Python.', logoUrl: '/Logos/flask.svg' },
      { name: "Spring Boot", level: 'Intermediate', description: 'Using Java with Spring Boot for enterprise-level backend services.', logoUrl: '/Logos/spring-boot.svg' },
      { name: "Gunicorn", level: 'Proficient', description: 'Python WSGI HTTP Server for UNIX.', logoUrl: '/Logos/gunicorn.svg' },
      { name: "uWSGI", level: 'Intermediate', description: 'Application server for deploying Python web applications.', logoUrl: '/Logos/uWSGI.svg' },
      { name: "REST APIs", level: 'Expert', description: 'Designing, building, and consuming RESTful web services.' },
      { name: "GraphQL", level: 'Intermediate', description: 'Query language for APIs and server-side runtime.', logoUrl: '/Logos/graphql.svg' },
      { name: "Microservices Architecture", level: 'Proficient', description: 'Designing systems as a suite of independently deployable services.' },
      { name: "Serverless (AWS Lambda, Firebase Functions)", level: 'Proficient', description: 'Building and deploying backend logic without managing servers.', logoUrl: '/Logos/AWS.svg' },
      { name: "Authentication & Authorization", level: 'Advanced', description: 'Implementing secure user authentication (OAuth, JWT) and access control.', logoUrl: '/Logos/authentication.svg' },
      { name: "MySQL", level: 'Advanced', description: 'Popular open-source relational database.', logoUrl: '/Logos/MySQL.svg' },
      { name: "PostgreSQL", level: 'Advanced', description: 'Powerful, open-source object-relational database system.', logoUrl: '/Logos/PostgresSQL.svg' },
      { name: "SQLite", level: 'Proficient', description: 'Self-contained, serverless, zero-configuration, transactional SQL database engine.', logoUrl: '/Logos/SQLite.svg' },
      { name: "Microsoft SQL Server", level: 'Intermediate', description: 'Relational database management system developed by Microsoft.', logoUrl: '/Logos/Microsoft SQL Server.svg' },
      { name: "MongoDB", level: 'Intermediate', description: 'Popular NoSQL document database.', logoUrl: '/Logos/Mongodb.svg' },
      { name: "Firebase (Firestore, Realtime DB)", level: 'Intermediate', description: 'NoSQL cloud databases provided by Google.', logoUrl: '/Logos/firebase.svg' },
      { name: "Cosmos DB (Azure)", level: 'Intermediate', description: 'Microsoft\'s globally distributed, multi-model database service.', logoUrl: '/Logos/Azure.svg' },
      { name: "Redis", level: 'Intermediate', description: 'In-memory data structure store, used as a database, cache, and message broker.', logoUrl: '/Logos/redis.svg' },
      { name: "Apache Kafka", level: 'Intermediate', description: 'Distributed event streaming platform.', logoUrl: '/Logos/Kafka.svg' },
    ],
  },
  {
    name: "AI & ML Frameworks",
    icon: BrainCircuit,
    skills: [
      { name: "PyTorch", level: 'Expert', description: 'Primary deep learning framework for research and production.', logoUrl: '/Logos/PyTorch.svg' },
      { name: "TensorFlow", level: 'Advanced', description: 'Widely used deep learning framework with Keras API.', logoUrl: '/Logos/TensorFlow.svg' },
      { name: "Keras", level: 'Advanced', description: 'High-level API for TensorFlow and other backends.', logoUrl: '/Logos/Keras.svg' },
      { name: "Scikit-learn", level: 'Expert', description: 'Essential library for classical machine learning algorithms.', logoUrl: '/Logos/scikit-learn.svg' },
      { name: "Hugging Face Transformers", level: 'Advanced', description: 'Ecosystem for state-of-the-art NLP models, datasets, and tokenizers.', logoUrl: '/Logos/HuggingFace.svg' },
      { name: "Hugging Face Diffusers", level: 'Proficient', description: 'Library for state-of-the-art diffusion models.', logoUrl: '/Logos/HuggingFace.svg' },
      { name: "ONNX", level: 'Proficient', description: 'Open format for machine learning model interoperability.', logoUrl: '/Logos/onnx.svg' },
      { name: "TorchScript", level: 'Intermediate', description: 'A way to create serializable and optimizable models from PyTorch code.' , logoUrl: '/Logos/PyTorch.svg' },
      { name: "LangChain", level: 'Proficient', description: 'Framework for developing applications powered by LLMs.', logoUrl: '/Logos/Langchain.svg' },
      { name: "LangSmith", level: 'Intermediate', description: 'Debugging and monitoring for LangChain applications.', logoUrl: '/Logos/LangSmith.svg' },
      { name: "LlamaIndex", level: 'Intermediate', description: 'Data framework for LLM applications, focusing on RAG.', logoUrl: '/Logos/LlamaIndex.svg' },
      { name: "AutoGen", level: 'Familiar', description: 'Framework for building multi-agent conversational applications.', logoUrl: '/Logos/autogen.svg' },
      { name: "Semantic Kernel", level: 'Familiar', description: 'Microsoft SDK for integrating LLMs with conventional code.', logoUrl: '/Logos/Semantic Kernel.png' },
      { name: "Genkit", level: 'Proficient', description: 'Firebase Genkit for building AI-powered features in apps.', logoUrl: '/Logos/genkit.svg' }, // Genkit logo is too large (7MB)
      { name: "LLaMA", level: 'Familiar', description: 'Family of large language models by Meta AI, ranging from 7B to 65B parameters, focused on efficient inference.', logoUrl: '/Logos/tinyllama.svg'},
      { name: "BERT", level: 'Advanced', description: 'Bidirectional Encoder Representations from Transformers.', logoUrl: '/Logos/HuggingFace.svg'},
      { name: "Ollama", level: 'Familiar', description: 'Run LLMs locally using various open-source models.', logoUrl: '/Logos/ollama.svg' },
    ],
  },
  
  {
    name: "Data Science & Numerical Computing",
    icon: BarChart3,
    skills: [
      { name: "Pandas", level: 'Expert', description: 'Data manipulation and analysis library for Python.', logoUrl: '/Logos/Pandas.svg' },
      { name: "NumPy", level: 'Expert', description: 'Fundamental package for numerical computation in Python.', logoUrl: '/Logos/NumPy.svg' },
      { name: "Statsmodels", level: 'Intermediate', description: 'Python module for statistics, econometrics, and statistical modeling.', logoUrl: '/Logos/statsmodels.svg'},
      { name: "Feature Engineering", level: 'Advanced', description: 'Creating and selecting relevant features for ML models.' },
      { name: "Data Preprocessing", level: 'Expert', description: 'Cleaning, transforming, and preparing data for ML.' },
      { name: "Cross-Validation", level: 'Advanced', description: 'Techniques for assessing how ML model results will generalize.' },
      { name: "Hyperparameter Tuning", level: 'Advanced', description: 'Optimizing model parameters for best performance.' },
      { name: "Time Series Analysis (ARIMA, LSTM)", level: 'Proficient', description: 'Analyzing time-ordered data points.' },
    ],
  },
  {
    name: "Document, Image & Audio Processing",
    icon: FileText,
    skills: [
      { name: "OpenCV", level: 'Advanced', description: 'Computer vision library for image and video analysis.', logoUrl: '/Logos/OpenCV.svg' },
      { name: "Pillow (PIL)", level: 'Advanced', description: 'Python Imaging Library for image manipulation.', logoUrl: '/Logos/pillow.svg' },
      { name: "PyPDF", level: 'Proficient', description: 'Python library for working with PDF files.', logoUrl: '/Logos/pillow.svg' },
      { name: "PyOCR", level: 'Intermediate', description: 'Python wrapper for OCR engines like Tesseract.', logoUrl: '/Logos/pillow.svg' },
      { name: "Tesseract OCR", level: 'Proficient', description: 'Optical Character Recognition engine.', logoUrl: '/Logos/pillow.svg' },
      { name: "MediaPipe", level: 'Proficient', description: 'Google\'s framework for building multimodal applied ML pipelines.', logoUrl: '/Logos/mediapipe.svg' },
      { name: "gTTS (Google Text-to-Speech)", level: 'Proficient', description: 'Python library and CLI tool to interface with Google Translate\'s text-to-speech API.', logoUrl: '/Logos/Google.svg' },
      { name: "Music21", level: 'Intermediate', description: 'Python-based toolkit for computer-aided musicology.' },
      { name: "h5py", level: 'Intermediate', description: 'Pythonic interface to the HDF5 binary data format.' },
      { name: "SentencePiece", level: 'Intermediate', description: 'Unsupervised text tokenizer and detokenizer.', logoUrl: '/Logos/Google.svg' },
    ],
  },
  {
    name: "Vector Search & RAG Ecosystem",
    icon: DatabaseZap,
    skills: [
      { name: "FAISS", level: 'Proficient', description: 'Library for efficient similarity search and clustering of dense vectors.', logoUrl: '/Logos/faiss.svg' },
      { name: "Chroma DB", level: 'Intermediate', description: 'Open-source embedding database for LLM applications.', logoUrl: '/Logos/chromadb.svg' },
      { name: "Pinecone", level: 'Intermediate', description: 'Managed vector database for high-performance similarity search.', logoUrl: '/Logos/pinecone.svg' },
      { name: "Qdrant", level: 'Familiar', description: 'Vector similarity search engine and database.', logoUrl: '/Logos/Qdrant.svg' },
      { name: "Milvus", level: 'Familiar', description: 'Open-source vector database for embedding similarity search.', logoUrl: '/Logos/Milvus.svg' },
      { name: "Azure AI Search", level: 'Proficient', description: 'Cloud search service with vector search capabilities.', logoUrl: '/Logos/Azure.svg' },
      { name: "RAG (Retrieval-Augmented Generation)", level: 'Advanced', description: 'Designing and implementing Retrieval-Augmented Generation systems.' },
      { name: "BM25", level: 'Proficient', description: 'Ranking function used by search engines to estimate relevance of documents.' },
      { name: "LoRA / QLoRA", level: 'Proficient', description: 'Techniques for efficient fine-tuning of large language models.', logoUrl: '/Logos/HuggingFace.svg' },
      { name: "Embedding Techniques", level: 'Expert', description: 'Creating and utilizing vector embeddings for various data types.' },
      { name: "Prompt Engineering", level: 'Advanced', description: 'Crafting effective prompts for large language models.' },
      { name: "Agentic AI", level: 'Intermediate', description: 'Developing AI agents that can reason and take actions.' },
    ],
  },
  {
    name: "Cloud & DevOps",
    icon: Cloud,
    skills: [
      { name: "Microsoft Azure", level: 'Advanced', description: 'Microsoft Azure cloud platform services (AI Studio, AI Search, Cosmos DB, ML).', logoUrl: '/Logos/Azure.svg' },
      { name: "Amazon Web Services (AWS)", level: 'Advanced', description: 'Amazon Web Services cloud platform (Sagemaker, EC2, S3, Lambda).', logoUrl: '/Logos/AWS.svg' },
      { name: "Google Cloud Platform (GCP)", level: 'Proficient', description: 'Google Cloud services for computing and AI.', logoUrl: '/Logos/Google Cloud.svg' },
      { name: "Docker", level: 'Advanced', description: 'Containerization platform for packaging and deploying applications.', logoUrl: '/Logos/Docker.svg' },
      { name: "Kubernetes", level: 'Intermediate', description: 'Container orchestration system.', logoUrl: '/Logos/Kubernetes.svg' },
      { name: "Nginx", level: 'Proficient', description: 'Web server, reverse proxy, and load balancer.', logoUrl: '/Logos/NGINX.svg' },
      { name: "Git & GitHub", level: 'Expert', description: 'Version control system and hosting service.', logoUrl: '/Logos/GitHub.svg' },
      { name: "Terraform", level: 'Intermediate', description: 'Infrastructure as Code software tool.', logoUrl: '/Logos/Terraform.svg' },
      { name: "CUDA", level: 'Proficient', description: 'Parallel computing platform and API model created by Nvidia.', logoUrl: '/Logos/Nvidia.svg' },
      { name: "DeepStream", level: 'Familiar', description: 'NVIDIA SDK for building AI-powered video analytics applications.', logoUrl: '/Logos/Nvidia.svg' },
      { name: "Vercel", level: 'Proficient', description: 'Platform for frontend cloud deployment and hosting.', logoUrl: '/Logos/vercel.svg' },
    ],
  },
  {
    name: "Data Engineering & Automation",
    icon: Workflow,
    skills: [
      { name: "Apache Airflow", level: 'Intermediate', description: 'Platform to programmatically author, schedule, and monitor workflows.', logoUrl: '/Logos/airflow.svg' },
      { name: "ETL Pipelines", level: 'Advanced', description: 'Extract, Transform, Load processes for data integration.' },
      { name: "Multimodal Workflow Automation", level: 'Intermediate', description: 'Automating complex workflows involving different data types.' },
    ],
  },
  {
    name: "MLOps & Model Management",
    icon: Settings2,
    skills: [
        { name: "MLflow", level: 'Proficient', description: 'Open-source platform for the ML lifecycle.', logoUrl: '/Logos/mlflow.svg' },
        { name: "Kubeflow", level: 'Intermediate', description: 'ML toolkit for Kubernetes.', logoUrl: '/Logos/Kubernetes.svg' }, // Using Kubernetes as proxy if no Kubeflow logo
        { name: "DVC (Data Version Control)", level: 'Intermediate', description: 'Versioning for data and models.' }, // Add DVC logo if available
        { name: "CI/CD for ML", level: 'Proficient', description: 'Continuous Integration/Delivery for ML pipelines.' },
        { name: "Model Monitoring", level: 'Advanced', description: 'Tracking model performance and drift in production.' },
        { name: "LLMOps", level: 'Intermediate', description: 'Operationalizing Large Language Model applications.'},
        { name: "Weights & Biases", level: 'Proficient', description: 'Experiment tracking, dataset versioning, and model management.'}, // Add W&B logo if available
    ],
  },
  {
    name: "Benchmarking & Evaluation",
    icon: TestTubeDiagonal,
    skills: [
        { name: "TruthfulQA", level: 'Familiar', description: 'Benchmark for measuring truthfulness of language models.' },
        { name: "BIG-bench", level: 'Familiar', description: 'Collaborative benchmark for language models.' },
        { name: "BLEU Score", level: 'Proficient', description: 'Metric for evaluating machine translation quality.' },
        { name: "METEOR Score", level: 'Proficient', description: 'Metric for machine translation evaluation based on explicit word-to-word matches.'},
        { name: "FID (Fréchet Inception Distance)", level: 'Intermediate', description: 'Metric for evaluating the quality of generated images.'},
        { name: "CLIPScore", level: 'Intermediate', description: 'Metric for evaluating image-text similarity.'},
    ],
  },
  {
    name: "Visualization & Reporting",
    icon: PieChart,
    skills: [
      { name: "Matplotlib", level: 'Advanced', description: 'Python plotting library for static, animated, and interactive visualizations.', logoUrl: '/Logos/Matplotlib.svg' },
      { name: "Seaborn", level: 'Advanced', description: 'Statistical data visualization library based on Matplotlib.', logoUrl: '/Logos/seaborn.svg' },
      { name: "Power BI", level: 'Proficient', description: 'Business analytics service by Microsoft.', logoUrl: '/Logos/Microsoft Power BI.svg' },
      { name: "Tableau", level: 'Intermediate', description: 'Interactive data visualization software.', logoUrl: '/Logos/Tableau.svg' },
      { name: "Jupyter Notebooks", level: 'Expert', description: 'Web-based interactive computing for data analysis and ML.', logoUrl: '/Logos/Jupyter.svg' },
    ],
  },
  {
    name: "Operating Systems",
    icon: Laptop,
    skills: [
      { name: "Windows", level: 'Expert', description: 'Microsoft Windows operating system family.', logoUrl: '/Logos/Windows 11.svg' },
      { name: "Linux (Ubuntu, Arch, Debian)", level: 'Advanced', description: 'Various distributions of the Linux operating system for servers and development.', logoUrl: '/Logos/linux.svg' },
    ],
  },
  {
    name: "Soft Skills & Other Tools",
    icon: Users,
    skills: [
      { name: "Product Management", level: 'Intermediate', description: 'Understanding product lifecycle, user needs, and market strategy.' },
      { name: "Financial Analysis", level: 'Familiar', description: 'Basic understanding of financial principles and data interpretation.' },
      { name: "Consulting", level: 'Intermediate', description: 'Providing expert advice, problem-solving, and strategic solutions.' },
      { name: "Technical Writing", level: 'Advanced', description: 'Creating clear, concise documentation, reports, and articles.' },
      { name: "LaTeX", level: 'Proficient', description: 'Document preparation system for high-quality typesetting.', logoUrl: '/Logos/LaTeX.svg' },
      { name: "Team Leadership", level: 'Proficient', description: 'Guiding, motivating, and coordinating teams to achieve goals.' },
      { name: "Agile Methodologies", level: 'Proficient', description: 'Iterative development and project management (Scrum, Kanban).' },
      { name: "Problem Solving", level: 'Expert', description: 'Analytical and critical thinking to identify and resolve complex issues.' },
      { name: "Communication", level: 'Expert', description: 'Effectively conveying technical and non-technical information.' },
    ],
  },
];


    