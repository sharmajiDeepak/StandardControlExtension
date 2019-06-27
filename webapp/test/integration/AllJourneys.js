/* global QUnit*/

sap.ui.define([
	"sap/ui/test/Opa5",
	"com/practice/StandardControlExtension/StandardControlExtension/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"com/practice/StandardControlExtension/StandardControlExtension/test/integration/pages/main",
	"com/practice/StandardControlExtension/StandardControlExtension/test/integration/navigationJourney"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "com.practice.StandardControlExtension.StandardControlExtension.view.",
		autoWait: true
	});
});