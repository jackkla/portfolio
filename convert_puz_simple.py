#!/usr/bin/env python3
import struct
import sys

def parse_puz(filename):
    with open(filename, 'rb') as f:
        data = f.read()
    
    # Skip checksum (2 bytes)
    pos = 2
    
    # Read file magic (12 bytes) - should be "ACROSS&DOWN\x00"
    magic = data[pos:pos+12]
    pos += 12
    
    # Skip more checksums
    pos += 8
    
    # Read version string (4 bytes)
    version = data[pos:pos+4].decode('ascii', errors='ignore')
    pos += 4
    
    # Skip reserved bytes
    pos += 2
    
    # Skip scrambled checksum
    pos += 2
    
    # Skip reserved
    pos += 12
    
    # Read dimensions
    width = data[pos]
    pos += 1
    height = data[pos]
    pos += 1
    
    # Read number of clues
    num_clues = struct.unpack('<H', data[pos:pos+2])[0]
    pos += 2
    
    # Skip puzzle type and scrambled state
    pos += 2
    
    # Read solution
    solution = []
    for i in range(width * height):
        solution.append(chr(data[pos]))
        pos += 1
    
    # Read player state (skip)
    pos += width * height
    
    # Read strings (null-terminated)
    strings = []
    while pos < len(data):
        string_end = data.find(b'\x00', pos)
        if string_end == -1:
            break
        strings.append(data[pos:string_end].decode('latin-1', errors='ignore'))
        pos = string_end + 1
        if len(strings) >= num_clues + 3:  # title, author, copyright + clues
            break
    
    title = strings[0] if len(strings) > 0 else "Untitled"
    author = strings[1] if len(strings) > 1 else "Anonymous"
    copyright_text = strings[2] if len(strings) > 2 else ""
    clues = strings[3:] if len(strings) > 3 else []
    
    return {
        'width': width,
        'height': height,
        'solution': solution,
        'title': title,
        'author': author,
        'copyright': copyright_text,
        'clues': clues
    }

def solution_to_exolve(puzzle):
    output = []
    output.append("exolve-begin")
    output.append(f"  exolve-id: themeless-1")
    output.append(f"  exolve-title: {puzzle['title']}")
    output.append(f"  exolve-setter: {puzzle['author']}")
    if puzzle['copyright']:
        output.append(f"  exolve-copyright: {puzzle['copyright']}")
    output.append(f"  exolve-width: {puzzle['width']}")
    output.append(f"  exolve-height: {puzzle['height']}")
    output.append("  exolve-grid:")
    
    # Build grid
    for row in range(puzzle['height']):
        row_str = "    "
        for col in range(puzzle['width']):
            cell = puzzle['solution'][row * puzzle['width'] + col]
            row_str += cell + (" " if col < puzzle['width'] - 1 else "")
        output.append(row_str)
    
    # Split clues into across and down (simple heuristic: alternate)
    output.append("  exolve-across:")
    clue_num = 1
    for i, clue in enumerate(puzzle['clues']):
        if i % 2 == 0:  # Rough split - across clues
            output.append(f"    {clue_num} {clue}")
            clue_num += 1
    
    output.append("  exolve-down:")
    clue_num = 1
    for i, clue in enumerate(puzzle['clues']):
        if i % 2 == 1:  # Rough split - down clues
            output.append(f"    {clue_num} {clue}")
            clue_num += 1
    
    output.append("exolve-end")
    return "\n".join(output)

if __name__ == "__main__":
    puzzle = parse_puz("../Themeless 1 100322.puz")
    print(solution_to_exolve(puzzle))

