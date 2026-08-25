export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'AI / Machine Learning' | 'Web & Bio-Systems' | 'Systems & Core ML' | 'Game Development & 3D';
  shortDescription: string;
  fullDescription: string;
  tags: string[];
  metrics: { label: string; value: string }[];
  techStack: { name: string; role: string; icon?: string }[];
  features: string[];
  architectureNotes: string;
  githubUrl: string;
  liveDemoUrl?: string;
  featured: boolean;
  interactiveType: 'docsentinel' | 'cstr' | 'neuralnet' | 'cuberun' | 'sysinfo';
  colorGradient: {
    from: string;
    to: string;
    accent: string;
    border: string;
  };
}

export interface SkillItem {
  id: string;
  name: string;
  category: 'AI & ML' | 'Full-Stack & Systems' | 'Bio-Engineering & Math' | 'Core & Low-Level';
  level: number; // 0 to 100
  yearsOfExperience?: string;
  iconName: string;
  description: string;
  highlight: string;
  orbitRadius: number;
  orbitSpeed: number;
  orbitAngle: number;
  color: string;
}

export interface EducationExperience {
  id: string;
  title: string;
  institution: string;
  location: string;
  period: string;
  degreeOrRole: string;
  description: string;
  achievements: string[];
  badges: string[];
  category: 'Education' | 'Research' | 'Engineering' | 'Open-Source';
}
