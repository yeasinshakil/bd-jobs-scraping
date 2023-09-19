const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const json2csv = require('json2csv').Parser;

async function getAllPagesUrl(url) {
  let jobData = [];

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    $('.job-title').each((index, element) => {
      const jobTitle = $(element).text().trim();
      const companyName = $('.company-name').eq(index).text().trim();
      const vacancy = $('.vac>p').eq(index).text().trim();
      const jobContext = $('.job_des>ul').eq(index).text().trim();
      const jobDescription = $('.job_des>ul>li').eq(index).text().trim();
      const employmentStatus = $('.job_nat>p').eq(index).text().trim();
      const educationalReq = $('.edu_req>ul>li').eq(index).text().trim();
      const additionalReq = $('.job_req>ul>li').eq(index).text().trim();
      const jobLocation = $('.job_loc>p').eq(index).text().trim();
      const salary = $('.salary_range>ul').eq(index).text().trim();

      jobData.push({
        jobTitle,
        companyName,
        vacancy,
        jobContext,
        jobDescription,
        employmentStatus,
        educationalReq,
        additionalReq,
        jobLocation,
        salary,
      });
    });

    // Append to the CSV file after scraping each page
    const j2cp = new json2csv();
    const csv = j2cp.parse(jobData);
    fs.appendFileSync('./jobData.csv', csv, 'utf-8');
  } catch (err) {
    console.error(err);
  }

  return jobData;
}

module.exports = {
  allPage: getAllPagesUrl,
};
