"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, X, Code2, User, Briefcase, Mail, Zap } from "lucide-react"
import { useIsMobile } from "../hooks/useIsMobile"
import { cn } from "@/lib/utils"

const navItems = [
  { title: "Home", href: "#home", icon: Zap },
  { title: "About", href: "#about", icon: User },
  { title: "Skills", href: "#skills", icon: Code2 },
  { title: "Projects", href: "#projects", icon: Briefcase },
  { title: "Contact", href: "#contact", icon: Mail },
]

export function Navbar() {
  const isMobile = useIsMobile()
  const [isOpen, setIsOpen] = React.useState(false)
  const [scrolled, setScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        scrolled ? "bg-background/80 backdrop-blur-md border-border py-2 shadow-sm" : "bg-transparent py-4"
      )}
    >
      <div className="custom-container flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center text-primary-foreground">
            S
          </div>
          <span>Sajib.</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {item.title}
            </Link>
          ))}
          <Link
            href="#contact"
            className="px-5 py-2 bg-primary text-primary-foreground rounded-full text-sm font-medium hover:opacity-90 transition-opacity premium-shadow"
          >
            Hire Me
          </Link>
        </div>

        {/* Mobile Nav Toggle */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border p-4 flex flex-col gap-4 animate-in slide-in-from-top-4 duration-200 md:hidden">
          {navItems.map((item) => (
            <Link
              key={item.title}
              href={item.href}
              className="flex items-center gap-3 text-lg font-medium p-2 hover:bg-muted rounded-md transition-colors"
              onClick={() => setIsOpen(false)}
            >
              <item.icon size={20} className="text-primary" />
              {item.title}
            </Link>
          ))}
          <Link
            href="#contact"
            className="w-full py-3 bg-primary text-primary-foreground rounded-lg text-center font-medium mt-2"
            onClick={() => setIsOpen(false)}
          >
            Hire Me
          </Link>
        </div>
      )}
    </nav>
  )
}

