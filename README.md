# London Food Hygiene Ratings

## Interactive Front End Development with Javascript
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
- Reponsive web design catering to small, medium and large screen sizes (note that both CSS and JavaScript are used to control the responsiveness, therefore a page refresh is required if switching from one screen size to another).
- Single page application that does not need the web page to be refreshed when the user moves from section to section.
- Search by business name, address, postcode and/or hygiene rating.
- Search button is disabled if all search fields are empty.
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
- [Leafet](https://leafletjs.com/)
- [Font Awesome v4.7.0](https://fontawesome.com/v4.7.0/)
- [Chart.js](https://www.chartjs.org/)

