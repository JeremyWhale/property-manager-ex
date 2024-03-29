#!/bin/bash

#TO USE:
#chmod +x backup_script.sh
#crontab -e
# 0 0 * * 0 /pathto/backup.sh

# Get the directory of the script
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

# Define the directory where the file.db is located
SOURCE_DIR="$SCRIPT_DIR"

# Define the directory where backups will be stored
BACKUP_DIR="$SCRIPT_DIR/../backups"

# Define the Git repository directory
GIT_REPO_DIR="$SCRIPT_DIR/.."

# Define the name of the database file
DB_FILE="db.sqlite3"

# Create a formatted date string for the backup file name
DATE=$(date +"%d-%m-%Y")

# Backup the file with the formatted date appended
cp "$SOURCE_DIR/$DB_FILE" "$BACKUP_DIR/file-$DATE.db"

# Change directory to the Git repository
cd "$GIT_REPO_DIR" || exit

# Add the new backup file to Git staging area
git add "$BACKUP_DIR/file-$DATE.db"

# Commit the changes with the current date as the commit message
git commit -m "database backup $DATE"

