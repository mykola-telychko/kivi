const { Worker, isMainThread, parentPort, workerData } = require('worker_threads');

if (isMainThread) {
    const worker = new Worker(__filename, { workerData: 'store/storage.txt' });

    worker.on('message', (result) => {
        // console.log(`qty words odd: ${result.wordCount}`);
        // console.log(`qty words even: ${result.isEven}`);
        console.log('res:', result);
    });

    worker.on('error', (error) => {
        console.error(`error: ${error}`);
    });
} else {
    // execute apart
    const fs = require('fs');
    const { workerData } = require('worker_threads');

    fs.readFile(workerData, 'utf8', (err, data) => {
        if (err) throw err;

        let words = data.split("|");// if else try catch 
        // console.log('res2:', words.length);
        const wordCount = words.length;

        parentPort.postMessage({ wordCount, isEven: wordCount % 2 === 0 });
    });
}