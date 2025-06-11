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

import { MainSchema } from './src/Composition/Composition';
import { getAllTemplateIds } from './src/templates';
import { Video4Schema } from './src/Video4Schema';
import { Video5Schema } from './src/Video5Schema';
import { Video6Schema } from './src/Video6Schema';
import { Video7Schema } from './src/Video7Schema';

const app = express();
const port = process.env.PORT || 3000;

const cache = new Map<string, string>();
const TYPE_PRODUCT = 0;
const TYPE_SHOP = 1;

// Get available template IDs dynamically
const TYPE_VIDEO = [...getAllTemplateIds(), 'Compare'];

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
		
			this.compositions.forEach((comp) => {
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
		console.log("Original Props:", props);

		let isProduct = false;
		let inputPropsForSchema: any;
		let validInputProps: any;

		// Check if this is Video4, Video5, Video6, or Video7 template
		if (video === 'Video4' || video === 'Video5' || video === 'Video6' || video === 'Video7') {
			// Prepare photos array for templates
			if (!props.photos) {
				props.photos = [];
			}
			
			// Determine min required photos based on template
			let minRequiredPhotos;
			if (video === 'Video5') {
				minRequiredPhotos = 11;
			} else if (video === 'Video6') {
				minRequiredPhotos = 7; // Video6 needs exactly 7 images
			} else if (video === 'Video7') {
				minRequiredPhotos = 6; // Video7 needs exactly 6 images
			} else { // Video4
				minRequiredPhotos = 8;
			}
			
			// Ensure we have enough photos
			if (props.photos.length < minRequiredPhotos) {
				console.log(`Less than ${minRequiredPhotos} photos for ${video}. Adding more...`);
				let i = 0;
				while (props.photos.length < minRequiredPhotos) {
					props.photos.push(props.photos[i % Math.max(1, props.photos.length)]);
					i++;
				}
			}

			// For Video6, trim to exactly 7 images if there are more
			if (video === 'Video6' && props.photos.length > 7) {
				props.photos = props.photos.slice(0, 7);
			}

			// For Video7, trim to exactly 6 images if there are more
			if (video === 'Video7' && props.photos.length > 6) {
				props.photos = props.photos.slice(0, 6);
			}

			// Set up template-specific props
			// inputPropsForSchema = {
			// 	images: props.photos || [],
			// 	username: props.username || 'Default Store',
			// 	productName: props.productName || 'Product',
			// 	price: props.price ? props.price.toString() : '199',
			// 	type: props.type || TYPE_PRODUCT,
			// };

			// Set up template-specific props
			// if products is greater than 1, do not display product name or price
			if (props.type == TYPE_SHOP && props.products.length > 1) {
				inputPropsForSchema = {
					images: props.photos || [],
					username: props.username || 'Default Store',
					productName: '',
					price: '',
					type: props.type || TYPE_PRODUCT,
				};
			} else {
				inputPropsForSchema = {
					images: props.photos || [],
					username: props.username || 'Default Store',
					productName: props.productName || 'Product',
					price: props.price ? props.price.toString() : '199',
					type: props.type || TYPE_PRODUCT,
				};
			}

			// Validate props against appropriate schema
			let validationResult;
			if (video === 'Video4') {
				validationResult = Video4Schema.safeParse(inputPropsForSchema);
				if (!validationResult.success) {
					console.error("Props validation failed for Video4:", validationResult.error.errors);
					throw new Error("Input props do not match schema for Video4");
				}
			} else if (video === 'Video5') {
				validationResult = Video5Schema.safeParse(inputPropsForSchema);
				if (!validationResult.success) {
					console.error("Props validation failed for Video5:", validationResult.error.errors);
					throw new Error("Input props do not match schema for Video5");
				}
			} else if (video === 'Video6') {
				validationResult = Video6Schema.safeParse(inputPropsForSchema);
				if (!validationResult.success) {
					console.error("Props validation failed for Video6:", validationResult.error.errors);
					throw new Error("Input props do not match schema for Video6");
				}
			} else { // Video7
				validationResult = Video7Schema.safeParse(inputPropsForSchema);
				if (!validationResult.success) {
					console.error("Props validation failed for Video7:", validationResult.error.errors);
					throw new Error("Input props do not match schema for Video7");
				}
			}
			
			validInputProps = inputPropsForSchema;
		} else {
			// Handle Video1, Video2, Video3 templates
			if (props.type == TYPE_PRODUCT) {
				isProduct = false;
				props.price = parseFloat(props.price);

				// Update photos for TYPE_PRODUCT
				if (props.photos && props.photos.length < PHOTO_COUNT) {
					console.log(`Less than ${PHOTO_COUNT} photos for PRODUCT. Adding more...`);
					let i = 0;
					for (i = 0; i < PHOTO_COUNT; i++) {
						if (props.photos.length < PHOTO_COUNT) {
							props.photos.push(props.photos[i % props.photos.length]);
						} else {
							break;
						}
					}
				}

				// Trimming photos to PHOTO_COUNT
				if (props.photos && props.photos.length > PHOTO_COUNT) {
					props.photos = props.photos.slice(0, PHOTO_COUNT);
				}
			} else if (props.type == TYPE_SHOP) {
				isProduct = true;

				// Setup photos by getting at least one photo per product
				let photos: string[] = [];

				// Add the first photo of each product to the photos array
				if (props.products) {
					props.products.forEach(product => {
						if (product.photos && product.photos.length > 0) {
							photos.push(product.photos[0]);
						}
					});
				}

				// If the number of photos is less than PHOTO_COUNT, repeat the photos
				while (photos.length < PHOTO_COUNT) {
					console.log(`Less than ${PHOTO_COUNT} photos for SHOP. Adding more...`);
					photos.push(...photos.slice(0, Math.min(PHOTO_COUNT - photos.length, photos.length || 1)));
				}

				// Trimming photos to PHOTO_COUNT
				if (photos.length > PHOTO_COUNT) {
					photos = photos.slice(0, PHOTO_COUNT);
				}

				// Set the photos array back to props
				props.photos = photos;
			}

			// Handle case where no photos are provided
			if (!props.photos || props.photos.length === 0) {
				props.photos = [
					'https://lolapay-products.s3.amazonaws.com/2/2/2/222129/medium_1721416515823.png',
					'https://lolapay-products.s3.amazonaws.com/2/2/2/222129/medium_1721416516513.png',
					'https://lolapay-products.s3.amazonaws.com/2/2/0/220328/medium_1720547904573.png'
				];
				
				// Duplicate photos to reach PHOTO_COUNT
				while (props.photos.length < PHOTO_COUNT) {
					props.photos.push(props.photos[props.photos.length % 3]);
				}
			}

			// Transform props to match schema for Video1, Video2, Video3
			inputPropsForSchema = {
				theme: 'Purple',
				background: {
					type: 'static',
					background: 'white',
				},
				fonts: {
					primary: props.fontFamily || 'ArchivoBlack',
					secondary: 'Antonio',
				},
				scene1Duration: 123,
				scene1Props: {
					logo: './public/logo.png',
					title: props.username || 'Default Title',
					images: props.photos || [],
				},
				scene2Duration: 165,
				scene2Props: {
					logo: './public/logo2.png',
					images: props.photos || [],
					title: props.username || 'Default Title',
				},
				scene3Duration: 42,
				scene3Props: {
					logo: './public/logo2.png',
					img: props.photos?.[0] || 'https://your-domain.com/default.png',
					title: props.username || 'Default Title',
					text: 'Disponible en',
				},
				scene4Duration: 120,
				scene4Props: {
					storeName: props.username || 'Test Store',
					productName: props.productName || 'Product',
					price: props.price || 189,
					title: props.username || 'HYPETHECLOSES',
					logo: './public/logo2.png',
					isProduct: isProduct,
				},
			};

			console.log("Input Props for Schema:", inputPropsForSchema);
			console.log("Main Schema Definition:", MainSchema.shape);

			// Validate props against schema
			const validationResult = MainSchema.safeParse(inputPropsForSchema);
			if (!validationResult.success) {
				console.error("Props validation failed:", validationResult.error.errors);
				throw new Error("Input props do not match schema");
			}
			
			validInputProps = validationResult.data;
		}

		const compositionId = video;
		const videoId = typeof props.uid === "undefined" ? props.id : props.uid;
		const videoFolder = this.getVideoFolder(compositionId, videoId);
		const composition = this.compositions.find((c) => c.id === compositionId);

		if (composition == null) {
			throw new Error(`[${Utils.currentDate}] Failed to find composition ${compositionId}`);
		}

		const { width, height, fps, durationInFrames } = composition;
		console.log("Composition:", composition, "Width:", width, "Height:", height, "FPS:", fps, "Duration in Frames:", durationInFrames);

		if (typeof width !== 'number' || typeof height !== 'number') {
			throw new Error(`[${Utils.currentDate}] Composition ${compositionId} is missing width or height.`);
		}

		try {
			await fs.promises.mkdir(videoFolder);
		} catch (e) {
			console.error(`Error creating folder ${videoFolder}:`, e);
		}

		const { assetsInfo } = await renderFrames({
			composition,
			serveUrl: this.bundled,
			inputProps: validInputProps,
			outputDir: videoFolder,
			imageFormat: 'jpeg',
		});

		const finalOutput = path.join(this.folder, `${videoId}.mp4`);

		await stitchFramesToVideo({
			dir: videoFolder,
			fps: composition.fps,
			height: composition.height,
			width: composition.width,
			outputLocation: finalOutput,
			imageFormat: 'jpeg',
			assetsInfo,
			serveUrl: this.bundled,
		});

		fs.promises.rm(videoFolder, { recursive: true });

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

	// console.log(`[${Utils.currentDate}] Render request received`, props);
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
		videoType = 'Video3'; // Example default
		}

		// Create a cache key that includes both the props AND the videoType explicitly
		// This ensures that same props with different templates don't collide in cache
		const cacheKey = JSON.stringify({ propsDigest: JSON.stringify(props), videoType });
		console.log(`Using cache key with videoType: ${videoType}`);

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
			'Examples for different templates:',
			`http://localhost:${port}/instagram-video/?video=3&query=eyJpZCI6MTU5NiwicHJvZHVjdE5hbWUiOiJWZXN0aWRvIHRpcG8gYW50ZSBjb24gYWd1amV0YXMgeSBib2xzYXMiLCJwcmljZSI6IjE4MCIsInVzZXJuYW1lIjoiaHlwZXRoZWNsb3NldCIsInBob3RvcyI6WyJodHRwczovL2xvbGFwYXktcHJvZHVjdHMuczMuYW1hem9uYXdzLmNvbS8xLzUvOS8xNTk2L3RyYW5zcGFyZW50XzE2NTA0MTU1Njc0NTMucG5nIiwiaHR0cHM6Ly9sb2xhcGF5LXByb2R1Y3RzLnMzLmFtYXpvbmF3cy5jb20vMS81LzkvMTU5Ni90cmFuc3BhcmVudF8xNjUwNDE1NTY3OTM0LnBuZyIsImh0dHBzOi8vbG9sYXBheS1wcm9kdWN0cy5zMy5hbWF6b25hd3MuY29tLzEvNS85LzE1OTYvdHJhbnNwYXJlbnRfMTY1MDQxNTU2ODQwMy5wbmciXSwic3R5bGUiOjEsImZvbnRGYW1pbHkiOiJIdXNzYXIgRWtvbG9naWN6bmUifQ%3D%3D`,
			'',
			`http://localhost:${port}/instagram-video/?video=4&query=eyJpZCI6MTU5NiwicHJvZHVjdE5hbWUiOiJQcm9kdWN0byBlaGplbXBsbyIsInByaWNlIjoiMTk5IiwidXNlcm5hbWUiOiJMb2xhU3RvcmUiLCJwaG90b3MiOlsiaHR0cHM6Ly9sb2xhcGF5LXByb2R1Y3RzLnMzLmFtYXpvbmF3cy5jb20vMS81LzkvMTU5Ni90cmFuc3BhcmVudF8xNjUwNDE1NTY3NDUzLnBuZyIsImh0dHBzOi8vbG9sYXBheS1wcm9kdWN0cy5zMy5hbWF6b25hd3MuY29tLzEvNS85LzE1OTYvdHJhbnNwYXJlbnRfMTY1MDQxNTU2NzkzNC5wbmciLCJodHRwczovL2xvbGFwYXktcHJvZHVjdHMuczMuYW1hem9uYXdzLmNvbS8xLzUvOS8xNTk2L3RyYW5zcGFyZW50XzE2NTA0MTU1Njg0MDMucG5nIl0sInR5cGUiOjB9`,
			'',
			`http://localhost:${port}/instagram-video/?video=5&query=eyJpZCI6MTU5NiwicHJvZHVjdE5hbWUiOiJTbGlkaW5nIEdhbGxlcnkiLCJwcmljZSI6IjI5OSIsInVzZXJuYW1lIjoiTG9sYVN0b3JlIiwicGhvdG9zIjpbImh0dHBzOi8vbG9sYXBheS1wcm9kdWN0cy5zMy5hbWF6b25hd3MuY29tLzEvNS85LzE1OTYvdHJhbnNwYXJlbnRfMTY1MDQxNTU2NzQ1My5wbmciLCJodHRwczovL2xvbGFwYXktcHJvZHVjdHMuczMuYW1hem9uYXdzLmNvbS8xLzUvOS8xNTk2L3RyYW5zcGFyZW50XzE2NTA0MTU1Njc5MzQucG5nIiwiaHR0cHM6Ly9sb2xhcGF5LXByb2R1Y3RzLnMzLmFtYXpvbmF3cy5jb20vMS81LzkvMTU5Ni90cmFuc3BhcmVudF8xNjUwNDE1NTY4NDAzLnBuZyJdLCJ0eXBlIjowfQ==`,
			'',
					`http://localhost:${port}/instagram-video/?video=6&query=eyJpZCI6MTU5NiwicHJvZHVjdE5hbWUiOiJQb3AtdXAgR2FsbGVyeSIsInByaWNlIjoiMzk5IiwidXNlcm5hbWUiOiJMb2xhU3RvcmUiLCJwaG90b3MiOlsiaHR0cHM6Ly9sb2xhcGF5LXByb2R1Y3RzLnMzLmFtYXpvbmF3cy5jb20vMi8yLzIvMjIyMTI5L21lZGl1bV8xNzIxNDE2NTE1ODIzLnBuZyIsImh0dHBzOi8vbG9sYXBheS1wcm9kdWN0cy5zMy5hbWF6b25hd3MuY29tLzIvMi8yLzIyMjEyOS9tZWRpdW1fMTcyMTQxNjUxNjUxMy5wbmciLCJodHRwczovL2xvbGFwYXktcHJvZHVjdHMuczMuYW1hem9uYXdzLmNvbS8yLzIvMC8yMjAzMjgvbWVkaXVtXzE3MjA1NDc5MDQ1NzMucG5nIiwiaHR0cHM6Ly9sb2xhcGF5LXByb2R1Y3RzLnMzLmFtYXpvbmF3cy5jb20vMi8yLzAvMjIwMzI4L21lZGl1bV8xNzIwNTQ3OTA1MzU0LnBuZyIsImh0dHBzOi8vbG9sYXBheS1wcm9kdWN0cy5zMy5hbWF6b25hd3MuY29tLzIvMi8wLzIyMDMyNy9tZWRpdW1fMTcyMDU0NzgzMDgyNi5wbmciLCJodHRwczovL2xvbGFwYXktcHJvZHVjdHMuczMuYW1hem9uYXdzLmNvbS8yLzIvMC8yMjAzMjcvbWVkaXVtXzE3MjA1NDc4MzE1MTQucG5nIiwiaHR0cHM6Ly9sb2xhcGF5LXByb2R1Y3RzLnMzLmFtYXpvbmF3cy5jb20vMi8yLzAvMjIwMzI2L21lZGl1bV8xNzIwNTQ3NzU0OTIxLnBuZyJdLCJ0eXBlIjowfQ==`,
		'',
		`http://localhost:${port}/instagram-video/?video=7&query=eyJpZCI6MTU5NiwicHJvZHVjdE5hbWUiOiJNb3JwaGluZyBHYWxsZXJ5IiwicHJpY2UiOiIxOTkiLCJ1c2VybmFtZSI6IkxvbGFTdG9yZSIsInBob3RvcyI6WyJodHRwczovL2xvbGFwYXktcHJvZHVjdHMuczMuYW1hem9uYXdzLmNvbS8yLzIvMi8yMjIxMjkvbWVkaXVtXzE3MjE0MTY1MTU4MjMucG5nIiwiaHR0cHM6Ly9sb2xhcGF5LXByb2R1Y3RzLnMzLmFtYXpvbmF3cy5jb20vMi8yLzIvMjIyMTI5L21lZGl1bV8xNzIxNDE2NTE2NTEzLnBuZyIsImh0dHBzOi8vbG9sYXBheS1wcm9kdWN0cy5zMy5hbWF6b25hd3MuY29tLzIvMi8wLzIyMDMyOC9tZWRpdW1fMTcyMDU0NzkwNDU3My5wbmciLCJodHRwczovL2xvbGFwYXktcHJvZHVjdHMuczMuYW1hem9uYXdzLmNvbS8yLzIvMC8yMjAzMjgvbWVkaXVtXzE3MjA1NDc5MDUzNTQucG5nIiwiaHR0cHM6Ly9sb2xhcGF5LXByb2R1Y3RzLnMzLmFtYXpvbmF3cy5jb20vMi8yLzAvMjIwMzI3L21lZGl1bV8xNzIwNTQ3ODMwODI2LnBuZyIsImh0dHBzOi8vbG9sYXBheS1wcm9kdWN0cy5zMy5hbWF6b25hd3MuY29tLzIvMi8wLzIyMDMyNy9tZWRpdW1fMTcyMDU0NzgzMTUxNC5wbmciXSwidHlwZSI6MH0%3D`,
		'',
		].join('\n')
	);
});