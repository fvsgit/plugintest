sap.ui.define([
		"plugintest/controller/BaseController"
	], function (BaseController) {
		"use strict";

		return BaseController.extend("plugintest.controller.Worklist", { 

			/* =========================================================== */
			/* lifecycle methods                                           */
			/* =========================================================== */

			/**
			 * Called when the worklist controller is instantiated.
			 * @public
			 */
			onInit : function () { 
			},

			/* =========================================================== */
			/* event handlers                                              */
			/* =========================================================== */ 
			/**
			 * Event handler when a table item gets pressed
			 * @param {sap.ui.base.Event} oEvent the table selectionChange event
			 * @public
			 */
			onPress_Plugin : function (oEvent) {
				// The source is the list item that got pressed
				this._showObject(oEvent.getSource());
			},  

			/* =========================================================== */
			/* internal methods                                            */
			/* =========================================================== */

			/**
			 * Shows the selected item on the object page
			 * On phones a additional history entry is created
			 * @param {sap.m.ObjectListItem} oItem selected Item
			 * @private
			 */
			_showObject : function (oItem) {
				
				var iIndex = oItem.getParent().indexOfItem(oItem);
				var aPlugins = this.getView().getModel("plugins").getData(); 
				this.getRouter().navTo(aPlugins[iIndex].navTarget, {}); 
			}

		});
	}
);