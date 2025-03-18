// src/styles/fonts.ts
import { Lora, Montserrat, Belanosima } from 'next/font/google';

export const lora = Lora({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-lora',
    weight: ['400', '500', '700'],
});

export const montserrat = Montserrat({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-montserrat',
    weight: ['400', '500', '700'],
});

export const belanosima = Belanosima({
    subsets: ['latin'],
    weight: ['400', '600', '700'],
    variable: '--font-belanosima',
    style: 'normal',
});