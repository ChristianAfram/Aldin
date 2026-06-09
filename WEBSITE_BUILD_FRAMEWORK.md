# Production Ready Website Building Framework for Claude Code

## 1. Core Mission

You are building a production ready website.

Your goal is not to create a nice demo.

Your goal is to create a website that is:

1. Fast
2. Secure
3. Accessible
4. Responsive
5. Maintainable
6. SEO ready
7. Easy to deploy
8. Easy to update
9. Safe against common mistakes
10. Professional enough for real users and real clients

Never rush.

Think before editing.

Inspect the existing codebase before making changes.

Never assume the project structure.

Never overwrite important files without understanding their purpose.

Every change must move the website closer to production quality.

## 2. Default Tech Stack Assumption

Unless the existing project uses something else, prefer:

1. Next.js
2. TypeScript
3. Tailwind CSS
4. React Server Components where useful
5. Framer Motion only when animation improves clarity
6. Zod for schema validation
7. ESLint and Prettier
8. Vercel deployment compatibility
9. Clean component based architecture

If the project already uses another stack, respect it.

Do not migrate the stack unless the user clearly asks for it.

## 3. Non Negotiable Rules

Before coding:

1. Read the project structure.
2. Identify the framework.
3. Identify styling system.
4. Identify package manager.
5. Identify existing conventions.
6. Identify routes and pages.
7. Identify reusable components.
8. Identify deployment config.
9. Identify environment variables.
10. Identify broken or incomplete areas.

During coding:

1. Make small controlled changes.
2. Keep components focused.
3. Avoid duplicate logic.
4. Avoid random dependencies.
5. Avoid unnecessary complexity.
6. Avoid hardcoded secrets.
7. Avoid fake production claims.
8. Avoid placeholder content unless clearly marked.
9. Avoid breaking responsive layouts.
10. Avoid creating unused files.

After coding:

1. Run type checks if available.
2. Run lint if available.
3. Run build if available.
4. Fix all errors caused by your changes.
5. Check visual consistency.
6. Check mobile layout.
7. Check accessibility basics.
8. Check SEO basics.
9. Summarize changed files.
10. Explain remaining risks.

## 4. Project Inspection Protocol

Before changing anything, inspect:

### 4.1 package.json

Check:

1. Scripts
2. Dependencies
3. Framework version
4. Build command
5. Dev command
6. Lint command
7. Test command
8. Package manager hints

### 4.2 App Structure

Check for:

1. app directory
2. pages directory
3. src directory
4. components directory
5. lib directory
6. styles directory
7. public directory
8. config files
9. middleware
10. API routes

### 4.3 Styling System

Check for:

1. Tailwind config
2. Global CSS
3. CSS modules
4. Styled components
5. Design tokens
6. Theme variables
7. Dark mode setup
8. Font setup
9. Color system
10. Spacing system

### 4.4 Deployment Setup

Check for:

1. vercel.json
2. Dockerfile
3. environment examples
4. CI files
5. build output settings
6. redirects
7. rewrites
8. image domains
9. headers
10. caching config

## 5. Production Quality Definition

A website is production ready only when it meets these standards.

### 5.1 Functionality

The website must:

1. Load without runtime errors.
2. Navigate correctly.
3. Render all important pages.
4. Handle missing data safely.
5. Show useful empty states.
6. Show loading states where needed.
7. Show error states where needed.
8. Prevent broken forms.
9. Validate user input.
10. Avoid dead buttons and fake links.

### 5.2 Design

The design must:

1. Look consistent across pages.
2. Use a clear visual hierarchy.
3. Use readable typography.
4. Use consistent spacing.
5. Use consistent colors.
6. Use balanced sections.
7. Avoid clutter.
8. Avoid random animation.
9. Avoid low contrast text.
10. Look professional on mobile and desktop.

### 5.3 Performance

The website must:

1. Avoid huge images.
2. Use optimized images.
3. Avoid unnecessary client components.
4. Avoid loading heavy libraries for small tasks.
5. Avoid layout shift.
6. Use lazy loading where useful.
7. Avoid blocking scripts.
8. Keep pages fast on mobile.
9. Use proper caching where possible.
10. Build successfully.

