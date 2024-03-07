import os
import re

def update_image_paths(directory):
    # Define the pattern to match all markdown image syntax, capturing the alt text and the path
    img_pattern = re.compile(r'!\[(.*?)\]\((media/.+?)\)')
    
    # Iterate over each markdown file in the directory
    for filename in os.listdir(directory):
        if filename.endswith(".md"):
            file_path = os.path.join(directory, filename)
            
            # Read the content of the markdown file
            with open(file_path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            # Replace the image paths while preserving the alt text
            updated_content = img_pattern.sub(r'![\1](../\2)', content)
            
            # Write the updated content back to the file
            with open(file_path, 'w', encoding='utf-8') as file:
                file.write(updated_content)

# Example usage
update_image_paths('posts')
