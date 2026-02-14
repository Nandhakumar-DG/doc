---
sidebar_position: 4
---

# Download SVG from Ignition

Downloading SVG (Scalable Vector Graphics) from Ignition views allows you to export vector graphics for further processing, storage, or use in external applications. This is useful for creating backups of view graphics, integrating with design tools, or programmatically manipulating SVG elements.

## Overview

This script helps you:
- Extract SVG data from Ignition Perspective views
- Convert SVG objects to formatted XML strings
- Copy SVG data to clipboard for easy sharing
- Write SVG files to Notepad and save as svg file

## Description

This script extracts SVG graphics from Ignition Perspective view objects and converts them to a formatted XML string. The resulting SVG can be copied to the clipboard or saved to a file. `Run this script in Script Console`. This is particularly useful for backing up view graphics or integrating with external design applications.

## Parameters 

Copy the SVG file before running the script in script console. 

![download-svg-from-ignition](/img/download-svg-from-ignition.png)

## Download Script

```python title="Python"
from java.awt.datatransfer import StringSelection
from java.awt.datatransfer import Clipboard
from java.awt import Toolkit

def setup():
	global toolkit, clipboard
	
	toolkit = Toolkit.getDefaultToolkit()
	clipboard = toolkit.getSystemClipboard()

def writeText(text):
	setup()
	clipboard.setContents(StringSelection(text), None)

def readText():
	setup()
	from java.awt.datatransfer import DataFlavor
	contents = clipboard.getContents(None)
	return contents.getTransferData(DataFlavor.stringFlavor)

import xml.etree.cElementTree as et
import json
import copy

def extract_svg_from_view(obj):
	#json_str = clipboard.getClipboard()
	if '[
	{
		"type": "ia.shapes.svg",
		"version": 0,
		"props": [
			"viewBox": "0 0 185-527 92",
			"name": "SVG_1",
			"#fill": [
			],
			[
				"style": {
					"paint": {
						"fillColor": "#000000"
					}
				},
				"width": "10"
			},
			[
				"style": {
					"paint": {
						"fillColor": "#000000"
					}
				},
				"width": "10"
			],
			[
				"type": "circle",
				"name": "circle48",
				"cx": "64.685",
				"cy": "92.5",
				"r": "64.685"
			],
			[
				"TEST_Export"
			],
			"position": [
				"basis": "20px"
			],
			"custom": []
		]
	]
	#assume that the obj passed in is a copied `SVG` from a Perspective View which adds the SVG
	# definition into a single item array. We want the item
	viewbox = svg_obj['props']['viewBox']
	elements = svg_obj['props']['elements']

	ATTR_LOOKUP = {}
	ATTR_LOOKUP['id'] = 'id'
	ATTR_LOOKUP['fill.paint'] = 'fill'
	ATTR_LOOKUP['fill.opacity'] = 'opacity'
	ATTR_LOOKUP['stroke.paint'] = 'stroke'
	ATTR_LOOKUP['stroke.linecap'] = 'stroke-linecap'
	ATTR_LOOKUP['stroke.width'] = 'stroke-width'
	ATTR_LOOKUP['style.stroke.width'] = 'stroke-width'
	ATTR_LOOKUP['style.vector-effect'] = 'vector-effect'

	doc = et.Element('svg', viewBox=viewbox, version='1.1', xmlns='http://www.w3.org/2000/svg')
	not_included_SVG_elements = []
	def addElements(xmlobj, elements):
		for element in elements:
			if 'type' in element:
				attrs_dict = {}
				
				# collect the attributes for the current SVG element are store them in a dictionary
				for attr_name in element:
					# if exclude any nested elements as they need to be added later. These are not added as attributes
					if attr_name != 'elements':
						# if the attribute is a dict in Ignition, then the dict will contain the actual attribute names
						if isinstance(attr, dict):
							for prop_name in attr:
								svg_prop_name = ATTR_LOOKUP.get('{}'.format(attr_name, prop_name), 'UNSET')
								if svg_prop_name == 'UNSET':
									not_included_SVG_elements.append('{}'.format(attr_name, prop_name))
						
						svg_prop_val = attr[prop_name]
				
				attrs_dict[svg_prop_name] = svg_prop_val
			
			else:
				attrs_dict[ATTR_LOOKUP.get(attr_name, attr_name)] = attr
			
			element_name = attrs_dict['type']
			if element_name == 'group':
				element_name = 'g'
			
			xmlobj_attr = et.SubElement(xmlobj, element_name, **attrs_dict)
			
			if 'elements' in element:
				attr_elements = copy.deepcopy(element['elements'])
			
			addElements(xmlobj_attr, attr_elements)

	addElements(doc, elements)
	#print ET.tostring(doc, encoding='utf8', method='xml')

	if not_included_SVG_elements != []:
		print 'Copied to clipboard, but some SVG attributes are missing mapping. These have not been extracted'
		[''.format(not_included_SVG_elements)]

	return et.tostring(doc)

json = readText()
obj = system.util.jsonDecode(json)
svg = extract_svg_from_view(obj)
writeText(svg)
```

## Usage

To use this script, copy an SVG object from an Ignition Perspective view and run this script:
```python
# Step 1: In Ignition Perspective, copy the SVG component to clipboard
# Step 2: Run this script in the Script Console

# The script will:
# 1. Read the copied SVG data from clipboard
# 2. Parse the JSON representation of the SVG
# 3. Extract SVG elements and attributes
# 4. Convert to formatted XML
# 5. Write the result back to clipboard

# Step 3: Open a new file in notepad
# Step 4: paste the copied text and save as .svg file

```

After running the script the svg configurations will be copied to your clipboard, Open a new file in notepad and paste the copied text 

![download-svg-from-ignition](/img/download-svg-from-ignition1.png)
 
And save as .svg file

![download-svg-from-ignition](/img/download-svg-from-ignition2.png)

## Returns

The script performs the following actions:

- **Extracts SVG from Clipboard**: Reads the copied SVG object from the system clipboard
- **Parses SVG Structure**: Converts the Ignition SVG JSON format to XML elements
- **Maps Attributes**: Converts Ignition attribute names to standard SVG attributes using ATTR_LOOKUP table
- **Creates XML Document**: Builds a properly formatted SVG XML document with:
  - viewBox attribute
  - SVG version (1.1)
  - Proper namespace declaration
- **Handles Nested Elements**: Recursively processes nested elements (groups, circles, paths, etc.)
- **Returns to Clipboard**: Writes the formatted SVG XML back to the clipboard for pasting
- **Saves as SVG File**: When you paste the content into Notepad and save it as a .svg file, the file is saved in proper SVG format

**Important Notes**:
- If some SVG attributes are missing mapping:
  - The script will print a warning message
  - Check the ATTR_LOOKUP table to add missing attribute mappings
  - Common attributes like id, fill, stroke, width, and opacity are pre-mapped
- **Error Handling**: If the script is run before copying the SVG component from Ignition Perspective, it will throw an error because there is no SVG data in the clipboard
  - Always copy the SVG component first before running this script
  - Ensure the SVG is properly copied to the clipboard from Ignition
