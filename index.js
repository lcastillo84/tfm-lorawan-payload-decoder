/******************************************************** 
**** Función Lambda para decodificar payload LoRaWAN ****
*********************************************************/

// Objeto DECODERS: Contiene las funciones de decodificación provistas por
// los fabricantes de los sensores. La función de decodificación toma dos 
// parámetros: "bytes" (array de bytes) y "fport" (parámetro LoRaWAN)
const DECODERS = {
    dragino_lsn50v2: require('./decoders/dragino_lsn50v2.js'),
    rejeee_sl500: require('./decoders/rejeee_sl500.js'),
};


// Función "handler", es la función principal que ejecuta AWS Lambda.
exports.handler = async (event) => {
    console.log('Procesando evento:', event);

    // Validar que se haya especificado "decoderName" en el evento de entrada
    if (!event.hasOwnProperty('decoderName')) {
        return {
            statusCode: 500,
            errorMsg: 'decoderName no especificado'
        };
    }

    // Validar que el decoderName esté definido en el objeto DECODERS.
    if (!DECODERS.hasOwnProperty(event.decoderName)) {
        return {
            statusCode: 500,
            errorMsg: `decoderName ${event.decoderName} no está definido`
        };
    }

    // Obtener fPort
    let fPort = event.WirelessMetadata?.LoRaWAN?.FPort;
    if (!fPort) {
        console.log('Parámetro FPort no encontrado en WirelessMetadata.LoRaWAN, se asume FPort=0');
        fPort = 0;
    }

    // Llevar de string a buffer de bytes
    console.log('Payload: ', event.PayloadData);
    const bytes = new Buffer.from(event.PayloadData, 'base64');

    // Seleccionar función para decodificar, de acuerdo al parámetro decoderName
    let decoderFunc = DECODERS[event.decoderName];

    // Decodificar los datos
    let data = {};
    let response = {};

    try {
        data = decoderFunc(bytes, fPort);
        let dataIsEmpty = Object.keys(data).length == 0;
        response = {
            statusCode: dataIsEmpty ? 500 : 200,
            data: data,
            ...(dataIsEmpty ? { errorMsg: 'El decodificador no arrojó resultados' } : {})
        };
    } catch (error) {
        console.log(error);
        response = {
            statusCode: 500,
            msg: 'Error en decodificación, ver logs para más detalles'
        };
    }
    console.log('Resultado: ', response);
    return response;
};
