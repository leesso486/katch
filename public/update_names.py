import os
import glob

replacements = {
    "주간 GVR - AT 6회차": "정규 GVR-68",
    "주간 GVR - AT 5회차": "정규 GVR-67",
    "주간 GVR - AT 4회차": "정규 GVR-66",
    "주간 GVR - AT 3회차": "정규 GVR-65",
    "주간 GVR - AT 2회차": "정규 GVR-64",
    "주간 GVR - AT 1회차": "정규 GVR-63",
    "GVR AT 6회차": "GVR-68",
    "GVR AT 5회차": "GVR-67",
    "GVR AT 4회차": "GVR-66",
    "GVR AT 3회차": "GVR-65",
    "GVR AT 2회차": "GVR-64",
    "GVR AT 1회차": "GVR-63",
    "AT 6회차": "GVR-68",
    "AT 5회차": "GVR-67",
    "AT 4회차": "GVR-66",
    "AT 3회차": "GVR-65",
    "AT 2회차": "GVR-64",
    "AT 1회차": "GVR-63",
    "GVR AT6": "GVR-68",
    "GVR AT5": "GVR-67",
    "GVR AT4": "GVR-66",
    "GVR AT3": "GVR-65",
    "GVR AT2": "GVR-64",
    "GVR AT1": "GVR-63",
    "AT6": "GVR-68",
    "AT5": "GVR-67",
    "AT4": "GVR-66",
    "AT3": "GVR-65",
    "AT2": "GVR-64",
    "AT1": "GVR-63",
    "GVR68": "GVR-68"
}

files = glob.glob("c:/Users/SsoHot/Desktop/수능사이트시안/katch-web/public/*.html")
files.extend(glob.glob("c:/Users/SsoHot/Desktop/수능사이트시안/katch-web/src/app/**/*.tsx", recursive=True))

for filepath in files:
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        new_content = content
        for old, new in replacements.items():
            new_content = new_content.replace(old, new)
            
        if content != new_content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filepath}")
    except Exception as e:
        print(f"Failed to process {filepath}: {e}")
