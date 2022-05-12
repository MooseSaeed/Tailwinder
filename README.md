<h1 align="center">Welcome to Tailwinder 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-0.1.0-blue.svg?cacheSeconds=2592000" />
  <a href="docs" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="url" target="_blank">
    <img alt="License: MIT" src="https://img.shields.io/badge/License-MIT-yellow.svg" />
  </a>
  <a href="https://twitter.com/Moose_Said" target="_blank">
    <img alt="Twitter: Moose_Said" src="https://img.shields.io/twitter/follow/Moose_Said.svg?style=social" />
  </a>
</p>

![Tailwinder Overview](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5e4v812njxbsj6e0shg9.gif)

> An open source community for tailwind fans - powered by Appwrite

> This project was built for [Appwrite hackathon on Dev Community](https://dev.to/devteam/announcing-the-appwrite-hackathon-on-dev-1oc0)

### ✨ [Demo](https://vimeo.com/manage/videos/709162501)

### ⚙️ Built With

| Used Stack                                                    |
| ------------------------------------------------------------- |
| [Appwrite](https://appwrite.io/)                              |
| [Appwrite Node SDK](https://github.com/appwrite/sdk-for-node) |
| [TailwindCSS](https://tailwindcss.com/)                       |
| [VueJS](https://vuejs.org/)                                   |
| [Vue Router](https://router.vuejs.org/)                       |
| [SwiperJS](https://swiperjs.com/vue)                          |
| [AnimateCSS](https://animate.style/)                          |

### More Info

| Content Table (Tailwinder Structure):                                          |
| ------------------------------------------------------------------------------ |
| [1- Homepage](#chapter-1)                                                      |
| [1-a- Dynamic Profile Picture <u>(Appwrite Feature)</u>](#chapter-11)          |
| [1-b- Dynamic Dark/Bright Theme Toggle <u>(Appwrite Feature)</u>](#chapter-12) |
| [1-c- Fading Navbar](#chapter-13)                                              |
| [1-d- Cool Tailwinder Logo view](#chapter-14)                                  |
| [2- Signup/Signin](#chapter-2)                                                 |
| [2-a- Dynamic User URL <u>(Appwrite Feature)</u>](#chapter-21)                 |
| [2-b- User Login/Logout <u>(Appwrite Feature)</u>](#chapter-22)                |
| [3- User Profile](#chapter-3)                                                  |
| [3-a- Dynamic Profile Picture <u>(Appwrite Feature)</u>](#chapter-31)          |
| [3-b- Dynamic User Information <u>(Appwrite Feature)</u>](#chapter-32)         |
| [3-c- User Information Update <u>(Appwrite Feature)</u>](#chapter-33)          |
| [3-d- Dynamic User Contributions <u>(Appwrite Feature)</u>](#chapter-34)       |
| [4- Components](#chapter-4)                                                    |
| [4-a- Dynamic Components Fetching <u>(Appwrite Feature)</u>](#chapter-41)      |
| [4-b- Add New Component <u>(Appwrite Feature)</u>](#chapter-42)                |
| [4-c- Component View <u>(Appwrite Feature)</u>](#chapter-43)                   |
| [5- Tailwinder Academy](#chapter-5)                                            |
| [5-a- Dynamic Resources Fetching <u>(Appwrite Feature)</u>](#chapter-51)       |
| [5-b- Add / View Academy Resources <u>(Appwrite Feature)](#chapter-52)         |
| [6- Tailwinder Community](#chapter-6)                                          |
| [Development Stack Used](#chapter-7)                                           |
| [Appwrite Utilization](#chapter-8)                                             |

#### 1- **Homepage**:<a name="chapter-1"></a>

![Tailwinder Homepage](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/gnkbmfhovrhjynk176ut.gif)

- **Dynamic Profile Picture <u>(Appwrite Feature)</u>**<a name="chapter-11"></a>

The profile picture in the Navbar is dynamic, Appwrite fetches the picture for this specific user and display it in the Navbar across the website.
It also detects if the user doesn't have a profile picture and display an Avatar with the first letter of the user's first and last name. We will see that in action when we get to Userprofiles section.

<u>Utilized from Appwrite:</u>
[Get File Preview](https://appwrite.io/docs/client/storage?sdk=web-default#storageGetFilePreview) Web SDK.
[Get User Initials](https://appwrite.io/docs/client/avatars?sdk=web-default#avatarsGetInitials) Web SDK.

---

- **Dynamic Dark/Bright Theme Toggle <u>(Appwrite Feature)</u>**<a name="chapter-12"></a>

The dark/bright theme toggle isn't just changing the theme in general, It registers the the user's choice to the user preferences with Appwrite to automatically change the theme when this specific user is logged in 🌞🌙.

<u>Utilized from Appwrite:</u>
[Update Account Preferences](https://appwrite.io/docs/client/account?sdk=web-default#accountUpdatePrefs) Web SDK.
[Get Account Prefrences](https://appwrite.io/docs/client/account?sdk=web-default#accountGetPrefs) Web SDK.

---

- **Fading Navbar**<a name="chapter-13"></a>

The Navbar fades out while scrolling down but appears again on scroll up. It includes the logo, important links and user dropdown.

---

- **Cool Tailwinder Logo view**<a name="chapter-14"></a>

This is an opensource component by Claire Larsen created in October 21, 2015 and the [codepen](https://codepen.io/ClaireLarsen/pen/XmVyVX) is available. I have added few adjustments to make it a VueJS component and change few things to fit the theme.

---

#### 2- **Signup/Signin**:<a name="chapter-2"></a>

https://www.youtube.com/watch?v=t3-PSxNbzI8

- **Dynamic User URL <u> (Appwrite Feature)</u>**<a name="chapter-21"></a>

The user is able to insert username which will be used to create a dynamic unique URL for this specific user. The code catches the username and saves it as a user preference and then fetches the username for the URL.

---

- **User Login/Logout <u>(Appwrite Feature)</u>**<a name="chapter-22"></a>

Simple auth to login and logout the user using appwrite.

<u>Utilized from Appwrite:</u>
[Create Account](https://appwrite.io/docs/client/account?sdk=web-default#accountCreate) Web SDK.
[Create Account Session](https://appwrite.io/docs/client/account#accountCreateSession) Web SDK.
[Update Account Preferences](https://appwrite.io/docs/client/account?sdk=web-default#accountUpdatePrefs) Web SDK.
[Get Account](https://appwrite.io/docs/client/account?sdk=web-default#accountGet) Web SDK.
[Delete Account Session](https://appwrite.io/docs/client/account?sdk=web-default#accountDeleteSession) Web SDK.

---

#### 3- **User Profile**:<a name="chapter-3"></a>

![User Profile Overview](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/olpar6uzdjkmbr5fzuli.gif)

- **Dynamic Profile Picture <u>(Appwrite Feature)</u>**<a name="chapter-31"></a>

The user profile again, is dynamic. Fetched by Appwrite for this specific user same as the profile picture in the user dropdown Navbar. It detects if the user didn't add a picture then it adds an Avatar instead.

<u>Utilized from Appwrite:</u>
[Get File Preview](https://appwrite.io/docs/client/storage?sdk=web-default#storageGetFilePreview) Web SDK.
[Get User Initials](https://appwrite.io/docs/client/avatars?sdk=web-default#avatarsGetInitials) Web SDK.
[Update Account Preferences](https://appwrite.io/docs/client/account?sdk=web-default#accountUpdatePrefs) Web SDK.

---

- **Dynamic User Information <u>(Appwrite Feature)</u>**<a name="chapter-32"></a>

As you can see, every user has the ability to update their info and it's being displayed in their profile with Appwrite Node-SDK. Of course I could come up for a better design for the way it's displayed but I think that's okay.

<u>Utilized from Appwrite:</u>
[Get User Preferences](https://appwrite.io/docs/server/users#usersGetPrefs) Node SDK.

---

- **User Information Update <u>(Appwrite Feature)</u>**<a name="chapter-33"></a>

https://www.youtube.com/watch?v=cS86TZGh46I

In the above video, you can notice that I'm changing the user's **profile picture**, **name**, **email** and **preferences**.

The code checks if the user already has a profile picture, if not it displays an avatar.

**The User can:**

- update a new profile picture, the code checks if there is already one, if yes then Appwrite deletes the previous bucket that contains the profile picture, create new bucket, create new file and display it. If the user didn't add a profile picture, it just updates it for the user.
- The can update their name.
- The user can update email, if the user made any changes in the email input, a new input for password will be displayed.
  -The user can update prefrences.

This is being done with Appwrite Node-SDK as it displays the already existing information and allows the user to update them.

<u>Utilized from Appwrite:</u>
[List Users](https://appwrite.io/docs/server/users?sdk=nodejs-default#usersList) Node SDK.
[Get User](https://appwrite.io/docs/server/users?sdk=nodejs-default#usersGet) Node SDK.
[Delete Bucket](https://appwrite.io/docs/server/storage?sdk=nodejs-default#storageDeleteBucket) Node SDK.
[Create bucket](https://appwrite.io/docs/server/storage?sdk=nodejs-default#storageCreateBucket) Node SDK.
[Create File](https://appwrite.io/docs/client/storage?sdk=web-default#storageCreateFile) Web SDK.
[List Files](https://appwrite.io/docs/server/storage?sdk=nodejs-default#storageListFiles) Node SDK.
[Get File Preview](https://appwrite.io/docs/client/storage?sdk=web-default#storageGetFilePreview) Web SDK.
[Get User Initials](https://appwrite.io/docs/client/avatars?sdk=web-default#avatarsGetInitials) Web SDK.
[Update Account Name](https://appwrite.io/docs/client/account#accountUpdateName) Web SDK.
[Update Account Email](https://appwrite.io/docs/client/account?sdk=web-default#accountUpdateEmail) Web SDK.
[Update Account Preferences](https://appwrite.io/docs/client/account#accountUpdatePrefs) Web SDK.
[Get User Preferences](https://appwrite.io/docs/server/users?sdk=nodejs-default#usersGetPrefs) Node SDK.

---

- **Dynamic User Contributions <u>(Appwrite Feature)</u>**<a name="chapter-34"></a>

![Tailwinder Contributio](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/jepj6kuji9zwumaatbme.gif)

The above GIF demonstrates how Appwrite can fetch the user's contributions and categories and display them with dynamic URL that leads to the actual contribution. The code gets all collections and files and loop over them filtering only the ones created by the user and provides a dynamic URL.

<u>Utilized from Appwrite:</u>
[List Collections](https://appwrite.io/docs/server/database?sdk=nodejs-default#databaseListCollections) Node SDK.
[List Documents](https://appwrite.io/docs/client/database?sdk=web-default#databaseListDocuments) Web SDK.

---

#### 4- **Components**:<a name="chapter-4"></a>

- **Dynamic Components Fetching <u>(Appwrite Feature)</u>**<a name="chapter-41"></a>

As you can see in the above GIF, appwrite is dynamically fetching all submitted components by users, and every component has a unique identified URL and every user has a unique URL as explained before. Also component thumbnails are being fetched from their buckets and displayed to the user.

Components category are being identified and displayed as well dynamically with appwrite.

Components submitters user's profile picture is being dynamically fetched as well.

<u>Utilized from Appwrite:</u>
[List Collections](https://appwrite.io/docs/server/database?sdk=nodejs-default#databaseListCollections) Node SDK.
[List Documents](https://appwrite.io/docs/client/database?sdk=web-default#databaseListDocuments) Web SDK.
[List Files](https://appwrite.io/docs/server/storage?sdk=nodejs-default#storageListFiles) Node SDK.
[Get File Preview](https://appwrite.io/docs/client/storage?sdk=web-default#storageGetFilePreview) Web SDK.
[Get User Initials](https://appwrite.io/docs/client/avatars?sdk=web-default#avatarsGetInitials) Web SDK.
[Get File Preview](https://appwrite.io/docs/client/storage?sdk=web-default#storageGetFilePreview) Web SDK.

---

- **Add New Component <u>(Appwrite Feature)</u>**<a name="chapter-42"></a>

https://www.youtube.com/watch?v=OmuTzSwrvrw

The user is able to add new components to the community. Every component has category, sample pictures, name, description and component code.

The code is catching the component name and transform it into a slug to be used as a dynamic URL for the component.

Appwrite creates new bucket and then add the pictures to this specific bucket with ID same as the component slug.

Then appwrite creates new document with collection name, id, name of component, name of user, id of user, component code and description.

The code automatically and dynamically redirects the user to the submitted component and shows a flash message of success.

<u>Utilized from Appwrite:</u>
[Create bucket](https://appwrite.io/docs/server/storage?sdk=nodejs-default#storageCreateBucket) Node SDK.
[Create File](https://appwrite.io/docs/client/storage?sdk=web-default#storageCreateFile) Web SDK.
[Create Document](https://appwrite.io/docs/client/database?sdk=web-default#databaseCreateDocument) Web SDK.

---

- **Component View <u>(Appwrite Feature)</u>**<a name="chapter-43"></a>

https://www.youtube.com/watch?v=UBrBPC34HUg

As explained above, I have created a unique slug for the component URL along with the users as well. Appwrite fetches the component details and dynamically inject them in the URL. Vue Router is being used for this piece of action.

I also used [Swiper JS](https://swiperjs.com/vue) with Appwrite to display the component sample pictures.

The user is able to view the component sample pictures, name, description, component submitter's details and also is able to copy the code and test it in [TailwindCSS Playground](https://play.tailwindcss.com/).

Comments are available on the table too, and will be displayed to all users who visits this specific component. The user who created the comment is able to delete the component as well.

<u>Utilized from Appwrite:</u>
[Get Document](https://appwrite.io/docs/client/database?sdk=web-default#databaseGetDocument) Web SDK.
[Get User Preferences](https://appwrite.io/docs/server/users?sdk=nodejs-default#usersGetPrefs) Node SDK.
[List Documents](https://appwrite.io/docs/client/database?sdk=web-default#databaseListDocuments) Web SDK.
[List Files](https://appwrite.io/docs/server/storage?sdk=nodejs-default#storageListFiles) Node SDK.
[Delete Document](https://appwrite.io/docs/client/database?sdk=web-default#databaseDeleteDocument) Node SDK.
[Get User Initials](https://appwrite.io/docs/client/avatars?sdk=web-default#avatarsGetInitials) Web SDK.

---

#### 5- **Tailwinder Academy**:<a name="chapter-5"></a>

![Tailwinder Academy](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/5wb34nujv95jxw8hgvsx.gif)

- **Dynamic Resources Fetching <u>(Appwrite Feature)</u>**<a name="chapter-51"></a>

This section is my favorite. It's where users are able to share learning resources with the community. My code uses almost the same structure as [Components](#chapter-4) ,So there is no point of repeating the same here again.

---

- **Add New Resources to The Academy <u>(Appwrite Feature)</u>**<a name="chapter-52"></a>
- **View Resources<u>(Appwrite Feature)</u>**

![Tailwinder Academy Add/View](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/tvqvmp5mjnqknf1ckpvf.gif)

Combining [Youtube](https://developers.google.com/youtube/v3) API with Appwrite turned out to be super fun! The user is able to add new learning resources and others can view them, leave a comment and learn something new. The structure is almost the same so there is no need to repeat it here.

---

#### 6- **Tailwinder Community**:<a name="chapter-6"></a>

https://www.youtube.com/watch?v=T_JYcbKMlvo

This can be considered as a blog for Tailwinders. The user is able to view posts submitted by others or add his own.

The design structure is the same but I added [Deepgram](https://deepgram.com/) touch to it by allowing the user to write articles with their voice.

### Appwrite Utilization

| Appwrite Utilization                                                                                     | SDK      |
| -------------------------------------------------------------------------------------------------------- | -------- |
| [Get File Preview](https://appwrite.io/docs/client/storage?sdk=web-default#storageGetFilePreview)        | Web SDK  |
| [Get User Initials](https://appwrite.io/docs/client/avatars?sdk=web-default#avatarsGetInitials)          | Web SDK  |
| [Update Account Preferences](https://appwrite.io/docs/client/account?sdk=web-default#accountUpdatePrefs) | Web SDK  |
| [Get Account Prefrences](https://appwrite.io/docs/client/account?sdk=web-default#accountGetPrefs)        | Web SDK  |
| [Create Account](https://appwrite.io/docs/client/account?sdk=web-default#accountCreate)                  | Web SDK  |
| [Create Account Session](https://appwrite.io/docs/client/account#accountCreateSession)                   | Web SDK  |
| [Delete Account Session](https://appwrite.io/docs/client/account?sdk=web-default#accountDeleteSession)   | Web SDK  |
| [Get Account](https://appwrite.io/docs/client/account?sdk=web-default#accountGet)                        | Web SDK  |
| [List Documents](https://appwrite.io/docs/client/database?sdk=web-default#databaseListDocuments)         | Web SDK  |
| [Create Document](https://appwrite.io/docs/client/database?sdk=web-default#databaseCreateDocument)       | Web SDK  |
| [Get Document](https://appwrite.io/docs/client/database?sdk=web-default#databaseGetDocument)             | Web SDK  |
| [Create File](https://appwrite.io/docs/client/storage?sdk=web-default#storageCreateFile)                 | Web SDK  |
| [Update Account Name](https://appwrite.io/docs/client/account#accountUpdateName)                         | Web SDK  |
| [Get User Preferences](https://appwrite.io/docs/server/users#usersGetPrefs)                              | Node SDK |
| [List Users](https://appwrite.io/docs/server/users?sdk=nodejs-default#usersList)                         | Node SDK |
| [Get User](https://appwrite.io/docs/server/users?sdk=nodejs-default#usersGet)                            | Node SDK |
| [Delete Bucket](https://appwrite.io/docs/server/storage?sdk=nodejs-default#storageDeleteBucket)          | Node SDK |
| [Create bucket](https://appwrite.io/docs/server/storage?sdk=nodejs-default#storageCreateBucket)          | Node SDK |
| [List Files](https://appwrite.io/docs/server/storage?sdk=nodejs-default#storageListFiles)                | Node SDK |
| [Update Account Email](https://appwrite.io/docs/client/account?sdk=web-default#accountUpdateEmail)       | Web SDK  |
| [List Collections](https://appwrite.io/docs/server/database?sdk=nodejs-default#databaseListCollections)  | Node SDK |
| [Delete Document](https://appwrite.io/docs/client/database?sdk=web-default#databaseDeleteDocument)       | Node SDK |

## Author

👤 **Mostafa Said**

- Website: https://linktr.ee/moosesaid
- Twitter: [@Moose_Said](https://twitter.com/Moose_Said)
- Github: [@MooseSaeed](https://github.com/MooseSaeed)
- LinkedIn: [@moosesaid](https://linkedin.com/in/moosesaid)

## 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/MooseSaeed/Tailwinder/issues).

## Show your support

Give a ⭐️ if this project helped you!

## 📝 License

Copyright © 2022 [Mostafa Said](https://github.com/MooseSaeed).<br />
This project is [MIT](https://github.com/MooseSaeed/Tailwinder/blob/master/LICENSE) licensed.
