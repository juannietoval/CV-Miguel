/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  BookOpen, 
  FileText, 
  Mail, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink, 
  GraduationCap, 
  Award, 
  Gavel,
  Calendar,
  MapPin,
  Linkedin,
  Twitter,
  Globe,
  Search,
  Users,
  Book,
  Briefcase,
  Library,
  Menu,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { AcademiaIcon, GoogleScholarIcon, ResearchGateIcon } from './components/CustomIcons';

// --- DATA CONFIGURATION (El profesor puede editar esto fácilmente) ---
const PROFESSOR_DATA = {
  name: "Miguel Ángel Puentes Castro",
  title: "Doctor en Ciencias de la Educación",
  profileImage: "https://raw.githubusercontent.com/juannietoval/CV-Miguel-Angel-Puentes-CASTRO/main/content.jpg",
  bio: "Investigador especializado en la unidad del signo epistemológico entre Realidad y Virtualidad. Con amplia formación en Comunicación Educativa, mi trabajo se centra en las implicaciones pedagógicas de las nuevas tecnologías y la comunicación mediatizada.",
  email: "miguel85@utp.edu.co",
  faculty: "Facultad de Bellas Artes y Humanidades",
  department: "Departamento de Humanidades",
  location: "Pereira, Colombia",
  social: {
    linkedin: "https://www.linkedin.com/in/miguel-%C3%A1ngel-puentes-castro-140a8329/",
    scholar: "https://scholar.google.com/citations?user=UB_b9kUAAAAJ&hl=es&authuser=1",
    researchgate: "https://www.researchgate.net/profile/Miguel-Angel-Puentes-Castro",
    academia: "https://utp-co.academia.edu/MiguelAngelPuentesCastro",
    repository: "https://repositorio.utp.edu.co/entities/person/7b6cfa24-1177-411c-a85b-55208120be84"
  },
  cv: [
    { 
      year: "2015 - 2020", 
      role: "Doctorado en Ciencias de la Educación", 
      institution: "Universidad Tecnológica de Pereira",
      description: "Tesis: HomoSinekus: Realidad - Virtualidad como unidad del signo epistemológico y sus implicaciones en lo educativo"
    },
    { 
      year: "2011 - 2014", 
      role: "Maestría en Comunicación Educativa", 
      institution: "Universidad Tecnológica de Pereira",
      description: "Proyecto: Pereira Imaginada Digital"
    },
    { 
      year: "2005 - 2010", 
      role: "Licenciatura en Comunicación e Informática Educativa", 
      institution: "Universidad Tecnológica de Pereira",
      description: "Proyecto: Metodología comunicativa mediatizada para la prevención de accidentalidad vial."
    }
  ],
  complementary: [
    { year: "2021", title: "Currículo del Editor II", institution: "MinCiencias" },
    { year: "2018", title: "Currículo del Editor I", institution: "MinCiencias" },
    { year: "2015", title: "Univirtual", institution: "UTP" },
    { year: "2010", title: "Comunicación Social y Periodismo", institution: "ASCUN" }
  ],
  products: [
    {
      id: 3,
      title: "CROQUIS DIGITALES: URBANISMOS CIUDADANOS EN PEREIRA",
      type: "Libro",
      description: "Coautoría con Olga Lucía Bedoya. Editorial Universidad Tecnológica de Pereira, 2018.",
      image: "https://raw.githubusercontent.com/juannietoval/CV-Miguel-Angel-Puentes-CASTRO/1b4a027cfb4abd129b9d75b5be6b7428a76398af/Captura%20de%20pantalla%202026-03-13%20160521.png",
      link: "https://repositorio.utp.edu.co/entities/publication/7823de3e-8d5d-4e8f-acb9-4354ce42ca4b"
    },
    {
      id: 4,
      title: "Más allá de la literalidad de la información: Una forma de comunicar las investigaciones",
      type: "Libro",
      description: "Coautoría con Olga Lucía Bedoya y Raúl Alberto Henao Vélez. Editorial Universidad Tecnológica de Pereira, 2022.",
      image: "https://raw.githubusercontent.com/juannietoval/CV-Miguel-Angel-Puentes-CASTRO/1b4a027cfb4abd129b9d75b5be6b7428a76398af/Captura%20de%20pantalla%202026-03-13%20161438.png",
      link: "https://repositorio.utp.edu.co/entities/publication/765b1fed-b86e-4e17-9bbc-74b3f761eec7"
    },
    {
      id: 5,
      title: "Eventos emergentes en las prácticas educativas telepresenciales en tiempos de la pandemia COVID-19: Visión de docentes y estudiantes",
      type: "Libro",
      description: "Coautoría con Olga Lucía Bedoya, Jhon Estiwar Gómez Palacio, Nancy Eugenia Cárdenas Ramírez, Luz Ángela Cardona Arce y Julián David Vélez Carvajal. Editorial Universidad Tecnológica de Pereira, 2023.",
      image: "https://raw.githubusercontent.com/juannietoval/CV-Miguel-Angel-Puentes-CASTRO/1b4a027cfb4abd129b9d75b5be6b7428a76398af/Captura%20de%20pantalla%202026-03-13%20162057.png",
      link: "https://repositorio.utp.edu.co/entities/publication/1c61dea1-5897-4aae-afbe-ffd4f475f0d2"
    },
    {
      id: 6,
      title: "Subjetividad política en el ámbito de la investigación y la enseñanza de las humanidades. 10 años del grupo de investigación en Estudios Políticos y Jurídicos",
      type: "Libro",
      description: "Coautoría con Álvaro Díaz Gómez, Ana María Calderón Jaramillo, Claudia Constanza Tovar Guerra, Luisa Fernanda Marulanda Gómez, Juan Manuel Martínez Herrera y Luis Fernando Arteaga Mapura. Editorial Universidad Tecnológica de Pereira, 2024.",
      image: "https://github.com/juannietoval/CV-Miguel-Angel-Puentes-CASTRO/blob/portadas/Captura%20de%20pantalla%202026-03-14%20133506.png?raw=true",
      link: "https://repositorio.utp.edu.co/entities/publication/8f70690c-054a-4ecc-b70d-4d93426326d5"
    },
    {
      id: 7,
      title: "Percepciones desde las experiencias en procesos de enseñanza - aprendizaje con telepresencia en tiempo de pandemia 2020-2021",
      type: "Capítulo de libro",
      description: "Coautoría con Nancy Eugenia Cárdenas Ramírez, Jhon Estiwar Gómez Palacio y Luz Ángela Cardona Arce. Editorial Universidad Tecnológica de Pereira, 2021.",
      image: "https://github.com/juannietoval/CV-Miguel-Angel-Puentes-CASTRO/blob/portadas/Captura%20de%20pantalla%202026-03-13%20213123.png?raw=true",
      link: "https://repositorio.utp.edu.co/entities/publication/0ffa48eb-b6b5-46da-ace5-20f348fe2e6f"
    },
    {
      id: 8,
      title: "Las Narrativas en la Construcción de la Verdad en Colombia. Develaciones Frente al Informe de la Comisión de la Verdad y sus Implicaciones en la Formación de Sujetos Políticos en el Área de las Humanidades en la Universidad Tecnológica de Pereira",
      type: "Capítulo de libro",
      description: "Coautoría con Olga Lucía Carmona Marín, Luisa Fernanda Marulanda Gómez, Juan Manuel Martínez Herrera, Julio César Murillo García, Pedro Pablo Suárez Giraldo y Oscar Salamanca Angarita. Editorial Universidad Tecnológica de Pereira, 2023.",
      image: "https://github.com/juannietoval/CV-Miguel-Angel-Puentes-CASTRO/blob/portadas/Captura%20de%20pantalla%202026-03-13%20215255.png?raw=true",
      link: "https://repositorio.utp.edu.co/entities/publication/038aa0e6-2791-45a2-ac60-2dc7cd6d8f31"
    },
    {
      id: 9,
      title: "Creation of an audiovisual strategy based on storytelling to change urban imaginaries: the case of imagined pereira and its citizen sketches",
      type: "Capítulo de libro",
      description: "Coautoría con Stefanía Gallego Falla, Jefferson Martínez-Santa, Martha Cecilia Gutiérrez Giraldo, Carolina Franco Ossa, Olga Lucia Bedoya y Yulia Katherine Cediel Gómez. Editorial Universidad Tecnológica de Pereira, 2023.",
      image: "https://github.com/juannietoval/CV-Miguel-Angel-Puentes-CASTRO/blob/portadas/Captura%20de%20pantalla%202026-03-13%20222654.png?raw=true",
      link: "https://repositorio.utp.edu.co/entities/publication/44340b86-cc8a-4235-9ac1-3dff5293c890"
    },
    {
      id: 10,
      title: "Cuidar el ambiente y cuidar la mujer: fortalecimiento de capacidades organizativas en asociaciones campesinas de Risaralda",
      type: "Videograbación",
      description: "Coautoría con Julio Cesar Murrillo Garcia y Melissa Montañez Holguin. Editorial Universidad Tecnológica de Pereira, 2024.",
      image: "https://github.com/juannietoval/CV-Miguel-Angel-Puentes-CASTRO/blob/portadas/Captura%20de%20pantalla%202026-03-21%20193139.png?raw=true",
      link: "https://repositorio.utp.edu.co/entities/publication/a829aa8f-4706-4760-a48b-873fe19d2e34"
    },
    {
      id: 11,
      title: "Simposio “Subjetividad Política en el ámbito de la investigación y la enseñanza de las humanidades\"",
      type: "Videograbación",
      description: "Autoría de Miguel Ángel Puentes Castro. Editorial Universidad Tecnológica de Pereira, 2023.",
      image: "https://github.com/juannietoval/CV-Miguel-Angel-Puentes-CASTRO/blob/portadas/Captura%20de%20pantalla%202026-03-21%20193313.png?raw=true",
      link: "https://repositorio.utp.edu.co/entities/publication/fce95d8e-0e62-4b81-a540-85efadb80d53"
    },
    {
      id: 12,
      title: "Asociación campesina del Eje y Norte del Valle ASOCRI. Cuidar el ambiente y cuidar la mujer: fortalecimiento de capacidades organizativas en asociaciones campesinas de Risaralda",
      type: "Videograbación",
      description: "Coautoría con Julio Cesar Murrillo Garcia y Melissa Montañez Holguin. Editorial Universidad Tecnológica de Pereira, 2024.",
      image: "https://github.com/juannietoval/CV-Miguel-Angel-Puentes-CASTRO/blob/portadas/Captura%20de%20pantalla%202026-03-21%20193431.png?raw=true",
      link: "https://repositorio.utp.edu.co/entities/publication/d433724e-8644-4338-9d48-1fe0d8d3b8bd"
    },
    {
      id: 13,
      title: "Asociacion Nacional Campesina Agropecuaria ASONACA. Cuidar el ambiente y cuidar la mujer: fortalecimiento de capacidades organizativas en asociaciones campesinas de Risaralda",
      type: "Videograbación",
      description: "Coautoría con Julio Cesar Murrillo Garcia y Melissa Montañez Holguin. Editorial Universidad Tecnológica de Pereira, 2024.",
      image: "https://github.com/juannietoval/CV-Miguel-Angel-Puentes-CASTRO/blob/portadas/Captura%20de%20pantalla%202026-03-21%20193535.png?raw=true",
      link: "https://repositorio.utp.edu.co/entities/publication/bbe9bad1-b98a-47cb-80c2-1904c93b17bf"
    },
    {
      id: 14,
      title: "ASOPROMAR. Cuidar el ambiente y cuidar la mujer: fortalecimiento de capacidades organizativas en asociaciones campesinas de Risaralda",
      type: "Videograbación",
      description: "Coautoría con Julio Cesar Murrillo Garcia y Melissa Montañez Holguin. Editorial Universidad Tecnológica de Pereira, 2024.",
      image: "https://github.com/juannietoval/CV-Miguel-Angel-Puentes-CASTRO/blob/portadas/Captura%20de%20pantalla%202026-03-21%20193622.png?raw=true",
      link: "https://repositorio.utp.edu.co/entities/publication/22726617-8f3c-4ef2-bc2d-7120510fdbcb"
    },
    {
      id: 15,
      title: "La extensión universitaria como el pilar del vínculo universidad—entorno",
      type: "Libro",
      description: "Coautoría con un extenso equipo de investigadores de la UTP. Editorial Universidad Tecnológica de Pereira, 2025.",
      image: "https://github.com/juannietoval/CV-Miguel-Angel-Puentes-CASTRO/blob/portadas/Captura%20de%20pantalla%202026-03-14%20134654.png?raw=true",
      link: "https://repositorio.utp.edu.co/entities/publication/4a9dd9a5-e653-4440-be9f-ccc5a0b8d3b2"
    },
    {
      id: 16,
      title: "Estudios Sociales del Cuidado: desafíos latinoamericanos",
      type: "Libro",
      description: "Coautoría con Alvaro Diaz Gomez. Universidad Distrital Francisco José de Caldas, 2024.",
      image: "https://github.com/juannietoval/CV-Miguel-Angel-Puentes-CASTRO/blob/portadas/Captura%20de%20pantalla%202026-03-25%20204437.png?raw=true",
      link: "https://www.academia.edu/136879547/Cuerpos_juveniles_que_se_cuidan_Experiencias_desde_el_acontecimiento_pand%C3%A9mico_derivado_del_Covid_19"
    }
  ],
  experience: [
    {
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      dedication: "48 horas Semanales",
      period: "Enero de 2024 - Actual",
      activities: {
        admin: ["Coordinador del área de Formación Humana - Departamento de Humanidades UTP"],
        teaching: [
          "Dispositivos de la cultura y prácticas contemporáneas",
          "Humanidades, memoria y política",
          "Metodología de la investigación"
        ],
        research: [
          "Caracterización Del Material Documental Para La Conformación De Un Archivo De Derechos Humanos, Memoria Histórica Y Conflicto Armado De La Ciudad De Pereira (Risaralda).",
          "Subjetividades juveniles emergentes durante el acontecimiento pandémico derivado del Covid-19."
        ]
      }
    },
    {
      institution: "Universidad de Panamá",
      dedication: "15 horas Semanales",
      period: "2023 - 2024",
      activities: {
        teaching: [
          "Investigación Educativa II (Jun-Jul 2024)",
          "Elaboración de Documentos Científicos (Ene-Mar 2024)",
          "Investigación Educativa I (Nov-Dic 2023)",
          "Seminario doctoral Epistemología y Tendencias Educativas Contemporáneas (Jul-Sep 2023)"
        ]
      }
    },
    {
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      dedication: "48 horas Semanales",
      period: "Enero de 2023 - Diciembre de 2023",
      activities: {
        teaching: ["Humanidades I y II", "Metodología de la investigación"],
        research: ["Subjetividades juveniles emergentes durante el acontecimiento pandémico derivado del Covid-19."]
      }
    },
    {
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      dedication: "24 horas Semanales",
      period: "Agosto de 2022 - Diciembre de 2022",
      activities: {
        admin: ["Coordinador del área de Formación Humana"],
        teaching: ["Didáctica de la tecnología", "Humanidades I y II", "Didáctica general"],
        research: ["Tendencias Conceptuales Derivadas De La Producción Académica Del Grupo De Investigación En Estudios Políticos Y Jurídicos."]
      }
    },
    {
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      dedication: "21 horas Semanales",
      period: "Enero de 2022 - Julio de 2022",
      activities: {
        admin: ["Coordinador del área de Humanidades"],
        teaching: ["Didáctica de la tecnología", "Humanidades I y II", "Didáctica general", "Metodología de la Investigación"],
        research: ["Tendencias Conceptuales Derivadas De La Producción Académica Del Grupo De Investigación En Estudios Políticos Y Jurídicos."]
      }
    },
    {
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      dedication: "18 horas Semanales",
      period: "2021",
      activities: {
        teaching: ["Metodología de la investigación", "Humanidades I y II", "Didáctica general"],
        research: ["Tendencias Conceptuales Derivadas De La Producción Académica Del Grupo De Investigación En Estudios Políticos Y Jurídicos."]
      }
    },
    {
      institution: "UNIVERSIDAD CATOLICA DE PEREIRA",
      dedication: "3-6 horas Semanales",
      period: "2015 - 2017",
      activities: {
        teaching: ["Gestión de redes sociales", "Psicología de la comunicación", "Fotografía"]
      }
    },
    {
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      dedication: "Varios",
      period: "2011 - 2020",
      activities: {
        teaching: ["Diseño gráfico", "Video", "Informática", "Impresos", "Informática educativa I"]
      }
    }
  ],
  tutoring: [
    {
      type: "Tesis de doctorado",
      title: "Implementación del Modelo Aula Invertida (Flipped classroom) Estrategias de Enseñanza-Aprendizaje en el Área de Ciencias Sociales para Estudiantes de Básica Secundaria y Medía",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      status: "En curso",
      year: "2024",
      student: "",
      role: "Tutor principal"
    },
    {
      type: "Trabajo de grado de maestría",
      title: "ENSEÑANZA DE LA FÍSICA BASADA EN LOS FACTORES ANTROPOLÓGICOS Y EL CONTEXTO SOCIAL",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      status: "Concluida",
      year: "2022",
      student: "Luis Enrique Castañeda González",
      role: "Tutor principal"
    },
    {
      type: "Trabajo de grado de maestría",
      title: "Imaginarios alrededor de las rutinas de entretenimiento en los jóvenes de los grados novenos, décimos y onces de la Institución Educativa Román María Valencia de Calarcá - Quindío a partir de la pandemia COVID-19",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      status: "Concluida",
      year: "2021",
      student: "Mario Alexander Arenas Agudelo",
      role: "Tutor principal"
    },
    {
      type: "Trabajo de grado de maestría",
      title: "El uso de la Tecnología en el proceso de enseñanza - aprendizaje de la física en las áreas rurales, como estrategias aplicables en los colegios públicos del Distrito de los Pozos - Herrera en la República de Panamá",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      status: "Concluida",
      year: "2024",
      student: "Lourdes Virginia González",
      role: "Tutor principal"
    },
    {
      type: "Trabajo de grado de maestría",
      title: "Polisemia y pobreza léxica como obstáculos en la enseñanza del concepto medir y su tratamiento estadístico",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      status: "Concluida",
      year: "2022",
      student: "Reyes Villarreal Miranda",
      role: "Tutor principal"
    },
    {
      type: "Trabajo de grado de maestría",
      title: "Identificación De Las Nuevas Construcciones Simbólicas Del Sujeto En La Relación Sugar Daddy – Sugar Baby En La Producción De La Red Social Twitter",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      status: "Concluida",
      year: "2020",
      student: "JULIAN DAVID NOGOA ARRUBLA",
      role: "Tutor principal"
    },
    {
      type: "Trabajo de grado de maestría",
      title: "Arabia Imaginada",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      status: "Concluida",
      year: "2021",
      student: "Liliana Quintero Marin, Jaime Giovanni Guisado Sepúlveda",
      role: "Tutor principal"
    },
    {
      type: "Trabajo de grado de maestría",
      title: "El Self-Body de los Jóvenes: Un Análisis de los Relatos de Sí en las Cartografías del Cuerpo",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      status: "Concluida",
      year: "2021",
      student: "ANYHELO ECHEVERRI SÁNCHEZ",
      role: "Tutor principal"
    },
    {
      type: "Trabajo de grado de maestría",
      title: "Imaginarios del grafiti y el arte público en la ciudad de Pereira",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      status: "Concluida",
      year: "2021",
      student: "Mónica Espinosa Gallón",
      role: "Tutor principal"
    },
    {
      type: "Trabajo de grado de maestría",
      title: "Mirada A La Construcción De Imaginarios Urbanos, Desde Las Rutinas De Tiempo Libre En El Marco De La Pandemia Por COVID-19, De Los Jóvenes De La Institución Educativa Juan XXIII Del Barrio Cuba De La Ciudad De Pereira",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      status: "Concluida",
      year: "2021",
      student: "clara patricia mariscal jimenez, Mónica María Osorio Alvarez",
      role: "Tutor principal"
    },
    {
      type: "Trabajo de grado de maestría",
      title: "Comunicación y educación en procesos comunitarios",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      status: "En curso",
      year: "2018",
      student: "Felipe Gallego",
      role: "Tutor principal"
    },
    {
      type: "Trabajo de grado de pregrado",
      title: "ALFABETIZACIÓN DIGITAL EN ADULTOS MAYORES DEL GRUPO DE LA TERCERA EDAD DEL BARRIO PARQUE INDUSTRIAL DE PEREIRA, DESDE LA PERSPECTIVA DEL APRENDIZAJE SIGNIFICATIVO",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      status: "Concluida",
      year: "2015",
      student: "Diana Cristina Ospina Valencia",
      role: "Tutor principal"
    },
    {
      type: "Trabajo de grado de pregrado",
      title: "Los emojis, el lenguaje emergente de la cibercultura",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      status: "Concluida",
      year: "2021",
      student: "Natalia Patiño Osorio",
      role: "Tutor principal"
    },
    {
      type: "Trabajo de grado de pregrado",
      title: "Realidad aumentada como herramienta que potencialice el aprendizaje significativo en geometría básica del grado tercero de la Institución Educativa Instituto Estrada",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      status: "Concluida",
      year: "2016",
      student: "Gómez Carmona, Jorge Humberto; López Quintero, Daniel",
      role: "Tutor principal"
    },
    {
      type: "Trabajo de grado de pregrado",
      title: "LA ACTITUD CRÍTICA EN EL PROCESO DE ALFABETIZACIÓN MEDIÁTICA DESARROLLADA EN LA ÁREA DE INFORMÁTICA EN ESTUDIANTES DE GRADO 11",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      status: "Concluida",
      year: "2016",
      student: "STEFANY CASTILLO JARAMILLO, PAULA GARCIA HERRERA, DANIELA MACHADO MAYA",
      role: "Tutor principal"
    },
    {
      type: "Trabajo de grado de pregrado",
      title: "Fomento a la lectura y la escritura por medio de la creación artística del libro álbum en la biblioteca comunitaria Andrés Caicedo",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      status: "Concluida",
      year: "2020",
      student: "Mariana Patiño Arismendi",
      role: "Tutor principal"
    },
    {
      type: "Trabajo de grado de pregrado",
      title: "Rugby como metodología de aprendizaje en la historia de vida de las integrantes del equipo femenino Rhinos Femme",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      status: "Concluida",
      year: "2020",
      student: "Yuliana Zuluaga Vanegas",
      role: "Tutor principal"
    },
    {
      type: "Trabajo de grado de pregrado",
      title: "Sistematización de emprendimientos en los Licenciados en Comunicación e Informática Educativa",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      status: "Concluida",
      year: "2020",
      student: "Sebastián Rodríguez Arias",
      role: "Tutor principal"
    },
    {
      type: "Trabajo de grado de pregrado",
      title: "Imaginarios que construyeron los usuarios de la FanPage “UNEES” sobre los estudiantes de educación superior durante el paro estudiantil del 10 de octubre del 2018 al 21 de enero del 2019",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      status: "Concluida",
      year: "2020",
      student: "Brayan Cañaveral Osorio - Valeria Galvis López - Juan Pablo Torres Giraldo",
      role: "Tutor principal"
    },
    {
      type: "Trabajo de grado de pregrado",
      title: "Estrategias de comunicación de la emisora Universitaria Estéreo para fomentar la integración con la comunidad de la Universidad Tecnológica de Pereira",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      status: "Concluida",
      year: "2020",
      student: "Geraldine Hurtado García",
      role: "Tutor principal"
    },
    {
      type: "Trabajo de grado de pregrado",
      title: "Radio escolar como estrategia educomunicativa en la comunidad: Instituto Tecnológico Santa Rosa de Cabal",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      status: "Concluida",
      year: "2019",
      student: "Jhonatan Estiven Correa Londoño / Yury Juliana Velásquez Alarcón",
      role: "Tutor principal"
    },
    {
      type: "Trabajo de grado de pregrado",
      title: "El kambalachi (trueque), como propuesta pedagógica para la resignificación del pensamiento en el Pueblo Inga de Aponte",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      status: "Concluida",
      year: "2019",
      student: "Martha Yaneth Jojoa Mavisoy",
      role: "Tutor principal"
    },
    {
      type: "Trabajo de grado de pregrado",
      title: "Géneros discursivos en el ámbito académico en la Licenciatura en Comunicación e Informática Educativa de la Universidad Tecnológica de Pereira",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      status: "Concluida",
      year: "2019",
      student: "Jessica Jazmín Aguirre Guarín",
      role: "Tutor principal"
    },
    {
      type: "Trabajo de grado de pregrado",
      title: "Diseño de una propuesta didáctica para la implementación de la fotografía en el aula de clase en la asignatura de educación artística en estudiantes de 4° de primaria de la Institución Educativa Santa Sofía en el municipio de Dosquebradas",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      status: "Concluida",
      year: "2018",
      student: "Alejandro Mesa Mejía",
      role: "Tutor principal"
    },
    {
      type: "Trabajo de grado de pregrado",
      title: "Entre álbumes de familia : Construcción de memoria en la mujer pereirana",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      status: "Concluida",
      year: "2016",
      student: "Erika Betancourt Urrea",
      role: "Tutor principal"
    }
  ],
  jury: [
    {
      type: "Pregrado",
      title: "Imaginarios Urbanos Del Público De Ciudadanos De La Vereda La Florida",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "Licenciatura en comunicación e Informática Educativa",
      student: "Juan Pablo Agudelo Muriel, Sergio Iván Cardona Giraldo Y Natalia Ramírez Marín"
    },
    {
      type: "Maestría",
      title: "Los Estereotipos Del Selfie: Narrativas Del Yo",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "MAESTRIA EN COMUNICACION EDUCATIVA",
      student: "Javier Ovidio Giraldo"
    },
    {
      type: "Especialización",
      title: "Principales Causas De Las Deficiencias En Cinemática En Estudiantes De 11O Bachiller En Ciencias",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "Especialización en Enseñanza de la física",
      student: "Kharla Michelle Molinares"
    },
    {
      type: "Maestría",
      title: "Televidencias y Recepciones. Caracterización de audiencias televisivas en la Institución Educativa Santa Juana de Lestonnac",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "MAESTRIA EN COMUNICACION EDUCATIVA",
      student: "German David Prada Salazar y Keli Andrea Guevara Arbeláez"
    },
    {
      type: "Maestría",
      title: "Culturambie: validación de aprendizajes en prácticas educativas TIC",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "MAESTRIA EN COMUNICACION EDUCATIVA",
      student: "Jamileth Sorai Bedoya Agudelo y Leidy Johana Zuleta Ramírez"
    },
    {
      type: "Especialización",
      title: "La motivación de los estudiantes en el proceso de aprendizaje de la física",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "Especialización en Enseñanza de la física",
      student: ""
    },
    {
      type: "Pregrado",
      title: "Narrativas Futboleras: Otras Miradas A Los Hinchas Del Deportivo Pereira",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "Licenciatura en Comunicación e Informatica Educativa",
      student: "Alejandra Mejía Lasso y María Katherine Osorio Osorio"
    },
    {
      type: "Pregrado",
      title: "Los Videojuegos De Estrategia Y La Resolución De Conflictos",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "Licenciatura en comunicación e Informática Educativa",
      student: "Valentina Rodríguez González y Santiago Yepes Serna"
    },
    {
      type: "Pregrado",
      title: "La Cine Videncia En El Proceso De Recepción Cinematográfico Por Parte De Jóvenes En El Contexto De Los Cineclubes La Caja Y Cine Estudio",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "Licenciatura en comunicación e Informática Educativa",
      student: "Daniela Alejandra Hincapié Hoyos, Conrado de Jesús Barrera Henao, Daniela Rojas Rojas"
    },
    {
      type: "Pregrado",
      title: "Television Didactica: Una Estrategia Educativa Para Fortalecer La Enseñanza-Aprendizaje De Los Estudiantes",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "LICENCIATURA EN COMUNICACION E INFORMATICA EDUCATIVA",
      student: "Inés Córdoba Campaña y Anny Juliana Diez Collazos"
    },
    {
      type: "Pregrado",
      title: "Subjetividad Política A Través Del Análisis Expresivo Del Cartel Como Medio De Manifestación, A Propósito De La Cátedra De La Paz Grupo I, En El Eje",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "LICENCIATURA EN COMUNICACION E INFORMATICA EDUCATIVA",
      student: "Edwin Alexander Giraldo Rincón"
    },
    {
      type: "Maestría",
      title: "Currículo: ¿Linealidad O No Linealidad? - Hacia El Uso De La Interacción De Las Tic. Caso: Institución Educativa La Inmaculada Pereira",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "MAESTRIA EN COMUNICACION EDUCATIVA",
      student: "José Alejandro Zapata Pérez"
    },
    {
      type: "Especialización",
      title: "Posibilidades Cognitivas, De Infraestructura Y Producción De Contenidos En El Uso De La Realidad Aumentada En El Contexto Escolar: Una Mirada Desde El Estado Del Arte",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "Especialización en Enseñanza de la física",
      student: "Anaika Yamileth Castillo González y Estefany Chow Grandison"
    },
    {
      type: "Pregrado",
      title: "IMPLEMENTACION DE UN VIDEO EDUCATIVO EN LA ENSEÑANZA Y APRENDIZAJE DE LOS EJES TEMATICOS DE LA INFORMATICA Y TECNOLOGIA DE LOS ESTUDIANTES DE GRADO 6A DE LA INSTITUCION EDUCATIVA REMIGIO ANTONIO CAÑARTE DE LA CIUDAD DE PEREIRA, RISARALDA",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "Licenciatura en comunicación e Informática Educativa",
      student: "Octavio de Jesus Jimenez Cardona y Liliana Carolina Giraldo Gallego"
    },
    {
      type: "Pregrado",
      title: "Tokio imaginado. \"La ciudad desde sus cualidades, calificaciones y escenarios\"",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "Licenciatura en Comunicación e Informatica Educativa",
      student: "NATALY VALENCIA, VIVIANA LOPEZ Y ALEXANDER OROZCO"
    },
    {
      type: "Pregrado",
      title: "¡RECONOCIENDO LA TELE!",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "LICENCIATURA EN PEDAGOGIA INFANTIL",
      student: "YENIFER VANESA JIMENEZ ARENAS y DIANA MARCELA CANO VARGAS"
    },
    {
      type: "Pregrado",
      title: "PROCESOS DE RECEPCIÓN ACTIVA EN LOS ESTUDIANTES DE LA JORNADA COMPLEMENTARIA DEL HOGAR INFANTIL BELENCITO DEL MUNICIPIO DE BELÉN DE UMBRÍA",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "LICENCIATURA EN PEDAGOGIA INFANTIL",
      student: "NANCY JOHANA GONZALEZ FLOREZ, BIBIANA ANDREA ISAZA FLOREZ y YORLADYS CEBALLOS"
    },
    {
      type: "Pregrado",
      title: "ANÁLISIS E INTERPRETACIÓN DE UNA UNIDAD DIDACTICA EN LA ENSEÑANZA DEL CUBO",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "LICENCIATURA EN PEDAGOGIA INFANTIL",
      student: "MARIA CARMENZA ARICAPA GARCIA"
    },
    {
      type: "Maestría",
      title: "Sociedad Abierta: un Proyecto Inacabado",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "MAESTRÍA EN FILOSOFÍA",
      student: "Alba Yaneth Jaramillo Muñoz"
    },
    {
      type: "Maestría",
      title: "Prácticas Educativas Mediadas por Redes Sociales: Percepciones y Experiencias de Docentes Universitarios",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "MAESTRIA EN COMUNICACION EDUCATIVA",
      student: "Juan Felipe López Zapata"
    },
    {
      type: "Maestría",
      title: "Narrativa de la memoria colectiva de Cooeducar en tiempos de mediatización",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "MAESTRIA EN COMUNICACION EDUCATIVA",
      student: "Carlos Alberto Delgado, Carlos Arturo Arenas"
    },
    {
      type: "Maestría",
      title: "El Feminismo Como Codificación Estratégica de Puntos de Resistencia Para la Consolidación de la Democracia Radical",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "MAESTRÍA EN FILOSOFÍA",
      student: "Jessica Viviana Obando Correal"
    },
    {
      type: "Pregrado",
      title: "CIUDAD VICTORIA IMAGINADA: UNA VISIÓN DE LA RENOVACIÓN DESDE LAS REPRESENTACIONES DE LOS JÓVENES PEREIRANOS",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "Licenciatura en comunicación e Informática Educativa",
      student: "JESSICA LOZANO RAMÍREZ, MILEIDY GONZÁLEZ MEDINA Y PRISCILA SANTANA GIRALDO"
    },
    {
      type: "Pregrado",
      title: "APLICACIÓN DE LA TEORÍA TRIADICA DE PEIRCE EN EL GRAFFITI COMO PUNTO DE VISTA CIUDADANO",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "Licenciatura en comunicación e Informática Educativa",
      student: "Andrea Palacio Herrera"
    },
    {
      type: "Pregrado",
      title: "LOS IMAGINARIOS QUE CONSTRUYEN LOS ESTUDIANTES DE GRADO 10 DEL COLEGIO SANTA ISABEL DEL MUNICIPIO DE DOSQUEBRADAS A PARTIR DE LA VISUALIZACIÓN DEL COMERCIAL DE CHICA ÁGUILA",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "Licenciatura en comunicación e Informática Educativa",
      student: "Diana Alejandra Agudelo Osorio y Leidy Viviana Bermúdez Ortiz"
    },
    {
      type: "Maestría",
      title: "LAS FORMAS DE APRENDER, CONOCER, Y PRODUCIR CONOCIMIENTO SE MODIFICAN, CON LA MEDIACIÓN DE LOS DISPOSITIVOS MÓVILES CELULARES EN EL AULA?",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "Maestria en Comunicación Educativa",
      student: "CARLOS ENRIQUE MARÍN HURTADO"
    },
    {
      type: "Maestría",
      title: "ARMENIA Y EL QUINDÍO: UN CONTRASTE ENTRE IMAGINARIOS Y REALIDAD",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "MAESTRIA EN COMUNICACION EDUCATIVA",
      student: "JHONI DANIEL SALAZAR GÓMEZ"
    },
    {
      type: "Maestría",
      title: "Diseño y validación de la propuesta educativa RED en el Aula, orientada a fortalecer desde el enfoque del Aprendizaje Significativo la Competencia Tecnológica en estudiantes de tercer semestre de Licenciatura en Comunicación e Informática Educativas de la Universidad Tecnológica de Pereira",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "Maestria en Comunicación Educativa",
      student: "Marcia Cristina Peláez Sampedro"
    },
    {
      type: "Maestría",
      title: "Constructivismo? Entornos de enseñanza y aprendizaje incorporando TIC",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "Maestria en Comunicación Educativa",
      student: "Milvi Leonor Tapias Oquendo"
    },
    {
      type: "Maestría",
      title: "ESCENARIOS Y CALIFICACIONES URBANAS DE ESPACIOS DE LA CIUDAD DE PEREIRA Y SU RELACIÓN CON LAS OPINIONES REGISTRADAS EN GOOGLE MAPS",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "Maestria en Comunicación Educativa",
      student: "YORMAN JULIAN GONZÀLEZ RAMIREZ"
    },
    {
      type: "Maestría",
      title: "Análisis de la narrativa del discurso periodístico en el marco del proceso de paz: caso Revista Semana en el periodo 2015-2016",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "Maestria en Comunicación Educativa",
      student: "JUAN CAMILO PASCUAS"
    },
    {
      type: "Maestría",
      title: "MODELO DE ESCRITURA DE PROYECTOS PARA TELEVISIÓN CULTURAL EN CONTEXTOS NACIONALES Y REGIONALES - UN ESTUDIO DE CASO",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "Maestria en Comunicación Educativa",
      student: "WILMER SOTTO SUAREZ"
    },
    {
      type: "Maestría",
      title: "EVALUACIÓN DE LA PERTINENCIA DEL APRENDIZAJE BASADO EN PROYECTOS (ABP), EN LA IMPLEMENTACIÓN DE UNA ASIGNATURA INCLUIDA EN LA PROPUESTA DE FORMACIÓN POSGRADUAL ESPECIALIZACIÓN EN DIGITALIZACIÓN DE PROCESOS INDUSTRIALES",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "MAESTRÍA EN ENSEÑANZA DE LA FÍSICA",
      student: "WILLIAM PRADO MARTÍNEZ - HERNÁN ALBERTO QUINTERO VALLEJO"
    },
    {
      type: "Especialización",
      title: "Zonula motion capture eje cafetero",
      institution: "UNIVERSIDAD CATOLICA DE PEREIRA",
      program: "Especialización gestión de proyectos de diseño e innovación",
      student: "Yeison Escobar Puentes"
    },
    {
      type: "Pregrado",
      title: "ALFABETIZACIÓN DIGITAL EN ADULTOS MAYORES DEL GRUPO DE LA TERCERA EDAD DEL BARRIO PARQUE INDUSTRIAL DE PEREIRA, DESDE LA PERSPECTIVA DEL APRENDIZAJE SIGNIFICATIVO",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "Licenciatura en Comunicación e Informática Educativas",
      student: "DIANA CRISTINA OSPINA VALENCIA"
    },
    {
      type: "Maestría",
      title: "PEREIRA IMAGINADA: UNA MIRADA DESDE EL SECTOR RURAL",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "MAESTRIA EN COMUNICACION EDUCATIVA",
      student: "GUILLERMO ORBES PANTOJA"
    },
    {
      type: "Pregrado",
      title: "LA AUTOBIOGRAFÍA COMO METODOLOGÍA DE ENSEÑANZA EN EL PROCESO INVESTIGATIVO",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "MAESTRIA EN COMUNICACION EDUCATIVA",
      student: "ANA CAROLINA RENDÓN CARDONA / PAULA ANDREA RENDÓN CARDONA"
    },
    {
      type: "Maestría",
      title: "PRÁCTICAS COMUNICATIVAS DE LAS ORGANIZACIONES AFRORISARALDENSES",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "MAESTRIA EN COMUNICACION EDUCATIVA",
      student: "DOUGLAS JEFER YURGAKY COSSIO"
    },
    {
      type: "Maestría",
      title: "VALIDACIÓN DE APRENDIZAJES EN PRÁCTICAS EDUCATIVAS TIC",
      institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA",
      program: "MAESTRIA EN COMUNICACION EDUCATIVA",
      student: "JAMILETH SORAI BEDOYA AGUDELO - LEIDY JOHANA ZULETA RAMÍREZ"
    }
  ],
  events: [
    {
      name: "Tercer Coloquio Internacional y Cuarto Nacional de Pensamiento Educativo y Comunicación",
      type: "Otro",
      scope: "Internacional",
      date: "2014-11-10 al 2014-11-11",
      location: "PEREIRA - Hotel Movich Pereira",
      role: "Organizador",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO", "OLGA LUCIA BEDOYA"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Patrocinadora)"]
    },
    {
      name: "Taller Internacional Narrativas Transmedia",
      type: "Taller",
      scope: "Nacional",
      date: "2015-06-26 al 2015-06-27",
      location: "PEREIRA - Universidad Tecnológica de Pereira",
      role: "Organizador",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Patrocinadora)"]
    },
    {
      name: "Taller Internacional Circopolis: Errores Inteligentes en la Cultural Digital",
      type: "Taller",
      scope: "Nacional",
      date: "2015-08-28 al 2015-08-29",
      location: "PEREIRA - Top Deck Hotel Pereira",
      role: "Organizador",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Patrocinadora)"]
    },
    {
      name: "Taller 5. Proyección del cuidado del género",
      type: "Taller",
      scope: "Nacional",
      date: "2024-09-21",
      location: "PEREIRA",
      role: "Organizador",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Patrocinadora)"]
    },
    {
      name: "Taller 2. Proyección del cuidado ambiental",
      type: "Taller",
      scope: "Nacional",
      date: "2024-04-13",
      location: "PEREIRA",
      role: "Organizador",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Patrocinadora)"]
    },
    {
      name: "Taller 4. Diagnóstico de género",
      type: "Taller",
      scope: "Nacional",
      date: "2024-08-24",
      location: "PEREIRA",
      role: "Organizador",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Patrocinadora)"]
    },
    {
      name: "Taller 1. Diagnóstico ambiental",
      type: "Taller",
      scope: "Nacional",
      date: "2024-03-16",
      location: "PEREIRA",
      role: "Organizador",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Patrocinadora)"]
    },
    {
      name: "Cuidar el ambiente y cuidar la mujer: fortalecimiento de capacidades organizativas en asociaciones campesinas de Risaralda",
      type: "Congreso",
      scope: "Nacional",
      date: "2024-01-30 al 2024-12-01",
      location: "PEREIRA",
      role: "Organizador",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Patrocinadora)"]
    },
    {
      name: "Taller 3. Plan basado en modelo lógico",
      type: "Taller",
      scope: "Nacional",
      date: "2024-05-18",
      location: "PEREIRA",
      role: "Organizador",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Patrocinadora)"]
    },
    {
      name: "Taller 7. Revisión y ajustes a planes de cuidado",
      type: "Taller",
      scope: "Nacional",
      date: "2024-11-09",
      location: "PEREIRA",
      role: "Organizador",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Patrocinadora)"]
    },
    {
      name: "XIV Coloquio de investigación en formación ciudadana: El cuidado de la vida y la subjetividad política: resistencias y re- existencias en la formación ciudadana en lo contemporáneo",
      type: "Congreso",
      scope: "Nacional",
      date: "2025-02-03 al 2025-10-30",
      location: "PEREIRA",
      role: "Organizador",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Patrocinadora)"]
    },
    {
      name: "XIV Coloquio de investigación en formación ciudadana: El cuidado de la vida y la subjetividad política: resistencias y re-existencias en la formación ciudadana en lo contemporáneo",
      type: "Congreso",
      scope: "Nacional",
      date: "2025-09-03 al 2026-03-06",
      location: "PEREIRA - Universidad Tecnológica de Pereira",
      role: "Organizador",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Patrocinadora)"]
    },
    {
      name: "Jornada de Transferencia Tecnológica en DSpace",
      type: "Congreso",
      scope: "Nacional",
      date: "2025-03-07",
      location: "PEREIRA",
      role: "Organizador",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Patrocinadora)"]
    },
    {
      name: "Cuidar el ambiente y cuidar la mujer: fortalecimiento de capacidades organizativas en asociaciones campesinas de Risaralda",
      type: "Taller",
      scope: "Nacional",
      date: "2024-03-16",
      location: "PEREIRA",
      role: "Organizador",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Patrocinadora)"]
    },
    {
      name: "Jornada de socialización: Cuidar el ambiente y cuidar la mujer: fortalecimiento de capacidades organizativas",
      type: "Congreso",
      scope: "Nacional",
      date: "2024-11-16",
      location: "PEREIRA",
      role: "Organizador",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Patrocinadora)"]
    },
    {
      name: "Taller 6. Plan basado en rúbrica para ciudad de género",
      type: "Taller",
      scope: "Nacional",
      date: "2024-10-19",
      location: "PEREIRA",
      role: "Organizador",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Patrocinadora)"]
    },
    {
      name: "Jornada de Transferencia Tecnológica en DSpace",
      type: "Encuentro",
      scope: "Nacional",
      date: "2025-03-07",
      location: "PEREIRA - Universidad Tecnológica de Pereira",
      role: "Organizador",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Patrocinadora)"]
    },
    {
      name: "Jornada de socialización: Cuidar el ambiente y cuidar la mujer: fortalecimiento de capacidades organizativas",
      type: "Encuentro",
      scope: "Nacional",
      date: "2024-02-03 al 2024-10-26",
      location: "PEREIRA - Universidad Tecnológica de Pereirars",
      role: "Organizador",
      participants: ["JULIO CESAR MURILLO GARCIA", "MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Patrocinadora)"]
    },
    {
      name: "Primer Coloquio de Investigación Educativa 2024 MCE - EGE",
      type: "Otro",
      scope: "Nacional",
      date: "2024-11-15",
      location: "PEREIRA - Universidad Tecnológica de Pereira",
      role: "Ponente magistral",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Patrocinadora)"]
    },
    {
      name: "XIV Coloquio de investigación en formación ciudadana: El cuidado de la vida y la subjetividad política: resistencias y re-existencias en la formación ciudadana de lo contemporáneo",
      type: "Congreso",
      scope: "Nacional",
      date: "2025-09-04 al 2025-09-05",
      location: "PEREIRA - Universidad Tecnológica de Pereira",
      role: "Organizador",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Patrocinadora)"]
    },
    {
      name: "Curso de investigación para Dummies",
      type: "Taller",
      scope: "Nacional",
      date: "2022-10-27",
      location: "PEREIRA - Universidad Tecnológica de Pereira",
      role: "Ponente magistral",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Patrocinadora)"],
      product: "Acercamiento a la investigación"
    },
    {
      name: "XII Coloquio Colombiano de Investigación en Formación Ciudadana",
      type: "Encuentro",
      scope: "Nacional",
      date: "2023-09-07 al 2023-09-08",
      location: "MEDELLÍN - Universidad de Antioquia",
      role: "Ponente magistral",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Patrocinadora)"],
      product: "\"Experiencias alrededor de la verdad: implicaciones en la Formación de Sujetos Políticos\"."
    },
    {
      name: "MICRÓFONO ABIERTO. Espacio de activo de participación en torno a la memoria, la duración del testimonio, el tiempo, la persistencia, el recuerdo y el olvido",
      type: "Encuentro",
      scope: "Nacional",
      date: "2023-10-30 al 2023-10-31",
      location: "PEREIRA - Facultad de Bellas Artes y Humanidades",
      role: "Organizador",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Gestionadora)"]
    },
    {
      name: "V Congreso Virtual Internacional Y XXXVIII Simposio Virtual Internacional En Ciencias Sociales",
      type: "Congreso",
      scope: "Internacional",
      date: "2024-08-28 al 2024-08-30",
      location: "MEDELLÍN - Universidad Pontificia Bolivariana",
      role: "Ponente",
      participants: ["ALVARO DIAZ GOMEZ", "ANA MARIA CALDERON JARAMILLO", "MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["Universidad Pontificia Bolivariana Seccional Medellín (Patrocinadora)"],
      product: "¿Juventud y pandemia: subjetividades femeninas emergentes en tiempos del Covid-19\""
    },
    {
      name: "XIII Coloquio de investigación en formación ciudadana",
      type: "Congreso",
      scope: "Nacional",
      date: "2024-08-22 al 2024-08-23",
      location: "ARMENIA - Universidad del Quindio",
      role: "Ponente magistral",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD DEL QUINDÍO (Patrocinadora)"],
      product: "Formación en Humanidades: Educación, ciudadanía, memoria y paz en el contexto universitario en Colombia"
    },
    {
      name: "VII Encuentro Internacional sobre la Enseñanza de las Ciencias Exactas y Naturales",
      type: "Encuentro",
      scope: "Internacional",
      date: "2023-09-06",
      location: "PEREIRA - Universidad Tecnológica de Pereira",
      role: "Ponente",
      participants: ["LUIS ENRIQUE CASTANEDA GONZALEZ", "MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Patrocinadora)"],
      product: "Enseñanza de la Física Basada en los Factores Antropológicos y el Contexto Social"
    },
    {
      name: "Realidad virtualidad como unidad. Lección inaugural Escuela de Español y Comunicación Audiovisual",
      type: "Encuentro",
      scope: "Nacional",
      date: "2020-02-19",
      location: "PEREIRA - Universidad Tecnológica de Pereira",
      role: "Ponente magistral",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Patrocinadora)"],
      product: "REALIDAD - VIRTUALIDAD COMO UNIDAD"
    },
    {
      name: "Conmemoración del Día Nacional de las Víctimas",
      type: "Encuentro",
      scope: "Nacional",
      date: "2024-04-09",
      location: "PEREIRA - Universidad Tecnológica de Pereira",
      role: "Organizador",
      participants: ["JUAN MANUEL MARTINEZ HERRERA", "JULIO CESAR MURILLO GARCIA", "LUISA FERNANDA MARULANDA GOMEZ", "MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Patrocinadora)"]
    },
    {
      name: "Cuidar el ambiente y cuidar la mujer: fortalecimiento de capacidades organizativas en asociaciones campesinas de Risaralda",
      type: "Taller",
      scope: "Nacional",
      date: "2024-02-03 al 2024-08-24",
      location: "PEREIRA - Universidad Tecnológica de Pereira",
      role: "Organizador",
      participants: ["JULIO CESAR MURILLO GARCIA", "MELISSA MONTANEZ HOLGUIN", "MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Patrocinadora)"]
    },
    {
      name: "XIII Coloquio de investigación en formación ciudadana",
      type: "Congreso",
      scope: "Nacional",
      date: "2024-08-22 al 2024-08-23",
      location: "ARMENIA - Universidad del Quindio",
      role: "Organizador",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD DEL QUINDÍO (Patrocinadora)"]
    },
    {
      name: "XII Coloquio Colombiano de Investigación en Formación Ciudadana",
      type: "Congreso",
      scope: "Nacional",
      date: "2023-09-07 al 2023-09-08",
      location: "MEDELLÍN - Universidad de Antioquía",
      role: "Organizador",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD DE ANTIOQUIA (Patrocinadora)"]
    },
    {
      name: "Conversatorio Archivo, Derechos Humanos y Verdad",
      type: "Encuentro",
      scope: "Nacional",
      date: "2023-05-04",
      location: "PEREIRA - Universidad Tecnológica de Pereira",
      role: "Organizador",
      participants: ["DIANA CAROLINA SUAREZ ALBANO", "JUAN MANUEL MARTINEZ HERRERA", "LUISA FERNANDA MARULANDA GOMEZ", "MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Patrocinadora)"]
    },
    {
      name: "II Encuentro de Grupos de Investigación del Departamento de Humanidades",
      type: "Encuentro",
      scope: "Nacional",
      date: "2022-06-09",
      location: "PEREIRA - Universidad Tecnológica de Pereira",
      role: "Ponente magistral",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Patrocinadora)"],
      product: "¿Avances en las tendencias conceptuales derivadas de la producción académica del grupo de investigación en Estudios políticos y Jurídicos de la Universidad Tecnológica de Pereira entre los años 2013 ¿ 2020¿"
    },
    {
      name: "III Encuentro de Grupos de Investigación del Departamento de Humanidades",
      type: "Encuentro",
      scope: "Nacional",
      date: "2023-03-30",
      location: "PEREIRA - Universidad Tecnológica de Pereira",
      role: "Ponente magistral",
      participants: ["LUISA FERNANDA MARULANDA GOMEZ", "MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Patrocinadora)"],
      product: "Diagnóstico para la conformación de un archivo digital de DDHH en lña ciudad de Pereira - Risaralda - Colombia"
    },
    {
      name: "¿Subjetividad Política en el ámbito de la investigación y la enseñanza de las humanidades. 10 años del grupo de investigación en Estudios Políticos y Jurídicos¿",
      type: "Simposio",
      scope: "Nacional",
      date: "2023-09-29",
      location: "PEREIRA - Universidad Tecnológica de Pereira",
      role: "Organizador",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Patrocinadora)"]
    },
    {
      name: "Segunda Jornada de Apropiación Social del Conocimiento de la Facultad de Ciencias de la Educación",
      type: "Encuentro",
      scope: "Nacional",
      date: "2023-05-10",
      location: "PEREIRA - Universidad Tecnológica de Pereira",
      role: "Ponente",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO", "OLGA LUCIA BEDOYA"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Patrocinadora)"],
      product: "¿Creación de una estrategia audiovisual con base en storytelling para cambiar imaginarios urbanos: caso Pereira imaginada y sus croquis ciudadanos¿"
    },
    {
      name: "La noción de Verdad en la Comisión de la Verdad. Su metodología de trabajo",
      type: "Seminario",
      scope: "Nacional",
      date: "2022-09-30",
      location: "PEREIRA - Universidad Tecnológica de Pereira",
      role: "Organizador",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Gestionadora)"]
    },
    {
      name: "La verdad epistémica",
      type: "Seminario",
      scope: "Nacional",
      date: "2022-10-28",
      location: "PEREIRA - Universidad Tecnológica de Pereira",
      role: "Organizador",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Gestionadora)"]
    },
    {
      name: "Verdad y ficción en la autobiografía prospectiva (como una expresión de la verdad en ciencias sociales).",
      type: "Seminario",
      scope: "Nacional",
      date: "2022-11-11",
      location: "PEREIRA - Universidad Tecnológica de Pereira",
      role: "Organizador",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Gestionadora)"]
    },
    {
      name: "Reconocer la pluralidad de la comprensión del concepto de verdad",
      type: "Seminario",
      scope: "Nacional",
      date: "2022-10-07",
      location: "PEREIRA - Universidad Tecnológica de Pereira",
      role: "Organizador",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Gestionadora)"]
    },
    {
      name: "I Seminario Internacional Y III Seminario Colombiano De Imaginarios Y Representaciones",
      type: "Seminario",
      scope: "Internacional",
      date: "2020-09-21 al 2020-09-25",
      location: "Xapala - Virtual",
      role: "Ponente",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO", "OLGA LUCIA BEDOYA"],
      institutions: ["UNIVERSIDAD SANTO TOMAS (Gestionadora)"],
      product: "\"Pereira Imaginada. Trazos y representaciones desde los croquis afectivos del ciudadano de a pie\""
    },
    {
      name: "II Encuentro Educación con sentidos 2017",
      type: "Encuentro",
      scope: "Internacional",
      date: "2017-09-06 al 2017-09-08",
      location: "Valencia - Universidad de Valencia",
      role: "Asistente",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Patrocinadora)"]
    },
    {
      name: "I Congreso Internacional de Territorios Digitales",
      type: "Congreso",
      scope: "Internacional",
      date: "2017-06-29 al 2017-06-30",
      location: "Granada - Universidad de Granada",
      role: "Ponente",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO", "OLGA LUCIA BEDOYA"],
      institutions: ["UNIVERSIDAD DE GRANADA (Gestionadora)"],
      product: "Por los croquis digitales. Pereira imaginada"
    },
    {
      name: "Congreso Internacional de Ética y Democracia",
      type: "Congreso",
      scope: "Internacional",
      date: "2017-11-06 al 2017-11-08",
      location: "Valencia - Universidad de Valencia - España",
      role: "Ponente",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["Universitat De Valencia (Patrocinadora)"],
      product: "Entre pantallas e interfaces: La democracia en tiempos de prosumers"
    },
    {
      name: "Foro y Encuentro de Comunicación alternativa",
      type: "Encuentro",
      scope: "Nacional",
      date: "2018-04-26",
      location: "PEREIRA - Universidad Tecnológica de Pereira",
      role: "Organizador",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Patrocinadora)"]
    },
    {
      name: "Primer encuentro nacional de investigadores en comunicación",
      type: "Encuentro",
      scope: "Internacional",
      date: "2016-05-26 al 2016-05-27",
      location: "BARRANQUILLA - Universidad del Norte",
      role: "Ponente",
      participants: ["MIGUEL ÁNGEL PUENTES CASTRO", "OLGA LUCIA BEDOYA"],
      institutions: ["UNIVERSIDAD TECNOLÓGICA DE PEREIRA (Patrocinadora)"],
      product: "Pereira imaginada: por los croquis"
    }
  ],
  networks: [
    {
      name: "GT - CLACSO Territorialidades, espiritualidades y cuerpos",
      type: "Real",
      date: "2021-02-26",
      location: "BOGOTÁ, D.C."
    },
    {
      name: "Red Colombiana de Investigadores en Formación Ciudadana",
      type: "Real",
      date: "2023-06-01",
      location: "MEDELLÍN"
    },
    {
      name: "RED COLOMBIANA DE EDUCACIÓN EN DERECHOS HUMANOS (RedColEDH)",
      type: "Real",
      date: "2022-02-01",
      location: "BOGOTÁ, D.C."
    },
    {
      name: "RED IBEROAMERICANA DE INVESTIGACIÓN EN IMAGINARIOS Y REPRESENTACIONES (RIIR)",
      type: "Virtual",
      date: "2023-02-28",
      location: "BOGOTÁ, D.C."
    }
  ],
  socialImpact: [
    {
      title: "Semillero De Investigación Cátedra De Paz",
      date: "2023 - Enero",
      verification: "https://vicerrectorias.utp.edu.co/viie/integrantes/469/semillero",
      license: "Atribución",
      format: "PDF (.pdf)/UA, PDF (.pdf)/A",
      project: "Tendencias Conceptuales Derivadas De La Producción Académica Del Grupo De Investigación En Estudios Políticos Y Jurídicos De La Universidad Tecnológica De Pereira Entre Los Años 2013-2020"
    },
    {
      title: "Subjetividad Política en el ámbito de la investigación y la enseñanza de las humanidades 10 años del grupo de investigación en Estudios Políticos y Jurídicos",
      date: "2023 - Septiembre",
      verification: "https://www.youtube.com/watch?v=xL1FU8U89c0",
      license: "Atribución",
      format: "JPEG (.jpeg, .jpg, .jp2)",
      project: "Tendencias Conceptuales Derivadas De La Producción Académica Del Grupo De Investigación En Estudios Políticos Y Jurídicos De La Universidad Tecnológica De Pereira Entre Los Años 2013-2020"
    }
  ],
  digitalContent: [
    {
      title: "Aqui y ahora como sabiduría de vida",
      date: "2020 - Noviembre",
      location: "PEREIRA-RISARALDA-Colombia",
      link: "https://www.youtube.com/watch?v=0TkSRkmSHRY",
      circulation: "Nacional",
      project: "Creación de una estrategia audiovisual con base en storytelling para cambiar imaginarios urbanos: caso Pereira Imaginada y sus croquis ciudadanos."
    },
    {
      title: "Uno más uno tres",
      date: "2020 - Noviembre",
      location: "PEREIRA-RISARALDA-Colombia",
      link: "https://www.youtube.com/watch?v=quPhUXcJHNQ",
      circulation: "Nacional",
      project: "Creación de una estrategia audiovisual con base en storytelling para cambiar imaginarios urbanos: caso Pereira Imaginada y sus croquis ciudadanos."
    },
    {
      title: "Afecto prohibido",
      date: "2020 - Noviembre",
      location: "PEREIRA-RISARALDA-Colombia",
      link: "https://www.youtube.com/watch?v=QP2bk9dklmI",
      circulation: "Nacional",
      project: "Creación de una estrategia audiovisual con base en storytelling para cambiar imaginarios urbanos: caso Pereira Imaginada y sus croquis ciudadanos."
    },
    {
      title: "Tercera edad",
      date: "2020 - Noviembre",
      location: "PEREIRA-RISARALDA-Colombia",
      link: "https://www.youtube.com/watch?v=LVKbO_5NFp8",
      circulation: "Nacional",
      project: "Creación de una estrategia audiovisual con base en storytelling para cambiar imaginarios urbanos: caso Pereira Imaginada y sus croquis ciudadanos."
    },
    {
      title: "Incomunicación",
      date: "2020 - Noviembre",
      location: "PEREIRA-RISARALDA-Colombia",
      link: "https://www.youtube.com/watch?v=fSQw_dzkqvk",
      circulation: "Nacional",
      project: "Creación de una estrategia audiovisual con base en storytelling para cambiar imaginarios urbanos: caso Pereira Imaginada y sus croquis ciudadanos."
    }
  ],
  articles: [
    {
      title: "Barras bravas como centro de expresión social",
      authors: "MIGUEL ÁNGEL PUENTES CASTRO",
      journal: "Revista de comunicación y cultura Miraton",
      issn: "1667-7469",
      publisher: "Universidad Tecnológica de Pereira",
      details: "v.6 fasc.6 p.3 -",
      year: "2006",
      location: "Colombia"
    }
  ],
  nonScientificArticles: [
    {
      title: "Subjetividades juveniles emergentes desde el acontecimiento pandémico",
      authors: "MIGUEL ÁNGEL PUENTES CASTRO, ALVARO DIAZ GOMEZ, ANA MARIA CALDERON JARAMILLO",
      journal: "Revista De Psicologia",
      issn: "1316-0923",
      year: "2021",
      location: "Venezuela",
      pages: "83 - 97",
      volume: "40",
      keywords: ["Subejtividad", "Sujeto", "Actitud critica"],
      areas: "Humanidades -- Otras Humanidades -- Otras Humanidades"
    }
  ],
  divulgationBooks: [
    {
      title: "Subjetividad política en el ámbito de la investigación y la enseñanza de las humanidades. 10 años del grupo de investigación en Estudios Políticos y Jurídicos",
      year: "2024 - Marzo",
      isbn: "978-958-722-976-9",
      medium: "Papel",
      location: "Colombia",
      publisher: "Editorial Universidad Tecnológica de Pereira",
      areas: "Humanidades -- Otras Humanidades -- Otras Humanidades"
    },
    {
      title: "Subjetividad política en el ámbito de la investigación y la enseñanza de las humanidades. 10 años del grupo de investigación en Estudios Políticos y Jurídicos",
      year: "2025 - Marzo",
      isbn: "978-958-722-976-9",
      medium: "Papel",
      location: "Colombia",
      publisher: "Editorial Universidad Tecnológica de Pereira",
      areas: "Humanidades -- Otras Humanidades -- Otras Humanidades"
    }
  ],
  researchReports: [
    {
      title: "La Recepción Como Proceso: Una Mirada Desde La Relación Entre Consumo Y Producción",
      authors: "MIGUEL ÁNGEL PUENTES CASTRO, OLGA LUCIA BEDOYA, GONZAGA CASTRO ARBOLEDA, YHON JAIRO ACOSTA BARAJAS",
      year: "2015",
      location: "Colombia",
      areas: "Ciencias Sociales -- Ciencias de la Educación -- Educación General"
    },
    {
      title: "¿Enseñanza De La Física Basada En Los Factores Antropológicos Y El Contexto Social?",
      authors: "MIGUEL ÁNGEL PUENTES CASTRO, LUIS ENRIQUE CASTANEDA GONZALEZ",
      year: "2023",
      location: "Colombia",
      areas: "Ciencias Sociales -- Ciencias de la Educación -- Educación General"
    },
    {
      title: "Subjetividades políticas juveniles emergentes desde el acontecimiento pandémico derivado del Covid-19",
      authors: "MIGUEL ÁNGEL PUENTES CASTRO, ALVARO DIAZ GOMEZ, ANA MARIA CALDERON JARAMILLO, MELISSA MONTANEZ HOLGUIN",
      year: "2023",
      location: "Colombia",
      areas: "Ciencias Sociales -- Ciencias de la Educación -- Educación General"
    },
    {
      title: "Identificación De Las Nuevas Construcciones Simbólicas Del Sujeto En La Relación Sugar Daddy / Sugar Baby En La Producción De La Red Social Twitter",
      authors: "MIGUEL ÁNGEL PUENTES CASTRO, JULIAN DAVID NOGOA ARRUBLA",
      year: "2021",
      location: "Colombia",
      areas: "Ciencias Sociales -- Ciencias de la Educación -- Educación General"
    },
    {
      title: "Alfabetización Digital En Adultos Mayores Del Grupo De La Tercera Edad Del Barrio Parque Industrial De Pereira, Desde La Perspectiva Del Aprendizaje Significativo",
      authors: "MIGUEL ÁNGEL PUENTES CASTRO, DIANA CRISTINA OSPINA VALENCIA",
      year: "2015",
      location: "Colombia",
      areas: "Ciencias Sociales -- Ciencias de la Educación -- Educación General"
    },
    {
      title: "Por los croquis digitales de los ciudadanos",
      authors: "MIGUEL ÁNGEL PUENTES CASTRO, JULIAN DAVID VELEZ CARVAJAL, OLGA LUCIA BEDOYA",
      year: "2015",
      location: "Colombia",
      areas: "Ciencias Sociales -- Ciencias de la Educación -- Educación General"
    },
    {
      title: "Realidad Aumentada Como Herramienta Que Potencialice El Aprendizaje Significativo En Geometría Básica Del Grado Tercero De La Institución Educativa Instituto Estrada",
      authors: "MIGUEL ÁNGEL PUENTES CASTRO, JORGE HUMBERTO GOMEZ CARMONA, DANIEL LOPEZ QUINTERO",
      year: "2016",
      location: "Colombia",
      areas: "Ciencias Sociales -- Ciencias de la Educación -- Educación General"
    },
    {
      title: "Tendencias Conceptuales Derivadas De La Producción Académica Del Grupo De Investigación En Estudios Políticos Y Jurídicos De La Universidad Tecnológica De Pereira Entre Los Años 2013-2020",
      authors: "MIGUEL ÁNGEL PUENTES CASTRO",
      year: "2021",
      location: "Colombia",
      areas: "Ciencias Sociales -- Ciencias de la Educación -- Educación General"
    },
    {
      title: "Polisemia Y La Pobreza Léxica Como Obstáculos En La Enseñanza Del Concepto Medir Y Su Tratamiento Estadístico",
      authors: "MIGUEL ÁNGEL PUENTES CASTRO, REYES VILLARREAL MIRANDA",
      year: "2023",
      location: "Colombia",
      areas: "Ciencias Sociales -- Ciencias de la Educación -- Educación General"
    },
    {
      title: "La \"Actitud Crítica\" En El Proceso De Alfabetización Mediática Desarrollada En La Área De Informática En Estudiantes De Grado 11",
      authors: "MIGUEL ÁNGEL PUENTES CASTRO, STEFANNY CASTILLO JARAMILLO, PAULA GARCIA HERRERA, DANIELA MACHADO MAYA",
      year: "2016",
      location: "Colombia",
      areas: "Ciencias Sociales -- Ciencias de la Educación -- Educación General"
    },
    {
      title: "Rugby Como Metodología De Aprendizaje En La Historia De Vida De Las Integrantes Del Equipo Femenino Rhinos Femme",
      authors: "MIGUEL ÁNGEL PUENTES CASTRO, YULIANA ZULUAGA VANEGAS",
      year: "2020",
      location: "Colombia",
      areas: "Ciencias Sociales -- Ciencias de la Educación -- Educación General"
    },
    {
      title: "Entre Álbumes De Familia: Construcción De Memoria En La Mujer Pereirana",
      authors: "MIGUEL ÁNGEL PUENTES CASTRO",
      year: "2016",
      location: "Colombia",
      areas: "Ciencias Sociales -- Ciencias de la Educación -- Educación General"
    },
    {
      title: "La radio escolar como estrategia educomunicativa en la comunidad Instituto Tecnologico Santa Rosa de Cabal",
      authors: "MIGUEL ÁNGEL PUENTES CASTRO, YURY JULIANA VELASQUEZ ALARCON, JHONATAN ESTIVEN CORREA LONDONO",
      year: "2019",
      location: "Colombia",
      areas: "Ciencias Sociales -- Ciencias de la Educación -- Educación General"
    },
    {
      title: "Fomento A La Lectura Y La Escritura Por Medio De La Creación Artística Del Libro Álbum En La Biblioteca Comunitaria Andrés Caicedo",
      authors: "MIGUEL ÁNGEL PUENTES CASTRO, MARIANA PATINO ARISMENDI",
      year: "2020",
      location: "Colombia",
      areas: "Ciencias Sociales -- Ciencias de la Educación -- Educación General"
    },
    {
      title: "Géneros discursivos en el ámbito académico en la Licenciatura en comunicación e informática Educativa",
      authors: "MIGUEL ÁNGEL PUENTES CASTRO, JESSICA JAZMIN AGUIRRE GUARIN",
      year: "2019",
      location: "Colombia",
      areas: "Ciencias Sociales -- Ciencias de la Educación -- Educación General"
    },
    {
      title: "Validación De Practicas Educativas Emergentes Mediadas Por Tic Para Potenciar Habilidades Del Pensamiento",
      authors: "MIGUEL ÁNGEL PUENTES CASTRO, LUZ ÁNGELA CARDONA ARCE, OLGA LUCIA BEDOYA, JHON ESTIWAR GOMEZ PALACIO",
      year: "2020",
      location: "Colombia",
      areas: "Ciencias Sociales -- Ciencias de la Educación -- Educación General"
    },
    {
      title: "Los Emojis, El Lenguaje Emergente De La Cibercultura",
      authors: "MIGUEL ÁNGEL PUENTES CASTRO, JUAN FELIPE LOPEZ TAFUR, NATALIA PATINO OSORIO",
      year: "2021",
      location: "Colombia",
      areas: "Ciencias Sociales -- Ciencias de la Educación -- Educación General"
    },
    {
      title: "Creación de una estrategia audiovisual con base en storytelling para cambiar imaginarios urbanos: caso Pereira Imaginada y sus croquis ciudadanos",
      authors: "MIGUEL ÁNGEL PUENTES CASTRO, OLGA LUCIA BEDOYA, RAUL ALBERTO HENAO VELEZ",
      year: "2020",
      location: "Colombia",
      areas: "Ciencias Sociales -- Ciencias de la Educación -- Educación General"
    },
    {
      title: "Sistematización De Emprendimientos En Los Licenciados En Comunicación E Informática Educativa",
      authors: "MIGUEL ÁNGEL PUENTES CASTRO",
      year: "2020",
      location: "Colombia",
      areas: "Ciencias Sociales -- Ciencias de la Educación -- Educación General"
    },
    {
      title: "¿El uso de la Tecnología en el proceso de enseñanza - aprendizaje de la física en las áreas rurales, como estrategias aplicables en los colegios públicos del Distrito de los Pozos - Herrera en la República de Panamá?",
      authors: "MIGUEL ÁNGEL PUENTES CASTRO, LOURDES VIRGINIA GONZALEZ",
      year: "2024",
      location: "Colombia",
      areas: "Ciencias Sociales -- Ciencias de la Educación -- Educación General"
    },
    {
      title: "Estrategias de comunicación de la emisora Universitaria Estéreo para fomentar la integración con la comunidad de la Universidad Tecnológica de Pereira",
      authors: "MIGUEL ÁNGEL PUENTES CASTRO, GERALDINE HURTADO GARCIA",
      year: "2020",
      location: "Colombia",
      areas: "Ciencias Sociales -- Ciencias de la Educación -- Educación General"
    },
    {
      title: "Habilidades Del Pensamiento Que Se Potencian En Las Prácticas Educativas Emergentes Mediadas Por Tic: Muestra Seleccionada En Las Ciudades De Pereira Y Montería",
      authors: "MIGUEL ÁNGEL PUENTES CASTRO, LUZ ÁNGELA CARDONA ARCE, OLGA LUCIA BEDOYA, JULIAN DAVID VELEZ CARVAJAL, JHON ESTIWAR GOMEZ PALACIO, NANCY EUGENIA CARDENAS RAMIREZ",
      year: "2021",
      location: "Colombia",
      areas: "Ciencias Sociales -- Ciencias de la Educación -- Educación General"
    },
    {
      title: "Informe final proyecto - Tendencias conceptuales derivadas de la produccion academica del grupo de investigación en Estudios políticos y Jurídicos de la Universidad Tecnológica de Pereira entre los años 2013 -2020",
      authors: "MIGUEL ÁNGEL PUENTES CASTRO, ALVARO DIAZ GOMEZ, ANA MARIA CALDERON JARAMILLO",
      year: "2022",
      location: "Colombia",
      areas: "Ciencias Sociales -- Ciencias de la Educación -- Educación General"
    },
    {
      title: "Informe final proyecto - Creación de una estrategia audiovisual con base en storytelling para cambiar imaginarios urbanos: caso Pereira Imaginada y sus croquis ciudadanos",
      authors: "MIGUEL ÁNGEL PUENTES CASTRO, OLGA LUCIA BEDOYA, RAUL ALBERTO HENAO VELEZ",
      year: "2022",
      location: "Colombia",
      areas: "Ciencias Sociales -- Ciencias de la Educación -- Educación General"
    },
    {
      title: "El Kambalachi (Trueque), Como Propuesta Pedagogica Para La Resignificacion Del Pensamiento En El Pueblo Inga De Aponte",
      authors: "MIGUEL ÁNGEL PUENTES CASTRO, MARTHA YANETH JOJOA MAVISOY",
      year: "2019",
      location: "Colombia",
      areas: "Ciencias Sociales -- Ciencias de la Educación -- Educación General"
    },
    {
      title: "Diseño De Una Propuesta Didáctica Para La Implementación De La Fotografía En El Aula De Clase En La Asignatura De Educación Artística En Estudiantes De 4° De Primaria De La Institución Educativa Santa Sofía En El Municipio De Dosquebradas",
      authors: "MIGUEL ÁNGEL PUENTES CASTRO, ALEJANDRO MESA MEJIA",
      year: "2018",
      location: "Colombia",
      areas: "Ciencias Sociales -- Ciencias de la Educación -- Educación General"
    },
    {
      title: "Pereira, Una Mirada Desde El Residuo: Entre La Evanescencia Y La Emergencia",
      authors: "MIGUEL ÁNGEL PUENTES CASTRO, OLGA LUCIA BEDOYA, JULIAN DAVID VELEZ CARVAJAL",
      year: "2014",
      location: "Colombia",
      areas: "Ciencias Sociales -- Ciencias de la Educación -- Educación General"
    },
    {
      title: "Informe final tesis doctoral - HomoSinekus: Realidad / Virtualidad como unidad del signo epistemológico y sus implicaciones en lo educativo",
      authors: "MIGUEL ÁNGEL PUENTES CASTRO",
      year: "2020",
      location: "Colombia",
      areas: "Ciencias Sociales -- Ciencias de la Educación -- Educación General"
    },
    {
      title: "Candidatura doctoral. Proyecto Sinequismo Peirceano Realidad Virtualidad como unidad",
      authors: "MIGUEL ÁNGEL PUENTES CASTRO",
      year: "2018",
      location: "Colombia",
      areas: "Ciencias Sociales -- Ciencias de la Educación -- Educación General"
    },
    {
      title: "EL USO DE LA TECNOLOGÍA EN EL PROCESO DE ENSEÑANZA - APRENDIZAJE DE LA FÍSICA EN LAS ÁREAS RURALES, COMO ESTRATEGIAS APLICABLES EN LOS COLEGIOS PÚBLICOS DEL DISTRITO DE LOS POZOS - HERRERA EN LA REPÚBLICA DE PANAMÁ",
      authors: "MIGUEL ÁNGEL PUENTES CASTRO",
      year: "2024",
      location: "Colombia",
      areas: "Ciencias Sociales -- Ciencias de la Educación -- Educación General"
    }
  ],
  artisticWorks: [
    {
      title: "Croquis digitales: Urbanismos ciudadanos en Pereira",
      discipline: "Humanidades -- Arte -- Diseño",
      date: "Febrero de 2016",
      validations: [
        {
          event: "Feria Universitaria del Libro - Red bibliotecas REUNIR",
          date: "2017-08-16",
          institution: "UNIVERSIDAD TECNOLÓGICA DE PEREIRA"
        }
      ]
    }
  ],
  projects: [
    {
      type: "Investigación y desarrollo",
      title: "La \"Actitud Crítica\" En El Proceso De Alfabetización Mediática Desarrollada En La Área De Informática En Estudiantes De Grado 11",
      start: "Agosto 2016",
      end: "Diciembre 2016",
      summary: "El presente trabajo de investigación, busca determinar si se promueve la \"actitud crítica\" en el proceso de alfabetización mediática, en el marco de la asignatura de Informática, en estudiantes de undécimo grado de la institución educativa Cristo Rey, del municipio de Dosquebradas, Risaralda. El problema a investigar surge en el contexto actual, donde las tecnologías de la información y la comunicación (TIC) se encuentran presentes en todos los aspectos de la sociedad actual, por lo cual la educación se ha visto en la necesidad de transformar sus prácticas educativas y la forma en que interactúan y aprenden sus integrantes dentro y fuera de la escuela. De esta manera la alfabetización mediática debe ser consecuente con las necesidades de una sociedad altamente expuesta a los medios, que debe buscar una interacción crítica con los mismos, permitiéndole generar una construcción de conocimientos a través de la resignificación de sentidos en la formación del sujeto en distintos escenarios a nivel individual y colectivo."
    },
    {
      type: "Extensión y responsabilidad social CTI",
      title: "Subjetividad Política en el ámbito de la investigación y la enseñanza de las humanidades. 10 años del grupo de investigación en Estudios Políticos y Jurídicos",
      start: "Febrero 2023",
      end: "Noviembre 2023",
      summary: "Propiciar un espacio de diálogo que promueva la reflexión sobre la subjetividad política en el ámbito de la investigación y la enseñanza de las humanidades."
    },
    {
      type: "Investigación y desarrollo",
      title: "La radio escolar como estrategia educomunicativa en la comunidad Instituto Tecnológico Santa Rosa de Cabal",
      start: "Septiembre 2019",
      end: "Diciembre 2019",
      summary: "Esta investigación es de tipo cualitativo y exploratorio; la cual propone como objetivo, una estrategia educomunicativa que permita el fortalecimiento de la comunicación para la solución de conflictos, entre los estudiantes y docentes de la comunidad educativa Instituto Tecnológico Santa Rosa de Cabal. Abordando las problemáticas mediante un enfoque pedagógico constructivista, desde la teoría del aprendizaje colaborativo y mediado por la radio, como tecnología de la comunicación en un ambiente de aprendizaje presencial. Se realizarán 6 secciones con estudiantes y docente encargado del grado noveno, donde se abordarán las problemáticas encontradas en la institución, además temas básicos sobre la radio y guión técnico. Al finalizar se realizará por subgrupos capsulas radiales, para ser transmitidas en la emisora del plantel, logrando un acercamiento y sensibilización referente a estos conflictos escolares, generando una reflexión final."
    },
    {
      type: "Investigación y desarrollo",
      title: "Rugby Como Metodología De Aprendizaje En La Historia De Vida De Las Integrantes Del Equipo Femenino Rhinos Femme",
      start: "Agosto 2020",
      end: "Diciembre 2020",
      summary: "El presente trabajo de grado es una investigación de tipo cualitativo, que tiene como objetivo principal comprender al Rugby como metodología de aprendizaje en la historia de vida de las integrantes del equipo femenino Rhinos Femme. En cuanto al marco teórico se utilizaron cuatro categorías principales que son: socio constructivismo, aprendizaje colaborativo, convivencia y teoría critica; esta metodología de investigación consta de tres fases las cuales son; identificar, analizar y determinar. Por otro lado, los métodos de recolección de información se realizaron a través de entrevistas y encuestas, las cuales se aplicaron entre jugadoras del equipo, entrenadores y personal pertenecientes al grupo de referato, con lo que se concluye que el rugby es un deporte inclusivo puesto que permite que todo tipo de personas sin importar sus características físicas o limitaciones motrices lo pueden practicar, además se debe resaltar que es un deporte que fomenta valores como: el compañerismo, respeto, solidaridad, pasión, disciplina, entre otros y que ha aportado de manera positiva a la transformación de quienes lo practican; para finalizar, esta investigación nos permite evidenciar que el rugby es una herramienta que puede ser utilizada para la formación del ser para la sociedad y de igual modo puede ser usado para cambiar la rutina cotidiana, ayudando a la eliminación del sedentarismo."
    },
    {
      type: "Investigación y desarrollo",
      title: "Diseño De Una Propuesta Didáctica Para La Implementación De La Fotografía En El Aula De Clase En La Asignatura De Educación Artística En Estudiantes De 4° De Primaria De La Institución Educativa Santa Sofía En El Municipio De Dosquebradas",
      start: "Agosto 2018",
      end: "Diciembre 2018",
      summary: "La presente propuesta de investigación, parte de un interés por la relación que trae consigo la fotografía como un elemento dinamizador de los procesos educativos y las nuevas prácticas pedagógicas que encuentran en las TIC un nuevo paradigma para fortalecer los procesos de Enseñanza – Aprendizaje. Para nadie es un secreto que en el siglo XXI, muchos de los procesos educativos están mediados por el uso de tecnologías que dinamizan la actividad humana, ya que afianza los procesos comunicativos y posibilita nuevos aprendizajes dentro y fuera del aula; en algunos casos la escuela y los docentes han encontrado en esta un medio para enriquecer las actividades del día a día. Ahora bien, la mayoría de los investigadores de estas nuevas pedagogías, encuentran que la innovación y la creatividad son elementos que deben ir de la mano del proceso educativo, por ello, el valor del aprendizaje se centra en la emoción, y es tarea tanto del docente como del estudiante, hacer que los contenidos se conviertan en el pretexto (oportunidad) para explorar nuevas ideas. La experiencia de aprendizaje de los seres humanos se centra en la capacidad que tiene los sentidos de sentirse estimulados, esto atrapa y dinamiza el foco de interés, es así como se debe dar importancia a dichos procesos y es allí donde la imagen y la fotografía juegan un lugar central en este trabajo ya que la vista se convierte en el enlace del proceso de comprensión y aprendizaje de los fenómenos que construyen la realidad."
    },
    {
      type: "Investigación y desarrollo",
      title: "Fomento A La Lectura Y La Escritura Por Medio De La Creación Artística Del Libro Álbum En La Biblioteca Comunitaria Andrés Caicedo",
      start: "Agosto 2020",
      end: "Diciembre 2020",
      summary: "Desde tiempos remotos las expresiones comunicativas de la humanidad han sido reflejadas en la imagen como un lenguaje contundente reconocido con un valor universal, el cual ha llevado al hombre a pensar en diferentes formas y medios para contar, permitiendo que las narrativas a través de los años se transformen y se configuren hacia la variación de interpretaciones en cada individuo, es por ello qué, dentro de dicha evolución se toma en cuenta al libro álbum como una pieza clave que tiene dentro de complejidad semántica un estímulo a realizar lecturas profundas del mundo. Atendiendo a lo anterior, la presente investigación familiariza la Enseñanza-Aprendizaje con las experiencias de los niños y jóvenes por medio de la educación no formal, implementada en el sector de Frailes Dosquebradas, ejerciendo una motivación hacia procesos de creación artísticas relacionadas al libro álbum, como una manera de fomentar la lectura y la escritura de los niños y jóvenes de la comunidad. Lo cual llevó a la realización de una serie de talleres en la Biblioteca Comunitaria Andrés Caicedo en los cuales se desarrolló metodológicamente la creación de cuatro libros álbum, resultado de las experiencias de las lecturas internas de cada autor. Todo un acto de transgresión."
    },
    {
      type: "Investigación y desarrollo",
      title: "El Kambalachi (Trueque), Como Propuesta Pedagógica Para La Resignificación Del Pensamiento En El Pueblo Inga De Aponte",
      start: "Septiembre 2019",
      end: "Diciembre 2019",
      summary: "El proyecto se presenta con el objetivo de plantear una propuesta de resignificación del pensamiento y apropie desde el campo educativo el Kambalachi como saber y práctica ancestral para el Pueblo Inga de Aponte. Se hallará en el desarrollo de este documento con una problemática, que plantea un proceso de pérdida paulatina de prácticas y cosmovisiones de los Pueblos Indígenas, concretamente del Pueblo Inga, más adelante, desde diferentes artículos, investigaciones, y capítulos de libro, se da inicio al marco referencial con el estado del arte, y marco teórico que recopilan los datos e información pertinente del contexto, conceptos y filosofía de la liberación, desde autores principales como Enrique Dussel y Quijano; la descolonización del saber que permite un llamado a la interculturalidad y dar la resignificación del Kambalachi (trueque) desde la educación informal y formal. Seguidamente el marco metodológico con el que se diseña la investigación desde la etnografía y fenomenología, los instrumentos para la obtención de datos, y las fases en las que se implementaran, para finalmente llegar a los hallazgos planteados al final de este trabajo."
    },
    {
      type: "Investigación y desarrollo",
      title: "Realidad Aumentada Como Herramienta Que Potencialice El Aprendizaje Significativo En Geometría Básica Del Grado Tercero De La Institución Educativa Instituto Estrada",
      start: "Febrero 2015",
      end: "Julio 2015",
      summary: "Esta investigación busca indagar el impacto de las TIC en los procesos de formación pedagógica y cómo la Realidad Aumentada (AR) se articula como una herramienta en el proceso de enseñanza, en busca de un aprendizaje significativo en la clase de geometría básica del tercer grado de prima de la Institución Educativa Instituto Estrada del municipio de Marsella, Risaralda. En este sentido, la investigación se basa en fundamentos teóricos cognitivistas y tiene la intención de promover el pensamiento y la inteligencia espacial a través de la interacción del estudiante con el contenido y la Realidad Aumentada, cómo esto contribuye a un aprendizaje significativo como acción interactiva y autónoma dentro del aula. Esta propuesta busca a través de 3 fases identificar el impacto del uso de las TIC en los procesos de formación en el aula, por lo que se pensaba, en la primera fase identificar el conocimiento previo de los estudiantes en relación a la geometría, como elementos de su estructura cognitiva, lo que conduce a una segunda etapa buscando establecer estrategias potencialmente significativas, mediadas por el desarrollo e implementación de una aplicación de Realidad Aumentada; y en una tercera etapa evaluar los posibles cambios en sus estructuras de aprendizaje"
    },
    {
      type: "Investigación y desarrollo",
      title: "Géneros discursivos en el ámbito académico en la Licenciatura en comunicación e informática Educativa",
      start: "Septiembre 2019",
      end: "Diciembre 2019",
      summary: "El objetivo del presente proyecto fue realizar un estudio de corte cualitativo para identificar qué tan posible es que los géneros discursivos dinamizan los procesos de Enseñanza-Aprendizaje manejados por un docente de la Universidad Tecnológica de Pereira en la Licenciatura Comunicación e Informática Educativa en su praxis académica. Cuando se habla de géneros desde Bajtín (1998), es alfabetizar a las personas por medio de su entorno apoyados en el discurso, esto es, de cierta manera construir géneros discursivos, porque la comunicación transversaliza toda esfera de la práctica social. La Enseñanza-Aprendizaje manejada desde Dewey (1916), entabla una educación experiencial, es decir, reformar la sociedad. Por consiguiente, se procedió a realizar una investigación que muestra cómo los docentes apropiados de su praxis discursiva dinamizan el aprendizaje en el aula."
    },
    {
      type: "Investigación y desarrollo",
      title: "Validación De Practicas Educativas Emergentes Mediadas Por Tic Para Potenciar Habilidades Del Pensamiento",
      start: "Febrero 2020",
      end: "Febrero 2022",
      summary: "El proyecto presenta elementos teóricos y metodológicos, presentes en los diversos escenarios de formación, donde participan los estudiantes de la Universidad Tecnológica de Pereira, a partir de la observación y análisis de las prácticas educativas que vinculan procesos de mediación tecnológica y que además favorecen habilidades del pensamiento en los estudiantes para la gestión de sus actividades cotidianas en los diversos entornos cargados de información y tecnología, a los cuales pertenece.Es así como el proyecto, tiene como propósito fundamental potenciar habilidades del pensamiento en los estudiantes a partir de la implementación de prácticas educativas mediadas por TIC para la generación de conocimientos significativos, para el alcance del mismo plantea en la ruta metodológica de la investigación tres propósitos, caracterizar las prácticas educativas emergentes en procesos de mediación tecnológica que potencian habilidades del pensamiento; implementar la estrategia de pensamiento en RED en los estudiantes de la universidad a partir de la validación de prácticas educativas mediadas por TIC; y diseñar una propuesta de formación para la validación y consolidación de prácticas emergentes que potencian habilidades del pensamiento para la era digital."
    },
    {
      type: "Investigación y desarrollo",
      title: "Habilidades Del Pensamiento Que Se Potencian En Las Prácticas Educativas Emergentes Mediadas Por Tic: Muestra Seleccionada En Las Ciudades De Pereira Y Montería",
      start: "Febrero 2021",
      end: "Febrero 2023",
      summary: "El proyecto “Habilidades del pensamiento que se potencian en las prácticas educativas emergentes mediadas por TIC: Muestra seleccionada en la ciudad de Pereira”, tiene como propósito comprender habilidades del pensamiento que se encuentran presentes en las prácticas educativas mediadas por tecnologías de la información y la comunicación y que emergen en el contexto actual de confinamiento. De esta forma, se plantea una ruta teórica que pretende llevar a cabo 4 fases fundamentales; caracterizar las prácticas educativas emergentes en los procesos de mediación tecnológica; estudiar dichas prácticas educativas; distinguir las habilidades del pensamiento que se potencian en la implementación de estas prácticas educativas y finalmente; relacionar las habilidades del pensamiento con las prácticas educativas emergentes mediadas por TIC."
    },
    {
      type: "Investigación y desarrollo",
      title: "La Recepción Como Proceso: Una Mirada Desde La Relación Entre Consumo Y Producción",
      start: "Mayo 2015",
      end: "Mayo 2017",
      summary: "En el marco de una sociedad que se caracteriza por los procesos de convergencia tecnológica y por la articulación de las pantallas a diversas esferas de la vida social, entre ellas la educación, este proyecto de investigación se plantea la siguiente pregunta: ¿ Es posible distinguir relaciones de continuidad / discontinuidad entre consumo y producción en el proceso de recepción de contenidos televisivos por parte de los estudiantes de la Licenciatura en Comunicación e Informática Educativas de la Universidad Tecnológica de Pereira? La teoría de las televidencias y las múltiples mediaciones planteada por el mexicano Guillermo Orozco se constituye en un referente pertinente para dar cuenta del fenómeno en cuestión. Para responder a la anterior pregunta de investigación, se trazaron los siguientes objetivos, general: distinguir relaciones de continuidad y discontinuidad entre consumo y producción en el proceso de recepción de contenidos televisivos por parte de los estudiantes de la Licenciatura en Comunicación e Informática Educativas de la Universidad Tecnológica de Pereira. Específicos: i) Identificar rutinas de gusto, no gusto, usos y expectativas televisivas en los estudiantes de la Licenciatura en Comunicación e Informática Educativas de la Universidad Tecnológica de Pereira; ii) Describir los contratos de videncia y las comunidades de apropiación de los estudiantes de la Licenciatura en Comunicación e Informática Educativa; y iii) Identificar índices de consumo y producción en las rutinas, contratos de videncia y comunidades de apropiación en el marco del proceso de recepción de los estudiantes de la Licenciatura en Comunicación e Informática Educativas de la Universidad Tecnológica de Pereira. Apostando por la consecución de los objetivos, se realizó un diseño metodológico de tipo cualitativo consistente en tres fases: a) distinción de las características del proceso de recepción; b) establecimiento de semejanzas y diferencias en el mencionado proceso, c) distinción de continuidades y discontinuidades en el proceso de recepción realizado por la población seleccionada. Se espera con este proyecto comprender la complejidad de un fenómeno contemporáneo como es el de la relación entre consumo y producción en el proceso de esta recepción, con el propósito de aportar a la discusión sobre la relación entre pantallas y educación. La realización del proyecto permitió evidenciar que los estudiantes de la Licenciatura en Comunicación e Informática Educativas, presentan mediaciones de diversa índole al momento de la selección y recepción de los contenidos televisivos. Igualmente, se evidencia cierta inclinación hacia la producción de contenidos; sin embargo, a pesar de contar con las condiciones tecnológicas para ello; se requiere formación en cuanto a lo conceptual."
    },
    {
      type: "Investigación y desarrollo",
      title: "Pereira, Una Mirada Desde El Residuo: Entre La Evanescencia Y La Emergencia",
      start: "Enero 2014",
      end: "Enero 2016",
      summary: "La temática que se abordó en este proyecto de investigación, implicó un enfoque que privilegió aquella tendencia investigativa que caracteriza y construye teoría acerca de los cambios propios de la cultura urbana contemporánea. En tal sentido, se propuso la siguiente pregunta de investigación: A partir de los datos-residuos arrojados por la investigación Pereira Imaginada 2009 - 2014 ¿Podríamos Reconstruir una visión global de la ciudad de Pereira y las prácticas ciudadanas con la visión complementaria de Imaginarios colectivos y datos-residuos? El marco teórico - metodológico que se utilizó, se desarrolla desde las categorías conceptuales de la propuesta del investigador colombiano Armando Silva, del sociólogo alemán Niklas Luhmann y de la metodología relacional creada por el grupo proponente de este proyecto, que aborda las ciudades desde el punto de vista de los imaginarios presentes en las subjetividades de los ciudadanos. A continuación se refieren algunos del os principales resultados de la investigación: Al observar las tablas y gráficas de los dos ejemplos (donde al inicio -momento cero (0)-, simultáneamente Calidad de Vida (regular) representa un imaginario y Calidad de Vida (mala) representa un residuo), se puede proyectar un posible comportamiento tanto creciente (graficado en azul) como decreciente (graficado en rojo) para las dos situaciones. (Ver figuras 33, 34, 35,36 y 37 del libro resultado de la investigación). Así las cosas, podría observarse lo siguiente: - Situación donde Calidad de Vida mala representa un residuo: pues en un momento cero (0) cuenta con una percepción social del 1,9%. Pero al continuar su manejo proyectivo creciente puede convertirse en un imaginario, pues para el momento 15 correspondería al 12,26%. - Situación donde Calidad de Vida mala representa un residuo: pues en un momento cero (0) cuenta con una percepción social del 1,9%. Pero al continuar su manejo proyectivo decreciente continúa siendo residuo, pues para el momento 15 continuaría con un descenso hasta llegar a 0,83%. - Situación donde Calidad de Vida regular representa un imaginario: pues en un momento cero (0) cuenta con una percepción social del 48,1%. Al continuar su manejo proyectivo creciente la situación se consolida como imaginario, pues para el momento 13 crecería hasta el 99,98%. - Situación donde Calidad de Vida regular representa un imaginario: pues en un momento cero (0) cuenta con una percepción social del 48,1%. Pero al continuar su manejo proyectivo decreciente pasa a ser residuo, pues para el momento 5 presentaría un descenso hasta el 9,56%. Para las percepciones extractadas en 2009 sobre Calidad de Vida muy mala (1,9%) y regular (48,1%), es necesario realizar nuevas observaciones para corroborar el comportamiento y tendencia de dichas percepciones. Luego sería necesario ajustarlas a las tablas y/o gráficas prefiguradas para deducir la formulación a la que se ajusta con mayor precisión. Al observar la Tabla 1 (de comportamiento creciente) , se observa que cuando el residuo es <3%, requiere de más de 9 momentos para convertirse en imaginario (alcanzar un valor >10%); que cuando el residuo fluctúa entre 3% y 7%, necesita entre 2 y 7 momentos; y que cuando el residuo equivale a más del 7%, tan sólo toma 2 momentos para transformarse en imaginario. Luego, al examinar la Tabla 2 (de comportamiento decreciente), se puede observar que cuando el imaginario es <20%, se requieren alrededor de 2 momentos para convertirse en residuo (r <10%); que cuando el imaginario fluctúa entre el 20% y 70%, se necesitan entre 2 y 6 momentos; y que cuando el imaginario equivale a más del 70%, toma más de 6 momentos para transformarse en residuo."
    },
    {
      type: "Investigación y desarrollo",
      title: "Los Emojis, El Lenguaje Emergente De La Cibercultura",
      start: "Marzo 2021",
      end: "Junio 2021",
      summary: "En el presente proyecto de investigación se ahondó sobre la problemática de si ¿Son los emojis el lenguaje emergente que permite comprender la cibercultura? O son simplemente signos que han sido dotados de significados convencionales. Desde la perspectiva semiótica de Charles Sanders Peirce, se investigaron las posibilidades comunicativas que tienen los emojis en el seno de la cibercultura como un elemento aditivo del lenguaje, por lo cual se llevó a cabo un método de observación no participante en la red social Instagram y con ello poder determinar si los usuarios seguidores de la página @Ultimahoracol, hacen uso de los emojis expresamente para reducir su léxico en términos de lenguaje escrito o si los usan como aditivo emocional en el lenguaje tradicional; teniendo en cuenta los resultados obtenidos mediante las bases investigativas que plantea Olga Lucía Bedoya en la Metodología Relacional y las características encontradas dentro de los emojis como signos, se exploró la posibilidad de comenzar a contemplar los emojis como el lenguaje emergente de la cibercultura o uno de tantos que pueden subsistir en dicho ambiente y con ello, tener una mejor comprensión de la cibercultura, entendiendo las implicaciones del lenguaje dentro de la misma, desde distintas perspectivas teóricas, tales como la antropología, la filosofía, la lingüística y la semiótica."
    },
    {
      type: "Extensión y responsabilidad social CTI",
      title: "Cuidar el ambiente y cuidar la mujer: fortalecimiento de capacidades organizativas en asociaciones campesinas de Risaralda",
      start: "Enero 2024",
      end: "Actualidad",
      summary: "El proyecto de extensión que se propone a continuación partió de la concepción de dos grandes líneas de trabajo: la dimensión ambiental del cuidado y la dimensión diferencial del cuidado, específicamente, del cuidado de la mujer. Se propone a través de éste, un mecanismo de formación que aporte, desde los acumulados del grupo de investigación en estudios políticos y jurídicos, al, fortalecimiento de la subjetividad política en hombres y mujeres vinculados a contextos rurales de asociatividad y de reclamación por la tierra. El principal antecedente para la formulación del proyecto se relaciona, con, la investigación sobre el sujeto contrahegemónico del sindicalismo docente en el departamento de Risaralda, proyecto recién finalizado, que dejo aperturas sobre la contrahegemonía en el contexto local que es analizado allí. Puntualmente, la propuesta de extensión que se presenta, trazó un objetivo, ¿fortalecer capacidades organizativas desde los enfoques del cuidado ambiental y del género al interior de cinco asociaciones campesinas de Risaralda, a partir de la construcción de instrumentos de gobernanza territorial desarrollados desde la metodología del taller¿; como deriva de la lectura al objetivo, lo que se propone es una cohesión de conceptos que teóricamente han sido abordados por el grupo: el sujeto político, la contrahegemonía, la subalternidad, las practicas articulatorias; con, conceptos que vienen emergiendo a su interior: la concepción del cuidado, la gobernanza territorial, y las, dimensiones ambiental y del género de la acción política. Metodológicamente, se diseña y propone, el taller, por su naturaleza flexible, teórico- practica, dialógica, experiencial. Lo que se busca es la constitución de instrumentos de gobernanza, que sean planteados de forma colectiva, donde el tallerista se convierta en orientador de procesos, y donde, la dinámica de esos procesos sea asumida por los mismos participantes de este, que son quienes ponen en contexto cualquier tipo de instrumento que se quiera consolidar."
    },
    {
      type: "Investigación y desarrollo",
      title: "Caracterización Del Material Documental Para La Conformación De Un Archivo De Derechos Humanos, Memoria Histórica Y Conflicto Armado De La Ciudad De Pereira (Risaralda).",
      start: "Enero 2024",
      end: "Actualidad",
      summary: "En el marco del proceso transicional por el que atraviesa Colombia, la protección, conservación y acceso a información relacionada con Derechos Humanos, Memoria Histórica y Conflicto Armado ha cobrado importancia. A nivel nacional y regional se han creado archivos de Derechos Humanos dedicados a resguardar este tipo de información. Sin embargo, la ciudad de Pereira carece de iniciativas que articulen el material documental que poseen tanto instituciones oficiales y no oficiales como organizaciones de la sociedad civil y personas de manera individual. De igual modo, hace falta un trabajo preliminar que permita conocer quién tiene este tipo de material y cuáles son sus características específicas, así como estudios que problematicen la labor misma de documentación y protección de estas fuentes de información. Es por esta razón que la investigación tiene como objetivo caracterizar el material documental existente en y sobre la ciudad de Pereira en materia de Derechos Humanos, Memoria Histórica y Conflicto Armado. La investigación propuesta corresponde a la fase preliminar necesaria para la conformación de un archivo de Derechos Humanos, Memoria Histórica y Conflicto Armado de la ciudad de Pereira. Esta fase implica la identificación de los actores, bien sean instituciones oficiales y no oficiales, organizaciones, familias o personas que resguardan material documental (tenedores) de interés para el objetivo propuesto, así como la caracterización de este material. En esta vía, se aborda la categoría de archivo como un dispositivo para la construcción de memoria histórica en los contextos transicionales, así como las consideraciones conceptuales pertinentes para la realizaciones de procesos de caracterización de material documental para la conformación de archivos, según las recomendaciones del Centro Nacional de Memoria Histórica. La metodología propuesta es de corte cualitativa y se circunscribe, predominante, a la investigación de tipo documental. El proceso está concebido en tres fases: una, identificación de tenedores y material documental; dos, caracterización de dicho material; y, tres, análisis de lo encontrado en perspectiva de la futura conformación del archivo. En las fases mencionadas se contempla la revisión del material a partir de distintas técnicas de revisión documental. Para la sistematización de la información se proyecta la elaboración de un Banco de Datos de Tenedores, una matriz de caracterización de material documental y un modelo de informe técnico de identificación y caracterización. Por último, en lo que respecta a los productos y resultados proyectados, se contempla la entrega de un inventario y una cartografía digital sobre el material documental identificado, un libro y un artículo resultado de la caracterización y análisis de dicho material, así como la participación en dos eventos (uno nacional y otro local) para socializar los resultados de la investigación. Con todo esto, se espera contribuir a la generación, apropiación y difusión de nuevo conocimiento relacionado con las características del material documental sobre Derechos Humanos, Memoria y Histórica y Conflicto Armado de la ciudad de Pereira, así como con su aporte a la futura conformación de un archivo local que sirva de insumo para fortalecer los procesos territoriales de memoria, verdad, justicia, reparación integral y no repetición que se vienen adelantando en el marco del contexto transicional."
    },
    {
      type: "Investigación y desarrollo",
      title: "¿Enseñanza De La Física Basada En Los Factores Antropológicos Y El Contexto Social?",
      start: "Noviembre 2022",
      end: "Marzo 2023",
      summary: "El objetivo de este trabajo fue el establecer una relación entre los factores antropológicos, el contexto social y la enseñanza de la física; ya que se ha observado que existen investigaciones que relacionan los factores antropológicos con la educación también la educación y el contexto social; pero no existe un trabajo que relacione los factores antropológicos, el contexto social y la enseñanza de la física a la vez. Se realizó una búsqueda de referencias en distintas bases como Scopus, Web of Science Scielo, Redalyc en diferentes idiomas, en los cuales resalta el español y portugués. Además, se usó una metodología de tipo cuantitativo exploratorio de tipo transversal; la cual permitió analizar artículos publicados entre 2005 y 2022, período en el cual se ha observado un aumento del número de las publicaciones en estas áreas del conocimiento; y así permite analizar su influencia en la enseñanza de la física. Como resultado se pudo identificar que los factores antropológicos de orden, Biológico, Lingüístico y Cultural influyen en el proceso educativo y poner atención a ellos en la enseñanza de la Física podría mejorar los resultados de aprendizaje de los estudiantes."
    },
    {
      type: "Investigación y desarrollo",
      title: "¿Polisemia Y La Pobreza Léxica Como Obstáculos En La Enseñanza Del Concepto Medir Y Su Tratamiento Estadístico?",
      start: "Diciembre 2022",
      end: "Marzo 2023",
      summary: "Dos fenómenos del lenguaje que se complementan para obstaculizar la labor docente son la polisemia y la pobreza léxica. El primero va de los diversos significados que puede tomar una palabra, y el otro de la limitada cantidad de vocablos que maneja una persona. Se torna sumamente complejo introducir un término como “medir” en física o ciencias, pues es un concepto del que muchos estudiantes ya tienen una definición, pero este significado no coincide con la definición formal del concepto, así aparece la polisemia en clases. Razón por la que surge el presente trabajo. Esta investigación tiene un enfoque cualitativo interpretativo hermenéutico, con carácter documental en la modalidad de estado del arte, tiene por objetivo describir y documentar las investigaciones existentes sobre polisemia y pobreza léxica en el ámbito educativo, y si estas guardan relación con el tema de investigación, Polisemia y pobreza léxica como obstáculos en la enseñanza del concepto medir y su tratamiento estadístico. Se encontró que el docente de ciencias tiene que ser también un profesional de lenguaje, reconociendo que el idioma de las ciencias es en sí mismo un factor importante, y hay que tratarlo de la misma forma en que se enseña una lengua extranjera. Este hallazgo demuestra la amplitud del tema y lleva a enfocarse a lo que se ha denominado en este trabajo como centros de interés, para una mejor comprensión del tema y cumplir con los objetivos de este estado del arte. Esta pesquisa da como resultado un viaje desde las limitaciones del lenguaje de la ciencia, pasando por las dificultades que da la polisemia para aprender el idioma materno, revisando la importancia de tener amplia disponibilidad léxica y terminando en la polisemia de un concepto científico."
    },
    {
      type: "Investigación y desarrollo",
      title: "Identificación De Las Nuevas Construcciones Simbólicas Del Sujeto En La Relación Sugar Daddy – Sugar Baby En La Producción De La Red Social Twitter",
      start: "Febrero 2020",
      end: "Abril 2021",
      summary: "Proyecto de grado de la maestría en comunicación educativa que se centra en el análisis de un fenómeno novedoso en la construcción simbólica del sujeto en la realidad social."
    },
    {
      type: "Investigación y desarrollo",
      title: "¿El uso de la Tecnología en el proceso de enseñanza - aprendizaje de la física en las áreas rurales, como estrategias aplicables en los colegios públicos del Distrito de los Pozos - Herrera en la República de Panamá?",
      start: "Enero 2024",
      end: "Junio 2024",
      summary: "Esta investigación tiene como objetivo general comprender el estado actual de la implementación del uso de la Tecnología en el proceso de enseñanza - aprendizaje de la física en las áreas rurales, como estrategias aplicables en los colegios públicos del Distrito de los Pozos - Herrera en la República de Panamá. Esta revisión contó con un mínimo de 20 artículos científicos basados en estudios relacionados con el tema a investigar. La importancia de este estudio radica en la existencia de una brecha educativa entre las áreas rurales y urbanas, además, el acceso a la tecnología es más limitado en áreas rurales, lo cual aumenta la problemática en la enseñanza-aprendizaje y en este caso referente a la física. La metodología por utilizar debe ser flexible y adaptable a las características específicas de las áreas rurales seleccionadas para garantizar que la investigación sea relevante y aplicable a la realidad de los colegios públicos en dichas zonas. Esta investigación tenía un enfoque cualitativo con carácter documental en la modalidad del estado del arte; su finalidad era evaluar y documentar las investigaciones existentes que se habían realizado en colegios rurales y que hacían referencia al uso de la tecnología en la enseñanza - aprendizaje de la física. El utilizar la tecnología de manera adecuada puede aumentar la motivación de los estudiantes y fomentar un aprendizaje más significativo al ofrecer experiencias interactivas y prácticas relacionadas con la física. Con los hallazgos obtenidos, se pudo proporcionar una visión más detallada sobre las tendencias actuales y futuras en la implementación de tecnología en los procesos de enseñanza - aprendizaje de la física en los colegios públicos de áreas rurales."
    },
    {
      type: "Investigación y desarrollo",
      title: "Tendencias Conceptuales Derivadas De La Producción Académica Del Grupo De Investigación En Estudios Políticos Y Jurídicos De La Universidad Tecnológica De Pereira Entre Los Años 2013-2020",
      start: "Octubre 2021",
      end: "Abril 2022",
      summary: "La producción de conocimiento elaborada por el Grupo de Investigación entre los años 2013 y 2020 ha sido relevante para aportar a la comprensión del contexto particular colombiano y/o Latinoamericano, sin embargo, hacer una pausa y realizar una reflexión crítica sobre tal producción, será una posibilidad para conocer las relaciones entre la producción de conocimiento del Grupo y la realidad social actual, considerando nuevas complejidades y contradicciones. Por ello se ha planteado la siguiente pregunta de investigación: ¿Cuáles son las tendencias conceptuales, epistemológicas y praxiológicas que emergen – y/o han emergido- de los procesos investigativos desarrollados por el Grupo de Investigación en Estudios Políticos y Jurídicos de la Universidad Tecnológica de Pereira (UTP), Colombia, durante el periodo comprendido entre los años 2013 y 2020? Objetivo General: Conocer el devenir investigativo en lo conceptual, epistemológico y praxeológico del grupo de investigación en Estudios Políticos y Jurídicos de la Universidad Tecnológica de Pereira en el periodo del 2013 al 2020. Objetivos específicos. Recuperar el conocimiento que el grupo de investigación ha acumulado sobre su objeto de estudio. Compilar todos los productos de conocimiento que el grupo de investigación ha publicado respecto a sus objetos de estudio. Precisar el devenir de temas, problemas y objetivos de investigación y conocimiento propuestos por el grupo a partir de su creación. Definir los campos de conocimiento, conceptos y temas investigados por el grupo. Comprender las perspectivas metodológicas y empíricas utilizadas en la investigación del grupo. Revisar desde una perspectiva teórica y de análisis crítico la producción documental del grupo. Indagar por el alcance y los límites de la producción investigativa realizada por el grupo en el periodo del año 2013- 2020 Proponer nuevos procesos, problemas y objetos de conocimiento a abordar por parte del Grupo de Investigación."
    },
    {
      type: "Investigación y desarrollo",
      title: "Subjetividades políticas juveniles emergentes desde el acontecimiento pandémico derivado del Covid-19",
      start: "Junio 2023",
      end: "Actualidad",
      summary: "La presente propuesta investigativa se desarrolla a partir de la tradición de ocho años que ha venido concretando el grupo de Estudios políticos y jurídicos, desde su línea de investigación en formación de Sujeto político, perteneciente a la Universidad Tecnológica de Pereira (UTP). Su desarrollo teórico se basará, profundizará y aportará respecto de los siguientes tópicos: Acontecimiento. Bajo el entendido que la vida y sus expresiones no son lineales, sino que emergen, por lo que se desdoblan acontecimentalmente en diversas opciones. Esto tiene incidencia en la manera de asumir la vida y con ello, las opciones investigativas de la misma. Subjetividad. Asumida como una expresión de la vida, en su dimensión biopsicosocial y con ello en su particularidad psíquica humana. Juventud. Esta será comprendida en cuanto condición y construcción sociocultural, que por lo tanto supera- aunque los contiene- atributos etarios, desplegando procesualidades de lo juvenil, la jovialidad, las culturas juveniles. Pandemia. Encuadrada como contexto global de nuestra humanidad actual/contemporánea lo que ha afectado todas las dimensiones del actuar social, por lo que sume una condición de texto cultural necesario de interpretar. Lograr lo anterior nos lleva a plantear como problema de investigación y por ende de conocimiento la siguiente pregunta: ¿Cómo se despliegan las subjetividades juveniles en tiempos de pandemia? Tal pregunta se complementa y desagrega en el siguiente objetivo: Comprender el despliegue de las subjetividades juveniles en el acontecimiento pandémico derivado del Covid-19."
    },
    {
      type: "Investigación y desarrollo",
      title: "Creación de una estrategia audiovisual con base en storytelling para cambiar imaginarios urbanos: caso Pereira Imaginada y sus croquis ciudadanos.",
      start: "Febrero 2020",
      end: "Marzo 2022",
      summary: "El presente proyecto parte de la pregunta ¿A partir de una estrategia audiovisual con base en storytelling, podríamos intervenir los imaginarios de alta y media concentración simbólica de los ciudadanos de Pereira? La pregunta planteada en posibilidad puede darnos respuestas en positivo, negativo, probabilidad, en duda, en certezas, y en toda esta gama se gana en interpretación en cuanto a las construcciones de realidad social que subyacen a los Imaginarios Urbanos y la apertura para intervenir éstos. Es así como el objetivo central parte de un interés por intervenir imaginarios o las construcciones colectivas que los ciudadanos perciben de su entorno, y que los llevan a actuar de cierta forma afectando muchas veces su calidad de vida. Por tal razón queremos crear una estrategia audiovisual a través del storytelling (historias abiertas que funde realidad y ficción), utilizando la información de las investigaciones anteriores sobre Pereira Imaginada y sus Croquis Urbanos que recoge datos sobre las cualidades, escenarios, calificaciones, temporalidades, marcas, rutinas, afinidades, no afinidad y anhelos (Silva 2005) a través de la plataforma multimedia de Pereira Imaginada. Los productos esperados (6 piezas audiovisuales) se fundamentarán a partir de contenidos educativos que cuenten con la capacidad de persuadir y contribuir a transformar las percepciones frente al Imaginario Urbano, apelando a la realidad-ficción, en sus narrativas. Autores como Jenkins (2003), Handler (2004), Scolari (2004 - 2008 - 2013), Rose (2011), Silva (2007), entre otros, nos aportan en la comprensión de discusiones profundas sobre el conocer, comprender, transformar y crear la realidad social así como las acciones que se derivan por la concepción de una forma u otra de dicha realidad. El proceso metodológico se hará a partir de la construcción de stoytelling basado de los datos de los croquis, en primera instancia, seguida por el diseño de ideas que posteriormente se prentaran través de un pitch, luego se desarrolla la construcción de guiones a partir las ideas selecionadas en la fase de presentación, luego la concreción en diseño de guiones literarios, y técnicos, continuando con la fase de el prototipado de la estrategia audiovisual, el trabajo en terreno y culminar con 6 productos. Al grupo de investigación lo anima a presentar este tipo de proyecto, porque es una forma de llevar a la práctica los resultados de las investigaciones sobre los imaginarios de los ciudadanos de Pereira desde 1999, hasta el presente, donde hemos visto los cambios no sólo de la ciudad sino de los ciudadanos mismos, corroborando lo que Silva nos plantea desde su apuesta teórica de considerar los imaginarios urbanos como construcciones colectivas que se transforman pero lo más importante, son el fundamento de las acciones y comportamientos sociales."
    },
    {
      type: "Investigación y desarrollo",
      title: "Sistematización De Emprendimientos En Los Licenciados En Comunicación E Informática Educativa",
      start: "Febrero 2020",
      end: "Julio 2020",
      summary: "En esta sistematización de experiencia se pretende contrastar las propuestas alternas surgidas en los egresados de la Licenciatura en Comunicación e Informática Educativa de la Universidad Tecnología de Pereira, para esto se analizó el proceso de cinco (5) muestras, indagando sobre cada experiencia en una entrevista donde se ha obtenido información precisa por medio de una matriz de análisis en el proceso de cada uno de los proyectos, este ejercicio se realizó con el fin de encontrar puntos característicos, situaciones diversas, fortalezas, debilidades y puntos de diferencia en cada experiencia. Con esta información recolectada, se han obtenido los datos específicos que llevaron a la reflexión del ¿por qué?, ¿cómo?, ¿cuándo?, ¿dónde? Y ¿de qué manera? Los egresados de la Licenciatura en Comunicación e Informática Educativa han logrado mutar su perfil profesional enfocado a la docencia y han llevado la aplicabilidad de la educación a escenarios no tan académicos como lo son el marketing digital, el emprendimiento empresarial enfocado a agencias creativas y la producción audiovisual."
    },
    {
      type: "Investigación y desarrollo",
      title: "Sinequismo Peirceano Realidad Virtualidad como unidad",
      start: "Agosto 2015",
      end: "Diciembre 2020",
      summary: "Ante la necesidad de generar nuevas reflexiones sobre lo que está sucediendo en el contexto social y más concretamente en el Aprendizaje, se debe partir desde la premisa de cuáles son las implicaciones que han traído las nuevas tecnologías como escenarios de interacción que afectan las lecturas frente a la unidad Realidad – “Virtualidad”, dinamizando nuevos escenarios que se convierten en enlaces para nuevas experiencias. Es en este sentido que la tesis titulada “HomoSinekus: Realidad – “Virtualidad” como unidad del signo epistemológico y sus implicaciones en lo educativo” busca profundizar la reflexión sobre un fenómeno que transversaliza la experiencia del ser humano frente a la construcción de conocimiento, pasando de una lectura primaria basada en el binarismo que busca respuestas rápidas en forma positiva o negativa dentro del modelo cartesiano, para pasar a una nueva lectura que aboga por una mirada trial, continua, que infiere nuevas conexiones que hacen parte del Phaneron; en esta lectura, el filósofo norteamericano Charles Sanders Peirce, a través de la teoría de los Signos, plantea que lo que constituye un verdadero “Razonamiento” se hace a través del Sinequismo como principio de continuidad, que permite hacer nuevas inferencias frente a los signos que acompañan las ideas, recordando que estas son falibles, por eso, el papel de la apuesta Peirceana está en proporcionar una base al pensamiento que parte de la lógica y la semiótica, que necesita el contexto educativo y cultural del siglo XXI para comprender las nuevas apuestas de realidad."
    },
    {
      type: "Investigación y desarrollo",
      title: "Por los croquis digitales de los ciudadanos",
      start: "Enero 2015",
      end: "Diciembre 2016",
      summary: "La inquietud principal de la que parte esta propuesta es el creciente desconocimiento del entorno local, de lo inmediato, de lo que nos rodea, especialmente, en las ciudades donde habitamos. El conocimiento del espacio, de los acontecimientos que suceden en él, lo hemos dejado a cargo de los noticieros (95% ven RCN, CARACOL, a medio día, según investigación de Pereira Imaginada, 2009, 2014), radiales o de pantallas, de los periódicos con sus fascículos que narran, con su lenguaje y semiótica particular, lo que sucede alrededor de los homicidios, extorsiones, accidentes, narcotráfico (ejemplo, el Q ' H U B O). Narraciones, que se hacen desde una visión de mundo, dejando de lado otras posibilidades frente a los mismos hechos. Por lo tanto, se encuentra un gran vacío de otras percepciones, formas de presentar los sucesos, producción de otros conocimientos frente a la localidad, percepciones que no sólo sean las de los sectores dominantes, sino que recojan el sentir de los ciudadanos de a pies desde sus diferentes asentamientos donde habitan y puedan al mismo tiempo sentirse partícipes en esa construcción de historias locales, y contextualizadas. Partiendo de ese vacío, los estudios que ha realizado el grupo de investigación proponente, sobre Pereira, desde 1999, ha tratado de llenarlos, recogiendo esa percepción ciudadana, que hoy se hace fundamental si queremos contar con dicha visión para las propuestas de ciudad que se hacen desde diferentes sectores políticos y económicos. Por este motivo, se pretende pasar de los resultados obtenidos durante estos años a una propuesta de apropiación social de los mismos, por parte de los ciudadanos que han dado su percepción, haciendo uso del concepto de “cibernética de segundo orden”: volver sobre nuestros propios esquemas de observación para producir un cambio en ellos. La propuesta consiste en crear un hipermedia con sus características de asincronizidad e interactividad cuyo contenido sean las percepciones de los ciudadanos de a Pie, sobre las cualidades, calificaciones, escenarios, temporalidades, marcas, rutinas, y otredades sobre la ciudad de Pereira. Igualmente, incorporar en dicha herramienta, preguntas, redes sociales, concursos, invitaciones a compartir acontecimientos, acerca de los mismos aspectos mencionados con el fin de recrear constantemente los puntos de vista ciudadanos, convirtiéndose en un observatorio permanente de ciudad con el fin de ser consultados, medidos y aplicados en las propuestas de solución sobre problemáticas de la ciudad. El hipermedia contendrá un multimedia, hipertexto, el formulario base de las ciudades imaginadas, metodología tomada de los Imaginarios Urbanos propuesto por el investigador colombiano, Armando Silva (2005), Redes Sociales, para su interactividad y una interfaz amigable para el usuario. Esperamos, a mediano plazo, convertirnos en un laboratorio social que construya ciudad y exprese ciudadanía desde lo virtual."
    },
    {
      type: "Investigación y desarrollo",
      title: "EL USO DE LA TECNOLOGÍA EN EL PROCESO DE ENSEÑANZA - APRENDIZAJE DE LA FÍSICA EN LAS ÁREAS RURALES, COMO ESTRATEGIAS APLICABLES EN LOS COLEGIOS PÚBLICOS DEL DISTRITO DE LOS POZOS - HERRERA EN LA REPÚBLICA DE PANAMÁ",
      start: "Mayo 2023",
      end: "Mayo 2024",
      summary: "EL USO DE LA TECNOLOGÍA EN EL PROCESO DE ENSEÑANZA - APRENDIZAJE DE LA FÍSICA EN LAS ÁREAS RURALES, COMO ESTRATEGIAS APLICABLES EN LOS COLEGIOS PÚBLICOS DEL DISTRITO DE LOS POZOS - HERRERA EN LA REPÚBLICA DE PANAMÁ"
    }
  ]
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>('bio');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Cerrar menú móvil al redimensionar
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevenir scroll cuando el menú móvil está abierto
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  // Lógica de búsqueda
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results: any[] = [];

    // Función auxiliar para buscar en objetos
    const searchInData = (data: any[], sectionId: string, sectionName: string) => {
      data.forEach((item: any) => {
        const textToSearch = JSON.stringify(item).toLowerCase();
        if (textToSearch.includes(query)) {
          results.push({
            id: item.id || Math.random(),
            title: item.title || item.role || item.name || item.institution || "Sin título",
            subtitle: item.institution || item.type || item.year || "",
            sectionId,
            sectionName,
            originalItem: item
          });
        }
      });
    };

    // Indexar datos
    searchInData(PROFESSOR_DATA.cv, 'cv', 'Formación');
    searchInData(PROFESSOR_DATA.experience, 'experience', 'Experiencia');
    searchInData(PROFESSOR_DATA.tutoring, 'tutoring', 'Tutorías');
    searchInData(PROFESSOR_DATA.jury, 'jury', 'Jurados');
    searchInData(PROFESSOR_DATA.events, 'events', 'Eventos');
    searchInData(PROFESSOR_DATA.networks, 'networks', 'Redes');
    searchInData(PROFESSOR_DATA.socialImpact, 'social', 'Impacto Social');
    searchInData(PROFESSOR_DATA.digitalContent, 'audiovisual', 'Audiovisual');
    searchInData(PROFESSOR_DATA.articles, 'articles', 'Artículos');
    searchInData(PROFESSOR_DATA.nonScientificArticles, 'divulgation', 'Divulgación');
    searchInData(PROFESSOR_DATA.divulgationBooks, 'divulgation-books', 'Libros Div.');
    searchInData(PROFESSOR_DATA.researchReports, 'reports', 'Informes');
    searchInData(PROFESSOR_DATA.artisticWorks, 'artistic', 'Obras');
    searchInData(PROFESSOR_DATA.projects, 'projects', 'Proyectos');
    searchInData(PROFESSOR_DATA.complementary, 'complementary', 'Cursos');
    searchInData(PROFESSOR_DATA.products, 'products', 'Publicaciones');

    setSearchResults(results.slice(0, 10)); // Limitar a 10 resultados para rendimiento
  }, [searchQuery]);

  // Atajo de teclado para búsqueda (Ctrl+K y ESC)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Elementos Decorativos Flotantes */}
      <div className="floating-shape w-64 h-64 bg-indigo-400 top-20 -left-20" />
      <div className="floating-shape w-96 h-96 bg-pink-300 bottom-20 -right-20" style={{ animationDelay: '-5s' }} />
      <div className="floating-shape w-48 h-48 bg-blue-300 top-1/2 left-1/3" style={{ animationDelay: '-10s' }} />

      {/* Navegación */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled || isMobileMenuOpen ? 'py-2 md:py-3' : 'py-4 md:py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className={`glass transition-all duration-300 ${isMobileMenuOpen ? 'rounded-3xl' : 'rounded-2xl md:rounded-full'} px-4 md:px-6 py-2 md:py-3 flex flex-col bg-gradient-to-r from-indigo-100/70 via-white/80 to-blue-100/70 border-white/40 shadow-lg shadow-indigo-200/20`}>
            
            {/* Barra Principal */}
            <div className="flex justify-between items-center w-full">
              {/* Logo o Nombre */}
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-6 bg-indigo-500 rounded-full hidden sm:block" />
                <div className="font-bold text-indigo-950 text-sm md:text-base tracking-tight">
                  M.A. PUENTES CASTRO
                </div>
              </div>

              {/* Menú Desktop (Oculto en móvil/tablet pequeña) */}
              <div className="hidden lg:flex items-center gap-4 xl:gap-8 text-[11px] xl:text-xs font-bold uppercase tracking-wider">
                {/* Grupo Perfil */}
                <div className="relative group">
                  <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors py-1">
                    Perfil <ChevronDown size={12} />
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 hidden group-hover:block z-50">
                    <div className="glass bg-white/95 rounded-xl shadow-xl border border-white/50 p-2 min-w-[140px] flex flex-col gap-1">
                      <a href="#bio" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Biografía</a>
                      <a href="#cv" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Formación</a>
                      <a href="#experience" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Experiencia</a>
                    </div>
                  </div>
                </div>

                {/* Grupo Academia */}
                <div className="relative group">
                  <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors py-1">
                    Academia <ChevronDown size={12} />
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 hidden group-hover:block z-50">
                    <div className="glass bg-white/95 rounded-xl shadow-xl border border-white/50 p-2 min-w-[140px] flex flex-col gap-1">
                      <a href="#tutoring" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Tutorías</a>
                      <a href="#jury" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Jurados</a>
                      <a href="#events" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Eventos</a>
                      <a href="#networks" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Redes</a>
                    </div>
                  </div>
                </div>

                {/* Grupo Producción */}
                <div className="relative group">
                  <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors py-1">
                    Producción <ChevronDown size={12} />
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 hidden group-hover:block z-50">
                    <div className="glass bg-white/95 rounded-xl shadow-xl border border-white/50 p-2 min-w-[160px] flex flex-col gap-1">
                      <a href="#articles" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Artículos</a>
                      <a href="#divulgation" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Divulgación</a>
                      <a href="#divulgation-books" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Libros Div.</a>
                      <a href="#reports" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Informes</a>
                      <a href="#artistic" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Obras</a>
                      <a href="#products" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Publicaciones</a>
                    </div>
                  </div>
                </div>

                {/* Grupo Investigación */}
                <div className="relative group">
                  <button className="flex items-center gap-1 hover:text-indigo-600 transition-colors py-1">
                    Investigación <ChevronDown size={12} />
                  </button>
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 hidden group-hover:block z-50">
                    <div className="glass bg-white/95 rounded-xl shadow-xl border border-white/50 p-2 min-w-[140px] flex flex-col gap-1">
                      <a href="#projects" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Proyectos</a>
                      <a href="#social" className="px-3 py-2 hover:bg-indigo-50 rounded-lg transition-colors text-gray-700 normal-case font-medium">Impacto Social</a>
                    </div>
                  </div>
                </div>

                <a href="#audiovisual" className="hover:text-indigo-600 transition-colors py-1">Audiovisual</a>
                <a href="#complementary" className="hover:text-indigo-600 transition-colors py-1">Cursos</a>
              </div>

              {/* Acciones (Búsqueda y Menú Móvil) */}
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="flex items-center gap-2 px-3 md:px-5 py-2 md:py-2.5 bg-white/50 hover:bg-white text-indigo-600 rounded-full transition-all border border-indigo-100 hover:border-indigo-200 shadow-sm hover:shadow-md group"
                >
                  <Search size={18} className="group-hover:scale-110 transition-transform text-indigo-500" />
                  <span className="text-xs font-black hidden md:inline tracking-wider">BUSCAR</span>
                  <span className="text-[10px] text-indigo-300 hidden xl:inline border border-indigo-100 px-1.5 rounded ml-1 font-mono">⌘K</span>
                </button>

                <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden p-2 text-indigo-900 hover:bg-indigo-50 rounded-full transition-colors"
                >
                  {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>

            {/* Menú Móvil (Expandible) */}
            <AnimatePresence>
              {isMobileMenuOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden lg:hidden"
                >
                  <div className="pt-4 pb-6 grid grid-cols-1 sm:grid-cols-2 gap-6 border-t border-indigo-100 mt-3 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    <div className="space-y-1">
                      <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] px-3 mb-2 opacity-70">Perfil</h3>
                      <div className="grid grid-cols-1 gap-1">
                        <a href="#bio" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                          <Users size={18} className="text-indigo-400" /> Biografía
                        </a>
                        <a href="#cv" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                          <GraduationCap size={18} className="text-indigo-400" /> Formación
                        </a>
                        <a href="#experience" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                          <Briefcase size={18} className="text-indigo-400" /> Experiencia
                        </a>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] px-3 mb-2 opacity-70">Academia</h3>
                      <div className="grid grid-cols-1 gap-1">
                        <a href="#tutoring" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                          <Users size={18} className="text-indigo-400" /> Tutorías
                        </a>
                        <a href="#jury" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                          <Gavel size={18} className="text-indigo-400" /> Jurados
                        </a>
                        <a href="#events" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                          <Calendar size={18} className="text-indigo-400" /> Eventos
                        </a>
                        <a href="#networks" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                          <Globe size={18} className="text-indigo-400" /> Redes
                        </a>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] px-3 mb-2 opacity-70">Producción</h3>
                      <div className="grid grid-cols-1 gap-1">
                        <a href="#articles" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                          <FileText size={18} className="text-indigo-400" /> Artículos
                        </a>
                        <a href="#divulgation" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                          <BookOpen size={18} className="text-indigo-400" /> Divulgación
                        </a>
                        <a href="#reports" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                          <Library size={18} className="text-indigo-400" /> Informes
                        </a>
                        <a href="#products" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                          <Book size={18} className="text-indigo-400" /> Publicaciones
                        </a>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.2em] px-3 mb-2 opacity-70">Investigación</h3>
                      <div className="grid grid-cols-1 gap-1">
                        <a href="#projects" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                          <Briefcase size={18} className="text-indigo-400" /> Proyectos
                        </a>
                        <a href="#social" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                          <Users size={18} className="text-indigo-400" /> Impacto Social
                        </a>
                        <a href="#audiovisual" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-3 px-4 py-3 text-sm font-bold text-gray-700 hover:bg-indigo-50 rounded-2xl transition-all active:scale-95">
                          <Globe size={18} className="text-indigo-400" /> Audiovisual
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      {/* Modal de Búsqueda */}
      <AnimatePresence>
        {isSearchOpen && (
          <div className="fixed inset-0 z-[100] flex items-start justify-center pt-20 px-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSearchOpen(false)}
              className="absolute inset-0 bg-indigo-950/40 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              className="relative w-full max-w-2xl glass bg-white/95 rounded-3xl shadow-2xl border border-white/50 overflow-hidden"
            >
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-center gap-4">
                  <Search className="text-indigo-500" size={24} />
                  <input 
                    autoFocus
                    type="text" 
                    placeholder="Busca proyectos, artículos, eventos..."
                    className="w-full bg-transparent text-xl outline-none text-gray-800 placeholder:text-gray-400"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button 
                    onClick={() => setIsSearchOpen(false)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"
                  >
                    <ChevronUp size={20} className="rotate-90" />
                  </button>
                </div>
              </div>

              <div className="max-h-[60vh] overflow-y-auto p-4">
                {searchResults.length > 0 ? (
                  <div className="space-y-2">
                    {searchResults.map((result, idx) => (
                      <a 
                        key={idx}
                        href={`#${result.sectionId}`}
                        onClick={() => {
                          setIsSearchOpen(false);
                          setExpandedSection(result.sectionId);
                        }}
                        className="flex flex-col p-4 hover:bg-indigo-50 rounded-2xl transition-all border border-transparent hover:border-indigo-100 group"
                      >
                        <div className="flex justify-between items-start mb-1">
                          <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">{result.sectionName}</span>
                          <ExternalLink size={14} className="text-gray-300 group-hover:text-indigo-400 transition-colors" />
                        </div>
                        <h4 className="font-bold text-gray-800 group-hover:text-indigo-900 transition-colors line-clamp-1">{result.title}</h4>
                        <p className="text-sm text-gray-500 line-clamp-2">{result.subtitle}</p>
                      </a>
                    ))}
                  </div>
                ) : searchQuery ? (
                  <div className="py-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-50 rounded-full mb-4">
                      <Search size={32} className="text-gray-300" />
                    </div>
                    <p className="text-gray-500 font-medium">No se encontraron resultados para "{searchQuery}"</p>
                  </div>
                ) : (
                  <div className="py-12 text-center">
                    <p className="text-gray-400 text-sm">Escribe algo para comenzar a buscar en el portafolio...</p>
                  </div>
                )}
              </div>

              <div className="p-4 bg-gray-50/50 border-t border-gray-100 flex justify-between items-center text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                <div className="flex gap-4">
                  <span><kbd className="bg-white border border-gray-200 px-1 rounded shadow-sm">ESC</kbd> Cerrar</span>
                  <span><kbd className="bg-white border border-gray-200 px-1 rounded shadow-sm">↵</kbd> Seleccionar</span>
                </div>
                <span>{searchResults.length} resultados encontrados</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <main className="max-w-5xl mx-auto px-4 md:px-6 pt-24 md:pt-32 pb-20 space-y-8 md:space-y-12">
        
        {/* Sección Bio / Hero (Siempre visible y centrada) */}
        <section id="bio" className="scroll-mt-20 md:scroll-mt-28">
          <div className="glass rounded-3xl p-8 md:p-12 flex flex-col items-center text-center relative overflow-hidden">
            {/* Foto de Perfil Centrada */}
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white/50 shadow-xl mb-8 flex-shrink-0">
              <img 
                src={PROFESSOR_DATA.profileImage} 
                alt={PROFESSOR_DATA.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Información Principal */}
            <div className="max-w-3xl mx-auto">
              <h1 className="serif text-3xl md:text-5xl font-bold mb-3 text-indigo-950 leading-tight">
                {PROFESSOR_DATA.name}
              </h1>
              <p className="text-lg md:text-xl text-indigo-600 font-medium mb-6 italic serif">
                {PROFESSOR_DATA.title}
              </p>
              
              <div className="flex flex-wrap justify-center gap-3 md:gap-4 mb-8">
                <span className="flex items-center gap-2 text-xs md:text-sm text-gray-600 bg-white/40 px-4 py-2 rounded-full border border-white/30 shadow-sm">
                  <MapPin size={14} className="text-indigo-500" /> {PROFESSOR_DATA.location}
                </span>
                <span className="flex items-center gap-2 text-xs md:text-sm text-gray-600 bg-white/40 px-4 py-2 rounded-full border border-white/30 shadow-sm">
                  <Mail size={14} className="text-indigo-500" /> {PROFESSOR_DATA.email}
                </span>
              </div>

              {/* Redes Sociales Centradas */}
              <div className="flex flex-wrap justify-center gap-3 mb-10">
                <a 
                  href={PROFESSOR_DATA.social.linkedin} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  data-tooltip="LinkedIn" 
                  className="social-btn group p-4 glass rounded-2xl hover:bg-[#0077b5] hover:scale-110 text-[#0077b5] hover:text-white shadow-sm transition-all"
                >
                  <Linkedin size={22} />
                </a>
                <a 
                  href={PROFESSOR_DATA.social.scholar} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  data-tooltip="Google Scholar" 
                  className="social-btn group p-4 glass rounded-2xl hover:bg-[#4285F4] hover:scale-110 text-[#4285F4] hover:text-white shadow-sm transition-all"
                >
                  <GoogleScholarIcon size={22} />
                </a>
                <a 
                  href={PROFESSOR_DATA.social.researchgate} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  data-tooltip="ResearchGate" 
                  className="social-btn group p-4 glass rounded-2xl hover:bg-[#00ccbb] hover:scale-110 text-[#00ccbb] hover:text-white shadow-sm transition-all"
                >
                  <ResearchGateIcon size={22} />
                </a>
                <a 
                  href={PROFESSOR_DATA.social.academia} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  data-tooltip="Academia.edu" 
                  className="social-btn group p-4 glass rounded-2xl hover:bg-[#313535] hover:scale-110 text-[#313535] hover:text-white shadow-sm transition-all"
                >
                  <AcademiaIcon size={22} />
                </a>
                <a 
                  href={PROFESSOR_DATA.social.repository} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  data-tooltip="Repositorio UTP" 
                  className="social-btn group p-4 glass rounded-2xl hover:bg-indigo-600 hover:scale-110 text-indigo-600 hover:text-white shadow-sm transition-all"
                >
                  <Library size={22} />
                </a>
              </div>

              {/* Biografía (Siempre Visible) */}
              <div className="border-t border-indigo-100 pt-8">
                <h3 className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-4">Perfil Profesional</h3>
                <p className="text-base md:text-lg leading-relaxed text-gray-700 text-justify md:text-center">
                  {PROFESSOR_DATA.bio}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Sección Trayectoria (CV) */}
        <section id="cv" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 ${expandedSection === 'cv' ? 'expanded' : ''}`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <GraduationCap className="text-indigo-600" /> Formación Académica
              </h2>
              <button 
                onClick={() => toggleSection('cv')}
                className="text-indigo-400 hover:text-indigo-600 transition-colors p-2"
              >
                {expandedSection === 'cv' ? <ChevronUp size={20} className="md:w-[24px]" /> : <ChevronDown size={20} className="md:w-[24px]" />}
              </button>
            </div>

            <div className="expandable-content">
              <div className="space-y-4 md:space-y-6">
                {PROFESSOR_DATA.cv.map((item, idx) => (
                  <div key={idx} className="flex flex-col md:flex-row md:items-start gap-2 md:gap-4 p-4 md:p-6 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-colors group">
                    <span className="text-xs md:text-sm font-bold text-indigo-600 md:w-32 pt-1">{item.year}</span>
                    <div className="flex-1">
                      <h3 className="font-semibold text-base md:text-lg group-hover:text-indigo-800 transition-colors">{item.role}</h3>
                      <p className="text-sm md:text-base text-indigo-900/70 font-medium">{item.institution}</p>
                      {item.description && (
                        <p className="text-xs md:text-sm text-gray-600 mt-2 italic">
                          {item.description}
                        </p>
                      )}
                    </div>
                    <Award className="hidden md:block text-indigo-200 group-hover:text-indigo-400 transition-colors" size={24} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sección Experiencia Profesional */}
        <section id="experience" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 ${expandedSection === 'experience' ? 'expanded' : ''}`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <Briefcase className="text-indigo-600" /> Experiencia Profesional
              </h2>
              <button 
                onClick={() => toggleSection('experience')}
                className="text-indigo-400 hover:text-indigo-600 transition-colors p-2"
              >
                {expandedSection === 'experience' ? <ChevronUp size={20} className="md:w-[24px]" /> : <ChevronDown size={20} className="md:w-[24px]" />}
              </button>
            </div>

            <div className="expandable-content">
              <div className="space-y-6 md:space-y-8">
                {PROFESSOR_DATA.experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-6 md:pl-8 border-l-2 border-indigo-100 pb-6 last:pb-0">
                    <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-indigo-600 border-4 border-white shadow-sm" />
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-4">
                      <div>
                        <h3 className="text-lg md:text-xl font-bold text-indigo-950">{exp.institution}</h3>
                        <p className="text-sm font-semibold text-indigo-600">{exp.period}</p>
                      </div>
                      <span className="inline-block px-3 py-1 bg-indigo-50 text-indigo-700 text-[10px] md:text-xs font-bold rounded-full self-start">
                        {exp.dedication}
                      </span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                      {exp.activities.admin && (
                        <div className="space-y-2">
                          <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Administración</h4>
                          <ul className="text-xs md:text-sm text-gray-600 space-y-1">
                            {exp.activities.admin.map((a, i) => <li key={i} className="flex gap-2"><span>•</span> {a}</li>)}
                          </ul>
                        </div>
                      )}
                      {exp.activities.teaching && (
                        <div className="space-y-2">
                          <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Docencia</h4>
                          <ul className="text-xs md:text-sm text-gray-600 space-y-1">
                            {exp.activities.teaching.map((t, i) => <li key={i} className="flex gap-2"><span>•</span> {t}</li>)}
                          </ul>
                        </div>
                      )}
                      {exp.activities.research && (
                        <div className="space-y-2">
                          <h4 className="text-[10px] uppercase tracking-widest font-bold text-gray-400">Investigación</h4>
                          <ul className="text-xs md:text-sm text-gray-600 space-y-1">
                            {exp.activities.research.map((r, i) => <li key={i} className="flex gap-2"><span>•</span> {r}</li>)}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
        
        {/* Sección Trabajos Dirigidos / Tutorías */}
        <section id="tutoring" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 ${expandedSection === 'tutoring' ? 'expanded' : ''}`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <Users className="text-indigo-600" /> Trabajos Dirigidos / Tutorías
              </h2>
              <button 
                onClick={() => toggleSection('tutoring')}
                className="text-indigo-400 hover:text-indigo-600 transition-colors p-2"
              >
                {expandedSection === 'tutoring' ? <ChevronUp size={20} className="md:w-[24px]" /> : <ChevronDown size={20} className="md:w-[24px]" />}
              </button>
            </div>

            <div className="expandable-content">
              <div className="space-y-4 md:space-y-6">
                {PROFESSOR_DATA.tutoring.map((item, idx) => (
                  <div key={idx} className="p-4 md:p-6 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-colors group">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        {item.type}
                      </span>
                      <span className="text-xs font-bold text-gray-500">{item.year}</span>
                    </div>
                    <h3 className="font-semibold text-base md:text-lg group-hover:text-indigo-800 transition-colors mb-2">
                      {item.title}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs md:text-sm">
                      <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Institución:</span> {item.institution}</p>
                      <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Estado:</span> {item.status}</p>
                      {item.student && (
                        <p className="text-gray-600 md:col-span-2"><span className="font-bold text-indigo-900/70">Persona(s) orientada(s):</span> {item.student}</p>
                      )}
                      <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Rol:</span> {item.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sección Jurado en comités de evaluación */}
        <section id="jury" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 ${expandedSection === 'jury' ? 'expanded' : ''}`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <Gavel className="text-indigo-600" /> Jurado en Comités de Evaluación
              </h2>
              <button 
                onClick={() => toggleSection('jury')}
                className="text-indigo-400 hover:text-indigo-600 transition-colors p-2"
              >
                {expandedSection === 'jury' ? <ChevronUp size={20} className="md:w-[24px]" /> : <ChevronDown size={20} className="md:w-[24px]" />}
              </button>
            </div>

            <div className="expandable-content">
              <div className="space-y-4 md:space-y-6">
                {PROFESSOR_DATA.jury.map((item, idx) => (
                  <div key={idx} className="p-4 md:p-6 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-colors group">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        {item.type}
                      </span>
                    </div>
                    <h3 className="font-semibold text-base md:text-lg group-hover:text-indigo-800 transition-colors mb-2">
                      {item.title}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs md:text-sm">
                      <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Institución:</span> {item.institution}</p>
                      <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Programa:</span> {item.program}</p>
                      {item.student && (
                        <p className="text-gray-600 md:col-span-2"><span className="font-bold text-indigo-900/70">Persona(s) orientada(s):</span> {item.student}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sección Eventos Científicos */}
        <section id="events" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 ${expandedSection === 'events' ? 'expanded' : ''}`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <Calendar className="text-indigo-600" /> Eventos Científicos
              </h2>
              <button 
                onClick={() => toggleSection('events')}
                className="text-indigo-400 hover:text-indigo-600 transition-colors p-2"
              >
                {expandedSection === 'events' ? <ChevronUp size={20} className="md:w-[24px]" /> : <ChevronDown size={20} className="md:w-[24px]" />}
              </button>
            </div>

            <div className="expandable-content">
              <div className="space-y-4 md:space-y-6">
                {PROFESSOR_DATA.events.map((event, idx) => (
                  <div key={idx} className="p-4 md:p-6 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-colors group">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-2 mb-3">
                      <div className="flex flex-wrap gap-2">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                          {event.type}
                        </span>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                          {event.scope}
                        </span>
                      </div>
                      <span className="text-xs font-bold text-gray-500">{event.date}</span>
                    </div>
                    <h3 className="font-semibold text-base md:text-lg group-hover:text-indigo-800 transition-colors mb-2">
                      {idx + 1}. {event.name}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs md:text-sm">
                      <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Ubicación:</span> {event.location}</p>
                      <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Rol:</span> {event.role}</p>
                      {event.participants && event.participants.length > 0 && (
                        <p className="text-gray-600 md:col-span-2"><span className="font-bold text-indigo-900/70">Participantes:</span> {event.participants.join(", ")}</p>
                      )}
                      {event.institutions && event.institutions.length > 0 && (
                        <p className="text-gray-600 md:col-span-2"><span className="font-bold text-indigo-900/70">Instituciones:</span> {event.institutions.join(", ")}</p>
                      )}
                      {event.product && (
                        <p className="text-indigo-600 md:col-span-2 italic"><span className="font-bold text-indigo-900/70 not-italic">Producto:</span> {event.product}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sección Redes de Conocimiento Especializado */}
        <section id="networks" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 ${expandedSection === 'networks' ? 'expanded' : ''}`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <Globe className="text-indigo-600" /> Redes de Conocimiento Especializado
              </h2>
              <button 
                onClick={() => toggleSection('networks')}
                className="text-indigo-400 hover:text-indigo-600 transition-colors p-2"
              >
                {expandedSection === 'networks' ? <ChevronUp size={20} className="md:w-[24px]" /> : <ChevronDown size={20} className="md:w-[24px]" />}
              </button>
            </div>

            <div className="expandable-content">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PROFESSOR_DATA.networks.map((network, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <span className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 rounded ${network.type === 'Real' ? 'text-indigo-600 bg-indigo-50' : 'text-purple-600 bg-purple-50'}`}>
                        Red {network.type}
                      </span>
                      <span className="text-xs font-bold text-gray-500">{network.date}</span>
                    </div>
                    <h3 className="font-semibold text-lg group-hover:text-indigo-800 transition-colors mb-4">
                      {network.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <MapPin size={16} className="text-indigo-400" />
                      <span>{network.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sección Impacto Social y Apropiación del Conocimiento */}
        <section id="social" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 ${expandedSection === 'social' ? 'expanded' : ''}`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <Users className="text-indigo-600" /> Impacto Social y Apropiación del Conocimiento
              </h2>
              <button 
                onClick={() => toggleSection('social')}
                className="text-indigo-400 hover:text-indigo-600 transition-colors p-2"
              >
                {expandedSection === 'social' ? <ChevronUp size={20} className="md:w-[24px]" /> : <ChevronDown size={20} className="md:w-[24px]" />}
              </button>
            </div>

            <div className="expandable-content">
              <div className="space-y-6">
                {PROFESSOR_DATA.socialImpact.map((item, idx) => (
                  <div key={idx} className="p-6 md:p-8 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-all group">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                      <div className="flex flex-wrap gap-2">
                        <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                          Apropiación Social del Conocimiento
                        </span>
                        <span className="text-[10px] uppercase tracking-widest font-bold text-pink-600 bg-pink-50 px-2 py-0.5 rounded">
                          Interés Social
                        </span>
                      </div>
                      <span className="text-xs font-bold text-gray-500">{item.date}</span>
                    </div>
                    <h3 className="font-semibold text-lg md:text-xl group-hover:text-indigo-800 transition-colors mb-4">
                      {item.title}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
                      <div className="space-y-2">
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Licencia:</span> {item.license}</p>
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Formato:</span> {item.format}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Proyecto:</span> {item.project}</p>
                        <a 
                          href={item.verification} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-800 font-bold transition-colors"
                        >
                          Verificación <ExternalLink size={16} />
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sección Producciones de Contenido Digital Audiovisual */}
        <section id="audiovisual" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 ${expandedSection === 'audiovisual' ? 'expanded' : ''}`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <Library className="text-indigo-600" /> Producciones Audiovisuales
              </h2>
              <button 
                onClick={() => toggleSection('audiovisual')}
                className="text-indigo-400 hover:text-indigo-600 transition-colors p-2"
              >
                {expandedSection === 'audiovisual' ? <ChevronUp size={20} className="md:w-[24px]" /> : <ChevronDown size={20} className="md:w-[24px]" />}
              </button>
            </div>

            <div className="expandable-content">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PROFESSOR_DATA.digitalContent.map((item, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-all group flex flex-col">
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        Cápsula de Video
                      </span>
                      <span className="text-xs font-bold text-gray-500">{item.date}</span>
                    </div>
                    <h3 className="font-semibold text-lg group-hover:text-indigo-800 transition-colors mb-4 flex-grow">
                      {item.title}
                    </h3>
                    <div className="space-y-3 mt-auto">
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <MapPin size={14} className="text-indigo-400" />
                        <span>{item.location}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-600">
                        <Globe size={14} className="text-blue-400" />
                        <span>Circulación {item.circulation}</span>
                      </div>
                      <p className="text-[10px] text-gray-500 italic line-clamp-2">
                        <span className="font-bold not-italic">Proyecto:</span> {item.project}
                      </p>
                      <a 
                        href={item.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="w-full py-2 rounded-xl bg-indigo-600 text-white text-center text-sm font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2"
                      >
                        Ver en YouTube <ExternalLink size={14} />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sección Artículos */}
        <section id="articles" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 ${expandedSection === 'articles' ? 'expanded' : ''}`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <FileText className="text-indigo-600" /> Artículos
              </h2>
              <button 
                onClick={() => toggleSection('articles')}
                className="text-indigo-400 hover:text-indigo-600 transition-colors p-2"
              >
                {expandedSection === 'articles' ? <ChevronUp size={20} className="md:w-[24px]" /> : <ChevronDown size={20} className="md:w-[24px]" />}
              </button>
            </div>

            <div className="expandable-content">
              <div className="space-y-6">
                {PROFESSOR_DATA.articles.map((article, idx) => (
                  <div key={idx} className="p-6 md:p-8 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-all group">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        Artículo Publicado
                      </span>
                      <span className="text-xs font-bold text-gray-500">{article.year}</span>
                    </div>
                    <h3 className="font-semibold text-lg md:text-xl group-hover:text-indigo-800 transition-colors mb-4">
                      "{article.title}"
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
                      <div className="space-y-2">
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Autores:</span> {article.authors}</p>
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Revista:</span> {article.journal}</p>
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">ISSN:</span> {article.issn}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Editorial:</span> {article.publisher}</p>
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Detalles:</span> {article.details}</p>
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">País:</span> {article.location}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sección Textos en publicaciones no científicas */}
        <section id="divulgation" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 ${expandedSection === 'divulgation' ? 'expanded' : ''}`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <BookOpen className="text-indigo-600" /> Publicaciones de Divulgación
              </h2>
              <button 
                onClick={() => toggleSection('divulgation')}
                className="text-indigo-400 hover:text-indigo-600 transition-colors p-2"
              >
                {expandedSection === 'divulgation' ? <ChevronUp size={20} className="md:w-[24px]" /> : <ChevronDown size={20} className="md:w-[24px]" />}
              </button>
            </div>

            <div className="expandable-content">
              <div className="space-y-6">
                {PROFESSOR_DATA.nonScientificArticles.map((article, idx) => (
                  <div key={idx} className="p-6 md:p-8 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-all group">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        Artículo de Divulgación
                      </span>
                      <span className="text-xs font-bold text-gray-500">{article.year}</span>
                    </div>
                    <h3 className="font-semibold text-lg md:text-xl group-hover:text-indigo-800 transition-colors mb-4">
                      "{article.title}"
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
                      <div className="space-y-2">
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Autores:</span> {article.authors}</p>
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Revista:</span> {article.journal}</p>
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">ISSN:</span> {article.issn}</p>
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Volumen:</span> {article.volume}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Páginas:</span> {article.pages}</p>
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">País:</span> {article.location}</p>
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Áreas:</span> {article.areas}</p>
                      </div>
                      {article.keywords && (
                        <div className="md:col-span-2 mt-2">
                          <p className="text-xs font-bold text-indigo-900/70 mb-2">Palabras clave:</p>
                          <div className="flex flex-wrap gap-2">
                            {article.keywords.map((word, i) => (
                              <span key={i} className="text-[10px] bg-white/40 px-2 py-1 rounded-full border border-white/50 text-gray-700">
                                {word}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sección Libros de divulgación y/o Compilación de divulgación */}
        <section id="divulgation-books" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 ${expandedSection === 'divulgation-books' ? 'expanded' : ''}`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <Book className="text-indigo-600" /> Libros de Divulgación
              </h2>
              <button 
                onClick={() => toggleSection('divulgation-books')}
                className="text-indigo-400 hover:text-indigo-600 transition-colors p-2"
              >
                {expandedSection === 'divulgation-books' ? <ChevronUp size={20} className="md:w-[24px]" /> : <ChevronDown size={20} className="md:w-[24px]" />}
              </button>
            </div>

            <div className="expandable-content">
              <div className="space-y-6">
                {PROFESSOR_DATA.divulgationBooks.map((book, idx) => (
                  <div key={idx} className="p-6 md:p-8 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-all group">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        Libro de Divulgación / Compilación
                      </span>
                      <span className="text-xs font-bold text-gray-500">{book.year}</span>
                    </div>
                    <h3 className="font-semibold text-lg md:text-xl group-hover:text-indigo-800 transition-colors mb-4">
                      "{book.title}"
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
                      <div className="space-y-2">
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">ISBN:</span> {book.isbn}</p>
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Medio:</span> {book.medium}</p>
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Editorial:</span> {book.publisher}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Lugar:</span> {book.location}</p>
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Áreas:</span> {book.areas}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sección Informes de Investigación */}
        <section id="reports" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 ${expandedSection === 'reports' ? 'expanded' : ''}`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <FileText className="text-indigo-600" /> Informes de Investigación
              </h2>
              <button 
                onClick={() => toggleSection('reports')}
                className="text-indigo-400 hover:text-indigo-600 transition-colors p-2"
              >
                {expandedSection === 'reports' ? <ChevronUp size={20} className="md:w-[24px]" /> : <ChevronDown size={20} className="md:w-[24px]" />}
              </button>
            </div>

            <div className="expandable-content">
              <div className="space-y-6">
                {PROFESSOR_DATA.researchReports.map((report, idx) => (
                  <div key={idx} className="p-6 md:p-8 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-all group">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        Producción Técnica - Informe
                      </span>
                      <span className="text-xs font-bold text-gray-500">{report.year}</span>
                    </div>
                    <h3 className="font-semibold text-lg md:text-xl group-hover:text-indigo-800 transition-colors mb-4">
                      {report.title}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm md:text-base">
                      <div className="space-y-2">
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Autores:</span> {report.authors}</p>
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">País:</span> {report.location}</p>
                      </div>
                      <div className="space-y-2">
                        <p className="text-gray-600"><span className="font-bold text-indigo-900/70">Áreas:</span> {report.areas}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sección Obras o productos */}
        <section id="artistic" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 ${expandedSection === 'artistic' ? 'expanded' : ''}`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <Award className="text-indigo-600" /> Obras o Productos
              </h2>
              <button 
                onClick={() => toggleSection('artistic')}
                className="text-indigo-400 hover:text-indigo-600 transition-colors p-2"
              >
                {expandedSection === 'artistic' ? <ChevronUp size={20} className="md:w-[24px]" /> : <ChevronDown size={20} className="md:w-[24px]" />}
              </button>
            </div>

            <div className="expandable-content">
              <div className="space-y-8">
                {PROFESSOR_DATA.artisticWorks.map((work, idx) => (
                  <div key={idx} className="p-6 md:p-8 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-all group">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        Obra / Producto Artístico
                      </span>
                      <span className="text-xs font-bold text-gray-500">{work.date}</span>
                    </div>
                    <h3 className="font-semibold text-xl md:text-2xl group-hover:text-indigo-800 transition-colors mb-4">
                      {work.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-600 mb-6">
                      <span className="font-bold text-indigo-900/70">Disciplina:</span> {work.discipline}
                    </p>
                    
                    <div className="mt-6 border-t border-white/30 pt-6">
                      <h4 className="text-xs font-bold text-indigo-900/70 uppercase tracking-widest mb-4">Instancias de Valoración</h4>
                      <div className="grid grid-cols-1 gap-4">
                        {work.validations.map((val, i) => (
                          <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-white/30 border border-white/40">
                            <div className="w-8 h-8 rounded-lg bg-indigo-100 flex items-center justify-center text-indigo-600 shrink-0">
                              <Calendar size={16} />
                            </div>
                            <div>
                              <p className="font-bold text-sm text-gray-800">{val.event}</p>
                              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1">
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Calendar size={12} /> {val.date}
                                </span>
                                <span className="text-xs text-gray-500 flex items-center gap-1">
                                  <Gavel size={12} /> {val.institution}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sección Proyectos */}
        <section id="projects" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 ${expandedSection === 'projects' ? 'expanded' : ''}`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <Briefcase className="text-indigo-600" /> Proyectos
              </h2>
              <button 
                onClick={() => toggleSection('projects')}
                className="text-indigo-400 hover:text-indigo-600 transition-colors p-2"
              >
                {expandedSection === 'projects' ? <ChevronUp size={20} className="md:w-[24px]" /> : <ChevronDown size={20} className="md:w-[24px]" />}
              </button>
            </div>

            <div className="expandable-content">
              <div className="space-y-8">
                {PROFESSOR_DATA.projects.map((project, idx) => (
                  <div key={idx} className="p-6 md:p-8 rounded-2xl bg-white/20 border border-white/30 hover:bg-white/40 transition-all group">
                    <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-6">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
                        {project.type}
                      </span>
                      <span className="text-xs font-bold text-gray-500">
                        {project.start} — {project.end}
                      </span>
                    </div>
                    <h3 className="font-semibold text-xl md:text-2xl group-hover:text-indigo-800 transition-colors mb-4 leading-tight">
                      {project.title}
                    </h3>
                    <div className="mt-4 p-4 md:p-6 rounded-xl bg-white/30 border border-white/40">
                      <h4 className="text-xs font-bold text-indigo-900/70 uppercase tracking-widest mb-3">Resumen del Proyecto</h4>
                      <p className="text-sm md:text-base text-gray-700 leading-relaxed text-justify">
                        {project.summary}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sección Formación Complementaria */}
        <section id="complementary" className={`scroll-mt-20 md:scroll-mt-28 transition-all duration-500 ${expandedSection === 'complementary' ? 'expanded' : ''}`}>
          <div className="glass rounded-3xl p-6 md:p-12">
            <div className="flex justify-between items-center mb-6 md:mb-8">
              <h2 className="serif text-2xl md:text-3xl font-bold flex items-center gap-3">
                <FileText className="text-indigo-600" /> Formación Complementaria
              </h2>
              <button 
                onClick={() => toggleSection('complementary')}
                className="text-indigo-400 hover:text-indigo-600 transition-colors p-2"
              >
                {expandedSection === 'complementary' ? <ChevronUp size={20} className="md:w-[24px]" /> : <ChevronDown size={20} className="md:w-[24px]" />}
              </button>
            </div>

            <div className="expandable-content">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {PROFESSOR_DATA.complementary.map((item, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-white/10 border border-white/20 flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
                      {item.year.slice(-2)}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold">{item.title}</h4>
                      <p className="text-xs text-gray-500">{item.institution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sección Hub de Productos (Publicaciones) */}
        <section id="products" className="scroll-mt-20 md:scroll-mt-28">
          <div className="glass rounded-3xl p-6 md:p-12">
            <h2 className="serif text-2xl md:text-3xl font-bold mb-8 md:mb-12 flex items-center gap-3">
              <BookOpen className="text-indigo-600" /> Publicaciones
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {PROFESSOR_DATA.products.map((product) => (
                <motion.div 
                  key={product.id}
                  whileHover={{ y: -5 }}
                  className="group relative glass rounded-2xl overflow-hidden flex flex-col sm:flex-row h-full"
                >
                  <div className="w-full sm:w-2/5 h-48 sm:h-auto overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <a 
                      href={product.link} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="p-6 md:p-8 flex-1 flex flex-col justify-start group/content"
                    >
                      <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-indigo-500 mb-3 block">
                        {product.type}
                      </span>
                      <h3 className="serif text-xl md:text-2xl font-bold mb-4 group-hover/content:text-indigo-600 transition-colors leading-tight">
                        {product.title}
                      </h3>
                      <p className="text-sm md:text-base text-gray-600 line-clamp-3 md:line-clamp-4 leading-relaxed">
                        {product.description}
                      </p>
                    </a>
                    <a 
                      href={product.link} 
                      className="w-full py-4 md:py-5 bg-indigo-600/5 hover:bg-indigo-600/10 border-t border-white/40 text-indigo-700 font-bold flex items-center justify-center gap-3 transition-all duration-300 group/btn"
                    >
                      Ver más <ExternalLink size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="max-w-5xl mx-auto px-4 md:px-6 py-8 md:py-12 text-center">
        <div className="glass rounded-full px-6 md:px-8 py-3 md:py-4 inline-block">
          <p className="text-[10px] md:text-sm text-gray-500">
            © {new Date().getFullYear()} {PROFESSOR_DATA.name} — Humanidades & Arte
          </p>
        </div>
      </footer>
    </div>
  );
}
