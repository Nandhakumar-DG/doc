---
sidebar_position: 3
---

# Change UDT Instance Parameters

Changing UDT (User Defined Type) instance parameters in Ignition allows you to dynamically update parameter values across multiple UDT instances in a specified folder. This is useful for bulk updates to configuration parameters like PLC names or other instance-specific settings.

## Overview

This script helps you:
- Query UDT instances in a specified folder
- Update parameters across multiple UDT instances
- Apply bulk parameter changes efficiently
- Track the number of instances modified

## Description

This script **changes the parameters of UDT instances in a specified area of your tag tree**. It queries all UDT instances in the folder and updates a specific parameter with a new value. `Run this script in Script Console`. Change the parameters according to your folder structure and requirements.

## Parameters 

```python
Area = "TagPath to the parent folder"  # Example: "[tag_provider]Area/Motors/Motor1"
provider = 'default'  # The tag provider to query
value = "[NewPLC_Name]"  # The new value to assign to the parameter
PLC = "PLC"  # The parameter name to update
```

## Configuration Script

```python title="Python"
"""
DESCRIPTION:  Script to Change the Parameters of UDT instance in the tags
PARAMS:
	- : Area = "TagPath to the parent folder" # "[tag_provider]Area/Motors/Motor1"
	- : provider = 'default'  
	- : value = "[NewPLC_Name]" # PLC name passed as parameter
	- : PLC = "Line PLC" # Name as per your parameter
RETURN:
	- : Overriders the paramters of the UDT instances in the Respective folders Specified
	- : If count is 0 check for the name of parameter is correct or check the tagPath is correct.
"""

# Parameters 
provider = "default" # tagProvider Name
Area = "[default]Area/Motor/Motor 1" # Area of parameters need to be changed
value = "[NewPLC_Name]" # PLC name passed as parameter
parameter = "PLC" # Name as per your parameter
query = { 
  "options": {
    "includeUdtMembers": False,
    "includeUdtDefinitions": True
  },
  "condition": {
    "path": Area+"*",
    "tagType": "UdtInstance",
    "attributes": {
      "values": [],
      "requireAll": True
    }
  },
  "returnProperties": [
    "tagType",
    "quality"
  ]
}

# Counts how many tags are changed!
count = 0
results = system.tag.query(provider, query)

# Creates a FullTagPath to change the parameter
for result in results:
    count +=1 
    tag_path = str(result["fullPath"]) + "/Parameters."+ parameter
    
    # System.tag.configure to change the parameter of the UDT instance
    system.tag.writeBlocking(tag_path , value)
    
print (count)
```

## Usage

To use this script, set the parameters according to your environment:

```python
# Example usage
provider = "default"  # Your tag provider
Area = "[default]Area/Motor/Motor 1"  # Path to UDT instances
value = "[NewPLC_Name]"  # New PLC name or value
parameter = "PLC"  # Parameter name to update
```

The script will:
1. Query all UDT instances in the specified Area
2. Update the specified parameter for each instance
3. Return the count of modified instances

## Returns

The script prints the count of UDT instances that were modified. If the count is 0, verify:
- The parameter name is correct
- The tag path is correct and exists
- The UDT instances exist in the specified folder
