const BASE_URL = 'https://jsonplace-univclone.herokuapp.com';

///////////////////---MODULE 1---////////////////////////

//------------------fetchUsers-----------------------//
/* UPDATED:
function fetchUsers() {
  return fetchData(`${ BASE_URL }/users`);
}
*/

// ORIGINAL CODE!!!!!!!
function fetchUsers() {
    return fetch(`${ BASE_URL }/users`)
    
    .then(function(response) {
      // converts the response from JSON to an actual object
      // call json on the response, and return the result
      return response.json();
    })
    
    // '.catch' logs the error:
    .catch(function(error) {
      // use console.error to log out any error
      console.error(error);
    });
}

// '.then' converts the response from JSON to an actual object 
fetchUsers().then(function(data) {
    console.log(data);
  });


// Next two functions show these arrays to the end user:
//----------------------renderUser-----------------------//
function renderUser(user) {
  // use templating:
  return $(`<div class="user-card">
  <header>
    <h2>${user.name}</h2>
  </header>
  <section class="company-info">
    <p><b>Contact:</b> ${user.email}</p>
    <p><b>Works for:</b> ${user.company.name}</p>
    <p><b>Company creed:</b> "${user.company.catchphrase}, which will ${user.company.bs}"</p>
  </section>
  <footer>
    <button class="load-posts">POSTS BY ${user.username}</button>
    <button class="load-albums">ALBUMS BY ${user.username}</button>
  </footer>
</div>`).data('user', user) // '.data()' attaches the user so we know which user we are talking about whenever we click on those buttons
};


//-------------------renderUserList----------------------//
function renderUserList(userList) {
  // use loop & append:
  // Grab the element with id equal to 'user-list':
  const renderUserListElem = $('#user-list');

  // empty it:
  renderUserListElem.empty();

  //append the result of 'renderUser' to it for each 'user' in the 'userList':
  userList.forEach(function(user) {
    renderUserListElem.append(renderUser(user));
  });
};

                        /*--- INTERACTIVITY ---*/

// Button for loading POSTS (click listener): 
$('#user-list').on('click', '.user-card .load-posts', function() {
  // Use the element '$(this)', and the '.closest()' function to recover the user object that '.data()' attached.
  const user = $(this).closest('.user-card').data('user');

  // load posts for this user:
  // UPDATE:
  fetchUserPosts(user.id)
  // render posts for this user:
  // UPDATE:
  .then(renderPostList);

});

// Button for loading ALBUMS (click listener):
$('#user-list').on('click', '.user-card .load-albums', function() {
  // Same as above:
  const user = $(this).closest('.user-card').data('user');

  // load albums for this user:
  // UPDATE Mod2: replace the logging from the previous module with calling 'fetchUserAlbumList', passing in the 'user.id' from our recovered user object:
  fetchUserAlbumList(user.id)
  // render albums for this user:
  // UPDATE Mod2: attach a '.then' callback which renders the album list:
  .then(renderAlbumList);
  
});

//////////////////////---MODULE 2--////////////////////////

/* get an album list, or an array of albums */
/* UPDATED:
function fetchUserAlbumList(userId) {
  return fetchData(`${ BASE_URL }/users/${ userId }/albums?_expand=user&_embed=photos`);
} 
*/

// ORIGINAL CODE!!!!!!!!
function fetchUserAlbumList(userId) {
  return fetch(`${ BASE_URL }/users/${ userId }/albums`)
  
  .then(function (response) {
    // convert from JSON to an object, and return
    return response.json();
  }).catch(function (error) {
    // console.error out the error
   console.error(error);
  })
}; 

fetchUserAlbumList(1).then(function (albumList) {
  console.log(albumList);
});


/*----------------helper function------------------*/

function fetchData(url) {
  // Call fetch on the passed in url
  // Return the result of the fetch
  return fetch(url)
  // Using .then, convert the incoming response JSON to an object
  .then(function(response) {
    return response.json();
  })
  // Using .catch, log an error when we catch one
  .catch(function(error) {
    console.error(error);
  })
 
}
/*-------------------------------------------------*/

/* render a single album */
function renderAlbum(album) {
  const albumCardElem = $(`<div class="album-card">
  <header>
    <h3>${album.title}, by ${album.user.username}</h3>
  </header>
  <section class="photo-list">
    <div class="photo-card"></div>
    <div class="photo-card"></div>
    <div class="photo-card"></div>
    <!-- ... -->
  </section>
</div>`);
  // create the album-card element with an empty photo-list element in it:
  const photoListElem = albumCardElem.find('.photo-list');

  // loop over the 'album.photos':
  album.photos.forEach(function(photo) {
    // append the result of 'renderPhoto' into the element matching '.photo-list':
    photoListElem.append(renderPhoto(photo));
  });
  return albumCardElem;
};

