# Remotion template for the video

## Naming scheme

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
