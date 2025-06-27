
export type Experience = {
  role: string;
  company: string;
  duration: string;
  description: string[];
};

export type Testimonial = {
  id: string;
  quote: string;
  authorName: string;
  authorTitle: string;
  authorImageUrl?: string;
  dataAiHint?: string;
};

export type EducationCoursework = {
  [category: string]: string;
};

export type EducationEntry = {
  institution: string;
  degree: string;
  field?: string;
  duration?: string;
  cgpa?: string;
  relevantCoursework?: EducationCoursework;
  isCertification: boolean;
};

export type Publication = {
  title: string;
  venue: string; 
  date: string;
  description: string[];
  repoUrl?: string;
  pdfUrl?: string; 
  tags: string[];
};

export type Achievement = {
  title: string;
  issuer: string;
  date: string;
  association?: string;
  description: string;
};


export type UserData = {
  name: string;
  title: string;
  tagline: string;
  headshotUrl: string;
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  mediumUrl: string;
  leetcodeUrl: string;
  resumeUrl: string; // Path to the resume PDF in /public
  about: {
    introduction: string;
    experience: Experience[];
    education: EducationEntry[];
    interests: string[];
    aspirations: string;
  };
  testimonials: Testimonial[];
  publications?: Publication[];
  achievements: Achievement[];
};

