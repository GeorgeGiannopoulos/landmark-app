# parse-server-example

[![Join The Conversation](https://img.shields.io/discourse/https/community.parseplatform.org/topics.svg)](https://community.parseplatform.org/c/parse-server)
[![Backers on Open Collective](https://opencollective.com/parse-server/backers/badge.svg)][open-collective-link]
[![Sponsors on Open Collective](https://opencollective.com/parse-server/sponsors/badge.svg)][open-collective-link]
[![License][license-svg]][license-link]
[![Twitter Follow](https://img.shields.io/twitter/follow/ParsePlatform.svg?label=Follow%20us%20on%20Twitter&style=social)](https://twitter.com/intent/follow?screen_name=ParsePlatform)

Example project using the [parse-server](https://github.com/ParsePlatform/parse-server) module on Express.

Read the full Parse Server guide here: https://github.com/ParsePlatform/parse-server/wiki/Parse-Server-Guide

### Configuration
To deploy the application, change the following variables inside the `.env` file that resides under **landmark-app-rest-api/**:
```
# [DATABASE]
DATABASE_URI=
MONGODB_URI=

# [SECRET KEYS]
APP_ID=
MASTER_KEY=

# [PARSE-SERVER]
SERVER_URL=
PUBLIC_SERVER_URL=
PARSE_MOUNT=
PORT=

# [PARSE-SERVER-DASHBOARD]
APP_NAME=
APP_USER=
APP_PASS=

# [PHOTOS SIZE]
PHOTO_WIDTH=250
PHOTO_HEIGHT=250
```
**Note**: The values must match the ones on the front-end

Example:
```
# [DATABASE]
DATABASE_URI='mongodb://localhost:27017/dev'
MONGODB_URI='mongodb://localhost:27017/dev'

# [SECRET KEYS]
APP_ID='myAppID'
MASTER_KEY='myMasterKey'

# [PARSE-SERVER]
SERVER_URL='http://localhost:1337/parse'
PUBLIC_SERVER_URL='http://localhost:1337/parse'
PARSE_MOUNT='/parse'
PORT=1337

# [PARSE-SERVER-DASHBOARD]
APP_NAME='myAppName'
APP_USER='admin'
APP_PASS='admin'

# [PHOTOS SIZE]
PHOTO_WIDTH=250
PHOTO_HEIGHT=250
```

## For Local Development

* Make sure you have at least Node 4.3. `node --version`
* Clone this repo and change directory to it.
* `npm install`
* Install mongo locally using http://docs.mongodb.org/master/tutorial/install-mongodb-on-os-x/
* Run `mongo` to connect to your database, just to make sure it's working. Once you see a mongo prompt, exit with Control-D
* Run the server with: `npm start`
* By default it will use a path of /parse for the API routes.  To change this, or use older client SDKs, run `export PARSE_MOUNT=/1` before launching the server.
* You now have a database named "dev" that contains your Parse data
* Install ngrok and you can test with devices

## Initialize MongoDB (users and landmark collections)
A python script was implemented that:
- creates 2 users (admin and guest)
```
admin
  username: admin
  password: admin
  notes: Can Edit the Landmarks
  
guest
  username: guest
  password: guest
  notes: Created to test that only an admin can edit the Landmarks
```
- creates Landmarks collection
- imports Landmarks information from a JSON file

### Usage
```
usage: python populate-mongo.py -d Landmarks.json -c LandmarksClassSchema.json -n Landmarks

Details

optional arguments:
  -h, --help                       show this help message and exit
  -d  --dataFile    <Data File>    Data-File
  -c  --classSchema <Class Schema> Class-Schema
  -n  --className   <Class Name>   Class-Name

```

### Execution
1. Install python dependencies:
```
pip install -r requirements.txt
```

2. Run the python script **populate-mongo.py** that resides under the misc directory:
```
python populate-mongo.py -d Landmarks.json -c LandmarksClassSchema.json -n Landmarks
```
**Note**: The script is compatible with both python 2 and 3


## Using it

Before using it, you can access a test page to verify if the basic setup is working fine [http://localhost:1337/test](http://localhost:1337/test).
Then you can use the REST API, the JavaScript SDK, and any of our open-source SDKs:

Example request to a server running locally:

```curl
curl -X POST \
  -H "X-Parse-Application-Id: myAppId" \
  -H "Content-Type: application/json" \
  -d '{"score":1337,"playerName":"Sean Plott","cheatMode":false}' \
  http://localhost:1337/parse/classes/GameScore
  
curl -X POST \
  -H "X-Parse-Application-Id: myAppId" \
  -H "Content-Type: application/json" \
  -d '{}' \
  http://localhost:1337/parse/functions/hello
```

Example using it via JavaScript:

```javascript
Parse.initialize('myAppId','unused');
Parse.serverURL = 'https://whatever.herokuapp.com';

var obj = new Parse.Object('GameScore');
obj.set('score',1337);
obj.save().then(function(obj) {
  console.log(obj.toJSON());
  var query = new Parse.Query('GameScore');
  query.get(obj.id).then(function(objAgain) {
    console.log(objAgain.toJSON());
  }, function(err) {console.log(err); });
}, function(err) { console.log(err); });
```
You can change the server URL in all of the open-source SDKs.

-----
As of April 5, 2017, Parse, LLC has transferred this code to the parse-community organization, and will no longer be contributing to or distributing this code.

[license-svg]: https://img.shields.io/badge/license-BSD-lightgrey.svg
[license-link]: LICENSE
[open-collective-link]: https://opencollective.com/parse-server
