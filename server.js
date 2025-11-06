const http = require('http');
const fs = require('fs').promises;
const path = require('path');

const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, 'public');

const BIN_REQUEST_OPTIONS = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
    'User-Agent': 'bin-collection-playful-app/1.0',
    'Origin': 'https://online.belfastcity.gov.uk',
    'Referer': 'https://online.belfastcity.gov.uk/find-bin-collection-day/Default.aspx'
  },
  body: '__EVENTTARGET=&__EVENTARGUMENT=&__VIEWSTATE=%2FwEPDwUJOTk1NTQwMTc2D2QWAmYPZBYCAgMPZBYCAgUPZBYCAgEPZBYCAgEPZBYCAgEPZBYIAgUPD2QWAh4Fc3R5bGUFDGRpc3BsYXk6bm9uZRYCAgsPD2QWAh8ABQxkaXNwbGF5Om5vbmVkAgcPD2QWAh8ABQxkaXNwbGF5Om5vbmUWAgIHDw8WAh4HVmlzaWJsZWhkZAIJDw8WAh8BZ2QWBAIDDxAPFgYeDURhdGFUZXh0RmllbGQFDkJFTEZBU1RBRERSRVNTHg5EYXRhVmFsdWVGaWVsZAUEVVBSTh4LXyFEYXRhQm91bmRnZBAVLiQ0OSBGUklFTkRMWSBTVFJFRVQsIEJFTEZBU1QsIEJUNyAySFIkNTEgRlJJRU5ETFkgU1RSRUVULCBCRUxGQVNULCBCVDcgMkhSJDUzIEZSSUVORExZIFNUUkVFVCwgQkVMRkFTVCwgQlQ3IDJIUiQ1NSBGUklFTkRMWSBTVFJFRVQsIEJFTEZBU1QsIEJUNyAySFIkNTcgRlJJRU5ETFkgU1RSRUVULCBCRUxGQVNULCBCVDcgMkhSJDU5IEZSSUVORExZIFNUUkVFVCwgQkVMRkFTVCwgQlQ3IDJIUiQ2MSBGUklFTkRMWSBTVFJFRVQsIEJFTEZBU1QsIEJUNyAySFIkNjMgRlJJRU5ETFkgU1RSRUVULCBCRUxGQVNULCBCVDcgMkhSJDY1IEZSSUVORExZIFNUUkVFVCwgQkVMRkFTVCwgQlQ3IDJIUiQ2NyBGUklFTkRMWSBTVFJFRVQsIEJFTEZBU1QsIEJUNyAySFIkNjkgRlJJRU5ETFkgU1RSRUVULCBCRUxGQVNULCBCVDcgMkhSJDcwIEZSSUVORExZIFNUUkVFVCwgQkVMRkFTVCwgQlQ3IDJIUiQ3MSBGUklFTkRMWSBTVFJFRVQsIEJFTEZBU1QsIEJUNyAySFIkNzIgRlJJRU5ETFkgU1RSRUVULCBCRUxGQVNULCBCVDcgMkhSJDczIEZSSUVORExZIFNUUkVFVCwgQkVMRkFTVCwgQlQ3IDJIUiQ3NCBGUklFTkRMWSBTVFJFRVQsIEJFTEZBU1QsIEJUNyAySFIkNzUgRlJJRU5ETFkgU1RSRUVULCBCRUxGQVNULCBCVDcgMkhSJDc2IEZSSUVORExZIFNUUkVFVCwgQkVMRkFTVCwgQlQ3IDJIUiQ3NyBGUklFTkRMWSBTVFJFRVQsIEJFTEZBU1QsIEJUNyAySFIkNzggRlJJRU5ETFkgU1RSRUVULCBCRUxGQVNULCBCVDcgMkhSJDc5IEZSSUVORExZIFNUUkVFVCwgQkVMRkFTVCwgQlQ3IDJIUiQ4MCBGUklFTkRMWSBTVFJFRVQsIEJFTEZBU1QsIEJUNyAySFIkODEgRlJJRU5ETFkgU1RSRUVULCBCRUxGQVNULCBCVDcgMkhSJDgyIEZSSUVORExZIFNUUkVFVCwgQkVMRkFTVCwgQlQ3IDJIUiQ4MyBGUklFTkRMWSBTVFJFRVQsIEJFTEZBU1QsIEJUNyAySFIkODQgRlJJRU5ETFkgU1RSRUVULCBCRUxGQVNULCBCVDcgMkhSJDg1IEZSSUVORExZIFNUUkVFVCwgQkVMRkFTVCwgQlQ3IDJIUiQ4NiBGUklFTkRMWSBTVFJFRVQsIEJFTEZBU1QsIEJUNyAySFIkODcgRlJJRU5ETFkgU1RSRUVULCBCRUxGQVNULCBCVDcgMkhSJDg4IEZSSUVORExZIFNUUkVFVCwgQkVMRkFTVCwgQlQ3IDJIUiQ4OSBGUklFTkRMWSBTVFJFRVQsIEJFTEZBU1QsIEJUNyAySFIkOTAgRlJJRU5ETFkgU1RSRUVULCBCRUxGQVNULCBCVDcgMkhSJDkyIEZSSUVORExZIFNUUkVFVCwgQkVMRkFTVCwgQlQ3IDJIUiQ5NCBGUklFTkRMWSBTVFJFRVQsIEJFTEZBU1QsIEJUNyAySFIkOTYgRlJJRU5ETFkgU1RSRUVULCBCRUxGQVNULCBCVDcgMkhSJDk4IEZSSUVORExZIFNUUkVFVCwgQkVMRkFTVCwgQlQ3IDJIUiUxMDAgRlJJRU5ETFkgU1RSRUVULCBCRUxGQVNULCBCVDcgMkhSJTEwMiBGUklFTkRMWSBTVFJFRVQsIEJFTEZBU1QsIEJUNyAySFIlMTA0IEZSSUVORExZIFNUUkVFVCwgQkVMRkFTVCwgQlQ3IDJIUiUxMDYgRlJJRU5ETFkgU1RSRUVULCBCRUxGQVNULCBCVDcgMkhSJTEwOCBGUklFTkRMWSBTVFJFRVQsIEJFTEZBU1QsIEJUNyAySFIlMTEwIEZSSUVORExZIFNUUkVFVCwgQkVMRkFTVCwgQlQ3IDJIUiUxMTIgRlJJRU5ETFkgU1RSRUVULCBCRUxGQVNULCBCVDcgMkhSJTExNCBGUklFTkRMWSBTVFJFRVQsIEJFTEZBU1QsIEJUNyAySFIlMTE2IEZSSUVORExZIFNUUkVFVCwgQkVMRkFTVCwgQlQ3IDJIUilTZWxlY3QgdGhlIEJUNyAySFIgYWRkcmVzcyBmcm9tIHRoZSBsaXN0LhUuCTE4NTA1NTE3OAkxODUwNTUxNzkJMTg1MDU1MTgwCTE4NTA1NTE4MQkxODUwNTUxODIJMTg1MDU1MTgzCTE4NTA1NTE4NAkxODUwNTUxODUJMTg1MDU1MTg2CTE4NTA1NTIxMQkxODUwNTUyMTIJMTg1MDU1MjEzCTE4NTA1NTE2OQkxODUwNTUxNzAJMTg1MDU1MTcxCTE4NTA1NTE3MgkxODUwNTUxNzMJMTg1MDU1MTc0CTE4NTA1NTE3NQkxODUwNTUxNzYJMTg1MDU1MTc3KVNlbGVjdCB0aGUgQlQ3IDJIUiBhZGRyZXNzIGZyb20gdGhlIGxpc3QuFCsDLmdnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2dnZ2cWAQItZAIHD2QWAgIFDw9kFgIfAAUMZGlzcGxheTpub25lZAILD2QWCgIBDw8WAh4EVGV4dGVkZAIDD2QWAgIBDzwrABECAA8WCB8BaB4HQ2FwdGlvbgUlMTAwIEZSSUVORExZIFNUUkVFVCwgQkVMRkFTVCwgQlQ3IDJIUh8EZx4LXyFJdGVtQ291bnQCAWQMFCsABBYIHgROYW1lBQtUeXBlIG9mIGJpbh4KSXNSZWFkT25seWgeBFR5cGUZKwIeCURhdGFGaWVsZAULVHlwZSBvZiBiaW4WCB8IBQdEYXkocykgHwloHwoZKwIfCwUHRGF5KHMpIBYIHwgFCkhvdyBvZnRlbj8fCWgfChkrAh8LBQpIb3cgb2Z0ZW4%2FFggfCAUPTmV4dCBjb2xsZWN0aW9uHwloHwoZKwIfCwUPTmV4dCBjb2xsZWN0aW9uFgJmD2QWBAIBD2QWCGYPDxYCHwUFEUdlbmVyYWwgd2FzdGUgYmluZGQCAQ8PFgIfBQUHIE1vbmRheWRkAgIPDxYCHwUFC0ZvcnRuaWdodGx5ZGQCAw8PFgIfBQUQTW9uIE5vdiAxMCAyMDI1IGRkAgIPDxYCHwFoZGQCBQ8PFgIfBWVkZAIHDw8WAh8BaGRkAgkPDxYCHwFoZGQYAQUbY3RsMDAkTWFpbkNvbnRlbnQkSXRlbXNHcmlkDzwrAAwBCAIBZBojgMEyjBvM6BSxtw1RpBr%2FAbRpo%2FFnrgueUSTx3iR7'
};

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (req.method === 'GET' && url.pathname === '/api/bin') {
    try {
      const html = await fetchBinCollectionHtml();
      const binType = extractBinType(html);
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ binType }));
    } catch (error) {
      console.error('Failed to fetch bin information:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Unable to fetch bin collection information right now.' }));
    }
    return;
  }

  if (req.method === 'GET') {
    serveStaticFile(url.pathname, res);
    return;
  }

  res.writeHead(405, { 'Content-Type': 'text/plain' });
  res.end('Method Not Allowed');
});

