#!/usr/bin/env python3
import puzpy
import sys

def convert_puz_to_exolve(puz_file_path):
    # Load the .puz file
    p = puzpy.read(puz_file_path)
    
    # Start building Exolve format
    exolve = []
    exolve.append("exolve-begin")
    exolve.append(f"  exolve-id: themeless-1")
    exolve.append(f"  exolve-title: {p.title}")
    exolve.append(f"  exolve-setter: {p.author}")
    if p.copyright:
        exolve.append(f"  exolve-copyright: {p.copyright}")
    exolve.append(f"  exolve-width: {p.width}")
    exolve.append(f"  exolve-height: {p.height}")
    
    # Build the grid
    exolve.append("  exolve-grid:")
    for row in range(p.height):
        row_str = "    "
        for col in range(p.width):
            cell = p.solution[row * p.width + col]
            if cell == '.':
                row_str += "."
            else:
                row_str += cell
            if col < p.width - 1:
                row_str += " "
        exolve.append(row_str)
    
    # Add across clues
    exolve.append("  exolve-across:")
    clue_list = p.clue_numbering()
    for clue in clue_list.across:
        exolve.append(f"    {clue['num']} {clue['clue']}")
    
    # Add down clues
    exolve.append("  exolve-down:")
    for clue in clue_list.down:
        exolve.append(f"    {clue['num']} {clue['clue']}")
    
    exolve.append("exolve-end")
    
    return "\n".join(exolve)

if __name__ == "__main__":
    puz_path = "../Themeless 1 100322.puz"
    output = convert_puz_to_exolve(puz_path)
    print(output)

