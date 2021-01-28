import { sleep, check } from "k6";
import http from "k6/http";
import { Rate } from 'k6/metrics';

const MAXUSERS = 20;

let errorRate = new Rate('error_rate');

export let options = {
  setupTimeout: '10m',
  stages: [
    { duration: "20s", target: MAXUSERS },
    { duration: "40s", target: MAXUSERS },
    { duration: "20s", target: 0 }
  ],
  thresholds: {
    'http_req_waiting': [{ threshold: 'avg<5000', abortOnFail: false }],
    'http_req_duration': [{ threshold: 'avg<1000', abortOnFail: false }],
    'error_rate': [{threshold: 'rate < 0.1', abortOnFail: true, delayAbortEval: '1m' }] // delayAbortEval is very useful! Look it up.
  }
}

// BEWARE, creating a performance test organization takes a lot of time, and this will be included
// in the default metrics, thus affecting the test result.
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
  const ok = check(response, { 'HandelseLista status code': (r) => r.status === 200, });
  errorRate.add(!ok);

  // Mulpitple requests running in parallell.
  let responses = http.batch([
    ['GET', `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/Sections/Views/News.html`, null, {}],
    ['GET', `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/Sections/Views/Favorites.html`, null, {}],
    ['GET', `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/Sections/Views/Tips.html`, null, {}],
    ['GET', `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/api/Web/Global/ResourceObjects/sv-SE/News`, null, {}],
    ['GET', `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/api/Web/Global/ResourceObjects/sv-SE/Favorites`, null, {}],
    ['GET', `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/api/Web/Global/ResourceObjects/sv-SE/Tips`, null, {}],
    ['GET', `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/api/Web/Dashboard/IaNewsWidget/${user.userGuid}/sv-SE/${user.organisationGuid}/5`, null, {}], // Always fails (?)
  ]);
  responses.forEach(resp =>{
    const ok = check(resp, {'Micellaneous resources status code': (res) => res.status === 200,});
    errorRate.add(!ok);
  });
  
  sleep(1);
}
