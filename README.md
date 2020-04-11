# task-app

Hi Friends!!! This is a backend Node application created using Express and other libraries which stores data in mongodb Cloud.
This application is hosted in Heroku.
It uses Json web tokens for authentication and passwords are hashed using bcrypt.

#WHY TASK APP

As the name suggests this applications provides the REST API's requireed to create a task manager application.
A task can be anything which you are planning to do (e.g.) "purchase vegetables" or "play badminton" or anything which u wanted to do.

This application provides an interface where a user can create any number of tasks.
It also provides the ability to 
(update a task as completed or not)
(Filter tasks based on various query parameters)
(Delete a task) etc..
by using various REST API's provided 

Ofcourse each task is associated with the user who created it.
There are API's avaiable to create user, update user details, read user, add a profile picture and remove profile picture.

If you are an already existing user, You can use the API's to login to your account and view or update your tasks.
Logout functionality is also available. You also have to capability to logout from all the devices from which you have
logged in to the application.

####### One Amazing thing as well ####

I suggest you to create a user with your own email address, so that you will receive a welcome mail in your inbox...
Directly from the application ;)
Similarly u will also receive a mail from me automatically if you delete your account.

P.S: Some times the mail will endup in you spam folder!!!!   :|  so don't complain...

I have used Send grid mail service to implement this functionality..

  ### Thank you guys... LOVE U.... Hope this corona shit brings out the best in us... feel free to share with your buddies as well.
  
  
  --------------------------------------API GUIDE from blow-----------------------------------------------------


login user:- POST   // only if u have already created an user account
https://smapm-task-app.herokuapp.com/users/login
request body:-
{"email":"abc@example.com"
"password":"atleast7charcters"}

logout user:- POST   // only if u have already created an user account
https://smapm-task-app.herokuapp.com/users/logout

logout all instances of the user:- POST // if u have already created an user account and logged in with multiple devices
https://smapm-task-app.herokuapp.com/users/logoutAll

Create an user:- POST
https://smapm-task-app.herokuapp.com/users
request body:-
{"name":"abc"
"email":"abc@example.com"
"password":"atleast7charcters"
"age": 20 (optional)}

Read user:- GET
https://smapm-task-app.herokuapp.com/users/me

Update user:- PATCH
https://smapm-task-app.herokuapp.com/users/me
request body:-
{key value pairs to be updated}

Delete user:- DELETE
https://smapm-task-app.herokuapp.com/users/me

Create/Update profile picture for user:- POST
https://smapm-task-app.herokuapp.com/users/me/avatar
request type:- form-data
key: avatar
value: the pic which u wanto upload (<1mb)

Get profile picture for user:- GET
https://smapm-task-app.herokuapp.com/users/:id/avatar
(_id value of response body has to be used, which u will receive when u login or create a user) 

Delete profile picture for user:- DELETE
https://smapm-task-app.herokuapp.com/users/me/avatar


--------------------- TASK -------------------------------

Create an task:- POST
https://smapm-task-app.herokuapp.com/tasks
request body:-
{"description":"any description"
"completed": true (Boolean, optional, by default false)}

Read all tasks:- GET
https://smapm-task-app.herokuapp.com/tasks
queryparams available:
limit:NUMBER,
skip:NUMBER,
completed:BOOLEAN

Read specific task:- GET
https://smapm-task-app.herokuapp.com/tasks/:id
(_id value of response body has to be used, which u will receive when u create a task) 

Update tasks:- PATCH
https://smapm-task-app.herokuapp.com/tasks/:id
(_id value of response body has to be used, which u will receive when u create a task) 
request body:-
{key value pairs to be updated}

Delete task:- DELETE
https://smapm-task-app.herokuapp.com/tasks/:id

