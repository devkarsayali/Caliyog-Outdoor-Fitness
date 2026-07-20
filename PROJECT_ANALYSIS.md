# CaliYog Outdoor Fitness Club - Project Analysis & Replication Guide

This document provides a comprehensive analysis of the CaliYog Outdoor Fitness Club project. It details the overall architecture, tech stack, page components, admin dashboard features, backend API schemas, design tokens, and a step-by-step replication guide to construct an exact, identical website.

---

## 1. Project Overview

**CaliYog Outdoor Fitness Club** is a web application designed for a premium outdoor calisthenics and fitness club. It serves two primary functions:
1. **Public Landing Page**: A premium, highly interactive single-page landing website showcasing club sections (Home, About, Batches, Memberships, Transformations, Coaches, Events, Testimonials, and Contact) with an integrated multi-step membership registration form.
2. **Admin Panel**: A restricted, feature-rich management dashboard that enables administrators to manage members, process join requests, reply to contact enquiries, update homepage content dynamically (about text, why-choose-us, experts, batches, membership plans, events, and gallery pictures), and perform global searches across the database.

---

## 2. Technical Stack

The project has been migrated from a legacy **Create React App (CRA)** structure to a modern **Vite + React** setup.

### Frontend
- **Framework**: React (v18.3+)
- **Build Tool**: Vite (v5.3+)
- **Routing**: React Router DOM (v6.26+ / v7.18+) supporting lazy loading.
- **Styling**: TailwindCSS (v3.4+) combined with Custom Vanilla CSS for precise design layouts and gradients.
- **State Management & Forms**: React Hook Form (v7.52+) for form handling, Context API for global authentication state (`AuthContext`).
- **Icons**: React Icons (v5.2+) containing FontAwesome, Ionicons, etc.
- **Animations & Interactivity**:
  - **Framer Motion** (v11.3+): For smooth transitions and page animations.
  - **Swiper** (v11.1+): Used for carousel sliders (e.g., transformations, testimonial cards).
  - **Lottie React** (v2.4+): Rendering JSON-based high-fidelity vectors for icons.
  - **React Intersection Observer**: Triggering animations on scroll.
- **Notifications**: React Hot Toast (v2.4+) for toast alerts.
- **HTTP Client**: Axios (v1.7+) and native `fetch` API.
- **Date Handling**: date-fns (v3.6+).

### Backend (External)
- **Runtime Environment**: Node.js with Express.js
- **Database**: MongoDB (managed via Mongoose)
- **Hosting**: Railway or local IP server (`http://10.93.11.13:5000`)
- **Authentication**: JWT (JSON Web Tokens) with route guards.

---

## 3. Design Aesthetics & Visual Identity

To replicate this site identically, use the following design system parameters:

### Color Palette
- **Background (Dark Mode Theme)**: `#090d13` (Deep Obsidian Black)
- **Primary / Accent Color**: `#f97316` (Orange-500) and `#22c55e` (Green-500) / `#16a34a` (Green-600) for Calisthenics styling.
- **Card Background (Glassmorphism)**: `rgba(255, 255, 255, 0.05)` with `backdrop-filter: blur(12px)` and `border: 1px solid rgba(255, 255, 255, 0.1)`.
- **Admin Layout Base**: Slate dark colors like `#1e293b` (Slate-800) and `#172032` (Deep Navy).

### Typography
- **Primary Fonts**: `Inter` and `Poppins` loaded via Google Fonts.
- **Styles**: Font weights from 300 to 900. Large bold italicized uppercase headers are used for section titles to deliver a strong, athletic aesthetic.

### Layout Elements
- **Scroll Behavior**: Smooth scroll (`scroll-behavior: smooth`).
- **Grids**: Responsive flexbox and CSS grids (`grid-template-columns` adjusting from 1 column on mobile to 2 on tablets and 4 on desktop).
- **Decorations**:
  - Radial glows using green or orange transparent circles: `radial-gradient(circle at top left, rgba(34, 197, 94, 0.12), transparent 35%)`.
  - Linear gradients on buttons and background cards.

---

## 4. Frontend Component Breakdown (Public Website)

