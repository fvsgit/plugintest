sap.ui.define([
	"plugintest/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox"
], function(BaseController, JSONModel, MessageBox) {
	"use strict";

	return BaseController.extend("plugintest.controller.Geolocation", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf plugintest.view.Geolocation
		 */
		onInit: function() {
			//Setup the event to fire when the navigation pattern is matched
			this.getRouter().getRoute("geolocation").attachPatternMatched(this._onRouteMatched, this);
		},
		onPress_btnGetLocation: function() {

			//Set the busy indicator for the application
			this.setBusy(true);

			//Get the GPS data
			this._getGSPData();
		},
		onNavigateBack: function(oEvent) {
			this.NavigateBack();
		},
		_onRouteMatched: function(oEvent) {

			var oModel = new JSONModel({
				Latitude: "",
				Longitude: "",
				Altitude: "",
				Accuracy: "",
				AltitudeAccuracy: "",
				Heading: "",
				Speed: "",
				Timestamp: ""
			});
			this.getView().setModel(oModel, "ViewModel");
		},
		_getGSPData: function() {
			navigator.geolocation.getCurrentPosition(this._onSuccess.bind(this), this._onError.bind(this));
		},
		_onSuccess: function(position) {
			
			this.getView().getModel("ViewModel").setProperty("/Latitude", position.coords.latitude);
			this.getView().getModel("ViewModel").setProperty("/Longitude", position.coords.longitude);
			this.getView().getModel("ViewModel").setProperty("/Altitude", position.coords.altitude);
			this.getView().getModel("ViewModel").setProperty("/Accuracy", position.coords.accuracy);
			this.getView().getModel("ViewModel").setProperty("/AltitudeAccuracy", position.coords.AltitudeAccuracy);
			this.getView().getModel("ViewModel").setProperty("/Heading", position.coords.heading);
			this.getView().getModel("ViewModel").setProperty("/Speed", position.coords.speed);
			this.getView().getModel("ViewModel").setProperty("/Timestamp", position.timestamp);

			//Set the busy indicator for the application
			this.setBusy(false);
		},
		_onError: function(error) {

			//Set the busy indicator for the application
			this.setBusy(false);

			var sMsg = "code: " + error.code + "\nmessage: " + error.message + "\n";
			MessageBox.error(sMsg); 
		}
	});

});