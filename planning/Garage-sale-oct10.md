
Main page: 
  - Users can view a list of garage sales
  - Users can filter garage sales by category, location (google maps API ?)
  - By clicking on a sale, users are taken to the sale page
  - Users can create a sale of their own

  
Sale page: 
  - Users can see items listed for sale
  - Users can click a button to launch a chat with the seller
  - Users can mark items as sold
  - Users can remove items from a sale


Chat:
  - Users are able to chat in real time with the seller
  
  


  - users can update listings - CRUD
  - It has an auction mode where people bid for an item 
  - It has a standard mode where people can buy the item 
  - Users can see content arranged 
  - Filters include: item type, location, price, date listed, 
  - Items are automatically removed once they are marked sold. 
  - Email validation - if user doesn't log in via passport, send email to confirm



Back end: 
  - User authentication, authorization - passport
  - Request validation - express validator
  - Database - Elephant SQL (shared DB) ? 
  - Chat - WebSocket
  - Define routes - express router
  - 

Testing: 
  -  build components in isolation in storybook 
  -  At least some E2E testing of user routes through the site. 


Front end: 
  - Tailwind CSS / styled components / Material UI - already has pre-built components


User Stories: 
- As a non-user, I can register
- As a logged-in user, I can log in and log out
- As a logged-in user, I can edit my profile details
- As a user, I can log in using passport (facebook, google, github etc. ) 


(User profile stories)
- As a user, I can look at another user's profile page
- On a user's profile page, I can see items that they are actively selling
- On a user's profile page, I can filter the items they are selling


(Search page stories)
- As a user, I can see items near me ( city or town name google maps API)
- As I user, I can filter by category


(Sale storires
- A user can create one or many sales
- As a user, I can list an item for sale
- As a user, my item for sale has one or more categories (pre-provided by us)
- As a user, my item for sale has a description
- Each product contain a reference to its parent 'Sale' 


Buyer stories: 
- As a buyer, I can see a list of sales on the homepage
- I can click a card on the front page and be taken to the SALE PAGE
- from the SALE PAGE, I see information about the seller and the sale - title, desc, photo, rating, avatar, location, seller rating
- at the top of the SALE PAGE, I can see the big photo of the whole garage sale.
- On the SALE PAGE, I see comments about the sale
- on the SALE PAGE, I see a list of products for sale (if seller has listed them and is not interested in MAKE ME AN OFFER/LAZY MODE)
- Each list item has a price/bid photo, title, desc, categories. Each item has buttons: make a bid, chat to seller
- If I click a picture, I can see a bigger version/a carousel of photos
- If I click chat to seller, I am taken to a chat functionality 
- As a buyer I can see the items I have saved
- As a buyer, I can rate a seller
- As a buyer, I can search/filter by sales near me.
- As a buyer, I can search/filter by a specific word or category.


Seller stories: 
- As a seller, I can create/delete ONE GARAGE SALE: a photo, description, title, location, 
- As a seller I can list/mark closed items within a sale, or explicitly choose LAZY MODE.
- As a seller, I can list items with categories.  
- As a seller, I can receive chat messages about my items for sale
- As a seller, in my profile, I can see all active sales
- (non-auction-mode) As a seller I can mark an item as sold
- (Auction mode) As a seller, I can make a limited-time sale. (SPEEDY SALE)   


User profile stories: 
- As a user, I can create a profile
- As a user, I can edit profile information
- As a user, I can sign in with passport (facebook, google)

Tasks: 
Entities (ERD): 
- users: () PK id, username, email, password;
- product_messages: PK id, message, FK author_id, created_at, FK product_id,
- product_comments: 
- seller_ratings
- sales: PK id, title, description, FK product_id, FK owner_id, FK location_id, garage_photo_url
- sales_location: PK id, FK sale_id, longitude, latitude, city, postal code, 
- products: PK id, FK owner_id, title, description, FK photo_album_id, open/closed (boolean), 
- product-categories: PK id serial primary INT, FK product_id,  category TEXT
- photo_album: PK id, FK photo_id, FK product_id
- Photos:  PK id, FK photo_album_id, picture_url
- User bids
- Transactions


Useful links: 
https://thenounproject.com/
https://undraw.co/illustrations
https://coolors.co/
