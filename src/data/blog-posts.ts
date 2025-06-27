
// src/data/blog-posts.ts
export type BlogPost = {
  slug: string;
  title: string;
  date: string;
  author: string;
  excerpt: string;
  imageUrl?: string;
  dataAiHint?: string;
  content: string; // Should now be empty for all posts to conform to new layout
  tags: string[];
  isCaseStudy?: boolean;
};

export const blogPostsData: BlogPost[] = [
  {
    slug: "understanding-gans",
    title: "A Beginner's Guide to Understanding GANs",
    date: "2024-07-15",
    author: "Ankit Kumar",
    excerpt: "Dive into the fascinating world of Generative Adversarial Networks (GANs), one of the most innovative concepts in modern AI. This post breaks down the elegant dance between the Generator and the Discriminator, explaining how they work together to create stunningly realistic data. From generating images to creating music, discover the core mechanics, training challenges, and the vast creative potential of GANs.",
    imageUrl: "/images/GAN.jpeg",
    dataAiHint: "neural network",
    content: ``, 
    tags: ["GANs", "Deep Learning", "Machine Learning", "AI"],
  },
  {
    slug: "mlops-best-practices",
    title: "MLOps: Best Practices for Streamlining Your ML Workflow",
    date: "2024-06-28",
    author: "Ankit Kumar",
    excerpt: "Transitioning a machine learning model from a Jupyter Notebook to a reliable, scalable production system is a monumental task. This article explores the world of MLOps (Machine Learning Operations), outlining the essential best practices for building robust ML workflows. Learn about automated CI/CD pipelines, model monitoring, versioning, and how to create a streamlined process that ensures your models deliver real-world value consistently and efficiently.",
    imageUrl: "/images/MLOps.png",
    dataAiHint: "data pipeline",
    content: ``,
    tags: ["MLOps", "Production ML", "DevOps", "AI"],
  },
  {
    slug: "case-study-intelligent-document-analyzer",
    title: "Case Study: DocuWise The Intelligent Document Analyzer",
    date: "2024-07-20",
    author: "Ankit Kumar",
    excerpt: "Unstructured documents are a goldmine of information, but manually extracting it is slow and error-prone. This case study details the journey of building an AI-powered tool that automates this process. We'll explore how technologies like BERT and Named Entity Recognition (NER) were used to achieve over 90% accuracy in data extraction, slashing document review times by 70% and transforming a tedious manual task into an intelligent, automated workflow.",
    imageUrl: "/images/DocuWise.png",
    dataAiHint: "document analysis charts",
    content: ``,
    tags: ["Case Study", "NLP", "TensorFlow", "BERT", "NER", "Document AI"],
    isCaseStudy: true,
  },
  {
    slug: "case-study-autosql-text-to-sql-generation",
    title: "Case Study: AutoSQL Text-to-SQL Generation",
    date: "2024-08-10",
    author: "Ankit Kumar",
    excerpt: "Imagine asking for complex data insights in plain English and getting a perfect SQL query in return. This case study dives deep into the fine-tuning of a 6.7B parameter Large Language Model for text-to-SQL generation. Discover how advanced techniques like RAG, LoRA, and QLoRA were leveraged to conquer the challenging Spider dataset, boosting query accuracy by 23% and making complex databases accessible to everyone.",
    imageUrl: "/images/SQLEditor.png",
    dataAiHint: "sql generation ai",
    content: ``,
    tags: ["Case Study", "LLM", "Fine-Tuning", "RAG", "SQL", "PyTorch"],
    isCaseStudy: true,
  },
  {
    slug: "case-study-translingua-machine-translation",
    title: "Case Study: TransLingua Machine Translation",
    date: "2024-08-08",
    author: "Ankit Kumar",
    excerpt: "Explore the end-to-end creation of a high-performance English-to-French translation service. This deep dive covers everything from processing a massive 250K sentence-pair dataset to building and training a sophisticated Transformer model from scratch. We'll also walk through deploying it with a blazing-fast FastAPI backend and a sleek, modern React UI, offering a complete blueprint for a production-ready AI application.",
    imageUrl: "/images/Translingua.png",
    dataAiHint: "translation language",
    content: ``,
    tags: ["Case Study", "Machine Translation", "Transformers", "FastAPI", "React"],
    isCaseStudy: true,
  },
  {
    slug: "case-study-finetune-ai-music-generation",
    title: "Case Study: FineTune AI Music Generator",
    date: "2024-08-06",
    author: "Ankit Kumar",
    excerpt: "Can an AI compose music with soul? This case study ventures into the realm of creative AI, demonstrating how an LSTM-based neural network was trained to generate original, melodious piano compositions. We'll discuss the intricacies of processing MIDI data, designing a network that understands musical patterns, and the fascinating results of teaching a machine the art of music.",
    imageUrl: "/images/Finetune.png",
    dataAiHint: "music generation piano",
    content: ``,
    tags: ["Case Study", "Creative AI", "LSTMs", "Music Generation", "TensorFlow"],
    isCaseStudy: true,
  },
  {
    slug: "case-study-sign-a-line-asl-recognition",
    title: "Case Study: Sign-a-Line ASL Recognition",
    date: "2024-08-04",
    author: "Ankit Kumar",
    excerpt: "Technology can be a powerful force for accessibility. This case study showcases the development of a real-time computer vision system that recognizes American Sign Language (ASL) and vocalizes the signs. Learn how a custom CNN, combined with MediaPipe's precise hand-tracking, achieved 95% accuracy, turning a complex human gesture into audible speech and bridging communication gaps.",
    imageUrl: "/images/Signaline.png",
    dataAiHint: "sign language recognition",
    content: ``,
    tags: ["Case Study", "Computer Vision", "Accessibility", "CNNs", "MediaPipe"],
    isCaseStudy: true,
  },
  {
    slug: "case-study-predictive-maintenance-system",
    title: "Case Study: Predictron",
    date: "2024-08-02",
    author: "Ankit Kumar",
    excerpt: "In manufacturing, unplanned downtime is the enemy of efficiency. This case study breaks down how a machine learning model was developed to predict equipment failures before they happen. By analyzing IoT sensor data with time-series models, the system achieved 85% predictive accuracy up to a week in advance, leading to a 20% reduction in downtime and significant cost savings.",
    imageUrl: "/images/Predictron.png",
    dataAiHint: "industrial iot",
    content: ``,
    tags: ["Case Study", "Predictive Maintenance", "IoT", "Time Series", "Scikit-learn"],
    isCaseStudy: true,
  },
  {
    slug: "case-study-ai-art-generator-gan",
    title: "Case Study: Imaginoir",
    date: "2024-07-30",
    author: "Ankit Kumar",
    excerpt: "What happens when you teach a machine to dream? This case study explores the artistic potential of Generative Adversarial Networks (GANs) by building an AI that creates unique, abstract art. We'll look at the powerful StyleGAN2 architecture, the challenges of training for aesthetic quality, and how AI can serve as a powerful new tool for human creativity.",
    imageUrl: "/images/Imaginoir.png",
    dataAiHint: "abstract art",
    content: ``,
    tags: ["Case Study", "GANs", "Creative AI", "PyTorch", "StyleGAN"],
    isCaseStudy: true,
  },
];
