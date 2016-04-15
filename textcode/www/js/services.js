(function() {

    var app = angular.module('textcode.services', []);

    app.service('textcodeService', function($http) {
        var txtcodeSrv = this;
        this.textcodes = [];


        this.groupId = 0;
        this.subId = 0;
        this.item = 0;

        var addTextCode = function(newObj) {
            textcodes.push(newObj);
        };

        var getTextCodes = function() {
            return this.textcodes;
        };

        var setTextCodes = function(txtcode) {
            this.textcodes = txtcode;
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
            setId: setId
        };

    });
    
})();