/* render a single photo */
function renderPhoto(photo) {
  return $(`<div class="photo-card">
    <a href="${photo.url}" target="_blank">
      <img src="${photo.thumbnailUrl}">
      <figure>${photo.title}</figure>
    </a>
  </div>`);
};

/* render an array of albums */
function renderAlbumList(albumList) {
  // remove the class "active" from any #app section.active:
  $('#app section.active').removeClass('active');

  // add the class "active" to #album-list, and make sure to call .empty()
  const albumListElem = $('#album-list');
  albumListElem.empty();
  albumListElem.addClass('active');

  /* Loop over the 'albumList' and append the result of 'renderAlbum' 
  to the '#album-list' element for each album in the list. */
  albumList.forEach(function(album) {
    albumListElem.append(renderAlbum(album));
  });
};

///////////////////////---MODULE 3---////////////////////////////

//----------------------- FETCH METHODS -------------------------
function fetchUserPosts(userId) {
  return fetchData(`${ BASE_URL }/users/${ userId }/posts?_expand=user`);
}

function fetchPostComments(postId) {
  return fetchData(`${ BASE_URL }/posts/${ postId }/comments`);
}

//--------------------setCommentsOnPost---------------------//

function setCommentsOnPost(post) {
  // if we already have comments...
  if (post.comments) {
    // #1: Something goes here
    // return a rejected promise:
    // pass in 'null' as the argument to '.reject" to return something:
    return Promise.reject(null);
  }

  // fetch, upgrade the post object, then return it
  return fetchPostComments(post.id)
            .then(function (comments) {
    // #2: Something goes here (successful fetch):
    // store the incoming comments inside the post object:
    post.comments = comments;
    // we want the 'post' and its comments:
    // when we return the 'post', it has the comments inside:
    return post;
  });
}

//---------------------Rendering Posts----------------------//

function renderPost(post) {
  // use title, user's username, and body from the 'post' object:
  return $(`<div class="post-card">
  <header>
    <h3>${post.title}</h3>
    <h3>--- ${post.user.name}</h3>
  </header>
  <p>${post.body}</p>
  <footer>
    <div class="comment-list"></div>
    <a href="#" class="toggle-comments">(<span class="verb">show</span> comments)</a>
  </footer>
</div>`).data('post', post) // attach the 'post' object to the element being returned from renderPost
}

function renderPostList(postList) {
  // remove the active class from the current active section:
  // Just like 'renderAlbumList' function:
  $('#app section.active').removeClass('active');

  const postListElem = $('#post-list');
  // empty the '#post-list' and add the 'active' class to it:
  postListElem.empty();
  postListElem.addClass('active');

  // Loop over the 'postList':
  postList.forEach(function(post) {
    // append the returns from 'renderPost' into '#post-list':
    postListElem.append(renderPost(post));
  });
}

//--------------------Showing/Hiding Comments--------------------//

/* When we use this, we are going to pass in the relevant 
'#post-card' element so that we can add/remove classes, and 
update the text to/from show and hide. */

function toggleComments(postCardElement) {
  const footerElement = postCardElement.find('footer');

  if (footerElement.hasClass('comments-open')) {
    footerElement.removeClass('comments-open');
    footerElement.find('.verb').text('show');
  } else {
    footerElement.addClass('comments-open');
    footerElement.find('.verb').text('hide');
  }
}

//------------------------Click Handler--------------------------//

// attach a click handler for users clicking on the .toggle-comments:

$('#post-list').on('click', '.post-card .toggle-comments', function() {
  const postCardElement = $(this).closest('.post-card');
  const post = postCardElement.data('post');
  // render '.comments' into the '.comment-list':
  // specifically, into the '.comment-list' inside our 'postCardElement':
  // so use '.find()' method:
  const commentListElem = postCardElement.find('.comment-list');

  setCommentsOnPost(post)
    .then(function (post) {
      console.log('building comments for the first time...', post);
      // First, just in case, empty it:
      commentListElem.empty();
      // then loop over the 'post.comments':
      post.comments.forEach(function(comment) {
        // append an <h3> tag with the 'comment.body' and the 'comment.email' as the text:
        commentListElem.append($(`
        <h3>${comment.body}, ${comment.email}</h3>`
        ))
      });
      // call 'toggleComments' on the 'postCardElement':
      toggleComments(postCardElement);
    })

    .catch(function () {
      console.log('comments previously existed, only toggling...', post);
    
      // call 'toggleComments' on the 'postCardElement':
      toggleComments(postCardElement);
    });
});


//////////////////////--BOTTOM--///////////////////////////

/*
fetchUsers().then(function (data) {
  renderUserList(data);
}); */
// replaced with:


function bootstrap() {
  // move the line about fetchUsers into here
  fetchUsers().then(renderUserList);
}

bootstrap();

//fetchUserAlbumList(1).then(renderAlbumList);