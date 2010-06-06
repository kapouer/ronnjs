markdown(5) -- humane markup syntax
===================================

## DESCRIPTION

### Philosophy

## Buffers

Pure Javascript is Unicode friendly but not nice to binary data.  When
dealing with TCP streams or the file system, it's necessary to handle octet
streams. Node has several strategies for manipulating, creating, and
consuming octet streams.

Raw data is stored in in <a href="toto&amp;tata">lkj</a> stances of the `Buffer` class. A `Buffer` is similar
to an array of integers but corresponds to a raw memory allocation outside
the V8 heap. A `Buffer` cannot be resized.
Access the class with `require('buffer').Buffer`.

Converting between Buffers and JavaScript string objects requires an explicit encoding
method.  Node supports 3 string encodings: UTF-8 (`'utf8'`), ASCII (`'ascii'`), and
Binary (`'binary'`).

1. `'ascii'` - for 7 bit ASCII data only.  This encoding method is very fast, and will
strip the high bit if set.
    
2. `'binary'` - for 8 bit binary data such as images.

3. `'utf8'` - Unicode characters.  Many web pages and other document formats use UTF-8.