### 5.4 Accessibility

The website must:

1. Use semantic HTML.
2. Use proper heading order.
3. Use alt text for meaningful images.
4. Use accessible form labels.
5. Support keyboard navigation.
6. Use visible focus states.
7. Maintain readable contrast.
8. Avoid clickable divs when buttons or links are better.
9. Avoid motion that harms usability.
10. Use aria only when needed.

### 5.5 SEO

The website must:

1. Have unique page titles.
2. Have useful meta descriptions.
3. Use correct heading hierarchy.
4. Use clean URLs.
5. Include Open Graph metadata.
6. Include Twitter card metadata where useful.
7. Use structured data when relevant.
8. Include sitemap if appropriate.
9. Include robots config if appropriate.
10. Avoid duplicate or thin pages.

### 5.6 Security

The website must:

1. Never expose secrets.
2. Never commit private keys.
3. Validate all user input.
4. Sanitize unsafe content.
5. Protect API routes.
6. Use secure headers where possible.
7. Avoid unsafe HTML rendering.
8. Avoid dependency bloat.
9. Avoid unknown packages.
10. Handle auth safely if present.

## 6. File Structure Standard

Prefer this structure for new Next.js projects:

```text
src/
  app/
    layout.tsx
    page.tsx
    globals.css
    not-found.tsx
    error.tsx
  components/
    ui/
    layout/
    sections/
    forms/
  lib/
    utils.ts
    constants.ts
    validation.ts
  data/
    site.ts
  styles/
  types/
public/
  images/
  icons/
```

Rules:

1. Components in components/ui must be generic.
2. Components in components/sections may be page specific.
3. Business logic belongs in lib.
4. Static site content belongs in data.
5. Global styles must stay minimal.
6. Avoid putting large logic inside page files.
7. Avoid deep folder nesting unless necessary.
8. Keep naming clear.
9. Use lowercase kebab case for files where practical.
10. Use PascalCase for React components.

## 7. Component Rules

Every component must have a clear purpose.

A good component:

1. Has a clear name.
2. Accepts typed props.
3. Does one job.
4. Avoids hidden side effects.
5. Handles optional props safely.
6. Has readable markup.
7. Uses semantic HTML.
8. Avoids duplicated styles.
9. Works on mobile.
10. Can be reused without confusion.

Avoid:

1. Massive components.
2. Anonymous logic blocks.
3. Inline magic numbers everywhere.
4. Repeated Tailwind class chaos.
5. Deep prop drilling.
6. Overuse of useEffect.
7. Client components without need.
8. Mixing layout and data fetching too much.
9. Components that depend on one specific page without reason.
10. UI that breaks with longer text.

## 8. Page Building Rules

Every page should include:

1. Clear purpose
2. Strong above the fold section
3. Logical section order
4. Clear calls to action
5. Trust signals if business related
6. Responsive layout
7. SEO metadata
8. Error safe rendering
9. Real content structure
10. Clean internal links

For landing pages, use this order:

1. Hero
2. Problem
3. Solution
4. Benefits
5. Features
6. Process
7. Social proof
8. Pricing or offer
9. FAQ
10. Final CTA

For service websites, use this order:

1. Hero
2. Services overview
3. Why choose us
4. Process
5. Portfolio or examples
6. Testimonials
7. FAQ
8. Contact section

For SaaS websites, use this order:

1. Hero
2. Product preview
3. Core benefits
4. Features
5. Use cases
6. Integrations
7. Pricing
8. Security or reliability
9. FAQ
10. CTA

## 9. Design System Rules

Create or respect a simple design system.

Define:

1. Colors
2. Backgrounds
3. Text colors
4. Border colors
5. Radius
6. Shadow levels
7. Spacing scale
8. Font sizes
9. Container widths
10. Button variants

Button variants should include:

1. Primary
2. Secondary
3. Ghost
4. Destructive if needed

Text styles should include:

1. Display
2. Heading 1
3. Heading 2
4. Heading 3
5. Body
6. Small
7. Muted

