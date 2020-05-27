const BASE_GROCERIES = [
    { name: 'banana', price: 49 },
    { name: 'tomato', price: 129 },
    { name: 'orange', price: 99 },
    { name: 'pepper', price: 139 },
    { name: 'milk', price: 449 }
  ];
  
  function populateBase() {
    BASE_GROCERIES.forEach(function (grocery) {
      const groceryElement = buildGroceryElement( grocery );
      $('.grocery-list').append( groceryElement );
    });
  }
  
  function buildGroceryElement( grocery ) {
    const element = $('<div class="grocery-item">').text(`
      ${ grocery.name }: $${ grocery.price / 100 }
    `);
  
    return element;
  }
  
  populateBase();
  
  $('#new-grocery').on('submit', function (event) {
    event.preventDefault();
  
    const newGrocery = {
      name: $('#grocery-name').val(),
      price: $('#grocery-price').val()
    }
  
    const newGroceryElement = buildGroceryElement( newGrocery );
  
    $(this).trigger('reset');
  
    $('.grocery-list').append( newGroceryElement );
  })