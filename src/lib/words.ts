// Curated list of 5-letter STEM words for daily puzzles
// Categories: Biology, Chemistry, Physics, Math, Computer Science, Engineering, Medicine

export const STEM_WORDS: string[] = [
  // Biology
  "genus", "cells", "genes", "flora", "fauna", "biome", "clone", "fungi",
  "larva", "liver", "lymph", "mucus", "nerve", "organ", "ovary", "plant",
  "renal", "serum", "skull", "spine", "spore", "stems", "sweat", "tidal",
  "trait", "tumor", "veins", "virus", "yeast",
  // Chemistry
  "acids", "alloy", "argon", "atoms", "bonds", "boron", "decay", "ether",
  "flask", "gases", "ionic", "lipid", "molar", "nylon", "oxide", "ozone",
  "phase", "polar", "radon", "redox", "resin", "salts", "solid", "steam",
  "steel", "toxic", "xenon",
  // Physics
  "angle", "beams", "delta", "diode", "field", "focal", "force", "gamma",
  "gauss", "hertz", "joule", "laser", "light", "maser", "meter", "noise",
  "orbit", "phase", "power", "prism", "pulse", "quark", "radar", "ratio",
  "solar", "sonic", "tesla", "theta", "tidal", "torso", "unity", "volts",
  "watts", "waves",
  // Math
  "axiom", "cubic", "curve", "digit", "equal", "euler", "graph", "limit",
  "log10", "logic", "minus", "plane", "prime", "proof", "range", "roots",
  "sigma", "slope", "tally", "unity", "value", "wedge", "zeros",
  // Computer Science
  "array", "ascii", "bytes", "cache", "class", "cloud", "codes", "cycle",
  "debug", "email", "fiber", "frame", "index", "input", "linux", "loops",
  "model", "modem", "mouse", "nodes", "pixel", "proxy", "query", "queue",
  "regex", "route", "stack", "token", "tuple",
  // Engineering
  "alloy", "beams", "bolts", "cable", "crane", "diode", "drain", "drive",
  "fiber", "fluid", "gauge", "gears", "hinge", "lever", "motor", "pivot",
  "press", "pumps", "relay", "rivet", "rotor", "shaft", "shear", "spool",
  "strut", "valve", "welds",
  // Medicine
  "blood", "brain", "colon", "doses", "femur", "gland", "heart", "ileum",
  "joint", "labor", "nasal", "nurse", "pulse", "renal", "sinus", "tibia",
  "ulnar", "venal", "viral", "wound", "x-ray",
];

// Deduplicated and filtered to exactly 5 alpha characters
export const VALID_STEM_WORDS: string[] = [
  ...new Set(
    STEM_WORDS
      .map(w => w.toLowerCase())
      .filter(w => /^[a-z]{5}$/.test(w))
  )
];

// A broader set of valid 5-letter words for guess validation
// In production, you'd use a full dictionary API; this is for offline validation
export const VALID_GUESSES: Set<string> = new Set(VALID_STEM_WORDS);
