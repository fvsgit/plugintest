sap.ui.define([
    "plugintest/controller/BaseController",
    "sap/m/MessageBox"
], function(BaseController, MessageBox) {
	"use strict";

    return BaseController.extend("plugintest.controller.Camera", {
         
          
        onNavigateBack: function (oEvent) {
            this.NavigateBack();
        },
        onPress_btnTakePhoto: function () {

            var oOptions = this._setOptions(Camera.PictureSourceType.CAMERA);
            navigator.camera.getPicture(this._onSuccess.bind(this), this._onError.bind(this), oOptions);
        },
        _onSuccess: function (imageUri) { 
            this._displayImage(imageUri);
        },
        _onError: function (error) {
            MessageBox.error("Unable to obtain picture: " + error, "app");
        },
        _setOptions: function (srcType) {
            var options = {
                // Some common settings are 20, 50, and 100 
                quality: 50,
                destinationType: Camera.DestinationType.FILE_URI,
                // In this app, dynamically set the picture source, Camera or photo gallery 
                sourceType: srcType,
                encodingType: Camera.EncodingType.JPEG,
                mediaType: Camera.MediaType.PICTURE,
                allowEdit: true,
                correctOrientation: true,  //Corrects Android orientation quirks 
                targetHeight: 100,
                targetWidth: 100
            }
            return options;
        },
        _displayImage: function(imgUri) {

            this.getView().byId("imgPhoto").setSrc(imgUri); 
        }

	});

});