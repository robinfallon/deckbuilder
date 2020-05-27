"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ajax = {
    delete: function _delete(url) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return this.get(url, {
            method: 'DELETE',
            ...options
        });
    },
    get: function get(url) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            ...options
        }).then(function (response) {
            return response.json();
        });
    },
    post: function post(url, data) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        return this.get(url, {
            method: 'POST',
            body: JSON.stringify(data),
            ...options
        });
    },
    put: function put(url, data) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        return this.post(url, data, {
            method: 'PUT',
            ...options
        });
    }
};
var allPosts = [];

function getToken() {
    return localStorage.getItem('token');
}

function isLoggedin() {
    return !!getToken();
}

function updateLogin() {
    var isAuthenticated = isLoggedin();
    var username = localStorage.getItem('username');

    if (isAuthenticated) {
        $('.login').hide();
        $('.user').show();
        $('.user #__username').text(username);
    } else {
        $('.login').show();
        $('.user').hide();
        $('.user #__username').text();
    }
}

function renderPosts() {
    var posts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : allPosts;
    var backButtonVisible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var backButton = $('.back');
    backButtonVisible ? backButton.addClass('active') : backButton.removeClass('active');
    $('#posts').empty();
    posts.forEach(function (post) {
        return $('#posts').append(renderPost(post));
    });
}

function renderPost(post) {
    var _post$author$username = post.author.username,
        username = _post$author$username === void 0 ? localStorage.getItem('username') : _post$author$username,
        isAuthor = post.isAuthor,
        description = post.description,
        title = post.title;
    var isAuthenticated = isLoggedin();
    var isCurrentUser = username === localStorage.getItem('username');
    return $("\n\t\t<article class='card'>\n\t\t\t<header class=\"clear\">\n\t\t\t\t<h3>".concat(title, "</h3>\n\t\t\t\t<div class='__info right'>\n\t\t\t\t\t<i class='material-icons'>face</i><sub>").concat(username, "</sub>\n\t\t\t\t</div>\n\t\t\t</header>\n\t\t\t<p>").concat(description, "</p>\n\t\t\t<footer class='clear'>\n\t\t\t\t").concat(isAuthenticated && !isAuthor && !isCurrentUser ? '<label class="button seller_btn" for="modal_3">Message Seller</label>' : '', "\n\t\t\t\t").concat(isAuthenticated && isAuthor ? "<button class='delete error right'>Delete</button>" : '', "\n\t\t\t</footer >\n\t\t</article > ")).data('post', post);
}

function renderMessage(message) {
    var content = message.content,
        username = message.fromUser.username,
        title = message.post.title;
    var isCurrentUser = username === localStorage.getItem('username');
    return "\n\t\t<article class=\"card\">\n\t\t\t<header class=\"clear\">\n\t\t\t\t<h3>".concat(title, "</h3>\n\t\t\t\t").concat(isCurrentUser ? '<label class="right">Sent</label>' : '<label class="right">Received</label>', "\n\t\t\t</header>\n\t\t\t<p>").concat(content, "</p>\n\t\t</article>\n\t");
}

;

function renderMessages() {
    var messages = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var backButtonVisible = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var posts = $('#posts');
    var backButton = $('.back');
    backButtonVisible ? backButton.addClass('active') : backButton.removeClass('active');
    messages.forEach(function (message) {
        return posts.append(renderMessage(message));
    });
}

async function fetchMessages() {
    $('#posts').empty();
    toggleSpinner();
    var data = await ajax.get('https://strangers-things.herokuapp.com/api/users/me', {
        headers: {
            'Authorization': "Bearer ".concat(getToken())
        }
    });
    renderMessages(data.messages, true);
    toggleSpinner();
}

async function fetchPosts() {
    $('#posts').empty();
    toggleSpinner();
    var data = await ajax.get('https://strangers-things.herokuapp.com/api/posts', {
        headers: {
            'Authorization': "Bearer ".concat(getToken(), " ")
        }
    });
    var posts = data.data.posts;
    allPosts = posts;
    toggleSpinner();
    renderPosts(allPosts);
}

async function fetchCurrentUsersPosts() {
    $('#posts').empty();
    toggleSpinner();
    var data = await ajax.get('https://strangers-things.herokuapp.com/api/users/me', {
        headers: {
            'Authorization': "Bearer ".concat(getToken(), " ")
        }
    });
    var posts = data.posts;
    toggleSpinner();
    renderPosts(posts, true);
}

function toggleSpinner() {
    $('.__spinner').toggleClass('active');
}

function toggleMenu() {
    $('.user .__menu_wrapper, .__search_wrapper, main').toggleClass('active');
}

function updatePage() {
    updateLogin();
    fetchPosts();
}

