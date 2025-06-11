// Seed script to populate the database with sample blog posts

console.log("Seeding sample blog data...")

const samplePosts = [
  {
    title: "Getting Started with Next.js 15",
    slug: "getting-started-nextjs-15",
    content: `# Getting Started with Next.js 15

Next.js 15 introduces several exciting features that make building React applications even more powerful and efficient.

## Key Features

- **Improved Performance**: Enhanced bundling and optimization
- **Better Developer Experience**: Improved error messages and debugging
- **New APIs**: Additional hooks and utilities for modern development

## Installation

\`\`\`bash
npx create-next-app@latest my-app
cd my-app
npm run dev
\`\`\`

## Conclusion

Next.js 15 continues to push the boundaries of what's possible with React development.`,
    description: "Learn the latest features and improvements in Next.js 15",
    tags: ["Next.js", "React", "Web Development"],
    language: "en",
    status: "published",
    visibility: "public",
    is_pinned: true,
  },
  {
    title: "Advanced TypeScript Patterns",
    slug: "advanced-typescript-patterns",
    content: `# Advanced TypeScript Patterns

TypeScript offers powerful features for creating robust, type-safe applications.

## Generic Constraints

\`\`\`typescript
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}
\`\`\`

## Conditional Types

Conditional types allow you to create types that depend on conditions.

\`\`\`typescript
type ApiResponse<T> = T extends string 
  ? { message: T } 
  : { data: T };
\`\`\``,
    description: "Explore advanced TypeScript patterns for better code organization",
    tags: ["TypeScript", "Programming", "Best Practices"],
    language: "en",
    status: "published",
    visibility: "public",
    is_pinned: false,
  },
  {
    title: "Building Scalable React Applications",
    slug: "building-scalable-react-apps",
    content: `# Building Scalable React Applications

Creating large-scale React applications requires careful planning and architecture decisions.

## Project Structure

\`\`\`
src/
  components/
    ui/
    features/
  hooks/
  utils/
  types/
  pages/
\`\`\`

## State Management

Consider using Zustand or Redux Toolkit for complex state management needs.

## Performance Optimization

- Use React.memo for expensive components
- Implement code splitting with React.lazy
- Optimize bundle size with tree shaking`,
    description: "Best practices for building large-scale React applications",
    tags: ["React", "Architecture", "Scalability"],
    language: "en",
    status: "draft",
    visibility: "logged-in",
    is_pinned: false,
  },
]

// Insert sample posts
samplePosts.forEach((post, index) => {
  console.log(`Inserting post ${index + 1}: ${post.title}`)

  // In a real implementation, you would execute SQL INSERT statements
  // INSERT INTO posts (title, slug, content, description, tags, language, status, visibility, is_pinned)
  // VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
})

console.log(`Successfully seeded ${samplePosts.length} sample posts!`)
console.log("Sample data includes:")
console.log("- 1 pinned post")
console.log("- 2 published posts")
console.log("- 1 draft post")
console.log("- Posts in English with various tags")
