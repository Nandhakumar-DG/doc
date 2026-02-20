---
sidebar_position: 5
---

# Remove Tag Overrides

This script removes all overrides from tags within a specified folder path. It recursively traverses through folders and UDT instances, clearing any configuration overrides applied to individual tags.

## Overview

Removing tag overrides is useful for:
- Resetting tags to their original configuration
- Cleaning up bulk modifications or temporary overrides
- Ensuring tags use their default settings
- Preparing tags for reconfiguration

## Description

This script browses a specified tag folder path and recursively removes all configuration overrides from each tag. It handles both regular tags and UDT (User Defined Type) instances, diving deeper into subfolders as needed. For each tag found, it retrieves the current configuration and clears override values by setting them to `None`. **Run this script in Script Console or Project Library**.

## Parameters

The folder path containing the tags from which you want to remove overrides.

```python
folderPath = "Path to the tags folder"  # Example: "[default]Tags/Equipment"
```

## Remove Overrides Script

```python title="Python"
def overrideRemove(folderPath):
    """
    DESCRIPTION: This function shall be called from Project lib or script console
                 To get tagpaths where overrides are present and remove the overrides of each tag
    PARAMS:
        - folderPath = selected from the drop down to select the area folder
    RETURN:
        - Removes all the overrides in each tag.
    """
    import system

    results = system.tag.browse(folderPath)

    for result in results:
        fullPath = str(result['fullPath'])
        tagType = str(result['tagType'])

        if tagType == 'Folder' or tagType == 'UdtInstance':
            # Recurse into subfolders and UDT instances
            overrideRemove(fullPath)
        else:
            # Remove overrides on this tag
            configs = system.tag.getConfiguration(fullPath, True)[0]
            parentPath = fullPath.rsplit("/", 1)[0]

            for key in configs:
                if str(key) != 'path':
                    configs[key] = None

            system.tag.configure(parentPath, [configs], "o")
            print("Cleared overrides: {}".format(fullPath))

# Call the function with your tag folder path
overrideRemove("[default]Tags")
```

## Usage

To use this script, set the `folderPath` parameter to your desired tag folder and run it in the Script Console:

```python
# Example usage
folderPath = "[default]Tags/Equipment"  # Path to the folder containing tags to reset

# Call the function
overrideRemove(folderPath)

# The script will:
# 1. Browse all tags and folders under the specified path
# 2. Recursively traverse through subfolders and UDT instances
# 3. Get the configuration for each tag
# 4. Clear all override values (set to None)
# 5. Apply the cleared configuration back to the tag
# 6. Print confirmation message for each tag processed
```

## Returns

The script performs the following actions:

- **Browses Tags**: Uses `system.tag.browse()` to list all items (tags, folders, UDT instances) in the specified path
- **Recursive Traversal**: Recursively processes all subfolders and UDT instances to ensure complete coverage
- **Gets Configuration**: Retrieves the current configuration for each tag using `system.tag.getConfiguration()`
- **Clears Overrides**: Iterates through all configuration keys and sets override values to `None` (except the 'path' key)
- **Applies Changes**: Uses `system.tag.configure()` with the "o" mode to apply the cleared configuration
- **Console Output**: Prints a confirmation message for each tag processed

**Note**: Ensure that:
- The folder path is correct and contains the tags you want to reset
- You have read and write permissions on the tags
- You have appropriate gateway access for tag configuration
- The script will process all nested folders and UDT instances recursively

