// --- DATA CONFIGURATION (El profesor puede editar esto fácilmente) ---
import { basicInfoData } from './sections/basicInfoData';
import { cvData } from './sections/cvData';
import { complementaryData } from './sections/complementaryData';
import { productsData } from './sections/productsData';
import { experienceData } from './sections/experienceData';
import { tutoringData } from './sections/tutoringData';
import { juryData } from './sections/juryData';
import { eventsData } from './sections/eventsData';
import { networksData } from './sections/networksData';
import { socialImpactData } from './sections/socialImpactData';
import { digitalContentData } from './sections/digitalContentData';
import { articlesData } from './sections/articlesData';
import { nonScientificArticlesData } from './sections/nonScientificArticlesData';
import { divulgationBooksData } from './sections/divulgationBooksData';
import { researchReportsData } from './sections/researchReportsData';
import { artisticWorksData } from './sections/artisticWorksData';
import { projectsData } from './sections/projectsData';

export const PROFESSOR_DATA = {
  ...basicInfoData,
  cv: cvData,
  complementary: complementaryData,
  products: productsData,
  experience: experienceData,
  tutoring: tutoringData,
  jury: juryData,
  events: eventsData,
  networks: networksData,
  socialImpact: socialImpactData,
  digitalContent: digitalContentData,
  articles: articlesData,
  nonScientificArticles: nonScientificArticlesData,
  divulgationBooks: divulgationBooksData,
  researchReports: researchReportsData,
  artisticWorks: artisticWorksData,
  projects: projectsData,
};