The public-facing landing page is a single-scroll page consisting of the following key components:

### 4.1. Splash Screen (`SplashScreen.js` & `SplashScreen.css`)
- **Visuals**: Displays the club's round white-and-gold logo (`CaliYog-Logo.png`) centered, with a large glowing club title and the subtitle: *"Build Strength • Transform Body • Live Healthy"*.
- **Functionality**: Triggers a 3-second loader using a CSS fade-in-out animation before sliding out of view to reveal the homepage.

### 4.2. Navigation Bar (`Navbar.js` & `Navbar.css`)
- **Sticky Headers**: Stays fixed at the top of the viewport with a dark glassmorphic styling.
- **Scroll Spy**: Automatically detects the scroll position using `IntersectionObserver` or a `scroll` listener to toggle the `.active` class on nav links corresponding to the active viewport section ID (`#home`, `#about`, `#whychooseus`, `#batches`, `#membership`, etc.).
- **Responsive Hamburg Menu**: Toggles a mobile slide-out menu drawer on screens `<= 768px`.
- **Call-to-Action**: Clicking the "Join Now" button triggers the membership popup modal.

### 4.3. Hero Section (`Home.js` & `Home.css`)
- **Background**: Plays a high-definition background video loop (`home-video.mp4`) with a dark overlay to maintain readability of overlay text.
- **Content**:
  - Glowing top badge: *"Welcome to CaliYog"*
  - Main Title: *"CALIYOG OUTDOOR FITNESS CLUB"*
  - Subtitle: *"Build Strength • Transform Body • Live Healthy"*
  - Action Button: Glowing green/orange "Join Now" button linking to the enrollment form.

### 4.4. About CaliYog (`About.js` & `About.css`)
- **Layout**: Split into two sections:
  1. **Club Overview**: Text on one side (dynamically loaded title, subtitle, vision, and mission description from `/api/about`) and a high-resolution outdoor calisthenics image on the other.
  2. **Calisthenics Guide**: A grid detailing "What is Calisthenics" (*Build Strength Naturally using bodyweight*) along with key benefits (✓ Strength Training, ✓ Weight Loss, ✓ Functional Fitness, ✓ Yoga & Mobility).
- **Stats Dashboard**: A grid displaying four numerical metrics:
  - **1000+** Members Trained
  - **100+** Transformations
  - **15+** National Competitions
  - **20+** Trophies Won
- **API Dependencies**: Fetches data from GET `${API_URL}/api/about` and falls back to static defaults if the backend is down.

### 4.5. Why Choose Us (`WhyChooseUs.js` & `WhyChooseUs.css`)
- **Grid Layout**: Displays a 4-card grid detailing key club advantages:
  - *Expert Trainers* (certified coaches, personalized programs)
  - *Modern Facilities* (clean outdoor setup with calisthenics rigs)
  - *Nutrition Guidance* (diet charts, healthy habits)
  - *Flexible Timings* (multiple batch slots)
- **API Dependencies**: Fetches records from GET `${API_URL}/api/why-choose-us`. Cards display custom base64/URL images uploaded from the Admin Panel.

### 4.6. Batches Provided (`Batches.js` & `Batches.css`)
- **Icon Rendering**: Integrates `lottie-react` animations. If a JSON animation URL (`lottieIcon`) is present, it animates in real-time. Otherwise, it falls back to a static emoji (e.g., `🏋️`, `🔥`).
- **Data Display**: Shows cards containing batch titles and bullet points (e.g., *Fat loss training, bodyweight exercises*).
- **Time Slots Grid**: A visual calendar detailing:
  - **Morning Batches**: 6:00 AM - 11:00 AM slots.
  - **Evening Batches**: 5:00 PM - 8:00 PM slots (including a dedicated Kids Batch at 6:00 PM).
- **API Dependencies**: Fetches dynamic batch configurations from GET `${API_URL}/api/batches`.

### 4.7. Membership Packages (`Membership.js` & `Membership.css`)
- **Plan Cards**: Displays subscription options in a responsive grid. Highlights a specific plan as "Featured" (adds a gold border and badge).
- **Interactive Trigger**: Clicking "Join Now" on a card launches the register modal with that plan’s title pre-selected in the form.
- **Personal Training Disclaimer**: A bottom note indicating that PT fees vary based on the selected coach.
- **API Dependencies**: Fetches packages from GET `${API_URL}/api/memberships`.

