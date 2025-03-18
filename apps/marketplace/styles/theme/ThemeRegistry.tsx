// src/lib/ThemeRegistry.tsx
'use client';

import * as React from 'react';
import { useServerInsertedHTML } from 'next/navigation';
import { CacheProvider, EmotionCache } from '@emotion/react';
import createEmotionCache from './emotionCache';

type ThemeRegistryProps = {
    children: React.ReactNode;
};

export default function ThemeRegistry({ children }: ThemeRegistryProps) {
    // Create only once, using React ref
    const [cache] = React.useState<EmotionCache>(() => createEmotionCache());

    // This will ensure the styles are injected in the correct order during SSR
    useServerInsertedHTML(() => (
        <style
            data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
            dangerouslySetInnerHTML={{
                __html: Object.values(cache.inserted).join(' '),
            }}
        />
    ));

    return <CacheProvider value={cache}>{children}</CacheProvider>;
}
