import re
import os

def extract_and_save_posts(file_path):
    # Ensure the 'posts' directory exists
    output_dir = 'posts'
    os.makedirs(output_dir, exist_ok=True)

    # Read the contents of the file
    with open(file_path, 'r', encoding='utf-8') as file:
        contents = file.read()

    # Define the pattern to match the header of a post and its publication footer
    post_pattern = re.compile(r'# (.*?)\*Bu yazi http://daron\.yondem\.com adresinde, (\d{4}-\d{1,2}-\d{1,2}) tarihinde yayinlanmistir\.\*', re.DOTALL)

    # Find all posts including their headers and footers
    posts = post_pattern.findall(contents)

    for post_content, date in posts:
        # Format the date to ensure a consistent filename format
        formatted_date = '-'.join([f"{int(part):02d}" for part in date.split('-')])
        filename = f"{formatted_date}.md"
        full_path = os.path.join(output_dir, filename)

        # Add the markdown header back to the post content
        post_content_with_header = f"# {post_content}\n*Bu yazi http://daron.yondem.com adresinde, {date} tarihinde yayinlanmistir.*"
        
        # Write the post content to a new file
        with open(full_path, 'w', encoding='utf-8') as new_file:
            new_file.write(post_content_with_header)

# Example usage
extract_and_save_posts('markdown.md')
