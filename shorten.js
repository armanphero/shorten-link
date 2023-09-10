const loadShortLink = (link) => {
    const url = `https://api.shrtco.de/v2/shorten?url=${link}`
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => showLink(data))
        .catch(error => console.log(error))
}

const allShortLink = [];

const showLink = (data) => {
    // console.log(data);
    const aTag = document.getElementById('shorten-link');
    if(data.result !== undefined){
        const { short_link, full_short_link } = data.result;
        aTag.innerText = short_link;
        aTag.setAttribute('href', full_short_link);
        allShortLink.push(data.result);
    }
    else{
        aTag.innerText = `please give a valid url`;
        aTag.setAttribute('href', '#');
    }
    aTag.classList.remove('gray');
}
const getInputValue = () => {
    const input = document.getElementById('input-field');
    const inputValue = input.value;
    input.value = '';
    loadShortLink(inputValue);
}

const showLinksOnModal = () => {
    const LinkContainer = document.getElementById('allLink-container');
    LinkContainer.innerHTML = '';
    // 
    if(allShortLink.length === 0){
        const h4 = document.createElement('h4');
        h4.innerText = 'No shortened link here';
        LinkContainer.appendChild(h4);        
    }
    allShortLink.forEach(link => {
        const {short_link, full_short_link} = link;
        const h4 = document.createElement('h4');
        h4.innerHTML = `
        <a href="${full_short_link}" target="_blank">${short_link}</a>
        `
        LinkContainer.appendChild(h4);
    })
}

function copyShortenLink() {
    // Get the text field
    var copyText = document.getElementById("shorten-link");

    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.innerText);

    copyText.classList.add('gray');
}



// loadShortLink();