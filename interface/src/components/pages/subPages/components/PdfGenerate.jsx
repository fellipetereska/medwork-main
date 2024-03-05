import React from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer } from '@react-pdf/renderer';

function PdfGenerate({ companyName, inventario }) {

  const PageStyles = StyleSheet.create({
    pageCenter: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 40,
      paddingVertical: 10,
      height: '100%',
    },

    Page: {
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 40,
      paddingVertical: 10,
      height: '100%',
    }
  });

  const TextStyles = StyleSheet.create({
    headerText: {
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 5,
      paddingTop: 10,
    },

    topText: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
    },

    centerText: {
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 20,
      fontWeight: 'bold',
    },

    SignatureDate: {
      fontSize: 12,
      textAlign: 'left',
      color: '#343a40',
    },

    officeText: {
      fontSize: 12,
    },

    smallText: {
      fontSize: 12,
    },

    subTitleSumary: {
      fontSize: 16,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },

    prefixText: {
      fontSize: 8,
      color: '#6c757d',
      marginRight: 5,
    },

    prefixTextTitle: {
      fontSize: 8,
      color: '#ced4da',
      marginRight: 5,
    },

    valueText: {
      fontSize: 12,
      color: '#495057',
    },

    valueTextTitle: {
      fontSize: 14,
      color: '#f8f9fa',
    },

    valueTextSignatureTitle: {
      fontSize: 12,
      color: '#f8f9fa',
    },

    footerText: {
      fontSize: 10,
      textAlign: 'center',
      marginTop: 5,
    },

    footerAddresText: {
      fontSize: 10,
      textAlign: 'center',
      marginTop: 2,
      color: '#adb5bd',
    },
  });

  const ContainerStyles = StyleSheet.create({
    headerContainer: {
      width: '100%',
      borderBottom: '1 solid #e5e5e5',
      marginBottom: 20,
    },

    centerContainer: {
      marginTop: 'auto',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
    },

    bottomContainer: {
      marginTop: 'auto',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },

    signatureContainer: {
      width: '100%',
      marginTop: 50,
    },

    footerContainer: {
      marginTop: 'auto',
      width: '100%',
      borderTop: '1 solid #e5e5e5',
    },

  });

  const TableStyles = StyleSheet.create({
    table: {
      marginTop: 10,
      width: '100%',
    },

    headerCell: {
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: '#0077b6',
      width: '100%',
    },

    headerTable: {
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: '#0077b6',
      width: '100%',
      flexDirection: 'row',
    },

    headerCellTable: {
      width: '33%',
      justifyContent: 'center',
      alignItems: 'center',
    },

    tableRow: {
      borderBottom: '1 solid #343a40',
      flexDirection: 'row',
      width: '100%',
    },

    seventyFiveRow: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '75%',
    },

    fiftyRow: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '50%',
    },

    fortyRow: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '40%',
    },

    twentyFiveRow: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '25%',
    },

    twentyRow: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '20%',
    },

    fifTeenRow: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '15%',
    },

  });

  const HeaderPage = () => {
    return (
      <View style={ContainerStyles.headerContainer}>
        <Text style={TextStyles.headerText}>PGR - Programa de Gerenciamento de Riscos - NR1</Text>
      </View>
    );
  }

  const FooterPage = () => {
    return (
      <View style={ContainerStyles.footerContainer}>
        <Text style={TextStyles.footerText}>{companyName}</Text>
        <Text style={TextStyles.footerAddresText}>Rua Goias, 1914 - apto 301 - Londrina/PR 86020-410</Text>
      </View>
    );
  }

  const CoverPage = () => {
    return (
      <Page size="A4" style={PageStyles.pageCenter}>
        <Text style={TextStyles.headerText}>Programa de Gerenciamento de Riscos - PGR</Text>
        <View style={ContainerStyles.centerContainer}>
          <Text style={TextStyles.centerText}>{companyName}</Text>
        </View>
        <View style={ContainerStyles.bottomContainer}>
          <Text style={TextStyles.smallText}>Vigência - Data à Data</Text>
        </View>
      </Page>
    )
  };

  const SumaryPage = () => {
    return (
      <Page size="A4" style={PageStyles.pageCenter}>
        <HeaderPage />
        <Text style={TextStyles.topText}>Sumário</Text>
        <View style={ContainerStyles.bottomContainer}>
          <Text style={TextStyles.smallText}>Dados da Empresa</Text>
        </View>
      </Page>
    );
  };

  const CompanyPage = () => {

    const CompanyStyles = StyleSheet.create({
      officeFiftyRow: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
      },

      headerSignatureContentCell: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#0077b6',
        width: '100%',
        flexDirection: 'row',
      },

      headerSignatureCell: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
      },
    });

    return (
      <Page style={PageStyles.Page}>

        {/* Cabeçalho */}
        <HeaderPage />

        {/* Sumário */}
        <Text style={TextStyles.subTitleSumary}>1. Identificação da Empresa</Text>

        {/* Company Table */}
        <View style={TableStyles.table}>
          <View style={TableStyles.headerCell}>
            <Text style={TextStyles.prefixTextTitle}>Empresa: </Text>
            <Text style={TextStyles.valueTextTitle}>{companyName}</Text>
          </View>
          <View style={TableStyles.tableRow}>
            <View style={TableStyles.twentyFiveRow}>
              <Text style={TextStyles.prefixText}>CNPJ:</Text>
              <Text style={TextStyles.valueText}>01.885.077/0001-59</Text>
            </View>
            <View style={TableStyles.fifTeenRow}>
              <Text style={TextStyles.prefixText}>Cnae:</Text>
              <Text style={TextStyles.valueText}>4520-0/01</Text>
            </View>
            <View style={TableStyles.fifTeenRow}>
              <Text style={TextStyles.prefixText}>Grau de Risco:</Text>
              <Text style={TextStyles.valueText}>30</Text>
            </View>
            <View style={TableStyles.fiftyRow}>
              <Text style={TextStyles.prefixText}>Descrição CNAE:</Text>
              <Text style={TextStyles.valueText}>Serviços de manutenção e reparação mecânica de veículos automotores</Text>
            </View>
          </View>
          <View style={TableStyles.tableRow}>
            <View style={TableStyles.twentyFiveRow}>
              <Text style={TextStyles.prefixText}>Cep:</Text>
              <Text style={TextStyles.valueText}>86020-410</Text>
            </View>
            <View style={TableStyles.seventyFiveRow}>
              <Text style={TextStyles.prefixText}>Endereço:</Text>
              <Text style={TextStyles.valueText}>Rua Goias 1914 - apto 301</Text>
              <Text style={TextStyles.valueText}>Centro - Londrina/PR</Text>
            </View>
          </View>
        </View>

        {/* Signature Table */}
        <View style={ContainerStyles.signatureContainer}>
          <Text style={TextStyles.SignatureDate}>Londrina, Dia de Mês de Ano</Text>

          {/* Assinatura do Técnico */}
          <View style={TableStyles.table}>
            <View style={CompanyStyles.headerSignatureContentCell}>
              <View style={CompanyStyles.headerSignatureCell}>
                <Text style={TextStyles.valueTextSignatureTitle}>Elaborador</Text>
              </View>
              <View style={CompanyStyles.headerSignatureCell}>
                <Text style={TextStyles.valueTextSignatureTitle}>Assinatura</Text>
              </View>
            </View>
            <View style={TableStyles.tableRow}>
              <View style={CompanyStyles.officeFiftyRow}>
                <Text style={TextStyles.officeText}>Fellipe Tereska</Text>
                <Text style={TextStyles.officeText}>Técnico de Segurança do Trabalho</Text>
              </View>
              <View style={TableStyles.fiftyRow}>
              </View>
            </View>
          </View>

          {/* Assinatura do Reponsável */}
          <View style={CompanyStyles.table}>
            <View style={CompanyStyles.headerSignatureContentCell}>
              <View style={CompanyStyles.headerSignatureCell}>
                <Text style={TextStyles.valueTextSignatureTitle}>Responsável</Text>
              </View>
              <View style={CompanyStyles.headerSignatureCell}>
                <Text style={TextStyles.valueTextSignatureTitle}>Assinatura</Text>
              </View>
            </View>
            <View style={CompanyStyles.tableRow}>
              <View style={CompanyStyles.officeFiftyRow}>
                <Text style={TextStyles.officeText}>Fellipe Tereska</Text>
              </View>
              <View style={CompanyStyles.fiftyRow}>
              </View>
            </View>
          </View>

        </View>

        {/* Footer */}
        <FooterPage />

      </Page>
    );
  };

  const PostPage = () => {

    const PostStyles = StyleSheet.create({
      postRow: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      },

      postRowDesc: {
        padding: 10,
        width: '50%',
        flexDirection: 'row',
      },

      postRowFunc: {
        padding: 10,
        width: '10%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      },

      headerPostContentCell: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#0077b6',
        width: '100%',
        flexDirection: 'row',
      },

      headerPostCell: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
      },

      headerPostCellFunc: {
        width: '10%',
        justifyContent: 'center',
        alignItems: 'center',
      },

      headerPostCellDesc: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
      },

      postText: {
        fontSize: 10,
      },

      tableRow: {
        paddingHorizontal: 5,
        borderBottom: '1 solid #343a40',
        flexDirection: 'row',
        width: '100%',
      },
    });

    return (
      <Page style={PageStyles.Page}>

        {/* Cabeçalho */}
        <HeaderPage />

        {/* Sumário */}
        <Text style={TextStyles.subTitleSumary}>16. Caracterização das Atividades e Cargos</Text>

        <View style={TableStyles.table}>
          <View style={PostStyles.headerPostContentCell}>
            <View style={PostStyles.headerPostCell}>
              <Text style={TextStyles.valueTextSignatureTitle}>Setor</Text>
            </View>
            <View style={PostStyles.headerPostCell}>
              <Text style={TextStyles.valueTextSignatureTitle}>Cargo</Text>
            </View>
            <View style={PostStyles.headerPostCellDesc}>
              <Text style={TextStyles.valueTextSignatureTitle}>Descrição detalhada do cargo</Text>
            </View>
            <View style={PostStyles.headerPostCellFunc}>
              <Text style={TextStyles.valueTextSignatureTitle}>Nº Funcionários</Text>
            </View>
          </View>
          <View style={PostStyles.tableRow}>
            <View style={PostStyles.postRow}>
              <Text style={PostStyles.postText}>Escritório</Text>
            </View>
            <View style={PostStyles.postRow}>
              <Text style={PostStyles.postText}>Auxiliar Administrativo</Text>
            </View>
            <View style={PostStyles.postRowDesc}>
              <Text style={PostStyles.postText}>Realizar a operação da furadeira de bancada e ajustar peças no equipamento</Text>
            </View>
            <View style={PostStyles.postRowFunc}>
              <Text style={PostStyles.postText}>1</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <FooterPage />
      </Page>
    );
  };

  return (
    <div className="flex justify-center">
      <PDFViewer width="1000" height="1000">
        <Document>
          <CoverPage />
          <SumaryPage />
          <CompanyPage />
          <PostPage />
        </Document>
      </PDFViewer>
    </div>
  );
}

export default PdfGenerate;
