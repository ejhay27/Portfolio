/**
 * ─────────────────────────────────────────────────────────────────────────────
 *  HARU UNABARA — PROJECT DATA
 * ─────────────────────────────────────────────────────────────────────────────
 *  This file is the single source of truth for the project gallery, the
 *  category filters and every case-study page. Edit a description, change a
 *  status, add a screenshot or configure a link here — nothing in the UI
 *  components needs to change.
 *
 *  ACCURACY RULES (please keep them when editing):
 *   • `features.confirmed`  → ONLY things verified in the actual application.
 *   • `features.intended`   → goals / planned capabilities, NOT yet verified.
 *   • `status`              → set by the owner. Nothing is "Released" by default.
 *   • `thumbnail.kind`      → "artwork" for original illustrations,
 *                             "screenshot" only for real captures of the app.
 *   • `technologies`        → leave empty until the stack is confirmed.
 *   • `repositoryUrl` / `demoUrl` → links only render when configured.
 *
 *  Basalt: no Basalt entry existed in this data set, so none is included.
 *  If Basalt is re-added, keep its established description verbatim.
 * ─────────────────────────────────────────────────────────────────────────────
 */

import carbonStudioArt from "../assets/projects/carbon-studio.jpg";
import carbonFluxArt from "../assets/projects/carbon-flux.jpg";
import folianArt from "../assets/projects/folian.jpg";
import orvynArt from "../assets/projects/orvyn.jpg";
import purgeArt from "../assets/projects/purge.jpg";
import myClassmateArt from "../assets/projects/myclassmate.jpg";

export type ProjectStatus = "Concept" | "In Development" | "Experimental" | "Released";

export type ProjectCategory =
  | "Creative Software"
  | "Productivity"
  | "Artificial Intelligence"
  | "Security"
  | "Education";

/** Order used by the filter bar. */
export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "Creative Software",
  "Productivity",
  "Artificial Intelligence",
  "Security",
  "Education",
];

export interface ProjectImage {
  src: string;
  alt: string;
  /** "artwork" = original illustration (NOT a screenshot). "screenshot" = real capture. */
  kind: "artwork" | "screenshot";
  caption?: string;
}

export interface CaseStudySection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface ProjectFeatures {
  /** Verified in the actual application. */
  confirmed: string[];
  /** Intended / planned. Not yet verified as implemented. */
  intended: string[];
  /** Optional honest note shown next to the feature lists. */
  note?: string;
}

export interface Project {
  id: string;
  name: string;
  /** Primary category — drives filtering. */
  category: ProjectCategory;
  /** Optional secondary categories — also matched by the filters. */
  secondaryCategories?: ProjectCategory[];
  /** Human-readable label shown on the card, e.g. "Digital Art / Creative Software". */
  categoryLabel: string;
  description: string;
  longDescription: string;
  intendedAudience: string;
  status: ProjectStatus;
  features: ProjectFeatures;
  /** Confirmed technology stack. Leave empty rather than guessing. */
  technologies: string[];
  /** Target / historical platforms. */
  platforms: string[];
  /** Optional free-form tags shown on the card. */
  tags: string[];
  thumbnail: ProjectImage;
  screenshots: ProjectImage[];
  repositoryUrl?: string;
  demoUrl?: string;
  /** Internal route for the case study. Omit to hide the detail action. */
  caseStudyUrl?: string;
  featured: boolean;
  /** Visual identity used by cards and the case-study hero. */
  accent: string;
  caseStudy: {
    sections: CaseStudySection[];
    challenges: string[];
    limitations: string[];
    futurePlans: string[];
  };
}

/* ──────────────────────────────────────────────────────────────────────────── */

