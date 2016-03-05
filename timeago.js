    "use strict";

    function convertTime(mins) {
        var obj = {};
        if (mins >= 60) {
            var hours = Math.floor(mins / 60);
            if (hours >= 24) {
                var days = Math.floor(hours / 24);
                if (days >= 7) {
                    var weeks = Math.floor(days / 7);
                    if (weeks >= 4.35) {
                        var months = Math.floor(weeks / 4.35);
                        if (months >= 12) {
                            var years = Math.floor(months / 12);
                            obj.num = years;
                            if (obj.num > 1)
                              obj.unit = "Years";
                            else obj.unit = "Year";
                            obj.subunit = "Month";
                            obj.tomin = 6;
                            return obj;
                        } else {
                            obj.num = months;
                            if (obj.num > 1)
                              obj.unit = "Months";
                            else obj.unit = "Month";
                            obj.subunit = "Week";
                            obj.tomin = 5;
                            return obj;
                        }
                    } else {
                        obj.num = weeks;
                        if (obj.num > 1)
                          obj.unit = "Weeks";
                        else obj.unit = "Week";
                        obj.subunit = "Day";
                        obj.tomin = 4;
                        return obj;
                    }
                } else {
                    obj.num = days;
                    if (obj.num > 1)
                      obj.unit = "Days";
                    else obj.unit ="Day";
                    obj.subunit = "Hour";
                    obj.tomin = 3;
                    return obj;
                }
            } else {
                obj.num = hours;
                if (obj.num > 1)
                  obj.unit = "Hours";
                else obj.unit = "Hour";
                obj.subunit = "Minute";
                obj.tomin = 2;
                return obj;
            }
        } else {
            obj.num = mins;
            if (obj.num > 1)
              obj.unit = "Minutes";
            else obj.unit="Minute";
            obj.tomin = 1;
            return obj;
        }
    }

    function convertToRead(timestamp) {
        var thatDate = new Date(timestamp);
        var now = new Date();
        var units = [1, 60, 1440, 10080, 43848, 526176];
        var tense = "";
        var timeDiff = thatDate.getTime() - now.getTime();
        if (timeDiff < 0) {
            tense = " ago";
        } else if (timeDiff > 0) {
            tense = " later";
        }
        var minsDiff = Math.round( Math.abs(timeDiff) / (1000 * 60) );
        var obj1 = convertTime(minsDiff);
        if (obj1.tomin > 1) {
            var sub = Math.round( ( minsDiff - (obj1.num * units[obj1.tomin]) ) / units[obj1.tomin - 1] );
            if (sub < 1) {
                sub = "";
            } else {
                sub = " " + sub + " " + obj1.subunit;
                if (sub > 1)
                    sub = sub + "s";
            }
            return obj1.num + " " + obj1.unit + sub + tense;
        } else {
            return obj1.num + " " + obj1.unit + tense;
        }
    }
