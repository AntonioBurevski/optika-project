package org.graduation.data.util;

import java.io.IOException;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.fasterxml.jackson.databind.ser.std.StdSerializer;
import com.google.common.io.BaseEncoding;

public class Base64Serializer extends StdSerializer<byte[]> {

    public Base64Serializer() {
        super(byte[].class);
    }

    @Override
    public void serialize(byte[] value, JsonGenerator gen, SerializerProvider arg2) throws IOException {
        gen.writeString(BaseEncoding.base64().encode(value));
    }

}
