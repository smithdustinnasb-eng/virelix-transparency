export const deviceTypes = [
  "ALPR / License Plate Reader",
  "Traffic Camera",
  "Automated Enforcement",
  "Other Public Camera",
] as const;

export type DeviceType = (typeof deviceTypes)[number];
export type VerificationStatus =
  | "Confirmed"
  | "Public-record confirmed"
  | "Community reported"
  | "Unverified";
export type LocationPrecision =
  | "Exact publicly documented"
  | "Approximate"
  | "Deployment confirmed / exact location unknown";
export type DeploymentStatus =
  | "Active"
  | "Planned"
  | "Cancelled"
  | "Removed"
  | "Status unknown";
export type OperatorConfidence = "Confirmed" | "Probable" | "Unknown";

export interface DeviceSource {
  title: string;
  publisher: string;
  url: string;
  publicationDate?: string;
  sourceType: string;
}

export interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  source: string;
}

export interface Device {
  id: string;
  name: string;
  deviceType: DeviceType;
  technology?: string;
  manufacturer?: string;
  model?: string;
  operator?: string;
  agency?: string;
  county: string;
  municipality?: string;
  latitude: number;
  longitude: number;
  locationDescription?: string;
  direction?: string;
  installationDate?: string;
  lastVerified?: string;
  verificationStatus: VerificationStatus;
  locationPrecision: LocationPrecision;
  deploymentId?: string;
  deploymentStatus: DeploymentStatus;
  operatorConfidence: OperatorConfidence;
  description?: string;
  publishedRange?: string;
  publishedFieldWidth?: string;
  publishedLaneCoverage?: string;
  coverageConfidence?: string;
  retentionPolicy?: string;
  documentedCost?: string;
  sources: DeviceSource[];
  timeline: TimelineEvent[];
}

const demoSource = {
  title: "Fictional demonstration record",
  publisher: "Virelix Transparency Project",
  url: "https://github.com/virelix-transparency/project",
  publicationDate: "2026-09-11",
  sourceType: "Development fixture",
};

export const demoDevices: Device[] = [
  {
    id: "demo-alpr-01",
    name: "Demo East 10th Street Reader",
    deviceType: "ALPR / License Plate Reader",
    technology: "Automated license plate recognition",
    manufacturer: "Fictional demo manufacturer",
    model: "DEMO-ALPR-1",
    operator: "Fictional municipal operator",
    agency: "Demo public safety agency",
    county: "Pitt County",
    municipality: "Greenville",
    latitude: 35.6121,
    longitude: -77.3664,
    locationDescription: "Fictional intersection near East 10th Street",
    direction: "Illustrative eastbound orientation",
    lastVerified: "2026-09-11",
    verificationStatus: "Unverified",
    locationPrecision: "Approximate",
    deploymentStatus: "Status unknown",
    operatorConfidence: "Unknown",
    description:
      "A fictional record used to exercise the interface. No real device or installation is represented.",
    publishedRange: "Not publicly documented",
    publishedFieldWidth: "Not publicly documented",
    publishedLaneCoverage: "Not publicly documented",
    coverageConfidence: "Informational demo only",
    retentionPolicy: "Not publicly documented",
    documentedCost: "Not publicly documented",
    sources: [demoSource],
    timeline: [
      {
        date: "2026-09-11",
        title: "Demo record added",
        description: "Fictional fixture created for UI development.",
        source: demoSource.title,
      },
    ],
  },
  {
    id: "demo-traffic-01",
    name: "Demo Memorial Drive Camera",
    deviceType: "Traffic Camera",
    technology: "Fixed traffic observation camera",
    manufacturer: "Fictional demo manufacturer",
    model: "DEMO-TRAFFIC-2",
    operator: "Fictional transportation operator",
    agency: "Demo public works agency",
    county: "Pitt County",
    municipality: "Greenville",
    latitude: 35.6047,
    longitude: -77.395,
    locationDescription: "Fictional segment of Memorial Drive",
    direction: "Illustrative north-facing orientation",
    lastVerified: "2026-09-11",
    verificationStatus: "Unverified",
    locationPrecision: "Approximate",
    deploymentStatus: "Status unknown",
    operatorConfidence: "Unknown",
    description:
      "A fictional traffic camera record included only to demonstrate selection and evidence states.",
    publishedRange: "Not publicly documented",
    publishedFieldWidth: "Not publicly documented",
    publishedLaneCoverage: "Not publicly documented",
    coverageConfidence: "Informational demo only",
    retentionPolicy: "Not publicly documented",
    documentedCost: "Not publicly documented",
    sources: [demoSource],
    timeline: [
      {
        date: "2026-09-11",
        title: "Demo record added",
        description: "Fictional fixture created for UI development.",
        source: demoSource.title,
      },
    ],
  },
  {
    id: "demo-public-01",
    name: "Demo River Road Camera",
    deviceType: "Other Public Camera",
    technology: "Fixed public-space camera",
    manufacturer: "Fictional demo manufacturer",
    model: "DEMO-CAM-3",
    operator: "Fictional public operator",
    agency: "Demo civic services agency",
    county: "Pitt County",
    municipality: "Winterville",
    latitude: 35.5295,
    longitude: -77.4018,
    locationDescription: "Fictional location along River Road",
    direction: "Not publicly documented",
    lastVerified: "2026-09-11",
    verificationStatus: "Unverified",
    locationPrecision: "Deployment confirmed / exact location unknown",
    deploymentStatus: "Status unknown",
    operatorConfidence: "Unknown",
    description:
      "A fictional record showing how a less precise location is presented without inventing detail.",
    coverageConfidence: "Informational demo only",
    retentionPolicy: "Not publicly documented",
    documentedCost: "Not publicly documented",
    sources: [demoSource],
    timeline: [
      {
        date: "2026-09-11",
        title: "Demo record added",
        description: "Fictional fixture created for UI development.",
        source: demoSource.title,
      },
    ],
  },
];

export const categoryColors: Record<DeviceType, string> = {
  "ALPR / License Plate Reader": "#e66b3d",
  "Traffic Camera": "#2c8c99",
  "Automated Enforcement": "#b2476f",
  "Other Public Camera": "#5e668f",
};