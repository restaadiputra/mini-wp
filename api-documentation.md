# API Documentation

##### Basic Url : /

### Todo Routes

List of routes todo:

| Route         | HTTP   | Header(s) | Description                    | Body                                                         |
| ------------- | ------ | --------- | ------------------------------ | ------------------------------------------------------------ |
| /article      | GET    | token     | Get all articles               | none                                                         |
| /article/:id  | GET    | token     | Get a single article           | none                                                         |
| /article/user | GET    | token     | Get all  article by user ID    | none                                                         |
| /article/     | POST   | token     | Create a article               | userId:String**(Required)**, title:String**(Required)**, content:String, image: image_file |
| /article      | DELETE | token     | Delete a article               | none                                                         |
| /article/:id  | PUT    | token     | Update a article with new info | userId:String, title:String, content:String, image: image_file |

List of filter routes:

| Route                          | HTTP | Description          |
| ------------------------------ | ---- | -------------------- |
| /article?title=<article_title> | GET  | Get article by title |



### User Routes

List of user routes:

| Route     | HTTP | Header(s) | Body                                                         | Description       |
| --------- | ---- | --------- | ------------------------------------------------------------ | ----------------- |
| /user     | GET  | none      | none                                                         | Get all user      |
| /user/:id | GET  | none      | none                                                         | Get a single user |
| /user/    | POST | none      | fullname:String**(Required)**, username:String**(Required)**, password:String**(Required)**, email:String**(Required)**, | Create a user     |



### SignIn Routes

List of routes SignIn:

| Route   | HTTP | Header(s) | Body                                                         | Description            |
| ------- | ---- | --------- | ------------------------------------------------------------ | ---------------------- |
| /local  | POS  | none      | username:String**(Required)**, password:String**(Required)** | Sign in through local  |
| /google | POS  | none      | id_token:String**(Required)**                                | Sign in through google |

