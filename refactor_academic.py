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

    # 1. Extract TutoringSection
    # App.tsx lines 63-104 -> index 62 to 104
    tutoring_lines = lines[62:104]
    tutoring_content = [
        "import { Users, ChevronDown, ChevronUp } from 'lucide-react';\n",
        "import { PROFESSOR_DATA } from '../../data/professorData';\n\n"
    ] + props_interface + [
        "export default function TutoringSection({ expandedSection, toggleSection }: SectionProps) {\n",
        "  return (\n"
    ] + [f"    {line}" for line in tutoring_lines] + [
        "  );\n",
        "}\n"
    ]
    with open("src/components/sections/TutoringSection.tsx", "w", encoding="utf-8") as f:
        f.writelines(tutoring_content)

    # 2. Extract JurySection
    # App.tsx lines 106-145 -> index 105 to 145
    jury_lines = lines[105:145]
    jury_content = [
        "import { Gavel, ChevronDown, ChevronUp } from 'lucide-react';\n",
        "import { PROFESSOR_DATA } from '../../data/professorData';\n\n"
    ] + props_interface + [
        "export default function JurySection({ expandedSection, toggleSection }: SectionProps) {\n",
        "  return (\n"
    ] + [f"    {line}" for line in jury_lines] + [
        "  );\n",
        "}\n"
    ]
    with open("src/components/sections/JurySection.tsx", "w", encoding="utf-8") as f:
        f.writelines(jury_content)

    # 3. Extract EventsSection
    # App.tsx lines 147-198 -> index 146 to 198
    events_lines = lines[146:198]
    events_content = [
        "import { Calendar, ChevronDown, ChevronUp } from 'lucide-react';\n",
        "import { PROFESSOR_DATA } from '../../data/professorData';\n\n"
    ] + props_interface + [
        "export default function EventsSection({ expandedSection, toggleSection }: SectionProps) {\n",
        "  return (\n"
    ] + [f"    {line}" for line in events_lines] + [
        "  );\n",
        "}\n"
    ]
    with open("src/components/sections/EventsSection.tsx", "w", encoding="utf-8") as f:
        f.writelines(events_content)

    # 4. Extract NetworksSection
    # App.tsx lines 200-237 -> index 199 to 237
    networks_lines = lines[199:237]
    networks_content = [
        "import { Globe, MapPin, ChevronDown, ChevronUp } from 'lucide-react';\n",
        "import { PROFESSOR_DATA } from '../../data/professorData';\n\n"
    ] + props_interface + [
        "export default function NetworksSection({ expandedSection, toggleSection }: SectionProps) {\n",
        "  return (\n"
    ] + [f"    {line}" for line in networks_lines] + [
        "  );\n",
        "}\n"
    ]
    with open("src/components/sections/NetworksSection.tsx", "w", encoding="utf-8") as f:
        f.writelines(networks_content)

    # 5. Modify App.tsx
    # We replace lines 62:237 with the 4 components.
    app_part1 = lines[:62]
    app_part2 = [
        "        <TutoringSection expandedSection={expandedSection} toggleSection={toggleSection} />\n",
        "        <JurySection expandedSection={expandedSection} toggleSection={toggleSection} />\n",
        "        <EventsSection expandedSection={expandedSection} toggleSection={toggleSection} />\n",
        "        <NetworksSection expandedSection={expandedSection} toggleSection={toggleSection} />\n"
    ]
    app_part3 = lines[237:]

    new_app = app_part1 + app_part2 + app_part3

    # Insert imports
    import_statements = [
        "import TutoringSection from './components/sections/TutoringSection';\n",
        "import JurySection from './components/sections/JurySection';\n",
        "import EventsSection from './components/sections/EventsSection';\n",
        "import NetworksSection from './components/sections/NetworksSection';\n"
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

    print("Componentes Académicos extraidos exitosamente.")

if __name__ == "__main__":
    main()
