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
                            obj.unit = "Years";
                            obj.subunit = "Months";
                            obj.tomin = 6;
                            return obj;
                        } else {
                            obj.num = months;
                            obj.unit = "Months";
                            obj.subunit = "Weeks";
                            obj.tomin = 5;
                            return obj;
                        }
                    } else {
                        obj.num = weeks;
                        obj.unit = "Weeks";
                        obj.subunit = "Days";
                        obj.tomin = 4;
                        return obj;
                    }
                } else {
                    obj.num = days;
                    obj.unit = "Days";
                    obj.subunit = "Hours";
                    obj.tomin = 3;
                    return obj;
                }
            } else {
                obj.num = hours;
                obj.unit = "Hours";
                obj.subunit = "Minutes";
                obj.tomin = 2;
                return obj;
            }
        } else {
            obj.num = mins;
            obj.unit = "Minutes";
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
            }
            return obj1.num + " " + obj1.unit + sub + tense;
        } else {
            return obj1.num + " " + obj1.unit + tense;
        }
    }
