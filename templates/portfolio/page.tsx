"use client"

import React, { useState, useEffect } from 'react'
import { Github, Linkedin, Mail, Menu, X, ChevronRight, MapPin, Phone } from "lucide-react"
import { aiResponseAtom, AiResPortfolio } from '@/app/atoms/aiReponseAtom'
import { useAtom } from 'jotai'
import { imagepath } from '@/app/generate/page'
import Image from 'next/image'

const Portfolio: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [activeSection, setActiveSection] = useState<string>('')
  const [aiResponse] = useAtom(aiResponseAtom)
  const portfolioData = aiResponse as AiResPortfolio

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)


  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact']
      const scrollPosition = window.scrollY

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element && scrollPosition >= element.offsetTop - 100) {
          setActiveSection(section)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const { name, job, aboutme, description, colors, skills, projects, contacts } = portfolioData

  return (
    <div className="min-h-screen" style={{ backgroundColor: colors.secondary, color: colors.text }}>
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 bg-opacity-90 backdrop-blur-sm z-50`} style={{ backgroundColor: colors.primary }}>
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold" style={{ color: colors.text }}>{name}</h1>
          <nav className="hidden md:flex space-x-6">
            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`hover:opacity-75 transition-colors ${
                  activeSection === item.toLowerCase() ? 'font-bold' : ''
                }`}
                style={{ color: colors.text }}
              >
                {item}
              </a>
            ))}
          </nav>
          <button onClick={toggleMenu} className="md:hidden" style={{ color: colors.text }}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
        {isMenuOpen && (
          <nav className="md:hidden px-4 py-2 flex flex-col space-y-2" style={{ backgroundColor: colors.primary }}>
            {['Home', 'About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="hover:opacity-75 transition-colors"
                onClick={toggleMenu}
                style={{ color: colors.text }}
              >
                {item}
              </a>
            ))}
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-16">
      <Image src={imagepath(job)} width={2160} height={1080} alt={job} className="absolute z-[0]  top-0 left-0 w-full h-full object-cover" />

        <div className="container mx-auto px-4 text-center z-10 bg-slate-500 bg-opacity-10 text-white py-10 backdrop-filter backdrop-blur-lg rounded-lg shadow-lg">
          <h2 className="text-5xl md:text-6xl font-bold mb-4" style={{ color: colors.primary }}>{name}</h2>
          <p className="text-xl mb-8 opacity-75">{job}</p>
          <a 
            href="#contact" 
            className="px-6 py-3 rounded-md transition-colors inline-block"
            style={{ backgroundColor: colors.primary, color: colors.secondary }}
          >
            Get in Touch
          </a>
        </div>
      </section>

      {/* About Me */}
      <section id="about" className="py-20" style={{ backgroundColor: colors.primary }}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: colors.secondary }}>About Me</h2>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <img src={imagepath(name)} alt={name} className="w-64 h-64 rounded-full object-cover border-4" style={{ borderColor: colors.secondary }} />
            <div className="max-w-2xl">
              <p className="text-lg mb-4 opacity-75">
                {aboutme}
              </p>
              <p className="text-lg opacity-75">
                {description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="py-20" style={{ backgroundColor: colors.secondary }}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: colors.primary }}>My Skills</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <div key={skill} className="p-4 rounded-lg hover:opacity-75 transition-colors flex items-center justify-between" style={{ backgroundColor: colors.primary, color: colors.secondary }}>
                <p className="font-semibold">{skill}</p>
                <ChevronRight />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="py-20" style={{ backgroundColor: colors.primary }}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: colors.secondary }}>Featured Projects</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="rounded-lg overflow-hidden shadow-lg group" style={{ backgroundColor: colors.secondary }}>
                <img src={imagepath(project.name)} alt={project.name} className="w-full h-48 object-cover" />
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2" style={{ color: colors.primary }}>{project.name}</h3>
                  <p className="mb-4 opacity-75">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.skills.map((skill, index) => (
                      <span key={index} className="px-2 py-1 text-sm rounded-full" style={{ backgroundColor: colors.primary, color: colors.secondary }}>{skill}</span>
                    ))}
                  </div>
                  <button className="px-4 py-2 rounded-md transition-colors" style={{ borderColor: colors.primary, color: colors.primary, borderWidth: 1 }}>
                    View Project
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section id="contact" className="py-20" style={{ backgroundColor: colors.secondary }}>
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: colors.primary }}>Get in Touch</h2>
          <form className="max-w-md mx-auto space-y-4">
            <input 
              type="text" 
              placeholder="Your Name" 
              className="w-full px-4 py-2 rounded-md focus:outline-none"
              style={{ backgroundColor: colors.primary, color: colors.secondary, borderColor: colors.text }}
            />
            <input 
              type="email" 
              placeholder="Your Email" 
              className="w-full px-4 py-2 rounded-md focus:outline-none"
              style={{ backgroundColor: colors.primary, color: colors.secondary, borderColor: colors.text }}
            />
            <textarea 
              placeholder="Your Message" 
              rows={4}
              className="w-full px-4 py-2 rounded-md focus:outline-none"
              style={{ backgroundColor: colors.primary, color: colors.secondary, borderColor: colors.text }}
            ></textarea>
            <button 
              type="submit" 
              className="w-full py-2 rounded-md transition-colors"
              style={{ backgroundColor: colors.primary, color: colors.secondary }}
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8" style={{ backgroundColor: colors.primary, color: colors.secondary }}>
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
          <div>
            <p>&copy; 2025 {name}. All rights reserved.</p>
            <div className="flex items-center mt-2">
              <MapPin size={16} className="mr-2" />
              <span>{contacts.address}</span>
            </div>
            <div className="flex items-center mt-1">
              <Phone size={16} className="mr-2" />
              <span>{contacts.phonenumber}</span>
            </div>
            <div className="flex items-center mt-1">
              <Mail size={16} className="mr-2" />
              <span>{contacts.email}</span>
            </div>
          </div>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="hover:opacity-75 transition-colors"><Github /></a>
            <a href="#" className="hover:opacity-75 transition-colors"><Linkedin /></a>
            <a href="#" className="hover:opacity-75 transition-colors"><Mail /></a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Portfolio