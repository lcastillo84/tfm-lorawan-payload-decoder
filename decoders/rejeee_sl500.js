module.exports = function (bytes, port = 0) {

    console.log(bytes)
    let obj = {}
    let len = bytes ? bytes.length : 0
    let offset = 0;
    let dtype;
    offset++;
    /* Battery voltage level: Battery voltage is from 0-31, 31 means battery is 100% left. */
    obj.battery = (bytes[offset++] & 0x1F);
    /* This field is reserved. Generally, the voltage value of the memory chip is 0.1V. For example, the value of 33 is 3.3V */
    obj.vol = bytes[offset++];
    do {
        dtype = bytes[offset++];
        if (dtype == 0x01) {
            obj.evt = bytes[offset++]; // OK
            obj.acceX = (((bytes[offset] & 0x80 ? bytes[offset] - 0x100 : bytes[offset]) << 8) + bytes[offset + 1])
            offset += 2;
            obj.acceY = (((bytes[offset] & 0x80 ? bytes[offset] - 0x100 : bytes[offset]) << 8) + bytes[offset + 1])
            offset += 2;
            obj.acceZ = (((bytes[offset] & 0x80 ? bytes[offset] - 0x100 : bytes[offset]) << 8) + bytes[offset + 1])
            offset += 2;
            obj.angle = bytes[offset++];
        }
        len = len - offset;
    } while (len > 0)

    return {
        ...obj
    }
}