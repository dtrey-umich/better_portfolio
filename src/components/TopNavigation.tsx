'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navigationItems = [
  { name: 'Explore', href: '/' },
  { name: 'About', href: '/about' },
  { name: 'Principles', href: '/principles' },
];

export function TopNavigation() {
  const pathname = usePathname();

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="max-w-7xl mx-auto px-[60px] py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative"
            >
              <img
                src="/images/Site Logo.JPG"
                alt="Site Logo"
                className="h-12 w-auto object-contain"
              />
            </motion.div>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            {navigationItems.map((item) => {
              const isActive = pathname === item.href;
              
              return (
                <Link key={item.name} href={item.href}>
                  <motion.div
                    className={`
                      relative px-4 py-2 text-base font-medium transition-colors duration-200
                      ${isActive 
                        ? 'text-black' 
                        : 'text-gray-600 hover:text-black'
                      }
                    `}
                    style={{ fontFamily: 'Gabarito, sans-serif' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                    
                    {/* Active indicator */}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-black"
                        layoutId="activeIndicator"
                        initial={false}
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 40
                        }}
                      />
                    )}
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
