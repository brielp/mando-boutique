from bs4 import BeautifulSoup
from urllib.request import urlopen
import json

pages = ["https://themandolinstore.com/product-category/inventory/a-style-mandolins/", 
"https://themandolinstore.com/product-category/inventory/a-style-mandolins/page/2/", 
"https://themandolinstore.com/product-category/inventory/f-style-mandolins/", 
"https://themandolinstore.com/product-category/inventory/f-style-mandolins/page/2/", 
"https://themandolinstore.com/product-category/inventory/f-style-mandolins/page/3/", 
"https://themandolinstore.com/product-category/inventory/oval-hole-mandolins/", 
"https://themandolinstore.com/product-category/inventory/electric-mandolins/"]

mandolin_list = set()

master_data = []

def remove_non_ascii_1(text):
    return ''.join(i for i in text if ord(i)<128)

def get_mandolin_list(page):
    html = urlopen(page).read().decode("utf-8")
    soup = BeautifulSoup(html, "html.parser")
    urls = soup.find_all(class_="woocommerce-LoopProduct-link woocommerce-loop-product__link")
    for mandolin in urls:
        if mandolin in mandolin_list:
            print("There is already this url in the mandolin_list: ", mandolin)
        else:
            mandolin_list.add(str(mandolin["href"]))

for page in pages:
    get_mandolin_list(page)

def get_mando_data(url):
    page = urlopen(url)
    html = page.read().decode("utf-8")
    soup = BeautifulSoup(html, "html.parser")
    mandolin = {}

    def has_sku(link):
        return "wp-content/uploads" in str(link)

    mandolin["title"] = remove_non_ascii_1(str(soup.find("h1", class_="product_title entry-title").string))
    mandolin["url"] = str(url)
    mandolin["brand"] = mandolin["title"].split(" ")[0].lower()
    if mandolin["brand"] == "the":
        mandolin["brand"] = " ".join(mandolin["title"].split(" ")[:2]).lower()
    mandolin["sku"] = str(soup.find(class_="sku").string)
    price = soup.find("p", class_="price")
    if price.ins:
        price_str = str(price.ins.span.get_text())
    else:
        price_str = str(price.get_text())
        
    mandolin["price"] = float(price_str.replace(',','')[1:])
    mandolin["description"] = remove_non_ascii_1(str(soup.find(class_="woocommerce-product-details__short-description").p.get_text(strip="True")))
    video = soup.find("iframe")
    if video:
        mandolin["video"] = str(video["src"])
    else:
        mandolin["video"] = None
    images = soup.find_all("a", href=has_sku) ## need to solve for when image does not contain SKU
    tags = soup.find_all("a", rel="tag")
    features = soup.find(class_="woocommerce-Tabs-panel woocommerce-Tabs-panel--description panel entry-content wc-tab").get_text("\n", strip="True")
    mandolin["tags"] = []
    for tag in tags:
        mandolin["tags"].append(str(tag.string))

    mandolin["images"] = []
    for img in images:
        mandolin["images"].append(str(img["href"]))

    mandolin["features"] = remove_non_ascii_1(str(features)).split("\n")
    if mandolin["features"][0] == "Description":
        mandolin["features"] = mandolin["features"][1:]
    
    return mandolin

i = 0
for link in mandolin_list:
    try:
        mandolin_data = get_mando_data(link)
        master_data.append(mandolin_data)
        i += 1
        print(f"Data added. {i}/{len(mandolin_list)} completed")

    except Exception as e:
        i += 1
        print(f'This link has an error: {link}')
        print(f'Error: {e}')

with open('data.json', 'w') as outfile:
    json.dump(master_data, outfile)
