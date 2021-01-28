import { sleep, check, group } from "k6";
import http from "k6/http";

const data = JSON.parse(open("OrganizationData.json"));

const MAXUSERS = 5;

export let options = {
  setupTimeout: '10m',
  stages: [
    { duration: "5s", target: MAXUSERS },
    { duration: "20s", target: MAXUSERS },
    { duration: "10s", target: 0}
  ]
}

export default function main() {
  let response;

  let user = data[__VU % MAXUSERS];

  group(
    "Log in och åtgärd lista",
    function () {
      response = http.post(
        `https://${__ENV.MY_HOSTNAME}/Authentication?returnurl=%2FPreventionIA%2FIA%2FPages%2FActionPlan%2FAtgarderLista.aspx`,
        {
          UserName: `${user.username}`,
          Password: `${user.password}`,
        }
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
        `https://${__ENV.MY_HOSTNAME}/PreventionIA/signalr/negotiate?clientProtocol=2.1&connectionData=%5B%7B%22name%22%3A%22chathub%22%7D%5D&_=1611755543638`
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
        `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/api/Web/Global/ResourceObjects/sv-SE/Favorites`
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
        `https://${__ENV.MY_HOSTNAME}/PreventionIA/IA/api/Web/Dashboard/IaNewsWidget/${user.UserGuid}/sv-SE/${user.OrganisationGuid}/5`
      );
      check(response, {
        'Status code OK': (r) => r.status === 200,
      });

      response = http.get(
        `https://${__ENV.MY_HOSTNAME}/PreventionIA/signalr/start?transport=serverSentEvents&clientProtocol=2.1&connectionToken=Nc1wQrXRU4CZnyjG%2BAhgZX54SiQSUAj%2FaTGAghq7OI7RAe6eCZ5sHcE143pFPeMv%2Fxueq%2FL55xAlqJ%2F8Z52URObbL08MIIQSGGMqr%2ByK5hp4RxJtg8UQbfDt3hajiwil&connectionData=%5B%7B%22name%22%3A%22chathub%22%7D%5D&_=1611755543639`
      );
      check(response, {
        'Status code OK': (r) => r.status === 200,
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
        'Status code OK': (r) => r.status === 200,
      });
    }
  );

  // Automatically added sleep
  sleep(1);
}