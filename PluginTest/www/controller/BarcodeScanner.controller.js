sap.ui.define([
    "plugintest/controller/BaseController",
    "sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("plugintest.controller.BarcodeScanner", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf plugintest.view.BarcodeScanner
		 */
			onInit: function() {
                //Setup the event to fire when the navigation pattern is matched
                this.getRouter().getRoute("barcodeScanner").attachPatternMatched(this._onRouteMatched, this);
			},

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf plugintest.view.BarcodeScanner
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf plugintest.view.BarcodeScanner
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf plugintest.view.BarcodeScanner
		 */
		//	onExit: function() {
		//
		//	}
        _onRouteMatched: function (oEvent) {
            var oModel = new JSONModel({
                Result: ""
            });
            this.getView().setModel(oModel, "ViewModel");
        },
		onNavigateBack: function(oEvent) {
			this.NavigateBack();
		},
        onPress_btnScanBacodePDF: function () {
            cordova.plugins.barcodeScanner.scan(
                this._onSuccess.bind(this),
                function (error) {
                    alert("Scanning failed: " + error);
                },
                this._getBarcodeScannerOptions(true)
            );
        },
		onPress_btnScanBacode: function() {
            cordova.plugins.barcodeScanner.scan(
                this._onSuccess.bind (this),
                function (error) {
                    alert("Scanning failed: " + error);
                },
                this._getBarcodeScannerOptions(false)
            );
        },
        _getBarcodeScannerOptions: function (bPDF417) {

            var oMap = {};
            if (bPDF417) {
                oMap = {
                    preferFrontCamera: false, // iOS and Android 
                    showFlipCameraButton: true, // iOS and Android 
                    showTorchButton: true, // iOS and Android 
                    torchOn: true, // Android, launch with the torch switched on (if available) 
                    saveHistory: true, // Android, save scan history (default false) 
                    prompt: "Place a barcode inside the scan area", // Android 
                    resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500 
                    formats: "PDF_417",
                    orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device 
                    disableAnimations: true, // iOS 
                    disableSuccessBeep: false // iOS
                }
            } else {
                oMap = {
                    preferFrontCamera: false, // iOS and Android 
                    showFlipCameraButton: true, // iOS and Android 
                    showTorchButton: true, // iOS and Android 
                    torchOn: true, // Android, launch with the torch switched on (if available) 
                    saveHistory: true, // Android, save scan history (default false) 
                    prompt: "Place a barcode inside the scan area", // Android 
                    resultDisplayDuration: 500, // Android, display scanned text for X ms. 0 suppresses it entirely, default 1500 
                    orientation: "landscape", // Android only (portrait|landscape), default unset so it rotates with the device 
                    disableAnimations: true, // iOS 
                    disableSuccessBeep: false // iOS
                }
            }
            return oMap;
        },
        _onSuccess: function (result)
        {
            var sMsg = "We got a barcode\n" +
                "Result: " + result.text + "\n" +
                "Format: " + result.format + "\n" +
                "Cancelled: " + result.cancelled;
            this.getView().getModel("ViewModel").setProperty("/Result", sMsg);
        },
        _setViewModel: function () {

            
        }

	});

});