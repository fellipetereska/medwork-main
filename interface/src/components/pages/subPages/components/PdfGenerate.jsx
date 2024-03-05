import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

function PdfGenerate({
  companyName, companyId,
  inventario, plano,
  company, unidades, setores, cargos, contatos,
  processos, riscos, medidasAdm, medidasEpi, medidasEpc,
  user,
}) {

  const findSetor = (item) => {
    const findSetor = setores.find((i) => i.id_setor === item);
    return findSetor ? findSetor.nome_setor : "N/A";
  };

  const getTotalFuncMasc = () => {
    return cargos.reduce((total, cargo) => total + cargo.func_masc, 0);
  };

  const getTotalFuncFem = () => {
    return cargos.reduce((total, cargo) => total + cargo.func_fem, 0);
  };

  const getTotalFuncMenor = () => {
    return cargos.reduce((total, cargo) => total + cargo.func_menor, 0);
  };

  const getTotalFunc = () => {
    const funcMasc = cargos.reduce((total, cargo) => total + cargo.func_masc, 0);
    const funcFem = cargos.reduce((total, cargo) => total + cargo.func_fem, 0);
    const funcMenor = cargos.reduce((total, cargo) => total + cargo.func_menor, 0);

    return funcMasc + funcFem + funcMenor;
  }

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
    },

    LandscapePage: {
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 10,
      paddingVertical: 10,
      height: '100%',
    },
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

    officeSmallText: {
      fontSize: 10,
      color: '#6c757d',
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
      alignItems: 'center',
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
            <Text style={TextStyles.valueTextTitle}>{companyName || "N/A"}</Text>
          </View>
          <View style={TableStyles.tableRow}>
            <View style={TableStyles.twentyFiveRow}>
              <Text style={TextStyles.prefixText}>CNPJ:</Text>
              <Text style={TextStyles.valueText}>{company.cnpj_empresa || "N/A"}</Text>
            </View>
            <View style={TableStyles.fifTeenRow}>
              <Text style={TextStyles.prefixText}>Cnae:</Text>
              <Text style={TextStyles.valueText}>{company.cnae_empresa || "0"}</Text>
            </View>
            <View style={TableStyles.fifTeenRow}>
              <Text style={TextStyles.prefixText}>Grau de Risco:</Text>
              <Text style={TextStyles.valueText}>{company.grau_risco_cnae || "0"}</Text>
            </View>
            <View style={TableStyles.fiftyRow}>
              <Text style={TextStyles.prefixText}>Descrição CNAE:</Text>
              <Text style={TextStyles.valueText}>Serviços de manutenção e reparação mecânica de veículos automotores</Text>
            </View>
          </View>
          {/* <View style={TableStyles.tableRow}>
            <View style={TableStyles.twentyFiveRow}>
              <Text style={TextStyles.prefixText}>Cep:</Text>
              <Text style={TextStyles.valueText}>86020-410</Text>
            </View>
            <View style={TableStyles.seventyFiveRow}>
              <Text style={TextStyles.prefixText}>Endereço:</Text>
              <Text style={TextStyles.valueText}>Rua Goias 1914 - apto 301</Text>
              <Text style={TextStyles.valueText}>Centro - Londrina/PR</Text>
            </View>
          </View> */}
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
                <Text style={TextStyles.officeText}>{user.nome_usuario}</Text>
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
                <Text style={TextStyles.officeText}>{contatos.nome_contato}</Text>
                <Text style={TextStyles.officeSmallText}>{contatos.email_contato}</Text>
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
        width: '40%',
        flexDirection: 'row',
      },

      postRowFunc: {
        padding: 10,
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
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
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
      },

      headerPostCellDesc: {
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
      },

      postText: {
        fontSize: 8,
      },

      tableRow: {
        paddingHorizontal: 5,
        borderBottom: '1 solid #343a40',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
      },

      row: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
      },

      coluun: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '25%',
      },

      containerFunc: {
        marginTop: 30,
      },

      subTitleSumary: {
        fontSize: 14,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      },

    });

    return (
      <Page style={PageStyles.Page}>

        {/* Cabeçalho */}
        <HeaderPage />

        {/* Sumário */}
        <Text style={TextStyles.subTitleSumary}>16. Caracterização das Atividades e Cargos</Text>

        {/* Tabela de Setores e Cargos */}
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
          {cargos.map((item, i) => (
            <View key={i} style={PostStyles.tableRow}>
              <View style={PostStyles.postRow}>
                <Text style={PostStyles.postText}>{findSetor(item.fk_setor_id)}</Text>
              </View>
              <View style={PostStyles.postRow}>
                <Text style={PostStyles.postText}>{item.nome_cargo}</Text>
              </View>
              <View style={PostStyles.postRowDesc}>
                <Text style={PostStyles.postText}>{item.descricao}</Text>
              </View>
              <View style={PostStyles.postRowFunc}>
                <Text style={PostStyles.postText}>Masc: {item.func_masc}</Text>
                <Text style={PostStyles.postText}>Fem: {item.func_fem}</Text>
                <Text style={PostStyles.postText}>Menor: {item.func_menor}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Tabela Funcionários Total */}
        <View style={PostStyles.containerFunc}>

          {/* Título */}
          <Text style={PostStyles.subTitleSumary}>Total de Funcionários</Text>

          {/* Tabela */}
          <View style={TableStyles.table}>
            <View style={PostStyles.headerPostContentCell}>
              <View style={PostStyles.coluun}>
                <Text style={TextStyles.valueTextSignatureTitle}>Masculino</Text>
              </View>
              <View style={PostStyles.coluun}>
                <Text style={TextStyles.valueTextSignatureTitle}>Feminino</Text>
              </View>
              <View style={PostStyles.coluun}>
                <Text style={TextStyles.valueTextSignatureTitle}>Menor</Text>
              </View>
              <View style={PostStyles.coluun}>
                <Text style={TextStyles.valueTextSignatureTitle}>Total</Text>
              </View>
            </View>
              <View style={PostStyles.tableRow}>
                <View style={PostStyles.row}>
                  <Text style={PostStyles.postText}>{getTotalFuncMasc()}</Text>
                </View>
                <View style={PostStyles.row}>
                  <Text style={PostStyles.postText}>{getTotalFuncFem()}</Text>
                </View>
                <View style={PostStyles.row}>
                  <Text style={PostStyles.postText}>{getTotalFuncMenor()}</Text>
                </View>
                <View style={PostStyles.row}>
                  <Text style={PostStyles.postText}>{getTotalFunc()}</Text>
                </View>
              </View>
          </View>
        </View>

        {/* Footer */}
        <FooterPage />
      </Page>
    );
  };

  const RiskInventoryPage = () => {

    const RiskInventoryStyles = StyleSheet.create({
      headerRow: {
        paddingHorizontal: 3,
        paddingVertical: 3,
        backgroundColor: '#0077b6',
        width: '100%',
        flexDirection: 'row',
        color: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
      },

      dataRow: {
        paddingHorizontal: 3,
        borderBottom: '1 solid #343a40',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
      },

      headerCellCenter: {
        width: '10%',
        textAlign: 'center',
        fontSize: 7,
      },

      headerCell: {
        width: '10%',
        textAlign: 'left',
        fontSize: 7,
      },

      dataCell: {
        paddingHorizontal: 3,
        paddingVertical: 3,
        width: '10%',
        textAlign: 'left',
        flexDirection: 'row',
        fontSize: 7,
      },

      dataCellCenter: {
        paddingHorizontal: 3,
        paddingVertical: 3,
        width: '10%',
        textAlign: 'center',
        flexDirection: 'row',
        fontSize: 7,
      },

    });

    return (
      <Page size="A4" orientation='landscape' style={PageStyles.LandscapePage}>

        {/* Cabeçalho */}
        <HeaderPage />

        {/* Sumário */}
        <Text style={TextStyles.subTitleSumary}>17. Inventário de Riscos</Text>

        {/* Tabela do Inventário */}
        <View style={TableStyles.table}>
          {/* Header */}
          <View style={RiskInventoryStyles.headerRow}>
            <Text style={RiskInventoryStyles.headerCellCenter}>ID</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Data</Text>
            <Text style={RiskInventoryStyles.headerCell}>Unidade</Text>
            <Text style={RiskInventoryStyles.headerCell}>Setor</Text>
            <Text style={RiskInventoryStyles.headerCell}>Processo</Text>
            <Text style={RiskInventoryStyles.headerCell}>Risco</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Tipo</Text>
            <Text style={RiskInventoryStyles.headerCell}>Consequência</Text>
            <Text style={RiskInventoryStyles.headerCell}>Fontes</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Pessoas Expostas</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Avaliação</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Medição</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Limite de Tolerância</Text>
            <Text style={RiskInventoryStyles.headerCell}>Metodologia</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Medidas</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Probabilidade</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Severidade</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Nível</Text>
            <Text style={RiskInventoryStyles.headerCell}>Comentários</Text>
          </View>
          {/* Body */}
          <View style={RiskInventoryStyles.dataRow}>
            <Text style={RiskInventoryStyles.dataCellCenter}>1</Text>
            <Text style={RiskInventoryStyles.dataCellCenter}>05/02/2024</Text>
            <Text style={RiskInventoryStyles.dataCell}>RVS</Text>
            <Text style={RiskInventoryStyles.dataCell}>Funilaria</Text>
            <Text style={RiskInventoryStyles.dataCell}>N/A</Text>
            <Text style={RiskInventoryStyles.dataCell}>Ruido</Text>
            <Text style={RiskInventoryStyles.dataCellCenter}>Fisico</Text>
            <Text style={RiskInventoryStyles.dataCell}>Possibilidade de desenvolver traumas lombares</Text>
            <Text style={RiskInventoryStyles.dataCell}>Ferramentas</Text>
            <Text style={RiskInventoryStyles.dataCellCenter}>2</Text>
            <Text style={RiskInventoryStyles.dataCellCenter}>Qualitativo</Text>
            <Text style={RiskInventoryStyles.dataCellCenter}>N/A</Text>
            <Text style={RiskInventoryStyles.dataCellCenter}>N/A</Text>
            <Text style={RiskInventoryStyles.dataCell}>N/A</Text>
            <Text style={RiskInventoryStyles.dataCell}>EPC: Paleteira e carrinhos</Text>
            <Text style={RiskInventoryStyles.dataCellCenter}>Baixa</Text>
            <Text style={RiskInventoryStyles.dataCellCenter}>Média</Text>
            <Text style={RiskInventoryStyles.dataCellCenter}>Baixo</Text>
            <Text style={RiskInventoryStyles.dataCell}>Sem indicadores de incidentes</Text>
          </View>
        </View>

        {/* Footer */}
        <FooterPage />
      </Page>
    );
  };

  const PlanPage = () => {

    const PlanStyles = StyleSheet.create({
      headerRow: {
        paddingHorizontal: 3,
        paddingVertical: 3,
        backgroundColor: '#0077b6',
        width: '100%',
        flexDirection: 'row',
        color: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
      },

      dataRow: {
        paddingHorizontal: 3,
        borderBottom: '1 solid #343a40',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
      },

      headerCellCenter: {
        width: '10%',
        textAlign: 'center',
        fontSize: 8,
      },

      headerCell: {
        width: '10%',
        textAlign: 'left',
        fontSize: 8,
      },

      dataCell: {
        paddingHorizontal: 3,
        paddingVertical: 3,
        width: '10%',
        textAlign: 'left',
        flexDirection: 'row',
        fontSize: 8,
      },

      dataCellCenter: {
        paddingHorizontal: 3,
        paddingVertical: 3,
        width: '10%',
        textAlign: 'center',
        flexDirection: 'row',
        fontSize: 8,
      },

    });

    return (
      <Page size="A4" orientation='landscape' style={PageStyles.LandscapePage}>

        {/* Cabeçalho */}
        <HeaderPage />

        {/* Sumário */}
        <Text style={TextStyles.subTitleSumary}>18. Plano de Ação</Text>

        {/* Tabela do Inventário */}
        <View style={TableStyles.table}>
          {/* Header */}
          <View style={PlanStyles.headerRow}>
            <Text style={PlanStyles.headerCellCenter}>ID</Text>
            <Text style={PlanStyles.headerCellCenter}>Data</Text>
            <Text style={PlanStyles.headerCell}>Unidade</Text>
            <Text style={PlanStyles.headerCell}>Setor</Text>
            <Text style={PlanStyles.headerCell}>Responsável</Text>
            <Text style={PlanStyles.headerCell}>Processo</Text>
            <Text style={PlanStyles.headerCell}>Risco</Text>
            <Text style={PlanStyles.headerCell}>Medida</Text>
            <Text style={PlanStyles.headerCellCenter}>Prazo</Text>
            <Text style={PlanStyles.headerCellCenter}>Data de Conclusão</Text>
            <Text style={PlanStyles.headerCellCenter}>Status</Text>
          </View>
          {/* Body */}
          <View style={PlanStyles.dataRow}>
            <Text style={PlanStyles.dataCellCenter}>1</Text>
            <Text style={PlanStyles.dataCellCenter}>05/02/2024</Text>
            <Text style={PlanStyles.dataCell}>RVS</Text>
            <Text style={PlanStyles.dataCell}>Funilaria</Text>
            <Text style={PlanStyles.dataCell}>Fellipe Tereska</Text>
            <Text style={PlanStyles.dataCell}>N/A</Text>
            <Text style={PlanStyles.dataCell}>Ruido</Text>
            <Text style={PlanStyles.dataCell}>Medida</Text>
            <Text style={PlanStyles.dataCellCenter}>6 Meses</Text>
            <Text style={PlanStyles.dataCellCenter}>00/00/0000</Text>
            <Text style={PlanStyles.dataCellCenter}>Status</Text>
          </View>
        </View>

        {/* Footer */}
        <FooterPage />
      </Page>
    );
  };

  const MyDocument = () => {
    return (
      <Document>
        <CoverPage />
        <SumaryPage />
        <CompanyPage />
        <PostPage />
        <RiskInventoryPage />
        <PlanPage />
      </Document>
    );
  };

  return MyDocument();
}

export default PdfGenerate;
