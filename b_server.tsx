/**
 * This is an example of a server that returns dynamic video.
 * Run `npm run server` to try it out!
 * If you don't want to render videos on a server, you can safely
 * delete this file.
 */
// @ts-nocheck
import './remotion.config.js';
import {bundle} from '@remotion/bundler';
import {
	getCompositions,
	renderFrames,
	stitchFramesToVideo,
} from '@remotion/renderer';
import express from 'express';
import fs from 'fs';
import os from 'os';
import path from 'path';
import {TCompMetadata} from "remotion";
import Utils from "./src/utils.js";

const app = express();
const port = process.env.PORT || 3000;

const cache = new Map<string, string>();
// const TYPE_PRODUCT = 'Product';
// const TYPE_CATALOGUE = 'Catalogue';

const TYPE_PRODUCT = 0;
const TYPE_SHOP = 1;

const TYPE_VIDEO = ['Video1', 'Video2', 'Video3']

const PHOTO_COUNT = 7;

class ServerRenderer {
	private bundled: string | undefined;
	private productVideo: TCompMetadata | undefined;
	private catalogueVideo: TCompMetadata | undefined;
	private folder: string;
	private compositions: TCompMetadata[];

	constructor() {
		this.folder = path.join(os.tmpdir(), 'remotion-tmp');
	}

	async setupFolder () {
		try {
			// remove remaining entries from previous run
			await fs.promises.rm(this.folder, {recursive: true});
		} catch (e) {}

		try {
			await fs.promises.mkdir(this.folder);
		} catch (e) {}
	}

	async setup () {
		console.log("["+ Utils.currentDate + "] Setting up remotion");
		await this.setupFolder();

		this.bundled = await bundle(path.join(__dirname, './src/index.tsx'));
		this.compositions = await getCompositions(this.bundled, {inputProps: {}});
	}

	getVideoFolder (videoType: string, id : int) {
		return path.join(this.folder, videoType + "_" + id);
	}

	addStyleProperties (props : any) {
		switch (props.style) {
			case 1:
				props.showAmazedGirl = false;
				props.showPrice = false;
				props.showPriceTag = false;
				props.showPriceTagPurple = true;
				break;
			case 2:
				props.showAmazedGirl = false;
				props.showPrice = true;
				props.showPriceTag = false;
				props.showPriceTagPurple = false;
				break;
		}
	}

	async generate (props : any, video : any) {
		console.log(props);

		if (props.type == TYPE_PRODUCT) {
			// UPDATE PHOTO COUNT
			if (props.photos.length < PHOTO_COUNT) {
				console.log("LESS THAN " + PHOTO_COUNT + "!!!!")
				let i = 0;
				for (i = 0; i < PHOTO_COUNT; i++) {
					if (props.photos.length < PHOTO_COUNT) {
						props.photos.push(props.photos[i])
					} else {
						break;
					}
				}
			}
			// Trimming the photos to PHOTO_COUNT
			if (props.photos.length > PHOTO_COUNT) {
				props.photos = props.photos.slice(0, PHOTO_COUNT);
			}
		} else if (props.type == TYPE_SHOP) {
			/* Props:
			{
				uid: 1,
				username: 'nor',
				products: [
					{ name: 'dsfsad', price: '231', photos: [Array] },
					{ name: 'outfit', price: '340', photos: [Array] },
					{ name: 'one', price: '400', photos: [Array] }
				],
				style: 1,
				fontFamily: 'Hussar Ekologiczne',
				type: 1
			} */
			// setup the photos by going through each product and adding the photos to the array. try to get at least 1 image from each product and if there are less than 7, repeat the images
			let photos = [];

			// Add the first photo of each product to the photos array
			props.products.forEach(product => {
					if (product.photos.length > 0) {
							photos.push(product.photos[0]);
					}
			});

			// If the number of photos is less than PHOTO_COUNT, repeat the photos
			while (photos.length < PHOTO_COUNT) {
					console.log(photos.length);
					photos.push(...photos.slice(0, PHOTO_COUNT - photos.length));
			}

			// If the number of photos exceeds PHOTO_COUNT, trim the array to 7
			if (photos.length > PHOTO_COUNT) {
					console.log(photos.length);
					photos = photos.slice(0, PHOTO_COUNT);
			}

			// Set the photos array back to props
			props.photos = photos;
		}
		

		console.log("PHOTOS: ", props.photos.length, props.photos.toString());
		console.log(video);

		// let compositionId = typeof props.uid === "undefined" ? TYPE_PRODUCT : TYPE_CATALOGUE;
		// let compositionId = typeof props.uid === "undefined" ? TYPE_VIDEO[video-1] : TYPE_VIDEO[2];

		// let compositionId = TYPE_VIDEO[1];
		let compositionId = TYPE_VIDEO[video-1];
		if (typeof props.uid === "undefined" && video) {
			compositionId = TYPE_VIDEO[video-1];
		}

		if (props.style > 1 ) {
			compositionId = "Style" + props.style;
		}
		const videoId = typeof props.uid === "undefined" ? props.id : props.uid;
		const videoFolder = this.getVideoFolder(compositionId, videoId);
		const composition = this.compositions.find((c) => c.id === compositionId);
		this.addStyleProperties(props);

		if (composition == null) {
			throw "["+ Utils.currentDate + "] Failed to find composition " + compositionId;
		}

		try {
			await fs.promises.mkdir(videoFolder);
		} catch (e) {}

		const {assetsInfo} = await renderFrames({
			composition: compositionId,
			width: 450, // Replace with your desired width
			height: 600,

			config: composition,
			webpackBundle: this.bundled,
			onStart: () => console.log('[' + Utils.currentDate + '] Rendering frames...'),
			onFrameUpdate: (f) => {
				if (f % 10 === 0) {
					console.log(`[` + Utils.currentDate + `] Rendered frame ${f}`);
				}
			},
			parallelism: null,
			outputDir: videoFolder,
			// inputProps: props,
			inputProps: {...props, images: props.photos},
			compositionId,
			imageFormat: 'jpeg',
		});

		const finalOutput = path.join(this.folder, videoId + '.mp4');
		await stitchFramesToVideo({
			dir: videoFolder,
			force: true,
			fps: composition.fps,
			height: composition.height,
			width: composition.width,
			outputLocation: finalOutput,
			imageFormat: 'jpeg',
			assetsInfo,
		});

		fs.promises.rm(videoFolder, {recursive: true}); // no need to wait

		return finalOutput;
	}

