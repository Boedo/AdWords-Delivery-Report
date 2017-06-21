function main() {

function getYesterdaysDate() {
    var date = new Date();
    date.setDate(date.getDate()-1);
    return date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear();
}

var yesterday = getYesterdaysDate()


var report = AdWordsApp.report(
  'SELECT CampaignName, Impressions, Cost, Clicks ' +
  'FROM CAMPAIGN_PERFORMANCE_REPORT '+
  'WHERE Impressions > 1 '+
  'DURING YESTERDAY ');

var csv = 'Date, CampaignName, Impressions, Cost, Clicks';

var rows = report.rows();
while (rows.hasNext()){
  var row = rows.next();
  var campaign = row['CampaignName'];
  var impressions = row['Impressions'];
  var cost = row['Cost'];
  var clicks = row['Clicks'];

  var line = [campaign, yesterday,  impressions, cost, clicks]
  csv += '\n' + line.join(',')
  Logger.log(csv)
  }

  MailApp.sendEmail(
    'Bob@gmail.com',
    'Delivery Data',
    'Delivery Data',
    {attachments:[{fileName: 'DeliveryData.csv', mimeType:'text/csv', content: csv}]}
  );

}
