Ext.Loader.setConfig({
	enabled: true,
	paths: {
		'Ext.ux': 'ux'
	}
});

Ext.require(['Ext.ux.form.MultiSelect', 'Ext.ux.form.ItemSelector', 'Ext.ux.form.plugin.ItemSelectorPosition']);
Ext.onReady(function() {		
	Ext.create('Ext.panel.Panel', {
		title: 'ItemSelector Position Plugin Example',
		height: 400,
		width: 400,
		layout: 'fit',
		renderTo: Ext.getBody(),
		bodyPadding: 10,
		items: [{
			xtype: 'itemselector',
			displayField: 'name',
			valueField: 'name',
			plugins: 'itemselectorposition',
			store: Ext.create('Ext.data.Store', {
				autoDestroy: true,
				fields: ['name'],
				data: [
					['Tommy Mishcon'],
					['Aaron Robinson'],
					['Ed Kaneda'],
					['Dave Mishcon'],
					['Tommy Kaneda'],
					['Tommy White'],
					['Jay Maintz'],
					['Ed Spencer'],
					['Adam Kaneda'],
					['David Spencer'],
					['Adam Avins'],
					['Nicolas Maintz'],
					['Ed Mishcon'],
					['Aaron Ferrero'],
					['Nicolas Spencer'],
					['Jay Robinson'],
					['David White'],
					['Ed Elias'],
					['Jay Davis']
				],
				sorters: ['name'],
				proxy: {
					type: 'memory',
					reader: {
						type: 'array'
					}
				},
				autoLoad: true
			})
		}]
	});
});