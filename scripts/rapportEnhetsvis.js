import { sleep, check, group } from "k6";
import http from "k6/http";

const data = JSON.parse(open("OrganizationData.json"));

// Number of users created in seed (length of data)
const MAXUSERS = 3;

export let options = {
  stages: [
    { duration: "3s", target: MAXUSERS },
    { duration: "5s", target: MAXUSERS },
    { duration: "2s", target: 0}
  ]
}

export default function main() {
  let response;

  let user = data[__VU % MAXUSERS];

  group(
    "Log in och Rapport Enhetsvis",
    function () {
      response = http.post(
        `https://${__ENV.MY_HOSTNAME}/Authentication?returnurl=%2FPreventionIA%2FIA%2FPages%2FReports%2FRapportEnhetsvis.aspx`,
        {
          KeepSSOCookie: "",
          UserName: `${user.username}`,
          Password: `${user.password}`,
          __RequestVerificationToken:
            "CfDJ8GUUjDiLYe1DgwUEt3_CV9DZKMFU7nI-hVjwca0gmjVruBWVf3JWIz8uZT6cl7fChINVnMwWz9qtkf-0xlHbhdxwWphpOggxZtWbscJFxD81wdJH1iJjs-vd11OG8RjLsbS15pJl49INkoNNYcXaTK8",
        }
      );
      check(response, {
        'Response OK': (r) => r.status === 200,
      });

      response = http.get(
        `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/Sections/Views/News.html`
      );
      check(response, {
        'Response OK': (r) => r.status === 200,
      });

      response = http.get(
        `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/Sections/Views/Favorites.html`
      );
      check(response, {
        'Response OK': (r) => r.status === 200,
      });

      response = http.get(
        `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/Sections/Views/Tips.html`
      );
      check(response, {
        'Response OK': (r) => r.status === 200,
      });

      response = http.post(
        `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/Pages/Reports/RapportEnhetsvis.aspx/GetSelectionData`,
        '{urval: "hh", types: [7,4,1,2,3,5,9,11], riskTypes: [], periodTypIndex: 0, snabbPeriod: "cy", startDateString: "2021-01-01", endDateString: "2021-12-31", anstForm: 1, dateType: 0, departmentType: 1, momentIndex:0 }'
      );
      check(response, {
        'Response OK': (r) => r.status === 200,
      });

      response = http.get(
        `https://${__ENV.MY_HOSTNAME}/PreventionIA/signalr/negotiate?clientProtocol=2.1&connectionData=%5B%7B%22name%22%3A%22chathub%22%7D%5D&_=1611752014661`
      );
      check(response, {
        'Response OK': (r) => r.status === 200,
      });

      response = http.get(
        `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/api/Web/Global/ResourceObjects/sv-SE/News`
      );
      check(response, {
        'Response OK': (r) => r.status === 200,
      });

      response = http.get(
        `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/api/Web/Global/ResourceObjects/sv-SE/Favorites`
      );
      check(response, {
        'Response OK': (r) => r.status === 200,
      });

      response = http.get(
        `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/api/Web/Global/ResourceObjects/sv-SE/Tips`,

      );
      check(response, {
        'Response OK': (r) => r.status === 200,
      });

      response = http.get(
        `https://${__ENV.MY_HOSTNAME}/PreventionIA/signalr/start?transport=serverSentEvents&clientProtocol=2.1&connectionToken=qJ%2FS1Uw68FLe92cfli8RckkTUZ2R7OK46mjLE6E%2FtDMHfqR0RFj7EitEPtOs60PT44uwUyFuXXeJJ3BOmCbtlf5GSrsvkRdbnkuiKwK%2FX1F2%2F4UZdETNBHMUCcT8o%2B2T&connectionData=%5B%7B%22name%22%3A%22chathub%22%7D%5D&_=1611752014662`
      );
      check(response, {
        'Response OK': (r) => r.status === 200,
      });

      response = http.post(
        `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/Pages/Reports/RapportEnhetsvis.aspx/GetChunks`,
        '{id: "9f81b27c-41f6-4059-918d-2544cccbf5cf" }'
      );
      check(response, {
        'Response OK': (r) => r.status === 200,
      });

      response = http.post(
        `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/Pages/Reports/RapportEnhetsvis.aspx/GetChunks`,
        '{id: "9f81b27c-41f6-4059-918d-2544cccbf5cf" }'
      );
      check(response, {
        'Response OK': (r) => r.status === 200,
      });

      response = http.get(
        `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/api/Web/Dashboard/IaNewsWidget/${user.userGuid}/sv-SE/${user.organisationGuid}/5`
      );
      check(response, {
        'Response OK': (r) => r.status === 200,
      });
    }
  );

  group(
    "Log out",
    function () {
      response = http.get(
        `https://${__ENV.MY_HOSTNAME}/PreventionIA/SystemNavigering.aspx?Utloggning=true`
      );
      check(response, {
        'Response OK': (r) => r.status === 200,
      });
    }
  );

  // Automatically added sleep
  sleep(1);
}