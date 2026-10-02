# Images

Real screenshots now live alongside the diagram placeholders.
**Do not use stock photography.**

| File                  | Shows                                  | Used in                    |
| --------------------- | -------------------------------------- | -------------------------- |
| `profile.png`           | ✅ Portrait headshot (4:5)             | Hero + About portrait      |
| `solaris-hero.png`    | ✅ SOLARIS platform overview (hero)    | Work feature + case study Fig. 01 |
| `solaris-admin.png`   | ✅ SOLARIS admin dashboard             | Fan carousel + case study Fig. 04 |
| `solaris-admin-project.png` | ✅ SOLARIS project records       | Fan carousel + case study Fig. 02 |
| `solaris-admin-schedule.png` | ✅ SOLARIS scheduling           | Fan carousel + case study Fig. 03 |
| `solaris-admin-iotdevice.png` | ✅ SOLARIS IoT devices         | Fan carousel + case study Fig. 05 |
| `rentahanan1.png`     | ✅ RenTahanan landing hero             | Work row 02 + detail Fig. 01 |
| `rentahanan2.png`     | ✅ RenTahanan password reset           | Detail Fig. 02             |
| `rentahanan3.png`     | ✅ RenTahanan registration form        | Detail Fig. 03             |
| `solaris-mobile-1.jpg` | ✅ SOLARIS mobile view 1 (9:19)      | Case study Fig. 06 via PhoneMockup |
| `solaris-mobile-2.jpg` | ✅ SOLARIS mobile view 2 (9:19)      | Case study Fig. 07 via PhoneMockup |
| `solaris-mobile-3.jpg` | ✅ SOLARIS mobile view 3 (9:19)      | Case study Fig. 08 via PhoneMockup |
| `project-portfolio.png` + `-placeholder.svg` | Generic fallback slot for future project entries | `images.portfolio` fallback |

How it works:

- `lib/images.ts` maps each slot to `{ src, fallback, alt }`.
- `components/projects/ProjectScreenshot.tsx` tries `src` first, swaps to the
  `*-placeholder.svg` fallback on error. Renders with `object-contain` inside
  the 16:9 monitor cavity — screenshots are never cropped, only letterboxed.
- `data/projects.ts` holds each project's `gallery[]` (order = display order).
- Portrait: natural light, neutral background, no heavy filter, no
  distortion (`object-cover` handles crop).

Tips:

- `rentahanan1.png` still shows the browser bookmark bar at the top —
  re-capture with a clean window (or crop ~100px off the top) when you
  get a chance; the layout crops slightly via `object-cover` but the bar
  is still partially visible.
- Export JPGs at quality 80, PNGs for UI screenshots.
