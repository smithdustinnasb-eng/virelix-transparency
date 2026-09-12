"use client";

import "maplibre-gl/dist/maplibre-gl.css";
import {
  ChevronDown,
  CircleHelp,
  ExternalLink,
  GitBranch,
  Layers3,
  Menu,
  RadioTower,
  X,
} from "lucide-react";
import * as maplibregl from "maplibre-gl";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  categoryColors,
  demoDevices,
  deviceTypes,
  type Device,
  type DeviceType,
} from "../data/devices";
import { demoDeployments } from "../data/deployments";

const NOT_DOCUMENTED = "Not publicly documented";

const mapStyle = {
  version: 8 as const,
  sources: {
    openstreetmap: {
      type: "raster" as const,
      tiles: ["https://tile.openstreetmap.org/{z}/{x}/{y}.png"],
      tileSize: 256,
      attribution: "© OpenStreetMap contributors",
    },
  },
  layers: [{ id: "openstreetmap", type: "raster" as const, source: "openstreetmap" }],
};

function formatDate(date?: string) {
  if (!date) return NOT_DOCUMENTED;
  return new Intl.DateTimeFormat("en-US", { dateStyle: "medium" }).format(
    new Date(`${date}T12:00:00`),
  );
}

function getDeviceTitle(device: Device) {
  if (device.deviceType !== "ALPR / License Plate Reader") return device.name;
  return device.manufacturer ? `${device.manufacturer} ALPR Camera` : "ALPR Camera";
}

function getDeviceLabel(device: Device) {
  const title = getDeviceTitle(device);
  return device.model ? `${title}, model ${device.model}` : title;
}

function InfoRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="border-b border-line/70 py-2.5 last:border-0">
      <dt className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">{label}</dt>
      <dd className="mt-1 text-sm leading-5 text-ink">{value || NOT_DOCUMENTED}</dd>
    </div>
  );
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return <h3 className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-muted">{children}</h3>;
}

