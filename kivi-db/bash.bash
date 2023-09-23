You can create a Bash script to check for new files and delete old files based on a certain criterion. Here's an example script that checks for new files in a directory and deletes old files if there are more than a certain number of files in the directory:

```bash
#!/bin/bash

# Define the directory path
directory="/path/to/your/directory"

# Maximum number of files to keep
maxFiles=10

# Check if the directory exists
if [ -d "$directory" ]; then
  cd "$directory" || exit 1

  # List files in the directory sorted by modification time (oldest first)
  files=($(ls -t))

  # Calculate the number of files in the directory
  fileCount=${#files[@]}

  # Check if there are more files than the maximum allowed
  if [ "$fileCount" -gt "$maxFiles" ]; then
    # Determine how many files to delete
    filesToDelete=$((fileCount - maxFiles))

    # Delete the oldest files
    for ((i = 0; i < filesToDelete; i++)); do
      fileToDelete="${files[i]}"
      rm "$fileToDelete"
      echo "Deleted: $fileToDelete"
    done
  else
    echo "No files to delete. File count: $fileCount"
  fi
else
  echo "Directory not found: $directory"
fi
```

Make sure to replace `"/path/to/your/directory"` with the actual directory path you want to monitor. This script lists the files in the directory by modification time, and if there are more files than the specified `maxFiles`, it deletes the oldest files.

You can save this script to a file (e.g., `cleanup.sh`), make it executable using `chmod +x cleanup.sh`, and then run it periodically using a cron job or some other scheduling mechanism to perform the cleanup as needed.