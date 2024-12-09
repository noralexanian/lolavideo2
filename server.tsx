/**
 * This is an example of a server that returns dynamic video.
 * Run `npm run server` to try it out!
 * If you don't want to render videos on a server, you can safely
 * delete this file.
 */
// @ts-nocheck
import './remotion.config.ts';
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
const TYPE_PRODUCT = 0;
const TYPE_SHOP = 1;

// const TYPE_VIDEO = ['Video1', 'Video2', 'Video3']
const TYPE_VIDEO = ['Video1', 'Video2', 'Template', 'Compare'];

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

	async setup() {
		console.log("[" + Utils.currentDate + "] Setting up remotion");
		await this.setupFolder();
	
		this.bundled = await bundle(path.join(__dirname, './src/index.tsx'));
		this.compositions = await getCompositions(this.bundled, { inputProps: {} });
	
		// Log all available compositions with their dimensions
		console.log(`[${Utils.currentDate}] Available compositions:`);
		this.compositions.forEach((comp) => {
		console.log(`- ID: ${comp.id}, Width: ${comp.width}, Height: ${comp.height}`);
		});
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

	async generate(props: any, video: any) {
		console.log("Props:", props);
		
		if (props.type == TYPE_PRODUCT) {
			// Existing logic for TYPE_PRODUCT
			if (props.photos.length < PHOTO_COUNT) {
			console.log("LESS THAN " + PHOTO_COUNT + "!!!!");
			for (let i = 0; i < PHOTO_COUNT; i++) {
				if (props.photos.length < PHOTO_COUNT) {
				props.photos.push(props.photos[i]);
				} else {
				break;
				}
			}
			}
			if (props.photos.length > PHOTO_COUNT) {
			props.photos = props.photos.slice(0, PHOTO_COUNT);
			}
		} else if (props.type == TYPE_SHOP) {
			// Existing logic for TYPE_SHOP
			let photos = [];
		
			props.products.forEach(product => {
			if (product.photos.length > 0) {
				photos.push(product.photos[0]);
			}
			});
		
			while (photos.length < PHOTO_COUNT) {
			console.log("Current photo count:", photos.length);
			photos.push(...photos.slice(0, PHOTO_COUNT - photos.length));
			}
		
			if (photos.length > PHOTO_COUNT) {
			photos = photos.slice(0, PHOTO_COUNT);
			}
		
			props.photos = photos;
		}
		
		console.log("PHOTOS:", props.photos.length, props.photos.toString());
		console.log("Video Type:", video);
		
		// Determine the compositionId based on the video parameter and props
		// let compositionId = TYPE_VIDEO[video - 1];
		// if (typeof props.uid === "undefined" && video) {
		// 	compositionId = TYPE_VIDEO[video - 1];
		// }
		
		// if (props.style > 1) {
		// 	compositionId = "Style" + props.style;
		// }
		let compositionId = video;
		
		const videoId = typeof props.uid === "undefined" ? props.id : props.uid;
		const videoFolder = this.getVideoFolder(compositionId, videoId);
		const composition = this.compositions.find((c) => c.id === compositionId);
		this.addStyleProperties(props);
		
		if (composition == null) {
			throw new Error(`[${Utils.currentDate}] Failed to find composition ${compositionId}`);
		}
		
		// Log composition details for debugging
		console.log(`[${Utils.currentDate}] Selected Composition:`, composition);
		
		const { width, height, fps, durationInFrames } = composition;
		
		// Validate width and height
		if (typeof width !== 'number' || typeof height !== 'number') {
			throw new Error(`[${Utils.currentDate}] Composition ${compositionId} is missing width or height.`);
		}
		
		try {
			await fs.promises.mkdir(videoFolder);
		} catch (e) {
			// Handle error if needed
			console.error(`Error creating folder ${videoFolder}:`, e);
		}
		
		// const { assetsInfo } = await renderFrames({
		// 	composition: compositionId,
		// 	width: 300, // Dynamically set width
		// 	height: 300, // Dynamically set height
		// 	webpackBundle: this.bundled,
		// 	onStart: () => console.log(`[${Utils.currentDate}] Rendering frames...`),
		// 	onFrameUpdate: (f) => {
		// 	if (f % 10 === 0) {
		// 		console.log(`[${Utils.currentDate}] Rendered frame ${f}`);
		// 	}
		// 	},
		// 	parallelism: null,
		// 	outputDir: videoFolder,
		// 	inputProps: { ...props, images: props.photos },
		// 	imageFormat: 'jpeg',
		// });

		// const { assetsInfo } = await renderFrames({
		// 	composition: composition,
		// 	webpackBundle: this.bundled,
		// 	onStart: () => console.log(`[${Utils.currentDate}] Rendering frames...`),
		// 	onFrameUpdate: (f) => {
		// 		if (f % 10 === 0) {
		// 		console.log(`[${Utils.currentDate}] Rendered frame ${f}`);
		// 		}
		// 	},
		// 	parallelism: null,
		// 	outputDir: videoFolder,
		// 	inputProps: { ...props, images: props.photos },
		// 	imageFormat: 'jpeg',
		// });
		  
		const { assetsInfo } = await renderFrames({
			composition,
			serveUrl: this.bundled, // New syntax
			inputProps: { ...props },
			outputDir: videoFolder,
			imageFormat: 'jpeg',
		});
		  
		
		const finalOutput = path.join(this.folder, `${videoId}.mp4`);
		// await stitchFramesToVideo({
		// 	dir: videoFolder,
		// 	force: true,
		// 	fps: composition.fps,
		// 	height: composition.height,
		// 	width: composition.width,
		// 	outputLocation: finalOutput,
		// 	imageFormat: 'jpeg',
		// 	assetsInfo,
		// });

		await stitchFramesToVideo({
			dir: videoFolder,
			fps: composition.fps,
			height: composition.height,
			width: composition.width,
			outputLocation: finalOutput,
			imageFormat: 'jpeg',
			assetsInfo,
			serveUrl: this.bundled, // use serveUrl here too
		});
		  
		
		fs.promises.rm(videoFolder, { recursive: true }); // Clean up
		
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
					});
			}
		});
	}
}

