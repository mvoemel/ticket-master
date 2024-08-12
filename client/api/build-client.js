import axios from "axios";

export default ({ req }) => {
  if (typeof window === "undefined") {
    // We are on the server
    return axios.create({
      // (Optional) Use an env variable to set the base URL
      // baseURL: "http://YOUR_PURCHASED_DOMAIN_NAME", // Replace with your purchased domain
      baseURL:
        "http://ingress-nginx-controller.ingress-nginx.svc.cluster.local", // Development only
      headers: req.headers,
    });
  } else {
    // We must be on the browser
    return axios.create({
      baseUrl: "/",
    });
  }
};
