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

export const devices: Device[] = [
  {
    id: "pitt-grimesland-community-alpr-01",
    name: "Grimesland Community-Mapped ALPR",
    deviceType: "ALPR / License Plate Reader",
    technology: "Automated License Plate Recognition",
    manufacturer: "Flock Safety",
    operator: "Not publicly documented",
    agency: "Not publicly documented",
    county: "Pitt",
    municipality: "Grimesland",
    latitude: 35.5638,
    longitude: -77.1923,
    direction: "267 degrees",
    verificationStatus: "Community reported",
    locationPrecision: "Approximate",
    deploymentStatus: "Status unknown",
    operatorConfidence: "Unknown",
    description:
      "A community-mapped Flock Safety ALPR location reported through public mapping data. The operating agency has not been established by the cited source.",
    sources: [
      {
        title: "Grimesland Surveillance Cameras & ALPR Map",
        publisher: "MyTownView / community surveillance mapping",
        url: "https://mytownview.com/north-carolina/pitt/grimesland/community/surveillance",
        sourceType: "Community mapping",
      },
    ],
    timeline: [],
  },
];

export const categoryColors: Record<DeviceType, string> = {
  "ALPR / License Plate Reader": "#e66b3d",
  "Traffic Camera": "#2c8c99",
  "Automated Enforcement": "#b2476f",
  "Other Public Camera": "#5e668f",
};
