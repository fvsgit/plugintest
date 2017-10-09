sap.ui.define([
	"plugintest/controller/BaseController"
], function(BaseController) {
	"use strict";

	return BaseController.extend("plugintest.controller.BarcodeScanner", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf plugintest.view.BarcodeScanner
		 */
		//	onInit: function() {
		//
		//	},

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

		onNavigateBack: function(oEvent) {
			this.NavigateBack();
		},

		onPress_btnScanBacode: function() {

		}

	});

});