### 4.8. Member Transformations (`Transformations.js` & `Transformations.css`)
- **Visuals**: A grid of member transformation photos showing before/after results with the member's name overlayed at the bottom.
- **API Dependencies**: Fetches database entries from GET `${API_URL}/api/transformations`. Renders base64 buffers or hosted image URLs.

### 4.9. Meet Our Experts (`Experts.js` & `Experts.css`)
- **Design**: Starts with a full-width panoramic photo banner of the coaching staff, followed by an info grid containing individual profiles (Avatar, Name, Role, and Bio/Credentials).
- **API Dependencies**: Fetches profiles from GET `${API_URL}/api/experts`. Implements intelligent fallback logic to load placeholder graphics if profile pictures fail to load.

### 4.10. Events and Clicks (`Events.js` & `Events.css`)
- **Dual Display Layout**:
  - **Gallery Grid**: Photographic cards representing outdoor training sessions, championships, and community meetups.
  - **Major Events Timeline**: A vertical numbered list of achievements over the last 2 years (e.g., *CaliYog National Championship 2024, Hyrox Competition*).
- **API Dependencies**: Fetches data from GET `${API_URL}/api/events`. Segregates records locally into two lists based on the `eventType` field (`"gallery"` vs `"organized"`).

### 4.11. Google Feedbacks (`Feedback.js` & `Feedback.css`)
- **Structure**: A grid of member testimonial cards designed to mimic authentic Google Reviews.
- **Fields**: Google User Avatars, User Name, Review Stats (number of reviews/photos, Local Guide badges), 5-star ratings, date, review text, and a CaliYog verification footer.
- **Content**: Uses pre-defined static mock data of highly rated client reviews.

### 4.12. Contact Form & Details (`Contact.js` & `Contact.css`)
- **Split Layout**:
  - **Contact Info Column**: Displays physical address, phone links, email address, website, and social media hyperlinked icons (Instagram, Facebook, WhatsApp).
  - **Enquiry Form**: Form fields (Name, Email, Phone, Message) linked to `handleSubmit`.
- **API Dependencies**: Sends POST request to `${API_URL}/api/contacts` to submit inquiries directly to the database.

### 4.13. Join Request Form Modal (`JoinForm.js` & `JoinForm.css`)
- **Form Fields**: Full Name, Email, Phone Number, Address, Batch, Timing Type (Morning/Evening), Time Slot (filtered based on batch/timing type), Membership Plan, Payment Type (UPI/Cash).
- **Conditional Fields**: Selecting *"Kids Batch"* renders secondary inputs for Parent Name and Parent Contact. Selecting different batches modifies the available timing drop-downs.
- **API Dependencies**: POSTs enrollment payload to `${API_URL}/api/join-request`.

---

## 5. Admin Dashboard Breakdown

The Admin Dashboard is a single-page application structure styled with an obsidian/navy theme. 

### 5.1. Authentication Route Guards (`AdminLogin.js` & `AdminRegister.js`)
- Protects access using JWT credentials stored in `localStorage` (`adminToken`).
- **Security Check Dialogue**: On successful login, the app prompts a security check window: *"An admin login attempt was detected. Is this you?"* with OK/Cancel options.
- Navigation redirects to `/admin/dashboard`.

### 5.2. Sidebar Navigation (`Sidebar.js`)
- Houses tabs: *Dashboard (Overview), About, Why Choose Us, Batches, Membership, Transformations, Experts, Events, Enquiries, Reports, Members, Settings*.
- Integrates a bottom Admin profile block showing administrative details (initials avatar, email, status indicator) and a logout trigger.

### 5.3. Global Search Engine (`GlobalSearchResults.js` & `AdminDashboard.js`)
- Combines API endpoints (`experts`, `events`, `memberships`, `join-requests`, `members`, `enquiries`, `batches`, `transformations`) into a single cache using `Promise.allSettled`.
- **Fuzzy Search Algorithm**: Splits query text into terms, scoring matches based on keyword presence and sorting results by priority (members priority level 1, other content level 2).
- Clicking a search result jumps the admin directly to the matching tab context.

