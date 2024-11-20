import { BookingHistory, Train } from "types/train";
import { Role } from "types/user";

const apiBaseUrl =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:8080";

function fetchToken() {
  return "Bearer " + localStorage.getItem("token");
}

const headers = {
  "content-type": "application/json",
};

async function catchError<T>(request: Promise<Response>): Promise<{
  error: boolean;
  message?: string;
  data?: T;
  status: number;
  ok: boolean;
}> {
  const response = await request;
  const data = await response.json();

  if (!response.ok) {
    return {
      error: true,
      status: response.status,
      message: data.message,
      ok: response.ok,
    };
  }

  return {
    error: false,
    data,
    status: response.status,
    ok: response.ok,
  };
}

export async function login(body: { username: string; password: string }) {
  return await catchError<{
    accessToken: string;
    role: Role;
    userId: number;
  }>(
    fetch(`${apiBaseUrl}/user/login`, {
      method: "POST",
      body: JSON.stringify(body),
      headers,
    })
  );
}

export async function register(body: { username: string; password: string }) {
  return await catchError<{
    accessToken: string;
    role: Role;
    userId: number;
  }>(
    fetch(`${apiBaseUrl}/user/register`, {
      method: "POST",
      body: JSON.stringify(body),
      headers,
    })
  );
}

export async function searchTrains(query: {
  source: string;
  destination: string;
  date: string;
}) {
  return await catchError<Train[]>(
    fetch(
      `${apiBaseUrl}/trains/search?${new URLSearchParams(query).toString()}`,
      {
        headers: {
          ...headers,
          Authorization: fetchToken(),
        },
      }
    )
  );
}

export async function listTrains() {
  return await catchError<Train[]>(
    fetch(`${apiBaseUrl}/trains`, {
      headers: {
        ...headers,
        Authorization: fetchToken(),
      },
    })
  );
}

export async function createTrain(body: Partial<Train>) {
  return await catchError<Train[]>(
    fetch(`${apiBaseUrl}/trains`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        ...headers,
        Authorization: fetchToken(),
      },
    })
  );
}

export async function updateTrain(body: Partial<Train>) {
  return await catchError<Train[]>(
    fetch(`${apiBaseUrl}/trains/${body.trainId}`, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: {
        ...headers,
        Authorization: fetchToken(),
      },
    })
  );
}

export async function deleteTrain(trainId: number) {
  return await catchError<Train[]>(
    fetch(`${apiBaseUrl}/trains/${trainId}`, {
      method: "DELETE",
      headers: {
        ...headers,
        Authorization: fetchToken(),
      },
    })
  );
}

export async function bookTicket(body: {
  userId: number;
  trainId: number;
  seatCount: number;
}) {
  return await catchError<Train[]>(
    fetch(`${apiBaseUrl}/bookings`, {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        ...headers,
        Authorization: fetchToken(),
      },
    })
  );
}

export async function listBookingHistory(userId: number) {
  return await catchError<BookingHistory[]>(
    fetch(`${apiBaseUrl}/bookings?userId=${userId}`, {
      headers: {
        ...headers,
        Authorization: fetchToken(),
      },
    })
  );
}
