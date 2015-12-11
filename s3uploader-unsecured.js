var s3Uploader = (function () {
alert("s3Uploader");
    var s3URI = encodeURI("https://sedarspine.s3.amazonaws.com/"),
        policyBase64 = "http://goodletschool.com/server/server/signing_server.js",
        signature = "http://goodletschool.com/server/server/signing_util.js",
        awsKey = 'AKIAJHOJKDRCYT476Q6Q',
        acl = "public-read";

    function upload(imageURI, fileName) {
        alert("imageURI");
        var deferred = $.Deferred(),
            ft = new FileTransfer(),
            options = new FileUploadOptions();

        options.fileKey = "file";
        options.fileName = fileName;
        options.mimeType = "image/jpeg";
        options.chunkedMode = false;
        options.params = {
            "key": fileName,
            "AWSAccessKeyId": awsKey,
            "acl": acl,
            "policy": policyBase64,
            "signature": signature,
            "Content-Type": "image/jpeg"
        };

        ft.upload(imageURI, s3URI,
            function (e) {
                deferred.resolve(e);
            },
            function (e) {
                deferred.reject(e);
            }, options);

        return deferred.promise();

    }

    return {
        upload: upload
    }

}());