import os
import sys

def main():
    try:
        with open("src/App.tsx", "r", encoding="utf-8") as f:
            lines = f.readlines()

        # Extraer líneas 33 a 1802 (índices 32 a 1801 inclusive)
        data_lines = lines[32:1802]
        
        # Modificar para exportar la constante
        data_lines[1] = data_lines[1].replace("const PROFESSOR_DATA = {", "export const PROFESSOR_DATA = {")

        os.makedirs("src/data", exist_ok=True)
        with open("src/data/professorData.ts", "w", encoding="utf-8") as f:
            f.writelines(data_lines)

        # Reensamblar App.tsx
        top_lines = lines[:32]
        bottom_lines = lines[1802:]
        new_app_lines = top_lines + ["import { PROFESSOR_DATA } from './data/professorData';\n", "\n"] + bottom_lines

        with open("src/App.tsx", "w", encoding="utf-8") as f:
            f.writelines(new_app_lines)
            
        print("Refactorización exitosa.")
    except Exception as e:
        print(f"Error: {e}")

if __name__ == "__main__":
    main()