function DeviceDetails({ device, onClose }: { device: Device; onClose: () => void }) {
  return (
    <aside className="absolute inset-x-0 bottom-0 z-20 flex h-[78vh] w-full flex-col rounded-t-xl border-t border-line bg-panel shadow-[0_-10px_35px_#1d262912] md:inset-y-0 md:bottom-auto md:left-auto md:right-0 md:h-auto md:max-w-[430px] md:rounded-none md:border-l md:border-t-0 md:shadow-[-10px_0_35px_#1d262912] md:w-[430px]">
      <div className="flex items-start justify-between border-b border-line px-5 py-5">
        <div className="pr-4">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded-sm bg-[#f3e1d9] px-2 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#a54428]">Demo record</span>
            <span className="text-[11px] font-medium text-muted">{device.id}</span>
          </div>
          <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink">{getDeviceTitle(device)}</h2>
          <p className="mt-1 text-sm text-muted">{device.deviceType}</p>
          {device.deviceType === "ALPR / License Plate Reader" && <p className="mt-2 text-xs text-muted">Manufacturer: {device.manufacturer || NOT_DOCUMENTED} · Model: {device.model || NOT_DOCUMENTED}</p>}
        </div>
        <button aria-label="Close device details" className="rounded-md p-2 text-muted hover:bg-paper hover:text-ink" onClick={onClose}><X size={18} /></button>
      </div>
      <div className="flex-1 overflow-y-auto px-5 py-5">
        <div className="mb-6 flex flex-wrap gap-2">
          <span className="rounded-full border border-[#d8a28e] bg-[#fff6f1] px-3 py-1 text-xs font-semibold text-[#a54428]">{device.verificationStatus}</span>
          <span className="rounded-full border border-line bg-paper px-3 py-1 text-xs text-muted">{device.locationPrecision}</span>
        </div>

        <section className="mb-7"><SectionHeading>At a glance</SectionHeading><dl>
          <InfoRow label="Location" value={`${device.municipality || NOT_DOCUMENTED}, ${device.county}`} />
          <InfoRow label="Address / description" value={device.locationDescription} />
          <InfoRow label="Operator" value={device.operator} />
          <InfoRow label="Agency" value={device.agency} />
          <InfoRow label="Deployment status" value={device.deploymentStatus} />
          <InfoRow label="Operator confidence" value={device.operatorConfidence} />
          <InfoRow label="Deployment relationship" value={device.deploymentId || "No linked deployment record"} />
          <InfoRow label="Technology" value={device.technology} />
          <InfoRow label="Manufacturer / model" value={device.manufacturer ? `${device.manufacturer} / ${device.model || NOT_DOCUMENTED}` : undefined} />
          <InfoRow label="Last verified" value={formatDate(device.lastVerified)} />
        </dl></section>

        <section className="mb-7"><SectionHeading>What it does</SectionHeading><p className="text-sm leading-6 text-ink">{device.description || NOT_DOCUMENTED}</p></section>

        <section className="mb-7"><div className="mb-3 flex items-center justify-between"><SectionHeading>Coverage</SectionHeading><span className="text-[10px] font-medium text-[#a54428]">Informational only</span></div><dl>
          <InfoRow label="Published detection range" value={device.publishedRange} />
          <InfoRow label="Published field width" value={device.publishedFieldWidth} />
          <InfoRow label="Published lane coverage" value={device.publishedLaneCoverage} />
          <InfoRow label="Camera direction / orientation" value={device.direction} />
          <InfoRow label="Coverage confidence" value={device.coverageConfidence} />
        </dl><div className="mt-3 border-l-2 border-[#d56339] bg-[#fff6f1] px-3 py-2.5 text-xs leading-5 text-[#70402f]">Coverage visualization represents published specifications and available public information. It is not a measurement of the actual installation.</div></section>

        <section className="mb-7"><SectionHeading>Public cost</SectionHeading><p className="text-sm leading-6 text-ink">{device.documentedCost || NOT_DOCUMENTED}</p></section>
        <section className="mb-7"><SectionHeading>Data &amp; policy</SectionHeading><dl><InfoRow label="Retention period" value={device.retentionPolicy} /><InfoRow label="Data-sharing policy" /></dl></section>

        <section className="mb-7"><SectionHeading>Evidence</SectionHeading><div className="space-y-3">{device.sources.map((source) => <a className="group block border border-line bg-paper p-3 transition-colors hover:border-[#d56339]" href={source.url} key={source.title} target="_blank" rel="noreferrer"><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-semibold text-ink group-hover:text-[#a54428]">{source.title}</p><p className="mt-1 text-xs text-muted">{source.publisher} · {formatDate(source.publicationDate)}</p></div><ExternalLink size={14} className="shrink-0 text-muted" /></div><p className="mt-2 text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">{source.sourceType}</p></a>)}</div></section>

        <section><SectionHeading>Timeline</SectionHeading><div className="relative ml-1 border-l border-line pl-5">{device.timeline.map((event) => <div className="relative mb-5 last:mb-0" key={`${event.date}-${event.title}`}><span className="absolute -left-[25px] top-1 h-2.5 w-2.5 rounded-full border-2 border-panel bg-[#d56339] ring-1 ring-[#d56339]" /><p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-muted">{formatDate(event.date)}</p><p className="mt-1 text-sm font-semibold text-ink">{event.title}</p><p className="mt-1 text-xs leading-5 text-muted">{event.description}</p><p className="mt-1 text-[11px] text-[#a54428]">Source: {event.source}</p></div>)}</div></section>
      </div>
    </aside>
  );
}

export default function MapShell() {
  const mapElement = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);
  const markers = useRef<maplibregl.Marker[]>([]);
  const [mapReady, setMapReady] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [enabledTypes, setEnabledTypes] = useState<Record<DeviceType, boolean>>(() => Object.fromEntries(deviceTypes.map((type) => [type, true])) as Record<DeviceType, boolean>);
  const selectedDevice = demoDevices.find((device) => device.id === selectedId) || null;
  const visibleDevices = useMemo(() => demoDevices.filter((device) => enabledTypes[device.deviceType]), [enabledTypes]);
  const confirmedMappedDevices = demoDevices.filter((device) => device.verificationStatus === "Confirmed" || device.verificationStatus === "Public-record confirmed").length;

  useEffect(() => {
    if (!mapElement.current) return;
    const mapInstance = new maplibregl.Map({
      container: mapElement.current,
      style: mapStyle,
      center: [-77.37, 35.59],
      zoom: 10.4,
      minZoom: 8,
      maxZoom: 17,
    });
    map.current = mapInstance;
    setMapReady(true);
    mapInstance.addControl(new maplibregl.NavigationControl({ showCompass: false }), "bottom-right");
    mapInstance.on("load", () => mapInstance.resize());
    mapInstance.on("error", (event) => console.error("MapLibre error", event.error));
    requestAnimationFrame(() => mapInstance.resize());
    return () => { mapInstance.remove(); map.current = null; setMapReady(false); };
  }, []);

  useEffect(() => {
    if (!mapReady || !map.current) return;
    markers.current.forEach((marker) => marker.remove());
    markers.current = visibleDevices.map((device) => {
      const markerElement = document.createElement("button");
      markerElement.type = "button";
      markerElement.ariaLabel = `View ${getDeviceLabel(device)}`;
      markerElement.className = "map-marker";
      markerElement.style.backgroundColor = categoryColors[device.deviceType];
      if (selectedId === device.id) markerElement.classList.add("selected");
      markerElement.addEventListener("click", () => setSelectedId(device.id));
      return new maplibregl.Marker({ element: markerElement }).setLngLat([device.longitude, device.latitude]).addTo(map.current!);
    });
  }, [mapReady, visibleDevices, selectedId]);

  useEffect(() => {
    if (!mapReady || !map.current) return;
    const mapInstance = map.current;
    const sourceId = "coverage-demo";
    if (mapInstance.getLayer("coverage-fill")) mapInstance.removeLayer("coverage-fill");
    if (mapInstance.getLayer("coverage-line")) mapInstance.removeLayer("coverage-line");
    if (mapInstance.getSource(sourceId)) mapInstance.removeSource(sourceId);
    if (!selectedDevice) return;
    const points = Array.from({ length: 25 }, (_, index) => {
      const angle = -75 + (150 * index) / 24;
      const distance = 0.008;
      const longitude = selectedDevice.longitude + Math.cos((angle * Math.PI) / 180) * distance;
      const latitude = selectedDevice.latitude + Math.sin((angle * Math.PI) / 180) * distance;
      return [longitude, latitude] as [number, number];
    });
    const geometry: GeoJSON.Feature<GeoJSON.Polygon> = { type: "Feature", properties: {}, geometry: { type: "Polygon", coordinates: [[[selectedDevice.longitude, selectedDevice.latitude], ...points, [selectedDevice.longitude, selectedDevice.latitude]]] } };
    mapInstance.addSource(sourceId, { type: "geojson", data: geometry });
    mapInstance.addLayer({ id: "coverage-fill", type: "fill", source: sourceId, paint: { "fill-color": categoryColors[selectedDevice.deviceType], "fill-opacity": 0.13 } });
    mapInstance.addLayer({ id: "coverage-line", type: "line", source: sourceId, paint: { "line-color": categoryColors[selectedDevice.deviceType], "line-opacity": 0.55, "line-width": 1.5, "line-dasharray": [2, 2] } });
  }, [mapReady, selectedDevice]);

  const toggleType = (type: DeviceType) => setEnabledTypes((current) => ({ ...current, [type]: !current[type] }));

  return (
    <main className="flex h-screen min-h-[620px] flex-col overflow-hidden bg-paper">
      <header className="relative z-30 flex h-[66px] shrink-0 items-center justify-between border-b border-line bg-panel px-4 md:px-7">
        <div className="flex items-center gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-md bg-[#243d3d] text-[#f3f0ea]"><RadioTower size={18} /></div><div><p className="text-[13px] font-bold tracking-[-0.01em] text-ink">Virelix Transparency Project</p><p className="text-[10px] uppercase tracking-[0.14em] text-muted">Public technology &amp; surveillance data</p></div></div>
        <nav className="hidden items-center gap-6 text-xs font-semibold text-muted md:flex"><a className="hover:text-ink" href="/METHODOLOGY.md">Methodology</a><a className="hover:text-ink" href="/README.md">About</a><a className="flex items-center gap-1.5 hover:text-ink" href="https://github.com/virelix-transparency/project" target="_blank" rel="noreferrer"><GitBranch size={14} /> GitHub</a></nav>
        <button aria-label="Open navigation" className="rounded-md p-2 text-muted md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>{mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}</button>
        {mobileMenuOpen && <nav className="absolute right-4 top-14 flex w-44 flex-col gap-4 border border-line bg-panel p-4 text-sm font-semibold shadow-lg md:hidden"><a href="/METHODOLOGY.md">Methodology</a><a href="/README.md">About</a><a href="https://github.com/virelix-transparency/project">GitHub</a></nav>}
      </header>
      <div className="relative min-h-0 flex-1">
        <div className="absolute inset-0 h-full w-full">
          <div ref={mapElement} className="h-full w-full" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 top-0 z-10 h-28 bg-gradient-to-b from-[#1d26291b] to-transparent" />
        <div className="absolute left-4 top-4 z-10 flex max-w-[calc(100%-32px)] flex-col gap-2 md:left-7 md:top-6"><div className="flex items-center gap-2"><button className="pointer-events-auto flex items-center gap-2 rounded-md border border-line bg-panel px-3 py-2 text-xs font-bold shadow-sm hover:border-[#d56339]" onClick={() => setFiltersOpen(!filtersOpen)}><Layers3 size={15} /> Filters <span className="rounded-full bg-[#243d3d] px-1.5 py-0.5 text-[10px] text-white">{visibleDevices.length}</span><ChevronDown size={14} className={filtersOpen ? "rotate-180 transition-transform" : "transition-transform"} /></button><button className="pointer-events-auto hidden rounded-md border border-line bg-panel p-2 text-muted shadow-sm hover:text-ink sm:block" aria-label="Map help"><CircleHelp size={16} /></button></div>{filtersOpen && <div className="pointer-events-auto w-72 border border-line bg-panel p-4 shadow-lg"><p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">Device categories</p>{deviceTypes.map((type) => <label className="mb-3 flex cursor-pointer items-center gap-3 last:mb-0" key={type}><input checked={enabledTypes[type]} onChange={() => toggleType(type)} type="checkbox" className="h-4 w-4 accent-[#d56339]" /><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: categoryColors[type] }} /><span className="text-xs text-ink">{type}</span></label>)}</div>}</div>
        <div className="absolute bottom-5 left-4 z-10 hidden w-[245px] border border-line bg-panel/95 p-4 shadow-sm backdrop-blur-sm md:left-7 md:block"><p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-muted">Map legend</p>{deviceTypes.map((type) => <div className="mb-2 flex items-center gap-2.5 last:mb-0" key={type}><span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: categoryColors[type] }} /><span className="text-xs text-ink">{type}</span></div>)}</div>
        <div className="absolute bottom-5 right-4 z-10 w-[220px] border border-line bg-panel/95 p-4 shadow-sm backdrop-blur-sm md:right-7"><div className="mb-2 flex items-center justify-between"><p className="text-[10px] font-bold uppercase tracking-[0.14em] text-muted">Pitt County</p><span className="rounded-sm bg-[#f3e1d9] px-1.5 py-1 text-[9px] font-bold tracking-[0.1em] text-[#a54428]">DEMO DATA</span></div><p className="text-2xl font-semibold tracking-[-0.04em] text-ink">{demoDevices.length}</p><p className="text-xs text-muted">fictional demo fixtures</p><div className="mt-3 grid grid-cols-2 gap-y-2 border-t border-line pt-3 text-[11px]"><span className="text-muted">Deployments</span><span className="text-right font-semibold">{demoDeployments.length} demo</span><span className="text-muted">Physical devices</span><span className="text-right font-semibold">{demoDevices.length} mapped / {confirmedMappedDevices} confirmed</span><span className="text-muted">Planned</span><span className="text-right font-semibold">{demoDeployments.filter((deployment) => deployment.deploymentStatus === "Planned").length} demo</span><span className="text-muted">Cancelled</span><span className="text-right font-semibold">{demoDeployments.filter((deployment) => deployment.deploymentStatus === "Cancelled").length} demo</span></div></div>
        <div className="absolute left-1/2 top-4 z-10 -translate-x-1/2 border border-[#d8a28e] bg-[#fff6f1] px-3 py-2 text-center text-[10px] font-semibold tracking-[0.02em] text-[#8c422d] shadow-sm md:top-6">DEVELOPMENT PREVIEW · ALL RECORDS ARE FICTIONAL</div>
        {selectedDevice && <DeviceDetails device={selectedDevice} onClose={() => setSelectedId(null)} />}
      </div>
      <footer className="z-30 flex h-8 shrink-0 items-center justify-between border-t border-line bg-panel px-4 text-[10px] text-muted md:px-7"><span>An open-source public data project by Virelix Technologies LLC.</span><span className="hidden sm:inline">Pitt County, North Carolina · Demo fixtures only</span></footer>
    </main>
  );
}