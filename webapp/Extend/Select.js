sap.ui.define(
	['sap/m/Select'],
	function (Select) {
		return Select.extend("com.practice.StandardControlExtension.StandardControlExtension.Extend.Select", {
			metadata: {
				properties: {
					addValueEnabled: {
						type: "boolean",
						defaultValue: true
					}
				},

				events: {
					"newValueCreated": {}
				}
			},
			ADD_OPTION_KEY: "__addNewValue",

			ADD_OPTION_TEXT: "Add Item",

			init: function () {

				// define variable for control initial loading handling

				this._bInitialLoading = true;

				// execute standard control method

				sap.m.Select.prototype.init.apply(this, arguments);

			},

			onBeforeRendering: function () {
				if (this.getAddValueEnabled()) {
					// check if "Add Item" option does not exist yet. if so, create it
					if (!this.getItemByKey(this.ADD_OPTION_KEY)) {
						var oItem = new sap.ui.core.Item({
							key: this.ADD_OPTION_KEY,
							text: this.ADD_OPTION_TEXT
						});
						this.insertItem(oItem, 0);

					}

					// set item index if more than one option and initial loading
					if (this._bInitialLoading && this.getItems().length > 1) {
						this.setSelectedItem(this.getItems()[1]);
						this._bInitialLoading = false;
					}
				}

				// execute standard control method
				sap.m.Select.prototype.onBeforeRendering.apply(this, arguments);

			},
			onSelectionChange: function (oControlEvent) {
				// get selected item
				var oItem = oControlEvent.getParameter("selectedItem");

				// check if the add value option is enabled and if the key is the ‘add option’ key
				if (this.getAddValueEnabled() && oItem.getKey() === this.ADD_OPTION_KEY) {
					this._createNewOptionDialog();
				}
				// Trigger standard control's selection change method
				sap.m.Select.prototype.onSelectionChange.apply(this, arguments);

			},

			_createNewOptionDialog: function () {
				// open create dialog with input field
				var that = this;
				var oCreateDialog = new sap.m.Dialog({
					title: 'Add value',
					content: new sap.m.Input({
						id: 'idNewValueInput'
					}),
					beginButton: new sap.m.Button({
						text: 'Add',
						press: function () {
							that._handleNewOption();
							oCreateDialog.close();
						}
					}),
					afterClose: function () {
						oCreateDialog.destroy();
					}
				});
				oCreateDialog.open();
			},

			_handleNewOption: function () {
				// get new option value
				var oInput = sap.ui.getCore().byId("idNewValueInput");
				var sNewValue = oInput.getValue();
				// create new option item to be added in select control
				var oItem = new sap.ui.core.Item({
					key: sNewValue,
					text: sNewValue
				});

				this.addItem(oItem); // adding item to Control item list and set it as selected
				this.setSelectedItem(oItem);
				this.fireNewValueCreated({

					value: sNewValue

				});

			},

				renderer: "sap.m.SelectRenderer"

		});
	});