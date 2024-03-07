import os
import re

def update_image_paths(directory):
    # Define the pattern to match all markdown image syntax, including those with line breaks and trailing backslashes
    # This pattern accounts for line breaks within the alt text and optional backslashes at the end
    img_pattern = re.compile(r'!\[(.*?)\]\(\s*(media/.+?)\s*\)(\\)?', re.DOTALL)
    
    # Iterate over each markdown file in the directory
    for filename in os.listdir(directory):
        if filename.endswith(".md"):
            file_path = os.path.join(directory, filename)
            
            # Read the content of the markdown file
            with open(file_path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # Replace the image paths while preserving the alt text and handling trailing backslashes
            updated_content = img_pattern.sub(lambda match: f'![{match.group(1)}](../{match.group(2)})' + ('\\' if match.group(3) else ''), content)
            
            # Write the updated content back to the file
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(updated_content)

# Example usage
update_image_paths('posts')
