import re

def isValidUrl(url):
    regex = re.search("^https?:\/\/.*\.(gif|jpe?g|tiff?|png|webp|bmp)$")
    return regex
