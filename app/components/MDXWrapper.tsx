import React from 'react'

export default function MDXWrapper({ children }: { children: React.ReactNode }) {
  return <div data-mdx-content>{children}</div>
}