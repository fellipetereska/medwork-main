import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

function PdfGenerate({ companyName, inventario }) {
  const CoverStyles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      padding: 40,
      height: '100%',
    },

    topText: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
    },

    middleText: {
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 20,
      fontWeight: 'bold',
    },

    companyContainer: {
      marginTop: 'auto',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
    },

    bottomTextContainer: {
      marginTop: 'auto',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },
    bottomText: {
      fontSize: 14,
    },
  });

  const CoverPage = () => {
    return (
      <Page size="A4" style={CoverStyles.page}>
        <Text style={CoverStyles.topText}>Programa de Gerenciamento de Riscos - PGR</Text>
        <View style={CoverStyles.companyContainer}>
          <Text style={CoverStyles.middleText}>{companyName}</Text>
        </View>
        <View style={CoverStyles.bottomTextContainer}>
          <Text style={CoverStyles.bottomText}>Vigência - Data à Data</Text>
        </View>
      </Page>
    )
  };

  const SumaryStyles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      padding: 40,
      height: '100%',
    },

    topText: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
    },

    bottomTextContainer: {
      marginTop: 'auto',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
    },

    bottomText: {
      fontSize: 14,
    },
  });

  const SumaryPage = () => {
    return (
      <Page size="A4" style={SumaryStyles.page}>
        <Text style={SumaryStyles.topText}>Sumário</Text>
        <View style={SumaryStyles.bottomTextContainer}>
          <Text style={SumaryStyles.bottomText}>Dados da Empresa</Text>
        </View>
      </Page>
    );
  };

  const CompanyStyles = StyleSheet.create({
    page: {
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      padding: 40,
      height: '100%',
    },

    topText: {
      fontSize: 16,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
  });

  const CompanyPage = () => {
    return(
      <Page style={CompanyStyles.page}>
        <Text style={CompanyStyles.topText}>1. Identificação da Empresa</Text>
        <View>

        </View>
      </Page>
    );
  }

  return (
    <div className="flex justify-center">
      <PDFViewer width="1000" height="600">
        <Document>
          <CoverPage />
          <SumaryPage />
          <CompanyPage />
        </Document>
      </PDFViewer>
    </div>
  );
}

export default PdfGenerate;
