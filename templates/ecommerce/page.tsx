"use client"

import React, { useState, useEffect, useRef, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingCart, 
  Mail, 
  Phone, 
  MapPin, 
  Facebook, 
  Twitter, 
  Instagram, 
  Sun, 
  Moon, 
  Star, 
  X, 
  ChevronUp 
} from 'lucide-react'
import { useAtom } from 'jotai';
import { AiResEcommerece, aiResponseAtom } from '@/app/atoms/aiReponseAtom';
import {imagepath } from '@/app/generate/page';
import Image from 'next/image'

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  rating: number;
}

export default function EnhancedScrollablePage() {
  const [aiResponse, ] = useAtom(aiResponseAtom);
  const [cart, setCart] = useState<Product[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const data = useMemo(() => aiResponse as AiResEcommerece, [aiResponse]);

  const homeRef = useRef<HTMLElement>(null)
  const productsRef = useRef<HTMLElement>(null)
  const contactRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const addToCart = (product: Product) => {
    setCart(prevCart => [...prevCart, product])
  }

  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const totalPrice = cart.reduce((sum, item) => sum + Number(item.price), 0)

  const scrollTo = (ref: React.RefObject<HTMLElement>) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  
  // console.log('daata : ', aiResponse)

  return (
    <div className={`min-h-screen flex flex-col `}>
      {/* Navigation */}
      <nav className={`bg-gradient-to-r from-emerald-500 to-teal-600 text-white  p-4 sticky top-0 z-10 shadow-lg`}>
        <div className="container mx-auto flex justify-between items-center"        >
          <h1 className="text-2xl font-bold">{data?.title}</h1>
          <div className="flex items-center space-x-4">
            <button onClick={() => scrollTo(homeRef)} className="hover:bg-white/20 px-3 py-2 rounded transition duration-300">Home</button>
            <button onClick={() => scrollTo(productsRef)} className="hover:bg-white/20 px-3 py-2 rounded transition duration-300">Products</button>
            <button onClick={() => scrollTo(contactRef)} className="hover:bg-white/20 px-3 py-2 rounded transition duration-300">Contact</button>
            {/* <button onClick={() => setIsDarkMode(!isDarkMode)} className="hover:bg-white/20 p-2 rounded transition duration-300">
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button> */}
            <button onClick={() => setIsCartOpen(true)} className="hover:bg-white/20 p-2 rounded transition duration-300 relative">
              <ShoppingCart className="h-5 w-5" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Home Section */}
        <section 
          ref={homeRef} 
          className="relaative text-white py-32"

        >
          <Image src={imagepath(data?.description)} online-shop width={2160} height={1080} alt={data?.title} className="absolute z-[-1] top-0 left-0 object-cover" />
          <div className="container mx-auto text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className=" text-5xl font-bold mb-6"
            >
              Welcome to {data?.title}
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className=" text-xl mb-8"
            >
              {data?.description}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <button 
                onClick={() => scrollTo(productsRef)} 
                className=" bg-white text-blue-600 hover:bg-blue-100 px-6 py-3 rounded-full font-semibold transition duration-300"
              >
                Shop Now
              </button>
            </motion.div>
          </div>
        </section>

        {/* Products Section */}
        <section ref={productsRef} className="py-24 bg-gradient-to-b from-gray-100 to-white dark:from-gray-900 dark:to-gray-800"
        >
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-gray-800 dark:text-white">Our Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {data?.products.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden"
                >
                  <Image src={imagepath(product.name)}online-shop width={2160} height={1080} alt={product.name} className="w-full h-48 object-cover" />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-2">${product.price}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{product.description}</p>
                    <div className="flex items-center mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`} />
                      ))}
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">{product.rating}</span>
                    </div>
                    <button 
                      onClick={() => addToCart(product)}
                      className="w-full bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded flex items-center justify-center transition duration-300"
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section ref={contactRef} className="py-24 bg-gradient-to-b from-teal-100 to-teal-200 dark:from-teal-900 dark:to-teal-800">
          <div className="container mx-auto">
            <h2 className="text-4xl font-bold mb-12 text-center text-teal-800 dark:text-teal-100">Contact Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-2xl font-semibold mb-6 text-teal-700 dark:text-teal-200">Get in Touch</h3>
                <form className="space-y-6" onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
                  <input 
                    type="text" 
                    placeholder="Your Name" 
                    className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <input 
                    type="email" 
                    placeholder="Your Email" 
                    className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  />
                  <textarea 
                    placeholder="Your Message" 
                    className="w-full px-4 py-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 h-32 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  ></textarea>
                  <button 
                    type="submit" 
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded transition duration-300"
                  >
                    Send Message
                  </button>
                </form>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-2xl font-semibold mb-6 text-teal-700 dark:text-teal-200">Our Information</h3>
                <div className="space-y-4">
                  <p className="flex items-center text-teal-700 dark:text-teal-200"><Mail className="mr-4 h-6 w-6" /> {data?.contacts?.email}</p>
                  <p className="flex items-center text-teal-700 dark:text-teal-200"><Phone className="mr-4 h-6 w-6" /> {data?.contacts?.phonenumber}</p>
                  <p className="flex items-center text-teal-700 dark:text-teal-200"><MapPin className="mr-4 h-6 w-6" /> {data?.contacts?.address}</p>
                </div>
                <div className="mt-8">
                  <h4 className="text-xl font-semibold mb-4 text-teal-700 dark:text-teal-200">Follow Us</h4>
                  <div className="flex space-x-4">
                    <a href="#" className="text-teal-600 hover:text-teal-800 dark:text-teal-300 dark:hover:text-teal-100 transition duration-300">
                      <Facebook className="h-8 w-8" />
                    </a>
                    <a href="#" className="text-teal-600 hover:text-teal-800 dark:text-teal-300 dark:hover:text-teal-100 transition duration-300">
                      <Twitter className="h-8 w-8" />
                    </a>
                    <a href="#" className="text-teal-600 hover:text-teal-800 dark:text-teal-300 dark:hover:text-teal-100 transition duration-300">
                      <Instagram className="h-8 w-8" />
                    </a>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-4">About {data?.title}</h3>
            <p className="text-gray-300"> We are committed to providing {data?.description}.</p>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => scrollTo(homeRef)} className="text-gray-300 hover:text-white transition duration-300">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo(productsRef)} className="text-gray-300 hover:text-white transition duration-300">
                  Products
                </button>
              </li>
              <li>
                <button onClick={() => scrollTo(contactRef)} className="text-gray-300 hover:text-white transition duration-300">
                  Contact
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-2xl font-semibold mb-4">Newsletter</h3>
            <p className="text-gray-300 mb-4">Stay updated with our latest products and offers.</p>
            <form className="flex" onSubmit={(e: React.FormEvent<HTMLFormElement>) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your email" 
                className="flex-grow px-4 py-2 rounded-l-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button 
                type="submit" 
                className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-r-md transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="container mx-auto mt-8 pt-8 border-t border-gray-700 text-center text-gray-300">
          <p>&copy; 2024 EcoShop. All rights reserved.</p>
        </div>
      </footer>

      {/* Shopping Cart Sidebar */}
      <AnimatePresence>
        {isCartOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-80 bg-white dark:bg-gray-800 shadow-lg p-4 z-50"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Your Cart</h2>
              <button 
                onClick={() => setIsCartOpen(false)} 
                className="text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-gray-100 transition duration-300"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            {cart.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              <>
                <ul className="space-y-4">
                  {cart.map((item) => (
                    <li key={item.id} className="flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{item.name}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">${item.price}</p>
                      </div>
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition duration-300"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 pt-4 border-t">
                  <p className="font-semibold">Total: ${totalPrice}</p>
                  <button className="w-full mt-4 bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-4 rounded transition duration-300">
                    Checkout
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 bg-[${data?.colors?.primary}] hover:bg-emerald-600 text-white rounded-full p-3 shadow-lg transition duration-300`}
          >
            <ChevronUp className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}