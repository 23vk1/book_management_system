install mongodb from below link and install

https://fastdl.mongodb.org/windows/mongodb-windows-x86_64-7.0.11-signed.msi


copy code to backend folder 

open terminal in folder
run - npm init
run - node app.js || nodemon

// make sure you have "uploads" folder and "logs" folder in your directory directory (if does not than make)  

postman testing ...


//////////////////admin//////////////////////////
POST : localhost:8000/admin/add
body : 	{
    	"name":"vijay",
    	"email":"vijay@gmail.com",
    	"password":"123",
    	"phone":9988776655,
    	"address":"address 1"
	}

POST : localhost:8000/admin/login
body : 	{
    	"email":"vijay@gmail.com",
    	"password":"123"
	}

//////////////////user//////////////////////////

///// localhost:8000/user/add // is now //  localhost:8000/user/register // (updated);

POST : localhost:8000/user/add
body : 	{
    	"name":"ajay",
    	"email":"ajay@gmail.com",
    	"password":"123",
    	"phone":9887766554,
    	"address":"address xyz"
	}

POST : localhost:8000/user/login
body : 	{
    	"email":"ajay@gmail.com",
    	"password":"123"
	}


//////////////////book//////////////////////////

DELETE : localhost:8000/delete/book/:id


POST : localhost:8000/book/add
body : 	{
    	"name" : "book2",
    	"category" : "category 1",
    	"price" : "100",
    	"author" : "vk",
    	"language" : "gujarati",
    	"pdfUrl" : "domain.xyz.com",
    	"imageUrl" : "domain.abc.com"
	}