### 5.4. Tab Implementations

#### Overview Tab (`OverviewTab.js`)
- Displays KPI cards: Total Members, Active Members, Pending Join Requests, Unread Enquiries, Total Monthly Revenue.
- Renders recent activity feeds and quick shortcut cards.

#### About Tab (`AboutTab.js`)
- Provides forms to update the dynamic homepage details.
- Supports uploading two about-section cover images (converted to base64 or stored on the server file structure).

#### Why Choose Us Tab (`WhyChooseUsTab.js`)
- Manage the 4 dynamic cards displayed on the landing page.
- Forms to edit titles, descriptions, and icon images.

#### Batches Tab (`BatchesTab.js`)
- Manage training programs.
- Supports adding title, bullet points, and setting custom Lottie animation URLs.

#### Membership Tab (`MembershipTab.js`)
- CRUD operations for membership plans.
- Control prices, subtitle text, features (bullet list items), and toggle the "Featured" flag.

#### Transformations Tab (`TransformationsTab.js`)
- Image upload form for before/after pictures.
- Directly converts images to base64 buffers for MongoDB storage.

#### Experts Tab (`ExpertsTab.js`)
- CRUD panel for coaches.
- Fields: Name, Role/Specialization, Experience/Bio, and Profile Image.

#### Events Tab (`EventsManagerTab.js`, `EventsTab.js` & `GalleryEventsTab.js`)
- Organized Events Manager: Allows compiling text-based descriptions of major achievements.
- Gallery Manager: Image upload form to add cards directly into the clicks section.

#### Enquiries Tab (`EnquiriesTab.js`)
- Lists client contact submissions.
- Features inline email reply utilities and message status indicators (New, Replied, Closed).

#### Reports Tab (`ReportsManagerTab.js`, `ReportsTab.js` & `KidsReportsTab.js`)
- Manage registrations and join requests.
- **Approval Workflow**: Displays pending registration logs. Pressing "Approve" moves the request into the general active members database (`/api/members`) or the Kids database (`/api/batch-members`).

#### Members Tab (`MembersTab.js`)
- Central database of all registered members.
- Shows contact info, address, registered plan, payment type, and registration date.
- Features search, filtering by active status, and deletion triggers.

#### Settings Tab (`SettingsTab.js`)
- Manage administrative credentials (username, email, password update mechanisms).

---

## 6. Database Schemas (Inferred MongoDB Models)

To configure the backend, implement these Mongoose schemas on your Node server:

### Admin Model
```javascript
const AdminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
}, { timestamps: true });
```

### About Model
```javascript
const AboutSchema = new mongoose.Schema({
  title: { type: String, default: "Welcome to CaliYog" },
  subtitle: { type: String, default: "With Strength and Grace" },
  description: { type: String, required: true },
  mission: { type: String, required: true },
  vision: { type: String },
  image1: { type: String }, // Path or base64
  image2: { type: String }
});
```

### Why Choose Us Model
```javascript
const WhyChooseUsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true } // Base64 or path
});
```

### Batch Model
```javascript
const BatchSchema = new mongoose.Schema({
  title: { type: String, required: true },
  icon: { type: String }, // fallback emoji
  lottieIcon: { type: String }, // Lottie JSON link
  points: [{ type: String }]
});
```

### Membership Plan Model
```javascript
const MembershipSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  subtitle: { type: String },
  features: [{ type: String }],
  featured: { type: Boolean, default: false }
});
```

### Transformation Model
```javascript
const TransformationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: { type: String, required: true } // Base64 string
});
```

### Expert Model
```javascript
const ExpertSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  experience: { type: String, required: true },
  image: {
    imageUrl: { type: String },
    data: { type: String }, // Base64
    contentType: { type: String }
  }
});
```

### Event Model
```javascript
const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  image: { type: String }, // Uploaded photo
  eventType: { type: String, enum: ["gallery", "organized"], required: true }
});
```

