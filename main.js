const { Redis } = require("ioredis");
const onTypedLine = require("./onTypedLine");

const redisPub = new Redis("redis://localhost:6379");
const redisSub = new Redis("redis://localhost:6379");

const channel = "chatroom";

redisSub.subscribe(channel);
redisSub.on("message", (channel, message) =>
    console.log(`mensagem: ${message}`)
);

// Ouvir os eventos de linha digitada
onTypedLine((line) => {
    // imprimir de volta a linha que foi digitada
    //console.log(line);

    redisPub.publish(channel, line);

    // imprimir com algo na frente (só pra ver)
    //console.log(`mensagem: ${line}`);
});
