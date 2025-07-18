# PitchCraft: AI-Powered Pitch Deck Generator

PitchCraft is a user-centric, full-stack web application that leverages AI to help users generate, customize, and manage investor pitch decks. The platform enables dynamic editing, drag-and-drop slide reordering, AI-assisted script writing, and seamless export to PDF and PowerPoint formats.

---

## Features

### Core Functionalities

- **AI-Powered Deck Generation:**
  - Uses OpenAI to generate a pitch deck outline from user inputs (company name, industry, problem, solution, business model, financials, etc.).
  - Populates slides with starter content (text and suggested images).
- **Interactive Editing:**
  - Drag-and-drop to reorder slides.
  - Rename slides dynamically (e.g., change "Market Analysis" to "Industry Insights").
  - Regenerate individual slides based on user feedback.
- **AI-Assisted Script Writing:**
  - Integrated chatbot helps users refine pitch content and generate/improve speaker notes for each slide.
- **User Management:**
  - Secure authentication (JWT-based) and persistent saving of pitch decks.
- **Export Options:**
  - Export pitch decks as PowerPoint (.pptx) or PDF (.pdf) files.

### Bonus Features

- **Slide Templates:** Library of pre-designed slide layouts (problem-solution, financial projections, team, etc.).
- **Version Control:** Track changes and revert to previous versions of a deck.
- **Media Integration:** Add AI-suggested images/icons for slide visuals.
- **Dark Mode:** Fully supported for modern UX.

---

## Technical Stack

- **Frontend:** React.js (with TypeScript, Vite, Tailwind CSS v4), drag-and-drop, chart.js, pptxgenjs, react-hot-toast, react-icons
- **Backend:** Node.js, NestJS, MongoDB (Mongoose), OpenAI API, Puppeteer (for PDF export), JWT Auth
- **Database:** MongoDB (local or Atlas)
- **Authentication:** JWT-based (can be extended to Auth0/Firebase)

---

## Architecture & How It Works

1. **User Authentication:**
   - Users sign up/log in; JWT tokens are used for secure API access.
2. **Deck Generation:**
   - User provides business data; backend calls OpenAI to generate a deck outline and starter content.
3. **Editing:**
   - Users can edit, reorder, rename, and regenerate slides. Drag-and-drop is fully supported.
   - AI chatbot assists with script writing and speaker notes.
4. **Saving & Versioning:**
   - Decks are saved to the database and can be versioned.
5. **Export:**
   - **PDF:** Frontend sends HTML to backend `/pitch-decks/pdf`; backend uses Puppeteer to render and return a PDF (supports all modern CSS).
   - **PPTX:** Client-side export using pptxgenjs.

---

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm (v9+ recommended)
- MongoDB (local or Atlas)

### 1. Clone the Repository

```sh
git clone https://github.com/yourusername/PitchCraft-AI-Powered-Pitch-Deck-Generator.git
cd PitchCraft-AI-Powered-Pitch-Deck-Generator
```

### 2. Setup the Backend

```sh
cd backend
npm install
# Configure your .env file (MONGODB_URI, OPENAI_API_KEY, JWT_SECRET, FRONTEND_URL)
npm run start:dev
```

- Backend runs on `http://localhost:3000` by default.

### 3. Setup the Frontend

```sh
cd ../frontend
npm install
npm run dev
```

- Frontend runs on `http://localhost:5173` by default.

---

## Usage

1. **Sign up and log in.**
2. **Create a new deck** by entering your business data or choosing a template.
3. **Edit your deck:**
   - Drag-and-drop slides, rename, regenerate, and use the AI chatbot for script writing.
4. **Export:**
   - Click "Download as PDF" or "Download as PPTX" to export your deck.

---

## PDF Export Flow (Puppeteer)

- The frontend renders a hidden export container with the deck HTML.
- On export, the HTML is sent to the backend via a POST request to `/pitch-decks/pdf`.
- The backend launches Puppeteer, renders the HTML, and returns a PDF file.
- This approach supports all modern CSS (including Tailwind v4, oklch/oklab, etc.).

---

## Development

- **Frontend:**
  - `npm run dev` — Start Vite dev server
  - `npm run build` — Build for production
  - `npm run lint` — Lint code
- **Backend:**
  - `npm run start:dev` — Start NestJS in watch mode
  - `npm run build` — Build backend
  - `npm run test` — Run tests

---

## Environment Variables

- **Backend:**
  - `MONGODB_URI` — MongoDB connection string
  - `OPENAI_API_KEY` — OpenAI API key for AI features
  - `JWT_SECRET` — Secret for JWT authentication
  - `FRONTEND_URL` — Allowed CORS origin
- **Frontend:**
  - `VITE_NEST_API_URL` — Backend API URL (default: `http://localhost:3000`)

---

## Evaluation Criteria (for reviewers)

- **Functionality:** Completeness and correctness of core features.
- **Usability:** Ease of use for generating, editing, and exporting pitch decks.
- **Code Quality:** Clean, modular, and well-documented code.
- **Scalability:** Ability to support multiple users and large pitch decks.
- **AI Integration:** Effective use of LLMs for generation and refinement.
- **User Experience:** Intuitive design and clear workflows for all users.
- **Bonus:** Version control, templates, media integration, and innovative features.

---

## Deliverables

- **Source Code:** Hosted in a GitHub repository.
- **Functional Application:** Deployed and accessible via a URL.
- **Sample Database:** Example user-generated pitch decks.
- **Documentation:** Setup, deployment, and usage guide (this README).

---

## License

This project is licensed under the MIT License.

---

## Contact

For questions or support, open an issue or contact the maintainer.
