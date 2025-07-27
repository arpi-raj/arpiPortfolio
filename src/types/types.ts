export interface ProjectCardProps {
  image?: string;
  title?: string;
  description?: string;
}

export interface TechCardProps {
  name: string;
  icon: string;
  description: string;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}