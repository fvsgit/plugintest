sap.ui.define([
		"plugintest/controller/BaseController",
		"sap/ui/model/json/JSONModel"
	], function (BaseController, JSONModel) {
		"use strict";

		return BaseController.extend("plugintest.controller.App", {

			onInit : function () {
				var oViewModel;

				oViewModel = new JSONModel({
					busy : false,
					delay : 0
				});
				this.setModel(oViewModel, "appView"); 

				// apply content density mode to root view
				this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass());
			}
		});

	}
);