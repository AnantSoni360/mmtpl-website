import urllib.request

urls = [
    'https://images.unsplash.com/photo-1541888087425-ce81df82194a?w=150&h=150&fit=crop',
    'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=150&h=150&fit=crop',
    'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=150&h=150&fit=crop',
    'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=150&h=150&fit=crop',
    'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=150&h=150&fit=crop',
    'https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=150&h=150&fit=crop',
    'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=150&h=150&fit=crop',
    'https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=150&h=150&fit=crop',
    'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop',
    'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?w=150&h=150&fit=crop',
    'https://images.unsplash.com/photo-1588557132645-ff567110cafd?w=150&h=150&fit=crop',
    'https://images.unsplash.com/photo-1581092335878-2d9fd86aecf3?w=150&h=150&fit=crop'
]

for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req)
        print(f"OK: {url}")
    except Exception as e:
        print(f"FAIL: {url} - {e}")
