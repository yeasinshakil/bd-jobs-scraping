const url = "https://jobs.bdjobs.com/jobsearch.asp?fcatId=10&icatId="
const cheerio = require('cheerio')
const request = require('request');
const allPageObj = require('./fullData')


request(url, cb)

function cb(err, response, html) {
    if(err) {
        console.log(err)
    } else {
        extractLink(html)
    }
}

async function extractLink(html) {
    // console.log(html)
    let $ = cheerio.load(html)
    let linkSelect = $('div[class="norm-jobs-wrapper"]')
    for(let i = 0; i < linkSelect.length; i++) {

        let getLink = $(linkSelect[i]).attr('onclick').split("'")[1]
        let fullLink = "https://jobs.bdjobs.com/jobdetails.asp?"+getLink;

         await allPageObj.allPage(fullLink)
    }
    
}
