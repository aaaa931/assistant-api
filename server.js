// const Koa = require("koa");
// const serve = require("koa-static");
// const path = require("path");

// const app = new Koa();
// const staticPath = "./";
// const port = process.env.PORT || 5000;
// const dev_path = JSON.stringify(path);

// app.use(serve(path.join(__dirname, staticPath)));

// app.listen(port, () => {
//     console.clear();
//     console.log(`[Message]: variable`);
//     console.log(`[Message]: __dirname: ${__dirname}`);
//     console.log(`[Message]: path: ${dev_path}`);
//     console.log(`[Message]: Server is listening on port ${port}`);
// });
const express = require("express");
const cors = require("cors");
const { json_get, json_post, json_put, json_del } = require("./json");
const app = express();
app.use(cors());
app.use(express.json());

const success = (res, obj = "success") => {
    res.send(obj);
};

app.get("/record", (req, res) => {
    const query = req.query;

    const getData = (data, query = null) => {
        console.log("query", query);
        const keys = Object.keys(query);
        const key = keys.length > 0 ? keys[0] : "";
        const result = data.filter((data) => {
            if (query[key] === "all" && key === "status") {
                console.log("query all success");
                return data;
            } else if (key.length > 0) {
                console.log("query success");
                console.log("data[key]", data[key]);
                return data[key].toString() === query[key];
            }

            return data;
        });

        res.send(result);
    };

    json_get("record", query, getData);
    console.log(`record get success`);
});

app.get("/record/:id", (req, res) => {
    const params = req.params;
    console.log("params", params);

    const getData = (data, params = null) => {
        res.send(data[params.id]);
    };

    json_get("record", params, getData);
    console.log(`record get success`);
});

app.post("/record", (req, res) => {
    json_post("record", req.body, success(res));
    console.log("post req.body", req.body);
    console.log(`record post success`);
});

app.put("/record/:id", (req, res) => {
    const params = req.params.id;

    json_put("record", params, req.body, success(res));
    console.log("params", params);
    console.log("put req.body", req.body);
    console.log(`record put success`);
});

app.delete("/record/:id", (req, res) => {
    const params = req.params.id;

    json_del("record", params, success(res));
    console.log("params", params);
    console.log(`record delete success`);
});

app.get("/item", (req, res) => {
    const query = req.query;

    const getData = (data, query = null) => {
        console.log("query", query);
        const keys = Object.keys(query);
        const key = keys.length > 0 ? keys[0] : "";
        const result = data.filter((data) => {
            if (key.length > 0) {
                console.log("query success");
                console.log("data[key]", data[key]);
                return data[key].toString() === query[key];
            }

            return data;
        });

        res.send(result);
    };

    json_get("item", query, getData);
    console.log(`item get success`);
});

app.post("/item", (req, res) => {
    json_post("item", req.body, success(res));
    console.log("post req.body", req.body);
    console.log(`item post success`);
});

app.get("/accounting", (req, res) => {
    const query = req.query;

    const getData = (data, query = null) => {
        console.log("query", query);
        const keys = Object.keys(query);
        const key = keys.length > 0 ? keys[0] : "";
        const result = data.filter((data) => {
            if (key.length > 0 && data[key]) {
                console.log("query success");
                console.log("data[key]", data[key]);
                return data[key].toString().includes(query[key]);
            }

            return data;
        });

        res.send(result);
    };

    json_get("accounting", query, getData);
    console.log(`accounting get success`);
});

app.post("/accounting", (req, res) => {
    json_post("accounting", req.body, success(res));
    console.log("post req.body", req.body);
    console.log(`accounting post success`);
});

const server = app.listen(process.env.PORT || 5000, () => {
    const port = server.address().port;
    console.log(`[Message] port ${port}`);
});
