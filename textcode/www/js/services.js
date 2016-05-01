(function() {

    var app = angular.module('textcode.services', []);

    app.service('mobileService', function() {
        this.currentItem = [];
        this.group = [];
        this.items;
    });

    app.service('textcodeService', function($cordovaFile) {

        var favorites = [];
        var textcodes = [];
        var sent_items = [];
        var debug = false;



        var writeFile = function(filename, stringdata) {

            document.addEventListener("deviceready", function() {

                $cordovaFile.writeFile(cordova.file.dataDirectory, filename, stringdata, true)
                    .then(function(success) {
                        console.log("Write success location: " + cordova.file.dataDirectory + "' filename:'" + filename + "'");
                        console.log('Contents: ' + stringdata);
                    }, function(error) {
                        alert(error);
                    });

            });
        }


        var readFile = function(filename) {

            console.log("Reading File " + filename);
            document.addEventListener("deviceready", function() {
                $cordovaFile.readAsText(cordova.file.dataDirectory, filename)
                    .then(function(results) {
                        console.log('readfile' + results);
                        return results;
                    }, function(error) {
                        alert("Error while reading '" + filename + "'" + error.message);
                    });
            });
        }


        var readFavoritesFile = function() {
            var results;

            try {
                results = readFile('favorites.json');
                console.log(results);
                favorites = JSON.parse(results);
            } catch (err) {
                console.log(err.message);
            }


        };

        /*
        TODO: make this work!!!
        readFavoritesFile();*/

        var updateFavorites = function(data) {
            var tmp = data;
            tmp = JSON.stringify(tmp);
            console.log("Converted javascript object to string " + tmp);

            writeFile('favorites.json', tmp);

        };

        var isDebugMode = function() {
            return debug;
        };


        var addToFavorites = function(item) {
            favorites.push(item);
            updateFavorites(favorites);
        };

        var removeFromFavorites = function(item) {
            favorites = favorites.filter(function(el) {
                return el.textcode != item.textcode;
            });
            updateFavorites(favorites);
        };

        var getFavorites = function() {
            return favorites;
        };


        var addToSentItems = function(item) {
            item.ctime = new Date();
            item.time = item.ctime.toLocaleString();
            sent_items.push(item);
        }

        var getSentItems = function(item) {
            return sent_items;
        }



        this.groupId = 0;
        this.subId = 0;
        this.item = 0;
        this.currentItem = [];

        var addTextCode = function(newObj) {
            textcodes.push(newObj);
        };

        var getTextCodes = function() {
            return textcodes;
        };

        var setTextCodes = function(txtcode) {
            textcodes = txtcode;
        };

        var setId = function(type, ind) {
            if (type == "group")
                this.groupId = ind;
            else if (type == "sub")
                this.subId = ind;
            else if (type == "item")
                this.item = ind;
        }
        return {
            addTextCode: addTextCode,
            getTextCodes: getTextCodes,
            setTextCodes: setTextCodes,
            setId: setId,
            addToFavorites: addToFavorites,
            removeFromFavorites: removeFromFavorites,
            getFavorites: getFavorites,
            addToSentItems: addToSentItems,
            getSentItems: getSentItems,
            isDebugMode: isDebugMode


        };

    });

})();
