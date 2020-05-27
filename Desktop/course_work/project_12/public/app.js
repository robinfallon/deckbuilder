// Build out templating for the search results:
//------ CLICK HANDLER -------
$('#job-search').on('submit', async (event) => {
    event.preventDefault();
  
    try {
      const response = await fetch('/job-search', {
        method: "POST",
        body: JSON.stringify({
          description: $('#description').val(),
          fulltime: $('#fulltime').is(':checked')
        })
      });
    
      const {results} = await response.json();
      
      renderJobList(results);
    } 
    catch (error) {
      console.error(error);
    }
});

//------ RENDER JOB POSTING -------
function renderJob({
    company_url,
    company, 
    company_logo,
    title,
    type,
    location,
    description,
    how_to_apply
}) {
    return $(`
    <div class="jobPosting">
        <header>
            <div>
                <h2><a href="${company_url}">${company}</a></h2>
                <h3>${location}</h3>
                <h3>${title}</h3>
                <h3>${type}</h3>
            </div>
            <img src="${company_logo}"/>
        </header>
        <main>
            ${description}
        </main>
        <footer>
            ${how_to_apply}
        </footer>
    </div>`);
};


//------ RENDER JOBLIST-------
function renderJobList(jobz) {
    // remove ASCII cow:
    $('#cow').remove();
    // empty content from results:
    $('#results').empty();
  
    jobz.forEach(job => {
      $('#results').append(renderJob(job));
    });
}


//------ GET QUOTE-------
async function getQuote() {
    try {
        const response = await fetch('/cowspiration');
        const {cow} = await response.json();
        $('#app > main').append($(`<pre id="cow">${cow}</pre>`));
    }
    catch(error) {
        console.error(error);
    }
};

getQuote()

//------ COWSAY -------


//------ WEATHER -------

async function fetchWeather() {
    // 'if' checks to see if it's even possible (for the user's current browser) to get geolocation:
    if (!navigator || !navigator.geolocation) {
        // if yes, we start a request to the browser to get it for us:
      $('#weather').append($('<h3>Weather not available on this browser</h3>'))
    }
  
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { coords: { latitude, longitude } } = position;
  
      const response = await fetch(`/weather?lat=${ latitude }&lon=${ longitude }`);
      const { results } = await response.json();
  
      if (results.daily) {
        $('#weather').empty();
  
        results.daily.forEach(day => {
          const { weather: [{ icon }] } = day;
  
          $('#weather').append($(`
            <img src="http://openweathermap.org/img/wn/${ icon }@2x.png" />
          `));
        });
      }
    }, async (error) => {
      const result = await navigator.permissions.query({ name: 'geolocation' });
      if (result.state == "denied") {
        $('#weather').html(
          $(`<div>
              <h3>You have denied access to location services.</h3>
              <h4>If you wish to see your forecast, update your settings and refresh.</h4>
            </div>`)
        )
      }
    });
}
  
fetchWeather();

