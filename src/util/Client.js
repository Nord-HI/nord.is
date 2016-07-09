import fetch from 'isomorphic-fetch'

const sendRequest = (url, method, body) => (
  fetch('api/login', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
)

class Client {
  get(url) {
    return sendRequest(url, 'GET')
  }
  post(url, body) {
    return sendRequest(url, 'POST', body)
  }
}

export default new Client()
