const USERS_URL = `https://reqres.in/api/users?per_page=2`;

const metadata = {
  minPage: 1,
  currentPage: null,
  maxPage: null
};

function renderUser(user) {
  return $(`<div class="user">
    <h3>${ user.first_name } ${ user.last_name }</h3>
    <h4>${ user.email }</h4>
    <img src="${ user.avatar }" />
  </div>`);
}

function renderUserList(userList) {
  $('#user-list').empty();

  userList.forEach(function (user) {
    $('#user-list').append( renderUser(user) );
  });
}

function updatePageInfo() {
  $('#page-info').text(
    `Page number ${ metadata.currentPage } out of ${ metadata.maxPage }`
  );
}

function updateButtons() {
  $('#forward, #back').removeAttr('disabled');

  if (metadata.currentPage === metadata.maxPage) {
    $('#forward').attr('disabled', true);
  }

  if (metadata.currentPage === metadata.minPage) {
    $('#back').attr('disabled', true);
  }
}

function fetchUserList(currentPage = 1) {
  fetch(`${ USERS_URL }&page=${ currentPage }`)
    .then(function (res) {
      return res.json();
    })
    .then(function (userData) {
      console.log(userData);
      metadata.currentPage = userData.page;
      metadata.maxPage = userData.total_pages;
      renderUserList( userData.data );
      updatePageInfo();
      updateButtons();
    })
    .catch(function (error) {
      console.error( error );
    });
}

$('#back').on('click', function () {
  if (metadata.minPage <= metadata.currentPage - 1) {
    fetchUserList(metadata.currentPage - 1);
  }
});

$('#forward').on('click', function () {
  if (metadata.maxPage >= metadata.currentPage + 1) {
    fetchUserList(metadata.currentPage + 1);
  }
});

function bootstrap() {
  fetchUserList();
}

bootstrap();


/*  -----------------STARTING CODE--------------------
const USERS_URL = `https://reqres.in/api/users?per_page=2`;

const metadata = {
  minPage: 1,
  currentPage: null,
  maxPage: null
};

function renderUser(user) {
}

function renderUserList(userList) {
}

function updatePageInfo() {
}

function updateButtons() {
}

function fetchUserList(currentPage = 1) {
}

$('#back').on('click', function () {
});

$('#forward').on('click', function () {
});

function bootstrap() {
}

bootstrap();
*/