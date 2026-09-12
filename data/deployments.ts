import type {
  DeploymentStatus,
  DeviceSource,
  DeviceType,
  TimelineEvent,
} from "./devices";

export interface Deployment {
  id: string;
  agency: string;
  jurisdiction: string;
  county: string;
  municipality?: string;
  technology?: string;
  manufacturer?: string;
  deviceType: DeviceType;
  numberOfDevices?: number;
  deploymentStatus: DeploymentStatus;
  approvalDate?: string;
  implementationDate?: string;
  documentedCost?: string;
  annualRecurringCost?: string;
  retentionPolicy?: string;
  description?: string;
  sources: DeviceSource[];
  timeline: TimelineEvent[];
}

const demoDeploymentSource: DeviceSource = {
  title: "Fictional demonstration deployment record",
  publisher: "Virelix Transparency Project",
  url: "https://github.com/virelix-transparency/project",
  publicationDate: "2026-09-11",
  sourceType: "Development fixture",
};

export const demoDeployments: Deployment[] = [
  {
    id: "demo-deployment-active",
    agency: "Demo public safety agency",
    jurisdiction: "Fictional Pitt County jurisdiction",
    county: "Pitt County",
    municipality: "Greenville",
    technology: "Automated license plate recognition",
    manufacturer: "Fictional demo manufacturer",
    deviceType: "ALPR / License Plate Reader",
    numberOfDevices: 1,
    deploymentStatus: "Active",
    documentedCost: "Not publicly documented",
    annualRecurringCost: "Not publicly documented",
    retentionPolicy: "Not publicly documented",
    description: "Fictional deployment fixture with no asserted physical-device relationship.",
    sources: [demoDeploymentSource],
    timeline: [],
  },
  {
    id: "demo-deployment-planned",
    agency: "Demo public works agency",
    jurisdiction: "Fictional Pitt County jurisdiction",
    county: "Pitt County",
    municipality: "Greenville",
    technology: "Fixed traffic observation camera",
    deviceType: "Traffic Camera",
    deploymentStatus: "Planned",
    description: "Fictional planned deployment fixture; it does not create a map marker.",
    sources: [demoDeploymentSource],
    timeline: [],
  },
  {
    id: "demo-deployment-cancelled",
    agency: "Demo civic services agency",
    jurisdiction: "Fictional Pitt County jurisdiction",
    county: "Pitt County",
    technology: "Fixed public-space camera",
    deviceType: "Other Public Camera",
    deploymentStatus: "Cancelled",
    description: "Fictional cancelled deployment fixture; it does not create a map marker.",
    sources: [demoDeploymentSource],
    timeline: [],
  },
];