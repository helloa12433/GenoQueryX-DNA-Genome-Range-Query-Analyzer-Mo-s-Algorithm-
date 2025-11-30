# 🌐 GenoQueryX — DNA / Genome Range Query Analyzer (Mo’s Algorithm)

**GenoQueryX** is a high-performance interactive tool for analyzing DNA sequences and answering heavy **range queries (L–R)** using the optimized **Mo’s Algorithm**.  
Designed for bioinformatics students, researchers, and developers, it combines algorithmic optimization with a modern animated UI.

---

# 🚀 What This Tool Can Do (Results It Provides)

GenoQueryX instantly answers **complex DNA-based questions** for **any L–R subrange** of the sequence:

### 🔹 1. **Distinct Nucleotides**
Returns how many *unique* characters appear in the chosen range.  
Example:  
Range = `ACGTAC → {A,C,G,T} = 4 distinct`.

---

### 🔹 2. **Most Frequent Nucleotide**
Identifies the base with the highest frequency in the range.  
Useful for identifying dominant regions.

Example:  
Range = `AAAACGT` → Most frequent = **A (4 times)**

---

### 🔹 3. **GC Content (%)**
GC ratio is a key biological metric used to study:

- gene density  
- thermodynamic stability  
- mutation probability  

Example:  
Range: `ACGCGT`  
GC% = 4/6 × 100 = **66.67%**

---

### 🔹 4. **Pattern Count (e.g., ACG)**
Counts how many times a short DNA pattern occurs inside L–R.

Supports patterns like:

- `ACG`
- `GTA`
- `CG`
- any sequence using A/C/G/T

---

### 🔹 5. **GA Hotspot Pairs**
Counts occurrences of `"GA"` pairs inside the range — often used in mutation hotspot detection.

Example:  
Range: `TGAGAAG` → `"GA"` appears **3 times**.

---

# 🧬 How Big of a Dataset This App Can Handle?

Mo’s Algorithm allows this tool to handle **very large datasets** inside a simple browser.

### ✔ Practical performance limits (inside a browser):

| DNA Length (N) | Number of Queries (Q) | Performance |
|---------------|------------------------|-------------|
| **100,000**   | **50,000**             | Smooth, <1 second |
| **200,000**   | **50,000**             | Very fast |
| **500,000**   | **10,000–20,000**      | Still good |
| **1,000,000** | **5,000–10,000**       | Usable, slight delay |

### ⚠ Why these limits?

Because JavaScript (browser) memory + processing speed is limited compared to C++.

---

# 🧩 Worst-Case Time Complexity (Fully Explained)

Mo’s Algorithm has complexity:

O((N + Q) * √N)


### Example complexity values:

| N (sequence length) | √N | With Q = N | Total Operations |
|---------------------|----|-----------|------------------|
| 100,000             | 316| 100k      | ~63 million ops  |
| 200,000             | 447| 200k      | ~130 million ops |
| 500,000             | 707| 500k      | ~353 million ops |

Browser JavaScript comfortably handles **60–150 million ops**,  
which makes this app extremely powerful for its size.

---

# ⚠ When Does Time Increase?

You may experience slower performance if:

### ❌ Sequence size > 1 million  
### ❌ Query count > 60–80k  
### ❌ User enters long patterns (e.g., pattern length > 50)  
### ❌ Running simultaneously on low-end mobile browsers  

Still, the tool performs better than almost all “normal” JS solutions because Mo’s algorithm ensures minimal pointer movements.

---

# 🎨 UI Highlights (Clean + Animated)

- Dark futuristic theme  
- Glassmorphism panels  
- Smooth neon glow  
- Framer Motion animations  
- Interactive hover effects  
- Floating DNA-themed visuals  
- Compact query/input boxes  
- Modern dropdown (no old-school select style)  

---

# 🔬 Real-Life Use Cases of This Tool

This isn't just a demo — it models real bioinformatics workflows.

### 1️⃣ Genomic Research  
Analyze large chromosomes with range queries like:

- Which region has highest GC%?  
- Which segment has most mutation hotspots?  
- Where does pattern “ACG” appear frequently?

---

### 2️⃣ Mutation Detection  
Useful for studying SNP clusters or GA mutation hotspots.

---

### 3️⃣ DNA Pattern Localization  
Researchers can locate regulatory motifs like:

- promoter regions  
- enzyme binding sites  
- transcription factors  

---

### 4️⃣ Educational Tool  
Perfect for teaching:

- Mo’s Algorithm  
- Sliding windows  
- Bioinformatics basics  
- Frequency tables  
- GC% calculation  

---

### 5️⃣ Competitive Programming + Biology  
A unique combination of:

- CP algorithm efficiency  
- Real genomics data analysis  

Very strong for resumes and hackathons.

---

# 🏗️ Tech Stack

- **React (Vite)**
- **TailwindCSS**
- **Framer Motion**
- **JavaScript ESNext**
- **Mo’s Algorithm (offline query optimization)**

---

# 📥 Installation

```bash
git clone https://github.com/your-username/genoqueryx.git
cd genoqueryx
npm install
npm run dev

Build:

npm run build
npm run preview

🔍 Why Mo’s Algorithm Was Chosen?

Because DNA queries are mostly:

Counting elements

Frequency updates

Sliding window operations

Mo’s Algorithm ensures minimal movement of pointers:

Moving L and R by +1 or –1

Updating frequency tables in O(1)

Answering each query efficiently

Other algorithms like Segment Trees or Fenwick Trees struggle with irregular pattern matching, but Mo’s handles it smoothly.

Query #1: L=1, R=10, type=distinct
Answer: 4

Query #2: L=1, R=10, type=gcContent
Answer: 50.00%

Query #3: L=1, R=15, type=patternCount("ACG")
Answer: 2

Query #4: L=2, R=20, type=gaHotspot
Answer: 3

📄 License

MIT License

👨‍💻 Author

Pankaj Kumar
Competitive Programmer (Master), Web2 & Web3 Developer, System Design & Algorithm Specialist.

⭐ Final Summary

GenoQueryX is a rare project that blends:

Bioinformatics

Competitive Programming

Modern Frontend Engineering

Algorithmic Optimization

It is fast, scalable, research-oriented, and visually stunning — a perfect addition to any professional portfolio.
