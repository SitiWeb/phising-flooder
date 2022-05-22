import configparser
config = configparser.ConfigParser()
config['INTEGRATIONS'] = {
    'GHAPI':'',
    'SBAPI':'',
}


with open('flooder.ini', 'w') as configfile:    
    config.write(configfile)
