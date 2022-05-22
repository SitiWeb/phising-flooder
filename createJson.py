import urllib.request # the lib that handles the url stuff
import requests
from bs4 import BeautifulSoup
import json
from pysafebrowsing import SafeBrowsing
import configparser
def check(url,config,num_threads=1):
    

    # Try to do request
    try:
        #the requst, timeout is set to 1,5 sec
        x = requests.get(url,timeout=1.5)
        
        # we skip all other response codes
        if 200 != x.status_code:
            print(x.status_code)
            return False
        
        #retieve all forms
        forms = get_all_forms(x.text)

           
        for form in forms:

            #Skip forms without action
            if None == form.get("action"):
                continue
            action = form.get("action")
            # if config['INTEGRATIONS']['sbapi']:
            #     s = SafeBrowsing(config['INTEGRATIONS']['sbapi'])
            #     r = s.lookup_urls(['url'])
            #     print(r)
            
            names = []
            inputs = (form.find_all("input"))
            for input in inputs:
                test_list = [ 'email', 'text', 'number', 'password', 'textarea','name' ]
                type = input.get('type')
                if type in test_list:
                    
                    type = process_input(input)
                    if type:
                        names.append({'input':type,'name':input.get("name") })

           
            if names:
                
                return {'names':names,'url':url.strip(),'action':action,'num_threads':num_threads}
            return False
           
            
    except:
        #print('timeout reached')
        return False
def get_all_forms(content):
    # res.html.render()
    soup = BeautifulSoup(content, "html.parser")
    return soup.find_all("form")

def process_input(input):
    name = input.get("name") 
    if name == None:
        return False
    elif 'pin' in name:
        return 'pin'
    elif 'city' in name:
        return 'city'
    elif 'street' in name:
        return 'street'
    elif 'name' in name:
        return 'name'
    elif 'mobile' in name:
        return 'phone'
    elif 'email' in name:
        return 'email'
    elif 'url' in name:
        return 'url'
    elif 'card_number' in name:
        return 'card_number'
    elif 'cvc' in name:
        return 'cvc'
    elif 'apple_id' in name:
        return 'apple_id'
    elif 'zipcode' in name:
        return 'zipcode'
    return input.get("type") 

if __name__ == "__main__":
    
    target_url = 'https://openphish.com/feed.txt'
    data = urllib.request.urlopen(target_url)
    threads = []
    file = {}
    config = configparser.ConfigParser()
    config.read('flooder.ini')
    for line in data: # files are iterable
        
        url =line.decode('UTF-8').strip()
        
        checking = check(url,config)
        
        if (checking):
            print(url,checking['names'])
            file[url]={'post':checking['names'],'action':checking['action']}

    with open('data/data.json', 'w', encoding='utf-8') as f:
        json.dump(file, f, ensure_ascii=False, indent=4)