import os

def main():
    with open("src/App.tsx", "r", encoding="utf-8") as f:
        lines = f.readlines()

    os.makedirs("src/components/sections", exist_ok=True)

    # Common props interface
    props_interface = [
        "interface SectionProps {\n",
        "  expandedSection: string | null;\n",
        "  toggleSection: (section: string) => void;\n",
        "}\n\n"
    ]

    # 1. Extract CvSection
    # App.tsx lines 57-92 -> index 56 to 92
    cv_lines = lines[56:92]
    cv_content = [
        "import { GraduationCap, ChevronDown, ChevronUp, Award } from 'lucide-react';\n",
        "import { PROFESSOR_DATA } from '../../data/professorData';\n\n"
    ] + props_interface + [
        "export default function CvSection({ expandedSection, toggleSection }: SectionProps) {\n",
        "  return (\n"
    ] + [f"    {line}" for line in cv_lines] + [
        "  );\n",
        "}\n"
    ]
    with open("src/components/sections/CvSection.tsx", "w", encoding="utf-8") as f:
        f.writelines(cv_content)

    # 2. Extract ExperienceSection
    # App.tsx lines 94-155 -> index 93 to 155
    exp_lines = lines[93:155]
    exp_content = [
        "import { Briefcase, ChevronDown, ChevronUp } from 'lucide-react';\n",
        "import { PROFESSOR_DATA } from '../../data/professorData';\n\n"
    ] + props_interface + [
        "export default function ExperienceSection({ expandedSection, toggleSection }: SectionProps) {\n",
        "  return (\n"
    ] + [f"    {line}" for line in exp_lines] + [
        "  );\n",
        "}\n"
    ]
    with open("src/components/sections/ExperienceSection.tsx", "w", encoding="utf-8") as f:
        f.writelines(exp_content)

    # 3. Extract ComplementarySection
    # App.tsx lines 748-779 -> index 747 to 779
    comp_lines = lines[747:779]
    comp_content = [
        "import { FileText, ChevronDown, ChevronUp } from 'lucide-react';\n",
        "import { PROFESSOR_DATA } from '../../data/professorData';\n\n"
    ] + props_interface + [
        "export default function ComplementarySection({ expandedSection, toggleSection }: SectionProps) {\n",
        "  return (\n"
    ] + [f"    {line}" for line in comp_lines] + [
        "  );\n",
        "}\n"
    ]
    with open("src/components/sections/ComplementarySection.tsx", "w", encoding="utf-8") as f:
        f.writelines(comp_content)

    # 4. Modify App.tsx
    # We replace lines 56:155 with <CvSection /> and <ExperienceSection />
    # We replace lines 747:779 with <ComplementarySection />
    
    app_part1 = lines[:56]
    app_part2 = [
        "        <CvSection expandedSection={expandedSection} toggleSection={toggleSection} />\n",
        "        <ExperienceSection expandedSection={expandedSection} toggleSection={toggleSection} />\n"
    ]
    app_part3 = lines[155:747]
    app_part4 = [
        "        <ComplementarySection expandedSection={expandedSection} toggleSection={toggleSection} />\n"
    ]
    app_part5 = lines[779:]

    new_app = app_part1 + app_part2 + app_part3 + app_part4 + app_part5

    # Insert imports
    import_statements = [
        "import CvSection from './components/sections/CvSection';\n",
        "import ExperienceSection from './components/sections/ExperienceSection';\n",
        "import ComplementarySection from './components/sections/ComplementarySection';\n"
    ]
    
    import_index = 0
    for i, line in enumerate(new_app):
        if line.startswith("import HeroSection"):
            import_index = i
            break
            
    for imp in reversed(import_statements):
        new_app.insert(import_index, imp)

    with open("src/App.tsx", "w", encoding="utf-8") as f:
        f.writelines(new_app)

    print("CvSection, ExperienceSection y ComplementarySection extraidos exitosamente.")

if __name__ == "__main__":
    main()
