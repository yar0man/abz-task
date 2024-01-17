export const BASE_URL = "https://frontend-test-assignment-api.abz.agency/api/v1";

function wait(delay: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

type RequestMethod = "GET" | "POST";

function request<T>(
  url: string,
  method: RequestMethod = "GET",
  data: any = null
): Promise<T> {
  const options: RequestInit = { method };

  if (data) {
    options.body = JSON.stringify(data);
    options.headers = {
      "Content-Type": "application/json; charset=UTF-8",
    };
  }

  return wait(300)
    .then(() => fetch(BASE_URL + url, options))
    .then((response) => {
      if (!response.ok) {
        console.log('error');
      }

      return response.json();
    });
}

export async function postUser(formData: any, token: string) {
  await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    mode: 'cors',
    body: formData,
    headers: {
      'Token': token
    }
  })
}

export const client = {
  get: <T>(url: string) => request<T>(url),
};
