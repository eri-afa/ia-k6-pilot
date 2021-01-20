import http from 'k6/http';
import { sleep, check } from 'k6';

export let options = {
  stages: [
    { duration: "2s", target: 5 },
    { duration: "6s", target: 5 },
    { duration: "2s", target: 0}
  ]
}

export default function () {
  const response = http.get("http://test.k6.io");
  check(response, {"statuskod 200": (r) => r.status === 200 });
  sleep(0.5);
}