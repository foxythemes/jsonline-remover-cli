# jsonline-remover-cli

This is a JSON line-remover CLI, useful when you need remove a line that who match a pattern on a specific JSON file.

## Getting Started

*  Install with npm: `npm install @foxythemes/jsonline-remover-cli -D`
*  Run it with `lineremover`

## Docs

```	
lineremover -s source-path/ -f file.json -p pattern

Basic options

-s, --src       Source path of origin JSON file
-f, --file      Name of file that will be modified
-p, --pattern   Pattern that will be searched line by line on file, removing line who match with this

```

## License

Copyright (c) FoxyThemes
Licensed under the MIT license.
