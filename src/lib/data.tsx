import { Github, Facebook, Instagram } from "lucide-react";
import { ProjectMetadata, TechDetails } from "@/lib/types";
import RestAPI from "../../public/images/Project/Rest API.png";
import SpringMVC from "../../public/images/Project/Spring MVC.png";
import Microservices from "../../public/images/Project/Microservices.png";

export const EXTERNAL_LINKS = {
  GITHUB: "https://github.com/dinhnhan05",
  GITHUB_REPO: "https://github.com/dinhnhan05",
  Linkedin: "https://linkedin.com/in/prince63",
  Gmail:
"mailto:kiryosdinhnhan@hotmail.com"
};

export const NAV_LINKS = [
  {
    label: "Trang chủ",
    href: "#home",
  },
  {
    label: "Thông tin",
    href: "#about",
  },
  {
    label: "Kỹ năng",
    href: "#skills",
  },
  {
    label: "Liên hệ",
    href: "#contact",
  },
  {
    label: "Trang Quản Trị",
    href: "/admin",
  },
];

export const SOCIAL_LINKS = [
  {
    icon: Github,
    url: "https://github.com/dinhnhan05",
  },
  {
    icon: Facebook,
    url:
"https://www.facebook.com/kiryosdinhnhan"      
  },
  {
    icon: Instagram,
  url:"https://instagram.com/kiryosdinhnhan"
  }
];

export const TECHNOLOGIES: TechDetails[] = [
  {
    label: "HTML",
    progress: 84,
  },
  {
    label: "CSS",
    progress: 82,
  },
  {
    label: "JavaScript",
    progress: 70,
  },
  {
    label: "Python",
    progress: 20,
  },
  {
    label: "React.Js",
    progress: 17,
  },
  {
    label: "Ruby",
    progress: 5,
  },
  {
    label: "PHP",
    progress: 11,
  },
  {
    label: "MySQL",
    progress: 19,
  },
  {
    label: "MongoDB",
    progress: 2,
  },
];

export const PROJECTS: ProjectMetadata[] = [
  {
    imageSrc: SpringMVC,
    title: "School Application",
    description:
      "School Application is a simple child school management Spring MVC application. that provides User Interface and RESTful API endpoints for managing school student data like student information, courses details, classes and enrollment details.",
    tags: [
      "Java",
      "Spring Boot",
      "Spring Mvc",
      "Thymeleaf",
      "Hibernate",
      "MySQL",
      "Rest API",
      "HTML",
      "CSS",
      "Bootstrap",
      "Postman",
      "Git",
      "GitHub",
    ],
    year: "January, 2024 - Feb, 2024",
    url: "https://github.com/prince-63/school-application",
  },
  {
    imageSrc: Microservices,
    title: "Bank Application",
    description:
      "The Bank Application is a robust banking solution built on a microservices architecture. It provides a suite of services including Cards, Loans, and Account management. Each service is a separate, independently deployable module, allowing for high scalability and fault isolation. The application leverages Spring Boot for creating the microservices and Hibernate for data access. It also provides RESTful API endpoints for integration with other systems or for building additional user interfaces. The entire application is containerized for easy deployment and version control is done using Git and GitHub.",
    tags: [
      "Java",
      "Spring Boot",
      "Hibernate",
      "MySQL",
      "Rest API",
      "Postman",
      "Git",
      "GitHub",
      "Microservices",
    ],
    year: "March, 2024 - Present",
    url: "https://github.com/prince-63/bank-application",
  },
];
