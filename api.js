import axios from "axios";

const klaviyoAPI = axios.create({
  baseURL: "https://a.klaviyo.com/api",
  headers: {
    Authorization: `Klaviyo-API-Key pk_f4a5634dc47ec96704dc0c69417f622aad`,
    accept: "application/vnd.api+json",
    "content-type": "application/vnd.api+json",
    revision: "2025-07-15",
  },
});

export async function sendKlaviyoEvent({
  metricName,
  email,
  properties = {},
  time,
  uniqueId,
}) {
  const body = {
    data: {
      type: "event",
      attributes: {
        properties,
        metric: {
          data: { type: "metric", attributes: { name: metricName } },
        },
        profile: {
          data: { type: "profile", attributes: { email } },
        },
        ...(time ? { time } : {}),
        ...(uniqueId ? { unique_id: uniqueId } : {}),
      },
    },
  };

  try {
    const { data } = await klaviyoAPI.post("/events", body);
    return data; // contains the created event
  } catch (err) {
    // Helpful debugging
    if (err.response) {
      console.error("Klaviyo error:", err.response.status, err.response.data);
    } else {
      console.error("Network/other error:", err.message);
    }
    throw err;
  }
}