server.listen(PORT, () => {
  console.log(`Bin collection app listening on port ${PORT}`);
});

async function serveStaticFile(requestPath, res) {
  const sanitizedPath = requestPath === '/' ? '/index.html' : requestPath;
  const normalizedPath = path.normalize(sanitizedPath).replace(/^([/\\])+/, '');
  const safeSegments = normalizedPath
    .split(path.sep)
    .filter((segment) => segment && segment !== '..');
  const filePath = path.join(PUBLIC_DIR, ...safeSegments);

  try {
    const data = await fs.readFile(filePath);
    res.writeHead(200, { 'Content-Type': getContentType(filePath) });
    res.end(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Not Found');
    } else {
      console.error('Failed to serve static file:', error);
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal Server Error');
    }
  }
}

function getContentType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  switch (ext) {
    case '.html':
      return 'text/html; charset=utf-8';
    case '.css':
      return 'text/css; charset=utf-8';
    case '.js':
      return 'application/javascript; charset=utf-8';
    case '.json':
      return 'application/json; charset=utf-8';
    case '.svg':
      return 'image/svg+xml';
    default:
      return 'text/plain; charset=utf-8';
  }
}

async function fetchBinCollectionHtml() {
  const response = await fetch('https://online.belfastcity.gov.uk/find-bin-collection-day/Default.aspx', BIN_REQUEST_OPTIONS);
  if (!response.ok) {
    throw new Error(`Remote request failed with status ${response.status}`);
  }
  return response.text();
}

function extractBinType(html) {
  const marker = '<th scope="col">Type of bin';
  const markerIndex = html.indexOf(marker);
  if (markerIndex === -1) {
    throw new Error('Unable to locate the "Type of bin" header.');
  }

  const tdStart = html.indexOf('<td', markerIndex);
  if (tdStart === -1) {
    throw new Error('Unable to find the bin type cell.');
  }

  const contentStart = html.indexOf('>', tdStart);
  const contentEnd = html.indexOf('</td>', contentStart);
  if (contentStart === -1 || contentEnd === -1) {
    throw new Error('Unable to extract bin type content.');
  }

  const rawContent = html.slice(contentStart + 1, contentEnd);
  const cleaned = rawContent
    .replace(/<br\s*\/?\s*>/gi, ' ')
    .replace(/<[^>]*>/g, '')
    .trim();

  return decodeHtmlEntities(cleaned);
}

function decodeHtmlEntities(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .trim();
}
