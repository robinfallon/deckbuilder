function setActive(id) {
    $('.content .active, .left-nav .active').removeClass('active');
    $(`[data-section=${ id }], [data-link-to=${ id }]`).addClass('active');
  }
}