## Steps to Getting Started on a Browser Game (extracted from SEI Course Material Guidelines)

1. **Analyze the app's functionality**: The app's features, from the user's point of view, should be described using _User Stories_.

    As a user, I want to be able to play Tic Tac Toe (ie, be able to mark out X and O on a 9-grid box).
    As a user, I would like feedback on when it's my turn and who has won the game.

2. **Think about the overall design (look & feel) of the app**

    Take the users (audience) of the app into consideration when determining the overall look and feel the app should have. Should the app have a clean/minimalist UI (current trend),  or should it be themed to match the app's purpose?

3. **Wireframe the UI**

    Wireframes provide a blueprint for the HTML & CSS. Wireframes also help reveal an application's state (data) and functionality.

4. **Pseudocode**

   Pseudocode outlines the app's logic using plain language. It provides a road map to writing the code itself. For example, pseudocoding the logic for when a player makes a move, checking if the game has been won, etc., will prove to be helpful when writing the actual code.

5. **Identify the application's state (data)**

    What does the application need to "remember" throughout its execution?

    Use the wireframe and pseudocode to help identify what state needs to be tracked.

6. **Set up the project**

- Create a directory for the project in the `~/code` folder.

- Create the starting folders/files within the project folder:

  - **index.html**
  - **css/main.css**
  - **js/main.js**

- Create the HTML boilerplate within **index.html** using `![tab]`.

- Link **main.css** in the `<head>`.

- Add a `<script>` tag to load the **main.js** in the `<head>`.

  Be sure to use the `defer` attribute to ensure that the DOM is ready before the script runs.
  
  Here you go:

    ```html
    <script defer src="js/main.js"></script>
    ```

7. **Create a local repo**

- Make your project a local repo with `git init`.

- Next, think about the name for your remote repo on GitHub - using a name that represents your choice of game, e.g., "blackjack", is better than something like "project-1".  It's also recommended that the name of the repo and the project directory match.

- Create your remote repo in your **PERSONAL** GitHub account - be sure **NOT** to check the "Initialize this repository with a README" checkbox (you'll want to `touch README.md` locally).
  
- Run the terminal command that the GitHub instructions provides to add the remote in your local repo.  It will look like this:

    ```bash
    git remote add origin <the URL to your repo>
    ```
  
- Make your first commit:  `git add -A`, then `git commit -m "Initial commit"`
  
- Push the commit to the repo for the **first time** using:<br />`git push -u origin main`.  

- Future pushes can now be made using just<br /> `git push`.

8. **Organize the app's JS into sections**

 Copy/paste the following comment headings to help you organize your app's code:

```js
 /*----- constants -----*/


 /*----- state variables -----*/


 /*----- cached elements  -----*/


 /*----- event listeners -----*/


 /*----- functions -----*/

```

9. **Code away!**

- Start with some HTML in index.html for the basic layout of the UI. If an element's content is going to come from the `render` function, you may want to temporarily include mocked content in the HTML to help with layout and styling. However, once the content is being provided by the `render()` function, you should remove the mocked content from index.html.

- Declare, but don't initialize, the application-wide state variables. The initialization of the variables to their "initial" state should be done within an `initialize`, or similarly named function, e.g., `init`.

- Write that `initialize` function.

- Invoke `initialize()` to "kick off" the app.

- Now that the `initialize` function has initialized the state variables, the last line in `initialize` should be `render();` to render that state to the DOM for the first time.

- Stub up that `render()` function.
  
- As a reminder, after state has been updated in an event listener, the last line of code in the event listener function should be a call to `render();` again, to render the state to the DOM.

- Register event listeners - be sure to use event delegation!

- Code the event listener(s). This is where most of the app's logic will exist.

11. **Make frequent git commits**

At a minimum, commit after each "milestone" or feature implementation.

12. **Have fun!**
