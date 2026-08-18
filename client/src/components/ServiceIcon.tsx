import {
  Bath,
  Building2,
  Construction,
  Droplets,
  FileText,
  House,
  RefreshCw,
  Route,
  Wrench,
  type LucideIcon,
} from "lucide-react";

export type ServiceIconName =
  | "leak"
  | "reform"
  | "equipment"
  | "new-construction"
  | "sewer"
  | "water-tap"
  | "design"
  | "building"
  | "house"
  | "road";

export const serviceIconRegistry: Record<ServiceIconName, LucideIcon> = {
  leak: Droplets,
  reform: Bath,
  equipment: Wrench,
  "new-construction": Construction,
  sewer: RefreshCw,
  "water-tap": Droplets,
  design: FileText,
  building: Building2,
  house: House,
  road: Route,
};

interface ServiceIconProps {
  name: ServiceIconName;
  className?: string;
  strokeWidth?: number;
}

export default function ServiceIcon({ name, className, strokeWidth = 1.8 }: ServiceIconProps) {
  const Icon = serviceIconRegistry[name];
  return <Icon aria-hidden="true" className={className} strokeWidth={strokeWidth} />;
}
