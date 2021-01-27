import { sleep, check } from "k6";
import http from "k6/http";

const MAXUSERS = 20;

export let options = {
  setupTimeout: '10m',
  stages: [
    { duration: "20s", target: MAXUSERS },
    { duration: "40s", target: MAXUSERS },
    { duration: "20s", target: 0 }
  ],
  thresholds: {
    'http_req_waiting': [{ threshold: 'avg<5000', abortOnFail: false }],
    'http_req_duration': [{ threshold: 'avg<1000', abortOnFail: false }]
  }
}

export function setup() {
  let params = {
    timeout: 600000
  }
  let response = http.post(`https://${__ENV.MY_HOSTNAME}/services/seedia/PerformanceTest/CreatePerformanceTestOrganisationJson?userCount=${MAXUSERS}`, '', params);
  check(response, { 'Creation status': (r) => r.status === 201, });
  let orgdata = JSON.parse(response.body);
  return orgdata;
}

export function teardown(orgData) {
  let response = http.del(`https://${__ENV.MY_HOSTNAME}/services/seedia/IAFtg/DeleteIAFtg?organizationId=${orgData[0].organisationId}`);
  check(response, { 'Deletion status': (r) => r.status === 204, });
}

export default function (orgData) {
  let user = orgData[__VU % MAXUSERS];

  let response = http.get(`https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/Pages/Occurrences/HandelseLista.aspx?userId=${user.username}&userPwd=${user.password}`);
  check(response, { 'HandelseLista status code': (r) => r.status === 200, });

  // Mulpitple requests running in parallell.
  let responses = http.batch([
    ['GET', `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/Sections/Views/News.html`, null, {}],
    ['GET', `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/Sections/Views/Favorites.html`, null, {}],
    ['GET', `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/Sections/Views/Tips.html`, null, {}],
    ['GET', `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/api/Web/Global/ResourceObjects/sv-SE/News`, null, {}],
    ['GET', `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/api/Web/Global/ResourceObjects/sv-SE/Favorites`, null, {}],
    ['GET', `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/api/Web/Global/ResourceObjects/sv-SE/Tips`, null, {}]
  ]);
  check(responses[0], {'Micellaneous resources status code': (res) => res.status === 200,});

  // Always returns status code 500. No need to check response.
  http.get(`https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/api/Web/Dashboard/IaNewsWidget/${user.userGuid}/sv-SE/${user.organisationGuid}/5`);

  sleep(1);
}