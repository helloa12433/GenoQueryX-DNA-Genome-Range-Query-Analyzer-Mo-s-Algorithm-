🌐 GenoQueryX — DNA / Genome Range Query Analyzer (Mo’s Algorithm)

GenoQueryX is a high-performance DNA/genome analytics tool designed to process complex L–R range queries efficiently using the competitive-programming–famous Mo’s Algorithm.
The project combines bioinformatics concepts, advanced data structures, and a modern animated UI built with React + Vite + Tailwind + Framer Motion.

This tool allows researchers, students, and developers to interactively analyze DNA sequences and run various biological range-based queries in real time — all inside the browser.

🚀 Features
🧬 1. DNA Sequence Analysis

Paste or enter any DNA sequence (A, C, G, T).
The sequence is analyzed on-the-fly, with real-time length calculation.

📊 2. Multiple Bioinformatics Query Types

Each query works on a range L–R and is processed using Mo’s algorithm for efficient performance.

Supported query operations:

Query Type	Description
Distinct nucleotides	Returns how many unique bases (A/C/G/T) are in the range.
Most frequent nucleotide	Returns the base with the highest frequency in the range.
GC content (%)	Calculates the % of nucleotides that are G or C.
Pattern count	Matches any pattern (e.g., "ACG") inside the L–R range.
GA hotspot pairs	Counts “GA” mutation-like pairs often used in mutation hotspot studies.

Users can add unlimited queries and run them together.

⚡ 3. Lightning-Fast Processing (Mo’s Algorithm)

Most biological range queries become slow on large sequences.
Mo’s Algorithm reduces query complexity to:

O((N + Q) * √N)


This enables:

large DNA sequence processing

high number of range queries

real-time UI responsiveness

Even 50,000 queries on a sequence of 100,000 characters execute smoothly.

🎨 4. Modern Animated UI

The UI is fully redesigned with:

Dark theme + bioinformatics vibe

Glassmorphism cards

Floating animations (Framer Motion)

8-direction interactive hover motions

Compact, clean layout

Soft gradients and neon highlights

Dropdowns, cards, buttons — everything feels modern and clickable.

🧩 5. Frontend-Only Architecture

Everything works directly in the browser —
No backend, no API, no database.

This makes the tool lightweight, fast, and deployable on any static hosting platform like:

Vercel

Netlify

GitHub Pages

🏗️ Tech Stack

Frontend:

React (Vite)

TailwindCSS

Framer Motion (animations)

JavaScript (ESNext)

Algorithmic Core:

Mo’s Algorithm (Offline Query Processing)

DNA preprocessing

Fenwick-style frequency counters

Pattern matching

📥 Installation & Setup

Clone the repository:

git clone https://github.com/your-username/genoqueryx.git
cd genoqueryx


Install dependencies:

npm install


Run development server:

npm run dev


Build for production:

npm run build


Preview production build:

npm run preview

🖼️ UI Preview

Features included:

✔ Modern landing-style interface
✔ Smooth hover animations
✔ Floating cards
✔ Compact query controls
✔ Neon-highlighted results
✔ Dark + Futuristic theme

(Insert screenshots or GIFs here)

🔍 How Mo’s Algorithm Works (Short Explanation)

Mo’s Algorithm rearranges the queries in such a way that pointer movement is minimized.

Why useful in DNA analytics?

Biological operations often require repeating these operations:

add nucleotide

remove nucleotide

maintain frequency

update GC count

check patterns

detect mutation-like pairs

Mo’s processes these updates in O(1) amortized time.

Steps (simplified):

Sort queries by block (√N size)

Move L and R pointers smoothly

Maintain frequency tables + auxiliary counters

Answer each query after window stabilizes

🧪 Example Queries

DNA sequence:

ACGTACGTACGTACGTACGT


Queries:

Distinct nucleotides in 1–10

GC content in 1–10

Pattern “ACG” in 2–15

GA hotspot count in 5–20

Results appear instantly in the UI.

🌱 Future Improvements

FASTA file import support

Visual DNA charts (circles / bar graphs)

More mutation-type calculations

Multi-sequence comparison

WebAssembly optimization for massive datasets

DB-backed version (Postgres + APIs)

📄 License

This project is open-source under the MIT License.

🧑‍💻 Author

Pankaj Kumar
Competitive Programmer (Master), Web2 + Web3 Developer
Specialized in CP, Algorithms, MERN, Web3, and System Design.

⭐ Final Note

This project is a unique mix of:

computational biology

competitive programming

modern frontend engineering
