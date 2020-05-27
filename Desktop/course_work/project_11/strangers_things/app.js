/*         *-METHODS-*
* CREATE --> POST (server associateas a POST request with creating new objects in the database)
* READ ----> GET
* UPDATE --> PATCH/PUT
* DESTROY -> DELETE
*/

        /************* User Endpoints *************/
// POST /api/users/register

// POST /api/users/login   
/* (request params = 'username' & 'password') */
/* sets the token in localStorage */
async function login(password, username) {
    let response = await fetch(
        'http://strangers-things.herokuapp.com/api/users/login',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user: {
                    username: username,
                    password: password
                }
            })
        }
    );
    let data = await response.json();
    console.log('login data', data);
    let token = data.data.token;
    console.log(token);
    localStorage.setItem('token', token);
}

$('.loginForm').on('click', '#loginButton', function(event) {
    event.preventDefault();
    let username = $('#usernameLogin').val();
    let password = $('#passwordLogin').val();
    console.log(username, password)
    login(username, password)
})


// GET /api/users/me
/* (request params = none, return params = 'user'(object)) */

        /************* Test Routes ****************/
        /* 2 test routes to pass token to... */
// GET /api/test/me

// GET /api/test/data

        /***************** Posts ******************/
// GET /api/posts
/* (request params = none, return params = 'posts'(array of objects)) */

async function getAllPosts() {
    let token = localStorage.getItem('token');
    
    let response = await fetch('http://strangers-things.herokuapp.com/api/posts', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        });
    let data = await response.json();
    console.log('get all posts', data);
    let myPosts = data.data.posts.filter(function(post){
        return post.isAuthor
    })
    console.log(myPosts)
}

$('#post-form').on('click', '#createUpdateButton', async function(event) {
    event.preventDefault();
    let token = localStorage.getItem('token');
    let title = $('#post-title').val();
    let description = $('#post-body').val();
    let price = $('#post-price').val();
    let location = $('post-location').val();
    let deliver = $('#delivery').val();

    let post = await fetch('http://strangers-things.herokuapp.com/api/posts', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
        body: JSON.stringify({
          post: {
            token, // OR token: token
            title,
            description,
            price,
            location,
            deliver
          }
        })
    });
})

///////////////////---GOOD TIL HERE---///////////////////////

async function renderPost


// POST /api/posts
// DELETE /api/posts/POST_ID



        /***************  Messages *****************/
// POST /api/posts/POST_ID/messages









///////////////////---REGISTER / LOGIN / LOGOUT---////////////////////



/***** HELPER FUNCTIONS *****/

function getToken() {
    return localStorage.getItem('token');
}

function logOut() {
    // which clears the token in localStorage
    localStorage.clear();
}

function isLoggedIn() {
    // which lets you know if there's a current user logged in
    // return BOOLEAN?
    let booleanValue = true;
    function checkLogin() {
        if(booleanValue) {
            return "is logged in";
        }
    }
}

function updateLogin() {
    let isValid = isLoggedin();
    let username = localStorage.getItem('username');
}


/* Needed for fetch requests: */
function makeHeaders() {
    /* which creates a headers object with or without 
    the bearer token depending on what is in localStorage */
}

///////////////////////---POPULATEPOSTS---////////////////////////

async function populatePosts() {
    /* fetch posts: */
    try {
        const posts = await readPosts();
        const postListElement = $('#posts');
        /* render posts into page: */
        posts.forEach(post => {
            postListElement.append(renderPost(post))
        })
    } catch(error) {
        console.error(error);
    }
};

function renderPost(post) {
    const {id, title, body} = post;
    return ($(`
        <div class="post" data-id="${ id }">
            <h3>${ title }</h3>
            <p>${ body }</p>
            <button class="edit">EDIT</button>
            <button class="delete">DELETE</button>
        </div>
        `).data('post', post))
};

///////////////////////---CLICK HANDLERS---////////////////////////

/* EDIT */
$('#posts').on('click', '.edit', function() {
    const postElement = $(this).closest('.post');
    const post= postElement.data('post');
  
    // One way to edit posts:  
    $('#post-form').data({ post, postElement });
    // Change the post title to post title:
    $('#post-title').val(post.title);
    // Set post-body value to the post body:
    $('#post-body').val(post.body);
});

/* DELETE */
$('#posts').on('click', '.delete', async function() {
    const postElement = $(this).closest('.post');
    const post = postElement.data('post');
    
    try {
        const result = await deletePost(post.id);
        postElement.slideUp()
    }
    catch (error) {
        console.error(error);
    }
});

/* FORM HANDLER */
$('#post-form').on('submit', async function(event) {
    event.preventDefault();

    const { post, postElement } = $(this).data();
    console.log(post, postElement);

    const postData = {
        title: $('#post-title').val(),
        body: $('#post-body').val()
    }
    // Only create if we're not editing:
    // If there was a post attached, we're editing...
    if (post) {
        try { // call updatePost:
            const result = await updatePost(post.id, postData)
            const updatedElement = renderPost(result);
            // use jquery method "replaceWith": 
            // (grab newly returned data from backend and replace the element on the page with it)
            postElement.replaceWith(updatedElement);
            // Clear out the post form:
            $('#post-form').data({ post: null, postElement: null});
            $('#post-form').trigger('reset');
        }
        catch (error) {
            console.error(error)
        }

    } else { // ...else, we're not:
        try {
            const newPost = await createPost(postData);
            $('#posts').prepend(renderPost(newPost));
            $('#post-form').trigger('reset');
        }
        catch(error) {
            console.error(error);
        }
    }
});

                    /**** READ (existing data)****/
///////////////////////---READ POSTS---////////////////////////
async function readPosts() {
    try {
        const response = await fetch ('https://strangers-things.herokuapp.com/docs/');
        const posts = await response.json();
        return posts;
    } catch(error) {
        throw error;
    }
};

                    /**** CREATE (new data)****/
///////////////////////---CREATE POST---////////////////////////
async function createPost(postObj) {
    try {
        const response = await fetch(`https://strangers-things.herokuapp.com/docs/`, {
            method: "POST",
            body: JSON.stringify(postObj),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        });
        const newPost = await response.json();
        return newPost;
    }
    catch(error) {
        throw error;
    }
};

                    /**** UPDATE (make changes to existing data)****/
///////////////////////---UPDATE POSTS---////////////////////////
async function updatePost(postId, updatedPostObj) {
    try {
        const response = await fetch(`https://strangers-things.herokuapp.com/docs/${ postId }`, {
        method: "PATCH",
        body: JSON.stringify(updatedPostObj),
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
        });
        const result = await response.json();
        console.log("UPDATED", result);

        return result;
    }
    catch(error) {
        throw error;
    }
};

                    /**** DELETE (remove existing data) ****/
///////////////////////---DELETE POSTS---////////////////////////
async function deletePost(postId) {
    try {
        const response = await fetch(`https://strangers-things.herokuapp.com/docs/${ postId }`, {
            method: "DELETE" // method = key; delete = value
        })
        const data = await response.json();
        return data;
    }
    catch(error) {
        throw error;
    }
};

///////////////////////---MODAL---////////////////////////

/* Modal code can be found @ https://www.labnol.org/code/20083-modal-popup-css */


