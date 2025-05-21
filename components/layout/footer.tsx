import Link from "next/link";
import { Globe, Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Globe className="h-8 w-8" />
              <span className="font-bold text-xl">Wanderlust</span>
            </div>
            <p className="text-sm text-primary-foreground/80">
              Discover the world with our expertly curated travel experiences. 
              From breathtaking scenery to cultural immersion, we make your 
              travel dreams a reality.
            </p>
            <div className="flex space-x-4">
              <Button variant="outline" size="icon" className="rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                <span className="sr-only">Facebook</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                <span className="sr-only">Instagram</span>
              </Button>
              <Button variant="outline" size="icon" className="rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                <span className="sr-only">Twitter</span>
              </Button>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-primary-foreground/80 hover:text-primary-foreground">Home</Link></li>
              <li><Link href="/about" className="text-primary-foreground/80 hover:text-primary-foreground">About Us</Link></li>
              <li><Link href="/destinations" className="text-primary-foreground/80 hover:text-primary-foreground">Destinations</Link></li>
              <li><Link href="/packages" className="text-primary-foreground/80 hover:text-primary-foreground">Tour Packages</Link></li>
              <li><Link href="/blog" className="text-primary-foreground/80 hover:text-primary-foreground">Travel Blog</Link></li>
              <li><Link href="/contact" className="text-primary-foreground/80 hover:text-primary-foreground">Contact Us</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 shrink-0 text-primary-foreground/80" />
                <span className="text-primary-foreground/80">1234 Travel Avenue, Adventure City, AC 56789</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 shrink-0 text-primary-foreground/80" />
                <span className="text-primary-foreground/80">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 shrink-0 text-primary-foreground/80" />
                <span className="text-primary-foreground/80">info@wanderlust.com</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-sm text-primary-foreground/80 mb-4">
              Subscribe to our newsletter for travel tips, exclusive offers, and inspiration.
            </p>
            <div className="space-y-2">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50"
              />
              <Button className="w-full bg-primary-foreground text-primary hover:bg-primary-foreground/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center text-sm text-primary-foreground/70">
          <p>© {new Date().getFullYear()} Wanderlust. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="/terms" className="hover:text-primary-foreground">Terms of Service</Link>
            <Link href="/privacy" className="hover:text-primary-foreground">Privacy Policy</Link>
            <Link href="/faq" className="hover:text-primary-foreground">FAQ</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}