// data/project.ts
export type Project = {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  dataAiHint: string;
  tags: string[]; // Technologies, frameworks
  generalDetails: string;
  toolsAndMethods: string[];
  results: string;
  learnings: string;
  liveDemoUrl?: string;
  repoUrl?: string;
  caseStudyBlogSlug?: string; // Slug for the blog post acting as a case study
  timeline?: string;
  status?: 'completed' | 'ongoing' | 'archived';
  metrics?: ProjectMetrics;
};

export interface ProjectMetrics {
  accuracyImprovement?: string;
  performanceGains?: string;
  costReduction?: string;
  datasetSize?: string;
  modelParameters?: string;
  trainingTime?: string;
  inferenceLatency?: string;
}

// data/projects.ts
export const projectsData: Project[] = [
  {
    id: "project-autosql",
    title: "AutoSQL: Text-to-SQL Query Generation",
    description: "Fine-tuned LLM with RAG for Complex SQL Queries over Large Databases",
    imageUrl: "/images/SQLEditor.png",
    dataAiHint: "sql generation ai llm rag",
    timeline: "Aug. 2024 – May 2025",
    status: "ongoing",
    tags: [
      "Python", "PyTorch", "Transformers", "deepseek-instruct-coder", 
      "LoRA", "QLoRA", "RAG", "FAISS", "BM25", "FastAPI", "ONNX", 
      "TorchScript", "SQL", "NumPy", "SentencePiece", "MLflow"
    ],
    generalDetails: `This cutting-edge project focuses on fine-tuning a massive 6.7B parameter deepseek-instruct-coder model using advanced parameter-efficient techniques like LoRA (Low-Rank Adaptation) and QLoRA (Quantized LoRA) adapters. The primary objective is to generate accurate and complex SQL queries from natural language descriptions over the comprehensive Spider dataset containing 10,181 diverse samples. The project represents a significant advancement in bridging the gap between natural language understanding and structured query language generation, making database interactions more accessible to non-technical users while maintaining high accuracy and performance standards.`,
    
    toolsAndMethods: [
      "Fine-tuned a 6.7B parameter deepseek-instruct-coder model using LoRA and QLoRA adapters for parameter-efficient training",
      "Implemented sophisticated RAG (Retrieval-Augmented Generation) architecture with multi-hop retrieval capabilities",
      "Combined dense embeddings using FAISS (Facebook AI Similarity Search) with sparse BM25 retrieval for comprehensive context understanding",
      "Applied advanced data augmentation techniques and synthetic query generation to expand the training dataset by 45%",
      "Integrated a self-refining loop mechanism for iterative query validation and correction, enhancing SQL syntax accuracy",
      "Optimized a complex 32-layer transformer architecture with 2048-dimensional embeddings and 10 attention heads",
      "Deployed the model as a production-ready FastAPI service with interactive SQL editor featuring syntax highlighting",
      "Implemented ONNX quantization and TorchScript optimization for efficient inference and reduced computational costs",
      "Executed comprehensive training regime with 20 epochs using AdamW optimizer at 2e-5 learning rate",
      "Incorporated robust SQL validation and error correction mechanisms for improved query execution success",
      "Applied MLOps best practices using MLflow for continuous model evaluation, monitoring, and automated retraining pipelines",
      "Developed dynamic learning rate scheduling and gradient clipping for stable training convergence"
    ],
    
    results: `The project achieved remarkable performance improvements across multiple evaluation metrics. The fine-tuned model demonstrated a substantial 23% accuracy boost on complex SQL queries compared to baseline models, while the RAG implementation led to a 31% improvement in query precision through enhanced context retrieval. Data augmentation strategies successfully increased the effective dataset size by 45%, significantly improving model generalization capabilities. The self-refining loop mechanism reduced syntax errors by 19% through iterative validation and correction processes. Performance optimizations resulted in a 15% improvement in inference latency through quantization and pruning techniques, while inference costs were reduced by 35% using ONNX quantization and TorchScript compilation. The training process achieved an 11% reduction in loss through dynamic learning rate scheduling, and SQL validation mechanisms increased execution accuracy by 27% on benchmark queries. The deployed FastAPI service provides real-time query generation with comprehensive features including query history, execution time visualization, and interactive debugging capabilities.`,
    
    learnings: `This project provided invaluable insights into advanced LLM fine-tuning methodologies, particularly the effective application of parameter-efficient techniques like LoRA and QLoRA for large-scale model adaptation. The implementation of RAG architectures revealed the critical importance of combining multiple retrieval strategies for optimal context understanding in domain-specific applications. The experience highlighted the challenges and solutions in deploying large language models in production environments, including optimization strategies for inference speed and cost reduction. The project also emphasized the significance of continuous evaluation and monitoring in LLMOps workflows, demonstrating how automated retraining pipelines can maintain and improve model performance over time. Additionally, the integration of self-refining mechanisms showcased the potential for iterative improvement in AI-generated outputs, particularly in structured domains like SQL where syntax accuracy is paramount.`,
    
    repoUrl: "https://github.com/ankits1802/AutoSQL",
    liveDemoUrl: "https://ankits1802-autosql.vercel.app/",
    caseStudyBlogSlug: "case-study-autosql-text-to-sql-generation",
    
    metrics: {
      accuracyImprovement: "23% boost on complex SQL queries",
      performanceGains: "15% inference latency improvement, 35% cost reduction",
      datasetSize: "10,181 samples from Spider dataset, expanded by 45%",
      modelParameters: "6.7B parameter deepseek-instruct-coder model",
      trainingTime: "20 epochs with AdamW optimizer"
    }
  },

  {
    id: "project-translingua",
    title: "TransLingua: English-To-French Machine Translation",
    description: "End-to-End Machine Translation System with a Transformer Model",
    imageUrl: "/images/Translingua.png",
    dataAiHint: "translation language transformer nlp",
    timeline: "Apr. 2024 - Aug. 2024",
    status: "completed",
    tags: [
      "Python", "PyTorch", "Transformers", "HuggingFace", "BERT", "CUDA", 
      "FastAPI", "React", "TypeScript", "Firebase", "Pandas", "NumPy", "Scikit-learn"
    ],
    
    generalDetails: `TransLingua represents a comprehensive end-to-end machine translation system specifically designed for English-to-French translation tasks. The project encompasses the entire machine learning pipeline from data preprocessing and model architecture design to deployment and user interface development. Built on the robust Transformer architecture, the system processes and learns from over 250,000 English-French sentence pairs from the renowned Tatoeba dataset, ensuring diverse linguistic coverage and high-quality translations. The project demonstrates expertise in modern NLP techniques, full-stack development, and production deployment strategies, creating a seamless user experience for real-time translation services.`,
    
    toolsAndMethods: [
      "Designed and implemented a sophisticated Transformer-based machine translation model optimized for English-to-French conversion",
      "Processed and preprocessed 250K+ English-French sentence pairs from the comprehensive Tatoeba dataset",
      "Utilized HuggingFace BERT tokenizer for advanced text segmentation and improved tokenization accuracy",
      "Configured a robust 6-layer, 8-head attention Transformer architecture with 84M+ parameters and 512-dimensional embeddings",
      "Implemented advanced decoding techniques including beam search, positional encoding, and masked self-attention mechanisms",
      "Trained the model using Adam optimizer with cross-entropy loss function and carefully tuned 0.0001 learning rate",
      "Optimized training performance with CUDA GPU acceleration, achieving significant computational efficiency gains",
      "Developed a high-performance FastAPI backend with RESTful API architecture for model serving",
      "Implemented asynchronous processing capabilities to handle concurrent translation requests efficiently",
      "Integrated Firebase authentication system for secure user management and API access control",
      "Designed and built a modern React frontend using TypeScript for type-safe development",
      "Created an intuitive chat-like user interface with real-time feedback and comprehensive error handling",
      "Implemented protected routes and session-based authentication for secure user access",
      "Developed comprehensive analytics dashboard for performance monitoring and user engagement tracking",
      "Integrated logging and monitoring systems using FastAPI middleware for operational insights"
    ],
    
    results: `The TransLingua system achieved exceptional performance metrics that demonstrate its effectiveness as a production-ready translation solution. The model attained a high BLEU score of 29.7 and METEOR score of 33 on validation data, indicating superior translation quality and fluency. CUDA optimization resulted in a remarkable 40% reduction in training time while enabling real-time inference capabilities for immediate user feedback. The FastAPI backend ensures efficient, low-latency translation processing with robust scalability for handling multiple concurrent requests. The React TypeScript frontend provides an engaging user experience with modern UI/UX design principles, while Firebase integration ensures secure and reliable user authentication. The analytics dashboard offers valuable insights into system performance, user engagement patterns, and translation quality metrics, enabling continuous improvement and optimization.`,
    
    learnings: `This comprehensive project provided extensive experience in building end-to-end deep learning systems, from initial data preprocessing and model training to API development and frontend integration for NLP applications. The development process highlighted the importance of proper tokenization strategies and the impact of architecture choices on translation quality. Working with the Transformer architecture deepened understanding of attention mechanisms and their role in sequence-to-sequence tasks. The project also emphasized the critical aspects of production deployment, including API design, authentication systems, and user interface development. The integration of monitoring and analytics systems demonstrated the importance of observability in machine learning applications, while the use of modern web technologies showcased the value of type-safe development practices in creating robust, maintainable applications.`,
    
    repoUrl: "https://github.com/ankits1802/Translingua-Web",
    liveDemoUrl: "https://translingua-web.vercel.app/",
    caseStudyBlogSlug: "case-study-translingua-machine-translation",
    
    metrics: {
      accuracyImprovement: "BLEU score: 29.7, METEOR score: 33",
      performanceGains: "40% training time reduction with CUDA",
      datasetSize: "250K+ English-French sentence pairs from Tatoeba",
      modelParameters: "84M+ parameters, 6-layer, 8-head Transformer",
      trainingTime: "Optimized with CUDA acceleration"
    }
  },

  {
    id: "project-finetune",
    title: "FineTune: LSTM-Based Piano Music Generator",
    description: "Innovative Music Generation with Artificial Intelligence",
    imageUrl: "/images/Finetune.png",
    dataAiHint: "music generation piano lstm ai creativity",
    timeline: "Jan. 2024 - Mar. 2024",
    status: "completed",
    tags: [
      "Python", "Keras", "TensorFlow", "Music21", "NumPy", "h5py", "RNNs", "LSTMs"
    ],
    
    generalDetails: `FineTune represents an innovative exploration into the intersection of artificial intelligence and musical creativity, specifically focusing on autonomous piano music composition. This project leverages the power of Long Short-Term Memory (LSTM) neural networks to understand and replicate the complex temporal patterns inherent in piano music. By processing the extensive ADL Piano MIDI dataset containing 11,086 diverse piano pieces, the system learns to generate original, melodious compositions that demonstrate understanding of musical structure, harmony, and stylistic variations. The project showcases the application of deep learning techniques in creative domains, pushing the boundaries of AI-generated content in the arts.`,
    
    toolsAndMethods: [
      "Engineered a sophisticated LSTM-based neural network architecture specifically designed for autonomous piano music composition",
      "Processed and optimized the comprehensive ADL Piano MIDI dataset comprising 11,086 diverse piano pieces for sequence-based learning",
      "Architected a robust 3-layer LSTM network with 512 units per layer for complex pattern recognition and generation",
      "Implemented advanced regularization techniques including recurrent dropout and batch normalization for enhanced model generalization",
      "Designed efficient sequence generation pipeline using 100-timestep inputs to capture long-term musical dependencies",
      "Executed comprehensive training regime on 9,021 MIDI files across 200 epochs with sophisticated monitoring",
      "Integrated early stopping mechanisms and model checkpointing to prevent overfitting and preserve optimal model states",
      "Developed specialized MIDI generation pipeline for producing high-quality, continuous piano compositions",
      "Implemented advanced music theory considerations for maintaining harmonic consistency and musical coherence",
      "Created evaluation metrics for assessing musical quality, diversity, and stylistic authenticity of generated compositions"
    ],
    
    results: `The FineTune system achieved remarkable success in generating high-quality piano music that demonstrates sophisticated understanding of musical patterns and structures. The model achieved an impressive loss reduction to 0.03, indicating excellent convergence and learning efficiency. The generated compositions exhibit high musical quality with continuous, melodious piano pieces that showcase the model's ability to emulate diverse musical styles ranging from classical to contemporary. The system successfully captures complex temporal dependencies in music, producing compositions that maintain harmonic consistency and demonstrate understanding of musical phrasing and structure. The MIDI generation pipeline enables seamless export of compositions for use in digital audio workstations and music production environments.`,
    
    learnings: `This project provided profound insights into the application of recurrent neural networks, particularly LSTMs, for sequence generation tasks in creative domains. The experience highlighted the unique challenges of working with musical data, including the importance of proper sequence representation and the complexity of capturing long-term dependencies in musical compositions. Working with MIDI data processing revealed the intricacies of digital music representation and the technical considerations required for maintaining musical coherence. The project also demonstrated the potential of AI in creative applications, showcasing how machine learning can be used to augment human creativity rather than replace it. The experience emphasized the importance of domain expertise in creative AI applications and the value of combining technical skills with artistic understanding.`,
    
    repoUrl: "https://github.com/ankits1802/FineTune",
    liveDemoUrl: "https://ankits1802-finetune.vercel.app/",
    caseStudyBlogSlug: "case-study-finetune-ai-music-generation",
    
    metrics: {
      accuracyImprovement: "Loss reduction to 0.03",
      datasetSize: "11,086 piano pieces from ADL Piano MIDI dataset",
      modelParameters: "3-layer LSTM with 512 units per layer",
      trainingTime: "200 epochs on 9,021 MIDI files"
    }
  },

  {
    id: "project-signaline",
    title: "Sign-a-Line: Real-Time American Sign Language Recognition",
    description: "Computer Vision for Empowerment and Accessibility",
    imageUrl: "/images/Signaline.png",
    dataAiHint: "sign language recognition computer vision accessibility",
    timeline: "December 2023",
    status: "completed",
    tags: [
      "Python", "TensorFlow", "Keras", "OpenCV", "MediaPipe", "gTTS", "NumPy", "Pandas"
    ],
    
    generalDetails: `Sign-a-Line represents a groundbreaking application of computer vision technology for enhancing accessibility and communication for the deaf and hard-of-hearing community. This real-time American Sign Language (ASL) recognition system combines advanced deep learning techniques with cutting-edge computer vision libraries to create an intuitive, responsive platform for sign language interpretation. The project addresses a critical social need by providing technology that can bridge communication gaps and promote inclusivity. By processing over 87,000 images and implementing sophisticated hand tracking algorithms, the system achieves remarkable accuracy in recognizing ASL gestures and converting them to spoken language, demonstrating the powerful potential of AI for social good.`,
    
    toolsAndMethods: [
      "Engineered a sophisticated real-time Convolutional Neural Network (CNN) architecture optimized for ASL hand sign recognition",
      "Preprocessed and normalized over 87,000 high-quality images from the comprehensive ASL MNIST dataset",
      "Deployed a custom CNN architecture featuring 3 convolutional layers with ReLU activation and strategic max pooling",
      "Integrated advanced MediaPipe framework for precise hand tracking and landmark detection in real-time video streams",
      "Implemented sophisticated Region of Interest (ROI) extraction algorithms for focused gesture analysis",
      "Developed Google Text-to-Speech (gTTS) integration for seamless conversion of recognized signs to spoken audio",
      "Optimized model inference pipeline for real-time performance with sub-20ms latency per frame",
      "Implemented comprehensive data augmentation techniques to improve model robustness and generalization",
      "Created advanced preprocessing pipelines for handling varying lighting conditions and hand orientations",
      "Developed user-friendly interface with real-time feedback and confidence scoring for recognition accuracy"
    ],
    
    results: `The Sign-a-Line system achieved exceptional performance metrics that demonstrate its viability as a practical accessibility tool. The model attained an impressive 95% accuracy on test data, indicating highly reliable sign recognition capabilities. MediaPipe integration resulted in a significant 30% reduction in background noise and improved hand tracking precision, leading to more accurate gesture recognition. The optimized inference pipeline achieves remarkable real-time performance with only 15ms processing time per frame, enabling smooth, responsive user interactions. The gTTS integration provides 100% uptime in audio playback, ensuring consistent and reliable voice output for recognized signs. The system's robust performance across various lighting conditions and hand orientations demonstrates its practical applicability in real-world scenarios.`,
    
    learnings: `This project provided invaluable experience in building real-time computer vision applications that address genuine social needs. The development process highlighted the importance of integrating multiple technologies effectively, combining CNNs for image classification, MediaPipe for hand tracking, and text-to-speech for audio output. Working with accessibility-focused applications emphasized the critical importance of user experience design and the need for robust, reliable performance in assistive technologies. The project also demonstrated the challenges of optimizing machine learning models for real-time performance while maintaining high accuracy. The experience reinforced the potential of AI technologies to create meaningful social impact and the responsibility that comes with developing tools for vulnerable communities.`,
    
    repoUrl: "https://github.com/ankits1802/Sign-A-Line",
    liveDemoUrl: "https://sign-a-line.vercel.app/",
    caseStudyBlogSlug: "case-study-sign-a-line-asl-recognition",
    
    metrics: {
      accuracyImprovement: "95% accuracy on test data",
      performanceGains: "15ms inference time per frame, 30% noise reduction",
      datasetSize: "87,000+ images from ASL MNIST dataset",
      inferenceLatency: "15ms per frame for real-time processing"
    }
  },

  {
    id: "project-document-analyzer",
    title: "DocuWise: Intelligent Document Analyzer",
    description: "An AI-powered tool to extract key information and insights from unstructured documents using advanced NLP techniques",
    imageUrl: "/images/DocuWise.png",
    dataAiHint: "document analysis nlp information extraction",
    timeline: "Sep. 2023 - Dec. 2023",
    status: "completed",
    tags: [
      "Python", "TensorFlow", "NLP", "AWS S3", "Docker", "Flask", "React", "BERT", "Transformers"
    ],
    
    generalDetails: `DocuWise: Intelligent Document Analyzer represents a sophisticated AI-powered solution designed to revolutionize the way organizations process and analyze large volumes of unstructured documents. This comprehensive system leverages state-of-the-art Natural Language Processing techniques to automatically extract critical information, identify key entities, and generate actionable insights from complex legal documents, contracts, and other text-heavy materials. The project addresses the significant challenge faced by legal firms, compliance departments, and business analysts who traditionally spend countless hours manually reviewing documents. By implementing advanced machine learning algorithms and creating an intuitive user interface, the system dramatically reduces manual effort while improving accuracy and consistency in document analysis.`,
    
    toolsAndMethods: [
      "Implemented advanced BERT-based models for sophisticated text classification and entity recognition tasks",
      "Developed comprehensive Named Entity Recognition (NER) systems for identifying critical clauses, parties, dates, and legal terms",
      "Utilized TF-IDF (Term Frequency-Inverse Document Frequency) algorithms for intelligent keyword extraction and document summarization",
      "Created robust Flask API backend with comprehensive document processing endpoints and secure file handling",
      "Designed modern React frontend with intuitive document upload, processing status tracking, and results visualization",
      "Integrated AWS S3 for scalable document storage and retrieval with secure access controls",
      "Implemented Docker containerization for consistent deployment across different environments",
      "Developed advanced text preprocessing pipelines for handling various document formats and encodings",
      "Created sophisticated visualization dashboards for presenting extracted information and analytical insights",
      "Implemented comprehensive error handling and logging systems for production reliability"
    ],
    
    results: `DocuWise: Intelligent Document Analyzer achieved outstanding performance metrics that demonstrate its effectiveness as an enterprise-grade solution. The system attained an impressive 92% accuracy in entity extraction tasks, significantly outperforming manual review processes in both speed and consistency. The automated processing pipeline reduced document review time by an remarkable 70%, enabling legal teams and analysts to focus on higher-value strategic tasks rather than routine document scanning. The interactive dashboard successfully visualized key findings through comprehensive charts, graphs, and summary reports, making complex document insights accessible to non-technical stakeholders. The system's robust architecture handled large document volumes efficiently while maintaining consistent performance and reliability across different document types and formats.`,
    
    learnings: `This project provided extensive insights into the practical challenges and solutions involved in deploying NLP systems for real-world document processing tasks. The experience highlighted the critical importance of fine-tuning large language models for specific domains, particularly in legal and business contexts where accuracy and reliability are paramount. Working with noisy, real-world text data revealed the complexities of handling inconsistent formatting, varying document structures, and domain-specific terminology. The project also emphasized the significance of MLOps practices for deploying scalable NLP solutions, including proper model versioning, monitoring, and continuous improvement processes. The development process reinforced the value of creating user-friendly interfaces that make sophisticated AI capabilities accessible to domain experts without technical backgrounds.`,
    
    repoUrl: "https://github.com/ankits1802/DocuWise",
    liveDemoUrl: "https://docu-wise.vercel.app/",
    caseStudyBlogSlug: "case-study-intelligent-document-analyzer",
    
    metrics: {
      accuracyImprovement: "92% accuracy in entity extraction",
      performanceGains: "70% reduction in document review time",
      datasetSize: "Large volumes of legal documents and contracts",
      modelParameters: "BERT-based models with domain-specific fine-tuning"
    }
  },

  {
    id: "project-predictive-maintenance",
    title: "Predictron",
    description: "Advanced machine learning solution for predicting equipment failures in manufacturing environments, enabling proactive maintenance strategies",
    imageUrl: "/images/Predictron.png",
    dataAiHint: "industrial iot predictive maintenance manufacturing",
    timeline: "Jun. 2023 - Sep. 2023",
    status: "completed",
    tags: [
      "Python", "Scikit-learn", "Pandas", "IoT", "GCP", "TensorFlow", "Time Series", "LSTM", "Random Forest"
    ],
    
    generalDetails: `The Predictron represents a cutting-edge application of machine learning and IoT technologies in industrial manufacturing environments. This comprehensive solution addresses the critical challenge of unexpected equipment failures that can result in costly downtime, production delays, and safety hazards. By leveraging advanced sensor data analytics and sophisticated machine learning algorithms, the system enables manufacturing facilities to transition from reactive maintenance strategies to proactive, data-driven approaches. The project integrates multiple data sources including vibration sensors, temperature monitors, pressure gauges, and operational metrics to create a holistic view of equipment health and predict potential failures with high accuracy and sufficient lead time for preventive action.`,
    
    toolsAndMethods: [
      "Implemented sophisticated time series analysis using ARIMA models and LSTM neural networks for capturing temporal patterns in sensor data",
      "Developed ensemble Random Forest classifiers for robust failure prediction across different equipment types and operating conditions",
      "Created comprehensive feature engineering pipelines for extracting meaningful insights from raw sensor data streams",
      "Integrated Google Cloud AI Platform for scalable model training and deployment with automated MLOps workflows",
      "Designed real-time data ingestion systems for processing continuous IoT sensor streams with low-latency processing",
      "Implemented advanced anomaly detection algorithms for identifying unusual equipment behavior patterns",
      "Created sophisticated alerting systems with configurable thresholds and escalation procedures for maintenance teams",
      "Developed comprehensive dashboards for visualizing equipment health metrics, failure predictions, and maintenance schedules",
      "Integrated with existing enterprise resource planning (ERP) systems for seamless maintenance workflow integration",
      "Implemented robust data validation and quality assurance processes for ensuring reliable model inputs"
    ],
    
    results: `The Predictron delivered exceptional results that significantly improved manufacturing operations efficiency and cost-effectiveness. The model successfully predicted 85% of equipment failures up to 7 days in advance, providing sufficient time for maintenance teams to plan and execute preventive actions. This predictive capability led to a substantial 20% reduction in unplanned downtime, directly translating to improved production efficiency and reduced operational costs. The system's advanced analytics revealed surprising correlations between seemingly unrelated sensor inputs, providing valuable insights into equipment behavior and failure patterns. The real-time monitoring capabilities enabled immediate detection of anomalous conditions, while the intuitive dashboards empowered maintenance teams with actionable insights for optimizing maintenance schedules and resource allocation.`,
    
    learnings: `This project provided crucial insights into the practical challenges and opportunities in deploying machine learning solutions in industrial IoT environments. The experience emphasized the critical importance of robust feature engineering for time-series data, particularly in handling noisy sensor readings and extracting meaningful patterns from complex multi-dimensional data streams. Working in industrial settings highlighted the need for reliable, fault-tolerant systems that can operate continuously in challenging environments. The project also revealed the value of domain expertise in interpreting machine learning results and the importance of close collaboration with maintenance professionals to ensure practical applicability of predictive insights. The experience reinforced the potential of IoT and machine learning integration for transforming traditional industrial operations.`,
    
    repoUrl: "https://github.com/ankits1802/Predictron",
    liveDemoUrl: "https://predictron.vercel.app/dashboard",
    caseStudyBlogSlug: "case-study-predictive-maintenance-system",
    
    metrics: {
      accuracyImprovement: "85% of failures predicted 7 days in advance",
      performanceGains: "20% reduction in unplanned downtime",
      datasetSize: "Continuous IoT sensor data streams from manufacturing equipment",
      modelParameters: "Ensemble Random Forest with LSTM time series analysis"
    }
  },

  {
    id: "project-ai-art-generator",
    title: "Imaginoir",
    description: "A sophisticated generative adversarial network (GAN) that creates unique abstract art pieces based on user prompts and style preferences",
    imageUrl: "/images/Imaginoir.png",
    dataAiHint: "abstract art generation gan creative ai",
    timeline: "Mar. 2023 - Jun. 2023",
    status: "completed",
    tags: [
      "Python", "PyTorch", "GANs", "Creative AI", "Streamlit", "DCGAN", "StyleGAN2", "Computer Vision"
    ],
    
    generalDetails: `The Imaginoir represents an innovative exploration into the fascinating intersection of artificial intelligence and artistic creativity. This sophisticated system leverages the power of Generative Adversarial Networks (GANs) to create unique, aesthetically pleasing abstract art pieces that demonstrate the potential of AI as a creative collaborator rather than a replacement for human artists. The project addresses the growing interest in AI-generated content and explores how machine learning can be used to augment human creativity in artistic domains. By training on diverse datasets of abstract art and implementing advanced GAN architectures, the system learns to generate novel artistic visuals that exhibit creativity, style consistency, and aesthetic appeal while responding to user inputs and style preferences.`,
    
    toolsAndMethods: [
      "Implemented sophisticated Deep Convolutional GANs (DCGAN) architecture optimized for high-quality image generation",
      "Integrated advanced StyleGAN2 architecture for superior style control and image quality with reduced artifacts",
      "Trained models on comprehensive datasets of abstract art images spanning multiple artistic movements and styles",
      "Developed intuitive Streamlit interface for interactive art generation with real-time user feedback",
      "Created advanced prompt processing systems for translating user descriptions into latent space representations",
      "Implemented sophisticated loss functions and training strategies to address common GAN challenges like mode collapse",
      "Developed style transfer capabilities allowing users to influence generation with reference images or style keywords",
      "Created comprehensive evaluation metrics for assessing artistic quality, diversity, and style consistency",
      "Implemented advanced sampling techniques for generating diverse outputs from similar prompts",
      "Integrated user feedback mechanisms for continuous improvement of generation quality and relevance"
    ],
    
    results: `The Imaginoir successfully produced diverse and aesthetically pleasing images that demonstrate sophisticated understanding of artistic principles and visual composition. The system generated unique abstract art pieces that exhibited creativity and originality while maintaining visual coherence and artistic appeal. The interactive interface enabled users to input styles, keywords, or reference images to influence the generation process, creating a collaborative experience between human creativity and artificial intelligence. The advanced GAN architectures successfully addressed common training challenges, producing high-quality images with minimal artifacts and good style consistency. The system's ability to generate diverse outputs from similar prompts demonstrated effective exploration of the latent space and creative potential.`,
    
    learnings: `This project provided profound insights into the application of generative models in creative domains and the unique challenges associated with training GANs for artistic content generation. The experience highlighted the importance of careful dataset curation and the impact of training data quality on generated output aesthetics. Working with GANs revealed the complexities of training adversarial networks, including challenges like mode collapse, training instability, and the delicate balance between generator and discriminator performance. The project also emphasized the importance of evaluation metrics in creative applications, where traditional quantitative measures may not fully capture artistic quality and aesthetic appeal. The experience demonstrated the potential for AI to serve as a creative tool that augments human artistic expression rather than replacing it.`,
    
    repoUrl: "https://github.com/ankits1802/Imaginoir",
    liveDemoUrl: "https://imaginoir.vercel.app/",
    caseStudyBlogSlug: "case-study-ai-art-generator-gan",
    
    metrics: {
      datasetSize: "Large collection of abstract art images across multiple styles",
      modelParameters: "DCGAN and StyleGAN2 architectures with optimized training",
      performanceGains: "High-quality image generation with minimal artifacts"
    }
  }
];

