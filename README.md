# landmark-app

**landmark-app it is a MEAN application created to provide information about landmarks**

The front-end uses the following technologies:
- Angular
- HTML
- CSS
- Parse SDK

The back-end uses the following technologies:
- Parse-Server
- NodeJS
- Express
- MongoDB

## Features:
- Home page provides information for all the available landmarks on the database:
   - Photo
   - Title
   - Short Description
- View Page provides information for the selected landmark
   - Photo
   - Title
   - Full Description
   - Map
   - Link to the site
- Edit Page where an admin user can change landmark's information
   - Photo
   - Title
   - Short Description
   - Full Description
   - Link to the site

## Prerequisites
**System Requirements**

| Package     | Version        |
|-------------|----------------|
| **Angular** | 9 (or later)   |
| **NodeJS**  | v12 (or later) |
| **MongoDB** | v3.6           |
| **Python**  | 2.7 or 3       |

**Note:** The following python packages need to be installed `requests` and `python-dotenv`. They are included in **requirements.txt**

## Configuration

To configure the landmark-app (front-end) go [HERE](https://github.com/GeorgeGiannopoulos/landmark-app/blob/master/landmark-app/README.md)

To configure the landmark-app-rest-api (back-end) go [HERE](https://github.com/GeorgeGiannopoulos/landmark-app/blob/master/landmark-app-rest-api/README.md)

## Docker

There are two options:

1. Stand-alone Dockerfiles (no dockerfile for MongoDB)
2. Docker-compose file (MongoDB image included)


#### Stand-alone Dockerfiles
Front-end:
```
$ cd ./landmark-app
$ docker build -t <front-end-image-name>:<front-end-tag-version> .
$ docker run -d -it -p <UI-port>:80 --name <front-end-container-name> <front-end-image-name>:<front-end-tag-version>
```

Back-end:
```
$ cd ./landmark-app-rest-api
$ docker build -t <back-end-image-name>:<back-end-tag-version> .
$ docker run -d -it -p <parse-server-port>:<parse-server-port> --name <back-end-container-name> <back-end-image-name>:<back-end-tag-version>
```

Docker-compose
```
$ docker-compose build
$ docker-compose up
```

## Authors

* **George Giannopoulos** - *Initial work* - [GeorgeGiannopoulos](https://github.com/GeorgeGiannopoulos)

## License

[![License](http://img.shields.io/:license-mit-blue.svg?style=flat-square)](http://badges.mit-license.org)

- **[MIT license](http://opensource.org/licenses/mit-license.php)**
- Copyright 2020 © [GeorgeGiannopoulos](https://github.com/GeorgeGiannopoulos/landmark-app/blob/master/LICENSE)
