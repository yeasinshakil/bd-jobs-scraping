const cheerio = require('cheerio')
const request = require('request');

const url = "https://www.bdjobs.com/"


request(url, cb)

function cb(err, response, html) {
    if(err) {
        console.log(err)
    } else {
        // console.log(html)
        extractLink(html)
    }
}

async function extractLink(html) {
    // console.log(html)
    let $ = cheerio.load(html)
    let linkSelect = $('div[class="category-list padding-mobile functional active"]>div>ul>li>a')
    // console.log(linkSelect.length)
    for(let i = 0; i < linkSelect.length; i++) {

        let getLink = $(linkSelect[i]).attr("href")
        let getTitle = $(linkSelect[i]).attr("title").split("/")
        let modifiedTitle = getTitle.join(" ")
        let fullLink = "https:"+getLink;

         console.log(getTitle)
    }
    
}


let link = ["https://jobs.bdjobs.com/jobsearch.asp?fcatId=19&icatId=", "https://jobs.bdjobs.com/jobsearch.asp?fcatId=1&icatId="]

let data = [
    {
        job: 'account',
        name: 'shakil',
        category: 'employee'
    },
    {
        job: 'finane',
        name: 'hridoy',
        category: 'employee'
    },
    {
        job: 'design',
        name: 'rahul',
        category: 'ceo'
    },
    {
        job: 'develop',
        name: 'yeasin',
        category: 'develop'
    },
]










// const puppeteer = require("puppeteer")

// async function startBrowser() {
//     let browser;
//     try {
//         browser = await puppeteer.launch({headless: false})
//         let newPage = await browser.newPage()
//         console.log("===============>>opening browser")
//         await newPage.goto("https://www.bdjobs.com/")

//         await browser.close()
//         console.log("===============>>closing browser")

        
//     } catch (error) {
//      console.log(error)   
//     }
// }

// startBrowser()