// utils/projectUtils.ts
export class ProjectManager {
  private projects: Project[];

  constructor(projects: Project[]) {
    this.projects = projects;
  }

  // Get all projects
  getAllProjects(): Project[] {
    return this.projects;
  }

  // Get project by ID
  getProjectById(id: string): Project | undefined {
    return this.projects.find(project => project.id === id);
  }

  // Get projects by tag
  getProjectsByTag(tag: string): Project[] {
    return this.projects.filter(project => 
      project.tags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
    );
  }

  // Get projects by status
  getProjectsByStatus(status: 'completed' | 'ongoing' | 'archived'): Project[] {
    return this.projects.filter(project => project.status === status);
  }

  // Get projects by data/AI hint
  getProjectsByHint(hint: string): Project[] {
    return this.projects.filter(project => 
      project.dataAiHint.toLowerCase().includes(hint.toLowerCase())
    );
  }

  // Search projects by title or description
  searchProjects(query: string): Project[] {
    const lowercaseQuery = query.toLowerCase();
    return this.projects.filter(project => 
      project.title.toLowerCase().includes(lowercaseQuery) ||
      project.description.toLowerCase().includes(lowercaseQuery) ||
      project.generalDetails.toLowerCase().includes(lowercaseQuery)
    );
  }

  // Get featured projects (those with live demos or case studies)
  getFeaturedProjects(): Project[] {
    return this.projects.filter(project => 
      project.liveDemoUrl || project.caseStudyBlogSlug
    );
  }