const serverRenderer = new ServerRenderer();

app.get('/instagram-video/', async (req, res) => {
	if (Object.keys(req.query).length < 1) {
		return res.status(400).send("No query parameters provided");
	} else if (!req.query.query) {
		return res.status(400).send("No query provided");
	}

	// Decode and parse the query
	let props;
	try {
		const decodedQuery = decodeURIComponent(req.query.query);
		props = JSON.parse(Buffer.from(decodedQuery, 'base64').toString('utf-8'));
	} catch (error) {
		console.error(`[${Utils.currentDate}] Failed to parse query`, error);
		return res.status(400).send("Invalid query format");
	}

	if (!props || (typeof props.uid === "undefined" && typeof props.id === "undefined")) {
		console.log(`[${Utils.currentDate}] Invalid request received`, props);
		return res.status(400).send("Invalid props provided");
	}

	console.log(`[${Utils.currentDate}] Render request received`, props);
	const startTime = new Date();

	try {
		const videoParam = req.query.video;
		let videoType = null;

		if (videoParam) {
		const videoIndex = parseInt(videoParam, 10);
		if (isNaN(videoIndex) || videoIndex < 1 || videoIndex > TYPE_VIDEO.length) {
			return res.status(400).send(`Invalid video parameter. Must be an integer between 1 and ${TYPE_VIDEO.length}.`);
		}
		videoType = TYPE_VIDEO[videoIndex - 1];
		} else {
		// Optionally, set a default video type if 'video' parameter is missing
		videoType = 'Template'; // Example default
		}

		const cacheKey = JSON.stringify({ ...req.query, videoType });

		if (cache.has(cacheKey)) {
		console.log("File available from cache");
		serverRenderer.sendFile(req, res, cache.get(cacheKey));
		return;
		}

		// Generate the video
		const finalOutput = await serverRenderer.generate(props, videoType);
		cache.set(cacheKey, finalOutput);
		serverRenderer.sendFile(req, res, finalOutput);

		console.log(`[${Utils.currentDate}] Video renderer took ${Math.round((new Date() - startTime) / 1000)} seconds`);
	} catch (err) {
		console.error(err);
		res.status(500).json({
		error: err.message || "An error occurred during video rendering",
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
			'',
		].join('\n')
	);
});
