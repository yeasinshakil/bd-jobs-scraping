const cheerio = require('cheerio')
const fs = require("fs");
const path = require("path");
const allPageObj = require('./fullData');
const axios = require('axios');
const puppeteer = require('puppeteer');

const url = "https://www.bdjobs.com/"

const jobDataFolder = path.join(__dirname, "bdjobs");
dirCreater(jobDataFolder);

axios.get(url)
    .then(async response => {
        const res = await response.data
        let $ = cheerio.load(res)
        $('div[class="category-list padding-mobile functional active"]>div>ul>li>a').each((index, element) => {
            let linkSelect = $(element)
            for (let i = 0; i < linkSelect.length; i++) {
                let getLink = $(linkSelect[i]).attr("href")
                let getTitle = $(linkSelect[i]).attr("title").split("/")
                let modifiedTitle = getTitle.join(" ")
                
                let fullLink = "https:" + getLink;
                // console.log(fullLink)
                getUrlByCategory(fullLink, modifiedTitle)
            }
        })

    })
    .catch((err) => console.log(err))


async function getUrlByCategory(url, title) {
    try {
        
        const response = await axios.get(url)
        const $ = cheerio.load(response.data)
        $('div[class="norm-jobs-wrapper"]').each((index, element) => {
            let linkSelect = $(element)
            for (let i = 0; i < linkSelect.length; i++) {

                let getLink = $(linkSelect[i]).attr('onclick').split("'")[1]
                let fullLink = "https://jobs.bdjobs.com/jobdetails.asp?" + getLink;

                allPageObj.allPage(fullLink, title)
            }
        })
    } catch (error) {
        console.log(error)
    }
}

function dirCreater(filePath) {
    if (fs.existsSync(filePath) == false) {
        fs.mkdirSync(filePath);
    }

}