	// based on https://www.the-data-wrangler.com/video-streaming-in-safari/
	sendFile (req : Request, res : Response, filePath: string) {
		const options = {};

		let start;
		let end;

		const {range} = req.headers;
		if (range) {
			const bytesPrefix = "bytes=";
			if (range.startsWith(bytesPrefix)) {
				const bytesRange = range.substring(bytesPrefix.length);
				const parts = bytesRange.split("-");
				if (parts.length === 2) {
					const rangeStart = parts[0] && parts[0].trim();
					if (rangeStart && rangeStart.length > 0) {
						options.start = start = parseInt(rangeStart);
					}
					const rangeEnd = parts[1] && parts[1].trim();
					if (rangeEnd && rangeEnd.length > 0) {
						options.end = end = parseInt(rangeEnd);
					}
				}
			}
		}

		res.set("Content-disposition", "attachment; filename=video_lolapay.mp4");
		res.set('content-type', 'video/mp4');

		fs.stat(filePath, (err, stat) => {
			if (err) {
				console.error(`File stat error for ${filePath}.`);
				console.error(err);
				res.sendStatus(500);
				return;
			}

			const contentLength = stat.size;

			if (req.method === "HEAD") {
				res.statusCode = 200;
				res.setHeader("accept-ranges", "bytes");
				res.setHeader("content-length", contentLength);
				res.end();
			}
			else {
				let retrievedLength;
				if (start !== undefined && end !== undefined) {
					retrievedLength = (end+1) - start;
				}
				else if (start !== undefined) {
					retrievedLength = contentLength - start;
				}
				else if (end !== undefined) {
					retrievedLength = (end+1);
				}
				else {
					retrievedLength = contentLength;
				}

				res.statusCode = start !== undefined || end !== undefined ? 206 : 200;

				res.setHeader("content-length", retrievedLength);

				if (range !== undefined) {
					res.setHeader("content-range", `bytes ${start || 0}-${end || (contentLength-1)}/${contentLength}`);
					res.setHeader("accept-ranges", "bytes");
				}

				const fileStream = fs.createReadStream(filePath, options);
				fileStream.on("error", error => {
					console.log(`Error reading file ${filePath}.`);
					console.log(error);
					res.sendStatus(500);
				});

				fileStream.pipe(res)
					.on('close', async () => {
						res.end();

						// //Post without using axios
						// const options = {
						// 	method: 'POST',
						// 	headers: { 'content-type': 'application/json' },
						// 	data: JSON.stringify({ id: 28, status: 2 }),
						// 	// url: 'https://www.lolapay.com.localhost/api/lolavideo/update_status',
						// 	url: 'https://www.lolapay.com/api/lolavideo/update_status',
						// };
						// //call api with no axios
						// const https = require('https');
						// const req = https.request(options, (res) => {
						// 	console.log(res);
						// 	console.log(`statusCode: ${res.statusCode}`);

						// });

					});
			}
		});
	}
}

const serverRenderer = new ServerRenderer();

