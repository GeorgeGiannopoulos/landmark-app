# LandmarkApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.8.

## Prerequisites
**System Requirements**

| Package     | Version        |
|-------------|----------------|
| **Angular** | 9 (or later)   |
| **NodeJS**  | v12 (or later) |

## Installation
- Nodejs
1. Download package:
```
Centos: curl -sL https://rpm.nodesource.com/setup_12.x | sudo -E bash -
Ubuntu: curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
```

2. Install nodejs:
```
Centos: sudo yum install -y nodejs
Ubuntu: sudo apt-get install -y nodejs
```

- Angular
1. Install angular 9
```
sudo npm install -g @angular/cli@9
```

## Configuration
To deploy the application, change the following variables inside the `environment.ts` and `environment.prod.ts` files that reside under **landmark-app/src/environments/**:
```
PARSE_SERVER: {
    BASE_URL: '',
    MOUNT_URL: '',
    APP_ID: '',
},
```
**Note**: The values must match the ones on the back-end

Example:
```
PARSE_SERVER: {
    BASE_URL: 'http://localhost:1337',
    MOUNT_URL: '/parse',
    APP_ID: 'myAppID',
},
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.
