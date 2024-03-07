import os
import re

def create_markdown_table(directory):
    # Start of the markdown table
    table_content = "| Blog Post Title | Date |\n| --- | --- |\n"
    
    # Regex to match the first level 1 header in markdown files
    header_pattern = re.compile(r'^#\s+(.*)$', re.MULTILINE)

    # List to store each row of the table for sorting by date later
    rows = []

    # Iterate over each markdown file in the directory
    for filename in sorted(os.listdir(directory)):
        if filename.endswith(".md"):
            file_path = os.path.join(directory, filename)
            with open(file_path, 'r', encoding='utf-8') as file:
                content = file.read()
                header_match = header_pattern.search(content)
                if header_match:
                    # Extracting the header content
                    header_content = header_match.group(1)
                    # Extracting the date from the filename
                    date = filename[:-3]  # Remove the .md extension
                    # Construct the markdown link
                    link = f"[{header_content}](./posts/{filename})"
                    # Add to the rows list
                    rows.append((date, link))

    # Sort rows by date
    rows.sort(key=lambda x: x[0])

    # Add each row to the table content
    for date, link in rows:
        table_content += f"| {link} | {date} |\n"
    
    # Write the table to TOC.md file
    toc_file_path = os.path.join(directory, "TOC.md")
    with open(toc_file_path, 'w', encoding='utf-8') as toc_file:
        toc_file.write(table_content)

# Example usage
create_markdown_table('posts')
