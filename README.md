# Garajiji

Single page virtual garage sale platform. Users can browse, ask questions and finalize transactions without ever leaving the house.
Single Page Garajiji with following behaviours:
  - User can browse existing garage sales by name of city
  - Logged in user can create new garage sale, or can edit/delete existing owned garage sales
  - Logged in user can create new items on existing garage sales, or can edit/delete existing items
  - Items on garage sales can be filtered by item categories
  - User can click the details to see description of the item or can write the comments about the item
  - Author of comment can delete the comment
  - Owner of garage sale can receive the notification when there is new comments on item
  - User can send text to the seller and after buying the item turns into 'Sale pending' mode

## Final Product
!["Screenshot of Main Page"]()
!["Screenshot of Items on Garage"]()
!["Screenshot of Create Garage Sale"]()
!["Screenshot of Comments on item"]()
!["Screenshot of Send Text Messages to seller"]()

## Getting Started

1. Fork this repository, then clone your fork of this repository.
2. Install dependencies using the `npm install` command.
3. Fork https://github.com/9boogie/garagesale-server , then clone your fork to this repository.
4. Install dependencies using the `npm install` command.
5. Creatae database on postregres and run the schema and seeds.
6. Start the server using the `npm run dev` command. The app will be served at <http://localhost:3001/>.
6. Start the web client using the `npm start` command. The app will be served at <http://localhost:3000/>.
7. Go to <http://localhost:3000/> in your browser.

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```
