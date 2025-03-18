import CommunityFavorate from "../components/layout/communityFavPlantsSection";
import ExploreTheRage from "../components/layout/exploreRangeSection";
import Footer from "../components/layout/footer";
import Header from "../components/layout/header/header";
import HomeHeroSection from "../components/layout/heros/homeHeroSection";
import IndoorPlantSection from "../components/layout/indoorPlantsSection";
import LeaffyEarthValueSection from "../components/layout/leaffyEarthValueSection";
import NewArrivalsSection from "../components/layout/newArrivalsSection";
import { Typography } from "@mui/material";


export const metadata = {
  title: 'leaffyEarth | Home of Plants & Planters',
  description: 'Explore a wide range of plants and planters at leaffyEarth.',
  openGraph: {
    title: 'leaffyEarth | Home of Plants & Planters',
    description: 'Explore a wide range of plants and planters at leaffyEarth.',
    url: 'https://yourdomain.com',
    images: [
      {
        url: 'https://yourdomain.com/og-image.jpg',
        alt: 'leaffyEarth',
      },
    ],
  },
}


export default function Home() {


  return (
    <main>

      <HomeHeroSection />
      <ExploreTheRage />
      <LeaffyEarthValueSection />
      <IndoorPlantSection />
      <NewArrivalsSection />

    </main>
  );
}