Spacing rules:

1. Use consistent section padding.
2. Use consistent container width.
3. Use consistent gap values.
4. Avoid random pixel values.
5. Keep mobile spacing tighter than desktop spacing.

## 10. Responsive Design Rules

Test mentally and structurally for:

1. 320px mobile width
2. 375px mobile width
3. 768px tablet width
4. 1024px laptop width
5. 1440px desktop width

Every layout must:

1. Avoid horizontal scrolling.
2. Keep text readable.
3. Keep buttons tappable.
4. Stack sections correctly.
5. Avoid cropped content.
6. Avoid tiny icons.
7. Keep navigation usable.
8. Keep forms usable.
9. Keep images contained.
10. Preserve visual hierarchy.

Mobile first rules:

1. Start simple.
2. Add complexity on larger screens.
3. Use grid only when needed.
4. Use flex for simple alignment.
5. Avoid fixed heights unless necessary.
6. Avoid absolute positioning for core layout.
7. Keep CTA visible.
8. Keep nav simple.
9. Keep hero concise.
10. Avoid desktop only content.

## 11. Content Quality Rules

Never use weak generic copy like:

1. Welcome to our website
2. We are the best
3. Innovative solutions
4. Cutting edge technology
5. Unlock your potential
6. Seamless experience
7. Transform your business
8. Next generation platform
9. We care about quality
10. Contact us today without context

Prefer specific copy:

1. Say what the product or service does.
2. Say who it is for.
3. Say what problem it solves.
4. Say why it matters.
5. Say what action the user should take.
6. Use concrete benefits.
7. Use simple language.
8. Remove filler.
9. Avoid fake claims.
10. Avoid fake testimonials.

## 12. SEO Implementation Rules

For every important page, add metadata.

Required:

1. title
2. description
3. canonical URL if known
4. Open Graph title
5. Open Graph description
6. Open Graph image if available
7. robots setting if needed

For Next.js App Router:

Use metadata exports where possible.

Example:

```ts
export const metadata = {
  title: "Professional Website Design in Augsburg",
  description: "Fast, responsive, SEO ready websites for local businesses.",
  openGraph: {
    title: "Professional Website Design in Augsburg",
    description: "Fast, responsive, SEO ready websites for local businesses.",
    type: "website"
  }
}
```

SEO content rules:

1. One H1 per page.
2. H2 for major sections.
3. H3 for sub sections.
4. Use descriptive link text.
5. Avoid empty headings.
6. Avoid keyword stuffing.
7. Use image alt text.
8. Use internal links.
9. Use clean slugs.
10. Keep metadata honest.

## 13. Performance Checklist

Before finalizing, check:

1. Are images optimized?
2. Are images using width and height?
3. Are large assets in public only when needed?
4. Are client components limited?
5. Are animations lightweight?
6. Are third party scripts necessary?
7. Are fonts optimized?
8. Are unused imports removed?
9. Are unused components removed?
10. Does the build pass?

For images:

1. Use next/image in Next.js where practical.
2. Compress large images.
3. Use WebP or AVIF where possible.
4. Avoid 5MB hero images.
5. Use meaningful alt text.
6. Avoid background images for meaningful content.
7. Add priority only for above the fold critical images.
8. Lazy load below fold images.
9. Avoid layout shift.
10. Keep image naming clear.

## 14. Accessibility Checklist

Check every page for:

1. Correct H1.
2. Logical heading order.
3. Buttons are buttons.
4. Links are links.
5. Forms have labels.
6. Inputs have clear errors.
7. Images have alt text.
8. Decorative images have empty alt text.
9. Keyboard navigation works.
10. Focus states are visible.
11. Text contrast is readable.
12. Motion is not excessive.
13. Click targets are large enough.
14. No important info exists only in color.
15. Modals trap focus if used.

## 15. Forms Checklist

Every form must:

1. Have labels.
2. Validate required fields.
3. Validate email format if email exists.
4. Show clear error messages.
5. Show loading state on submit.
6. Prevent double submit.
7. Show success state.
8. Handle server failure.
9. Never expose secrets.
10. Never trust client side validation alone.

