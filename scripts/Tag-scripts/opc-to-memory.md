---
sidebar_position: 1
---

# OPC to MEMORY Tag Conversion

OPC to MEMORY tag conversion in Ignition involves transforming data from OPC data sources into MEMORY tags for local storage and manipulation. This allows you to bridge external OPC data sources with internal memory-based operations.

## Overview

MEMORY tags are stored locally in the Gateway's memory and can be used to:
- Use OPC values for faster access and Testing
- Store intermediate calculation results
- Create derived or transformed data from OPC sources

## Description

 This Script to convert Opc tags to Memory tags, It Converts all the OPC tag to memory **only if its Bool / Int / Float** and ignoring other datatype like string.  `Runs this script in Script Console`. Change the parameters according to your folder structure

## Parameters 

The tag path of the folder containing the tags that need to be converted.

```python
path = "TagPath to the parent folder" # Example "[tag_provider]Area/Motors/Motor1"
```
## Conversion Script

```python title="Python"
"""
DESCRIPTION:  Script to convert Opc tags to Memory tags, Runs this script in Script Console
PARAMS:
	- : path = "TagPath to the parent folder" # "[tag_provider]Area/Motors/Motor1"
RETURN:
	- : Converts all the OPC tag to memory only if its Bool / Int / Float and ignoring other datatype like string
"""
# parameters
import random 
path = "TagPath to the parent folder" # "[tag_provider]Area/Motors/Motor1"

# Segregating the tags
tags = system.tag.browse(path = path,filter = {"recursive":"True"})
paths = []
override_values = []

# check the tag is OPC if not it skips
for tag in tags:
	fullpath 		= 		str(tag['fullPath'])
	opc = system.tag.getAttribute(fullpath, "OPCItemPath")
	if opc != "":
		fullpath 	=	 	str(tag['fullPath'])
		datatype 	= 		str(tag['dataType'])
	   	name		=		str(tag['name'])
	   	overrides 	=		[{"name":name, "valueSource":"memory"}]
	   	path		=		fullpath.replace("/"+name,"")
	   	
	   	# Check for the datatype and Insert values accordign to that
	   	if (datatype == 'Boolean' or datatype == 'Int4' or datatype == 'Float4'or datatype == 'Float8'):   		  
		   	system.tag.configure(path,overrides,"m")		
			if datatype == 'Boolean':
		  		value = bool(random.getrandbits(1))
			elif datatype == 'Int4' or datatype == 'Float4' or datatype == 'Float8':
				value = random.randint(2,100)
			paths.append(fullpath)
			override_values.append(value)

# Writing the values to the respective tags
system.tag.writeAsync(paths, override_values)
```

## Usage

To use this script, set the path parameter and run it in the Script Console:

```python
# Example usage
path = "[default]Area/Motors/Motor1"  # Path to the parent folder

# Run the script - it will:
# 1. Browse all tags in the specified path
# 2. Identify OPC tags
# 3. Convert supported data types (Boolean, Int4, Float4, Float8) to Memory tags
# 4. Assign random values to the converted tags
```

## Returns

The script performs the following actions:

- **Converts OPC tags to Memory tags**: Changes the value source from OPC to Memory for supported data types
- **Assigns initial values**: Sets random values based on the data type:
  - Boolean tags: Random true/false value
  - Int4/Float4/Float8 tags: Random integer between 2 and 100
- **Writes values asynchronously**: Uses `system.tag.writeAsync()` to write initial values to all converted tags
- **Ignores unsupported types**: String and other data types are not converted

**Note**: If no tags are converted, verify that:
- The tag path is correct and contains OPC tags
- The tags have the OPCItemPath attribute set
- The tag data types are Boolean, Int4, Float4, or Float8
