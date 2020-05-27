//--------------------CREATE DUMMY DATA----------------------------

// Create three more global variables to store our split todos:
let pendingTodos, completedTodos, expiredTodos;
let allTodos = [

    {  
        title: 'Dentist appointment',
        dueDate: '03-01-2020',
        description: 'teeth cleaning',
        isComplete: true
    },


    {  
        title: 'Grooming appointment for Champ',
        dueDate: '05-14-2020',
        description: 'grooming at vet office',
        isComplete: false
    },


    {  
        title: 'Spring cleaning',
        dueDate: '02-29-2020',
        description: 'clean house',
        isComplete: true
    },


    {  
        title: 'Pay electric bill',
        dueDate: '03-03-2020',
        description: 'pay monthly electric bill',
        isComplete: true
    },


    {  
        title: 'Send birthday card',
        dueDate: '04-03-2020',
        description: 'send Lindsay a birthday card',
        isComplete: false
    },


    {  
        title: 'Celebrate Easter',
        dueDate: '04-12-2020',
        description: 'celebrate Easter',
        isComplete: false
    }

];



//--------------------GET DUMMY DATA ON THE PAGE-------------------

////////////////--FUNCTION-CREATE-ELEMENT-FROM-TODO--//////////

function createElementFromTodo(todo) {
    // Builds an element and returns it
    return $(`<div class="todo">
        <h3><span class="title">${todo.title}</span>
        <span class="due-date">${todo.dueDate}</span>
        </h3>
        <pre>${todo.description}</pre>
        <footer class="actions">

            ${todo.isComplete ? '<button class="action complete">Complete</button>' : ""}
            
            <button class="action delete">Delete</button>
        </footer>
    </div>`).data('todo', todo); 

    /* UPDATE */
    //you will have to interpolate all the relevant data, as well as use ternaries when things are optional/different based on certain properties

};




///////////////////--FUNCTION-RENDER-TODOS--///////////////

function renderTodos() {

    // Empty each of the columns which match 'main .content' (Module 3)
    $('main .content').empty();

    // Loop over 'allTodos'
    allTodos.forEach(todo => {
        if (todo.isComplete === true) {
        // IF complete, append to '.completed-todos'
            createElementFromTodo(todo).appendTo('.completed-todos');
        } else {
            // ELSE, append to '.pending-todos'
            createElementFromTodo(todo).appendTo('.pending-todos');
        };
    });
    

    // Using .forEach, loop over 'pendingTodos', 'completedTodos', & 'expiredTodos'
    // In each loop, append the result of createElementFromTodo to the appropriate column

    pendingTodos.forEach(function(todo) {
        let element = createElementFromTodo(todo);
        // Move new element to appropriate column:
        element.appendTo('.pending-todos')
        element.data('todo', todo)
    });

    completedTodos.forEach(function(todo) {
        let element = createElementFromTodo(todo);
        element.appendTo('.completed-todos')
        element.data('todo', todo)
    });

    expiredTodos.forEach(function(todo) {
        let element = createElementFromTodo(todo);
        element.appendTo('.expired-todos')
    });
};



//----------------------------PIZZAZZ---------------------------

// Add a click listener to the element with class 'left-drawer'
$('.left-drawer').click(function(event) {

    // Use .hasClass() to see if target has the 'left-drawer' class
    $(event.target).hasClass('.left-drawer') && $('#app').toggleClass('drawer-open')       
    
});

$('.left-drawer button').click((event) => {
    event.stopPropagation()
})



//-------------------------THE MODAL-------------------------------

// Create 3 click handlers

/* The button .add-todo needs to have a click handler which 
adds the class 'open' to the element '.modal' */

$('.add-todo').click(function() {
    $('.modal').addClass(open);
});

/* The buttons .create-todo and .cancel-create-todo need to 
remove the class open from the element .modal */
$('.create-todo').click(function() {
    $('.modal').removeClass(open);
});

$('.cancel-create-todo').click(function() {
    $('.modal').removeClass(open);
});


//------------------------FORM VALIDATION---------------------------



//----------------------CREATING A NEW TODO-------------------------

