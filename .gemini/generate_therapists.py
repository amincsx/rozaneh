import os
import json
import re

def generate_therapist_data(base_path):
    therapists = []
    excluded_names = ["دکتر محمد رضایی", "دکتر سارا احمدی", "دکتر نیلوفر کریمی"]

    for i in range(1, 21):
        folder_path = os.path.join(base_path, str(i))
        text_file_path = os.path.join(folder_path, "New Text Document.txt")
        image_path = None

        # Find image file
        for filename in os.listdir(folder_path):
            if filename.endswith((".png", ".jpg", ".jpeg")):
                image_path = f"/psychologists/{i}/{filename}"
                break

        if os.path.exists(text_file_path):
            with open(text_file_path, 'r', encoding='utf-8') as f:
                content = f.read().strip()
            
            name = "Unknown Therapist"
            bio_parts = []
            specializations = []

            lines = [line.strip() for line in content.split('\n') if line.strip()]

            if not lines: # Handle empty file
                continue

            first_line = lines[0]

            # Attempt to parse name from the first line
            if " - " in first_line:
                parts = first_line.split(" - ", 1)
                name = parts[0].strip()
                bio_parts.append(parts[1].strip())
            else:
                name = first_line
            
            # If only name in file, provide default bio/specialization
            if len(lines) == 1 and name == first_line:
                bio = f"{name} - متخصص مشاوره فردی"
                specializations = ["مشاوره فردی"]
            else:
                # Collect all lines as potential bio parts and specializations
                for j, line in enumerate(lines):
                    if j == 0 and " - " in line: # Skip the part of the first line already used as name
                        continue
                    
                    # Heuristic for specializations: short lines, or starting with keywords
                    if len(line) < 60 and (re.search(r'^(مشاوره|درمان|متخصص|اختلالات|روانشناس)', line) or not re.search(r'[.!؟]', line)):
                        specializations.append(line.replace('(', '').replace(')', '').strip())
                    bio_parts.append(line)
                bio = " ".join(bio_parts).replace('\n', ' ').replace('\r', '').strip()

            if name in excluded_names:
                continue

            therapist = {
                "id": str(i),
                "name": name,
                "specializations": specializations if specializations else ["مشاوره"], # Default specialization
                "rating": 4.5,
                "experience": 10,
                "hourlyRate": 300000,
                "bio": bio if bio else f"{name} متخصص مشاوره", # Ensure bio is not empty
                "image": image_path,
                "languages": ["فارسی"],
                "availableSlots": 10
            }
            therapists.append(therapist)
    return therapists

if __name__ == "__main__":
    current_dir = os.getcwd()
    public_psychologists_path = os.path.join(current_dir, "public", "psychologists")
    
    generated_therapists = generate_therapist_data(public_psychologists_path)
    
    print(json.dumps(generated_therapists, ensure_ascii=False, indent=4))