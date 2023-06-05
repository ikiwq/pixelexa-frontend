# Pixelexa
## Introduction
Pixelexa is an open-source online newspaper inspired by the Washington Post. It was meant to give the users an opportunity to publish articles of all kinds without the need to be an actual reporter.
The user can interact with the articles: read them, star them, comment on them, and filter them by a specific text or by a category.

#### Source code
This is the frontend repository, and the backend repository can be found [here](https://github.com/ikiwq/pixelexa-backend).

### Screenshots
#### Homepage

<picture>
  <source srcset="https://i.imgur.com/AMxBnTU.png">
  <img alt="Homepage.">
</picture>

#### Profile page

<picture>
  <source srcset="https://i.imgur.com/IbeGHRg.png">
  <img alt="Profile Page.">
</picture>

#### Category Page

<picture>
  <source srcset="https://i.imgur.com/oSOXbqg.png">
  <img alt="Profile Page.">
</picture>

#### Dark Mode Homepage

<picture>
  <source srcset="https://i.imgur.com/Db849Hr.png">
  <img alt="Profile Page.">
</picture>

#### Built with
[![My Skills](https://skillicons.dev/icons?i=angular,typescript,nodejs&theme=light)](https://skillicons.dev)

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

## In depth into the code
Pixelexa follows a particular type of structure when it comes to handling data (just like [Annex](https://github.com/ikiwq/new-annex-frontend)). Since every article has an id and a specific article can be present across multiple pages, the article service has a behavior subject containing all the articles, organized into a map.

    articleStorage = new BehaviorSubject<ArticleDictionary>({});
A key (in this case, the id) points to a specific Article.

    export interface ArticleDictionary {
      [key : string] : ArticleModel;
    }
    

Then, the article components have access to the article storage and render articles based on an array of ids. Since the article storage is a map, the time complexity to get the article is O(1) instead of O(n), where n is the number of articles currently stored.
  
