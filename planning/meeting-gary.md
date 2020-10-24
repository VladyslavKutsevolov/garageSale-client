## Garage Sale core requirements

Main page: 
  - As a buyer I can view a list of garage sales
  - Users can filter garage sales by category, location (google maps API ?)
  - As a buyer, I can click on a sale and be taken to the sale page
  - As a seller, I can create a sale

Sale page: 
  - As a buyer, I can see items listed for sale
  - As a buyer, I can see items listed for sale
  - As a buyer, I can click a button to launch a chat with the seller
  - As a seller, I can mark items as sold/unavailable
  - As a seller, I can add/remove items from a sale
Chat:
  - As a buyer, I can chat in real time with the seller


## Tech stack
Node - Express - Postgres (with sequelize) - React - Material UI
May want to use third party image storage - send image to our database, send from our database on to our image storage - 3rd party sends back url to store in the database. 


## Questions for Gary
1. Sequelize vs sql in backend
2. ERD feedback
3. Chat function implementation - persist messages to db? Chat implementation - fetch unread chats every few seconds.
4. Location table - separate or as part of sale? Join table necessary?
5. How to allow users to upload images
6. Google maps API 
7. How to upload user photos? img src base 64.  user sends image to us, we send it to server as base64 data  - React images upload (image upload component )- we receive image as data/state - we send it straight into backend through axios.
img src='/api/

Risks: 
1. file uplooader use a file upload module- if sending image, need to send as base64 as cant send image as json. Write a POC for that - proof of concept. 
2. 

 <img style='display:block; width:100px;height:100px;' id='base64image'                 
       src='data:image/jpeg;base64, LzlqLzRBQ...<!-- base64 data -->' />
  </body>
