import http from 'k6/http';
import { check, sleep } from 'k6';
import { Trend } from 'k6/metrics';

const pageLoadTime = new Trend('page_load_time', true);

export const options = {
  vus: 5,
  duration: '30s',
  thresholds: {
    http_req_duration: ['p(95)<5000'],
  },
};

export default function () {
  const res = http.get('https://sauce-demo.myshopify.com/');

  pageLoadTime.add(res.timings.duration);

  check(res, {
    'status is 200': (r) => r.status === 200,
    'page has content': (r) => r.body.length > 0,
    'response time < 5s': (r) => r.timings.duration < 5000,
  });

  sleep(1);
}
