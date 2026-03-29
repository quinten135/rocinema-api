import Jimp from 'jimp';

export default async function handler(req, res) {
    const url = req.query.url || 'https://picsum.photos/1920/1080';
    const w = parseInt(req.query.w) || 1920;
    const h = parseInt(req.query.h) || 1080;
    const chunkY = parseInt(req.query.chunkY) || 0;
    const chunkH = parseInt(req.query.chunkH) || 108; // 10 chunks van 108 rijen

    const image = await Jimp.read(url);
    image.resize(w, h);

    const pixels = [];
    image.scan(0, chunkY, w, chunkH, function(x, y, idx) {
        pixels.push(this.bitmap.data[idx] / 255)
        pixels.push(this.bitmap.data[idx+1] / 255)
        pixels.push(this.bitmap.data[idx+2] / 255)
    });

    res.json({ pixels, w, chunkY, chunkH });
}
