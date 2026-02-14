---
sidebar_position: 2
---

# Create TagPaths of History Provider Tags

Creating a list of tagPaths for History Provider tags in Ignition allows you to identify and retrieve all tags within a folder that have history enabled. This is useful for managing historical data collection and analysis.

## Overview

This script helps you:
- Query tags with History Provider enabled
- Extract tagPaths for further processing
- Filter tags based on history attributes
- Return a list of all tags with history enabled in a specified folder

## Description

This script creates a **list of tagPaths for all tags in a specified folder that have the History Provider attribute enabled**. It queries the tag provider and returns the full paths of matching tags. `Add this script to project library and call` Change the parameters according to your folder structure.

## Parameters 

```python
tagPath = "TagPath to the parent folder"  # Example: "[tag_provider]Area/Motors/Motor1"
tagProvider = 'default'  # The tag provider to query
```

## Configuration Script

```python title="Python"
"""
DESCRIPTION:  Script to Create List of tagPaths of History provider tags
PARAMS:
	- : tagPath = "TagPath to the parent folder" # "[tag_provider]Area/Motors/Motor1"
	- : tagProvider = 'default' 
RETURN:
	- :  Returns List of tagPaths of History Provider tags
"""

def Create_tagPaths_of_HistoryProvider_tags(tagPath, tagProvider):
	
	# Parameters
	tagpath = tagPath + "*"
	provider = tagProvider
	query = {
			"options": {
			"includeUdtMembers": True,
			"includeUdtDefinitions": False
			},
			"condition": {
			"path": tagpath,
			"attributes": {
			  "values": [
			    "history"
			  ],
			  "requireAll": True
			}
			},
			"returnProperties": [
			"tagType",
			"quality"
			]
			}
			
	# Get the Tags having History Provider
	Tags = system.tag.query(provider, query)
	TagPaths = []
	
	# Store the tagPaths in a List 
	for i in range(len(Tags)):
		    TagPaths.append(Tags[i]['fullPath'])
	    
	# Return the List    
	return TagPaths
```

## Usage

To use this script, call the function with your tag path and provider:

```python
# Example usage
tagPath = "[default]Area/Motors/Motor1/"
tagProvider = 'default'
historyTagPaths = Create_tagPaths_of_HistoryProvider_tags(tagPath, tagProvider)

# Print the results
print(historyTagPaths)
```

## Returns

The function returns a list containing the full paths of all tags with History Provider enabled:

```python
[
    "[default]Area/Motors/Motor1/Temperature",
    "[default]Area/Motors/Motor1/Pressure",
    "[default]Area/Motors/Motor1/Speed"
]
```
