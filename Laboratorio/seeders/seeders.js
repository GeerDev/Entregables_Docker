const classes = [
  {
    name: "Contenedores I",
    instructor: "Gisela Torres",
    startDate: new Date("2025-10-17T18:00:00Z"),
    endDate: new Date("2025-10-17T20:00:00Z"),
    duration: 2,
    level: "Beginner"
  },
  {
    name: "Contenedores II",
    instructor: "Gisela Torres",
    startDate: new Date("2025-10-24T18:00:00Z"),
    endDate: new Date("2025-10-24T20:00:00Z"),
    duration: 2,
    level: "Beginner"
  },
  {
    name: "Contenedores III",
    instructor: "Gisela Torres",
    startDate: new Date("2025-10-31T18:00:00Z"),
    endDate: new Date("2025-10-31T20:00:00Z"),
    duration: 2,
    level: "Beginner"
  },
  {
    name: "Contenedores IV",
    instructor: "Gisela Torres",
    startDate: new Date("2025-11-07T18:00:00Z"),
    endDate: new Date("2025-11-07T20:00:00Z"),
    duration: 2,
    level: "Beginner"
  },
  {
    name: "Contenedores V",
    instructor: "Gisela Torres",
    startDate: new Date("2025-11-14T18:00:00Z"),
    endDate: new Date("2025-11-14T20:00:00Z"),
    duration: 2,
    level: "Beginner"
  },
  {
    name: "Contenedores VI",
    instructor: "Gisela Torres",
    startDate: new Date("2025-11-21T18:00:00Z"),
    endDate: new Date("2025-11-21T20:00:00Z"),
    duration: 2,
    level: "Beginner"
  },
  {
    name: "Azure Web Services I",
    instructor: "Gisela Torres",
    startDate: new Date("2026-02-20T18:00:00Z"),
    endDate: new Date("2026-02-20T20:00:00Z"),
    duration: 2,
    level: "Beginner"
  },
  {
    name: "Azure Web Services II",
    instructor: "Gisela Torres",
    startDate: new Date("2026-02-27T18:00:00Z"),
    endDate: new Date("2026-02-27T20:00:00Z"),
    duration: 2,
    level: "Beginner"
  },
  {
    name: "Kubernetes AKS",
    instructor: "Gisela Torres",
    startDate: new Date("2026-03-13T18:00:00Z"),
    endDate: new Date("2026-03-13T20:00:00Z"),
    duration: 2,
    level: "Beginner"
  },
  {
    name: "SESIÓN IA I",
    instructor: "Gisela Torres",
    startDate: new Date("2026-04-17T18:00:00Z"),
    endDate: new Date("2026-04-17T20:00:00Z"),
    duration: 2,
    level: "Beginner"
  },
  {
    name: "SESIÓN IA II",
    instructor: "Gisela Torres",
    startDate: new Date("2026-04-24T18:00:00Z"),
    endDate: new Date("2026-04-24T20:00:00Z"),
    duration: 2,
    level: "Beginner"
  },
  {
    name: "SESIÓN IA III",
    instructor: "Gisela Torres",
    startDate: new Date("2026-05-01T18:00:00Z"),
    endDate: new Date("2026-05-01T20:00:00Z"),
    duration: 2,
    level: "Beginner"
  }
];

// ---- Stack Node.js → ClassesDb ----
let nodeDb = db.getSiblingDB('ClassesDb');
let nodeCount = nodeDb.Classes.countDocuments();
if (nodeCount === 0) {
  nodeDb.Classes.insertMany(classes);
  print('✅ [Node Stack]  ClassesDb sembrada con ' + classes.length + ' clases.');
} else {
  print('ℹ️  [Node Stack]  ClassesDb ya tiene ' + nodeCount + ' clases. Seeder omitido.');
}

// ---- Stack .NET → LemoncodeCourseDb ----
let dotnetDb = db.getSiblingDB('LemoncodeCourseDb');
let dotnetCount = dotnetDb.Classes.countDocuments();
if (dotnetCount === 0) {
  dotnetDb.Classes.insertMany(classes);
  print('✅ [.NET Stack]   LemoncodeCourseDb sembrada con ' + classes.length + ' clases.');
} else {
  print('ℹ️  [.NET Stack]   LemoncodeCourseDb ya tiene ' + dotnetCount + ' clases. Seeder omitido.');
}
