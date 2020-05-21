module.exports = {
  distance_function1: function distance(lat1, lat2, long1, long2) {
    lat1 = parseFloat(lat1);
    lat2 = parseFloat(lat2);
    long1 = parseFloat(long1);
    long2 = parseFloat(long2);
    //squareroot - Math.sqrt(9);
    //square - Math.pow(num, 2);
    return Math.sqrt(Math.pow(lat1 - lat2, 2) + Math.pow(long1 - long2, 2));
  },

  distance_function2: function distance2(lat1, lon1, lat2, lon2, unit) {
    if (lat1 == lat2 && lon1 == lon2) {
      return 0;
    } else {
      var radlat1 = (Math.PI * lat1) / 180;
      var radlat2 = (Math.PI * lat2) / 180;
      var theta = lon1 - lon2;
      var radtheta = (Math.PI * theta) / 180;
      var dist =
        Math.sin(radlat1) * Math.sin(radlat2) +
        Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = (dist * 180) / Math.PI;
      dist = dist * 60 * 1.1515;
      if (unit == "K") {
        dist = dist * 1.609344;
      }
      if (unit == "N") {
        dist = dist * 0.8684;
      }
      return dist / 1000;
    }
  },
};

// lat1 = 73.807518;
// lat2 = 73.769691;
// long1 = 18.558006;
// long2 = 18.60932;
// //distance = distance(lat1, lat2, long1, long2, "K");
// distance = distance(lat1, lat2, long1, long2);
// console.log(distance);
