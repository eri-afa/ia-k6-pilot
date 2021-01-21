import http from 'k6/http';
import { sleep, check, group } from 'k6';

const data = JSON.parse(open("Ptest.json"));
console.log(data[1].Username);

export let options = {
  stages: [
    { duration: "2s", target: 5 },
    { duration: "2s", target: 5 },
    { duration: "2s", target: 0}
  ]
}
/*
export function setup() {
}
*/
export default function () {
  let response;

  let user = data[__VU];

  const vars = {};
  
  group("page_1 - https://ia.dev.ia.afaforsakring.se/", function () {
    response = http.get("https://ia.dev.ia.afaforsakring.se/authentication", {
      headers: {
        accept:
          "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-encoding": "gzip, deflate, br",
        "accept-language": "en-US,en;q=0.9",
        "cache-control": "max-age=0",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "upgrade-insecure-requests": "1",
      },
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
      "https://ia.dev.ia.afaforsakring.se/authentication",
      {
        KeepSSOCookie: `${vars["KeepSSOCookie"]}`,
        UserName: `${user.Username}`,
        Password: `${user.Password}`,
        __RequestVerificationToken: `${vars["__RequestVerificationToken"]}`,
      },
      {
        headers: {
          accept:
            "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          "cache-control": "max-age=0",
          "sec-fetch-dest": "document",
          "sec-fetch-mode": "navigate",
          "sec-fetch-site": "same-origin",
          "sec-fetch-user": "?1",
          "upgrade-insecure-requests": "1",
          "content-type": "application/x-www-form-urlencoded",
        },
      }
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/api/Web/Global/IaResource/sv-SE/Startpage",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
        },
      }
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/Sections/Views/Header.html",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
        },
      }
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/Sections/Views/StartPage/LeadTime.html",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
        },
      }
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/Sections/Views/StartPage/Safety.html",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
        },
      }
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/Sections/Views/StartPage/Summary.html",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
        },
      }
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/Sections/Views/StartPage/Risk.html",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
        },
      }
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/Sections/Views/StartPage/MyIA.html",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
        },
      }
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/Sections/Views/Startpage/NewsWidget.html",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
        },
      }
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/api/Web/Global/IaHeader/af702bed-1906-46db-b070-b612f7b140f5/sv-SE/799f22de-d8da-4c7a-bfab-1804f3b04f48/5/00000000-0000-0000-0000-000000000000",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
        },
      }
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/api/Web/Dashboard/Leadtime/Occurrences/799f22de-d8da-4c7a-bfab-1804f3b04f48/sv-SE/1610614418281/1611305618281",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
        },
      }
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/Sections/Views/StartPage/LeadTimeAll.html",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
        },
      }
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/Sections/Views/StartPage/LeadTimeDetails.html",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
        },
      }
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/api/Web/Dashboard/IaDashboardOpenRisks/af702bed-1906-46db-b070-b612f7b140f5/sv-SE/799f22de-d8da-4c7a-bfab-1804f3b04f48/true",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
        },
      }
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/api/Web/Dashboard/Riskreduction/af702bed-1906-46db-b070-b612f7b140f5/799f22de-d8da-4c7a-bfab-1804f3b04f48/1610614418353/1611305618353/true",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
        },
      }
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/api/Web/Dashboard/IaNewsWidget/af702bed-1906-46db-b070-b612f7b140f5/sv-SE/799f22de-d8da-4c7a-bfab-1804f3b04f48/5",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
        },
      }
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/api/Web/Dashboard/IaDashboardTypesSummary/af702bed-1906-46db-b070-b612f7b140f5/sv-SE/799f22de-d8da-4c7a-bfab-1804f3b04f48/l7/1610614418406/1611305618406/false/true",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
        },
      }
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/api/Web/Dashboard/IaDashboardSafetyData/af702bed-1906-46db-b070-b612f7b140f5/799f22de-d8da-4c7a-bfab-1804f3b04f48/1610614418428/1611305618428/true",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
        },
      }
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/api/Web/Dashboard/TodoList/af702bed-1906-46db-b070-b612f7b140f5/sv-SE/799f22de-d8da-4c7a-bfab-1804f3b04f48/true",
      {
        headers: {
          accept: "application/json, text/plain, */*",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
        },
      }
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/Sections/Views/News.html",
      {
        headers: {
          accept: "text/html, */*; q=0.01",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
        },
      }
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/Sections/Views/Favorites.html",
      {
        headers: {
          accept: "text/html, */*; q=0.01",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
        },
      }
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/Sections/Views/Tips.html",
      {
        headers: {
          accept: "text/html, */*; q=0.01",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
        },
      }
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/api/Web/Global/ResourceObjects/sv-SE/Tips",
      {
        headers: {
          accept: "application/json, text/javascript, */*; q=0.01",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          "content-type":
            "application/json;type=content-type;mimeType=application/json",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
        },
      }
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/api/Web/Global/ResourceObjects/sv-SE/Favorites",
      {
        headers: {
          accept: "application/json, text/javascript, */*; q=0.01",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          "content-type":
            "application/json;type=content-type;mimeType=application/json",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
        },
      }
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/api/Web/Global/ResourceObjects/sv-SE/News",
      {
        headers: {
          accept: "application/json, text/javascript, */*; q=0.01",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          "content-type":
            "application/json;type=content-type;mimeType=application/json",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
        },
      }
    );

    response = http.get(
      "https://ia.dev.ia.afaforsakring.se/PreventionIA/IA/api/Web/Dashboard/IaNewsWidget/af702bed-1906-46db-b070-b612f7b140f5/sv-SE/799f22de-d8da-4c7a-bfab-1804f3b04f48/5",
      {
        headers: {
          accept: "application/json, text/javascript, */*; q=0.01",
          "accept-encoding": "gzip, deflate, br",
          "accept-language": "en-US,en;q=0.9",
          "content-type":
            "application/json;type=content-type;mimeType=application/json",
          "sec-fetch-dest": "empty",
          "sec-fetch-mode": "cors",
          "sec-fetch-site": "same-origin",
          "x-requested-with": "XMLHttpRequest",
        },
      }
    );
  });

  group(
    "page_2 - https://ia.dev.ia.afaforsakring.se/PreventionIA/SystemNavigering.aspx?Utloggning=true",
    function () {
      response = http.get(
        "https://ia.dev.ia.afaforsakring.se/PreventionIA/SystemNavigering.aspx?Utloggning=true",
        {
          headers: {
            accept:
              "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-encoding": "gzip, deflate, br",
            "accept-language": "en-US,en;q=0.9",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
          },
        }
      );
    }
  );

  // Automatically added sleep
  sleep(1);

}
