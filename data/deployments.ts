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
  initialFiscalYearCost?: string;
  annualRecurringCost?: string;
  retentionPolicy?: string;
  description?: string;
  sources: DeviceSource[];
  timeline: TimelineEvent[];
}

export const deployments: Deployment[] = [
  {
    id: "pitt-sheriff-flock-alpr",
    agency: "Pitt County Sheriff's Office",
    jurisdiction: "Pitt County, North Carolina",
    county: "Pitt",
    technology: "Automated License Plate Recognition (ALPR)",
    manufacturer: "Flock Safety",
    deviceType: "ALPR / License Plate Reader",
    deploymentStatus: "Active",
    approvalDate: "2025-06-02",
    implementationDate: "2025-12",
    documentedCost: "$199,500",
    initialFiscalYearCost: "$109,500",
    annualRecurringCost: "$90,000",
    description:
      "Pitt County approved a sole-source purchase of Flock Safety cameras for the Sheriff's Office in June 2025. Public reporting states the system was implemented in December 2025.",
    sources: [
      {
        title: "June 2, 2025 Board of Commissioners Agenda",
        publisher: "Pitt County Board of Commissioners",
        url: "https://www.pittcountync.gov/AgendaCenter/ViewFile/ArchivedAgenda/_06022025-347",
        sourceType: "Government record",
      },
      {
        title: "Pitt County surveillance cameras aid investigation into stolen U-Haul van",
        publisher: "WITN",
        url: "https://www.witn.com/2026/02/18/pitt-county-surveillance-cameras-aid-investigation-into-stolen-u-haul-van/",
        publicationDate: "2026-02-18",
        sourceType: "News report",
      },
    ],
    timeline: [],
  },
  {
    id: "winterville-police-flock-alpr",
    agency: "Winterville Police Department",
    jurisdiction: "Winterville, North Carolina",
    county: "Pitt",
    municipality: "Winterville",
    technology: "Automated License Plate Recognition",
    manufacturer: "Flock Safety",
    deviceType: "ALPR / License Plate Reader",
    numberOfDevices: 6,
    deploymentStatus: "Active",
    sources: [
      {
        title: "Atlas of Surveillance",
        publisher: "Electronic Frontier Foundation",
        url: "https://atlasofsurveillance.org/",
        sourceType: "Public data atlas",
      },
    ],
    timeline: [],
  },
  {
    id: "greenville-police-flock-alpr-cancelled",
    agency: "Greenville Police Department",
    jurisdiction: "Greenville, North Carolina",
    county: "Pitt",
    municipality: "Greenville",
    technology: "Automated License Plate Recognition",
    manufacturer: "Flock Safety",
    deviceType: "ALPR / License Plate Reader",
    numberOfDevices: 10,
    deploymentStatus: "Cancelled",
    description:
      "Greenville Police Department announced plans for ten Flock Safety cameras in 2026 but subsequently cancelled the planned implementation following community feedback.",
    sources: [
      {
        title: "Greenville Police drop plans to install new Flock cameras",
        publisher: "WITN",
        url: "https://www.witn.com/2026/08/28/greenville-police-drop-plans-install-new-flock-cameras/",
        publicationDate: "2026-08-28",
        sourceType: "News report",
      },
    ],
    timeline: [],
  },
];