export const projects: Project[] = [
  /* ────────────────────────────── 1. CARBON STUDIO ─────────────────────────── */
  {
    id: "carbon-studio",
    name: "Carbon Studio",
    category: "Creative Software",
    categoryLabel: "Digital Art / Creative Software",
    description:
      "A professional drawing, illustration, and concept-creation application designed for desktop and Android platforms.",
    longDescription:
      "Carbon Studio is a creative software project focused on professional digital drawing, illustration, and concept art workflows. It aims to give artists and digital creators a dedicated environment for developing visual ideas across desktop and Android devices — a focused workspace where the relationship between desktop and mobile creation is part of the design from the start.",
    intendedAudience: "Digital artists, illustrators, and concept creators",
    status: "In Development", // ← configurable
    features: {
      confirmed: [
        "Positioned as a dedicated drawing, illustration and concept-creation application",
        "Designed for desktop and Android platforms",
      ],
      intended: [
        "A focused workspace for developing visual ideas from sketch to finished illustration",
        "A consistent creative workflow across desktop and Android",
        "A sophisticated dark interface that keeps attention on the artwork",
      ],
      note:
        "Specific brushes, layer systems, blending modes, file formats, stylus support and synchronisation are only listed here once they are verified in the actual application.",
    },
    technologies: [], // ← add only confirmed technologies
    platforms: ["Desktop", "Android"],
    tags: ["Illustration", "Concept Art", "Desktop", "Android"],
    thumbnail: {
      src: carbonStudioArt,
      alt: "Original abstract artwork of layered painted sheets in charcoal and amber representing Carbon Studio",
      kind: "artwork",
    },
    screenshots: [], // ← add { src, alt, kind: "screenshot" } entries when available
    repositoryUrl: undefined,
    demoUrl: undefined,
    caseStudyUrl: "#/project/carbon-studio",
    featured: true,
    accent: "#d9a24a",
    caseStudy: {
      sections: [
        {
          heading: "Overview of Carbon Studio",
          paragraphs: [
            "Carbon Studio is a creative software project built around professional digital drawing, illustration and concept creation. It is one of two drawing projects in this portfolio — the other is Carbon: Flux — and the two are separate applications with separate goals, builds and histories.",
            "Where Carbon: Flux is a focused drawing application, Carbon Studio is scoped as a broader studio environment: a place to develop a visual idea from first marks through to a finished illustration or concept piece.",
          ],
        },
        {
          heading: "Motivation behind building a drawing application",
          paragraphs: [
            "Digital artists tend to assemble their workflow from several tools and move work between devices as they go. Carbon Studio starts from the idea that a single, dedicated environment — designed around how illustrations and concepts actually get made — can remove a lot of that friction.",
            "Building the application myself also means every decision about the workspace can be made in favour of the artist rather than in favour of a feature list.",
          ],
        },
        {
          heading: "Intended audience",
          paragraphs: [
            "Carbon Studio is intended for digital artists, illustrators and concept creators: people who draw regularly, think in iterations, and need their tools to stay out of the way.",
          ],
        },
        {
          heading: "Desktop and Android platform goals",
          paragraphs: [
            "The project targets both desktop and Android. The goal is a workflow in which a concept can be started on a tablet and continued at a desk — or the other way round — without the tool feeling like a different product on each device.",
            "How much of that cross-device experience is achieved in the current build is documented honestly in the feature lists below.",
          ],
        },
        {
          heading: "Actual drawing and illustration features",
          paragraphs: [
            "This page deliberately separates what is confirmed from what is intended. Details such as brush engines, layers, blending modes, supported file formats, stylus pressure support and synchronisation will appear in the confirmed list only once they are verified in the application itself.",
          ],
        },
        {
          heading: "Interface design and creative workflow",
          paragraphs: [
            "The design direction for Carbon Studio is a sophisticated dark interface: low-contrast chrome, restrained accents and as much screen as possible devoted to the canvas. Rich creative imagery and layered artwork define the visual language of the project rather than icons and panels.",
            "The workflow direction is to let an artist move from rough concept to refined illustration inside the same workspace, with the interface adapting between desktop input and touch.",
          ],
        },
        {
          heading: "Development challenges and future plans",
          paragraphs: [
            "The main challenges are the ones every serious drawing tool faces: keeping the canvas responsive, keeping the interface consistent across very different screen sizes and input methods, and deciding which professional features to build first. Future plans are listed below and will move into the confirmed features list as they are shipped.",
          ],
        },
      ],
      challenges: [
        "Designing one workspace that works for both desktop input and Android touch",
        "Keeping the canvas responsive as the feature set grows",
        "Prioritising which professional illustration features to build first",
      ],
      limitations: [
        "The confirmed feature list is intentionally short until individual capabilities are verified in the application",
        "No technology stack, release date or performance figures are published for this project",
      ],
      futurePlans: [
        "Verify and document the drawing and illustration feature set",
        "Refine the cross-device desktop ↔ Android workflow",
        "Add authentic screenshots from the application as they become available",
      ],
    },
  },

  /* ─────────────────────────────── 2. CARBON: FLUX ─────────────────────────── */
  {
    id: "carbon-flux",
    name: "Carbon: Flux",
    category: "Creative Software",
    categoryLabel: "Drawing Application",
    description:
      "A digital drawing application focused on illustration, creative tools, and a dedicated digital art workspace.",
    longDescription:
      "Carbon: Flux is a digital drawing application project designed around digital illustration and creative expression. It provides a dedicated environment for drawing and exploring visual ideas, with desktop and Android versions included in the project's history. It is a separate application from Carbon Studio, with its own builds and its own development story — including real performance lessons learned along the way.",
    intendedAudience: "Artists and anyone who wants a dedicated space for digital drawing",
    status: "Experimental", // ← configurable
    features: {
      confirmed: [
        "A drawing canvas with brush-based painting",
        "Brush sizes large enough that very large brushes are a measurable performance cost",
        "Desktop and Android versions exist in the project's history",
      ],
      intended: [
        "A smoother experience with large brushes on modest hardware",
        "Confirmation and documentation of the currently available desktop and Android builds",
      ],
      note:
        "Performance is a genuine, ongoing consideration: the desktop application has experienced slowdowns with large brushes on a laptop with 8 GB of RAM. Carbon: Flux is not presented as lightweight or fully optimised.",
    },
    technologies: [], // ← add only confirmed technologies
    platforms: ["Desktop", "Android (availability to be confirmed)"],
    tags: ["Drawing", "Illustration", "Canvas", "Brushes"],
    thumbnail: {
      src: carbonFluxArt,
      alt: "Original abstract artwork of expressive teal and coral brush strokes on a dark canvas representing Carbon: Flux",
      kind: "artwork",
    },
    screenshots: [], // ← authentic build screenshots or artwork made in Carbon: Flux go here
    repositoryUrl: undefined,
    demoUrl: undefined,
    caseStudyUrl: "#/project/carbon-flux",
    featured: false,
    accent: "#35c7b6",
    caseStudy: {
      sections: [
        {
          heading: "Project overview",
          paragraphs: [
            "Carbon: Flux is a digital drawing application: a dedicated environment for illustration and for exploring visual ideas. It shares the “Carbon” name with Carbon Studio but it is its own project, with its own builds, its own history and independently configured links.",
          ],
        },
        {
          heading: "Purpose of the application",
          paragraphs: [
            "The purpose of Carbon: Flux is creative expression through drawing. It is designed to give the artist a canvas and brushes and then get out of the way — a focused space rather than a full studio.",
          ],
        },
        {
          heading: "Drawing and illustration workflow",
          paragraphs: [
            "The workflow is centred on the canvas: open the application, pick a brush, and draw. Anything added to that loop has to justify itself against the simplicity of the core experience.",
          ],
        },
        {
          heading: "Actual implemented canvas and brush functionality",
          paragraphs: [
            "What is confirmed from the available builds is a drawing canvas with brush-based painting, including brush sizes large enough to expose real performance costs. Specific brush controls, layer features and export options are not described here unless they exist in the application — nothing on this page is a mock-up of an interface that has not been built.",
          ],
        },
        {
          heading: "Desktop and Android experience",
          paragraphs: [
            "Both desktop and Android versions are part of the project's history. The current availability of each build is subject to confirmation, and this page will be updated — with authentic screenshots where possible — as that is confirmed.",
          ],
        },
        {
          heading: "Performance considerations",
          paragraphs: [
            "Honest note: the desktop application has experienced performance slowdowns when painting with large brushes on a laptop with 8 GB of RAM. That is a real limitation of the current build and it shapes the development priorities. Performance optimisation is treated as a genuine engineering problem for the project, not as a solved one.",
          ],
        },
        {
          heading: "Future development plans",
          paragraphs: [
            "The near-term plan is to improve large-brush performance on modest hardware and to confirm and document the state of the desktop and Android builds. Longer-term plans will be added here as they become concrete.",
          ],
        },
      ],
      challenges: [
        "Large brushes slow the desktop build on an 8 GB RAM laptop",
        "Maintaining a consistent experience across desktop and Android builds",
      ],
      limitations: [
        "Performance with large brushes on modest hardware is a known issue",
        "Current availability of the Android build is pending confirmation",
        "Brush controls, layers and export options are only documented when present in the application",
      ],
      futurePlans: [
        "Optimise large-brush rendering performance",
        "Confirm current desktop and Android build availability",
        "Publish authentic screenshots and artwork made in the application",
      ],
    },
  },

  /* ────────────────────────────────── 3. FOLIAN ────────────────────────────── */
  {
    id: "folian",
    name: "Folian",
    category: "Productivity",
    categoryLabel: "Presentation Software",
    description:
      "A presentation maker designed to offer a more capable and flexible presentation-creation experience.",
    longDescription:
      "Folian is a presentation-making application project intended to help users create presentations in a more flexible and capable environment. Its central idea is to go beyond a basic slide-making experience and provide a more refined way to develop and present ideas. Folian is presentation software — not a generic design tool.",
    intendedAudience: "Anyone who needs to communicate ideas through slides",
    status: "In Development", // ← configurable
    features: {
      confirmed: ["Creating presentations is the application's core workflow"],
      intended: [
        "A more flexible and capable way to build slides than a basic slide maker",
        "A refined environment for developing an idea and then presenting it",
      ],
      note:
        "Folian does not claim AI-generated slides, animations, collaboration, cloud storage, templates, transitions or specific export formats until those capabilities are verified.",
    },
    technologies: [], // ← add only confirmed technologies
    platforms: [],
    tags: ["Presentations", "Slides", "Typography"],
    thumbnail: {
      src: folianArt,
      alt: "Original abstract artwork of floating cream slides with typographic shapes representing Folian",
      kind: "artwork",
    },
    screenshots: [],
    repositoryUrl: undefined,
    demoUrl: undefined,
    caseStudyUrl: "#/project/folian",
    featured: false,
    accent: "#c9b27c",
    caseStudy: {
      sections: [
        {
          heading: "Overview of Folian",
          paragraphs: [
            "Folian is a presentation maker. The project exists to offer a more capable and flexible way to create presentations than the basic slide-making experience most people are used to.",
          ],
        },
        {
          heading: "The role of presentation software",
          paragraphs: [
            "Presentations are still one of the main ways ideas get communicated — in classrooms, in teams and on stages. The software used to build them shapes how clearly those ideas come across, which makes it worth building well.",
          ],
        },
        {
          heading: "The project's vision for a better presentation-making experience",
          paragraphs: [
            "Folian's vision is a presentation workspace that is both more capable and more flexible: a tool that helps you develop an idea, not just lay out bullet points, and that feels polished to work in.",
          ],
        },
        {
          heading: "Intended users and workflows",
          paragraphs: [
            "Folian is for anyone who needs to communicate through slides. The intended workflow is simple to state — build the slides, refine them, present them — and the project's ambition is in how well each of those steps is supported.",
          ],
        },
        {
          heading: "Actual slide-creation and editing features",
          paragraphs: [
            "The confirmed scope is the creation of presentations. Specific editing capabilities, templates, transitions, animations, collaboration, cloud storage and export formats are not listed as implemented here; they will be added to the confirmed list only once verified in the application.",
          ],
        },
        {
          heading: "Interface and usability decisions",
          paragraphs: [
            "The visual identity of Folian leans on editorial typography, structured slide layouts and presentation-inspired visuals. The interface direction is a polished creative workspace in which the slide, not the toolbar, is the centre of attention.",
          ],
        },
        {
          heading: "Future improvements",
          paragraphs: [
            "Future improvements are listed below. As each one ships it moves from “intended” to “confirmed”.",
          ],
        },
      ],
      challenges: [
        "Being more capable than a basic slide maker without becoming a generic design application",
        "Keeping the editing experience simple while adding flexibility",
      ],
      limitations: [
        "Only the core presentation-creation workflow is confirmed",
        "No templates, transitions, collaboration, cloud storage or export formats are claimed",
      ],
      futurePlans: [
        "Document and verify the slide-editing feature set",
        "Refine the presentation workspace and typography system",
      ],
    },
  },

  /* ────────────────────────────────── 4. O.R.V.Y.N ──────────────────────────── */
  {
    id: "orvyn",
    name: "O.R.V.Y.N",
    category: "Artificial Intelligence",
    categoryLabel: "Artificial Intelligence · Personal Assistant",
    description:
      "A personalized, customizable AI assistant concept designed around an experience users can tailor to their needs and preferences.",
    longDescription:
      "O.R.V.Y.N is an AI assistant project focused on personalization and customization. Its core identity is the idea of an assistant that can be adapted to an individual's preferences and desired workflows — configurable interactions rather than a one-size-fits-all chatbot. It is presented here as an independent AI software project at the concept stage.",
    intendedAudience: "People seeking an AI assistant tailored to their preferences",
    status: "Concept", // ← configurable
    features: {
      confirmed: [],
      intended: [
        "A refined conversation workspace",
        "A configurable assistant identity",
        "Preference controls that shape how the assistant responds",
      ],
      note:
        "No AI backend or model integration is configured for O.R.V.Y.N at the time of writing, so it is presented as a concept rather than a working AI service. The acronym is not expanded here, and no support for local models, voice recognition, persistent memory, autonomous actions, multiple providers or offline operation is claimed.",
    },
    technologies: [],
    platforms: [],
    tags: ["AI Assistant", "Personalization", "Concept"],
    thumbnail: {
      src: orvynArt,
      alt: "Original abstract artwork of a soft violet orb of light with concentric rings representing O.R.V.Y.N",
      kind: "artwork",
    },
    screenshots: [],
    repositoryUrl: undefined,
    demoUrl: undefined,
    caseStudyUrl: "#/project/orvyn",
    featured: true,
    accent: "#8b5cf6",
    caseStudy: {
      sections: [
        {
          heading: "Project overview",
          paragraphs: [
            "O.R.V.Y.N is a personalized, customizable AI assistant concept. Its defining idea is not a particular model or capability but adaptability: an assistant whose behaviour, identity and interactions can be tailored by the person using it.",
          ],
        },
        {
          heading: "Vision for a personalized AI assistant",
          paragraphs: [
            "Most assistants ask the user to adapt to them. O.R.V.Y.N inverts that: the assistant should adapt to the user's preferences and the workflows they actually want help with.",
          ],
        },
        {
          heading: "Customization goals",
          paragraphs: [
            "The customization goals include a configurable assistant identity and preference controls that shape the experience. These are design directions for the project; they are listed under intended capabilities until implemented.",
          ],
        },
        {
          heading: "Intended user experience",
          paragraphs: [
            "The intended experience is a refined conversation workspace with a distinctive visual identity — futuristic, with restrained violet lighting and clear conversation layouts — in which the user's settings visibly change how the assistant behaves.",
          ],
        },
        {
          heading: "Actual AI capabilities and model integrations",
          paragraphs: [
            "At the time of writing, no AI backend is configured for O.R.V.Y.N. There are no confirmed model integrations, and this portfolio does not simulate assistant responses or present mock conversations as a real AI service. O.R.V.Y.N should be read as a concept / prototype.",
          ],
        },
        {
          heading: "Privacy, configuration, and data-handling considerations",
          paragraphs: [
            "Because personalization depends on user preferences, how those preferences are stored and whether any conversation data leaves the device are first-order design questions. No specific data-handling approach is confirmed yet; these considerations will be documented alongside any backend that is integrated.",
          ],
        },
        {
          heading: "Current limitations and future plans",
          paragraphs: [
            "The main limitation is simple: there is no working AI integration yet. The future plans below describe the path from concept to prototype.",
          ],
        },
      ],
      challenges: [
        "Defining what “personalized” means in concrete, configurable terms",
        "Choosing a backend approach that respects user data",
      ],
      limitations: [
        "No AI backend or model integration is configured",
        "No voice, memory, local-model, multi-provider or offline capabilities are claimed",
        "The acronym O.R.V.Y.N is intentionally not expanded here",
      ],
      futurePlans: [
        "Select and integrate an AI backend",
        "Prototype the configurable assistant identity and preference controls",
        "Document privacy and data-handling behaviour once the backend exists",
      ],
    },
  },

  /* ─────────────────────────────────── 5. PURGE ────────────────────────────── */
  {
    id: "purge",
    name: "Purge",
    category: "Security",
    categoryLabel: "Cybersecurity / PC Security",
    description:
      "A security-focused software project intended to help address PC security concerns and protect users' computers.",
    longDescription:
      "Purge is an independent software project centred on computer security and PC protection. Its goal is to address security-related problems and provide a software experience focused on helping users understand or improve the security of their computers. Its identity is technical and restrained: a dark interface, warning accents used sparingly, and structured diagnostic visuals.",
    intendedAudience: "Computer users who care about the security of their PC",
    status: "Concept", // ← configurable
    features: {
      confirmed: [],
      intended: [
        "Help users understand the security posture of their computer",
        "Help users improve PC security through clear, structured guidance",
        "A diagnostic-style interface with clear status indicators",
      ],
      note:
        "The exact detection and protection mechanisms come from the actual implementation and are not yet documented here. Purge is not described as an antivirus, malware scanner, vulnerability scanner, firewall, exploit-prevention system or real-time protection suite unless those functions are verified. No scan results, threat counts, protection scores or certifications are shown anywhere in this portfolio.",
    },
    technologies: [],
    platforms: ["PC"],
    tags: ["PC Security", "Diagnostics"],
    thumbnail: {
      src: purgeArt,
      alt: "Original abstract artwork of a thin glowing shield outline on a dark hexagonal grid representing Purge",
      kind: "artwork",
    },
    screenshots: [],
    repositoryUrl: undefined,
    demoUrl: undefined,
    caseStudyUrl: "#/project/purge",
    featured: false,
    accent: "#e5533d",
    caseStudy: {
      sections: [
        {
          heading: "Overview of Purge",
          paragraphs: [
            "Purge is a PC security project. Its goal is to help users understand or improve the security of their computers through a focused, technical software experience.",
          ],
        },
        {
          heading: "The security problem it aims to address",
          paragraphs: [
            "Many computer users care about security but have no clear picture of how their machine is actually configured, or what they could do about it. Purge aims at that gap: making security concerns legible and actionable for the person at the keyboard.",
          ],
        },
        {
          heading: "Intended protection and diagnostic goals",
          paragraphs: [
            "The intended direction is diagnostic and explanatory — structured information with clear status indicators — rather than a bundle of background services. Which protection goals are pursued, and how, is defined by the implementation.",
          ],
        },
        {
          heading: "Actual security checks and detection capabilities",
          paragraphs: [
            "No specific checks or detection capabilities are listed as implemented on this page. The exact mechanisms must come from the actual application and will be documented here only once they are verified. Until then Purge is best understood as a security-focused concept.",
          ],
        },
        {
          heading: "User interface and reporting",
          paragraphs: [
            "The interface direction is a dark, technical design language with restrained warning accents and structured diagnostic visuals. Any dashboard shown for Purge is conceptual and is clearly distinguished from live security analysis.",
          ],
        },
        {
          heading: "False-positive handling and safe operation",
          paragraphs: [
            "A security tool that alarms users unnecessarily — or changes a system without consent — does harm. Safe operation and conservative handling of uncertain results are design principles for the project, and the specific approach will be documented alongside the checks that implement them.",
          ],
        },
        {
          heading: "Current limitations and future development",
          paragraphs: [
            "The main limitation is that detection and protection capabilities are not yet verified and documented. Future development is outlined below.",
          ],
        },
      ],
      challenges: [
        "Making security information understandable without oversimplifying it",
        "Avoiding false alarms and unsafe automatic changes",
      ],
      limitations: [
        "No detection or protection mechanisms are documented as implemented yet",
        "Purge is not an antivirus, malware scanner, firewall or real-time protection suite unless verified",
        "No scan results, scores or certifications exist or are shown",
      ],
      futurePlans: [
        "Define and implement the first set of verifiable security checks",
        "Design the diagnostic reporting interface around real results",
        "Document false-positive handling once checks exist",
      ],
    },
  },

  /* ──────────────────────────────── 6. MYCLASSMATE ─────────────────────────── */
  {
    id: "myclassmate",
    name: "MyClassmate",
    category: "Education",
    secondaryCategories: ["Productivity"],
    categoryLabel: "Education · Student Productivity",
    description:
      "A student-focused productivity application designed to help learners organize schedules, plan tasks, create notes, practice for exams, and manage their academic activities.",
    longDescription:
      "MyClassmate is an education-oriented project that brings several student productivity needs into one application concept. Its purpose is to help students organize their academic routines, make plans, record notes and prepare for examinations in a more structured environment — making student life easier to organize through practical digital tools.",
    intendedAudience: "Students",
    status: "In Development", // ← configurable
    features: {
      confirmed: [],
      intended: [
        "Scheduling — organize academic schedules and important activities",
        "Planning — create plans and manage study-related tasks",
        "Notes — record and organize learning materials",
        "Exam practice — support examination preparation and practice activities",
        "Room for additional student tools as they are implemented",
      ],
      note:
        "The five areas above define the project's scope. Each moves to the confirmed list once verified in the application. MyClassmate does not claim automatic timetable generation, cloud synchronisation, reminders, AI tutoring, grade prediction, shared notes or collaborative classrooms.",
    },
    technologies: [],
    platforms: [],
    tags: ["Scheduling", "Planning", "Notes", "Exam Practice"],
    thumbnail: {
      src: myClassmateArt,
      alt: "Original flat illustration of notebooks, a pencil, sticky notes and a calendar representing MyClassmate",
      kind: "artwork",
    },
    screenshots: [],
    repositoryUrl: undefined,
    demoUrl: undefined,
    caseStudyUrl: "#/project/myclassmate",
    featured: true,
    accent: "#5aa9ff",
    caseStudy: {
      sections: [
        {
          heading: "Overview of MyClassmate",
          paragraphs: [
            "MyClassmate is a student productivity application: one place to organize schedules, plan tasks, keep notes and practise for exams. It is built around a simple belief — that student life gets easier when the practical parts of it are organized.",
          ],
        },
        {
          heading: "Challenges students face when organizing academic responsibilities",
          paragraphs: [
            "Students juggle timetables, deadlines, reading, revision and everything that happens outside class — usually across several unrelated apps and a lot of memory. The result is missed tasks, scattered notes and last-minute exam preparation.",
          ],
        },
        {
          heading: "Scheduling and planning workflows",
          paragraphs: [
            "Scheduling in MyClassmate is about organizing academic schedules and important activities. Planning sits alongside it: creating plans and managing study-related tasks so that what needs doing is visible and ordered.",
          ],
        },
        {
          heading: "Note-taking and organization",
          paragraphs: [
            "The notes area is for recording and organizing learning materials — keeping what was learned close to the schedule and plans it relates to.",
          ],
        },
        {
          heading: "Exam preparation and practice",
          paragraphs: [
            "Exam practice supports examination preparation and practice activities, so revision becomes a routine rather than a scramble.",
          ],
        },
        {
          heading: "Actual implemented features",
          paragraphs: [
            "The feature lists below separate confirmed capabilities from the intended scope. Only controls for features that exist in the actual application are shown as implemented; the scope areas remain “intended” until they are verified in a build.",
          ],
        },
        {
          heading: "Future student productivity tools",
          paragraphs: [
            "MyClassmate leaves room for additional academic productivity tools as they are implemented. The plans below describe what comes next.",
          ],
        },
      ],
      challenges: [
        "Bringing several distinct student needs into one coherent, friendly interface",
        "Keeping the information hierarchy clear as more tools are added",
      ],
      limitations: [
        "Scope areas are listed as intended until verified in the application",
        "No automatic timetable generation, cloud sync, reminders, AI tutoring, grade prediction or collaboration features are claimed",
      ],
      futurePlans: [
        "Verify and document the scheduling, planning, notes and exam-practice features",
        "Add further student productivity tools as they are implemented",
        "Publish authentic screenshots of the application",
      ],
    },
  },
];

/* ──────────────────────────────── helpers ─────────────────────────────────── */

export const getProjectById = (id: string): Project | undefined =>
  projects.find((p) => p.id === id);

export const projectMatchesCategory = (p: Project, category: ProjectCategory | "All"): boolean =>
  category === "All" || p.category === category || (p.secondaryCategories ?? []).includes(category);

export const STATUS_STYLES: Record<ProjectStatus, { dot: string; label: string }> = {
  Concept: { dot: "bg-zinc-400", label: "Concept" },
  "In Development": { dot: "bg-amber-400", label: "In Development" },
  Experimental: { dot: "bg-fuchsia-400", label: "Experimental" },
  Released: { dot: "bg-emerald-400", label: "Released" },
};
