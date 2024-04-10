# Online-book-library - 
Online-library is a web-based application designed to encourige reading enthusiasts to find their next book. 

## Table of Contents
- [Recommended Requirements](#recommended-requirements)
- [Test User Credentials](#test-user-credentials)
- [Technologies Used](#technologies-used)
- [How to Access](#how-to-access)
- [Installation and Running the Application](#installation-and-running-the-application)
- [Site Structure](#site-structure)
- [License](#license)

## Recommended Requirements

For the best experience using our application, we recommend the following settings and hardware:

- **Display Resolution:** Full HD (1920x1080 pixels) or higher. Our application's interface is designed to look best at a width of 1920 pixels, ensuring that all elements are displayed correctly and are easily navigable.

- **Browser:** Latest version of Chrome, Firefox, Safari, or Edge. We strive to support the latest web standards and features, and using an up-to-date browser will ensure compatibility and security.


## Admin - email: peter@abv.bg password:123456

## Technologies Used

This project is built using Angular: A platform and framework for building single-page client applications using HTML and TypeScript. Angular provides tools for developers to build applications that live on the web, mobile, or desktop.


## How to Access

Access to Online-library`s features is tailored to enhance user engagement and ensure a rewarding experience for all members:

- **Non-Registered and Logged-Out Users:** Visitors who have not registered or are not logged in can browse the public sections of the site, such as the homepage, books listing and their details, but will not have the ability to interact with content or access the full features available to registered members.

- **Registration Process:** To unlock the full potential of Online-library, users are encouraged to register. The registration process is straightforward and requires a username, email, and password. Upon successful registration, users will have unlimited access to the platform

- **Benefits for Registered Users:**
  - **Create and Edit Books:** Registered users can create their own books, edit and delete them.
  - **Personal Profile Management:** Provides your user profile and bookmark your added books.
  - **Comment:** Leave comments on Books.


## Installation and Running the Application

Follow these steps to get the Online-library application up and running on your local machine for development and testing purposes.

 ### Client Application Setup

   **Clone the Repository:** 
   You can clone the repository using the following command or download it as a ZIP file and extract it on your computer.

   git clone https://github.com/DaniBacheva/Online-book-library

1. Navigate to the Project Directory:

Use the terminal to navigate to the project directory.

cd project

2. Install Dependencies:

Install all the necessary dependencies by running the following command in your terminal:

npm install   

3. Run the Client Part:
Start the Angular development server with this command:

ng serve

4. Open the Project:
Access the application by opening the following URL in a web browser:
http://localhost:4200/


   ### Server part Setup
1. Navigate to the Server Directory:
   
cd server

3. Install Server Dependencies and Start the Server
Execute the following commands in order to start the server.

npm install
npm run client
npm run build
npm start

   #### Running the Server:

Once the server is started, it will listen for requests on:
http://localhost:3030/

## Site Structure

The Online-library website is designed with a user-friendly and intuitive structure to ensure easy navigation and a pleasant user experience. Below is an overview of the key components of the site:

### Homepage

- **Navigation Bar:** Provides quick links to the main sections of the site including Books Catalog, Add new book, User Profile. Also includes login/sign-up options.
- **Latest added books:** Displays recent entries from the catalog.


### Books Catalog

- **BooksListings:** Each book includes a title, author, genre, image and a link to a detailed guide.

### User Profile

- **Profile Information:** Users can view their profile details, their added books ang their details.
- **My Added books:** Users can create their own books to be downloaded for other user, edit and delete them as well as add comment for all availeble books.


### Comment Forum

- **Posts:** Users can add new comments for all available books.


### How to Access

- **Access Restrictions:** Non-registered users have limited access to the site's features. Full access is granted upon registration.
- **Registration Process:** Users can sign up with their email, username, and password to gain full access to all features.
