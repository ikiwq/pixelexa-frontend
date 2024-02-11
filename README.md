# Pixelexa
### Overview
Pixelexa is an open-source online newspaper inspired by the Washington Post. It was meant to give the users an opportunity to publish articles of all kinds without the need to be an actual reporter.
The user can interact with the articles: read them, star them, comment on them, and filter them by a specific text or by a category.

This is the frontend repository, and the backend repository can be found [here](https://github.com/ikiwq/pixelexa-backend).

#### Built with
[![My Skills](https://skillicons.dev/icons?i=angular,typescript,nodejs&theme=light)](https://skillicons.dev)

### Screenshots

<p float="left">
<picture>
  <source srcset="https://i.imgur.com/AMxBnTU.png">
  <img alt="Homepage." width="400">
</picture>


<picture>
  <source srcset="https://i.imgur.com/Db849Hr.png">
  <img alt="Profile Page." width="400">
</picture>

<picture>
  <source srcset="https://i.imgur.com/IbeGHRg.png">
  <img alt="Profile Page." width="400">
</picture>

<picture>
  <source srcset="https://i.imgur.com/oSOXbqg.png">
  <img alt="Profile Page." width="400">
</picture>

</p>

## Getting started
### Clone the repository
Clone the repository with
 
    git clone https://github.com/ikiwq/new-annex-frontend/
    
### Prerequisites:
Before running the application, make sure to have all the dependencies installed (Angular and FortAwesome).
    
To install Angular:

    npm install -g @angular/cli
    
To install fortawesome

    npm install @fortawesome/fontawesome-svg-core
    npm install @fortawesome/free-regular-svg-icons
    npm install @fortawesome/free-solid-svg-icons
    npm install @fortawesome/angular-fontawesome
    
### Configuration
In the src/enviroments folder, you'll find two files with the environmental variables. Both contain an apiURL link that points to the API server.
If you are using a different IP or port to host the API, modify the file like this:

    export const environment = {
      production: false,
      apiURL: "http://new_url:new_port"
    };
   
## License
Distributed under the MIT License.
