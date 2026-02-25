import re
import glob

# Regex to catch emojis safely without external libraries
emoji_range = (
    r'['
    r'\U00010000-\U0010ffff'
    r'\u2600-\u27BF'
    r'\u2300-\u23FF'
    r'\u2B50\u2B55'
    r'\u2934\u2935'
    r'\u2B05-\u2B07'
    r'\u2194\u2195'
    r'\u25AA\u25AB\u25FB-\u25FE\u25B6\u25C0'
    r'\u3297\u3299'
    r'\u23F0\u23F3\u231A\u231B'
    r']+'
)
emoji_pattern = re.compile(emoji_range)

# We want to replace emojis ONLY if they're NOT inside <script>...</script> or <style>...</style>
# A basic state machine approach is safest: parse HTML manually to handle states.
def replace_emojis(html):
    in_script = False
    in_style = False
    in_tag = False
    new_chars = []
    
    i = 0
    while i < len(html):
        # Check script / style tags
        if not in_tag and not in_script and not in_style:
            if html[i:i+7].lower() == '<script':
                in_script = True
                new_chars.append(html[i])
                i += 1
                continue
            if html[i:i+6].lower() == '<style':
                in_style = True
                new_chars.append(html[i])
                i += 1
                continue
            if html[i] == '<':
                in_tag = True
                new_chars.append(html[i])
                i += 1
                continue
        elif in_script:
            if html[i:i+9].lower() == '</script>':
                in_script = False
            new_chars.append(html[i])
            i += 1
            continue
        elif in_style:
            if html[i:i+8].lower() == '</style>':
                in_style = False
            new_chars.append(html[i])
            i += 1
            continue
        elif in_tag:
            if html[i] == '>':
                in_tag = False
            new_chars.append(html[i])
            i += 1
            continue
            
        # If we are here, we are inside normal text!
        match = emoji_pattern.match(html, i)
        if match:
            new_chars.append('<img src="" alt="" class="emoji-placeholder">')
            i = match.end()
        else:
            new_chars.append(html[i])
            i += 1
            
    return "".join(new_chars)

for filepath in glob.glob('*.html'):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = replace_emojis(content)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
        
print("Replaced emojis with img tags cleanly.")
