module.exports = {
  API_URL:
    process.env.NODE_ENV === "production"
      ? "https://craftnest-backend.onrender.com"
      : "http://localhost:8080",
};
 