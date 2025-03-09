# Remotion template for the video

## Templates

This project now supports multiple video templates identified by IDs:
- `Video1`: Template with blue theme
- `Video2`: Template with green theme 
- `Video3`: Original template with purple theme
- `Video4`: Grid layout with product details
- `Video5`: Sliding gallery animation
- `Compare`: Special composition for comparing templates

## Adding a New Template

To add a new template:

1. Create a new file in `src/templates/` (e.g., `Video6.ts`) using the existing templates as a guide
2. Add your template to `src/templates/index.ts`
3. Your template will be automatically available in the Remotion preview and server

## Server Rendering

The server supports rendering any of the templates. Use the `video` query parameter to specify which template to use:

```
http://localhost:3000/instagram-video/?video=1&query=...
```

Where the video parameter corresponds to the template index (1 for Video1, 2 for Video2, etc.)

Examples:

```
# Video4 - Grid Layout
http://localhost:3000/instagram-video/?video=4&query=eyJpZCI6MTU5NiwicHJvZHVjdE5hbWUiOiJQcm9kdWN0byBlaGplbXBsbyIsInByaWNlIjoiMTk5IiwidXNlcm5hbWUiOiJMb2xhU3RvcmUiLCJwaG90b3MiOlsiaHR0cHM6Ly9sb2xhcGF5LXByb2R1Y3RzLnMzLmFtYXpvbmF3cy5jb20vMS81LzkvMTU5Ni90cmFuc3BhcmVudF8xNjUwNDE1NTY3NDUzLnBuZyIsImh0dHBzOi8vbG9sYXBheS1wcm9kdWN0cy5zMy5hbWF6b25hd3MuY29tLzEvNS85LzE1OTYvdHJhbnNwYXJlbnRfMTY1MDQxNTU2NzkzNC5wbmciLCJodHRwczovL2xvbGFwYXktcHJvZHVjdHMuczMuYW1hem9uYXdzLmNvbS8xLzUvOS8xNTk2L3RyYW5zcGFyZW50XzE2NTA0MTU1Njg0MDMucG5nIl0sInR5cGUiOjB9

# Video5 - Sliding Gallery
http://localhost:3000/instagram-video/?video=5&query=eyJpZCI6MTU5NiwicHJvZHVjdE5hbWUiOiJTbGlkaW5nIEdhbGxlcnkiLCJwcmljZSI6IjI5OSIsInVzZXJuYW1lIjoiTG9sYVN0b3JlIiwicGhvdG9zIjpbImh0dHBzOi8vbG9sYXBheS1wcm9kdWN0cy5zMy5hbWF6b25hd3MuY29tLzEvNS85LzE1OTYvdHJhbnNwYXJlbnRfMTY1MDQxNTU2NzQ1My5wbmciLCJodHRwczovL2xvbGFwYXktcHJvZHVjdHMuczMuYW1hem9uYXdzLmNvbS8xLzUvOS8xNTk2L3RyYW5zcGFyZW50XzE2NTA0MTU1Njc5MzQucG5nIiwiaHR0cHM6Ly9sb2xhcGF5LXByb2R1Y3RzLnMzLmFtYXpvbmF3cy5jb20vMS81LzkvMTU5Ni90cmFuc3BhcmVudF8xNjUwNDE1NTY4NDAzLnBuZyJdLCJ0eXBlIjowfQ==
```

## How to use this starter

You can install and use it like any other remotion project.
`pnpm i`

Start Remotion studio:

`pnpm run start` or `pnpm start`

### Compare

I've introduced a new thing called Compare.

With this we can compare our video and the source video side by side in the studio.

It's a file where you'll have to change the staticFile to your video.

- create a .env file. have a look at .env.example
- use COMPARE='x' or COMPARE='y'
- You'll have to make the width or height in the Root.tsx file \* 2 to show both next to each other
- Put your video File in the public/examples folder
- Change the staticFile() in Compare.tsx to the name of your video

-> Adjust the timings of our video to fit the mp4