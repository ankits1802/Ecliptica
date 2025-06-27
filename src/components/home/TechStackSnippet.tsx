'use client';

import Image from 'next/image';

const techStackLogos = [
  { name: 'Python', logoUrl: '/Logos/Python.svg' },
  { name: 'PyTorch', logoUrl: '/Logos/PyTorch.svg' },
  { name: 'TensorFlow', logoUrl: '/Logos/TensorFlow.svg' },
  { name: 'Scikit-learn', logoUrl: '/Logos/scikit-learn.svg' },
  { name: 'Hugging Face', logoUrl: '/Logos/HuggingFace.svg' },
  { name: 'AWS', logoUrl: '/Logos/AWS.svg' },
  { name: 'Azure', logoUrl: '/Logos/Azure.svg' },
  { name: 'Google Cloud', logoUrl: '/Logos/Google Cloud.svg' },
  { name: 'Docker', logoUrl: '/Logos/Docker.svg' },
  { name: 'Kubernetes', logoUrl: '/Logos/Kubernetes.svg' },
  { name: 'Next.js', logoUrl: '/Logos/next.js.svg' },
  { name: 'React', logoUrl: '/Logos/react.svg' },
  { name: 'Node.js', logoUrl: '/Logos/node-js.svg' },
  { name: 'FastAPI', logoUrl: '/Logos/FastAPI.svg' },
  { name: 'LangChain', logoUrl: '/Logos/Langchain.svg' },
  { name: 'Tailwind CSS', logoUrl: '/Logos/Tailwind CSS.svg' },
];

export function TechStackSnippet() {
  // Create two identical sets for seamless looping
  const duplicatedLogos = [...techStackLogos, ...techStackLogos];

  return (
    <div className="w-full overflow-hidden py-8 md:py-12 tech-scroller-container bg-card/30">
      <div className="flex animate-scroll-seamless">
        {duplicatedLogos.map((tech, index) => (
          <div
            key={`${tech.name}-${index}`}
            className="mx-6 flex h-16 w-auto flex-shrink-0 items-center justify-center transition-all duration-300 ease-in-out hover:!grayscale-0 md:mx-8 md:h-20 lg:mx-10 lg:h-24 grayscale"
            title={tech.name}
          >
            <Image
              src={tech.logoUrl}
              alt={`${tech.name} logo`}
              width={100}
              height={80}
              className="object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
