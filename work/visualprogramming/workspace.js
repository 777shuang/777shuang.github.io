Promise.all(
	["workspace.xml", "toolbox.xml"].map(async file => { return fetch(file).then((res) => { return res.text(); }); })
).then(
	(xmls) => {
    	xmls.forEach(
			(xml) => {
    	    	var parser = new DOMParser();
    	    	var doc = parser.parseFromString(xml, "application/xml");
   		     	document.body.appendChild(doc.documentElement);
    		}
		);
	}
).then(
	() => {
		/* TODO: Change toolbox XML ID if necessary. Can export toolbox XML from Workspace Factory. */
		var toolbox = document.getElementById("toolbox");

		var options = { 
			toolbox : toolbox, 
			collapse : true, 
			comments : true, 
			disable : true, 
			maxBlocks : Infinity, 
			trashcan : true, 
			horizontalLayout : false, 
			toolboxPosition : 'start', 
			css : true, 
			media : 'https://blockly-demo.appspot.com/static/media/', 
			rtl : false, 
			scrollbars : true, 
			sounds : true, 
			oneBasedIndex : true
		};

		/* Inject your workspace */ 
		var workspace = Blockly.inject("blockDiv", options);

		/* Load Workspace Blocks from XML to workspace. Remove all code below if no blocks to load */

		/* TODO: Change workspace blocks XML ID if necessary. Can export workspace blocks XML from Workspace Factory. */
		var workspaceBlocks = document.getElementById("workspaceBlocks"); 

		/* Load blocks to workspace. */
		Blockly.Xml.domToWorkspace(workspaceBlocks, workspace);
	}
)