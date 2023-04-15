ECHO OFF

REG ADD HKEY_CURRENT_USER\Software\Classes\directory\Background\shell\picture-renamer /d "Start picture-renamer" /f
REG ADD HKEY_CURRENT_USER\Software\Classes\directory\Background\shell\picture-renamer\command /d "\"C:\Users\%USERNAME%\AppData\Roaming\npm\picture-renamer.cmd\" --dir \"%%%V\"" /f

timeout /t 15