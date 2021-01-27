import http from 'k6/http';
import { sleep, check, group } from 'k6';
import { Counter, Trend, Gauge, Rate } from 'k6/metrics';

// Init stage
// Setup all the custom metrics
// These specific examples are mostly humbug.
let testGauge = new Gauge('auth_status_gauge');
let testCounter = new Counter('auth_timings_counter');
let testTrend = new Trend('auth_timings_trend');
let testRate = new Rate('auth_status_rate');

// The response from "/services/seedia/PerformanceTest/CreatePerformanceTestOrganisation?userCount=${MAXUSERS}"
// Response body (json) saved to file
const data = JSON.parse(open("OrganizationData.json"));

// Number of users created in seed (length of data)
const MAXUSERS = 5;

export let options = {
  stages: [
    { duration: "5s", target: MAXUSERS },
    { duration: "10s", target: MAXUSERS },
    { duration: "5s", target: 0}
  ], 
  thresholds: {
    // Will fail test if the 95th percentile of duration of loading the login page
    // is above 5000 ms.
    // Test will contiue even after this fails.
    'auth_timings_trend': [ {threshold: 'p(95)<5000', abortOnFail: false }],

    // Will fail if average wait time for all requests are above 5000 ms.
    // The test will be aborted if this fails.
    'http_req_waiting': [ {threshold: 'avg<5000', abortOnFail: true }]
  }
}

