const EventEmitter = require('events').EventEmitter;
const emitter = new EventEmitter();
emitter.setMaxListeners(0);

exports.parse = async function (req, res) {
    try {
        const RecvPacket = req.body;
        if (!RecvPacket.hasOwnProperty('api')) {
            LogManager.ConsoleLog(moment().format('YYYY-MM-DD HH:mm:ss') + ' [routes/test] 쓰레기 패킷 받음.');
            return Response(res, 0, {});
        }

        if (!ValidPacket(RecvPacket)) {
            return Response(res, 0, {});
        }

        emitter.emit(1, RecvPacket, res);
    } catch (error) {
        console.error(moment().format('YYYY-MM-DD HH:mm:ss'));

        if (isNaN(error)) return Response(res, 0, {});
        else return Response(res, error, {});
    }
};

function Response(res, err, data) {
    let retmsg = 'ERROR';
    data.retcode = err;
    data.retmsg = retmsg;
    res.send(data);
}

function ValidPacket(RecvPacket) {
    /*if (!RecvPacket.hasOwnProperty('user_id') || RecvPacket.user_id === '' || RecvPacket.user_id <= 0) { console.error(RecvPacket.api + ' - invalid user_id : ' + RecvPacket.user_id); return false; }
    if (!RecvPacket.hasOwnProperty('type') || RecvPacket.type === '' || RecvPacket.type < 0) { console.error(RecvPacket.api + ' - invalid type : ' + RecvPacket.type); return false; }*/
    return true;
}

// ----------------------------- API ----------------------------------------
emitter.on(1, async function (RecvPacket, res) {
    let returnData = {
        retcode: 0,
        retmsg: 0,
        count_info: {},
        reward_info: {},
        stamp_info: {}
    };
    try {
        LogManager.ConsoleLog(RecvPacket.api);
        Response(res, 100, returnData);
    }
    catch (error) {
        console.error(moment().format('YYYY-MM-DD HH:mm:ss'));
        if (isNaN(error)) Response(res, 'Error', returnData);
        else Response(res, error, returnData);
    }
});