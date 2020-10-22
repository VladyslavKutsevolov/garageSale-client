### Browse/READ
GET '/' : home page - (Index page for Garage Sale)
GET '/sale/:id' : Individual sale page
GET '/products/:id' : Item detail

### ADD 
POST '/sale/new' : Create new garage
POST '/products/new' : Create new item

### EDIT
POST '/sale/:id/' : Edit garage sale
POST '/products/:id/ : Edit item

### DELETE
DELETE '/sale/:id' : Delete garage sale
DELETE '/products/:id' : Delete item 
