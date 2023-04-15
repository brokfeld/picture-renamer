ECHO OFF

REG DELETE HKEY_CURRENT_USER\Software\Classes\directory\Background\shell\picture-renamer /f

timeout /t 15