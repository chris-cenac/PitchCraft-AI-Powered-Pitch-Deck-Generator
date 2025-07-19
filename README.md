# PitchCraft: AI-Powered Pitch Deck Generator

PitchCraft is a user-centric, full-stack web application that leverages AI to help users generate, customize, and manage investor pitch decks. The platform enables dynamic editing, drag-and-drop slide reordering, AI-assisted script writing, and seamless export to PDF and PowerPoint formats.

---

## Features

### Core Functionalities

- **AI-Powered Deck Generation:**
  - Uses OpenAI to generate a pitch deck outline from user inputs (company name, industry, problem, solution, business model, financials, etc.).
  - Populates slides with starter content (text and suggested images).
- **Template-Based Deck Creation:**
  - Create decks from pre-designed templates without requiring business data
  - Multiple template categories: Fundraising, Enterprise, Product Launch, etc.
  - Streamlined workflow for quick deck creation
- **Interactive Editing:**
  - Drag-and-drop to reorder slides.
  - Rename slides dynamically (e.g., change "Market Analysis" to "Industry Insights").
  - Regenerate individual slides based on user feedback.
- **Version Control System:**
  - Automatic versioning when significant changes are made
  - Ability to revert to previous versions
  - Version history tracking with descriptions
- **AI-Assisted Script Writing:**
  - Integrated chatbot helps users refine pitch content and generate/improve speaker notes for each slide.
- **User Management:**
  - Secure authentication (JWT-based) and persistent saving of pitch decks.
- **Export Options:**
  - Export pitch decks as PowerPoint (.pptx) or PDF (.pdf) files.

### Enhanced Deck Management

- **Separated Business Data & Templates:**
  - Business data and templates are now separate entities
  - Create decks from templates without providing business data
  - Add business data later or keep template-based structure
- **Deck Types:**
  - **AI-Generated**: Created with business data and AI generation
  - **Template-Based**: Created from pre-designed templates
  - **Custom**: Manually created decks
- **Efficient Save/Update Logic:**
  - Prevents duplication when saving
  - Smart versioning system
  - Unique ID management for updates
- **Enhanced My Decks Page:**
  - Filter decks by type (AI-Generated, Template-Based, Custom, Templates)
  - Visual indicators for deck status and type
  - Version information display
  - Creation and update timestamps

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

### Database Schema

The application uses a flexible schema that separates business data from templates:

```typescript
// Pitch Deck Schema
{
  userId: ObjectId,
  spec: {
    businessData?: BusinessData,  // Optional business information
    template?: Template,          // Optional template reference
    slides: Slide[],
    theme: Theme,
    componentsCatalog: Component[]
  },
  deckType: "ai-generated" | "template-based" | "custom",
  currentVersion: number,
  versions: Version[],
  title: string,
  description: string,
  isTemplate: boolean,
  parentDeckId?: string
}
```

### Version Control System

- **Automatic Versioning**: New versions are created when significant changes are detected
- **Version History**: Each version includes metadata (creation date, description, creator)
- **Revert Functionality**: Users can revert to any previous version
- **Change Detection**: Compares slides, theme, and business data for significant changes

### Template System

- **Pre-built Templates**: Multiple templates for different use cases
- **Template Categories**: Fundraising, Enterprise, Product Launch, etc.
- **Template Features**: Each template includes theme, components, and slide structure
- **Customization**: Templates can be customized with business data

### API Endpoints

#### Deck Management

- `GET /pitch-decks` - Get all decks with optional filtering
- `POST /pitch-decks` - Create new deck (business data or template)
- `POST /pitch-decks/from-template/:templateId` - Create deck from template
- `PATCH /pitch-decks/:id` - Update deck
- `DELETE /pitch-decks/:id` - Delete deck

#### Version Control

- `POST /pitch-decks/:id/versions` - Create new version
- `GET /pitch-decks/:id/versions/:version` - Get specific version
- `POST /pitch-decks/:id/revert/:version` - Revert to version

#### Templates

- `GET /pitch-decks/templates` - Get all templates
- `GET /pitch-decks/my-templates` - Get user templates

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- OpenAI API key

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd PitchCraft-AI-Powered-Pitch-Deck-Generator
   ```

2. **Install dependencies**

   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

3. **Environment Setup**

   ```bash
   # Backend (.env)
   MONGODB_URI=your_mongodb_connection_string
   OPENAI_API_KEY=your_openai_api_key
   JWT_SECRET=your_jwt_secret

   # Frontend (.env)
   VITE_NEST_API_URL=http://localhost:3000
   ```

4. **Run the application**

   ```bash
   # Backend
   cd backend
   npm run start:dev

   # Frontend
   cd frontend
   npm run dev
   ```

---

## Usage

### Creating a Pitch Deck

#### Option 1: AI-Generated Deck

1. Navigate to "Create Custom Deck"
2. Fill in business information form
3. Submit to generate AI-powered content
4. Edit and customize as needed

#### Option 2: Template-Based Deck

1. Navigate to "Templates"
2. Browse available templates by category
3. Click "Use This Template"
4. Optionally add business data
5. Start editing immediately

#### Option 3: Custom Deck

1. Navigate to "Create Custom Deck"
2. Skip business data form
3. Start with blank deck
4. Add content manually

### Managing Decks

- **My Decks Page**: View all your decks with filtering options
- **Version Control**: Automatic versioning with manual revert capability
- **Deck Types**: Easily identify AI-generated vs template-based decks
- **Status Tracking**: Monitor deck completion status

### Template System

- **Browse Templates**: Filter by category and difficulty
- **Template Details**: View slide structure, features, and use cases
- **Quick Creation**: Create decks from templates in one click
- **Customization**: Add business data to template-based decks

---

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## Support

For support, email support@pitchcraft.ai or create an issue in the repository.
