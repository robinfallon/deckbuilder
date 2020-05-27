const BASE_URL = 'https://api.harvardartmuseums.org';
  const KEY = 'apikey=b6e360c0-792f-11ea-bfc0-679e9f75a4c7'; // USE YOUR KEY HERE

  async function fetchObjects() {
      const url = `${ BASE_URL }/object?${ KEY }`;
    
      try {
        const response = await fetch(url);
        const data = await response.json();
    
        return(data);
      } 
      catch (error) {
        console.error(error);
      }
  };

  fetchObjects().then(x => console.log(x)); // { info: {}, records: [{}, {},]}

    /*-----------BUILD fetchAllCenturies FUNCTION---------*/

  async function fetchAllCenturies() {
  // build the correct URL:
      const url = `${ BASE_URL }/century?${ KEY }&size=100&sort=temporalorder`;
      // allows us to return the array of centuries before fetching if we've stored them:
      if (localStorage.getItem('centuries')) {
          return JSON.parse(localStorage.getItem('centuries'));
      }
      // fetch and convert the response:
      try {
          // object destructuring:
          const response = await fetch(url);
          const { records, info } = await response.json();
          const showRecords = JSON.stringify(records);
          console.log(records);
          // we will store 'centuries' in localStorage:
          localStorage.setItem('centuries', showRecords);
          // Don't log the data, instead return the records key in the data:
          return records;
      }   
      catch (error) {
          console.error(error);
      } 
  }
  // then return it:
  fetchAllCenturies();

    /*-----------BUILD fetchAllClassifications FUNCTION---------*/   

  async function fetchAllClassifications() {
      const url = `${ BASE_URL }/classification?${ KEY }&size=100&sort=name`;
      // use 'classifications' as localstorage key:
      if (localStorage.getItem('classifications')) {
          return JSON.parse(localStorage.getItem('classifications'));
      }
      try {
          // object destructuring:
          const response = await fetch(url);
          const { records, info } = await response.json();
          const showRecords = JSON.stringify(records);
          console.log(records);
          // we will store 'centuries' in localStorage:
          localStorage.setItem('classifications', showRecords);
          // Don't log the data, instead return the records key in the data:
          return records;
      }   
      catch (error) {
          console.error(error);
      } 
  };

    /*-----------BUILD prefetchCategoryLists FUNCTION---------*/

  async function prefetchCategoryLists() {
      try {
        const [
          classifications, centuries
        ] = await Promise.all([
          fetchAllClassifications(),
          fetchAllCenturies()
        ]);
    /* Inside the function we need to loop over the two captured 
    arrays, create an <option> tag for each item in them. */

      // This provides a clue to the user, that there are items in the dropdown:
      $('.classification-count').text(`(${ classifications.length })`);
      classifications.forEach(classification => {
      // append a correctly formatted option tag 
      // into the element with id 'select-classification':
          $('#select-classification')
          .append($(`<option value="${classification.name}">${classification.name}</option>`));
      });

      // This provides a clue to the user, that there are items in the dropdown:
      $('.century-count').text(`(${ centuries.length })`);
      centuries.forEach(century => {
      // append a correctly formatted option tag 
      // into the element with id 'select-century':
          $('#select-century')
          .append($(`<option value="${century.name}">${century.name}</option>`));
          });
      } 
      catch (error) {
          console.error(error);
      }  
    };

            /*-----------??????BUILD buildSearchString FUNCTION???????---------*/
  // Convert the form we've created into the actual search string:
  function buildSearchString() {
    let userClassification = $(`#select-classification`).val();
    let userCentury = $(`#select-century`).val();
    let userKey = $(`#keywords`).val();
    let aUrl = `${BASE_URL}/object?${KEY}&classification=${userClassification}&century=${userCentury}&keyword=${userKey}`;
    const encodedURL = encodeURI(aUrl);
    return encodedURL;
  }

  // Then we need to assemble them into a string:


            /*-----------LISTEN TO SEARCH SUBMISSIONS---------*/
  $('#search').on('submit', async function (event) {
      // prevent the default
      event.preventDefault();
      onFetchStart();
    try {
      // get the url from `buildSearchString`
      const response = await fetch(buildSearchString());
      // fetch it with await, store the result
      const {records, info} = await response.json();
      updatePreview(records, info);
      // log out both info and records when you get them
    } catch (error) {
      // log out the error
      console.error(error);
    } finally {
      onFetchEnd();
    }
  });

                 /*-----------A BIT OF GOOD UI---------*/

  function onFetchStart() {
    $('#loading').addClass('active');
  }

  function onFetchEnd() {
    $('#loading').removeClass('active');
  }
    
