import Jimp from 'jimp';

export default async function handler(req, res) {
    const url = req.query.url || 'https://picsum.photos/64/36';
    const w = parseInt(req.query.w) || 64;
    const h = parseInt(req.query.h) || 36;
    
    const image = await Jimp.read(url);
    image.resize(w, h);
    
    const pixels = [];
    image.scan(0, 0, w, h, function(x, y, idx) {
        pixels.push(this.bitmap.data[idx] / 255)
        pixels.push(this.bitmap.data[idx+1] / 255)
        pixels.push(this.bitmap.data[idx+2] / 255)
    });
    
    res.json({ pixels, w, h });
}
