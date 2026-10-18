"use client";
import { useEffect } from 'react';
export default function DocumentLocale({locale}:{locale:'es'|'en'}) {
 useEffect(()=>{document.documentElement.lang=locale},[locale]);
 return null;
}
