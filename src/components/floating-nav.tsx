import React from "react";
import { FloatingNav as FloatingNavbar } from "./ui/floating-navbar";
import { IconHome, IconMessage, IconUser, IconCode, IconBook } from "@tabler/icons-react";
import { useSanityHero } from "@/hooks/useSanityData";
import { urlForImage } from "@/sanity/lib/image";

// Default fallback image
const DEFAULT_PROFILE_IMAGE = "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces&auto=format";

export const FloatingNav = () => {
  const { data: hero } = useSanityHero(null);
  
  // Get profile image from Sanity, with fallback
  const profileImage = React.useMemo(() => {
    if (hero?.profileImage) {
      if (typeof hero.profileImage === 'string') {
        return hero.profileImage;
      } else {
        // It's a Sanity image object
        const imageUrl = urlForImage(hero.profileImage)?.url();
        return imageUrl || DEFAULT_PROFILE_IMAGE;
      }
    }
    return DEFAULT_PROFILE_IMAGE;
  }, [hero?.profileImage]);

  const navItems = [
    {
      name: "Home",
      link: "/",
      icon: <IconHome className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "About",
      link: "/about",
      icon: <IconUser className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Projects",
      link: "/projects",
      icon: <IconCode className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Blog",
      link: "/blog",
      icon: <IconBook className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
    {
      name: "Contact",
      link: "/contact",
      icon: <IconMessage className="h-4 w-4 text-neutral-500 dark:text-white" />,
    },
  ];

  return <FloatingNavbar navItems={navItems} profileImage={profileImage} />;
};

