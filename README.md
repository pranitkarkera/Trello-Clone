# Trello Clone

A Trello (list management app) where you can browse, search, add, edit, and view detailed list and card.  
Built with a React frontend, Express/Node backend, MongoDB database, Dnd kit.

---

## Demo Link

[Live Demo](https://trello-clone--gilt.vercel.app/)  

---

## Quick Start

```
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
npm install
npm run dev      # or `npm start` / `yarn dev`
```

## Technologies
- React JS
- React Router
- Node.js
- Express
- MongoDB
- Dnd kit


## Features
**Home**
- Displays a list of all boards
- Modify or delete board
- Change the background color of board.

**Task Listing**
- Arranged task list
- “Add New list” button opens a form
- Drag and drop to rearrange the list

**Card Listing**
- View due date and update if needed.
- Drag and drop card into different list


## API Reference

### **GET	/api/list**<br>	 
List all lists<br>	 
Sample Response:<br>
```[{ _id, listName, ... }, …]```

### **GET	/api/list/:id**<br>	 	
Get details for one list<br>		
Sample Response:<br>
```{ _id, listName, {cardId, cardName, cardDueDate} ... }```

### **POST	/api/list**<br> 	
Create a new list (protected)<br>	
Sample Response:<br>
```{ _id, listName, ... }```


## Contact
For bugs or feature requests, please reach out to pranitkarkera99@gmail.com
