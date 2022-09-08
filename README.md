# tfm-lorawan-payload-decoder

Código para función Lambda que decodifica payload de sensores LoRaWAN

# Decodificador de payload LoRaWAN para AWS Lambda

### Autor: Luis Castillo

Código utilizado en TFM "Diseño e implementación de arquitectura de analítica de datos en la nube para aplicación IIoT". Master en Business Analytics y Big Data de IMF Smart Education / Universidad Nebrija.

#### Requerimientos:

- Cuenta AWS con permisos en AWS Lambda.
- Regla en AWS IoT Core que haga un llamado a esta función Lambda.

#### Procedimiento:

1. Crear función Lambda en AWS con el código suministrado.
2. Para llamar a la función lambda desde una regla de IoT Core, usar la función `aws_lambda(functionArn, inputJson)`. Seguir este [enlace](https://docs.aws.amazon.com/iot/latest/developerguide/iot-sql-functions.html) para ver documentación de esta función.
