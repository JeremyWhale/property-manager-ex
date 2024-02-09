#!/bin/bash

# Set the path to your Git repository
repo_path="/back_end"

# Set the filename
file_name="db.sqlite3"

# Change directory to the Git repository
cd "$repo_path" || exit

# Check if the 'database' file exists
if [ -e "$file_name" ]; then
    # Add the file to the staging area
    git add "$file_name"

    # Get the current date
    current_date=$(date +"%Y-%m-%d")

    # Commit with a message containing the date
    git commit -m "Update $file_name - $current_date"

    # Push to the remote repository
    git push origin master

    cd "../"
else
    echo "Error: File '$file_name' not found."
fi