app.get('/instagram-video/', async (req, res) => {
	if (req.query.length < 1) {
		return;
	} else if (!req.query.query) {
		return res.status(400).send("No query provided");
	}

	req.query.query = decodeURIComponent(escape(req.query.query));
	let props = (Buffer.from(req.query.query, 'base64')).toString('utf-8');

	if (!props) {
		return;
	}

	props = JSON.parse(props);

	if (typeof props.uid === "undefined" && typeof props.id === "undefined") {
		console.log("["+ Utils.currentDate + "] Invalid request received", props);
		return;
	}

	console.log("["+ Utils.currentDate + "] Render request received", props);
	const startTime = new Date();

	try {
		if (cache.get(JSON.stringify(req.query))) {
			console.log("File available from cache");
			serverRenderer.sendFile(req, res, cache.get(JSON.stringify(req.query)) as string);
			return;
		}

		// const finalOutput = await serverRenderer.generate(props);
		const finalOutput = await serverRenderer.generate(props, req.query.video);
		cache.set(JSON.stringify(req.query), finalOutput);
		serverRenderer.sendFile(req, res, finalOutput);
		// @ts-ignore
		console.log('['+ Utils.currentDate + '] Video renderer took ' + Math.round((new Date() - startTime) / 1000) + " seconds");
	} catch (err) {
		console.error(err);
		res.json({
			error: err,
		});
	}
});

serverRenderer.setup().then(() => {
	app.listen(port);

	console.log(
		[
			`[`+ Utils.currentDate + `] The server has started on http://localhost:${port}!`,
			'You can render a video by passing props as URL parameters.',
			'',
			'If you are running Hello World, try this:',
			'',
			`http://localhost:${port}/instagram-video/?id=44&username=yordi&showPriceTag=true`,
			'',
			'This: ',
			`http://localhost:3000/instagram-video/?video=3&query=eyJpZCI6MTU5NiwicHJvZHVjdE5hbWUiOiJWZXN0aWRvIHRpcG8gYW50ZSBjb24gYWd1amV0YXMgeSBib2xzYXMiLCJwcmljZSI6IjE4MCIsInVzZXJuYW1lIjoiaHlwZXRoZWNsb3NldCIsInBob3RvcyI6WyJodHRwczovL2xvbGFwYXktcHJvZHVjdHMuczMuYW1hem9uYXdzLmNvbS8xLzUvOS8xNTk2L3RyYW5zcGFyZW50XzE2NTA0MTU1Njc0NTMucG5nIiwiaHR0cHM6Ly9sb2xhcGF5LXByb2R1Y3RzLnMzLmFtYXpvbmF3cy5jb20vMS81LzkvMTU5Ni90cmFuc3BhcmVudF8xNjUwNDE1NTY3OTM0LnBuZyIsImh0dHBzOi8vbG9sYXBheS1wcm9kdWN0cy5zMy5hbWF6b25hd3MuY29tLzEvNS85LzE1OTYvdHJhbnNwYXJlbnRfMTY1MDQxNTU2ODQwMy5wbmciXSwic3R5bGUiOjEsImZvbnRGYW1pbHkiOiJIdXNzYXIgRWtvbG9naWN6bmUifQ%3D%3D`,
			// `http://localhost:3000/instagram-video/?video=3&query=eyJ1aWQiOjYzNjQwLCJ1c2VybmFtZSI6InRyaWFuZ3Vsb3N0dWRpb214IiwicHJvZHVjdHMiOlt7ImlkIjoyMjI4MTYsIm5hbWUiOiJTdGlja2VycyBwYXJhIHUgYXMgZGUgdGVybnVyaW5lcyAgMiBwbGFuaWxsYXMgIiwicHJpY2UiOiI5MCIsInBob3RvcyI6WyJodHRwczovL2xvbGFwYXktcHJvZHVjdHMuczMuYW1hem9uYXdzLmNvbS8yLzIvMi8yMjIxMjkvbWVkaXVtXzE3MjE0MTY1MTU4MjMucG5nIiwgImh0dHBzOi8vbG9sYXBheS1wcm9kdWN0cy5zMy5hbWF6b25hd3MuY29tLzIvMi8yLzIyMjEyOS9tZWRpdW1fMTcyMTQxNjUxNjUxMy5wbmciLCAiaHR0cHM6Ly9sb2xhcGF5LXByb2R1Y3RzLnMzLmFtYXpvbmF3cy5jb20vMi8yLzAvMjIwMzI4L21lZGl1bV8xNzIwNTQ3OTA0NTczLnBuZyIsICJodHRwczovL2xvbGFwYXktcHJvZHVjdHMuczMuYW1hem9uYXdzLmNvbS8yLzIvMC8yMjAzMjgvbWVkaXVtXzE3MjA1NDc5MDUzNTQucG5nIiwgImh0dHBzOi8vbG9sYXBheS1wcm9kdWN0cy5zMy5hbWF6b25hd3MuY29tLzIvMi8wLzIyMDMyNy9tZWRpdW1fMTcyMDU0NzgzMDgyNi5wbmciLCAiaHR0cHM6Ly9sb2xhcGF5LXByb2R1Y3RzLnMzLmFtYXpvbmF3cy5jb20vMi8yLzAvMjIwMzI3L21lZGl1bV8xNzIwNTQ3ODMxNTE0LnBuZyIsICJodHRwczovL2xvbGFwYXktcHJvZHVjdHMuczMuYW1hem9uYXdzLmNvbS8yLzIvMC8yMjAzMjYvbWVkaXVtXzE3MjA1NDc3NTQ5MjEucG5nIl19`
			'',
		].join('\n')
	);
});
