(function() {

    var app = angular.module('textcode.services', []);

    app.service( 'mobileService', function () {
        this.currentItem = [];
        this.group = [];
        this.items;
    });

    app.service('textcodeService', function() {

        var favorites = [];
        var textcodes = [];
        var sent_items = [];
        var debug = false;


        var isDebugMode = function() {  
            return debug;
        };

        var addToFavorites = function( item ) {  
            favorites.push( item );
        };

        var removeFromFavorites = function( item ) {
            favorites = favorites.filter(function(el){ return el.textcode != item.textcode; });
        };

        var getFavorites = function() {
            return favorites;
        };


        var addToSentItems = function ( item ) {
            item.ctime = new Date();
            item.time = item.ctime.toLocaleString() ;
            sent_items.push(item);
        }

        var getSentItems = function ( item ) {
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
            getFavorites : getFavorites,
            addToSentItems: addToSentItems,
            getSentItems : getSentItems,
            isDebugMode : isDebugMode


        };

    });
    
})();
