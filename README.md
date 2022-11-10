## Project Description 
I will build an app that lets users upload their photos and see weather data from the time/place they took those photos. Users will be able to select a weather parameter (ex. Wind speed) and sort their photos by that parameter. This project idea was inspired by my thru hike of the Colorado Trail this summer - I have a lot of photos and there was some crazy weather during the trip, and I did not keep a journal or anything! I would love to use this app on my own photos and make it available for other people to help remember their trips (hiking or otherwise)

## API & Fetch Snippet
[Weather API](https://www.weatherapi.com/)
```
http://api.weatherapi.com/v1/history.json?key={mykey}&q=38.73597222222222,-106.41014166666668&dt=2022-07-20
```
nobody take my api key lol!
<img width="1190" alt="Screen Shot 2022-11-10 at 12 32 33 PM" src="https://media.git.generalassemb.ly/user/45804/files/779aeed9-ddc9-44f3-8247-feced3dcc013">

## Problems and Planned Approaches
* I am not sure which EXIF data parser I will use to extract the photos time/date/location data (there is a npm library called ‘exif parser’ but not sure what image file types it will accept, most iPhone photos are .HEIC). If the built-in npm library doesn’t work I will search for another open-source EXIF parser
* I have not worked with file type input components before - I will just have to do some research on this, especially keeping the image files local (I am not sure how much space our deployment servers will have) and the drag & drop upload component
* I have not worked with the google maps api before - they have a lot of tutorials on this! I should be fine

## Wire Frames & Component Hierarchy
![componentsgraph-1](https://media.git.generalassemb.ly/user/45804/files/f6aa779c-fc7d-4da7-9b6b-672cf7f4a429)
![p2wireframes-1](https://media.git.generalassemb.ly/user/45804/files/941c62ee-e504-461c-b3f5-59aa06498381)
![p2wireframes-2](https://media.git.generalassemb.ly/user/45804/files/35daddf8-c4e4-4c31-becb-62b259d110dc)
![p2wireframes-3](https://media.git.generalassemb.ly/user/45804/files/ce080816-d432-4e0d-9f43-f547945d901c)



## User Stories
* AAU, I want to be able to see an example of what the website can do before I go to the trouble of uploading my own photos.
* AAU, I want to be able to either drag and drop photos or browse my computer for the files
* AAU, I want to have a menu of choices of weather attributes to search by - ex. if my trip was in Arizona I might want to see the highest temp of all the photos I took
* AAU, I want to have an about section so I can see what this app is even for or why it might be interesting
### MVP Goals
User can upload photos, sort photos by weather attribute, view weather data from each photo
### Stretch Goals
* Include Google Maps API to show user photos on a map
* Dynamic image sizing based on attribute sorting (i.e. if you select temperature, the hottest photo will display largest)

