/**
 * @class Ext.ux.form.plugin.ItemSelectorPosition
 * @author Danny Roessner
 * 
 * This plugin adds event listeners to each of the boundList
 * components in the ItemSelector component so that when a
 * key is pressed on the keyboard, the next node matching
 * the pressed key is selected.
 */
Ext.define('Ext.ux.form.plugin.ItemSelectorPosition', {
	extend: 'Ext.AbstractPlugin',
	alias: 'plugin.itemselectorposition',
	init: function(field) {
		field.on('beforedestroy', function() {
			if (this.cmp.rendered) {
				this.cmp.fromField.getEl().removeListener('keydown', this.selectNextRecord, this);
				this.cmp.toField.getEl().removeListener('keydown', this.selectNextRecord, this);
			}
	    }, this);
	    
	    field.on('afterrender', this.addKeyDownListener , this, {
			single: true
	    });
	},
	addKeyDownListener: function() {
		this.cmp.fromField.getEl().on('keydown', this.selectNextRecord, this.cmp.fromField);
		this.cmp.toField.getEl().on('keydown', this.selectNextRecord, this.cmp.toField);
	},
	selectNextRecord: function(event) {
		var field = this,
			code = event.keyCode,
			character,
			checkIfMatch,
			boundList,
			displayField,
			selectionModel,
			selectedNodes,
			selectedNode,
			selectedNodeIndex,
			nodes,
			recordToSelect,
			selectedRecord,
			records,
			length,
			i;
		
		if ((code >= Ext.EventObject.ZERO && code <= Ext.EventObject.NINE) ||
			(code >= Ext.EventObject.NUM_ZERO && code <= Ext.EventObject.NUM_NINE) ||
			(code >= Ext.EventObject.A && code <= Ext.EventObject.Z)) {
			
			if (code >= Ext.EventObject.NUM_ZERO && code <= Ext.EventObject.NUM_NINE) {
				code = code - 48;
			}
			
			character = String.fromCharCode(code);
			boundList = field.boundList;
			displayField = boundList.displayField;
			selectedNodes = boundList.getSelectedNodes();
			selectedNode = selectedNodes && selectedNodes[0] ? selectedNodes[0] : null;
			nodes = boundList.getNodes();
			records = boundList.getRecords(nodes);
			length = records.length;
			checkIfMatch = function(record) {
				var value = record.get(displayField);
				
				if (!Ext.isNumber(value)) {
					value = value.toString();
				}
	
				return (Ext.isString(value) && value.charAt(0).toUpperCase() === character) ? record : null;
			};
			
			if (length > 0) {
				if (selectedNode) {
					selectedRecord = boundList.getRecord(selectedNode);
					selectedNodeIndex = Ext.Array.indexOf(nodes, selectedNode);
					
					if (selectedNodeIndex < length - 1) {
						for (i = selectedNodeIndex + 1; i < length && !recordToSelect; i++) {
							recordToSelect = checkIfMatch(records[i]);
						}
					}
					
					if (!recordToSelect && selectedNodeIndex > 0) {
						for (i = 0; i <= selectedNodeIndex - 1 && !recordToSelect; i++) {
							recordToSelect = checkIfMatch(records[i]);
						}
					}
				} else {
					for (i = 0; i < length && !recordToSelect; i++) {
						recordToSelect = checkIfMatch(records[i]);
					}
				}	
				
				if (recordToSelect) {
					selectionModel = boundList.getSelectionModel();
					selectionModel.select(recordToSelect, false);
				}
	        }
		}
	}
});