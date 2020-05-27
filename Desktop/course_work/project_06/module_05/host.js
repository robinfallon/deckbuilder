const GUEST_LIST = [
    { name: 'Leonard', count: 6 },
    { name: 'Sharon', count: 4 }
  ];
  
  const SERVERS = [
    { name: 'Sandy', guests: [] },
    { name: 'Jeremi', guests: [] },
    { name: 'Carl', guests: [] },
    { name: 'Trish', guests: [] }
  ];
  
  let nextServer = SERVERS[0];
  
  //-----------------AdvanceToNextServer----------------------
  function advanceToNextServer() {
    // this is on you!
    //look up the index of the nextServer in the server list
    let serverIndex = SERVERS.indexOf(nextServer);
    //replace nextServer with the next one in the list
    let nextIndex = (serverIndex + 1) % SERVERS.length;

    nextServer = SERVERS[nextIndex];
    SERVERS.indexOf()
  }
  
  // Interface Functions
  function buildGuestCard(guest) {
    const guestCard = $(`
      <div class="guest-card">
        <span>${ guest.name }, party of ${ guest.count }</span>
      </div> 
    `).data('guest', guest);
  
    return guestCard;
  }
  
  function buildServerCard(server) {
    const serverCard = $(`<section class="server-card">
      <header class="server-name">${ server.name }</header>
      <div class="seated-guests"></div>
    </section>`).data('server', server);
  
    server.guests.forEach(function (guest) {
      serverCard.find('.seated-guests').append( buildGuestCard(guest) );
    });
  
    return serverCard;
  }
  
  function renderGuestList() {
    $('.guest-list').empty();
  
    GUEST_LIST.forEach(function (guest) {
      $('.guest-list').append( buildGuestCard(guest) );
    });
  }
  
  function renderServers() {
    $('.seating-chart').empty();
  
    SERVERS.forEach(function (server) {
      $('.seating-chart').append( buildServerCard(server) )
    });
  }
  
  // Interface Listeners
  function addGuestToList(event) {
    event.preventDefault();
  
    const name = $('#guest-name').val().trim() || "Anonymous"
  
    const nextGuest = {
      count: $('#guest-count').val(),
      name: name
    }
  
    $(this).trigger('reset')
  
    GUEST_LIST.push(nextGuest);
    renderGuestList();
  }
  

  //---------------------ServeNextGuest----------------------
  function serveNextGuest() {
    if (GUEST_LIST.length === 0) {
      return;
    }
    // more needed

    // remove it from GUEST_LIST (with .shift())
    const nextGuest = GUEST_LIST.shift();
    console.log(nextGuest)

    // add it to the guests array inside the nextServer object
    nextServer.guests.push(nextGuest);
    console.log(nextServer);

    /* re-render both the guestList and the 
    servers after changing ownership of the guest object*/
    renderGuestList();
    renderServers();

    // advance to the next server
    advanceToNextServer();
  }
  
  //---------------------ServeGuestEarly--------------------
  function serveGuestEarly() {
    // your code here

    // We stored the guest on the .guest-card using .data()
    const guestData = $(this).data('guest');
    console.log(guestData);

    //We have access to indexOf and splice
    guestIndex = GUEST_LIST.indexOf(guestData);
    GUEST_LIST.splice(guestIndex, 1);

    // add it to the guests array inside the nextServer object
    nextServer.guests.push(guestData);

    //re-render both the guestList and the servers
    renderGuestList();
    renderServers();

    // advance to the next server
    advanceToNextServer();
    }
  
  //-----------------RemoveGuestFromServer--------------------
  function removeGuestFromServer() {
    // help me, obi-wan

    // We stored the guest on the .guest-card using .data()
    const guest = $(this).data('guest');
    const server = $(this)
      .closest('.server-card')
      .data('server');

    console.log(server);
    guestIndex = server.guests.indexOf(guest);
    server.guests.splice(guestIndex, 1);
    renderGuestList();
    renderServers();
  }
  
  // Attachments
  $('.guest-form').submit(addGuestToList);
  $('#serve').click(serveNextGuest);
  
  $('.guest-list').on('click', '.guest-card', serveGuestEarly);
  $('.seating-chart').on('click', '.guest-card', removeGuestFromServer);
  
  
  // Bootstrapping
  renderGuestList();
  renderServers();