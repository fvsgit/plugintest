sap.ui.define([
		"plugintest/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("plugintest.controller.NotFound", {

			/**
			 * Navigates to the worklist when the link is pressed
			 * @public
			 */
			onLinkPressed : function () {
				this.getRouter().navTo("worklist");
			}

		});

	}
);