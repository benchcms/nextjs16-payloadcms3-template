import { OpeningHours } from "./globals/OpeningHours";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Events } from "./collections/Events";
import { FAQ } from "./collections/FAQ";
import { JobOffers } from "./collections/JobOffers";
import { Team } from "./collections/Team";
import { Testimonials } from "./collections/Testimonials";
import { PressReleases } from "./collections/PressReleases";
import { BlogPosts } from "./collections/BlogPosts";
import { BlogAuthors } from "./collections/BlogAuthors";
import { BlogCategories } from "./collections/BlogCategories";
import { ContactEmails } from "./collections/ContactEmails";
import { RestaurantMenu } from "./collections/RestaurantMenu";
import { Settings } from "./globals/Settings";

export const globals = [
    Settings,
    OpeningHours,
];

export const collections = [
    Users,
    Media,
    Team,
    Events,
    JobOffers,
    Testimonials,
    PressReleases,
    FAQ,
    BlogPosts,
    BlogAuthors,
    BlogCategories,
    ContactEmails,
    RestaurantMenu,
];