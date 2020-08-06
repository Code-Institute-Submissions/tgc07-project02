# London Food Hygiene Ratings

## Interactive Frontend Development Milestone Project
A live demo of this project can be viewed [here](https://andrewsui.github.io/tgc07-project02/index.html).

This project is a single page application designed as a mock-up of what the UK Food Standards Agency's Food Hygiene Rating Scheme search feature could potentially look like. The data set used in this project has been limited to just London data in order to prevent the data folder size from getting too large.

### Disclaimer
Data used in this project pertaining to businesses and food hygiene ratings was downloaded from the UK [Food Standards Agency website](https://ratings.food.gov.uk/open-data/en-GB) on 21 July 2020 and has not been updated since this date. Any actual searches for London or UK Food Hygiene Rating Scheme data should be conducted via the Food Standards Agency's [search feature](https://ratings.food.gov.uk/).

## UX

### Strategy - User Stories
Food Standards Agency would want to:
- provide a public service that enables users to easily obtain food hygiene data of businesses and thereby empowering the public to make informed decisions about the food that they buy.
- present meaningful information about restaurants and other eateries in an elegant and professional manner.
- make the relevant local authority contact information pertaining to each business easily to find, as the information on businesses is held on behalf of the local authorities.

Members of the general public would want to:
- easily obtain food hygiene data of businesses and thereby enabling them to make informed decisions about the food that they buy.
- search by business name, address, postcode and/or hygiene rating.
- easily locate the business with the help of a map.
- find the relevant local authority contact information in the event of any enquiries or complaints.
- understand the number of businesses in each food hygiene rating category for the user's specified search criteria.

### Scope
Content requirements: Text, images, map, information on each business, food hygiene ratings, relevant local authorities.
Functional specification: Interactive map, graphical chart.

### Structure
The website will be presented as a single page application with a navbar that enables the user to switch between different views. Split screen design-pattern will mainly be used.

### Skeleton
Wireframes created during the design process can be found [here](report/wireframes.pdf).

### Surface
The chosen colour scheme uses green colours inspired by nature in order to complement the colours used in the map provided by [Leaflet](https://leafletjs.com/) and [OpenStreetMap](https://www.openstreetmap.org/). Dark grey colour was used for the navbar to provide a professional look to the website.

## Features

### Current Features
- Search London Food Hygiene Rating Scheme data with ability to query by business name, address, postcode and/or hygiene rating.
- Reponsive web design catering to small, medium and large screen sizes.
- Single page application that does not need the web page to be refreshed when the user moves from section to section.
- Search button is disabled if all search fields are empty.
- If search fields are not empty, search button can be submitted by pressing the Enter key.
- Search button does not reload the page when submitted.
- Hovering over navbar links and individual search results changes background colour and scale, giving positive feedback to the user as a result of their actions.
- Total number of search results is displayed for each search.
- Interactive map displaying markers for each search result.
- Clicking a search result pans to the respective marker on the map and opens the marker's popup content.
- Bar chart showing the number of businesses in each food hygiene rating category for the user's specified search criteria.

### Features Left to Implement
- Search for businesses by postcode based on user's current geolocation.
- Comparison feature between data from 2 separate search results.

## Technologies Used
- HTML
- CSS
- JavaScript
- [Font Awesome v4.7.0](https://fontawesome.com/v4.7.0/)
- [Leafet](https://leafletjs.com/)
- [Chart.js](https://www.chartjs.org/)

## Testing

All testing was done manually. The following tests were performed:

|  # | Event | Expected Outcome | Actual Outcome |
|----|-------|------------------|----------------|
|  1 | Click search button when all search input fields are empty | Search button disabled | As expected |
|  2 | Input text into search fields | Search button enabled | As expected |
|  3 | Search by establishment name | Return results that match establishment name, but any address, any postcode and any hygiene rating | As expected |
|  4 | Search by address | Return results that match address, but any establishment name, any postcode and any hygiene rating | As expected |
|  5 | Search by postcode | Return results that match postcode, but any establishment name, any address and any hygiene rating | As expected |
|  6 | Search by establishment name and address | Return results that match establishment name and address, but any postcode and any hygiene rating | As expected |
|  7 | Search by establishment name and postcode | Return results that match establishment name and postcode, but any address and any hygiene rating | As expected |
|  8 | Search by address and postcode | Return results that match address and postcode, but any establishment name and any hygiene rating | As expected |
|  9 | Search by establishment name and address and postcode | Return results that match establishment name and address and postcode, but any hygiene rating | As expected |
| 10 | Search by specific hygiene rating and search input fields are not empty | Return results that match hygiene rating | As expected |
| 11 | Click individual search result | Pan to respective map marker and marker popup content is opened | Popup opens correctly. Pan to marker works most of the time, but occasionally pans with the marker slightly offscreen. Unable to identify the cause of this error and might be due to leaflet zoom rounding. |
| 12 | Click "Results" icon on navbar | Displays search results panel if not already displayed | As expected |
| 13 | Click "Map" icon on navbar | Maximises map and minimises everything else | As expected |
| 14 | Click "Chart" icon on navbar | Displays chart if not already displayed | As expected |
| 15 | Click "X" in top right corner of chart  | Closes chart | As expected |
| 16 | Click "Info" icon on navbar | Closes search results and map, then displays site-info section | As expected |
| 17 | Click "X" in top right corner of site-info section | Closes site-info section and returns to previous map and search results view | As expected |
| 18 | Click "Minimise" icon on navbar | Minimises navbar with only icons for navigation | As expected |
| 19 | Click magnifying glass icon on minimised navbar | Maximises navbar, closes site-info section if open | As expected |
| 20 | Click "Results" icon on minimised navbar | Displays search results panel if not already displayed | As expected |
| 21 | Click "Map" icon on minimised navbar | Maximises map and minimises everything else | As expected |
| 22 | Click "Chart" icon on minimised navbar | Displays chart if not already displayed | As expected |
| 23 | Click "Info" icon on minimised navbar | Closes search results and map, then displays site-info section | As expected |
| 24 | Click hamburger icon on minimsed navbar | Maximises navbar | As expected |
| 25 | View website on desktop PC using Chrome and FireFox | Main section should be split into 2 columns for search results and map with height 100vh | As expected |
| 26 | View website on iPad using Safari | Main section should be 1 column split into 2 rows for search results and map | As expected |
| 27 | View website on Samsung Note 8 using Chrome and FireFox with maximised navbar | Should see search form and "minimise" icon, but all other icons hidden | As expected |
| 28 | View website on Samsung Note 8 using Chrome and FireFox, then perform search | Navbar auto-minimises when search button submitted. Main section should be 1 column split into 2 rows for search results and map. | As expected |
| 29 | View website on Samsung Note 8 using Chrome and FireFox, then view search results or site-info | "Chart" icon should be hidden | As expected |

## Deployment

A live demo of this project can be viewed [here](https://andrewsui.github.io/tgc07-project02/index.html) which has been hosted using GitHub Pages.
All the source code for this project is available [here](https://github.com/andrewsui/tgc07-project02) on GitHub.

Code for the project was deployed in the following manner:
- Individual files were added to the next commit staging area by executing the `git add [filename]` command in a command-line interface.
- All changes in the working directory were added to the next commit (stage) by executing the `git add .` command in a command-line interface.
- Staged content was committed as new commit snapshot by executing the `git commit -m “[message]"` command in a command-line interface.
- Local branch commits were pushed to the remote repository master branch by executing the `git push -u origin master` command in a command-line interface.
- Subsequent local branch commits were pushed to the remote repository master branch by executing the `git push` command in a command-line interface.
- The website was published on GitHub Pages by navigating to the "Settings" of the project's repository and selecting the master branch as the source in the GitHub Pages sub-section.

## Credits

### Content and Media
- Food Hygiene Rating Scheme data was obtained from the [Food Standards Agency website](https://ratings.food.gov.uk/open-data/en-GB).
- Food Hygiene Rating related images were downloaded from [here](https://ratings.food.gov.uk/open-data-resources/images/images.zip).
- Information pertaining to the Food Hygiene Rating Scheme was copied from [here](https://www.food.gov.uk/safety-hygiene/food-hygiene-rating-scheme).
- Favicon was created using [Favicon.io](https://favicon.io/).
- Interactive map uses a combination of [Leafet](https://leafletjs.com/), [OpenStreetMap](https://www.openstreetmap.org/) and [Mapbox](https://www.mapbox.com/).
- Chart was created using [Chart.js](https://www.chartjs.org/).
- [Font Awesome v4.7.0](https://fontawesome.com/v4.7.0/) was used for this project's icons.

### Acknowledgements
- The navbar was contructed using ideas and code from [this YouTube video by dcode](https://www.youtube.com/watch?v=LxEb9G7ELOQ).