/*
  async function someFetchFunction() {
      onFetchStart();
    
      try {
        await fetch();
      } catch (error) {
        // error stuff
      } finally {
        onFetchEnd();
      }
    }
*/
              /*-----------POPULATING THE ASIDE---------*/
  // Render search results into preview element:

  function renderPreview(record) {
    // grab description, primaryimageurl, and title from the record
      const {
          description,
          primaryimageurl,
          title,
      } = record;
    
  //Template looks like this:
    return $(`<div class="object-preview">
      <a href="#">
        <img src="${primaryimageurl}" />
        <h3>${title}</h3>
        <h3>${description}</h3>
      </a>
    </div>`).data('record', record);

  /* Some of the items might be undefined, if so... don't render them
    With the record attached as data, with key 'record' */
    
    // return new element
  };

  function updatePreview(records, info) {
    const root = $('#preview');

      // if 'info.next' is present...
      if (info.next) {
        root.find('.next')
            // set data on '.next' button with key url ('url') equal to 'info.next':
            .data('url', info.next)
            // also update the disabled attribute to false:
            .attr('disabled', false);
        } else {
            root.find('.next')
            // set the data url to null:
            .data('url', null)
            // update the disabled attribute to true:
            .attr('disabled', true);
        }

      //Do the same for info.prev, with the '.previous' button:
      if (info.prev) {
        root.find('.previous')
          .data('url', info.prev)
          .attr('disabled', false);
      } else {
          root.find('.previous')
            .data('url', null)
            .attr('disabled', true);
      }

    // LOOP FROM LAST SECTION:
    // grab the results element, it matches .results inside root
    const resultElem = root.find('.results');
    // empty it
    resultElem.empty();
    // loop over the records, and append the renderPreview
    records.forEach(record => {
        resultElem.append(renderPreview(record))
    })
  };

            /*-----------EventListeners---------*/

  $('#preview .next, #preview .previous').on('click', async function () {
      // use try/catch/finally correctly in the function
      // onFetchStart
      onFetchStart();
          try {
              //read off url from the target:
              const url = $(this).data('url');
              //fetch the url:
              const response = await fetch(url);
              //read the records and info from the response.json():
              const {records, info} = await response.json();
              //update the preview:
              updatePreview(records, info);
          }  
          catch(error) {
              console.error(error);        
          } finally { // onFetchEnd
              onFetchEnd();
          };
  });
    /////////////////////--MODULE 3--//////////////////////////  

  //log out the object we are dealing with by attaching a click listener:
  /////           ??????????????????????
  $('#preview').on('click', '.object-preview', function (event) {
      event.preventDefault(); // they're anchor tags, so don't follow the link
      // find the '.object-preview' element by using .closest() from the target
      // $(this).closest();
      //UPDATE: find the '.object-preview' element and recover the record from .data('record') (DONE ABOVE)
      // recover the record from the element using the .data('record') we attached
      const record = $(this).data('record');
      /* //log out the record object to see the shape of the data
      console.log(record) */
      const featureElem = $('#feature')
      featureElem.html(renderFeature(record));
    });

  //Function will take a record & return an element matching the template:
  function renderFeature(record) {
    /**
       * We need to read, from record, the following:
       * HEADER: title, dated
       * FACTS: description, culture, style, technique, medium, dimensions, people, department, division, contact, creditline
       * PHOTOS: images, primaryimageurl
       */
      
    const {
        title,
        dated,
        description,
        culture, 
        style,
        technique,
        medium,
        dimensions,
        people,
        //person?
        department, 
        division,
        contact, 
        creditline,
      } = record;
    
    // build and return template
    return $( `<div class="object-feature">
    <header>
      <h3>${title}</h3>
      <h4>${dated}</h4>
    </header>
    <section class="facts">
      ${factHTML('Description', description)}
      ${factHTML('Culture', culture, 'culture')}
      ${factHTML('Style', style)}
      ${factHTML('Technique', technique, 'technique')}
      ${factHTML('Medium', medium ? medium.toLowerCase() : null, 'medium') }
      ${factHTML('Dimensions', dimensions)}
      ${
        record.people
        ? record.people.map(function(person) {
            return factHTML('Person', person.displayname, 'person');
          }).join('')
        : ''
      }
      ${factHTML('Department', department)}
      ${factHTML('Division', division)}
      ${factHTML('Contact', `<a target="_blank" href="mailto:${ contact }">${ contact }</a>`)}
      ${factHTML('Credit', creditline)}
    </section>
    <section class="photos">
    ${ photosHTML(record.images, record.primaryimageurl) }
    </section>  
    </div>`);
  };


              /*-----------helper functions---------*/
  function searchURL(searchType, searchString) {
    return `${ BASE_URL }/object?${ KEY }&${ searchType}=${ searchString }`;
    }

    // To help with nested ternaries:
    function factHTML(title, content, searchTerm = null) {
      // if content is empty or undefined, return an empty string ''
      if (content === '' || content === undefined) {
        return '';
      }
      // otherwise, if there is no searchTerm, return the two spans
        else {
          return `
          <span class="title">${title}</span>
          <span class="content"> ${searchTerm && content}</span>`
        }
    }


  /*-----------IMAGES---------*/

  function photosHTML(images, primaryimageurl) {
    // if images is defined AND images.length > 0...
    if (images && images.length > 0) {
      //...map the images to the correct image tags, then 'join' them into a single string:
      return images.map(
        image => `<img src="${image.baseimageurl}"/>`).join('');
    } // else if primaryimageurl is defined, return a single image tag with that as value for src:
      else if (primaryimageurl) {
        return `<img src="${primaryimageurl}"/>`;
    } // else we have nothing, so return the empty string:
      else {
        return '';
    }
  };

  /*-----------FINALLY---------*/
  // listen for clicks on anchor tags in the #feature:

  $('#feature').on('click', 'a', async function (event) {
    // read href off of $(this) with the .attr() method:
    const href = $(this).attr('href');

    if (href.startsWith('mailto')) { 
      return; 
    }

    // prevent default:
    event.preventDefault();
    // call onFetchStart:
    onFetchStart();
    // fetch the href:
    try {
      let clickA = await fetch(href);
      let {records, info} = await clickA.json();
      // render it into the preview:
      updatePreview(records, info);
    }
    catch (error) {
      console.error(error)
    } 
    finally {
      // call onFetchEnd:
      onFetchEnd;
    }
  });

prefetchCategoryLists();