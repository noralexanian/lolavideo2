import { continueRender, delayRender, staticFile } from "remotion";

const waitForFont = delayRender();

const fonts = [
    {
        name: `Dela Gothic One`,
        file: "DelaGothicOne-Regular.ttf",
    },
    {
        name: `Hussar Ekologiczne`,
        file: "HussarEkologiczne.otf",
    },
    {
        name: `Joliet Regular`,
        file: "joliet-regular.otf",
    },
    {
        name: `Playlist Script`,
        file: "playlist-script.otf",
    },
    {
        name: `Thicker Inline`,
        file: "thicker-inline-italic.otf",
    }
];

const promises: Promise<FontFace>[] = [];

fonts.forEach(font => {
    promises.push(new FontFace(
        font.name,
     `url(${staticFile(font.file)}) format('truetype')`
    ).load());
});

Promise.all(promises)
    .then((fonts) => {
        fonts.forEach(font => {
            document.fonts.add(font);
        });

        continueRender(waitForFont);
    })
    .catch((err) => console.log("Error loading font", err));