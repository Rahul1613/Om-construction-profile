export interface EquipmentItem {
  id: string;
  name: string;
  description: string;
  count: number;
  category: "Heavy Machinery" | "Site Logistics" | "Power & Electrical" | "Metal & Fabrication";
}

export const equipmentData: EquipmentItem[] = [
  { id: "cranes", name: "Cranes", description: "Hydraulic and crawler cranes for lifting structural steel, precast elements, and heavy machinery on large industrial sites.", count: 4, category: "Heavy Machinery" },
  { id: "poclain", name: "Poclain / Hydraulic Excavators", description: "High-reach hydraulic excavators for earthwork, mass excavation, and foundation trenching operations.", count: 6, category: "Heavy Machinery" },
  { id: "jcb", name: "JCB / Backhoe Loaders", description: "Multi-purpose construction machinery for site leveling, loading, and shallow excavation works.", count: 6, category: "Heavy Machinery" },
  { id: "dozer", name: "Dozer / Bulldozers", description: "Track-mounted earthmoving equipment for land clearing, grading, and site preparation on large-footprint projects.", count: 2, category: "Heavy Machinery" },
  { id: "tankers", name: "Water Tankers", description: "Site water supply and dust suppression tankers for concrete curing, road watering, and site management.", count: 4, category: "Site Logistics" },
  { id: "trucks", name: "Tipper Trucks", description: "High-capacity tipper trucks for earth disposal, aggregate transport, and material delivery across site areas.", count: 8, category: "Site Logistics" },
  { id: "transit", name: "Transit Mixers", description: "Ready-mix concrete transport mixers ensuring consistent concrete quality from batching plant to pour point.", count: 6, category: "Site Logistics" },
  { id: "pump", name: "Concrete Pumps", description: "Mobile concrete pump trucks for high-reach and long-horizontal pours in power plant and substation foundations.", count: 3, category: "Site Logistics" },
  { id: "concrete-mixer", name: "Concrete Mixers", description: "Diesel and electric-powered site mixers for batching concrete at remote project locations.", count: 8, category: "Site Logistics" },
  { id: "vibrators", name: "Concrete Vibrators", description: "Internal and external vibrators for ensuring proper compaction and void-free pours in structural concrete.", count: 16, category: "Site Logistics" },
  { id: "generator", name: "DG Sets / Generators", description: "Diesel generator sets from 15 kVA to 250 kVA for continuous site power supply in remote locations.", count: 10, category: "Power & Electrical" },
  { id: "welder", name: "Welding Sets", description: "MIG, TIG, and Arc welding machines for structural steel fabrication, shuttering repair, and metal works.", count: 20, category: "Metal & Fabrication" },
  { id: "cutting", name: "Cutting & Grinding Machines", description: "Angle grinders, bench grinders, and metal cutting machines for precision steel work and shuttering fabrication.", count: 15, category: "Metal & Fabrication" },
  { id: "formwork", name: "Formwork & Shuttering", description: "Modular steel and aluminum formwork systems for column, wall, and slab construction in power plant structures.", count: 1, category: "Metal & Fabrication" },
  { id: "compactor", name: "Plate Compactors / Rammers", description: "Soil compaction equipment for foundation bed preparation and backfill compaction to required density.", count: 8, category: "Heavy Machinery" },
  { id: "dewatering", name: "Dewatering Pumps", description: "Submersible and centrifugal pumps for managing groundwater in deep excavations and piling works.", count: 12, category: "Power & Electrical" },
  { id: "scaffolding", name: "Scaffolding Systems", description: "Cup-lock and frame scaffolding systems for NDCT shell construction, concreting access, and facade works.", count: 1, category: "Site Logistics" },
  { id: "surveying", name: "Surveying Instruments", description: "Total stations, auto levels, and theodolites for precision layout, alignment, and dimensional control.", count: 6, category: "Site Logistics" },
  { id: "bending", name: "Bar Bending & Cutting Machines", description: "Hydraulic rebar bending and cutting machines for on-site reinforcement fabrication.", count: 10, category: "Metal & Fabrication" },
  { id: "shotblasting", name: "Shot Blasting & Painting Equipment", description: "Surface preparation and coating systems for structural steel corrosion protection.", count: 2, category: "Metal & Fabrication" },
];