Contact form fields:

1. Name
2. Email
3. Message
4. Optional phone
5. Consent checkbox if required by local law
6. Clear submit button
7. Success message
8. Error message

Avoid:

1. Sending form data without validation.
2. Silent failures.
3. Fake submit buttons.
4. Console only errors.
5. Storing private data in local storage without need.

## 16. Error Handling Rules

Add:

1. not found page
2. error boundary if supported
3. empty states
4. loading states
5. fallback content
6. safe optional chaining where appropriate
7. readable error messages
8. defensive rendering
9. logging hooks if backend exists
10. no crash on missing data

User facing errors should be:

1. Clear
2. Calm
3. Useful
4. Short
5. Actionable

Never expose:

1. Stack traces
2. API secrets
3. Database details
4. Internal paths
5. Raw server errors

## 17. Security Rules

Check for:

1. No secrets in code.
2. No API keys in frontend unless public by design.
3. No unsafe innerHTML unless sanitized.
4. No unvalidated API input.
5. No open redirects.
6. No weak auth checks.
7. No admin route without protection.
8. No private data in logs.
9. No excessive permissions.
10. No random dependency with poor trust.

Environment variables:

1. Use .env.local for local secrets.
2. Use .env.example for required variable names.
3. Never commit .env.local.
4. Prefix only safe public variables with NEXT_PUBLIC.
5. Validate required env vars at startup where possible.

## 18. Dependency Rules

Before installing a package, ask:

1. Is it necessary?
2. Can existing tools solve this?
3. Is it maintained?
4. Is it popular enough to trust?
5. Does it increase bundle size too much?
6. Does it work with the current framework version?
7. Does it create security risk?
8. Does it complicate deployment?
9. Does it have TypeScript support?
10. Will the user benefit?

Avoid installing packages for:

1. Simple utility functions.
2. One small animation.
3. Basic date formatting.
4. Simple class merging if already available.
5. Features that can be done safely with native APIs.

## 19. Testing Protocol

Run what exists.

Preferred order:

1. npm run typecheck
2. npm run lint
3. npm run test
4. npm run build

If scripts do not exist:

1. Do not invent fake success.
2. Say which scripts were missing.
3. Use available checks.
4. Inspect manually for obvious issues.
5. Recommend adding missing scripts.

Minimum checks:

1. TypeScript compiles.
2. Lint passes.
3. Build passes.
4. No unused imports.
5. No broken routes.
6. No missing components.
7. No missing exports.
8. No hydration issues.
9. No obvious console errors.
10. No broken responsive structure.

## 20. Claude Code Workflow

For every task, follow this workflow.

### Step 1: Understand

Read the user request.

Identify:

1. Goal
2. Website type
3. Target audience
4. Required pages
5. Required features
6. Design style
7. Tech constraints
8. Deployment target
9. Deadline pressure
10. Risk areas

### Step 2: Inspect

Inspect the repo before editing.

Use commands like:

```bash
ls
find . -maxdepth 3 -type f
cat package.json
```

Use safer alternatives when the repo is large.

Do not dump huge files.

### Step 3: Plan

Create a short implementation plan.

Include:

1. Files to change
2. Components to create
3. Data to add
4. Styling approach
5. Testing approach
6. Risks

### Step 4: Implement

Make the smallest useful set of changes.

Prioritize:

1. Correctness
2. Stability
3. Design consistency
4. Responsive behavior
5. Accessibility
6. Performance
7. SEO

### Step 5: Verify

Run checks.

Fix errors.

Do not leave the build broken.

### Step 6: Report

Final response must include:

1. What changed
2. Files changed
3. Commands run
4. Results
5. Remaining risks
6. Next recommended steps

## 21. Production Website Checklist

Before saying done, verify:

1. Website builds.
2. No TypeScript errors.
3. No lint errors from your changes.
4. No broken imports.
5. No missing files.
6. No unused major code.
7. All pages render.
8. Mobile layout works.
9. Desktop layout works.
10. Navigation works.
11. Buttons have real destinations or actions.
12. Forms validate.
13. Forms handle errors.
14. Images are optimized.
15. Metadata exists.
16. H1 exists.
17. Accessibility basics pass.
18. No secrets exposed.
19. No placeholder claims.
20. Final answer is honest.

