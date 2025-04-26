'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface RoundedButtonProps {
  href?: string;
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'transparent';
}

const RoundedButton = ({ 
  href, 
  onClick, 
  children, 
  className,
  variant = 'default' 
}: RoundedButtonProps) => {
  const buttonClasses = cn(
    'group inline-flex items-center p-[0.45rem] h-15 rounded-full transition-all duration-300',
    variant === 'default' && 'bg-[#47715A] text-white hover:bg-[#2E432F]',
    variant === 'transparent' && 'bg-transparent text-white border-2 border-white hover:bg-white/10',
    className
  );

  const circleClasses = cn(
    'rounded-full h-[3rem] w-[3rem] flex items-center justify-center',
    variant === 'default' && 'bg-transparent border-2 border-[#FFFDF3]',
    variant === 'transparent' && 'bg-transparent border-2 border-white'
  );

  const content = (
    <>
      <span className="text-base font-medium px-4">{children}</span>
      <div className={circleClasses}>
        <ArrowRight className="w-5 h-5 text-white transform group-hover:translate-x-1 transition-transform duration-300" />
      </div>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={buttonClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={buttonClasses}>
      {content}
    </button>
  );
};

export default RoundedButton; 