import http from 'k6/http';
import { sleep, check, group } from 'k6';
import { Counter, Trend, Gauge, Rate } from 'k6/metrics';

let testGauge = new Gauge('test_gauge');
let testCounter = new Counter('test_counter');
let testTrend = new Trend('test_trend');
let testRate = new Rate('test_rate');

const data = JSON.parse(open("OrganizationData.json"));

export let options = {
  stages: [
    { duration: "5s", target: 5 },
    { duration: "10s", target: 5 },
    { duration: "5s", target: 0}
  ], 
  thresholds: {
    'test_counter': [ {threshold: 'count<30000.0', abortOnFail: true }]
  }
}

export default function () {
  let response;

  let user = data[__VU % 5];

  const vars = {};
  
  group("page_1 - https://ia.dev.ia.afaforsakring.se/", function () {
    response = http.get("https://ia.dev.ia.afaforsakring.se/authentication");
    testGauge.add(response.status);
    testCounter.add(response.timings.duration);
    testTrend.add(response.timings.duration);
    testRate.add(response.status);

    vars["KeepSSOCookie"] = response
      .html()
      .find("input[name=KeepSSOCookie]")
      .first()
      .attr("value");

    vars["__RequestVerificationToken"] = response
      .html()
      .find("input[name=__RequestVerificationToken]")
      .first()
      .attr("value");

    response = http.post(
      "https://ia.dev.ia.afaforsakring.se/authentication",
      {
        KeepSSOCookie: `${vars["KeepSSOCookie"]}`,
        UserName: `${user.Username}`,
        Password: `${user.Password}`,
        __RequestVerificationToken: `${vars["__RequestVerificationToken"]}`,
      }
    );
    testGauge.add(response.status);
    testCounter.add(response.timings.duration);
    testTrend.add(response.timings.duration);
    testRate.add(response.status);

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/api/Web/Global/IaResource/sv-SE/Startpage"
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/Sections/Views/Header.html"
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/Sections/Views/StartPage/LeadTime.html"
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/Sections/Views/StartPage/Safety.html"
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/Sections/Views/StartPage/Summary.html"
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/Sections/Views/StartPage/Risk.html"
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/Sections/Views/StartPage/MyIA.html"
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/Sections/Views/Startpage/NewsWidget.html"
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/api/Web/Global/IaHeader/" + user.UserId + "/sv-SE/" + user.OrganisationGuid + "/5/00000000-0000-0000-0000-000000000000"
    );

    response = http.get(
      `https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/api/Web/Dashboard/Leadtime/Occurrences/${user.OrganisationGuid}/sv-SE/1610614418353/1611305618353`
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/Sections/Views/StartPage/LeadTimeAll.html"
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/Sections/Views/StartPage/LeadTimeDetails.html"
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/api/Web/Dashboard/IaDashboardOpenRisks/" + user.UserId + "/sv-SE/" + user.OrganisationGuid + "/true"
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/api/Web/Dashboard/Riskreduction/" + user.UserId + "/" + user.OrganisationGuid + "/1610614418353/1611305618353/true"
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/api/Web/Dashboard/IaNewsWidget/" + user.UserId + "/sv-SE/" + user.OrganisationGuid + "/5"
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/api/Web/Dashboard/IaDashboardTypesSummary/" + user.UserId + "/sv-SE/" + user.OrganisationGuid + "/l7/1610614418406/1611305618406/false/true"
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/api/Web/Dashboard/IaDashboardSafetyData/" + user.UserId + "/" + user.OrganisationGuid + "/1610614418428/1611305618428/true"
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/api/Web/Dashboard/TodoList/" + user.UserId + "/sv-SE/" + user.OrganisationGuid + "/true"
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/Sections/Views/News.html"
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/Sections/Views/Favorites.html"
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/Sections/Views/Tips.html"
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/api/Web/Global/ResourceObjects/sv-SE/Tips"
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/api/Web/Global/ResourceObjects/sv-SE/Favorites"
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/api/Web/Global/ResourceObjects/sv-SE/News"
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/api/Web/Dashboard/IaNewsWidget/" + user.UserId + "/sv-SE/" + user.OrganisationGuid + "/5"
    );
  });

  group(
    "page_2 - https://ia.dev.ia.afaforsakring.se/PreventionIA/SystemNavigering.aspx?Utloggning=true",
    function () {
      response = http.get(
        "https://ia.dev.ia.afaforsakring.se/PreventionIA/SystemNavigering.aspx?Utloggning=true"
      );
    }
  );

  // Automatically added sleep
  sleep(1);

}
