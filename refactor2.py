import os

def main():
    with open("src/App.tsx", "r", encoding="utf-8") as f:
        lines = f.readlines()

    os.makedirs("src/components/sections", exist_ok=True)

    # 1. Extraer Footer
    footer_lines = lines[1277:1285]
    footer_content = [
        "import { PROFESSOR_DATA } from '../../data/professorData';\n\n",
        "export default function Footer() {\n",
        "  return (\n"
    ] + [f"    {line}" for line in footer_lines] + [
        "  );\n",
        "}\n"
    ]
    with open("src/components/sections/Footer.tsx", "w", encoding="utf-8") as f:
        f.writelines(footer_content)

    # 2. Extraer HeroSection
    hero_lines = lines[408:498]
    hero_content = [
        "import { MapPin, Mail, Linkedin, Library } from 'lucide-react';\n",
        "import { AcademiaIcon, GoogleScholarIcon, ResearchGateIcon } from '../CustomIcons';\n",
        "import { PROFESSOR_DATA } from '../../data/professorData';\n\n",
        "export default function HeroSection() {\n",
        "  return (\n"
    ] + [f"    {line}" for line in hero_lines] + [
        "  );\n",
        "}\n"
    ]
    with open("src/components/sections/HeroSection.tsx", "w", encoding="utf-8") as f:
        f.writelines(hero_content)

    # 3. Actualizar App.tsx
    top_lines = lines[:407]
    bottom_lines = lines[498:1277]
    very_bottom = lines[1285:]

    new_app = top_lines + [
        "        <HeroSection />\n"
    ] + bottom_lines + [
        "      <Footer />\n"
    ] + very_bottom

    # Insert imports
    import_index = 0
    for i, line in enumerate(new_app):
        if line.startswith("import { PROFESSOR_DATA }"):
            import_index = i + 1
            break
            
    new_app.insert(import_index, "import HeroSection from './components/sections/HeroSection';\n")
    new_app.insert(import_index, "import Footer from './components/sections/Footer';\n")

    with open("src/App.tsx", "w", encoding="utf-8") as f:
        f.writelines(new_app)

    print("HeroSection y Footer extraidos exitosamente.")

if __name__ == "__main__":
    main()
