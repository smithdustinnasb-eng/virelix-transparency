# NCDOT Pitt County CCTV Research Notes

## Result

The official NCDOT ITS Devices layer returned **1,402 statewide records whose `Name` contains `CCTV`**. After a point-in-polygon check against the official NCDOT Pitt County boundary, **0 CCTV-named records were located in Pitt County**.

No records were added to the research result as traffic cameras. The research output is intentionally an empty `records` array. This avoids relabeling NCDOT equipment records as cameras when the service does not provide a dedicated CCTV camera `DeviceType`.

## Official sources

- NCDOT ITS Devices layer 0: https://gis11.services.ncdot.gov/arcgis/rest/services/NCDOT_ITSDevices/NCDOT_ITSDevices/MapServer/0
- NCDOT ITS Devices query endpoint: https://gis11.services.ncdot.gov/arcgis/rest/services/NCDOT_ITSDevices/NCDOT_ITSDevices/MapServer/0/query
- Official NCDOT county boundary layer: https://gis11.services.ncdot.gov/arcgis/rest/services/NCDOT_CountyBdy_Poly/MapServer/0
- Official Pitt County boundary query: `UpperCountyName = 'PITT'`, returned as GeoJSON with `outSR=4326`

## Schema inspection

The exact layer fields returned by the NCDOT layer metadata are:

- `ObjectID` (`esriFieldTypeOID`)
- `Name` (`esriFieldTypeString`)
- `LocationDescr` (`esriFieldTypeString`)
- `Lat` (`esriFieldTypeDouble`)
- `Long` (`esriFieldTypeDouble`)
- `DeviceType` (`esriFieldTypeString`)
- `GEOM` (`esriFieldTypeGeometry`)
- `GDB_GEOMATTR_DATA` (`esriFieldTypeBlob`)

The layer geometry is point geometry and its source spatial reference is EPSG:4326. The `Lat` and `Long` fields are present. `Name` and `LocationDescr` are present. No county field, municipality field, ownership field, operator field, publication-date field, or update-date field is present in the layer schema.

The layer metadata does not provide a dedicated `CCTV` value in `DeviceType`. The live `DeviceType` values are:

- `Cellular Modem`
- `Conflict Monitor`
- `Decoder`
- `DMS`
- `Encoder`
- `PC`
- `Printer`
- `Radio`
- `RWIS`
- `Server`
- `Signal Controller`
- `Switch`
- `Terminal Server`
- `UPS`
- `Vehicle Detector`
- `VPU`

## Query and camera interpretation

The statewide candidate query was:

```text
where=Name LIKE '%CCTV%'
outFields=ObjectID,Name,LocationDescr,DeviceType,Lat,Long
returnGeometry=true
outSR=4326
f=geojson
```

The query returned 1,402 records. Their `DeviceType` distribution was:

| DeviceType | CCTV-named records |
| --- | ---: |
| Encoder | 1,064 |
| Switch | 291 |
| Signal Controller | 5 |
| Radio | 7 |
| Conflict Monitor | 2 |
| Server | 6 |
| Decoder | 20 |
| Cellular Modem | 7 |

Because the service does not expose a camera-specific `DeviceType`, and the project rules prohibit adding encoders, decoders, switches, vehicle detectors, DMS signs, or unrelated ITS equipment as traffic cameras, no `DeviceType` value was accepted as a standalone CCTV camera type. CCTV-named records were retained as statewide candidate counts only.

## Pitt County filtering

The layer has no county field, so county membership was not inferred from city names or descriptions. The official NCDOT `NCDOT_CountyBdy_Poly` layer was queried for `UpperCountyName = 'PITT'`, returned in WGS84/EPSG:4326, and used for a point-in-polygon check against the original NCDOT point geometry.

The complete layer contained 7,679 point records. The boundary check found 5 NCDOT points in Pitt County:

| ObjectID | Name | DeviceType | LocationDescr |
| ---: | --- | --- | --- |
| 6289 | FUEL | Server | 1005 EDWARDS DRIVE |
| 6293 | FUEL | Server | 2815 E. 10TH STREET |
| 6310 | Greenville Byp Exit 113 NC-102 | Encoder | Greenville Byp Exit 113 NC-102 |
| 6311 | Greenville Byp Exit 118 ALT264/US-13 | Encoder | Greenville Byp Exit 118 ALT264/US-13 |
| 6312 | Greenville Byp Exit 123 US 264 | Encoder | Greenville Byp Exit 123 US 264 |

None of these five names contains `CCTV`. The 3 `Encoder` records were excluded because the service does not identify them as CCTV cameras and the project rules prohibit importing encoder records as traffic-camera records. The 2 `Server` records were excluded as unrelated ITS equipment.

As a result, the final Pitt County CCTV count is **0**.

## Exclusions and uncertainties

- No NCDOT record was added as a Pitt County CCTV device.
- The 1,402 statewide CCTV-named records were not treated as camera records because the service associates them with equipment categories rather than a dedicated camera type.
- Five points fall inside the official Pitt County boundary, but none are CCTV-named; three are encoders and two are servers.
- No operator or owner field exists in the NCDOT schema, so no operator attribution was added.
- No municipality was inferred from a nearest city or location description.
- No coordinates were altered, and no direction, model, manufacturer, field of view, recording capability, ALPR status, retention policy, or coverage cone was inferred.
- The layer metadata did not expose a publication or last-update date.

## Output

`research/ncdot-pitt-county-cctv.json` contains the official source details, query interpretation, counts, and an empty `records` array because no qualifying Pitt County CCTV records were returned.