  // Get project statistics
  getProjectStats(): {
    total: number;
    completed: number;
    ongoing: number;
    withDemos: number;
    withCaseStudies: number;
    technologies: { [key: string]: number };
  } {
    const stats = {
      total: this.projects.length,
      completed: this.projects.filter(p => p.status === 'completed').length,
      ongoing: this.projects.filter(p => p.status === 'ongoing').length,
      withDemos: this.projects.filter(p => p.liveDemoUrl).length,
      withCaseStudies: this.projects.filter(p => p.caseStudyBlogSlug).length,
      technologies: {} as { [key: string]: number }
    };

    // Count technology usage
    this.projects.forEach(project => {
      project.tags.forEach(tag => {
        stats.technologies[tag] = (stats.technologies[tag] || 0) + 1;
      });
    });

    return stats;
  }
}

// Export the project manager instance
export const projectManager = new ProjectManager(projectsData);

// Additional utility functions
export const getProjectsByTimeframe = (startDate: string, endDate: string): Project[] => {
  return projectsData.filter(project => {
    if (!project.timeline) return false;
    // Simple date comparison - in a real app, you'd use proper date parsing
    return project.timeline.includes(startDate.substring(0, 4)) || 
           project.timeline.includes(endDate.substring(0, 4));
  });
};

export const getTopTechnologies = (limit: number = 10): Array<{tech: string, count: number}> => {
  const techCount: { [key: string]: number } = {};
  
  projectsData.forEach(project => {
    project.tags.forEach(tag => {
      techCount[tag] = (techCount[tag] || 0) + 1;
    });
  });

  return Object.entries(techCount)
    .map(([tech, count]) => ({ tech, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};
