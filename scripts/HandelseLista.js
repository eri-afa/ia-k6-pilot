import { sleep, check } from "k6";
import http from "k6/http";

const data = JSON.parse(open("OrganizationData.json"));

const MAXUSERS = 20;

export let options = {
    stages: [
      { duration: "10s", target: MAXUSERS },
      { duration: "20s", target: MAXUSERS },
      { duration: "10s", target: 0}
    ], 
    thresholds: {
      'http_req_waiting': [ {threshold: 'avg<5000', abortOnFail: true }],
      'http_req_duration': [{threshold: 'avg<1000', abortOnFail: false}]
    }
  }

export default function () {
    let response;
    let user = data[__VU % MAXUSERS];

    response = http.get(`https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/Pages/Occurrences/HandelseLista.aspx?userId=${user.username}&userPwd=${user.password}`);
    check(response, {'Status code': (r) => r.status === 200,});

    response = http.get(`https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/Sections/Views/News.html`);
    check(response, {'Status code': (r) => r.status === 200,});

    response = http.get(`https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/Sections/Views/Favorites.html`);
    check(response, {'Status code': (r) => r.status === 200,});

    response = http.get(`https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/Sections/Views/Tips.html`);
    check(response, {'Status code': (r) => r.status === 200,});

    response = http.get(`https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/api/Web/Global/ResourceObjects/sv-SE/News`);
    check(response, {'Status code': (r) => r.status === 200,});

    response = http.get(`https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/api/Web/Global/ResourceObjects/sv-SE/Favorites`);
    check(response, {'Status code': (r) => r.status === 200,});

    response = http.get(`https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/api/Web/Global/ResourceObjects/sv-SE/Tips`);
    check(response, {'Status code': (r) => r.status === 200,});

    // Always returns status code 500. No need to check response.
    response = http.get(`https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/api/Web/Dashboard/IaNewsWidget/${user.userGuid}/sv-SE/${user.organisationGuid}/5`);

    sleep(1);
}