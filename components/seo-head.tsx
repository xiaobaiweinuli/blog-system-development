import Head from "next/head"

interface SEOHeadProps {
  title?: string
  description?: string
  image?: string
  url?: string
  type?: string
  publishedTime?: string
  modifiedTime?: string
  tags?: string[]
  author?: string
}

export function SEOHead({
  title = "GitHub Blog System",
  description = "A powerful blog system powered by GitHub Pages, Next.js, and modern web technologies",
  image = "/og-image.png",
  url = "",
  type = "website",
  publishedTime,
  modifiedTime,
  tags = [],
  author,
}: SEOHeadProps) {
  const fullTitle = title.includes("GitHub Blog") ? title : `${title} | GitHub Blog System`
  const fullUrl = `${process.env.NEXT_PUBLIC_SITE_URL}${url}`

  return (
    <Head>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={tags.join(", ")} />
      {author && <meta name="author" content={author} />}

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="GitHub Blog System" />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      {tags.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={fullUrl} />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": type === "article" ? "BlogPosting" : "WebSite",
            headline: title,
            description: description,
            image: image,
            url: fullUrl,
            ...(publishedTime && { datePublished: publishedTime }),
            ...(modifiedTime && { dateModified: modifiedTime }),
            ...(author && {
              author: {
                "@type": "Person",
                name: author,
              },
            }),
            publisher: {
              "@type": "Organization",
              name: "GitHub Blog System",
              logo: {
                "@type": "ImageObject",
                url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
              },
            },
          }),
        }}
      />
    </Head>
  )
}
