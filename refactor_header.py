import os

def main():
    with open("src/App.tsx", "r", encoding="utf-8") as f:
        lines = f.readlines()

    # Create Header.tsx
    header_imports = [
        "import { useState, useEffect } from 'react';\n",
        "import {\n",
        "  ChevronDown,\n",
        "  ChevronUp,\n",
        "  ExternalLink,\n",
        "  GraduationCap,\n",
        "  Gavel,\n",
        "  Calendar,\n",
        "  Globe,\n",
        "  Search,\n",
        "  Users,\n",
        "  Book,\n",
        "  Briefcase,\n",
        "  Library,\n",
        "  Menu,\n",
        "  X,\n",
        "  FileText,\n",
        "  BookOpen\n",
        "} from 'lucide-react';\n",
        "import { motion, AnimatePresence } from 'motion/react';\n",
        "import { PROFESSOR_DATA } from '../../data/professorData';\n\n",
        "interface HeaderProps {\n",
        "  setExpandedSection: (section: string | null) => void;\n",
        "}\n\n",
        "export default function Header({ setExpandedSection }: HeaderProps) {\n"
    ]
    
    header_state = [
        "  const [isScrolled, setIsScrolled] = useState(false);\n",
        "  const [isSearchOpen, setIsSearchOpen] = useState(false);\n",
        "  const [searchQuery, setSearchQuery] = useState('');\n",
        "  const [searchResults, setSearchResults] = useState<any[]>([]);\n",
        "  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);\n\n"
    ]
    
    # lines 46 to 127 are indices 45 to 127
    header_effects = lines[45:128]
    
    header_render_start = [
        "  return (\n",
        "    <>\n"
    ]
    
    # lines 140 to 404 are indices 139 to 404
    header_jsx = lines[139:404]
    
    # Need to add indent of 2 spaces since we wrapped in <>, but maybe it's fine
    header_render_end = [
        "    </>\n",
        "  );\n",
        "}\n"
    ]

    header_content = header_imports + header_state + header_effects + header_render_start + [f"  {line}" for line in header_jsx] + header_render_end

    with open("src/components/sections/Header.tsx", "w", encoding="utf-8") as f:
        f.writelines(header_content)

    # Modify App.tsx
    # We keep lines 0-38 (index 0-37)
    # Then we keep line 40: "  const [expandedSection, setExpandedSection] = useState<string | null>('bio');\n"
    # Then we keep lines 129-138 (index 128-138)
    # Then we insert <Header setExpandedSection={setExpandedSection} />
    # Then we keep lines 405-end (index 404-end)

    app_part1 = lines[:38]
    app_part2 = [lines[39]] # index 39 is line 40
    app_part3 = lines[128:139]
    app_part4 = ["      <Header setExpandedSection={setExpandedSection} />\n"]
    app_part5 = lines[404:]

    new_app = app_part1 + app_part2 + app_part3 + app_part4 + app_part5

    # Insert import Header
    import_index = 0
    for i, line in enumerate(new_app):
        if line.startswith("import HeroSection"):
            import_index = i
            break
            
    new_app.insert(import_index, "import Header from './components/sections/Header';\n")

    with open("src/App.tsx", "w", encoding="utf-8") as f:
        f.writelines(new_app)

    print("Header extraido exitosamente.")

if __name__ == "__main__":
    main()
