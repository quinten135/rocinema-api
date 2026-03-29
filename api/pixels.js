import Jimp from 'jimp';

export default async function handler(req, res) {
    const url = req.query.url || 'https://picsum.photos/854/480';
    const w = parseInt(req.query.w) || 854;
    const h = parseInt(req.query.h) || 480;
    const chunkY = parseInt(req.query.chunkY) || 0;
    const chunkH = parseInt(req.query.chunkH) || 48;

    const image = await Jimp.read(url);
    image.resize(w, h);

    const pixels = [];
    image.scan(0, chunkY, w, chunkH, function(x, y, idx) {
        pixels.push(this.bitmap.data[idx] / 255)
        pixels.push(this.bitmap.data[idx+1] / 255)
        pixels.push(this.bitmap.data[idx+2] / 255)
        pixels.push(this.bitmap.data[idx+3] / 255) // alpha ook mee voor EditableImage
    });

    res.json({ pixels, w, h, chunkY, chunkH });
}