/* Write a function createTodoFromForm which will read off the 
.todo-form and return an object with the correct data. */


function createTodoFromForm(todo) {
    // Create an object with title, dueDate, description all from the form
    let newTodo = new Date(todo.find('#todo-due-date').val());
    
    return {   
    title: $('#todo-title').val(),
    dueDate: $('#todo-dueDate').val(),
    description: $('#todo-description').val(),
    isComplete: false
    };   
};

// Call the .data method on the element, adding the 'todo' as data with key "todo"
todoElement.data('todo', todo);

// Create a click handler that listens for clicks on the '.action.complete' buttons
$('main').on('click', '.action.complete', function() {
    // your code here
    $(this).closest('.todo');
    // Use the '.data' method to retrieve the 'todo' object we attached during 'renderTodos'

    // Change the '.isComplete' property of the 'todo' to 'true'


    todoElement.slideUp(function() {
        // Call renderTodos
        renderTodos();
        });
});




////////////////////////-----MODULE 3------////////////////////////////


/* Needs to compare the date which is set on the todo, 
to the date which represents right now. */

function isCurrent(todo) {
    
    // Using date constructor to create two date objects:
    const todoDueDate = new Date(todo.dueDate);
    const now = new Date();

    return now < todoDueDate;
}


function splitTodos() {

/* Use .filter on allTodos, and set pendingTodos, completedTodos, 
and expiredTodos to the results of those filters */

    // Should be any todo which is NOT complete but IS current
    pendingTodos = allTodos.filter(todo => {
        return todo.isComplete !== true && isCurrent(todo) === true;
    });

    // Should be ANY todo which IS complete, regardless of current status
    completedTodos = allTodos.filter(todo => {
        return todo.isComplete === true;
    });

    // Should be any todo which is NOT complete, and is NOT current
    expiredTodos = allTodos.filter(todo => {
        return todo.isComplete !== true && isCurrent(todo) !== true;
    });
};




//----------------------STOREDATA FUNCTION----------------------//
function storeData() {
    //sets an item in localStorage with key allTodos
    // Uses JSON.stringify() to stringify the contents of allTodos
    localStorage.setItem('allTodos', JSON.stringify(allTodos));

};


//---------------------RETRIEVEDATA FUNCTION---------------------//
function retrieveData() {
    // Gets the item from localStorage with key allTodos
    // If it exists, set the global allTodos to the result of JSON.parse() applied to it
    // If not, set allTodos equal to some default todos

    /* !!!! Update the function to use either the JSON.parse() of the 
    localStorage or the fetchDefaultTodos() !!!! */
    allTodos = JSON.parse(localStorage.getItem("allTodos")) || fetchDefaultTodos();

    
}

//--------------------FETCHDEFAULTTODOS FUNCTION------------------//
function fetchDefaultTodos() {
    let todo = new Date;
    // Returns an array of basic todos
    return todo.setDate(todo.getDate() + 1),

    /* These todos are a great place to onboard your users, make 4-5 todos 
    which give instructions on how to use the application */
    [
        {
            title: 'Make a new todo',
            dueDate: todo.toLocaleString(),
            description: 'Click the plus symbol then fill out the pop-up form and click CREATE',
            isComplete: !1
        },

        {
            title: 'Open the left drawer',
            dueDate: todo.toLocaleString(),
            description: 'Click on left side below the icons to expand the drawer\n\nWhen you are done, click complete on this todo.',
            isComplete: !1
        },
        
        {
            title: 'Make an expired todo',
            dueDate: todo.toLocaleString(),
            description: 'Click the plus symbol\n\nThen, fill out the pop-up form and click CREATE\n\nMake sure to use a past date!',
            isComplete: !1
        },
        
        {
            title: 'Clear expired todos',
            dueDate: todo.toLocaleString(),
            description: 'The checkmark and trash symbols are for clearing completed or expired todos, respectively.\n\nUse them now.', 
            isComplete: !1
        }
    ]

}


// Call renderTodos() as the last line of your app.js file

retrieveData();
splitTodos();
renderTodos();