$('#posts').on('click', '.delete', function () {
    var _$$closest$data = $(this).closest('.card').data('post'),
        _id = _$$closest$data._id;

    ajax.delete("https://strangers-things.herokuapp.com/api/posts/".concat(_id), {
        headers: {
            'Authorization': "Bearer ".concat(getToken())
        }
    }).then(function () {
        return fetchPosts();
    });
});
$('#auth-form').on('submit', async function (event) {
    event.preventDefault();
    var username = $('#username').val();
    var password = $('#password').val();
    var isAuthenticated = isLoggedin();

    try {
        if (!isAuthenticated) {
            var _await$ajax$post = await ajax.post('https://strangers-things.herokuapp.com/api/users/login', {
                user: {
                    username: username,
                    password: password
                }
            }),
                token = _await$ajax$post.data.token;

            localStorage.setItem('token', token);
            localStorage.setItem('username', username);
            $('#auth-form')[0].reset();
        } else {
            localStorage.clear();
        }
    } catch (e) {
        console.error(e);
    } finally {
        updatePage();
    }
});

function hideModal() {
    $('.modal > [type=checkbox]').each(function (index, modal) {
        modal.checked = false;
    });
}

$('#signup-form').on('submit', async function (event) {
    event.preventDefault();
    var username = $('#sign_username').val();
    var password = $('#sign_password').val();
    var confirmPassword = $('#sign_verify_password').val();
    var errorElm = $($(event.target).children('#__error')[0]);

    if (password !== confirmPassword) {
        errorElm.text('Please enter matching passwords');
        errorElm.addClass('active');
        return;
    }

    try {
        var data = await ajax.post("https://strangers-things.herokuapp.com/api/users/register", {
            user: {
                username: username,
                password: password
            }
        });
        if (data.error) throw data;
        var token = data.data.token;
        localStorage.setItem('token', JSON.stringify(token));
        localStorage.setItem('username', username);
        hideModal();
        errorElm.removeClass('active');
        errorElm.text('');
    } catch (e) {
        var message = e.error.message;
        errorElm.text(message);
        errorElm.addClass('active');
    } finally {
        updatePage();
    }
});
$('#search').on('keyup', function (e) {
    var text = $(this).val();
    var filteredPosts = allPosts.filter(function (post) {
        return post.title.toLowerCase().includes(text.toLowerCase());
    });
    renderPosts(filteredPosts, true);
});
$('#posts').on('click', 'sub', function () {
    var username = $(this).text();
    var filteredPosts = allPosts.filter(function (post) {
        return post.author.username === username;
    });
    renderPosts(filteredPosts, true);
});
$('#posts').on('click', '.seller_btn', function () {
    var _$$closest$data2 = $(this).closest('.card').data('post'),
        _id = _$$closest$data2._id;

    $('#send-message').data('postId', _id);
});
$('#menu').on('click', toggleMenu);
$('#back').on('click', function () {
    $('#search').val('');
    fetchPosts();
});
$('#view_messages').click(function () {
    toggleMenu();
    fetchMessages();
});
$('#view_posts').click(function () {
    toggleMenu();
    fetchCurrentUsersPosts();
});
$('#logout').click(function () {
    localStorage.clear();
    toggleMenu();
    updatePage();
});
$('#create-post').on('submit', async function (event) {
    event.preventDefault();
    var formValues = $('#create-post').serializeArray();
    var post = formValues.reduce(function (prev, _ref) {
        var name = _ref.name,
            value = _ref.value;
        return _defineProperty({
            ...prev
        }, name, value);
    }, {});

    try {
        var results = await ajax.post("https://strangers-things.herokuapp.com/api/posts", {
            post: post
        }, {
            headers: {
                'Authorization': "Bearer ".concat(getToken()),
                'Content-Type': 'application/json'
            }
        });
        $('#create-post')[0].reset();
        hideModal();
        updatePage();
    } catch (e) {
        console.error(e);
    }
});
$('body').click(function (event) {
    var topElm = $($(event.target).parents()[0]);

    if (!topElm.hasClass('__user_wrapper')) {
        $('.user .__menu_wrapper, .__search_wrapper, main').removeClass('active');
    }
});
$('#send-message').on('submit', async function (event) {
    event.preventDefault();
    var content = $('#message').val();
    var postId = $('#send-message').data('postId');
    if (!postId) return;
    await ajax.post("https://strangers-things.herokuapp.com/api/posts/".concat(postId, "/messages"), {
        message: {
            content: content
        }
    }, {
        headers: {
            'Authorization': "Bearer ".concat(getToken()),
            'Content-Type': 'application/json'
        }
    });
    $('#send-message')[0].reset();
    hideModal();
    updatePage();
});
hideModal();
updatePage();
