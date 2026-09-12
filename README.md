# Virelix Transparency Project

The Virelix Transparency Project is an open-source public-interest mapping application for documenting publicly available information about government camera and surveillance technology. The first geographic area is Pitt County, North Carolina.

This is an independent project by Virelix Technologies LLC. It does not imply affiliation with Pitt County, law enforcement, NCDOT, camera manufacturers, or any private surveillance company.

## What the map documents

The map is designed to present sourced public records about ALPR/license plate readers, traffic cameras, automated enforcement, and other public cameras. Every factual record should be traceable to one or more legitimate public sources. Uncertainty and location precision are shown explicitly.

The current build contains one community-reported physical device and three documented deployment records for Pitt County. Map coverage is incomplete, and absence of a marker does not indicate absence of a device.

## Run locally

Requirements: Node.js and npm.

```bash
npm install
npm run dev
```

Open http://localhost:3000. Other useful checks are `npm run lint`, `npm run typecheck`, and `npm run build`.

## Project layout

- `app/` contains the Next.js application shell and MapLibre interface.
- `data/` contains the reusable TypeScript models and static device, deployment, agency, and timeline data files.
- `METHODOLOGY.md` describes verification and sourcing standards.
- `DATA_POLICY.md` describes information the project will not publish.
- `CONTRIBUTING.md` describes how to submit corrections and sourced records.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Contributions should provide legitimate public sources and identify uncertainty. Corrections are encouraged.

## License

This project is released under the MIT License. See [LICENSE](LICENSE).
