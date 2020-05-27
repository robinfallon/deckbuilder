const BASE_URL = 'https://api.currentsapi.services/v1';
const KEY = 'apiKey=eNs44oWt4b1X-yzH2-dJj1w-rt3sHqQb9Vi5VLwCXXtUie7Y'; 

///////////////---firstMainEndpoint---//////////////////

async function fetchLatestNews() {
    const url = `${BASE_URL}/latest-news?${KEY}`;
   /*if (localStorage.getItem('latestNews')) {
        return JSON.parse(localStorage.getItem('latestNews'));
    }*/
    try {
        const response = await fetch(url);
        const data = await response.json();
        //const showSelects = JSON.stringify(selects);
        //console.log(selects);
        //localStorage.setItem('latestNews', showSelects);
        //return selects;
        console.log(data)
    }
    catch (error) {
        console.error(error);
    }
}
fetchLatestNews();

///////////////---secondMainEndpoint(SEARCH)---//////////////////

async function fetchKeywords() {
    const url = `${BASE_URL}/search?${KEY}`;
   /* if (localStorage.getItem('keywords')) {
        return JSON.parse(localStorage.getItem('keywords'));
    }*/
    try {
        const response = await fetch(url);
        const data = await response.json();
        //const showSelects = JSON.stringify(selects);
        //console.log(selects);
        //localStorage.setItem('keywords', showSelects);
        //return selects;
        console.log(data)
    }
    catch (error) {
        console.error(error);
    }
};
fetchKeywords();

///////////////---fetchAllCategories---//////////////////

async function fetchAllCategories() {
    const url = `${BASE_URL}/available/categories?${KEY}`;
    /*if (localStorage.getItem('categories')) {
        return JSON.parse(localStorage.getItem('categories'));
    }*/
    try {
        const response = await fetch(url);
        const data  = await response.json();
        //const parsedData = JSON.stringify(data);
        //console.log(parsedData);
        //if (selects) {localStorage.setItem('categories', showSelects)};
        return data.categories;
    } 
    catch (error) {
        console.error(error);
    } 
};

///////////////---fetchAllLanguages---//////////////////

async function fetchAllLanguages() {
    const url = `${BASE_URL}/available/languages?${KEY}`
   /* if (localStorage.getItem('languages')) {
        return JSON.parse(localStorage.getItem('languages'));
    }*/
    try {
        const response = await fetch(url);
        const data = await response.json();
       // const showSelects = JSON.stringify(selects); 
       // console.log(selects);
       // if (selects) {localStorage.setItem('languages', showSelects)};       
        return data.languages;
    }
    catch (error) {
        console.error(error);
    }
};

///////////////---fetchAllRegions---//////////////////

async function fetchAllRegions() {
    const url = `${BASE_URL}/available/regions?${KEY}`
    /*if (localStorage.getItem('regions')) {
        return JSON.parse(localStorage.getItem('regions'));
    }*/
    try {
        const response = await fetch(url);
        const data = await response.json();
        //const showSelects = JSON.stringify(selects);
        //console.log(selects);
        //if (selects) {localStorage.setItem('regions', showSelects)};
        return data.regions;
    }
    catch (error) {
        console.error(error);
    }
};

///////////////---prefetchRestrictions---//////////////////

async function prefetchRestrictions() {
    try {
        const [
          categories, languages, regions
        ] = await Promise.all([
          fetchAllCategories(),
          fetchAllLanguages(),
          fetchAllRegions()
        ]);
        console.log(categories)
        // Items in the dropdown:
        $('.categories-count').text(`(${ categories.length })`);
        categories.forEach(category => {
            $('#select-category')
            .append($(`<option value="${ category }">${ category }</option>`));
        });
        
        console.log(languages)
        $('.languages-count').text(`(${ languages.length })`);
        Object.entries(language => {
            $('#select-language')
            languages.push($(`<option value="${ language }">${ language }</option>`));
        });
       
        console.log(regions)
        $('.regions-count').text(`(${ regions.length })`);
        Object.entries(country => {
            $('#select-country')
            .append($(`<option value="${ country }">${ country }</option>`));
        }); 
        
    }
    catch (error) {
        console.error(error);
    }
};
prefetchRestrictions();

