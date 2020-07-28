# populate-mongo.py ================================================================================
#
# Descriptions:
#    This script populates the mongoDB of the parse-server with data and users
#
# ==================================================================================================
#
import os
import sys
import argparse
import json
import requests
from dotenv import load_dotenv

# Load enviromental variables
dot_env_path = os.path.join(os.path.dirname(__file__), '../' + '.env')
if not os.path.isfile(dot_env_path):
    print (".env file does not exist!")
    print ('Exitting...')
    sys.exit(1)

load_dotenv(dotenv_path=dot_env_path)

# ==================================================================================================
# Constants
# ==================================================================================================
# Dictionary with the enviromental variables needed for the connection with the mongoDB
_env = {
    'DATABASE_URI': '',
    'MONGODB_URI': '',
    'APP_ID': '',
    'MASTER_KEY': '',
    'SERVER_URL': '',
    'PARSE_MOUNT': '',
    'PORT': ''
}
# Dictionary with the users to add to the mongoDB
_users = [
    {
        'username': 'admin',
        'password': 'admin',
        'role': 'admin',
        'ACL': {
            '*': { 'read': 'true', 'write': 'true' }
        }
    },
    {
        'username': 'guest',
        'password': 'guest',
        'role': 'guest'
    },
]

# ==================================================================================================
# Methods
# ==================================================================================================


def _get_env_variables(env):
    """
    This function initializes the enviromental variables
    """
    env_dict = {}
    for key, value in env.items():
        env_var = os.getenv(key)
        if env_var in [None, '']:
            print ('Key: \'%s\' is missing from the enviroment' % (key))
            print ('Exitting...')
            sys.exit(1)
        env_dict[key] = env_var

    return env_dict


def _get_header(env):
    """
    This function returns the http header
    """
    return {
        'X-Parse-Application-Id': env['APP_ID'],
        'X-Parse-Master-Key': env['MASTER_KEY'],
        'Content-Type': 'application/json'
    }


def _get_url(env, endpoint):
    """
    This function returns the http url
    """
    return '{}/{}'.format(env['SERVER_URL'], endpoint)


def _load_data_from_file(filepath):
    """
    This function reads data from file and returns a JSON object
    """
    data = {}
    with open(os.path.join(filepath)) as json_file:
        data = json.load(json_file)
    return data


def _http_request(url, data, header):
    """
    This function performs the Http Request
    """
    import requests

    # Perform the hhtp request
    r = requests.post(url=url, data=data, headers=header)
    return r.text


def _check_http_request(requestResult):
    """
    This function checks the Http Request's results
    """
    requestResult = json.loads(requestResult)
    # In case the result is a dict then propably is an error
    print (json.dumps(requestResult, indent=4, sort_keys=True))


def _set_users(users, url, header):
    """
    This function creates the users to mongoDB
    """
    for user in users:
        print ("Creating user \'%s\'..." % (user['username']))
        response = _http_request(url, json.dumps(user), header)
        _check_http_request(response)


def _set_new_schema(class_file, class_name, url, header):
    """
    This function sets the new schema to mongoDB
    """
    class_file['className'] = class_name
    print ("Creating new Class-Schema...")
    response = _http_request(url, json.dumps(class_file), header)
    _check_http_request(response)


def _set_new_data(data_file, url, header):
    """
    This function sets the new schema to mongoDB
    """
    print ("Populating Class with data file...")
    for data in data_file:
        print (data)
        response = _http_request(url, json.dumps(data), header)
        _check_http_request(response)


# =========================================== Arguments ============================================
def _handleArgument():
    parser = argparse.ArgumentParser(description='Details',
        usage='python populate-mongo.py -d Landmarks.json -c LandmarksClassSchema.json -n Landmarks')

    # Required
    parser.add_argument("-d", "--dataFile",
                        dest="data_file",
                        help="Data-File",
                        metavar="<Data File>",
                        required=True)
    
    parser.add_argument("-c", "--classSchema",
                        dest="class_schema",
                        help="Class-Schema",
                        metavar="<Class Schema>",
                        required=True)
    
    parser.add_argument("-n", "--className",
                        dest="class_name",
                        help="Class-Name",
                        metavar="<Class Name>",
                        required=True)

    args = parser.parse_args()
    
    return args

# ==================================================================================================
# main
# ==================================================================================================
if __name__ == "__main__":
    # Read Arguments
    args = _handleArgument()

    # Get enviromental variables
    env = _get_env_variables(_env)

    # Get HTTP Header
    header = _get_header(env)

    # ========================================================
    # Adding users
    # ========================================================
    # Get HTTP URL for adding users
    url = _get_url(env, 'users')
    # Set users to mongoDB
    _set_users(_users, url, header)

    # ========================================================
    # Adding class-schema
    # ========================================================
    class_file = _load_data_from_file(args.class_schema)
    # Get HTTP URL for creating the new scheme
    url = _get_url(env, 'schemas/' + args.class_name)
    # Set new scheme to mongoDB
    _set_new_schema(class_file, args.class_name, url, header)

    # ========================================================
    # Adding data
    # ========================================================
    data_file = _load_data_from_file(args.data_file)
    # Get HTTP URL for creating the new scheme
    url = _get_url(env, 'classes/' + args.class_name)
    # Set new data to mongoDB
    _set_new_data(data_file, url, header)
