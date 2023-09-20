const cheerio = require('cheerio');
const axios = require('axios');
const fs = require('fs');
const json2csv = require('json2csv').Parser;

async function getAllPagesUrl(url, title) {
  let jobData = [];
  let splitUpdateCategory;

  try {
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    $('.job-title').each((index, element) => {
      const jobTitle = $(element).text().trim();
      let jobCategory = $('.category').eq(index).text().trim();
      let splitjobCategory = jobCategory.split(':')
      let updateCategory = splitjobCategory[1].trim().split('/');
      splitUpdateCategory = updateCategory.join(" ")
      const companyName = $('.company-name').eq(index).text().trim();
      const vacancy = $('.vac>p').eq(index).text().trim();
      const jobContext = $('.job_des>ul').eq(index).text().trim();
      const jobDescription = $('.job_des>ul>li').eq(index).text().trim();
      const employmentStatus = $('.job_nat>p').eq(index).text().trim();
      const educationalReq = $('.edu_req>ul>li').eq(index).text().trim();
      const additionalReq = $('.job_req>ul>li').eq(index).text().trim();
      const jobLocation = $('.job_loc>p').eq(index).text().trim();
      const salary = $('.salary_range>ul').eq(index).text().trim();

      // console.log(splitUpdateCategory)

      jobData.push({
        jobTitle,
        category: splitUpdateCategory,
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
    const filePath = `./bdjobs/${splitUpdateCategory}.csv`
    fs.appendFileSync(filePath, csv, 'utf-8');
  } catch (err) {
    console.error(err);
  }

  // const groupData = jobData.reduce((acc, item) => {
  //   const category = item.category;
  //   const existingCategory = acc.find(group => group[0].category === category);
  //   if (existingCategory) {
  //     existingCategory.push(item);
  //   } else {
  //     acc.push([item]);
  //   }
  //   return acc

  // }, [])
  // console.log(groupData)
  return jobData;
}

module.exports = {
  allPage: getAllPagesUrl,
};
