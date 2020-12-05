const fileType = require("file-type");
const fs = require("fs");
const http = require("http");
const isBinaryFile = require("isbinaryfile").isBinaryFileSync;
const readChunk = require("read-chunk");
const url = require("url");

function type(dirent) {
    if (dirent.isDirectory())       return "dir";
    if (dirent.isFile())            return "file";
    if (dirent.isSymbolicLink())    return "symlink";
    return "other";
}

function dirent_to_nodes(parent) {
    return dirent => {
        return {
            uri: `${parent}${dirent.name}/`,
            name: dirent.name,
            type: type(dirent)
        };
    }
}

function ls(path) {
    console.log("List contents of: ", path);
    const nodes = fs.readdirSync(path, {withFileTypes: true}).
        map(dirent_to_nodes(path));
    console.log(nodes);
    return JSON.stringify({nodes});
}

function mime(path) {
    console.log("Get mime type of: ", path);
    const buffer = readChunk.sync(path, 0, fileType.minimumBytes);
    if (isBinaryFile(path)) {
        console.log(buffer);
        const type = fileType(buffer);
        const mime = { mime: (type && type.mime) || "unknown" };
        console.log(mime);
        return JSON.stringify(mime);
    } else {
        console.log("text/plain");
        return JSON.stringify({mime: "text/plain"});
    }
}

function preview(path) {
    console.log("Preview file: ", path);
    const mimeType = JSON.parse(mime(path)).mime;
    const contents = fs.readFileSync(path);
    const file = {
        mimeType,
        contents
    };
    console.log(file);
    return file;
}

http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    console.log("Request for: ", parsedUrl.path);
    const op = parsedUrl.pathname;
    const query = parsedUrl.query;

    let statusCode = 204, resHeaders = {}, resBody;

    try {
        switch (op) {
            case "/ls":
                statusCode = 200;
                resBody = ls(query.path);
                break;

            case "/mime":
                statusCode = 200;
                resBody = mime(query.path);
                break;

            case "/preview":
                file = preview(query.path);
                if (file.mimeType) {
                    resHeaders["Content-Type"] = file.mimeType;
                    statusCode = 200;
                    resBody = fs.readFileSync(query.path).toString("base64");
                }
                break;

            default:
                statusCode = 400;
                break;
        }
    } catch (e) {
        console.log(e);
        statusCode = 500;
        resBody = JSON.stringify(e);
    }

    res.writeHead(statusCode, {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/json",
        ...resHeaders
    });
    res.write(resBody || "");
    res.end();
}).listen(8080);