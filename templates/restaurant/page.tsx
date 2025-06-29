"use client"

import React, { useState } from 'react'
import { Menu, X, MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react'
import { useAtom } from 'jotai'
import { AiResRestaurant, aiResponseAtom } from '@/app/atoms/aiReponseAtom'
import { imagepath } from '@/app/generate/page'
import Image from 'next/image'


export default function RestaurantPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [aiResponse] = useAtom(aiResponseAtom)
  const data = aiResponse as AiResRestaurant

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setActiveSection(sectionId)
    setIsMenuOpen(false)
  }

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: data.colors.secondary, color: data.colors.text }}>
      {/* Header */}
      <header className="py-6 px-6 md:px-12 lg:px-24 fixed w-full z-50" style={{ backgroundColor: data.colors.primary }}>
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-serif">{data.title}</h1>
          <nav className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection('home')} className={`hover:opacity-80 transition-colors ${activeSection === 'home' ? 'opacity-80' : ''}`}>Home</button>
            <button onClick={() => scrollToSection('menu')} className={`hover:opacity-80 transition-colors ${activeSection === 'menu' ? 'opacity-80' : ''}`}>Menu</button>
            <button onClick={() => scrollToSection('about')} className={`hover:opacity-80 transition-colors ${activeSection === 'about' ? 'opacity-80' : ''}`}>About</button>
            <button onClick={() => scrollToSection('reserve')} className={`hover:opacity-80 transition-colors ${activeSection === 'reserve' ? 'opacity-80' : ''}`}>Reserve</button>
          </nav>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        {isMenuOpen && (
          <nav className="mt-6 flex flex-col space-y-4 md:hidden">
            <button onClick={() => scrollToSection('home')} className="hover:opacity-80 transition-colors">Home</button>
            <button onClick={() => scrollToSection('menu')} className="hover:opacity-80 transition-colors">Menu</button>
            <button onClick={() => scrollToSection('about')} className="hover:opacity-80 transition-colors">About</button>
            <button onClick={() => scrollToSection('reserve')} className="hover:opacity-80 transition-colors">Reserve</button>
          </nav>
        )}
      </header>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center pt-20">
      <Image src={imagepath(data?.description)} width={2160} height={1080} alt={data?.title} className="absolute  top-0 left-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black bg-opacity-50" />
        <div className="relative text-center z-10">
          <h2 className="text-6xl md:text-8xl font-serif mb-6">{data.title}</h2>
          <p className="text-2xl md:text-3xl mb-10">{data.description}</p>
          <button onClick={() => scrollToSection('reserve')} className="px-10 py-4 rounded-full text-xl hover:opacity-90 transition-colors" style={{ backgroundColor: data.colors.primary, color: data.colors.secondary }}>
            Reserve a Table
          </button>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 px-6 md:px-12 lg:px-24">
        <h2 className="text-5xl font-serif text-center mb-16"style={{ color: data.colors.primary }}>Our Signature Dishes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {data.menu.map((dish) => (
            <div key={dish.id} className="rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 hover:scale-105 group" style={{ backgroundColor: data.colors.primary }}>
              <img src={imagepath((dish.name + 'food'))} alt={dish.name} className="w-full h-64 object-cover" />
              <div className="p-6">
                <h3 className="text-2xl font-semibold mb-2">{dish.name}</h3>
                <p className="mb-4" style={{ color: data.colors.secondary }}>{dish.description}</p>
                <span className="text-xl font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {dish.price} 
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-20 px-6 md:px-12 lg:px-24" style={{ backgroundColor: data.colors.primary, color: data.colors.secondary }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-5xl font-serif mb-8">Our Story</h2>
          <p className="text-xl mb-12 leading-relaxed">
            {data.about}
          </p>
          <img src={imagepath(data.description)} alt="Restaurant interior" className="rounded-lg shadow-2xl mx-auto" />
        </div> 
      </section>

      {/* Reservation Form */}
      <section id="reserve" className="py-20 px-6 md:px-12 lg:px-24" style={{ backgroundColor: data.colors.secondary }}>
        <h2 className="text-5xl font-serif text-center mb-16" style={{ color: data.colors.primary }}>Make a Reservation</h2>
        <form className="max-w-2xl mx-auto p-8 rounded-lg shadow-lg" style={{ backgroundColor: data.colors.primary }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-lg">Name</label>
              <input type="text" id="name" className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2" style={{ borderColor: data.colors.secondary, color: 'black' }} required />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-lg">Email</label>
              <input type="email" id="email" className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2" style={{ borderColor: data.colors.secondary, color: 'black'}} required />
            </div>
            <div>
              <label htmlFor="date" className="block mb-2 text-lg">Date</label>
              <input type="date" id="date" className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2" style={{ borderColor: data.colors.secondary, color: 'black' }} required />
            </div>
            <div>
              <label htmlFor="time" className="block mb-2 text-lg">Time</label>
              <input type="time" id="time" className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2" style={{ borderColor: data.colors.secondary, color: 'black'}} required />
            </div>
            <div>
              <label htmlFor="guests" className="block mb-2 text-lg">Number of Guests</label>
              <input type="number" id="guests" min="1" max="10" className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2" style={{ borderColor: data.colors.secondary, color: 'black' }} required />
            </div>
            <div>
              <label htmlFor="occasion" className="block mb-2 text-lg">Occasion (Optional)</label>
              <input type="text" id="occasion" className="w-full px-4 py-3 rounded-md focus:outline-none focus:ring-2" style={{ borderColor: data.colors.secondary, color: 'black' }} />
            </div>
          </div>
          <button type="submit" className="w-full py-4 px-6 rounded-md text-lg font-semibold mt-8 hover:opacity-90 transition-colors" style={{ backgroundColor: data.colors.secondary, color: data.colors.primary }}>
            Reserve Now
          </button>
        </form>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 md:px-12 lg:px-24" style={{ backgroundColor: data.colors.primary, color: data.colors.secondary }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <h3 className="text-2xl font-serif mb-6">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-center"><MapPin className="mr-3" size={24} /> {data.contacts.address}</li>
              <li className="flex items-center"><Phone className="mr-3" size={24} /> {data.contacts.phonenumber}</li>
              <li className="flex items-center"><Mail className="mr-3" size={24} /> {data.contacts.email}</li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-serif mb-6">Opening Hours</h3>
            <h3 className="text-2xl font-serif mb-6">10:00 - 00:00</h3>
            <p>{data.openinigtime}</p>
          </div>
          <div>
            <h3 className="text-2xl font-serif mb-6">Follow Us</h3>
            <div className="flex space-x-6">
              <a href="#" className="hover:opacity-80 transition-colors"><Facebook size={32} /></a>
              <a href="#" className="hover:opacity-80 transition-colors"><Instagram size={32} /></a>
              <a href="#" className="hover:opacity-80 transition-colors"><Twitter size={32} /></a>
            </div>
          </div>
        </div>
        <div className="mt-12 text-center">
          <p className="text-lg">&copy; 2025 {data.title}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}