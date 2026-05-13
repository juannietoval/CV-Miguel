"""
Extrae los 9 componentes restantes de App.tsx en una sola pasada.
No elimina ni modifica ningun caracter del contenido JSX original.
"""

import os

def write_section(name, imports_block, section_lines):
    """Escribe un componente de seccion en src/components/sections/"""
    props_interface = (
        "interface SectionProps {\n"
        "  expandedSection: string | null;\n"
        "  toggleSection: (section: string) => void;\n"
        "}\n\n"
    )
    content = (
        imports_block
        + props_interface
        + f"export default function {name}({{ expandedSection, toggleSection }}: SectionProps) {{\n"
        + "  return (\n"
        + "".join(section_lines)
        + "  );\n"
        + "}\n"
    )
    path = f"src/components/sections/{name}.tsx"
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  OK {path}")


def main():
    with open("src/App.tsx", "r", encoding="utf-8") as f:
        lines = f.readlines()

    os.makedirs("src/components/sections", exist_ok=True)

    # ─────────────────────────────────────────────────────────────────────────
    # Ranges are ZERO-BASED [start, end)  (lines[] indices)
    # These match the line numbers shown in the file view minus 1.
    # ─────────────────────────────────────────────────────────────────────────

    # SocialImpactSection  → App.tsx lines 72-127  → idx 71:127
    write_section(
        "SocialImpactSection",
        "import { Users, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';\n"
        "import { PROFESSOR_DATA } from '../../data/professorData';\n\n",
        lines[71:127],
    )

    # AudiovisualSection   → App.tsx lines 129-183  → idx 128:183
    write_section(
        "AudiovisualSection",
        "import { Library, MapPin, Globe, ExternalLink, ChevronDown, ChevronUp } from 'lucide-react';\n"
        "import { PROFESSOR_DATA } from '../../data/professorData';\n\n",
        lines[128:183],
    )

    # ArticlesSection      → App.tsx lines 185-230  → idx 184:230
    write_section(
        "ArticlesSection",
        "import { FileText, ChevronDown, ChevronUp } from 'lucide-react';\n"
        "import { PROFESSOR_DATA } from '../../data/professorData';\n\n",
        lines[184:230],
    )

    # DivulgationSection   → App.tsx lines 232-290  → idx 231:290
    write_section(
        "DivulgationSection",
        "import { BookOpen, ChevronDown, ChevronUp } from 'lucide-react';\n"
        "import { PROFESSOR_DATA } from '../../data/professorData';\n\n",
        lines[231:290],
    )

    # DivulgationBooksSection → App.tsx lines 292-336  → idx 291:336
    write_section(
        "DivulgationBooksSection",
        "import { Book, ChevronDown, ChevronUp } from 'lucide-react';\n"
        "import { PROFESSOR_DATA } from '../../data/professorData';\n\n",
        lines[291:336],
    )

    # ReportsSection       → App.tsx lines 338-380  → idx 337:380
    write_section(
        "ReportsSection",
        "import { FileText, ChevronDown, ChevronUp } from 'lucide-react';\n"
        "import { PROFESSOR_DATA } from '../../data/professorData';\n\n",
        lines[337:380],
    )

    # ArtisticWorksSection → App.tsx lines 382-442  → idx 381:442
    write_section(
        "ArtisticWorksSection",
        "import { Award, Calendar, Gavel, ChevronDown, ChevronUp } from 'lucide-react';\n"
        "import { PROFESSOR_DATA } from '../../data/professorData';\n\n",
        lines[381:442],
    )

    # ProjectsSection      → App.tsx lines 444-485  → idx 443:485
    write_section(
        "ProjectsSection",
        "import { Briefcase, ChevronDown, ChevronUp } from 'lucide-react';\n"
        "import { PROFESSOR_DATA } from '../../data/professorData';\n\n",
        lines[443:485],
    )

    # ProductsSection      → App.tsx lines 489-539  → idx 488:539
    # Note: ProductsSection has no toggleSection (no expandable), but we keep the
    # same SectionProps interface so App.tsx stays consistent.
    products_lines = lines[488:539]
    products_content = (
        "import { BookOpen, ExternalLink } from 'lucide-react';\n"
        "import { motion } from 'motion/react';\n"
        "import { PROFESSOR_DATA } from '../../data/professorData';\n\n"
        "export default function ProductsSection() {\n"
        "  return (\n"
        + "".join(products_lines)
        + "  );\n"
        + "}\n"
    )
    with open("src/components/sections/ProductsSection.tsx", "w", encoding="utf-8") as f:
        f.write(products_content)
    print("  OK src/components/sections/ProductsSection.tsx")

    # ─────────────────────────────────────────────────────────────────────────
    # Build the new App.tsx
    # Keep: lines 0-70  (header + already-extracted components up to NetworksSection)
    # Replace lines 71-539 with component tags
    # Keep: lines 539-end  (</main>, <Footer />, etc.)
    # ─────────────────────────────────────────────────────────────────────────
    app_head = lines[:70]

    app_components = [
        "\n",
        "        <SocialImpactSection expandedSection={expandedSection} toggleSection={toggleSection} />\n",
        "        <AudiovisualSection expandedSection={expandedSection} toggleSection={toggleSection} />\n",
        "        <ArticlesSection expandedSection={expandedSection} toggleSection={toggleSection} />\n",
        "        <DivulgationSection expandedSection={expandedSection} toggleSection={toggleSection} />\n",
        "        <DivulgationBooksSection expandedSection={expandedSection} toggleSection={toggleSection} />\n",
        "        <ReportsSection expandedSection={expandedSection} toggleSection={toggleSection} />\n",
        "        <ArtisticWorksSection expandedSection={expandedSection} toggleSection={toggleSection} />\n",
        "        <ProjectsSection expandedSection={expandedSection} toggleSection={toggleSection} />\n",
        "        <ComplementarySection expandedSection={expandedSection} toggleSection={toggleSection} />\n",
        "        <ProductsSection />\n",
    ]

    app_tail = lines[539:]   # </main>, <Footer />, </div>, );, }

    new_app = app_head + app_components + app_tail

    # Insert import statements right after the existing import for HeroSection
    new_imports = [
        "import SocialImpactSection from './components/sections/SocialImpactSection';\n",
        "import AudiovisualSection from './components/sections/AudiovisualSection';\n",
        "import ArticlesSection from './components/sections/ArticlesSection';\n",
        "import DivulgationSection from './components/sections/DivulgationSection';\n",
        "import DivulgationBooksSection from './components/sections/DivulgationBooksSection';\n",
        "import ReportsSection from './components/sections/ReportsSection';\n",
        "import ArtisticWorksSection from './components/sections/ArtisticWorksSection';\n",
        "import ProjectsSection from './components/sections/ProjectsSection';\n",
        "import ProductsSection from './components/sections/ProductsSection';\n",
    ]

    insert_idx = next(
        i for i, l in enumerate(new_app) if l.startswith("import HeroSection")
    )
    for imp in reversed(new_imports):
        new_app.insert(insert_idx, imp)

    with open("src/App.tsx", "w", encoding="utf-8") as f:
        f.writelines(new_app)

    print("\nApp.tsx actualizado.")


if __name__ == "__main__":
    main()
