// Curated list of 5-letter STEM words for high school students
// Categories: Biology, Chemistry, Physics, Math, Computer Science, Engineering, Earth Science

export const STEM_WORDS: string[] = [
  // Biology
  "genes", "cells", "flora", "fauna", "biome", "clone", "fungi",
  "larva", "liver", "lymph", "mucus", "nerve", "organ", "ovary", "plant",
  "serum", "skull", "spine", "spore", "stems", "sweat", "trait", "tumor",
  "veins", "virus", "yeast", "blood", "brain", "colon", "femur", "gland",
  "heart", "joint", "nasal", "pulse", "sinus", "tibia", "wound", "fibre",
  "molds", "petal", "seeds", "stoma", "trunk", "toxin",
  // Chemistry
  "acids", "alloy", "argon", "atoms", "bonds", "boron", "decay", "ether",
  "flask", "gases", "ionic", "lipid", "molar", "nylon", "oxide", "ozone",
  "phase", "polar", "radon", "redox", "resin", "salts", "solid", "steam",
  "steel", "toxic", "xenon", "alkyl", "amine", "anion", "base", "cured",
  "dimer", "elute", "enols", "ester", "fermi", "halid", "inert", "ketol",
  "lyase", "metal", "monel", "oleum", "rings", "sugar", "thiol", "titre",
  "yield",
  // Physics
  "angle", "beams", "delta", "diode", "field", "focal", "force", "gamma",
  "gauss", "hertz", "joule", "laser", "light", "meter", "noise",
  "orbit", "power", "prism", "pulse", "quark", "radar", "ratio",
  "solar", "sonic", "tesla", "theta", "unity", "volts",
  "watts", "waves", "accel", "creep", "drift", "fluid", "frame", "helix",
  "inert", "lever", "magma", "ohmic", "optic", "phase", "rigid", "shear",
  "speed", "surge", "turns", "ultra", "whirl",
  // Math
  "axiom", "cubic", "curve", "digit", "equal", "euler", "graph", "limit",
  "logic", "minus", "plane", "prime", "proof", "range", "roots",
  "sigma", "slope", "tally", "value", "wedge", "zeros", "angle", "chord",
  "coeff", "cosec", "depth", "eigen", "hyper", "lemma", "locus", "modal",
  "nodes", "octal", "polar", "quota", "radii", "ratio", "sectr", "sines",
  "solve", "squar", "sums", "tangn", "union", "width",
  // Computer Science
  "array", "ascii", "bytes", "cache", "class", "cloud", "codes", "cycle",
  "debug", "email", "fiber", "frame", "index", "input", "linux", "loops",
  "model", "modem", "mouse", "nodes", "pixel", "proxy", "query", "queue",
  "regex", "route", "stack", "token", "tuple", "build", "chars", "click",
  "crash", "datum", "flash", "fetch", "heaps", "image", "links", "logic",
  "merge", "parse", "patch", "print", "reboot", "shell", "style", "table",
  "types", "virus",
  // Engineering & Earth Science
  "alloy", "beams", "bolts", "cable", "crane", "diode", "drain", "drive",
  "fluid", "gauge", "gears", "hinge", "lever", "motor", "pivot",
  "press", "pumps", "relay", "rivet", "rotor", "shaft", "shear", "spool",
  "strut", "valve", "welds", "crust", "epoch", "fault", "magma", "plate",
  "quake", "strat", "tidal", "troph",
];

// Deduplicated and filtered to exactly 5 alpha characters
export const VALID_STEM_WORDS: string[] = [
  ...new Set(
    STEM_WORDS
      .map(w => w.toLowerCase())
      .filter(w => /^[a-z]{5}$/.test(w))
  )
];

// Valid guesses — in this version, any 5-letter alpha string is accepted
export const VALID_GUESSES: Set<string> = new Set(VALID_STEM_WORDS);
