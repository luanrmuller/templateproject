module.exports = {
    index(request, response) {
      return response.json({ "msg": "Hello world from backend!" });
    }
  };
  