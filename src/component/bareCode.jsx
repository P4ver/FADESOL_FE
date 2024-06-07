import React, { useEffect, useRef } from 'react';
import JsBarcode from 'jsbarcode';

const Barcode = ({ value }) => {
  const barcodeRef = useRef(null);

  useEffect(() => {
    JsBarcode(barcodeRef.current, value);
  }, [value]);

  return <svg ref={barcodeRef}></svg>;
};

export default Barcode;