///////////////---buildSearchString---//////////////////

function buildSearchString() {
    return `${BASE_URL}search?${KEY}
    
    ${$("#select-category").val() === "any"
    ? ""
    : `&category=${$("#select-category").val()}`}

    ${$("#select-language").val() === "any"
    ? ""
    : `&language=${$("select-language").val()}`}
    
    ${$("select-region").val() === "any"
    ? ""
    : `&region=${$("#select-region").val()}`}
    
    ${$("#keyword").val() === "" ? "" : `&keyword=${$("#keyword").val()}`}`

    /*
    If the user fills in no keywords, the search should be to:
    `${BASE_URL}/latest-news?${KEY}` 
    
    If the user fills in anything, instead build a search string,
    with the base url of `${BASE_URL}/search?${KEY}` 
    */
    
    
    /*
    let userCategory = $(`#select-categories`).val();
    let userLanguage = $(`#select-languages`).val();
    let userRegion = $(`#select-regions`).val();
    let userKey = $(`#keywords`).val();
    let startDate = start_date=YYYY-MM-DD;
    let endDate = end_date=YYYY-MM-DD;
    let bUrl = `${BASE_URL}/available?${KEY}&categories=${userCategory}&languages=${userLanguage}&regions=${userRegion}&keywords=${userKey}&start-date=${startDate}&end-date=${endDate}`;
    const encodedURL = encodeURI(bUrl);
    return encodedURL;
    */
};

///////////////---LISTEN TO SEARCH SUBMISSIONS---//////////////////

$('#submit').on('search', async function (event) {
    event.preventDefault();
    onFetchStart();

    try {
        const response = await fetch(buildSearchString());
        const {data, articles} = await response.json();
        updatePreview(data, articles);
    }
    catch (error) {
        console.error(error);
    }
    finally {
        onFetchEnd();
    }
});

$('#preview').on('click', '.object-preview', function(event) {
    event.preventDefault();
    const article = $(this).data('article');
    const featureElem = $('#feature')
    featureElem.html(renderFeature(article));
})

$('#preview .next, #preview .previous').on('click', async function() {
    onFetchStart();
    try{
        const url = $(this).data('url');
        const response = await fetch(url);
        const {data, articles} = await response.json();
        updatePreview(data, articles);
    }
    catch(error) {
        console.error(error);
    } finally {
        onFetchEnd();
    };
});

$(".searchArea").on("submit", function(event){
    event.preventDefault()
    console.log($(this))
});


///////////////---RENDER STORY(article)---//////////////////

function renderStory(article) {
    const {
        title, 
        description, 
        url, 
        author, 
        image, 
        category
    } = article;

    return $(`<div class="featured-articles">
    <h3>${title}</h3>
    <h3>${description}</h3>
    <h3>${url}</h3>
    <h3>${author}</h3>
    <img src="${image}"/>
    <h3>${category}</h3>`).data('article', article)
};

$("#story").on("click", ".preview", function() {
    console.log("hi")
    $(".feature").empty();
    $(".feature").append(renderStory($(this).data("article")));
});


/////////////--UPDATESTORY---//////////////

function updateStory(articles) {
    const root = $('#preview');

    if (articles.next) {
        root.find('.next')
        .data('url', articles.next)
        .attr('disabled', false);
    } else {
        root.find('next')
        .data('url', null)
        .attr('disabled', true);
    }

    if (articles.prev) {
        root.find('.previous')
        .data('url', articles.prev)
        .attr('disabled', false);
    } else {
        root.find('.previous')
        .data('url', null)
        .attr('disabled', true);
    }

    const resultElement = root.find('.results');
    resultElement.empty();
    data.object.entries(article => {
        resultElement.append(renderStory(article))
    })
};



/*
`${KEYWORD_SEARCH}

    ? {$KEY}${userRegion === “any” ? “” 
    : userRegion}…..` `${KEYWORD_SEARCH}?{$KEY}${userRegion === “any” ? “” 
     : `region=${userRegion}`}…..
*/ 