### Contact/Enquiry Model
```javascript
const ContactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  contact: { type: String },
  message: { type: String, required: true },
  status: { type: String, enum: ["New", "Replied", "Closed"], default: "New" }
}, { timestamps: true });
```

### Join Request / Enrollment Model
```javascript
const JoinRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  address: { type: String, required: true },
  batch: { type: String, required: true },
  timingType: { type: String, required: true }, // Morning / Evening
  timing: { type: String, required: true }, // Specific slot
  membership: { type: String, required: true },
  transactionType: { type: String, required: true }, // UPI / Cash
  parentName: { type: String },
  parentContact: { type: String },
  status: { type: String, enum: ["New", "Checked"], default: "New" },
  memberAdded: { type: Boolean, default: false },
  batchAdded: { type: Boolean, default: false }
}, { timestamps: true });
```

---

## 7. Step-by-Step Replica Implementation Guide

Follow these steps to reconstruct an identical clone of this project:

### Phase 1: Initialize the Project Workspace
1. Initialize a new Vite project:
   ```bash
   npm create vite@latest caliyog-fitness-replica -- --template react
   cd caliyog-fitness-replica
   ```
2. Install required npm packages:
   ```bash
   npm install react-router-dom framer-motion swiper axios date-fns react-icons react-hook-form react-hot-toast react-intersection-observer lottie-react
   ```
3. Install devDependencies for styling:
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```

### Phase 2: Design System Integration
1. In `tailwind.config.js`, configure font families (`Inter`, `Poppins`) and keyframes for animations (spin, fade-in, modal-slide).
2. Configure `src/index.css` using the `@layer` rules as provided in this project's style guide. Establish classes for `.glass-card`, `.text-gradient`, and input elements.
3. Import the Google fonts inside the index file.

### Phase 3: Public UI Development
1. **Asset Migration**: Import visual assets (such as `CaliYog-Logo.png`, default placeholder images, and `home-video.mp4` into the `src/assets` folder).
2. **Components**: Draft individual sections (`Navbar.js`, `Home.js`, `About.js`, `WhyChooseUs.js`, `Batches.js`, `Membership.js`, `Transformations.js`, `Experts.js`, `Events.js`, `Feedback.js`, `Contact.js`, `Footer.js`, and `JoinForm.js`).
3. Set up the API URL in a utility helper (`src/api/config.js`) so that endpoint roots can be toggled globally.

### Phase 4: Admin Panel Development
1. Create administrative subdirectories (`src/admin/pages` and `src/admin/components`).
2. Build `AdminLogin.js` and `AdminRegister.js` with responsive video backgrounds. Add the popup prompt trigger during authentications.
3. Build `Sidebar.js` and `Topbar.js` with collapse triggers.
4. Implement tabs in `src/admin/pages`:
   - `OverviewTab`: Cards with dynamic KPI counting loops.
   - `MembersTab` & `KidsReportsTab`: Tabular columns of users with pagination and CSV export options.
   - `EnquiriesTab`: List of contact messages with email draft options.
   - CRUD management tabs with multi-part form submissions for experts, batches, and gallery cards.

### Phase 5: Routing & Global State
1. Integrate the `AuthProvider` (`AuthContext.js`) to guard private routes.
2. In `App.js`, configure lazy loading using React `Suspense` and `lazy` methods:
   - `/` -> `HomePage`
   - `/admin/login` -> `AdminLogin`
   - `/admin/register` -> `AdminRegister`
   - `/admin/dashboard` -> protected redirect wrapper to `AdminDashboard`
   - `*` -> `NotFound`

### Phase 6: Global Search Engine
1. Implement the Promise cache engine in `AdminDashboard.js` to execute batch loading from endpoints.
2. Draft matching criteria loops for search text using index scoring.

### Phase 7: Backend Configuration
1. Initialize an Express project in a sibling directory:
   ```bash
   mkdir caliyog-backend && cd caliyog-backend
   npm init -y
   npm install express mongoose cors dotenv bcryptjs jsonwebtoken multer
   ```
2. Build routing files for the schemas listed in Section 6.
3. Add JWT authentication middleware checks to protect POST, PUT, and DELETE API endpoints.
4. Deploy the backend to Railway/Render and update `API_URL` on the React client side.
