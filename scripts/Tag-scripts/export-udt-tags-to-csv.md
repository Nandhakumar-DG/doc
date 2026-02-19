---
sidebar_position: 4
---

# Export UDT Tags to CSV

This script exports UDT (User Defined Type) instance tags from a specified path to a CSV file. It allows you to quickly retrieve and document all UDT instances along with their metadata in a structured format.

## Overview

Exporting UDT instance tags to CSV is useful for:
- Documenting tag structure and metadata
- Creating a backup of tag information
- Analyzing tag hierarchy and types
- Sharing tag information with other team members

## Description

This script browses a specified tag path for all UDT instance tags, extracts their metadata (base tag path, tag name, and type ID), and exports the data to a CSV file. It automatically filters out special tags like "Alarm Priority" and returns the results in a downloadable CSV format. **Run this script in Script Console**.

## Parameters

The tag path of the folder containing the UDT instance tags to export.

```python
tagpath = "Path to the tag"  # Example: "[default]Tags/Equipment"
```

## Export Script

```python title="Python"
"""
DESCRIPTION: Script to export UDT instance tags to CSV file
PARAMS:
	- tagpath: Path to the tag folder containing UDT instances
RETURN:
	- CSV file with columns: baseTagPath, tagName, typeId
"""
tagpath = "Path to the tag"
results = system.tag.browse(tagpath, {"tagType":"UdtInstance", "recursive":True}).results
headers = ["baseTagPath", "tagName", "typeId"]
data=[]
baseTagPath=''
tagName=''
typeId=''

for result in results:
    if str(result['name'])!='Alarm Priority':
        baseTagPath=str(result['fullPath'])
        tagName=str(result['name'])
        typeId=str(result['typeId'])
        #print str(result['fullPath']),',',str(result['name']),',',str(result['typeId'])
        data.append([baseTagPath, tagName, typeId])

ds=system.dataset.toDataSet(headers, data)
csv = system.dataset.toCSV(dataset = ds, showHeaders = True, forExport = False)
filePath = system.file.saveFile("CMH109_tags.csv", "csv", "Comma Separated Values")
if filePath != None:
    system.file.writeFile(filePath, csv)
```

## Usage

To use this script, set the `tagpath` parameter to your desired tag path and run it in the Script Console:

```python
# Example usage
tagpath = "[default]Tags/Equipment"  # Path to the folder containing UDT instances

# Run the script - it will:
# 1. Browse all UDT instance tags under the specified path
# 2. Filter out "Alarm Priority" tags
# 3. Extract metadata (full path, name, and type ID)
# 4. Create a CSV dataset
# 5. Prompt user to save the CSV file
```

## Returns

The script performs the following actions:

- **Browses UDT Instances**: Uses `system.tag.browse()` to find all UDT instance tags recursively under the specified path
- **Filters Data**: Excludes "Alarm Priority" tags from the export
- **Extracts Metadata**: Collects the following information for each tag:
  - **baseTagPath**: The full path to the tag
  - **tagName**: The name of the tag
  - **typeId**: The UDT type identifier
- **Creates CSV File**: Converts the collected data into a CSV format with headers
- **File Save Dialog**: Opens a save dialog for the user to specify the filename and location
- **Writes File**: Saves the CSV data to the selected file path

**Note**: The filename defaults to "CMH109_tags.csv" but can be changed in the save dialog. Ensure that:
- The tag path is correct and contains UDT instances
- You have read permissions on the tags
- You have write permissions for the location where you want to save the CSV file
