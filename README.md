# Trinetra: AI-Enabled Drone Threat Simulation Trainer

<div align="center">
  <h3><strong>Made by Team Star Busters</strong></h3>
  <p><em>Built for the Ministry of Defence SIH26247 Mandate</em></p>
</div>

---

## 📌 Overview
**Trinetra** is a highly professional, multimodal digital twin and simulation dashboard designed for robust UAV perception training under uncertain environments. It provides a state-of-the-art GIS Command Center interface that allows instructors to construct complex threat scenarios and allows trainees to practice engagements using live AI sensor fusion data.

## 🚀 Key Features

*   **Trainee Dashboard**: A 3-panel professional GIS interface showing live RGB, Thermal, and Radar streams. Features real-time track inspection, sensor health diagnostics, and engagement actions.
*   **Instructor Console**: Complete scenario builder to manipulate weather (haze, fog), time of day, target density (swarms vs single), and sensor degradation.
*   **Analytics & AAR (After-Action Review)**: Advanced counterfactual replay engine. Evaluates trainee decisions (e.g., false positive engagements) against the optimal AI branch to provide causally-backed performance metrics.

## 🛠️ Tech Stack
*   **Frontend**: React, TypeScript, Tailwind CSS
*   **Design Language**: Custom Dark GIS/IDE Theme (SaaS curves with strict tactical contrast)
*   **Data Pipeline**: Live WebSocket ingestion for YOLO/RT-DETR inference telemetry.

## 🏃‍♂️ How to Run Locally

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Access the command center at `http://localhost:5173`

---
*Developed with ❤️ by Team Star Busters for Smart India Hackathon.*