export const userData: UserData = {
  name: "Ankit Kumar",
  title: "AI/ML Engineer",
  tagline: "Transforming data into intelligent solutions through machine learning. Full-time Thinker. Part-time Tinkerer.",
  headshotUrl: "/ankit-kumar-profile.png",
  email: "ankits1802@gmail.com",
  linkedinUrl: "https://www.linkedin.com/in/ankits1802/",
  githubUrl: "https://github.com/ankits1802",
  mediumUrl: "https://medium.com/@ankits1802",
  leetcodeUrl: "https://leetcode.com/u/ankits1802/",
  resumeUrl: "/resume.pdf",
  about: {
    introduction:
      "I’ve always been curious about how things work — not just on the surface, but under the hood, in the background, that make the most complex and sophisticated things seem effortless and laminar. As a kid, I’d take apart gadgets just to see what made them tick. That innate curiosity stayed with me, gradually evolving from disassembling toys to dissecting algorithms, systems, and patterns in the world around me. My journey into computer science wasn’t just about learning to code: it was about finding a language to express logic, creativity, and structure all at once. What drew me in was the thrill of solving problems that once seemed impossible, and what kept me here was the realization that technology, when used thoughtfully, can shape lives in real, tangible ways. As I delved deeper, I found myself captivated by the way artificial intelligence mirrors, and sometimes enhances human thought, and the overall quality and sustainability of life. The ability to teach machines to learn, adapt, and make decisions felt like unlocking a new dimension of creativity. For me, AI isn’t just a tool; it’s a medium for asking deeper questions about intelligence, perception, and design. I believe in building systems that are not just functional, but ethical, interpretable, and human-centered. I care deeply about clarity — in code, in thought, and in communication. I value depth over hype, and I approach both technology and people with empathy, respect, and an open mind. At the heart of everything I do is a simple belief: that learning never stops, and that curiosity, when nurtured, becomes a powerful force for innovation. This is my journey so far: driven by questions, shaped by learning, and grounded in the hope of creating something meaningful.",
    experience: [
      {
        role: 'Research Intern – Generative AI (Ragamala Imagery)',
        company: 'IIT Kharagpur, under Prof. Priyadarshi Patnaik via NPTEL',
        duration: 'May 2025 – June 2025 . 1 mo',
        description: [
          "Spearheaded the fine-tuning of Stable Diffusion XL (SDXL 1.0) using LoRA and QLoRA adapters to generate culturally grounded Ragamala paintings, achieving a 31% improvement in stylistic coherence over base models.",
          "Conducted few-shot and multi-shot RAG (Retrieval-Augmented Generation) training workflows to enhance visual-textual alignment for Indian classical musical emotions and iconographic elements.",
          "Benchmarked generated imagery against state-of-the-art models (e.g., DALL·E 3, MidJourney v6, Kandinsky 3.0) using FID, CLIPScore, and human evaluation, demonstrating a 24% higher perceptual relevance to traditional Ragamala artworks.",
          "Deployed and scaled training pipelines on AWS EC2 (g5.2xlarge) and SageMaker for efficient fine-tuning, reducing training time by 18% through optimized data loading and mixed-precision training.",
          "Curated a domain-specific dataset of ~2,000 annotated Ragamala artworks with associated poetic metadata, enabling effective cross-modal learning for aesthetic and symbolic fidelity.",
          "Implemented advanced prompt engineering and classifier-free guidance techniques to steer generation toward semantically rich and context-sensitive outputs.",
          "Collaborated with a multidisciplinary team of digital humanities scholars and AI researchers, ensuring cultural interpretability and ethical alignment in AI-generated artworks.",
          "Tech Stack: Python, PyTorch, Hugging Face Diffusers, FastAPI, AWS SageMaker, EC2, LoRA, QLoRA, FAISS, CLIP, NumPy, PIL, Matplotlib, Weights & Biases, ONNX.",
        ],
      },
      {
        "role": "Machine Learning Intern",
        "company": "Internshala Trainings, IIT Madras Pravartak, and NSDC",
        "duration": "Dec. 2024 – Jan. 2025 . 2 mos",
        "description": [
          "Developed anddeployed scalable predictive models for real-world applications, including California Housing Price Prediction, Telecom Customer Churn Prediction, and Early Disease Detection, driving actionable insights and improving decision making.",
          "Applied supervised and unsupervised learning techniques, including Linear Regression, Decision Trees, Random Forest, SVM, XGBoost, and Neural Networks, to build, optimize, and validate models, enhancing predictive accuracy by 7%.",
          "Engineered features and preprocessed data using cross-validation, hyperparameter tuning, and feature selection, boosting model robustness and reducing overfitting by 7%.",
          "Implemented Python scripts for efficient data extraction, analysis, and manipulation, streamlining the ETL pipeline and improving data processing efficiency by 15%.",
          "Enhanced model performance by 7% through algorithm research and optimization using SVM, ARIMA, PCA, and t-SNE, increasing both predictive accuracy and interpretability.",
          "Leveraged cloud computing resources and MLOps tools for scalable model deployment, enabling real-world implementation and optimizing workflow efficiency by 20%.",
          "Addressed challenges such as dataset imbalance, overfitting, and missing data using SMOTE, regularization, and distributed computing techniques, boosting model robustness and reliability.",
          "Used Tools/Frameworks: Python, Scikit-learn, TensorFlow, Pandas, NumPy, Jupyter Notebooks, MLOps, Cloud Platforms, Matplotlib, Seaborn, Statsmodels"
        ]
      },
      {
        "role": "Amazon ML Summer School",
        "company": "Amazon",
        "duration": "Jul 2024 - Jul 2024 · 1 mo",
        "description": [
          "Participated in Amazon’s Machine Learning Summer School program, gaining advanced exposure to ML theory and application after being selected into a cohort of around 3000 students, with less that 0.275 selection rate.",
          "Engaged in hands-on sessions on Large Language Models (LLMs), data preparation, feature engineering, and model evaluation.",
          "Expanded practical understanding of cutting-edge ML topics through guided industry projects and mentorship.",
          "Tools/Tech: Python, LLMs, Model Evaluation Techniques."
        ]
      },
      {
        "role": "Salesforce Virtual Internship",
        "company": "SmartInternz",
        "duration": "Dec 2023 - Jan 2024 · 2 mos",
        "description": [
          "Engineered custom solutions using Apex, Visualforce, and Lightning Web Components (LWC) to address complex business needs.",
          "Streamlined operations by implementing Salesforce Flow, Approval Processes, and Process Builder, enhancing workflow efficiency by 4%.",
          "Developed RESTful API integrations for seamless data synchronization with external systems, optimizing inventory management accuracy by 3%.",
          "Achieved Apex Specialist, Process Automation Specialist, and Developer Super Set Superbadges, showcasing advanced Salesforce expertise.",
          "Used Tools/Frameworks: Salesforce Lightning Platform, Apex, Visualforce, LWC, Salesforce CLI, VS Code",
        ]
      },
      {
        "role": "Data Science Trainee",
        "company": "Internshala Trainings",
        "duration": "Mar 2023 - Apr 2023 · 2 mos",
        "description": [
          "Wrote Python scripts to extract, manipulate, and analyze structured and unstructured datasets for insights.",
          "Researched and integrated optimal algorithms to increase model efficiency and reduce runtime by 7%.",
          "Gained hands-on experience in supervised learning, predictive modeling, and data analytics.",
          "Tools/Tech: Python, Pandas, Scikit-learn, Data Visualization, Predictive Modeling."
        ]
      },
      {
        "role": "Embedded Systems & Robotics Intern",
        "company": "Ansoz Creations Pvt. Ltd.",
        "duration": "Oct 2021 - Nov 2021 · 2 mos",
        "description": [
          "Developed Arduino-based software solutions using C and C++ to interface UI with hardware components.",
          "Improved code efficiency and reduced memory footprint, enhancing embedded system performance.",
          "Worked with sensors and microcontrollers to develop functional robotics prototypes.",
          "Tools/Tech: Arduino IDE, Embedded C, C++, Circuit Design."
        ],
      },
    ],
    education: [
      {
        institution: "Sershah Engineering College",
        degree: "Bachelor of Technology (B.Tech)",
        field: "Computer Science and Engineering",
        duration: "Sep 2021 – Jul 2025",
        cgpa: "CGPA: 9.16 (Cumulative), 9.56 (Current)",
        relevantCoursework: {
          "Core Computer Science": "Data Structures and Algorithms, Object-Oriented Programming, Operating Systems, Computer Networks, Database Management Systems, Software Engineering, Design and Analysis of Algorithms, Compiler Design, Distributed Systems, System Design",
          "Programming and Development": "Programming Fundamentals (C, C++, Java, Python), Web Technologies, Mobile Application Development, Cloud Computing",
          "Mathematics & Theoretical Foundations": "Linear Algebra, Calculus & Optimization, Discrete Mathematics, Probability and Statistics, Numerical Methods, Graph Theory",
          "AI and Advanced Topics": "Machine Learning, Deep Learning and Neural Networks, Artificial Intelligence, Computer Vision, Natural Language Processing"
        },
        isCertification: false,
      },
      {
        institution: "Government Polytechnic, Gaya",
        degree: "Diploma",
        field: "Electronics Engineering",
        duration: "Aug 2019 – Aug 2022",
        cgpa: "CGPA: 9.27 (Cumulative)",
        relevantCoursework: {
          "Core Electronics": "Electronic Devices and Circuits, Digital Electronics, Analog Electronics, Network Analysis and Synthesis",
          "Micro Systems": "Microprocessors and Microcontroller Applications, Embedded Systems, Control Systems",
          "Others": "Communication Systems, Power Electronics, Electrical Machines, Measurement and Instrumentation"
        },
        isCertification: false,
      },
      {
        institution: "AWS",
        degree: "Certified AWS Machine Learning Specialty",
        isCertification: true,
      },
      {
        institution: "Google Cloud",
        degree: "Google Cloud Professional Machine Learning Engineer",
        isCertification: true,
      },
      {
        institution: "Skill India Digital Hub",
        degree: "Machine Learning",
        duration: "Feb 2025",
        isCertification: true,
      },
      {
        institution: "Internshala Trainings",
        degree: "Machine Learning",
        duration: "Jan 2025",
        isCertification: true,
      },
      {
        institution: "Cisco Networking Academy",
        degree: "Cybersecurity Essentials",
        duration: "May 2024",
        isCertification: true,
      },
      {
        institution: "Cisco Networking Academy",
        degree: "Enterprise Networking, Security, and Automation",
        duration: "May 2024",
        isCertification: true,
      },
      {
        institution: "Cisco Networking Academy",
        degree: "Introduction to Networks",
        duration: "May 2024",
        isCertification: true,
      },
      {
        institution: "Cisco Networking Academy",
        degree: "Switching, Routing, and Wireless Essentials",
        duration: "May 2024",
        isCertification: true,
      },
      {
        institution: "Cisco Networking Academy",
        degree: "PCAP: Programming Essentials in Python",
        duration: "May 2024",
        isCertification: true,
      },
      {
        institution: "IBM",
        degree: "Basics of Quantum Information",
        duration: "Dec 2023",
        isCertification: true,
      },
      {
        institution: "Coursera",
        degree: "Google Data Analytics Specialization",
        duration: "Sep 2023",
        isCertification: true,
      },
      {
        institution: "Coursera",
        degree: "Google Data Analytics Capstone: Complete a Case Study",
        duration: "Sep 2023",
        isCertification: true,
      },
      {
        institution: "Coursera",
        degree: "Data Analysis with R Programming",
        duration: "Sep 2023",
        isCertification: true,
      },
      {
        institution: "Coursera",
        degree: "Process Data from Dirty to Clean",
        duration: "Sep 2023",
        isCertification: true,
      },
      {
        institution: "Coursera",
        degree: "Ask Questions to Make Data-Driven Decisions",
        duration: "Sep 2023",
        isCertification: true,
      },
      {
        institution: "Coursera",
        degree: "Analyze Data to Answer Questions",
        duration: "Sep 2023",
        isCertification: true,
      },
      {
        institution: "Coursera",
        degree: "Foundations: Data, Data, Everywhere",
        duration: "Sep 2023",
        isCertification: true,
      },
      {
        institution: "Coursera",
        degree: "Prepare Data for Exploration",
        duration: "Sep 2023",
        isCertification: true,
      },
      {
        institution: "Coursera",
        degree: "Share Data Through the Art of Visualization",
        duration: "Sep 2023",
        isCertification: true,
      },
      {
        institution: "CodeChef",
        degree: "Learn Python by CodeChef",
        duration: "Aug 2023",
        isCertification: true,
      },
      {
        institution: "CodeChef",
        degree: "Python for Problem Solving – 1",
        duration: "Aug 2023",
        isCertification: true,
      },
      {
        institution: "CodeChef",
        degree: "Python for Problem Solving – 2",
        duration: "Aug 2023",
        isCertification: true,
      },
      {
        institution: "Codecademy",
        degree: "Learn the Command Line Course",
        duration: "Aug 2023",
        isCertification: true,
      },
      {
        institution: "Forage",
        degree: "Goldman Sachs Software Engineering Virtual Experience Program",
        duration: "May 2023",
        isCertification: true,
      },
      {
        institution: "Internshala",
        degree: "Data Science",
        duration: "Apr 2023",
        isCertification: true,
      },
    ],
  "interests": [
    "Immersing myself in groundbreaking research at the forefront of reinforcement learning and generative AI, constantly pushing the boundaries of what intelligent systems can achieve.",
    "Actively contributing to open-source AI projects to collaborate with a global community, accelerate innovation, and democratize access to transformative technologies.",
    "Passionately mentoring aspiring data scientists and engineers, empowering the next generation to unlock their full potential and drive the future of AI.",
    "Engaging deeply with the AI community by devouring cutting-edge tech blogs and participating in leading AI conferences to stay inspired and continuously evolve my expertise."
  ],
  "aspirations": "My mission is to harness the power of AI and machine learning to create meaningful, real-world solutions that tackle complex challenges and drive technological progress. I am determined to evolve into a visionary leader who shapes AI strategy, inspires innovation, and cultivates a culture where creativity and impact thrive. Through this journey, I aim to make a lasting difference by bridging advanced AI research with practical applications that improve lives globally."
},
  testimonials: [
    {
      id: "testimonial-1",
      quote: "Ankit’s contributions to our Ragamala imagery project were outstanding. His deep understanding of generative AI and his culturally sensitive approach to model fine-tuning greatly enhanced the quality and relevance of the outputs.",
      authorName: "Prof. Priyadarshi Patnaik",
      authorTitle: "Professor, IIT Kharagpur & NPTEL Mentor",
      authorImageUrl: "https://placehold.co/100x100/6b21a8/ffffff?text=PP&font=montserrat",
      dataAiHint: "male professor",
    },
    {
      id: "testimonial-2",
      quote: "Ankit assisted on one of our projects and left a lasting impression with his structured problem-solving and seamless collaboration with the team. His ability to adapt quickly and contribute meaningfully stood out.",
      authorName: "Anuj Kumar",
      authorTitle: "Senior Consultant, Deloitte",
      authorImageUrl: "https://placehold.co/100x100/6b21a8/ffffff?text=AK&font=montserrat",
      dataAiHint: "male consultant",
    },
    {
      id: "testimonial-3",
      quote: "Ankit has an exceptional ability to comprehend complex codebases and quickly understand project architecture. His practical approach to solving real-world problems and optimizing solutions has been truly impressive.",
      authorName: "Saurav Kumar",
      authorTitle: "Software Engineer, S&P Global",
      authorImageUrl: "https://placehold.co/100x100/6b21a8/ffffff?text=SK&font=montserrat",
      dataAiHint: "male software engineer",
    },
  ],
  publications: [
    {
      title: "Hallucination Mitigation in Large Language Models: Benchmarking, Refinement, and RAG for Reducing Hallucinations in LLMs",
      venue: "Ongoing Research Paper",
      date: "Ongoing",
      description: [
        "Conducted an extensive survey and analysis of hallucination phenomena in LLMs, identifying 5 core patterns and key challenges across diverse NLP tasks.",
        "Benchmarked 6 state-of-the-art LLMs (ChatGPT, LLaMA, Claude, Mistral, Mixtral, Gemini) on TruthfulQA and BIG-bench, achieving a 7.4% hallucination reduction through ensemble modeling and multi-hop RAG retrieval.",
        "Optimized LLMs using Chain-of-Thought (CoT), self-consistency, and iterative refinement, reducing factual error rates by 12.8%.",
        "Implemented a retrieval-augmented verification (RAV) step, boosting factual accuracy by 9% through external knowledge validation and correction loops.",
        "Enhanced RAG with hybrid retrieval (FAISS + BM25) and multi-hop lookups, improving query precision by 11%.",
        "Applied fine-tuning with LoRA and QLoRA adapters on a synthetic fact-checking dataset, decreasing hallucination-induced inconsistencies by 15%.",
        "Integrated ONNX quantization and TorchScript, reducing inference latency by 22%, making the system real-time capable.",
        "Deployed the solution as a FastAPI service with an interactive interface for generating and verifying factual responses, featuring confidence scores, syntax validation, and contextual error analysis.",
        "Leveraged MLflow and LLMOps pipelines for continuous evaluation, retraining, and performance monitoring, ensuring scalability and stability.",
      ],
      tags: ["Python", "PyTorch", "Transformers", "deepseek-instruct-coder", "LoRA", "QLoRA", "RAG", "FAISS", "BM25", "FastAPI", "ONNX", "TorchScript", "SQL", "NumPy", "SentencePiece", "MLflow"],
    }
  ],
  achievements: [
    {
      title: "Departmental Rank 1",
      issuer: "Bihar Engineering University, Patna",
      date: "Jun 2025",
      association: "Sershah Engineering College",
      description: "Secured and retained the departmental rank 1 across the university through consistent extraordinary and stellar academic performance."
    },
    {
      title: "Elite Leetcoder",
      issuer: "Leetcode",
      date: "Jun 2025",
      description: "Solved more than 1300 questions on Leetcode to gain an all time-ranking of less than 8,000, out of 50,000,000 + users."
    },
    {
      title: "Amazon ML Summer School 2024 Cohort",
      issuer: "Amazon",
      date: "Jul 2024",
      description: "Participated in Amazon’s Machine Learning Summer School program, gaining advanced exposure to ML theory and application after being selected into a cohort of around 3000 students, with less that 0.275 selection rate."
    },
    {
      title: "NPTEL Topper",
      issuer: "NPTEL",
      date: "Jun 2024",
      description: "Scored the highest marks in the January-June 2024 term of the NPTEL MOOC Courses in Soft Skill Development, resultantly bagging a research internship at IIT Kharagpur, under the esteemed guidance of Professor Priyadarshi Patnaik."
    },
    {
      title: "Double Gold Medallist: State board of Technical Education, Bihar, 2022",
      issuer: "State Board of Technical Education",
      date: "Aug 2022",
      association: "Government Polytechnic, Gaya",
      description: "Double Gold Medallist: State Board of Technical Education, Bihar for scoring the highest cumulative GPA across the state for 2019-22."
    }
  ]
};
