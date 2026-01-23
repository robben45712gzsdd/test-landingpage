import fs from 'fs';
import path from 'path';

export default function (req, res, next) {
  // Match pattern: /gameName/app-ads.txt
  const match = req.url.match(/^\/([^\/]+)\/app-ads\.txt$/);
  
  if (match) {
    const gameName = match[1];
    
    // Thử lấy từ game-data folder trước, nếu không có thì từ static folder
    let contentPath = path.join(process.cwd(), 'game-data', `${gameName}.txt`);
    
    if (!fs.existsSync(contentPath)) {
      contentPath = path.join(process.cwd(), 'static', gameName, 'app-ads.txt');
    }
    
    try {
      if (fs.existsSync(contentPath)) {
        const appAdsContent = fs.readFileSync(contentPath, 'utf-8');
        res.setHeader('Content-Type', 'text/plain; charset=utf-8');
        res.setHeader('Content-Length', Buffer.byteLength(appAdsContent));
        res.statusCode = 200;
        res.end(appAdsContent);
      } else {
        // File not found
        res.statusCode = 404;
        res.end(`Content for game "${gameName}" not found.`);
      }
    } catch (error) {
      res.statusCode = 500;
      res.end(`Error reading content for game "${gameName}": ${error.message}`);
    }
  } else {
    next();
  }
}
