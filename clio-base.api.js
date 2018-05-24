// Add a comment
var ClioBaseApi = /** @class */ (function () {
    function ClioBaseApi(dataToSend, accessToken, fields) {
        this.isBulk = false;
        this.fields = [];
        this.clioUrl = this.getHeaders(accessToken);
        this.isBulk = Array.isArray(dataToSend);
        // this.headers = this.getHeaders(accessToken);
        this.fields = fields ? fields : [];
        this.dataToSend = dataToSend;
    }
    ClioBaseApi.prototype.create = function () {
        // TODO: Add related tests if a failure occurs within the response block.
        return http_request_lib_1.HttpRequest.postRequest(this.buildApiUrl(), this.createData(), this.headers);
    };
    ClioBaseApi.prototype.update = function (id) {
        return http_request_lib_1.HttpRequest.patchRequest(this.buildApiUrl(id), this.createData(), this.headers);
    };
    ClioBaseApi.prototype.createData = function () {
        var createData = { data: this.dataToSend };
        // bulk calls have the fields specified in the body
        if (this.isBulk) {
            var key = "fields";
            createData[key] = this.fields.join(",");
        }
        return createData;
    };
    ClioBaseApi.prototype.getHeaders = function (accessToken) {
        return {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json",
            "X-BULK": this.isBulk,
        };
    };
    ClioBaseApi.prototype.buildApiUrl = function (id) {
        var url = "" + this.clioUrl + "/test/path/";
        if (id) {
            url += "/" + id;
        }
        // non-bulk calls have the fields specified in the url
        if (!this.isBulk) {
            var fieldParams = this.fields.length ? utils.buildFieldParams(this.fields) : "";
            if (fieldParams.length) {
                url += "?" + fieldParams;
            }
        }
        return url;
    };
    return ClioBaseApi;
}());