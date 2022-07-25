const fs = require("fs");

const json_get = (url, params = null, cb) => {
    const path = `src/data/${url}.json`;

    fs.readFile(path, (error, dataList) => {
        if (error) {
            return console.log("json_get error :>> ", error);
        }

        const data = dataList.length > 0 ? JSON.parse(dataList) : [];
        console.log("get data -> ", data);
        cb(data, params);

        return data;
    });
};

exports.json_get = json_get;

exports.json_post = (url, newData, cb) => {
    const path = `src/data/${url}.json`;

    fs.readFile(path, (error, dataList) => {
        if (error) {
            return console.log("json_post error :>> ", error);
        }

        let data = dataList.length > 0 ? JSON.parse(dataList) : [];
        const maxId = Math.max(...data.map((data) => data.id));
        const id = maxId < 0 ? 0 : maxId + 1;
        newData.id = id;
        data.push(newData);
        data = JSON.stringify(data);

        console.log("post newData :>> ", newData);
        console.log("post data :>> ", data);
        console.log("post id", id);

        fs.writeFile(path, data, (error) => {
            if (error) {
                console.log("json_post writeFile error :>> ", error);
            } else {
                console.log("json_post writeFile success :>> ");
            }
        });
    });

    cb();
};

exports.json_put = (url, id, newData = "", cb) => {
    const path = `src/data/${url}.json`;
    console.log("put newData", newData);

    fs.readFile(path, (error, dataList) => {
        if (error) {
            return console.log("json_put error :>> ", error);
        }

        let data = dataList.length > 0 ? JSON.parse(dataList) : [];
        console.log("data.length :>> ", data.length);

        for (let i in data) {
            console.log("put val.id :>> ", data[i].id);
            console.log("put id :>> ", id);
            if (data[i].id === parseInt(id)) {
                data[i] = newData;
                console.log("put data[i]", data[i]);
                break;
            }
        }

        data = JSON.stringify(data);
        console.log("json_put data", data);

        fs.writeFile(path, data, (error) => {
            if (error) {
                console.log("json_put writeFile error :>> ", error);
            } else {
                console.log("json_put writeFile success :>> ");
            }
        });
    });

    cb();
};

exports.json_del = (url, id, cb) => {
    const path = `src/data/${url}.json`;

    fs.readFile(path, (error, dataList) => {
        if (error) {
            return console.log("json_del error :>> ", error);
        }

        let data = dataList.length > 0 ? JSON.parse(dataList) : [];
        console.log("data.length :>> ", data.length);

        for (let i in data) {
            console.log("put val.id :>> ", data[i].id);
            console.log("put id :>> ", id);
            if (data[i].id === parseInt(id)) {
                data.splice(i, 1);
                console.log("delete data[i]", data[i]);
                break;
            }
        }

        data = JSON.stringify(data);
        console.log("json_del data", data);

        fs.writeFile(path, data, (error) => {
            if (error) {
                console.log("json_del writeFile error :>> ", error);
            } else {
                console.log("json_del writeFile success :>> ");
            }
        });
    });

    cb();
};
