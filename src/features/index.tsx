import { lazy } from 'react'

export const LazyFeatureAbout = lazy(() => import('./about/feature-about.tsx'))
export const LazyFeatureContact = lazy(() => import('./contact/feature-contact.tsx'))
export const LazyFeatureDev = lazy(() => import('./dev/feature-dev.tsx'))
export const LazyFeatureHome = lazy(() => import('./home/feature-home.tsx'))