## 22. Design Review Checklist

Check visual quality:

1. Does the first screen explain the website clearly?
2. Is the CTA visible?
3. Is the spacing consistent?
4. Is the typography readable?
5. Is the contrast strong enough?
6. Are sections visually separated?
7. Is the mobile version clean?
8. Are cards aligned?
9. Are buttons consistent?
10. Are icons consistent?
11. Does animation help?
12. Does the design match the brand?
13. Does the page feel trustworthy?
14. Is the copy specific?
15. Is anything visually broken?

## 23. Common Mistakes to Avoid

Avoid:

1. Creating a pretty page that does not build.
2. Ignoring mobile layout.
3. Using fake links everywhere.
4. Using low contrast gray text.
5. Putting all code in one file.
6. Installing random packages.
7. Exposing env variables.
8. Breaking existing routes.
9. Removing existing features without permission.
10. Using placeholder text in production sections.
11. Forgetting loading and error states.
12. Using images without dimensions.
13. Creating inaccessible forms.
14. Adding animation everywhere.
15. Claiming tests passed without running them.
16. Ignoring TypeScript errors.
17. Creating duplicate components.
18. Hardcoding content that should be configurable.
19. Forgetting SEO metadata.
20. Ending with vague summary.

## 24. Required Final Response Format for Claude Code

After completing a website task, respond like this:

```text
Completed.

Changed:
1. [Specific change]
2. [Specific change]
3. [Specific change]

Files changed:
1. [file path]
2. [file path]
3. [file path]

Checks run:
1. [command] resulted in [result]
2. [command] resulted in [result]

Production readiness status:
1. Build: [pass, fail, not available]
2. Type safety: [pass, fail, not available]
3. Lint: [pass, fail, not available]
4. Mobile layout: [checked, needs review]
5. SEO: [checked, needs review]
6. Accessibility: [checked, needs review]

Remaining risks:
1. [risk]
2. [risk]

Recommended next step:
[one clear next step]
```

Never say something passed unless it truly passed.

## 25. Website Build Prompt Template

Use this prompt inside Claude Code when starting a new website build:

```text
You are building a production ready website.

Follow WEBSITE_BUILD_FRAMEWORK.md strictly.

First inspect the repository.

Then identify the framework, package manager, styling system, routes, components, and build scripts.

Do not start editing until you understand the structure.

Build the website with these standards:

1. Production ready code
2. Clean architecture
3. Mobile first responsive design
4. Strong SEO metadata
5. Accessibility basics
6. Fast performance
7. Secure environment variable handling
8. Reusable components
9. Clear content structure
10. Successful build

Website goal:
[describe the website]

Target audience:
[describe users]

Brand style:
[describe style]

Required pages:
[list pages]

Required sections:
[list sections]

Required features:
[list features]

Content rules:
[describe copy tone and content details]

Deployment target:
[example: Vercel]

Before finishing, run all available checks:
1. typecheck
2. lint
3. test
4. build

If a script does not exist, say it clearly.

Final response must include:
1. What changed
2. Files changed
3. Checks run
4. Production readiness status
5. Remaining risks
6. Recommended next step
```

## 26. Strict Quality Gate

A task is not complete if:

1. The build fails because of your changes.
2. A page crashes.
3. Navigation breaks.
4. Mobile layout is unusable.
5. Main CTA does nothing without explanation.
6. Metadata is missing on important pages.
7. Forms silently fail.
8. Secrets are exposed.
9. The final answer hides errors.
10. The implementation creates more confusion than value.

If blocked, stop and explain:

1. What blocked progress
2. What you checked
3. What is safe to change
4. What the user should provide
5. What the next exact step is

## 27. Final Operating Principle

Build like this website will be used by real customers tomorrow.

Do not optimize for looking finished.

Optimize for being finished, safe, fast, clear, and maintainable.
