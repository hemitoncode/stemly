// Curated JSON data structure of 5-letter STEM words for high school students
// Each word includes its category and 3 progressive hints

export interface StemWord {
  word: string;
  category: string;
  hints: [string, string, string];
}

export const STEM_WORD_DATA: StemWord[] = [
  // ── Biology (everyday body & nature words) ──
  { word: "heart", category: "Biology", hints: ["It pumps blood through your body", "Has four chambers", "You can feel it beating in your chest"] },
  { word: "brain", category: "Biology", hints: ["The organ you think with", "Protected by your skull", "Controls everything your body does"] },
  { word: "blood", category: "Biology", hints: ["The red fluid in your body", "Carries oxygen to your cells", "Your heart pumps about 5 liters of it"] },
  { word: "bones", category: "Biology", hints: ["The hard parts inside your body", "Adults have 206 of them", "They make up your skeleton"] },
  { word: "lungs", category: "Biology", hints: ["You breathe with these organs", "You have two of them in your chest", "They take in oxygen and release carbon dioxide"] },
  { word: "cells", category: "Biology", hints: ["The tiny building blocks of all living things", "Your body has trillions of them", "They're so small you need a microscope to see them"] },
  { word: "plant", category: "Biology", hints: ["A living thing that uses sunlight for food", "Has roots, stems, and leaves", "Trees, flowers, and grass are all types of these"] },
  { word: "seeds", category: "Biology", hints: ["What you put in soil to grow a plant", "Found inside fruits and flowers", "A sunflower produces hundreds of these"] },
  { word: "tooth", category: "Biology", hints: ["You use these to chew food", "Adults have 32 of them", "You should brush these twice a day"] },
  { word: "sweat", category: "Biology", hints: ["Your body makes this when you're hot", "Comes out of pores in your skin", "Helps cool you down during exercise"] },
  { word: "virus", category: "Biology", hints: ["A tiny germ that can make you sick", "The flu and COVID are caused by one", "Too small to see even with a regular microscope"] },
  { word: "genes", category: "Biology", hints: ["They decide things like your eye color", "You get them from your parents", "Found inside your DNA"] },
  { word: "skull", category: "Biology", hints: ["The bone that protects your brain", "Part of your head's skeleton", "Sometimes used as a symbol for danger ☠️"] },
  { word: "spine", category: "Biology", hints: ["The bones running down your back", "Also called your backbone", "Protects the nerves inside your spinal cord"] },
  { word: "nerve", category: "Biology", hints: ["Carries signals like tiny electrical wires in your body", "You feel pain because of these", "Part of your nervous system"] },
  { word: "organ", category: "Biology", hints: ["A body part with a specific job", "Your heart, lungs, and liver are examples", "You can donate some of these to save lives"] },
  { word: "trait", category: "Biology", hints: ["A feature you inherit from your parents", "Eye color and height are examples", "Some are dominant and some are recessive"] },
  { word: "fungi", category: "Biology", hints: ["The group that mushrooms belong to", "They break down dead things in nature", "Mold on bread is a type of this"] },
  { word: "clone", category: "Biology", hints: ["An exact genetic copy of something", "Dolly the sheep was a famous one", "Identical twins are natural versions of this"] },
  { word: "petal", category: "Biology", hints: ["The colorful part of a flower", "Attracts bees and butterflies", "Roses have many of these"] },
  { word: "trunk", category: "Biology", hints: ["The thick main part of a tree", "Bark covers the outside of it", "You can count rings inside it to find a tree's age"] },
  { word: "wound", category: "Biology", hints: ["A cut or injury to your body", "Your blood helps heal this by clotting", "You might need a bandage for one"] },
  { word: "joint", category: "Biology", hints: ["Where two bones meet in your body", "Your knee and elbow are examples", "They let you bend and move"] },
  // ── Chemistry (everyday materials & substances) ──
  { word: "water", category: "Chemistry", hints: ["The most common liquid on Earth", "Made of hydrogen and oxygen (H₂O)", "You need to drink it every day to survive"] },
  { word: "atoms", category: "Chemistry", hints: ["The tiny particles everything is made of", "Too small to see with your eyes", "Made of protons, neutrons, and electrons"] },
  { word: "steam", category: "Chemistry", hints: ["What you see coming from boiling water", "Water turns into this when heated to 100°C", "Used to power old trains and generate electricity"] },
  { word: "metal", category: "Chemistry", hints: ["A shiny material that conducts electricity", "Gold, iron, and copper are examples", "Most elements on the periodic table are this"] },
  { word: "gases", category: "Chemistry", hints: ["One of the three states of matter", "The air you breathe is made of these", "They spread out to fill any container"] },
  { word: "solid", category: "Chemistry", hints: ["A state of matter with a fixed shape", "Ice and rock are examples", "Particles are packed tightly together in this state"] },
  { word: "sugar", category: "Chemistry", hints: ["A sweet substance found in candy and fruit", "Plants make it during photosynthesis", "Its chemical name is glucose or sucrose"] },
  { word: "acids", category: "Chemistry", hints: ["Substances that taste sour", "Lemon juice and vinegar are mild ones", "They have a pH below 7"] },
  { word: "steel", category: "Chemistry", hints: ["A strong material made from iron and carbon", "Used to build bridges and skyscrapers", "It's a type of alloy (a mix of metals)"] },
  { word: "ozone", category: "Chemistry", hints: ["A special form of oxygen in the atmosphere", "Its layer protects us from UV rays", "Made of three oxygen atoms (O₃)"] },
  { word: "oxide", category: "Chemistry", hints: ["What forms when something reacts with oxygen", "Rust is iron ___ on metal", "Carbon dioxide is a common one you breathe out"] },
  { word: "salts", category: "Chemistry", hints: ["What you sprinkle on food for flavor", "Table salt is sodium chloride (NaCl)", "Formed when an acid reacts with a base"] },
  { word: "flask", category: "Chemistry", hints: ["A container used in science labs", "You mix chemicals in one of these", "The triangle-shaped one is called an Erlenmeyer"] },
  { word: "alloy", category: "Chemistry", hints: ["A mix of two or more metals", "Bronze and brass are examples", "Made to be stronger than pure metals"] },
  { word: "toxic", category: "Chemistry", hints: ["Means poisonous or harmful", "Shown by a skull-and-crossbones symbol", "Bleach and mercury are considered this"] },
  { word: "nylon", category: "Chemistry", hints: ["A synthetic material used in clothing", "Made in a chemistry lab, not from nature", "Stockings and backpack straps are made of this"] },
  { word: "phase", category: "Chemistry", hints: ["Another word for a state of matter", "Solid, liquid, and gas are the main ones", "Melting is changing from one ___ to another"] },
  // ── Physics (forces, energy & everyday science) ──
  { word: "force", category: "Physics", hints: ["A push or pull on an object", "Measured in Newtons", "Gravity is one that pulls you toward Earth"] },
  { word: "light", category: "Physics", hints: ["What lets you see things", "It travels faster than anything in the universe", "A rainbow shows its different colors"] },
  { word: "speed", category: "Physics", hints: ["How fast something is moving", "Measured in miles per hour or meters per second", "Distance divided by time"] },
  { word: "waves", category: "Physics", hints: ["How sound and light travel through space", "The ocean has visible ones", "They carry energy from one place to another"] },
  { word: "power", category: "Physics", hints: ["How fast energy is used or produced", "Measured in watts", "A light bulb uses about 60 of these"] },
  { word: "solar", category: "Physics", hints: ["Related to the Sun", "___ panels turn sunlight into electricity", "Our ___ system has 8 planets"] },
  { word: "orbit", category: "Physics", hints: ["The path a planet takes around the Sun", "The Moon follows one around Earth", "Satellites are placed in one around our planet"] },
  { word: "lever", category: "Physics", hints: ["A simple machine that helps lift things", "A seesaw is an everyday example", "Has a pivot point called a fulcrum"] },
  { word: "laser", category: "Physics", hints: ["A focused beam of light", "Used in barcode scanners and eye surgery", "Cat toys often use a red one"] },
  { word: "prism", category: "Physics", hints: ["A glass shape that splits white light into colors", "Creates a rainbow effect", "Usually shaped like a triangle"] },
  { word: "radar", category: "Physics", hints: ["Uses radio waves to find objects far away", "Police use it to check car speeds", "Weather forecasters use it to track storms"] },
  { word: "volts", category: "Physics", hints: ["The unit for measuring electrical push", "A household outlet is about 120 of these", "Batteries are rated in these"] },
  { word: "watts", category: "Physics", hints: ["The unit for measuring power", "Light bulbs are rated in these", "A microwave might use 1000 of these"] },
  { word: "sound", category: "Physics", hints: ["What you hear with your ears", "Created by vibrations", "It travels slower than light"] },
  { word: "helix", category: "Physics", hints: ["A 3D spiral shape", "DNA has a famous double ___ structure", "A spring or corkscrew has this shape"] },
  { word: "hertz", category: "Physics", hints: ["The unit for measuring frequency", "Your WiFi runs at 2.4 or 5 gigaof these", "Named after a German physicist"] },
  { word: "angle", category: "Physics", hints: ["The space between two lines that meet", "Measured in degrees", "A right one is exactly 90°"] },
  { word: "fluid", category: "Physics", hints: ["Anything that flows, like water or air", "Includes both liquids and gases", "The opposite of a solid"] },
  { word: "magma", category: "Physics", hints: ["Hot melted rock underground", "Comes out of volcanoes as lava", "Found deep beneath Earth's surface"] },
  // ── Math (numbers, shapes & everyday math) ──
  { word: "graph", category: "Math", hints: ["A picture that shows data or a math function", "Has an x-axis and a y-axis", "Bar charts and line charts are types of these"] },
  { word: "angle", category: "Math", hints: ["Where two lines meet at a point", "Measured in degrees", "A triangle has three of them adding up to 180°"] },
  { word: "equal", category: "Math", hints: ["When two things have the same value", "Shown by the = sign", "2 + 2 is ___ to 4"] },
  { word: "minus", category: "Math", hints: ["The subtraction symbol (−)", "10 ___ 3 equals 7", "A negative number is below zero"] },
  { word: "slope", category: "Math", hints: ["How steep a line is on a graph", "Rise over run", "The 'm' in y = mx + b"] },
  { word: "curve", category: "Math", hints: ["A line that bends instead of going straight", "A circle is a closed one", "Most function graphs make these shapes"] },
  { word: "ratio", category: "Math", hints: ["A way to compare two numbers", "Written like 3:1 or as a fraction", "A recipe might use a 2:1 ___ of flour to sugar"] },
  { word: "prime", category: "Math", hints: ["A number only divisible by 1 and itself", "2, 3, 5, 7, and 11 are the first five", "The number 1 is NOT considered one of these"] },
  { word: "digit", category: "Math", hints: ["Any single number from 0 to 9", "The number 53 has two of these", "Your phone number has 10 of them"] },
  { word: "solve", category: "Math", hints: ["To find the answer to a problem", "What you do with equations", "Find x: that means ___ for x"] },
  { word: "value", category: "Math", hints: ["How much something is worth numerically", "x can have any ___ in algebra", "The absolute ___ of -5 is 5"] },
  { word: "width", category: "Math", hints: ["How wide something is", "One of the measurements for area", "Area of a rectangle = length × ___"] },
  { word: "depth", category: "Math", hints: ["How deep something is", "The third dimension of a 3D shape", "A swimming pool has a shallow and deep ___"] },
  { word: "roots", category: "Math", hints: ["The answers to an equation", "The square ___ of 25 is 5", "Where a graph crosses the x-axis"] },
  { word: "total", category: "Math", hints: ["The result when you add things up", "Another word for sum", "The ___ of 3 + 4 + 5 is 12"] },
  { word: "whole", category: "Math", hints: ["A complete number with no fractions", "1, 2, 3, 4 are ___ numbers", "The opposite of a fraction or decimal"] },
  { word: "range", category: "Math", hints: ["The difference between the biggest and smallest values", "In the set {2, 5, 9}, this is 7", "Also means all possible outputs of a function"] },
  { word: "zeros", category: "Math", hints: ["The number 0, or where a function equals 0", "A million has six of these", "Also called the roots of an equation"] },
  // ── Technology & Computers (everyday tech) ──
  { word: "mouse", category: "Technology", hints: ["You click with this computer accessory", "It moves the cursor on your screen", "Named after the small animal it looks like"] },
  { word: "email", category: "Technology", hints: ["An electronic message sent over the internet", "Gmail and Outlook are popular services for this", "Much faster than sending a letter by mail"] },
  { word: "cloud", category: "Technology", hints: ["Where your files are stored online", "Google Drive and iCloud are examples", "Not an actual ___ in the sky!"] },
  { word: "pixel", category: "Technology", hints: ["A tiny dot on your screen", "Millions of these make up an image", "More of them = sharper picture quality"] },
  { word: "click", category: "Technology", hints: ["What you do with a mouse button", "Double-___ opens a file", "You hear a small sound when you do it"] },
  { word: "crash", category: "Technology", hints: ["When your computer or app stops working suddenly", "You might see an error screen", "Often means you lose unsaved work"] },
  { word: "video", category: "Technology", hints: ["Moving pictures with sound", "YouTube is the biggest site for watching these", "Made up of many frames shown quickly"] },
  { word: "print", category: "Technology", hints: ["To put text or images on paper", "A common command in coding to show output", "'Hello World' is the classic first ___"] },
  { word: "codes", category: "Technology", hints: ["Instructions written for computers", "Python, Java, and JavaScript are languages for writing these", "What programmers write all day"] },
  { word: "debug", category: "Technology", hints: ["Finding and fixing errors in a program", "Named after removing an actual bug from a computer", "Every programmer spends a lot of time doing this"] },
  { word: "input", category: "Technology", hints: ["Data you type or enter into a computer", "Your keyboard provides this", "The opposite of output"] },
  { word: "image", category: "Technology", hints: ["A picture stored on a computer", "PNG, JPEG, and GIF are types of these", "You can take one with your phone camera"] },
  { word: "robot", category: "Technology", hints: ["A machine that can do tasks automatically", "Some factories use these to build cars", "Roomba is a household one that vacuums"] },
  { word: "login", category: "Technology", hints: ["Entering your username and password", "You do this to access your accounts", "The first thing you do on most apps and websites"] },
  { word: "media", category: "Technology", hints: ["Ways of communicating information to people", "Social ___ includes Instagram and TikTok", "News, TV, and websites are all forms of this"] },
  // ── Engineering & Earth Science (everyday) ──
  { word: "motor", category: "Engineering", hints: ["A machine that makes things move", "Found in fans, cars, and blenders", "Converts electrical energy into motion"] },
  { word: "gears", category: "Engineering", hints: ["Toothed wheels found in machines", "Bicycles use these to change speed", "They mesh together and turn each other"] },
  { word: "crane", category: "Engineering", hints: ["A tall machine that lifts heavy things", "Common on construction sites", "Uses cables and pulleys"] },
  { word: "cable", category: "Engineering", hints: ["A thick wire that carries power or data", "USB and HDMI are types of these", "Suspension bridges hang from steel ones"] },
  { word: "valve", category: "Engineering", hints: ["Controls the flow of water or gas", "A faucet has one inside", "Your heart has four of these"] },
  { word: "drain", category: "Engineering", hints: ["Where water goes in a sink or road", "Prevents flooding by carrying water away", "You might see one covered by a metal grate"] },
  { word: "drive", category: "Engineering", hints: ["A part that makes a machine run", "A hard ___ stores data on a computer", "Gears and belts are types of ___ systems"] },
  { word: "hinge", category: "Engineering", hints: ["The metal piece that lets a door swing open", "Allows rotation in one direction", "Every door and gate has at least two of these"] },
  { word: "bolts", category: "Engineering", hints: ["Threaded metal fasteners used with nuts", "You tighten them with a wrench", "Hold furniture and structures together"] },
  { word: "steel", category: "Engineering", hints: ["A very strong building material", "Made by mixing iron with carbon", "Used in bridges, cars, and skyscrapers"] },
  { word: "quake", category: "Earth Science", hints: ["When the ground shakes suddenly", "Measured on the Richter scale", "Caused by movement of plates underground"] },
  { word: "fault", category: "Earth Science", hints: ["A crack in Earth's surface", "Earthquakes happen along these", "The San Andreas one is in California"] },
  { word: "crust", category: "Earth Science", hints: ["The outer layer of the Earth", "We live on top of it", "It's thinner under the oceans"] },
  { word: "plate", category: "Earth Science", hints: ["A huge piece of Earth's surface that moves slowly", "Tectonic ___s cause earthquakes when they shift", "There are about 15 major ones on Earth"] },
  { word: "tidal", category: "Earth Science", hints: ["Related to ocean water rising and falling", "Caused by the Moon's gravity", "___ waves come in and out twice a day"] },
  { word: "magma", category: "Earth Science", hints: ["Hot melted rock underground", "Shoots out of volcanoes as lava", "Found deep in Earth's mantle"] },
  { word: "ocean", category: "Earth Science", hints: ["The large body of salt water covering most of Earth", "The Pacific is the biggest one", "Home to whales, sharks, and coral reefs"] },
  { word: "storm", category: "Earth Science", hints: ["A weather event with strong wind and rain", "Hurricanes and tornadoes are severe types", "Thunder and lightning come with these"] },
];

// Deduplicated valid words (5 lowercase alpha chars only)
export const VALID_STEM_WORDS: string[] = [
  ...new Set(
    STEM_WORD_DATA
      .map(entry => entry.word.toLowerCase())
      .filter(w => /^[a-z]{5}$/.test(w))
  )
];

// Quick lookup map: word → StemWord data (for hint retrieval)
export const WORD_MAP: Map<string, StemWord> = new Map(
  STEM_WORD_DATA
    .filter(entry => /^[a-z]{5}$/.test(entry.word.toLowerCase()))
    .map(entry => [entry.word.toLowerCase(), entry])
);

// Valid guesses — any 5-letter alpha string is accepted
export const VALID_GUESSES: Set<string> = new Set(VALID_STEM_WORDS);
