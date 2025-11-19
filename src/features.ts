import { CompanyInfo } from "./globals/CompanyInfo";
import { OpeningHours } from "./globals/OpeningHours";
import { Menu } from "./globals/Menu";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Events } from "./collections/Events";
import { FAQItems } from "./collections/FAQItems";
import { FAQGroups } from "./collections/FAQGroups";
import { JobOffers } from "./collections/JobOffers";
import { TeamItems } from "./collections/TeamItems";
import { TeamGroups } from "./collections/TeamGroups";
import { Testimonials } from "./collections/Testimonials";
import { PressReleases } from "./collections/PressReleases";
import { BlogPosts } from "./collections/BlogPosts";
import { BlogAuthors } from "./collections/BlogAuthors";
import { BlogCategories } from "./collections/BlogCategories";
import { ContactEmails } from "./collections/ContactEmails";

export const globals = [
    CompanyInfo,
    OpeningHours,
    Menu,
];

export const collections = [
    Users,
    Media,
    TeamGroups,
    TeamItems,
    Events,
    JobOffers,
    Testimonials,
    PressReleases,
    FAQGroups,
    FAQItems,
    BlogPosts,
    BlogAuthors,
    BlogCategories,
    ContactEmails,
];