export default function () {
  let response;

  // __VU is the number associated with the virtual user for the current iteration.
  let user = data[__VU % MAXUSERS]; // Make sure we don't go out of bounds.

  const vars = {};
  
  group('Log in and load start page', function () {
    response = http.get(`https://${__ENV.MY_HOSTNAME}/authentication`);

    // How to use custom metrics on a http response.
    // These are for education purposes only and are not very meaningful.
    testGauge.add(response.status);
    testCounter.add(response.timings.duration); // Like, why would you want the total duration of all iterations of all users???
    testTrend.add(response.timings.duration); // This is probably actually useful though.
    testRate.add(response.status);

    // Will let us know if loading login page is successful.
    check(response, {
      'Status code OK': (r) => r.status === 200,
    });

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
      `https://${__ENV.MY_HOSTNAME}/authentication`,
      {
        KeepSSOCookie: `${vars["KeepSSOCookie"]}`,
        UserName: `${user.username}`,
        Password: `${user.password}`,
        __RequestVerificationToken: `${vars["__RequestVerificationToken"]}`
      }
    );
    check(response, {
      'Status code OK': (r) => r.status === 200,
    });
  });

  group('Load start page', function () {
    response = http.get(
      `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/api/Web/Global/IaResource/sv-SE/Startpage`
    );
    check(response, {
      'Status code OK': (r) => r.status === 200,
    });

    /// Will let us know if login was successful.
    // This will give us a hint if seeding was unsuccessful.
    check(response, {
      'Status code OK': (r) => r.status === 200,
    });

    response = http.get(
      `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/Sections/Views/Header.html`
    );
    check(response, {
      'Status code OK': (r) => r.status === 200,
    });

    response = http.get(
      `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/Sections/Views/StartPage/LeadTime.html`
    );
    check(response, {
      'Status code OK': (r) => r.status === 200,
    });

    response = http.get(
      `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/Sections/Views/StartPage/Safety.html`
    );
    check(response, {
      'Status code OK': (r) => r.status === 200,
    });

    response = http.get(
      `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/Sections/Views/StartPage/Summary.html`
    );
    check(response, {
      'Status code OK': (r) => r.status === 200,
    });

    response = http.get(
      `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/Sections/Views/StartPage/Risk.html`
    );
    check(response, {
      'Status code OK': (r) => r.status === 200,
    });

    response = http.get(
      `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/Sections/Views/StartPage/MyIA.html`
    );
    check(response, {
      'Status code OK': (r) => r.status === 200,
    });

    response = http.get(
      `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/Sections/Views/Startpage/NewsWidget.html`
    );
    check(response, {
      'Status code OK': (r) => r.status === 200,
    });

    response = http.get(
      `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/api/Web/Global/IaHeader/${user.userGuid}/sv-SE/${user.organisationGuid}/5/00000000-0000-0000-0000-000000000000`
    );
    check(response, {
      'Status code OK': (r) => r.status === 200,
    });

    response = http.get(
      `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/api/Web/Dashboard/Leadtime/Occurrences/${user.organisationGuid}/sv-SE/1610614418353/1611305618353`
    );
    check(response, {
      'Status code OK': (r) => r.status === 200,
    });

    response = http.get(
      `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/Sections/Views/StartPage/LeadTimeAll.html`
    );
    check(response, {
      'Status code OK': (r) => r.status === 200,
    });

    response = http.get(
      `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/Sections/Views/StartPage/LeadTimeDetails.html`
    );
    check(response, {
      'Status code OK': (r) => r.status === 200,
    });

    response = http.get(
      `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/api/Web/Dashboard/IaDashboardOpenRisks/${user.userGuid}/sv-SE/${user.organisationGuid}/true`
    );
    check(response, {
      'Status code OK': (r) => r.status === 200,
    });

    response = http.get(
      `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/api/Web/Dashboard/Riskreduction/${user.userGuid}/${user.organisationGuid}/1610614418353/1611305618353/true`
    );
    check(response, {
      'Status code OK': (r) => r.status === 200,
    });

    response = http.get(
      `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/api/Web/Dashboard/IaNewsWidget/${user.userGuid}/sv-SE/${user.organisationGuid}/5`
    );
    check(response, {
      'Status code OK': (r) => r.status === 200,
    });

    response = http.get(
      `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/api/Web/Dashboard/IaDashboardTypesSummary/${user.userGuid}/sv-SE/${user.organisationGuid}/l7/1610614418406/1611305618406/false/true`
    );
    check(response, {
      'Status code OK': (r) => r.status === 200,
    });

    response = http.get(
      `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/api/Web/Dashboard/IaDashboardSafetyData/${user.userGuid}/${user.organisationGuid}/1610614418428/1611305618428/true`
    );
    check(response, {
      'Status code OK': (r) => r.status === 200,
    });

    response = http.get(
      `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/api/Web/Dashboard/TodoList/${user.userGuid}/sv-SE/${user.organisationGuid}/true`
    );
    check(response, {
      'Status code OK': (r) => r.status === 200,
    });

    response = http.get(
      `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/Sections/Views/News.html`
    );
    check(response, {
      'Status code OK': (r) => r.status === 200,
    });

    response = http.get(
      `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/Sections/Views/Favorites.html`
    );
    check(response, {
      'Status code OK': (r) => r.status === 200,
    });

    response = http.get(
      `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/Sections/Views/Tips.html`
    );
    check(response, {
      'Status code OK': (r) => r.status === 200,
    });

    response = http.get(
      `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/api/Web/Global/ResourceObjects/sv-SE/Tips`
    );
    check(response, {
      'Status code OK': (r) => r.status === 200,
    });

    response = http.get(
      `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/api/Web/Global/ResourceObjects/sv-SE/Favorites`
    );
    check(response, {
      'Status code OK': (r) => r.status === 200,
    });

    response = http.get(
      `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/api/Web/Global/ResourceObjects/sv-SE/News`
    );
    check(response, {
      'Status code OK': (r) => r.status === 200,
    });

    response = http.get(
      `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/api/Web/Dashboard/IaNewsWidget/${user.userGuid}/sv-SE/${user.organisationGuid}/5`
    );
      check(response, {
      'Status code OK': (r) => r.status === 200,
    });
  });

  group('Log out', function () {
      response = http.get(
        `https://${__ENV.MY_HOSTNAME}/PreventionIA/SystemNavigering.aspx?Utloggning=true`
      );

      // Will let us know if logout was successful 
      check(response, {
        'Logout, Status code 200': (r) => r.status === 200,
      });
    }
  );

  // Automatically added sleep
  sleep(1);
}
