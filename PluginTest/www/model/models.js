sap.ui.define([
	"sap/ui/model/json/JSONModel",
	"sap/ui/Device"
], function(JSONModel, Device) {
	"use strict";

	return {

		createDeviceModel: function() {
			var oModel = new JSONModel(Device);
			oModel.setDefaultBindingMode("OneWay");
			return oModel;
		},

		createPluginModel: function() {

			var oModel = new JSONModel([{
				name: "Camera",
				description: "Take pictures with the device camera",
				url: "https://www.npmjs.com/package/cordova-plugin-camera",
				icon: "sap-icon://camera",
				navTarget: "camera"
			}, {
				name: "Barcode Scanner",
				description: "Use the device camera as a barcode scanner",
				url: "https://www.npmjs.com/package/cordova-plugin-barcodescanner",
				icon: "sap-icon://bar-code",
				navTarget: "barcodeScanner"
			}, {
				name: "Geolocation",
				description: "Access GPS data",
				url: "https://www.npmjs.com/package/cordova-plugin-geolocation",
				icon: "sap-icon://map-2",
				navTarget: "geolocation"
			}, {
				name: "Signature",
				description: "Allowing a user to draw a signature using mouse, pen, or finger",
				url: "https://willowsystems.github.io/jSignature/#/about/",
				icon: "sap-icon://signature",
				navTarget: "signature"
			}]);

			return oModel;

		}

	};

});