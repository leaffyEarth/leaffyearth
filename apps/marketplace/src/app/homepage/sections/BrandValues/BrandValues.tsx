"use client"

import { Clock, LeafyGreen, Ruler, Lightbulb, Truck, Shield } from 'lucide-react';

interface ValueCard {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description?: string;
}

const values: ValueCard[] = [
  {
    icon: Clock,
    title: "24-Hour Delivery"
  },
  {
    icon: LeafyGreen,
    title: "Quality Assurance"
  },
  {
    icon: Ruler,
    title: "Accurate Sizing"
  },
  {
    icon: Lightbulb,
    title: "Expert Tips"
  },
  {
    icon: Truck,
    title: "Safe Transit"
  },
  {
    icon: Shield,
    title: "Plant Guarantee"
  }
];

export default function BrandValues() {
  return (
    <section className="py-32 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Our Promise to You
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We believe in delivering not just plants, but an exceptional experience that brings nature into your space with confidence and care.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <div 
                key={index}
                className="group flex flex-col items-center text-center"
              >
                {/* Icon Container with animated background */}
                <div className="relative mb-4">
                  <div className="absolute inset-0 bg-primary/10 rounded-full scale-[2] blur-xl 
                               group-hover:scale-[2.2] group-hover:bg-primary/20 transition-all duration-300" />
                  <div className="relative z-10 p-4">
                    <Icon className="w-12 h-12 text-primary" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-lg font-medium text-gray-900
                             group-hover:text-primary transition-colors duration-300">
                  {value.title}
                </h3>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
} 