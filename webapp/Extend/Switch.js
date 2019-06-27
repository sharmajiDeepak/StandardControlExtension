sap.ui.define(
	['sap/m/Switch'],function(Switch) {
		
	return Switch.extend("com.practice.StandardControlExtension.StandardControlExtension.Extend.Switch",{
		metadata: {
			properties: {
				editable: {
					type:"boolean",
					defaultValue: true
				}
			}
		},
		
		renderer: function(oRM,oControl) {
			if(oControl.getEditable()) {
				sap.m.SwitchRenderer.render(oRM,oControl);
			} else {
				var sText = oControl.getState() ? oControl._sOn : oControl._sOff;
				  oRM.write("<span tabindex=\"0\""); //To allow keyboard navigation
                    oRM.writeControlData(oControl); //ui5 trackings data, outputs sId, absolutely mandatory
                    oRM.writeClasses(oControl); //applying the class attribute to make control work correctly
                    oRM.write(">");
                    oRM.write( jQuery.sap.encodeHTML( sText ) ); //always use encodeHTML when dealing with dynamic strings
                    oRM.write("</span>");
			}
			
		}
	});
});