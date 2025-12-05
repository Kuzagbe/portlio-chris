import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { ThemeProvider } from './components/theme-provider'
import { CustomCursor } from './components/custom-cursor'
import HomePage from './pages/Home'
import AboutPage from './pages/About'
import ProjectsPage from './pages/Projects'
import BlogPage from './pages/Blog'
import BlogPostPage from './pages/BlogPost'
import ContactPage from './pages/Contact'

function AppContent() {
  return (
    <>
      <CustomCursor />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <AppContent />
    </ThemeProvider>
  )
}

export default App



