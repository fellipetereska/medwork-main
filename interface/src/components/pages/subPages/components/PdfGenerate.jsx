import React from "react";

import { Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import ReactPDF from '@react-pdf/renderer';
import ReactDOM from 'react-dom';

function PdfGenerate() {

  const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  });

  const MyDocument = () => (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>Section #1</Text>
        </View>
        <View style={styles.section}>
          <Text>Section #2</Text>
        </View>
      </Page>
    </Document>
  );

  const handleGeneratePdf = () => {
    ReactDOM.render(<MyDocument />, document.getElementById('root'));
  }

  return (
    <>
      <div className="flex justify-center">
        <button className="bg-sky-600 text-white px-4 py-2 rounded" onClick={handleGeneratePdf}>Gerar</button>
      </div>
    </>
  );


}

export default PdfGenerate;