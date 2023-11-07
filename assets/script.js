document.querySelector("#scrollTop").addEventListener("click", () => window.scrollTo(0, 0))



function newsTrickerFetch(){
    const apiUrl = 'https://ksu.edu.sa/en/get/newsapi';
    let newsTitles;
    let newsLinks;
    // ! The combained two info
    // let newsItems = {};
    // Make an API request and process the HTML
    fetch(apiUrl)
    .then(response => response.text())
    .then(html => {
        // Parse the HTML using DOM manipulation
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');

        // Extract the title of the news
        const titleElement =Array.from(doc.querySelectorAll('h3.latest-news_title'));
        const linkElement = Array.from(doc.querySelectorAll('a.latest-news_link'));
        newsTitles = titleElement.map((singleTitle) => singleTitle.textContent.replace(/\n|\t/g,""));
        newsLinks = linkElement.map((singleLink) => singleLink.href);
        
    
        let newsItems = newsTitles.map((title,index)=>({
            num: index,
            title: title,
            link: newsLinks[index]
        }));
        let myNewsTicker = document.querySelector("#newsTricker");
        newsItems.forEach((element)=>{
            let newsTickerItem = document.createElement('a');
            const spanElement = document.createElement('span');
            spanElement.classList.add('position-relative','mx-2','badge','bg-primary','rounded-0');
            spanElement.textContent = `${element.num+1}`;
            newsTickerItem.classList.add("h6","fw-normal");
            newsTickerItem.href = element.link;
            newsTickerItem.target = "_blank";
            let theTitle = document.createTextNode(element.title)
            myNewsTicker.appendChild(newsTickerItem);
            
            newsTickerItem.appendChild(theTitle);
            newsTickerItem.insertBefore(spanElement, theTitle );
            
        })
    })
    .catch(error => console.error('Error fetching data: ', error));
}
document.addEventListener("DOMContentLoaded", newsTrickerFetch())
