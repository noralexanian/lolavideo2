class Utils {
    static get currentDate() {
        const d = new Date();
        return d.getFullYear() + "-" +
            ("00" + (d.getMonth() + 1)).slice(-2) + "-" +
            ("00" + d.getDate()).slice(-2) + " " +
            ("00" + d.getHours()).slice(-2) + ":" +
            ("00" + d.getMinutes()).slice(-2) + ":" +
            ("00" + d.getSeconds()).slice(-2);
    }

    // default logo from file in public folder
    static get defaultLogo() {
        return `${process.env.BASE_URL || 'http://localhost:3000'}/public/logo.png`;
    }

    // default images from file in public folder
    static get defaultImages() {
        return [
			'https://lolapay-products.s3.amazonaws.com/5/1/2/51251/medium_1665973627532.jpg', // Example default image
			'https://lolapay-products.s3.amazonaws.com/5/1/2/51251/medium_1665973628038.jpg', // Example default image
			'https://lolapay-products.s3.amazonaws.com/5/1/2/51251/medium_1665973629235.jpg', // Example default image
			'https://lolapay-products.s3.amazonaws.com/5/1/2/51251/medium_1665973630087.jpg',
			'https://lolapay-products.s3.amazonaws.com/5/1/2/51251/medium_1665973630640.jpg',
			'https://lolapay-products.s3.amazonaws.com/5/1/2/51251/medium_1665973631200.jpg',
			// 'https://lolapay-products.s3.amazonaws.com/5/1/2/51251/medium_1665973627532.jpg',
			// 'https://lolapay-products.s3.amazonaws.com/5/1/2/51251/medium_1665973631200.jpg',

			// "https://lolapay-products.s3.amazonaws.com/2/2/2/222816/medium_1721870368145.png",
			// "https://lolapay-products.s3.amazonaws.com/2/2/2/222816/medium_1721870367176.jpeg",
			// "https://lolapay-products.s3.amazonaws.com/2/2/2/222816/medium_1721870367647.jpeg",
			"https://lolapay-products.s3.amazonaws.com/2/2/2/222129/medium_1721416515823.png",
			"https://lolapay-products.s3.amazonaws.com/2/2/2/222129/medium_1721416516513.png",
			"https://lolapay-products.s3.amazonaws.com/2/2/0/220328/medium_1720547904573.png",
			"https://lolapay-products.s3.amazonaws.com/2/2/0/220328/medium_1720547905354.png",
			"https://lolapay-products.s3.amazonaws.com/2/2/0/220327/medium_1720547830826.png",
			"https://lolapay-products.s3.amazonaws.com/2/2/0/220327/medium_1720547831514.png",
			"https://lolapay-products.s3.amazonaws.com/2/2/0/220326/medium_1720547754921.png",
			"https://lolapay-products.s3.amazonaws.com/2/2/0/220326/medium_1720547755586.png",
			// "https://lolapay-products.s3.amazonaws.com/2/1/7/217842/medium_1719508972441.png",
			// "https://lolapay-products.s3.amazonaws.com/2/1/7/217842/medium_1719508973304.png"
		];
    }
}

module.exports = Utils;