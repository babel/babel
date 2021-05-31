module.exports = {
  init: function () {
    return new Promise((resolve, reject) => {
      MongoClient.connect(config.mongodb, (err, db) => {
        if (err) {
          return reject(err);
        }
        this.db = db;
        resolve(this);
      });
    });
  }
};
