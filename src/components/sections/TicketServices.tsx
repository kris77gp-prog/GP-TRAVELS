
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Train, Bus, Plane, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SERVICES = [
  {
    id: 'flight',
    title: 'Air Tickets',
    description: 'Domestic and International flight bookings at the most competitive rates. Secure your seat with your favorite airlines instantly.',
    icon: Plane,
    color: 'from-blue-500 to-indigo-600',
    shadow: 'shadow-blue-500/20'
  },
  {
    id: 'train',
    title: 'Train Tickets',
    description: 'Avoid the long queues. We offer seamless IRCTC train ticket bookings for all classes across India in just a few clicks.',
    icon: Train,
    color: 'from-orange-500 to-red-600',
    shadow: 'shadow-orange-500/20'
  },
  {
    id: 'bus',
    title: 'Bus Tickets',
    description: 'Book your luxury AC or sleeper bus tickets across all major routes. Experience comfort and safety on every journey.',
    icon: Bus,
    color: 'from-emerald-500 to-teal-600',
    shadow: 'shadow-emerald-500/20'
  }
];

export const TicketServices = () => {
  return (
    <section className="py-24 px-6 relative overflow-hidden bg-slate-50 dark:bg-slate-900/50">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-20">
        <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-secondary/10 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16 space-y-4">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-wider uppercase"
          >
            Ultimate Travel Hub
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-black text-slate-900 dark:text-white tracking-tight"
          >
            Your One-Stop <span className="text-primary italic">Booking</span> Destination
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto text-lg"
          >
            Beyond tours and rentals, we manage every step of your travel. Save time and money with our seamless ticket booking services.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, type: 'spring', damping: 20 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              <div className="h-full bg-white dark:bg-slate-800 rounded-[2.5rem] p-10 border border-slate-200 dark:border-white/5 transition-all duration-500 hover:shadow-2xl hover:shadow-primary/5 flex flex-col">
                {/* Icon Container */}
                <div className={cn(
                  "w-16 h-16 rounded-[1.5rem] flex items-center justify-center bg-gradient-to-br transition-all duration-500 group-hover:scale-110",
                  service.color,
                  service.shadow
                )}>
                  <service.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-8 mb-4 tracking-tight group-hover:text-primary transition-colors">
                  {service.title}
                </h3>
                
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8 flex-grow">
                  {service.description}
                </p>

                <motion.button 
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 text-primary font-bold tracking-wide uppercase text-sm group/btn group-hover:gap-4 transition-all"
                >
                  Book Now
                  <ArrowRight className="w-4 h-4 transition-transform" />
                </motion.button>

                {/* Decorative background number */}
                <span className="absolute bottom-6 right-10 text-8xl font-black text-slate-500/5 select-none transition-all group-hover:text-primary/10">
                  0{index + 1}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
