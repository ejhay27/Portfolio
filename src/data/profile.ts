/**
 * Owner profile configuration.
 *
 * • To use a real portrait, place it at `src/assets/profile.jpg`, import it
 *   here and set `avatar` to the import. When `avatar` is undefined the UI
 *   renders a monogram instead of a photo.
 * • `secretName` powers the Easter egg: typing `secretName.trigger` anywhere on
 *   the page (outside text inputs) or tapping the portrait `tapCount` times
 *   reveals `secretName.reveal` in place of the display name.
 */

export interface ProfileLink {
  label: string;
  href: string;
}

export interface Profile {
  name: string;
  /** Short, honest role line. */
  role: string;
  tagline: string;
  bio: string[];
  avatar?: string;
  /** Initials used when no avatar is configured. */
  monogram: string;
  /** Optional external links. Only rendered when present. */
  links: ProfileLink[];
  secretName: {
    reveal: string;
    trigger: string;
    tapCount: number;
    message: string;
  };
}

/**
 * Auto-detect the portrait. Save the photo as `src/assets/profile.jpg`
 * (or .jpeg / .png / .webp) and it is picked up automatically — no code edits.
 */
const portraitFiles = import.meta.glob<string>("../assets/profile.{jpg,jpeg,png,webp}", {
  eager: true,
  import: "default",
});
const detectedPortrait: string | undefined = Object.values(portraitFiles)[0];

export const profile: Profile = {
  name: "Haru Unabara",
  role: "Independent software creator",
  tagline: "Building tools for drawing, presenting, learning, assisting and protecting.",
  bio: [
    "I'm Haru Unabara. I make software — a drawing studio, a drawing app, a presentation maker, an AI assistant concept, a PC security project and a student productivity app.",
    "Each project has its own identity, but they come from one place: a belief that focused tools, built honestly, are better than crowded ones. This portfolio documents what is actually built, what is intended, and the difference between the two.",
  ],
  avatar: detectedPortrait,
  monogram: "HU",
  links: [
    // { label: "GitHub", href: "https://github.com/..." },
    // { label: "Email", href: "mailto:..." },
  ],
  secretName: {
    reveal: "海原 春",
    trigger: "haru",
    tapCount: 5,
    message: "You found the secret name.",
  },
};
