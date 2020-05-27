/**
 * For repOne:
 * 
 * Use object destructuring to replace the first line.
 * 
 * You should be able to flatten each interpolated value one level at
 * least in this way.
 * 
 * You can also do the same to the mapping function.
 * 
 * Either destructure in the function parameters, or inside the function.
 */
function repOne() {
    const data = getUser();
  //html {'#one'}
    $('#one').html(`
      <h2>${ data.username }</h2>
      <h3>Lives in ${ data.address.city }, ${ data.address.state }</h3>
      <h4>Current age: ${ data.age }</h4>
      ${
        data.posts.map(function (post) {
          return `<div>
            <p>${ post.title }</p>
            <p>${ post.content }</p>
          </div>`
        }).join('')
      }
    `);
  }
  
  /**
   * For repTwo:
   * 
   * Don't worry about the userList, that's fine.
   * 
   * Do use array destructuring to pull out the username, age, 
   * city and state from the user array passed into the forEach function
   * 
   * Then, clean up the template to reflect your new variables.
   */
  function repTwo() {
    const userList = getUserList();
  
    userList.forEach(function (user) {
      // destructure here
      $('#two').append($(`<p>
        ${ user[0] } (age ${ user[1]}), lives in ${ user[2] }, ${ user[3] }
      </p>`));
    });
  }
  
  /**
   * For repThree:
   * 
   * Use array destructuring to replace the three variable assignments
   * over three lines to two over one line.
   * 
   * Here the template will not need to be cleaned up.
   */
  function repThree() {
    const {[methods = getMathFunctions();
    const add = methods[0];
    const subtract = methods[1];]}
  
    $('#three').append($(`
      <p>3 + 8 = ${ add(3, 8) }</p>
      <p>12 - 5 = ${ subtract(12, 5) }</p>
    `));
  }
  
  /**
   * For repFour:
   * 
   * Don't change repFour!  Instead modify repForRenderUser.
   * 
   * Leave the function parameters alone, and replace the six variable
   * definitions over the six lines with object destructuring.
   * 
   * Try to use nested object destructuring to grab the city and state.
   * 
   * Also, use object destructuring in the function parameter for the
   * mapping function.  Do not do it inside the function.
   * 
   * You won't have to edit the template.
   */
  function repFourRenderUser( user ) {
    /* replace variables with destructuring here */
    const username = user.username;
    const address = user.address;
    const city = address.city;
    const state = address.state;
    const age = user.age;
    const posts = user.posts;
  
    return $(`<div>
      <h2>${ username }</h2>
      <h3>Lives in ${ city }, ${ state }</h3>
      <h4>Current age: ${ age }</h4>
      ${
        posts.map(function (post) {
          const title = post.title;
          const content = post.content;
  
          return `<div>
            <p>${ title }</p>
            <p>${ content }</p>
          </div>`
        }).join('')
      }
    </div>`);
  }
  
  /* Remember: don't change repFour */
  function repFour() {
    const user = getUser();
  
    $('#four').append( repFourRenderUser(user) );
  }
  
  /**
   * For repFive:
   * 
   * Don't change repFive! Instead change repFiveRenderUser.
   * 
   * Here, don't change the function parameters, instead use
   * array destructuring to clean up the variable assignment.
   * 
   * You won't have to change the template.
   */
  
  
  function repFiveRenderUser(user) { 
    /* destructure here */
    const username = user[0];
    const age = user[1];
    const city = user[2];
    const state = user[3];
  
    return $(`<p>
      ${ username } (age ${ age }), lives in ${ city }, ${ state }
    </p>`);
  }
  
  /* Remember, don't change repFive */
  function repFive() {
    const users = getUserList();
  
    users.forEach(function (user) {
      $('#five').append( repFiveRenderUser(user) );
    });
  }
  
  /**
   * For repSix: 
   *
   * Don't change repSix, instead change repSixRenderMath.
   * 
   * Use array destructuring in the function parameter to grab add 
   * and subtract, and remove the variable assignment inside the
   * function.
   * 
   * You won't have to change the template.
   */
  function repSixRenderMath(funcs) { // destructure here
    const add = funcs[0];
    const subtract = funcs[1];
  
    return `
      <p>3 + 8 = ${ add(3, 8) }</p>
      <p>12 - 5 = ${ subtract(12, 5) }</p>
    `;
  }
  
  /* Remember, don't change repSix */
  function repSix() {
    const mathFuncs = getMathFunctions();
  
    $('#six').html( repSixRenderMath(mathFuncs) );
  }
  
  
  /* ================ DO NOT EDIT BELOW THIS LINE ================ */
  function getUser() {
    return {
      username: 'joe',
      address: { city: 'realtown', state: 'pa' },
      age: 37,
      posts: [
        { title: 'hello', content: 'hey everyone, nice app' },
        { title: 'what is new?', content: 'anyone got something good to share?' },
      ],
    }
  }
  
  function getUserList() {
    return [
      [ 'suzy', 42, 'garbanzo', 'tx' ],
      [ 'jane', 25, 'gardensville', 'or' ],
      [ 'jazmine', 82, 'university center', 'ky' ]
    ];
  }
  
  function getMathFunctions() {
    return [
      function (x, y) { return x + y; },
      function (x, y) { return x - y; }
    ];
  }
  
  // Bootstrapping, no need to edit
  repOne();
  repTwo();
  repThree();
  repFour();
  repFive();
  repSix();